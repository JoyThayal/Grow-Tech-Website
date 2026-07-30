"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play, Download, Star } from "lucide-react";
import { GameProject } from "../data";

interface GameCardProps {
  project: GameProject;
  onViewTrailer: (trailerUrl: string) => void;
}

export default function GameCard({
  project,
  onViewTrailer,
}: GameCardProps): React.ReactNode {
  const [isOpen, setIsOpen] = useState(false);

  // Coming Soon Card
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

          <div>
            <h3 className="cabinet text-xl font-bold text-white mb-2 gradient-text">
              {project.title}
            </h3>
          </div>

          <p className="text-slate-400 text-xs leading-relaxed">
            {project.description}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => setIsOpen((prev) => !prev)}
      className="rounded-3xl bg-[#ffffff08] border border-purple-500/60 p-5 flex flex-col justify-between shadow-[0_0_25px_rgba(168,85,247,0.15)] transition-all duration-300 hover:shadow-[0_0_35px_rgba(168,85,247,0.3)] hover:border-purple-400 group cursor-pointer"
    >
      <div>
        {/* Image */}
        <div className="relative w-full h-56 rounded-2xl overflow-hidden bg-slate-900 mb-5">
          <Image
            src={`/game-images/${project.imageSrc}`}
            alt={project.title}
            fill
            className={`
              object-cover transition-transform duration-500
              md:group-hover:scale-105
              ${isOpen ? "scale-105" : "scale-100"}
            `}
          />

          {/* Overlay */}
          <div
            className={`
              absolute inset-0
              bg-slate-950/75
              backdrop-blur-sm
              flex flex-col items-center justify-center gap-3 p-4
              transition-opacity duration-300

              ${
                isOpen
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }

              md:opacity-0
              md:pointer-events-none
              md:group-hover:opacity-100
              md:group-hover:pointer-events-auto
            `}
          >
            {project.trailerUrl && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onViewTrailer(project.trailerUrl!);
                }}
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
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-50 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-purple-950/80 border border-purple-500/50 text-purple-300 font-bold text-xs hover:bg-purple-900/80 transition-all shadow-lg cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </a>
            )}
          </div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="cabinet text-xl font-bold">
            <span className="gradient-text">{project.title}</span>
          </h3>

          {project.rating && (
            <div className="flex items-center gap-1 text-amber-400 text-sm font-bold">
              <Star className="w-4 h-4 fill-amber-400" />
              <span>{project.rating}</span>
            </div>
          )}
        </div>

        {/* Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="flex items-center gap-2 mb-4 flex-wrap">
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
