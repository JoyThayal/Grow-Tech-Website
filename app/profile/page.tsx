"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  User as UserIcon,
  Mail,
  Calendar,
  Star,
  DownloadCloud,
  Trash2,
  LogOut,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { useToast } from "@/components/ui/Toast";
import type { User } from "@supabase/supabase-js";

interface UserReview {
  id: string;
  project_slug: string;
  rating: number;
  comment: string | null;
  created_at: string;
}

interface UserDownload {
  id: string;
  project_slug: string;
  downloaded_at: string;
}

export default function ProfilePage(): React.ReactNode {
  const router = useRouter();
  const { showToast } = useToast();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState<UserReview[]>([]);
  const [downloads, setDownloads] = useState<UserDownload[]>([]);
  const [activeTab, setActiveTab] = useState<"reviews" | "downloads">(
    "reviews",
  );
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // ১. ইউজার সেশন ও অ্যাক্টিভিটি ডেটা ফেচ
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        router.push("/auth?next=/profile");
        return;
      }

      const currentUser = session.user;
      setUser(currentUser);

      const { data: userReviews } = await supabase
        .from("project_reviews")
        .select("*")
        .eq("user_id", currentUser.id)
        .order("created_at", { ascending: false });

      if (userReviews) setReviews(userReviews);

      const { data: userDownloads } = await supabase
        .from("user_downloads")
        .select("*")
        .eq("user_id", currentUser.id)
        .order("downloaded_at", { ascending: false });

      if (userDownloads) setDownloads(userDownloads);

      setLoading(false);
    };

    fetchUserData();
  }, [router]);

  // ২. সাইন আউট
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    showToast("Signed Out", "You have been logged out safely.", "info");
    router.push("/");
  };

  // ৩. রিভিউ ডিলিট হ্যান্ডলার
  const handleDeleteReview = async (reviewId: string) => {
    const { error } = await supabase
      .from("project_reviews")
      .delete()
      .eq("id", reviewId);

    if (!error) {
      setReviews((prev) => prev.filter((r) => r.id !== reviewId));
      showToast(
        "Review Removed",
        "Your review was successfully deleted 🗑️",
        "info",
      );
    } else {
      showToast("Delete Failed", error.message, "error");
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#0a1128] text-slate-100 flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-3">
          <div className="w-6 h-6 border-2 border-[#00e5ff] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-slate-400 font-mono tracking-wide">
            Loading profile...
          </p>
        </div>
      </main>
    );
  }

  if (!user) return null;

  const userAvatar = user.user_metadata?.avatar_url;
  const userName =
    user.user_metadata?.full_name ||
    user.email?.split("@")[0] ||
    "Grow Tech Explorer";
  const userJoinedDate = new Date(user.created_at).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  return (
    <main className="min-h-screen w-full bg-[#0a1128] text-slate-100 px-3.5 py-6 sm:px-6 sm:py-10 md:px-8 antialiased relative selection:bg-cyan-500/30 selection:text-white">
      {/* 🌌 ব্যাকগ্রাউন্ড অরোরা ও গ্রিড */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-1/4 -left-32 w-72 sm:w-96 h-72 sm:h-96 bg-[#00e5ff]/5 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none" />
      <div className="absolute top-10 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-indigo-500/10 rounded-full blur-[120px] sm:blur-[140px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto space-y-6 sm:space-y-8">
        {/* 🪪 প্রোফাইল হেডার কার্ড */}
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-[#1c2d66] bg-[#0e1838]/70 backdrop-blur-xl p-4 sm:p-7 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="absolute top-0 right-0 w-52 sm:w-72 h-32 sm:h-40 bg-[#00e5ff]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-5 sm:gap-6">
            {/* অ্যাভাটার ও ইউজার তথ্য */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 text-center sm:text-left w-full sm:w-auto">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-2xl overflow-hidden border border-[#243982] bg-[#121f48] shadow-inner flex items-center justify-center">
                {userAvatar ? (
                  <Image
                    src={userAvatar}
                    alt={userName}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <UserIcon className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-300/80" />
                )}
              </div>

              <div className="space-y-2 w-full">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#00e5ff]/10 border border-[#00e5ff]/20 text-[#00e5ff] text-[10px] font-mono uppercase tracking-wider">
                  <Sparkles className="w-3 h-3" /> Community Member
                </div>
                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight wrap-break-word">
                  {userName}
                </h1>

                <div className="flex flex-col sm:flex-row sm:flex-wrap items-center sm:items-start gap-2 sm:gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5 break-all max-w-full">
                    <Mail className="w-3.5 h-3.5 text-cyan-400/80 shrink-0" />
                    <span>{user.email}</span>
                  </span>
                  <span className="flex items-center gap-1.5 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400/80 shrink-0" />
                    Joined {userJoinedDate}
                  </span>
                </div>
              </div>
            </div>

            {/* সাইন আউট বাটন */}
            <button
              type="button"
              onClick={handleSignOut}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#132247]/60 hover:bg-rose-500/15 border border-[#273e7d] hover:border-rose-500/40 text-slate-300 hover:text-rose-400 text-xs font-semibold transition-all cursor-pointer shadow-sm active:scale-98"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>

          {/* 📊 স্ট্যাট কাউন্টার (মোবাইলে ফুল উইডথ গ্রিড) */}
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4 mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-[#1c2d66]">
            <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#0a1128]/80 border border-[#1c2d66]/80 flex items-center gap-3 sm:gap-4">
              <div className="p-2.5 sm:p-3 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 shrink-0">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-amber-400" />
              </div>
              <div className="min-w-0">
                <p className="text-xl sm:text-2xl font-bold text-white font-mono leading-none mb-1">
                  {reviews.length}
                </p>
                <p className="text-[11px] sm:text-xs text-slate-400 truncate">
                  Reviews Submitted
                </p>
              </div>
            </div>

            <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#0a1128]/80 border border-[#1c2d66]/80 flex items-center gap-3 sm:gap-4">
              <div className="p-2.5 sm:p-3 rounded-xl bg-[#00e5ff]/10 border border-[#00e5ff]/20 text-[#00e5ff] shrink-0">
                <DownloadCloud className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xl sm:text-2xl font-bold text-white font-mono leading-none mb-1">
                  {downloads.length}
                </p>
                <p className="text-[11px] sm:text-xs text-slate-400 truncate">
                  Apps & Games Unlocked
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 🔀 অ্যাক্টিভিটি ট্যাব সেকশন */}
        <div className="space-y-4">
          {/* ট্যাব হেডার (মোবাইলে ফুল উইডথ ফ্লেক্স) */}
          <div className="flex w-full sm:w-fit p-1 bg-[#132247]/60 border border-[#273e7d] rounded-xl">
            <button
              type="button"
              onClick={() => setActiveTab("reviews")}
              className={`relative flex-1 sm:flex-initial flex items-center justify-center px-3.5 py-2 text-xs font-medium transition-colors z-10 cursor-pointer ${
                activeTab === "reviews"
                  ? "text-white font-semibold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {activeTab === "reviews" && (
                <motion.div
                  layoutId="profileTab"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="absolute inset-0 bg-[#1c2f62] border border-[#3b59a8] rounded-lg shadow-sm"
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5 whitespace-nowrap">
                <Star className="w-3.5 h-3.5 text-amber-400" />
                <span>My Reviews ({reviews.length})</span>
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("downloads")}
              className={`relative flex-1 sm:flex-initial flex items-center justify-center px-3.5 py-2 text-xs font-medium transition-colors z-10 cursor-pointer ${
                activeTab === "downloads"
                  ? "text-white font-semibold"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {activeTab === "downloads" && (
                <motion.div
                  layoutId="profileTab"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className="absolute inset-0 bg-[#1c2f62] border border-[#3b59a8] rounded-lg shadow-sm"
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5 whitespace-nowrap">
                <DownloadCloud className="w-3.5 h-3.5 text-cyan-400" />
                <span>Downloads ({downloads.length})</span>
              </span>
            </button>
          </div>

          {/* ট্যাব কনটেন্ট */}
          <div className="rounded-2xl sm:rounded-3xl border border-[#1c2d66] bg-[#0e1838]/60 backdrop-blur-xl p-3.5 sm:p-6 shadow-xl">
            {activeTab === "reviews" ? (
              <div className="space-y-3">
                {reviews.length === 0 ? (
                  <div className="text-center py-10 sm:py-12 space-y-2">
                    <p className="text-sm text-slate-400">
                      You have not submitted any reviews yet.
                    </p>
                    <Link
                      href="/portfolio/web"
                      className="inline-flex items-center gap-1 text-xs text-[#00e5ff] hover:underline"
                    >
                      Explore projects and leave your feedback{" "}
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                ) : (
                  reviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#0a1128]/90 border border-[#1c2d66]/70 hover:border-[#243982] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1.5 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-semibold text-white uppercase tracking-wider font-mono truncate max-w-full">
                            {rev.project_slug.replace(/-/g, " ")}
                          </span>
                          <div className="flex items-center gap-1 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded text-[11px] text-amber-300 font-mono shrink-0">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            {rev.rating}
                          </div>
                        </div>

                        {rev.comment && (
                          <p className="text-xs text-slate-300 leading-relaxed wrap-break-word">
                            {rev.comment}
                          </p>
                        )}
                        <p className="text-[10px] text-slate-500 font-mono">
                          {new Date(rev.created_at).toLocaleDateString()}
                        </p>
                      </div>

                      {/* ইন-লাইন ডিলিট কনফার্মেশন */}
                      <div className="relative flex items-center self-end sm:self-center shrink-0">
                        <AnimatePresence mode="wait">
                          {deletingId === rev.id ? (
                            <motion.div
                              key="delete-confirm"
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.9 }}
                              className="flex items-center gap-2 bg-rose-500/10 border border-rose-500/20 px-2.5 py-1 rounded-lg"
                            >
                              <span className="text-[11px] text-rose-300">
                                Delete?
                              </span>
                              <button
                                type="button"
                                onClick={() => handleDeleteReview(rev.id)}
                                className="text-[11px] text-rose-400 font-bold hover:underline cursor-pointer"
                              >
                                Yes
                              </button>
                              <span className="text-slate-600">/</span>
                              <button
                                type="button"
                                onClick={() => setDeletingId(null)}
                                className="text-[11px] text-slate-400 hover:text-slate-200 cursor-pointer"
                              >
                                No
                              </button>
                            </motion.div>
                          ) : (
                            <motion.button
                              key="delete-trigger"
                              type="button"
                              onClick={() => setDeletingId(rev.id)}
                              className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/20 transition-all cursor-pointer"
                              title="Delete this review"
                            >
                              <Trash2 className="w-4 h-4" />
                            </motion.button>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div className="space-y-3">
                {downloads.length === 0 ? (
                  <div className="text-center py-10 sm:py-12 space-y-2">
                    <p className="text-sm text-slate-400">
                      No apps or games downloaded yet.
                    </p>
                    <Link
                      href="/portfolio/app"
                      className="inline-flex items-center gap-1 text-xs text-[#00e5ff] hover:underline"
                    >
                      Check out available apps{" "}
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                ) : (
                  downloads.map((dl) => (
                    <div
                      key={dl.id}
                      className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#0a1128]/90 border border-[#1c2d66]/70 flex flex-col xs:flex-row xs:items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="p-2 rounded-xl bg-[#00e5ff]/10 border border-[#00e5ff]/20 text-[#00e5ff] shrink-0">
                          <DownloadCloud className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-mono truncate">
                            {dl.project_slug.replace(/-/g, " ")}
                          </h4>
                          <p className="text-[10px] text-slate-500 font-mono">
                            Unlocked on{" "}
                            {new Date(dl.downloaded_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>

                      <span className="text-[11px] font-mono text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 px-2.5 py-0.5 rounded-full w-fit self-end xs:self-auto shrink-0">
                        Ready to Rate
                      </span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
