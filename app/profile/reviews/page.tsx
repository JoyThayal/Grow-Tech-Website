"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Star,
  ArrowLeft,
  Trash2,
  ExternalLink,
  MessageSquareQuote,
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { useToast } from "@/components/ui/Toast";

interface UserReview {
  id: string;
  project_slug: string;
  rating: number;
  comment: string | null;
  created_at: string;
}

export default function UserReviewsPage() {
  const router = useRouter();
  const { showToast } = useToast();

  const [reviews, setReviews] = useState<UserReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session?.user) {
        router.push("/auth?next=/profile/reviews");
        return;
      }

      supabase
        .from("project_reviews")
        .select("*")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false })
        .then(({ data }) => {
          if (data) setReviews(data);
          setLoading(false);
        });
    });
  }, [router]);

  const handleDelete = async (reviewId: string) => {
    const { error } = await supabase
      .from("project_reviews")
      .delete()
      .eq("id", reviewId);

    if (!error) {
      setReviews((prev) => prev.filter((r) => r.id !== reviewId));
      showToast("Review Removed", "Your rating was removed.", "info");
    } else {
      showToast("Failed", error.message, "error");
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0a1128] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a1128] text-white py-12 px-4 sm:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* ব্যাক লিঙ্ক */}
        <div className="flex items-center justify-between">
          <Link
            href="/profile"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Profile
          </Link>
          <span className="golden-tag">MY FEEDBACK</span>
        </div>

        <div>
          <h1 className="cabinet text-2xl sm:text-3xl font-bold text-white">
            Your Submitted Reviews
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Ratings and feedback you have shared across Grow Tech projects.
          </p>
        </div>

        {/* রিভিউ লিস্ট */}
        <div className="rounded-3xl border border-[#1c2d66] bg-[#0e1838]/80 p-5 sm:p-7 backdrop-blur-xl">
          {reviews.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center">
                <MessageSquareQuote className="w-6 h-6" />
              </div>
              <p className="text-sm text-slate-300 font-medium">
                No reviews submitted yet
              </p>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                Explore our portfolio projects to leave your thoughts and star
                ratings!
              </p>
              <div className="pt-2">
                <Link
                  href="/portfolio"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-400 text-slate-950 font-bold text-xs hover:bg-cyan-300 transition-all"
                >
                  Explore Portfolio <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-4 rounded-2xl bg-[#0a1128]/90 border border-[#1c2d66] flex items-center justify-between gap-4"
                >
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                        {rev.project_slug.replace(/-/g, " ")}
                      </span>
                      <div className="flex items-center gap-1 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded text-[11px] text-amber-300 font-mono">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        {rev.rating}
                      </div>
                    </div>
                    {rev.comment && (
                      <p className="text-xs text-slate-300">{rev.comment}</p>
                    )}
                    <p className="text-[10px] text-slate-500 font-mono">
                      {new Date(rev.created_at).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="shrink-0">
                    {deletingId === rev.id ? (
                      <div className="flex items-center gap-2 bg-rose-500/10 border border-rose-500/20 px-2.5 py-1 rounded-lg text-[11px]">
                        <span className="text-rose-300">Delete?</span>
                        <button
                          onClick={() => handleDelete(rev.id)}
                          className="text-rose-400 font-bold hover:underline"
                        >
                          Yes
                        </button>
                        <span>/</span>
                        <button
                          onClick={() => setDeletingId(null)}
                          className="text-slate-400 hover:text-white"
                        >
                          No
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeletingId(rev.id)}
                        className="p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
