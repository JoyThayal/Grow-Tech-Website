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
    <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 mb-5 items-center">
      <div className="sm:col-span-4 flex flex-col items-center justify-center sm:border-r border-zinc-800 sm:pr-4">
        <span className="text-4xl font-bold text-zinc-100 tracking-tight">
          {totalReviews > 0 ? averageRating.toFixed(1) : "0.0"}
        </span>
        <div className="flex items-center gap-1 my-1.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-3.5 h-3.5 ${
                totalReviews > 0 && star <= Math.round(averageRating)
                  ? "fill-amber-400 text-amber-400"
                  : "text-zinc-700"
              }`}
            />
          ))}
        </div>
        <span className="text-[11px] text-zinc-400">
          {totalReviews === 0
            ? "No reviews yet"
            : `${totalReviews} ${totalReviews === 1 ? "review" : "reviews"}`}
        </span>
      </div>

      <div className="sm:col-span-8 flex flex-col gap-1.5">
        {starCounts.map(({ star, count, percentage }) => (
          <div key={star} className="flex items-center gap-2 text-xs">
            <span className="w-3 text-zinc-400 font-mono text-[11px]">
              {star}
            </span>
            <Star className="w-3 h-3 fill-amber-400/90 text-amber-400/90" />
            <div className="flex-1 h-1.5 rounded-full bg-zinc-800 overflow-hidden">
              <div
                className="h-full bg-zinc-200 rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <span className="w-5 text-right text-zinc-500 font-mono text-[11px]">
              {count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
