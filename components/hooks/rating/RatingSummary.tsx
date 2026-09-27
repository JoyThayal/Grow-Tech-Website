import React from "react";
import { Star } from "lucide-react";
import { RatingReview } from "@/components/hooks/rating/RatingModal";

interface Props {
  averageRating: number;
  totalReviews: number;
  reviews: RatingReview[];
}

export function RatingSummary({ averageRating, totalReviews, reviews }: Props) {
  const starCounts = [5, 4, 3, 2, 1].map((star) => {
    const count = reviews.filter((r) => Math.round(r.rating) === star).length;
    const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
    return { star, count, percentage };
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 p-4 rounded-xl bg-[#0a1128]/90 border border-[#1c2d66]/80 mb-5 items-center shadow-inner">
      {/* 🌟 গড় রেটিং স্কোর */}
      <div className="sm:col-span-4 flex flex-col items-center justify-center sm:border-r border-[#1c2d66] sm:pr-4">
        <span className="text-4xl font-bold text-white tracking-tight drop-shadow-sm">
          {totalReviews > 0 ? averageRating.toFixed(1) : "0.0"}
        </span>
        <div className="flex items-center gap-1 my-1.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-3.5 h-3.5 ${
                totalReviews > 0 && star <= Math.round(averageRating)
                  ? "fill-amber-400 text-amber-400 filter drop-shadow-[0_0_6px_rgba(251,191,36,0.4)]"
                  : "text-[#1c2d66]"
              }`}
            />
          ))}
        </div>
        <span className="text-[11px] text-slate-400 font-medium">
          {totalReviews === 0
            ? "No reviews yet"
            : `${totalReviews} ${totalReviews === 1 ? "review" : "reviews"}`}
        </span>
      </div>

      {/* 📊 ৫-স্টার প্রগ্রেস বার */}
      <div className="sm:col-span-8 flex flex-col gap-1.5">
        {starCounts.map(({ star, count, percentage }) => (
          <div key={star} className="flex items-center gap-2 text-xs">
            <span className="w-3 text-slate-400 font-mono text-[11px]">
              {star}
            </span>
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <div className="flex-1 h-1.5 rounded-full bg-[#080d1f] border border-[#1c2d66]/60 overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-amber-400 to-amber-500 rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(245,158,11,0.3)]"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <span className="w-5 text-right text-slate-400 font-mono text-[11px]">
              {count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
