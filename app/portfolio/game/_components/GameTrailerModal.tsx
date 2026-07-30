"use client";

import React from "react";
import { X } from "lucide-react";

interface GameTrailerModalProps {
  isOpen: boolean;
  onClose: () => void;
  trailerUrl: string; // 👈 ঠিক করা হয়েছে: ইন্টারফেস ও প্রপসের নাম এক রাখা হয়েছে
}

export default function GameTrailerModal({
  isOpen,
  onClose,
  trailerUrl,
}: GameTrailerModalProps) {
  if (!isOpen) return null;

  return (
    // Backdrop Overlay
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 transition-all duration-300">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 sm:top-10 sm:right-10 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-purple-400 hover:bg-white/20 transition duration-300 border border-purple-500/30 cursor-pointer"
      >
        <X className="w-6 h-6" />
      </button>

      {/* 🎮 PC Screen / Widescreen Container (16:9 Ratio with Purple Neon Glow) */}
      <div className="relative w-full max-w-4xl aspect-video bg-black rounded-2xl border-2 border-purple-500/60 shadow-[0_0_50px_rgba(168,85,247,0.3)] overflow-hidden flex items-center justify-center">
        {/* Video Player */}
        <video
          src={`/videos/${trailerUrl}`}
          autoPlay
          controls
          className="w-full h-full object-contain bg-black"
        />
      </div>
    </div>
  );
}
