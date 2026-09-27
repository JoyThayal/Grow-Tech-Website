"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { RatingReview } from "@/components/hooks/rating/RatingModal";
import type { User } from "@supabase/supabase-js";
import { useToast } from "@/components/ui/Toast";

export function useProjectReviews(
  projectSlug: string,
  initialReviews: RatingReview[] = [],
  fileUrl?: string,
) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [hasDownloaded, setHasDownloaded] = useState(false);
  const [reviewsList, setReviewsList] =
    useState<RatingReview[]>(initialReviews);

  // ১. URL প্যারাম থেকে অটো-ওপেন চেক (?rate=slug)
  useEffect(() => {
    if (searchParams.get("rate") === projectSlug) {
      // ⚡ স্টেট আপডেটটি ব্রাউজারের পরবর্তী টিক-এ ডিফার করা হলো যাতে ক্যাসকেডিং রেন্ডার না হয়
      const timer = setTimeout(() => {
        setIsModalOpen(true);

        const url = new URL(window.location.href);
        url.searchParams.delete("rate");
        window.history.replaceState({}, "", url.toString());
      }, 0);

      return () => clearTimeout(timer);
    }
  }, [searchParams, projectSlug]);

  // ২. ইউজার, ডাউনলোড স্ট্যাটাস ও রিভিউ ফেচ
  useEffect(() => {
    const checkState = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        const { data } = await supabase
          .from("user_downloads")
          .select("id")
          .eq("user_id", currentUser.id)
          .eq("project_slug", projectSlug)
          .maybeSingle();

        if (data) setHasDownloaded(true);
      }
    };

    checkState();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        const { data } = await supabase
          .from("user_downloads")
          .select("id")
          .eq("user_id", currentUser.id)
          .eq("project_slug", projectSlug)
          .maybeSingle();
        setHasDownloaded(!!data);
      } else {
        setHasDownloaded(false);
      }
    });

    // রিভিউ ফেচ (userId সহ)
    supabase
      .from("project_reviews")
      .select("*")
      .eq("project_slug", projectSlug)
      .order("created_at", { ascending: false })
      .then(({ data, error }) => {
        if (!error && data && data.length > 0) {
          setReviewsList(
            data.map((item) => ({
              id: item.id,
              userId: item.user_id,
              userName: item.user_name,
              rating: item.rating,
              comment: item.comment,
              date: new Date(item.created_at).toLocaleDateString(),
            })),
          );
        }
      });

    return () => subscription.unsubscribe();
  }, [projectSlug]);

  // গড় রেটিং হিসাব
  const totalReviews = reviewsList.length;
  const averageRating =
    totalReviews > 0
      ? reviewsList.reduce((acc, curr) => acc + curr.rating, 0) / totalReviews
      : 0;

  // ৩. ডাউনলোড হ্যান্ডলার
  const handleDownload = useCallback(async () => {
    if (user) {
      await supabase
        .from("user_downloads")
        .upsert(
          { user_id: user.id, project_slug: projectSlug },
          { onConflict: "user_id,project_slug" },
        );
      setHasDownloaded(true);
    }

    if (fileUrl) {
      const link = document.createElement("a");
      link.href = fileUrl;
      link.setAttribute("download", "");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [user, projectSlug, fileUrl]);

  // ৪. লগইন রিডাইরেক্ট
  const handleLoginRedirect = useCallback(() => {
    setIsModalOpen(false);
    const returnPath = `${window.location.pathname}?rate=${encodeURIComponent(
      projectSlug,
    )}`;
    router.push(`/auth?next=${encodeURIComponent(returnPath)}`);
  }, [projectSlug, router]);

  // ৫. রিভিউ সাবমিট
  const handleSubmitRating = useCallback(
    async (rating: number, comment?: string) => {
      if (!user) {
        handleLoginRedirect();
        return;
      }

      const userName =
        user.user_metadata?.full_name || user.email?.split("@")[0] || "User";

      const { data, error } = await supabase
        .from("project_reviews")
        .insert([
          {
            project_slug: projectSlug,
            user_id: user.id,
            user_name: userName,
            rating,
            comment: comment || null,
          },
        ])
        .select()
        .single();

      if (error) {
        showToast("Submission Failed", error.message, "error");
        return;
      }

      if (data) {
        setReviewsList((prev) => [
          {
            id: data.id,
            userId: data.user_id,
            userName: data.user_name,
            rating: data.rating,
            comment: data.comment,
            date: "Just now",
          },
          ...prev,
        ]);
        showToast(
          "Review Submitted!",
          "Thanks for sharing your rating! ⭐",
          "success",
        );
      }
    },
    [user, projectSlug, handleLoginRedirect, showToast],
  );

  // 🗑️ ৬. ডিলিট রিভিউ ফাংশন
  const handleDeleteReview = useCallback(
    async (reviewId: string) => {
      const { error } = await supabase
        .from("project_reviews")
        .delete()
        .eq("id", reviewId);

      if (!error) {
        setReviewsList((prev) => prev.filter((r) => r.id !== reviewId));
        showToast(
          "Review Deleted",
          "Your review has been successfully removed 🗑️",
          "info",
        );
      } else {
        showToast("Delete Failed", error.message, "error");
      }
    },
    [showToast],
  );

  return {
    isModalOpen,
    setIsModalOpen,
    user,
    hasDownloaded,
    reviewsList,
    totalReviews,
    averageRating,
    handleDownload,
    handleLoginRedirect,
    handleSubmitRating,
    handleDeleteReview,
  };
}
