"use client";

import React from "react";
import { Star, ThumbsUp } from "lucide-react";
import { RatingReview } from "@/components/hooks/rating/RatingModal";

interface Props {
  reviews: RatingReview[];
}

export function ReviewList({ reviews }: Props) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2.5">
        <h5 className="text-xs font-medium text-slate-300">Recent Feedback</h5>
        <span className="text-[11px] font-mono text-slate-400">
          {reviews.length} total
        </span>
      </div>

      <div className="space-y-2.5 max-h-48 overflow-y-auto scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {reviews.length === 0 ? (
          <p className="text-center py-6 text-xs text-slate-400">
            No reviews yet. Be the first to rate!
          </p>
        ) : (
          reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-3 rounded-xl bg-[#0a1128]/80 border border-[#1c2d66]/70 hover:border-[#243982] transition-colors"
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-[#121f48] border border-[#243982] text-cyan-300 text-[10px] font-semibold flex items-center justify-center uppercase shadow-inner">
                    {rev.userName.charAt(0)}
                  </div>
                  <span className="text-xs font-medium text-slate-200">
                    {rev.userName}
                  </span>
                </div>

                <div className="flex items-center gap-1 bg-amber-400/10 px-2 py-0.5 rounded-md border border-amber-400/20">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-medium text-amber-300 font-mono">
                    {rev.rating}
                  </span>
                </div>
              </div>

              {rev.comment && (
                <p className="text-slate-300 text-xs leading-relaxed mb-1.5 pl-8">
                  {rev.comment}
                </p>
              )}

              <div className="flex items-center justify-between text-[10px] text-slate-400 pl-8">
                <span className="font-mono">{rev.date}</span>

                <span className="flex items-center gap-1 hover:text-cyan-300 transition-colors cursor-pointer">
                  <ThumbsUp className="w-3 h-3" /> Helpful
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
