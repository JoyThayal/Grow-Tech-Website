"use client";

import React, { useState } from "react";
import { X, Loader2 } from "lucide-react";

interface GameTrailerModalProps {
  isOpen: boolean;
  onClose: () => void;
  trailerUrl: string;
}

export default function GameTrailerModal({
  isOpen,
  onClose,
  trailerUrl,
}: GameTrailerModalProps) {
  // ⚡ ভিডিও লোড হচ্ছে কিনা তা ট্র্যাক করার জন্য স্টেট
  const [isLoading, setIsLoading] = useState(true);

  if (!isOpen) return null;

  return (
    // Backdrop Overlay
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 transition-all duration-300 animate-in fade-in"
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        aria-label="Close modal"
        className="absolute top-6 right-6 sm:top-10 sm:right-10 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-purple-400 hover:bg-white/20 transition duration-300 border border-purple-500/30 cursor-pointer"
      >
        <X className="w-6 h-6" />
      </button>

      {/* 🎮 PC Screen / Widescreen Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl border-2 border-purple-500/60 shadow-[0_0_50px_rgba(168,85,247,0.3)] overflow-hidden flex items-center justify-center"
      >
        {/* 🌀 LOADER SPINNER & SKELETON (ভিডিও প্লে হওয়ার আগ পর্যন্ত দেখাবে) */}
        {isLoading && (
          <div className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center gap-3 z-20">
            <Loader2 className="w-10 h-10 text-purple-500 animate-spin" />
            <span className="text-purple-300 text-xs font-mono tracking-widest uppercase animate-pulse">
              Loading Trailer...
            </span>
          </div>
        )}

        {/* Video Player */}
        <video
          src={`/videos/${trailerUrl}`}
          autoPlay
          playsInline
          controls
          controlsList="nodownload"
          onCanPlay={() => setIsLoading(false)}
          className="relative z-10 w-full h-full object-contain bg-black"
        />
      </div>
    </div>
  );
}
