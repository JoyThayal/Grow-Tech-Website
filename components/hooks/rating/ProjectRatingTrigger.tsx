"use client";

import { Star } from "lucide-react";

interface ProjectRatingTriggerProps {
  totalReviews: number;
  averageRating: number;
  hasUserRated: boolean;
  onOpenModal: () => void;
}

// ⚡ বড় সংখ্যাকে (১০০০, ১০০০০) K / M ফরম্যাটে রূপান্তর করার ফাংশন
function formatReviewCount(count: number): string {
  if (count >= 1_000_000) {
    return (count / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (count >= 1_000) {
    return (count / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return count.toString();
}

export default function ProjectRatingTrigger({
  totalReviews,
  averageRating,
  hasUserRated,
  onOpenModal,
}: ProjectRatingTriggerProps) {
  return (
    <div className="flex items-center justify-between w-full">
      {/* 🌟 ০ রেটিং থাকলে দেখাবে না, থাকলে স্মার্ট '1.2K reviews' দেখাবে */}
      {totalReviews > 0 ? (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenModal();
          }}
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors cursor-pointer group/rate"
          title={`${totalReviews} total reviews`}
        >
          <Star className="w-3.5 h-3.5 fill-[#c9a86a] text-[#c9a86a] shrink-0" />
          <span className="font-bold text-slate-200">
            {averageRating.toFixed(1)}
          </span>
          <span className="text-[11px] text-slate-400 font-mono group-hover/rate:text-slate-300 transition-colors">
            ({formatReviewCount(totalReviews)}{" "}
            {totalReviews === 1 ? "review" : "reviews"})
          </span>
        </button>
      ) : (
        <div />
      )}

      {/* ইউজার রেটিং না দিলে সাধারণ 'Rate' বাটন, দিলে 'View Feedback' */}
      {!hasUserRated ? (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenModal();
          }}
          className="px-3 py-1 rounded-md border border-[#ffffff15] bg-[#ffffff05] hover:bg-[#ffffff10] hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 text-xs font-medium transition-all cursor-pointer"
        >
          Rate
        </button>
      ) : (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onOpenModal();
          }}
          className="px-2.5 py-1 rounded-md border border-[#ffffff14] bg-[#ffffff05] hover:bg-[#121f48] hover:border-cyan-500/40 text-slate-400 hover:text-cyan-300 text-xs font-medium transition-all cursor-pointer inline-flex items-center gap-1"
        >
          <span>View Feedback</span>
        </button>
      )}
    </div>
  );
}
