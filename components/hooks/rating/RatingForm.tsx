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
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-300">
              Select rating:
            </span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setUserRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 transition-transform hover:scale-110 focus:outline-none cursor-pointer"
                >
                  <Star
                    className={`w-4 h-4 transition-colors ${
                      star <= (hoverRating || userRating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-slate-600 hover:text-slate-400"
                    }`}
                  />
                </button>
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
