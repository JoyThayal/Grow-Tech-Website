"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface ProjectBrowserMockupProps {
  title: string;
  imageSrc: string;
  videoUrl?: string;
  packageName?: string;
  packagePrice?: string;
  packageStyle?: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onVisit: () => void;
}

export default function ProjectBrowserMockup({
  title,
  imageSrc,
  videoUrl,
  packageName,
  packagePrice,
  packageStyle,
  isOpen,
  setIsOpen,
  onVisit,
}: ProjectBrowserMockupProps) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const showVideo = Boolean(videoUrl && (isHovered || isOpen));

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="rounded-xl overflow-hidden border border-white/10 bg-[#05070f] mb-4 shadow-lg shrink-0 select-none"
    >
      {/* 🌐 Browser Top Bar */}
      <div className="flex items-center justify-between gap-2 px-3 py-2 sm:px-3.5 sm:py-2.5 bg-[#0d1527] border-b border-white/10 text-[11px] font-mono">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-40" />
            <span className="relative inline-flex rounded-full h-full w-full bg-rose-500/80" />
          </span>
          <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-40 [animation-delay:200ms]" />
            <span className="relative inline-flex rounded-full h-full w-full bg-amber-500/80" />
          </span>
          <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-40 [animation-delay:400ms]" />
            <span className="relative inline-flex rounded-full h-full w-full bg-emerald-500/80" />
          </span>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2 overflow-hidden">
          <span
            className={`truncate max-w-27.5 sm:max-w-none text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full border font-bold uppercase tracking-wider ${
              packageStyle ||
              "text-slate-400 bg-slate-500/10 border-slate-500/20"
            }`}
          >
            {packageName || "Single Page"}
          </span>

          {packagePrice && (
            <span className="text-cyan-300 font-bold font-mono text-[10px] shrink-0">
              {packagePrice}
            </span>
          )}
        </div>
      </div>

      {/* 🖼️ / 🎬 Media Container */}
      <div
        className={`relative w-full overflow-hidden bg-[#05070f] ${videoUrl ? "aspect-video" : "h-80"}`}
      >
        <div className="absolute inset-0 bg-[#ffffff10] animate-pulse z-0" />

        {videoUrl ? (
          <>
            <video
              ref={videoRef}
              src={videoUrl}
              muted
              loop
              playsInline
              preload="metadata"
              className={`absolute inset-0 w-full h-full object-cover z-10 transition-opacity duration-500 pointer-events-none ${
                showVideo ? "opacity-100" : "opacity-0"
              }`}
            />
            <div
              className={`relative w-full h-full z-10 transition-opacity duration-500 ${
                showVideo
                  ? "opacity-0"
                  : "opacity-90 md:group-hover:opacity-100"
              }`}
            >
              <Image
                src={imageSrc}
                alt={title}
                fill
                priority={false}
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </>
        ) : (
          <div
            className={`relative w-full transition-transform ease-in-out duration-500 z-10 md:group-hover:duration-5000 md:group-hover:-translate-y-[calc(100%-320px)] ${
              isOpen
                ? "-translate-y-[calc(100%-320px)] duration-5000"
                : "translate-y-0"
            }`}
          >
            <Image
              src={imageSrc}
              alt={title}
              width={800}
              height={2400}
              priority={false}
              className="w-full h-auto object-top opacity-90 md:group-hover:opacity-100 transition-opacity duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}

        {/* Visit Overlay Button */}
        <div
          className={`absolute inset-0 z-20 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          } md:opacity-0 md:group-hover:opacity-100`}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
              onVisit();
            }}
            className="pointer-events-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#c9a86a] text-[#070913] font-bold text-xs hover:bg-[#dfbd7e] hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(201,168,106,0.4)] cursor-pointer"
          >
            <span>Visit Site</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
}
