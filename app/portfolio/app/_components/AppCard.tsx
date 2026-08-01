"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play, Download } from "lucide-react";
import { AppProject } from "../data";

interface AppCardProps {
  project: AppProject;
  onViewLive: (videoUrl: string) => void;
}

export default function AppCard({
  project,
  onViewLive,
}: AppCardProps): React.ReactNode {
  // ডেস্কটপে Hover ব্যবহার করব, এবং মোবাইলে ক্লিক/স্টেট
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  return (
    <div
      // মোবাইলে ক্লিক করলে স্টেট টগল হবে
      onClick={() => setIsOverlayVisible((prev) => !prev)}
      className="rounded-3xl bg-[#ffffff08] border border-[#ffffff14] p-5 flex flex-col justify-between transition-all duration-300 hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(0,229,255,0.1)] group cursor-pointer"
    >
      <div>
        {/* Image Box - Fixed Ratio & Aspect */}
        <div className="relative w-full aspect-16/10 rounded-2xl overflow-hidden bg-slate-900 mb-5">
          {/* ✅ SKELETON LOADER (লোডিং-এর সময় ফাঁকা ভাব দূর করতে) */}
          <div className="absolute inset-0 bg-[#ffffff10] animate-pulse z-0" />

          <Image
            src={`/app-images/${project.imageSrc}`}
            alt={project.title}
            fill
            // ✅ SKELETON লজিক: ছবি লোড হলে স্কেলেটন ঢেকে যাবে
            className={`
              object-cover transition-all duration-500 z-10
              ${isOverlayVisible ? "scale-105" : "scale-100"}
              md:group-hover:scale-105
            `}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Overlay - Smother Transition */}
          <div
            className={`
              absolute inset-0 z-20
              bg-slate-950/70
              backdrop-blur-sm
              flex items-center justify-center gap-3 p-4
              transition-opacity duration-300 ease-in-out

              /* স্টেট অনুযায়ী মোবাইলে ভিজিবিলিটি */
              ${isOverlayVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}

              /* ডেস্কটপে Hover লজিক */
              md:opacity-0
              md:pointer-events-none
              md:group-hover:opacity-100
              md:group-hover:pointer-events-auto
            `}
          >
            {project.videoUrl && (
              <button
                onClick={(e) => {
                  e.stopPropagation(); // কার্ডের ক্লিক ইভেন্ট বন্ধ করা
                  // মোবাইল এবং ডেস্কটপ উভয় ক্ষেত্রেই লাইভ ভিউ চালু
                  onViewLive(project.videoUrl!);
                  // বোতামে ক্লিক করার পর মোবাইলে ওভারলে বন্ধ করে দেওয়া
                  setIsOverlayVisible(false);
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-400 text-slate-950 font-bold text-xs hover:bg-cyan-300 transition-all shadow-lg cursor-pointer"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>View Live</span>
              </button>
            )}

            {project.apkUrl && (
              <a
                href={project.apkUrl}
                download
                onClick={(e) => {
                  e.stopPropagation(); // কার্ডের ক্লিক ইভেন্ট বন্ধ করা
                  // ডাউনলোড শুরু করার পর মোবাইলে ওভারলে বন্ধ করা
                  setTimeout(() => setIsOverlayVisible(false), 500);
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-800 border border-white/20 text-white font-bold text-xs hover:bg-slate-700 transition-all shadow-lg cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Get App</span>
              </a>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="cabinet text-xl font-bold text-white mb-4">
          {project.title}{" "}
          <span className={`${project.highlightColor} font-extrabold`}>
            {project.highlightTitle}
          </span>
        </h3>

        {/* Features */}
        <div className="mb-6">
          <p className="text-cyan-400 text-[11px] font-bold tracking-wider uppercase mb-3">
            KEY FEATURES:
          </p>

          <ul className="space-y-2">
            {project.features.map((feature, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2 text-slate-300 text-xs leading-snug"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1 shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
