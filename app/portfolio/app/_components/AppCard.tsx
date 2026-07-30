"use client";

import React from "react";
import Image from "next/image";
import { Play, Download } from "lucide-react";
import { AppProject } from "../data";

interface AppCardProps {
  project: AppProject;
  onViewLive: (videoUrl: string) => void;
}

export default function AppCard({ project, onViewLive }: AppCardProps) {
  return (
    <div className="rounded-3xl bg-[#ffffff08] border border-[#ffffff14] p-5 flex flex-col justify-between transition-all duration-300 hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(0,229,255,0.1)] group">
      <div>
        {/* Image Box */}
        <div className="relative w-full h-56 rounded-2xl overflow-hidden bg-slate-900 mb-5 group">
          <Image
            src={`/app-images/${project.imageSrc}`}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Hover Buttons */}
          <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm flex items-center justify-center gap-3 p-4">
            {project.videoUrl && (
              <button
                onClick={() => onViewLive(project.videoUrl!)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-400 text-slate-950 font-bold text-xs hover:bg-cyan-300 transition-all shadow-lg cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-slate-950" />
                <span>View Live</span>
              </button>
            )}

            {project.apkUrl && (
              <a
                href={project.apkUrl}
                download
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 border border-white/20 text-white font-bold text-xs hover:bg-slate-700 transition-all shadow-lg cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Get App</span>
              </a>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="cabinet text-xl font-bold text-white mb-4">
          {project.title}{" "}
          <span className="text-amber-400 font-extrabold">
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
