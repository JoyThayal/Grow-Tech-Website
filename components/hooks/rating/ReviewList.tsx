import React, { useState } from "react";
import { Star, ThumbsUp, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { RatingReview } from "@/components/hooks/rating/RatingModal";

interface Props {
  reviews: RatingReview[];
  currentUserId?: string;
  onDeleteReview?: (id: string) => void;
}

export function ReviewList({ reviews, currentUserId, onDeleteReview }: Props) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  return (
    <div>
      <div className="flex items-center justify-between mb-2.5">
        <h5 className="text-xs font-medium text-zinc-300">Recent Feedback</h5>
        <span className="text-[11px] font-mono text-zinc-500">
          {reviews.length} total
        </span>
      </div>

      <div className="space-y-2.5 max-h-48 overflow-y-auto scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {reviews.length === 0 ? (
          <p className="text-center py-6 text-xs text-zinc-600">
            No reviews yet. Be the first to rate!
          </p>
        ) : (
          reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-3 rounded-lg bg-zinc-900/40 border border-zinc-800/60 hover:border-zinc-700/60 transition-colors"
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-zinc-800 border border-zinc-700 text-zinc-300 text-[10px] font-semibold flex items-center justify-center uppercase">
                    {rev.userName.charAt(0)}
                  </div>
                  <span className="text-xs font-medium text-zinc-200">
                    {rev.userName}
                  </span>
                </div>

                <div className="flex items-center gap-1 bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-medium text-zinc-200 font-mono">
                    {rev.rating}
                  </span>
                </div>
              </div>

              {rev.comment && (
                <p className="text-zinc-300 text-xs leading-relaxed mb-1.5 pl-8">
                  {rev.comment}
                </p>
              )}

              <div className="flex items-center justify-between text-[10px] text-zinc-500 pl-8">
                <span>{rev.date}</span>

                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 hover:text-zinc-300 transition-colors cursor-pointer">
                    <ThumbsUp className="w-3 h-3" /> Helpful
                  </span>

                  {currentUserId && rev.userId === currentUserId && (
                    <div className="relative flex items-center">
                      <AnimatePresence mode="wait">
                        {deletingId === rev.id ? (
                          <motion.div
                            key="confirm"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="flex items-center gap-1.5 bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded-md"
                          >
                            <span className="text-[10px] text-rose-300 font-medium">
                              Delete?
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                setDeletingId(null);
                                onDeleteReview?.(rev.id);
                              }}
                              className="text-[10px] text-rose-400 font-bold hover:underline cursor-pointer"
                            >
                              Yes
                            </button>
                            <span className="text-zinc-600">/</span>
                            <button
                              type="button"
                              onClick={() => setDeletingId(null)}
                              className="text-[10px] text-zinc-400 hover:text-zinc-200 cursor-pointer"
                            >
                              No
                            </button>
                          </motion.div>
                        ) : (
                          <motion.button
                            key="btn"
                            type="button"
                            onClick={() => setDeletingId(rev.id)}
                            className="text-zinc-500 hover:text-rose-400 transition-colors p-0.5 cursor-pointer"
                            title="Delete your review"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </motion.button>
                        )}
                      </AnimatePresence>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
