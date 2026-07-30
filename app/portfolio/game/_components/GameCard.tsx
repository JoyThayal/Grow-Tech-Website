"use client";

import React from "react";
import Image from "next/image";
import { Play, Download, Star } from "lucide-react";
import { GameProject } from "../data";

interface GameCardProps {
  project: GameProject;
  onViewTrailer: (trailerUrl: string) => void; // 👈 videoUrl-এর জায়গায় trailerUrl রাখা হলো
}

export default function GameCard({ project, onViewTrailer }: GameCardProps) {
  // ১. Coming Soon Card-এর জন্য আলাদা সিম্পল লুক
  if (project.isComingSoon) {
    return (
      <div className="rounded-3xl bg-[#ffffff08] border border-[#ffffff14] p-5 flex flex-col justify-between transition-all duration-300">
        <div>
          <div className="relative w-full h-56 rounded-2xl overflow-hidden bg-slate-900 mb-5">
            <Image
              src={`/game-images/${project.imageSrc}`}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>

          <h3 className="cabinet text-xl font-bold text-white mb-2">
            {project.title}
          </h3>

          <p className="text-slate-400 text-xs leading-relaxed">
            {project.description}
          </p>
        </div>
      </div>
    );
  }

  // ২. Active Game Card (Purple Glow Border সহ)
  return (
    <div className="rounded-3xl bg-[#ffffff08] border border-purple-500/60 p-5 flex flex-col justify-between shadow-[0_0_25px_rgba(168,85,247,0.15)] transition-all duration-300 hover:shadow-[0_0_35px_rgba(168,85,247,0.3)] hover:border-purple-400 group">
      <div>
        {/* Image & Hover Action Overlay */}
        <div className="relative w-full h-56 rounded-2xl overflow-hidden bg-slate-900 mb-5">
          <Image
            src={`/game-images/${project.imageSrc}`}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Hover Buttons */}
          <div className="absolute inset-0 bg-slate-950/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm flex flex-col items-center justify-center gap-3 p-4">
            {project.trailerUrl && (
              <button
                onClick={() => onViewTrailer(project.trailerUrl!)}
                className="w-full max-w-50 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-cyan-400 text-slate-950 font-bold text-xs hover:bg-cyan-300 transition-all shadow-lg cursor-pointer"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>View Trailer</span>
              </button>
            )}

            {project.downloadUrl && (
              <a
                href={project.downloadUrl}
                download
                className="w-full max-w-50 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-purple-950/80 border border-purple-500/50 text-purple-300 font-bold text-xs hover:bg-purple-900/80 transition-all shadow-lg cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </a>
            )}
          </div>
        </div>

        {/* Header: Title & Star Rating */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="cabinet text-xl font-bold text-white">
            {project.title}
          </h3>

          {project.rating && (
            <div className="flex items-center gap-1 text-amber-400 text-sm font-bold">
              <Star className="w-4 h-4 fill-amber-400" />
              <span>{project.rating}</span>
            </div>
          )}
        </div>

        {/* Tech Stack Badges */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex items-center gap-2 mb-4">
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-md border border-white/10 bg-white/5 text-[10px] font-medium text-slate-300 tracking-wider"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Description */}
        <p className="text-slate-300 text-xs leading-relaxed">
          {project.description}
        </p>
      </div>
    </div>
  );
}
