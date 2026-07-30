"use client";

import React from "react";
import { X } from "lucide-react";

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
  if (!isOpen) return null;

  return (
    // Backdrop Overlay (পুরো ব্যাকগ্রাউন্ড ব্লার)
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 transition-all duration-300">
      {/* Close Button (টপ রাইটে Cyan/Aqua রঙের X বাটন) */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 sm:top-10 sm:right-10 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-cyan-400 hover:bg-white/20 transition duration-300 border border-cyan-400/30"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Mobile Frame Container */}
      <div className="relative w-full max-w-70 sm:max-w-[320px] aspect-9/19.5 bg-black rounded-[40px] border-[6px] border-slate-800 shadow-[0_0_50px_rgba(0,229,255,0.25)] overflow-hidden flex flex-col justify-center items-center">
        {/* Mobile Camera Notch / Punch Hole */}
        <div className="absolute top-3 w-3 h-3 bg-slate-900 rounded-full z-20 border border-slate-700/50" />

        {/* Video Player */}
        <video
          src={videoUrl}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover rounded-4xl"
        />
      </div>
    </div>
  );
}
