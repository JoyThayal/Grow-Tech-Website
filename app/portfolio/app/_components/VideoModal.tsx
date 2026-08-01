"use client";

import React, { useState } from "react";
import { X, Loader2 } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
}

export default function VideoModal({
  isOpen,
  onClose,
  videoUrl,
}: VideoModalProps) {
  // ⚡ ভিডিও লোড হচ্ছে কিনা ট্র্যাক করার জন্য স্টেট
  const [isLoading, setIsLoading] = useState(true);

  if (!isOpen) return null;

  return (
    // Backdrop Overlay (বাইরে ক্লিক করলে মোডাল বন্ধ হবে)
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 transition-all duration-300 animate-in fade-in"
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        aria-label="Close modal"
        className="absolute top-6 right-6 sm:top-10 sm:right-10 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-cyan-400 hover:bg-white/20 transition duration-300 border border-cyan-400/30 cursor-pointer"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Mobile Frame Container */}
      <div
        onClick={(e) => e.stopPropagation()} // ফ্রেমের ভেতর ক্লিকে যেন বন্ধ না হয়ে যায়
        className="relative w-full max-w-70 sm:max-w-[320px] aspect-9/19.5 bg-black rounded-[40px] border-[6px] border-slate-800 shadow-[0_0_50px_rgba(0,229,255,0.25)] overflow-hidden flex flex-col justify-center items-center"
      >
        {/* Mobile Camera Notch / Punch Hole */}
        <div className="absolute top-3 w-3 h-3 bg-slate-900 rounded-full z-30 border border-slate-700/50" />

        {/* 🌀 Cyan Loading Spinner (ভিডিও প্লে হওয়ার আগ পর্যন্ত দেখাবে) */}
        {isLoading && (
          <div className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center gap-2 z-20">
            <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
            <span className="text-cyan-300 text-[10px] font-mono tracking-widest uppercase animate-pulse">
              Loading App Preview...
            </span>
          </div>
        )}

        {/* Video Player */}
        <video
          src={videoUrl}
          autoPlay
          loop
          muted
          playsInline
          // ⚡ ভিডিও প্লে হওয়ার জন্য রেডি হলেই লোডার উধাও হয়ে যাবে
          onCanPlay={() => setIsLoading(false)}
          className="relative z-10 w-full h-full object-cover rounded-4xl"
        />
      </div>
    </div>
  );
}
