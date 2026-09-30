import React, { useState } from "react";
import {
  Star,
  LogIn,
  MessageSquare,
  Send,
  DownloadCloud,
  ExternalLink,
} from "lucide-react";
import { useToast } from "@/components/ui/Toast";

interface Props {
  isLoggedIn: boolean;
  requireDownload?: boolean;
  hasDownloaded?: boolean;
  requireVisit?: boolean;
  hasVisited?: boolean;
  onDownloadClick?: () => void;
  onVisitClick?: () => void;
  onLoginClick?: () => void;
  onSubmit: (rating: number, comment?: string) => void;
}

// ⭐ প্রতিটি স্টারের লেবেল ও ইমোজি
const ratingLabels: Record<number, { label: string; emoji: string }> = {
  1: { label: "Poor", emoji: "😞" },
  2: { label: "Fair", emoji: "😐" },
  3: { label: "Good", emoji: "🙂" },
  4: { label: "Very Good", emoji: "😃" },
  5: { label: "Masterpiece!", emoji: "🔥" },
};

export function RatingForm({
  isLoggedIn,
  requireDownload,
  hasDownloaded,
  requireVisit,
  hasVisited,
  onDownloadClick,
  onVisitClick,
  onLoginClick,
  onSubmit,
}: Props) {
  const { showToast } = useToast();
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [userComment, setUserComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userRating === 0) return;

    if (requireDownload && !hasDownloaded) {
      showToast(
        "Download Required",
        "Please download the project first to rate! 🎮",
        "warning",
      );
      return;
    }
    if (requireVisit && !hasVisited) {
      showToast(
        "Visit Required",
        "Please visit the website first to rate! 🌐",
        "info",
      );
      return;
    }

    onSubmit(userRating, userComment);
    setUserRating(0);
    setUserComment("");
  };

  return (
    <div className="mb-5 p-4 rounded-xl bg-[#0a1128]/90 border border-[#1c2d66]/80 shadow-inner">
      {!isLoggedIn ? (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-1">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#121f48] border border-[#243982] text-cyan-300">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h5 className="text-xs font-medium text-slate-200">
                Want to leave a review?
              </h5>
              <p className="text-[11px] text-slate-400">
                Sign in to share your score and comments.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onLoginClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 text-xs font-semibold transition-all shrink-0 cursor-pointer shadow-sm active:scale-95"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </button>
        </div>
      ) : requireDownload && !hasDownloaded ? (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-1">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
              <DownloadCloud className="w-4 h-4" />
            </div>
            <div>
              <h5 className="text-xs font-medium text-amber-300">
                Download Required
              </h5>
              <p className="text-[11px] text-slate-400">
                Please download and try the project first.
              </p>
            </div>
          </div>
          {onDownloadClick && (
            <button
              type="button"
              onClick={onDownloadClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#00e5ff] hover:bg-cyan-300 text-slate-950 text-xs font-semibold transition-all shrink-0 cursor-pointer shadow-sm active:scale-95"
            >
              <DownloadCloud className="w-3.5 h-3.5" />
              <span>Download Now</span>
            </button>
          )}
        </div>
      ) : requireVisit && !hasVisited ? (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-1">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-[#c9a86a]/15 border border-[#c9a86a]/30 text-[#c9a86a]">
              <ExternalLink className="w-4 h-4" />
            </div>
            <div>
              <h5 className="text-xs font-medium text-[#c9a86a]">
                Visit Required
              </h5>
              <p className="text-[11px] text-slate-400">
                Please explore the live website first.
              </p>
            </div>
          </div>
          {onVisitClick && (
            <button
              type="button"
              onClick={onVisitClick}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#c9a86a] hover:bg-[#dfbd7e] text-slate-950 text-xs font-semibold transition-all shrink-0 cursor-pointer shadow-sm active:scale-95"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Visit Site</span>
            </button>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs font-medium text-slate-300">
              Select rating:
            </span>

            {/* ⭐ স্টার বাটন তালিকা (মাথার ওপর ফ্ল্যাটিং পপআপ সহ) */}
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <div key={star} className="relative flex flex-col items-center">
                  {/* 🎈 মাথার ওপর ফ্ল্যাটিং পপআপ ব্যাজ */}
                  {hoverRating === star && (
                    <div className="absolute -top-8.5 z-20 flex flex-col items-center animate-in fade-in zoom-in-90 duration-150 pointer-events-none">
                      <div className="flex items-center gap-1 whitespace-nowrap rounded-md border border-cyan-500/40 bg-[#0d1736] px-2 py-0.5 text-[10px] font-bold text-white shadow-lg shadow-black/50">
                        <span>{ratingLabels[star].label}</span>
                        <span>{ratingLabels[star].emoji}</span>
                      </div>
                      {/* ছোট নিচের তীর (Arrow indicator) */}
                      <div className="h-1.5 w-1.5 rotate-45 border-b border-r border-cyan-500/40 bg-[#0d1736] -mt-1" />
                    </div>
                  )}

                  {/* স্টার বাটন */}
                  <button
                    type="button"
                    onClick={() => setUserRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 transition-transform hover:scale-125 focus:outline-none cursor-pointer"
                  >
                    <Star
                      className={`w-4 h-4 transition-colors duration-200 ${
                        star <= (hoverRating || userRating)
                          ? "fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]"
                          : "text-slate-600 hover:text-slate-400"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <textarea
            rows={2}
            value={userComment}
            onChange={(e) => setUserComment(e.target.value)}
            placeholder="Leave a short comment (optional)..."
            className="w-full text-xs text-slate-200 bg-[#080d1f] border border-[#1c2d66] rounded-xl p-2.5 focus:outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/60 placeholder:text-slate-500 resize-none transition-all shadow-inner"
          />

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={userRating === 0}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-semibold text-xs disabled:opacity-40 transition-all cursor-pointer shadow-sm active:scale-95"
            >
              <Send className="w-3 h-3" />
              <span>Submit</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
