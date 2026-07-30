"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { WebProject } from "../data";

interface WebProjectCardProps {
  project: WebProject;
}

export default function WebProjectCard({
  project,
}: WebProjectCardProps): React.ReactNode {
  return (
    <div className="rounded-2xl bg-[#ffffff08] border border-[#ffffff14] p-4 flex flex-col justify-between transition-all duration-300 hover:border-[#c9a86a]/40 group">
      {/* 🖼️ Clean Image Box with Dynamic Scroll */}
      <div className="relative w-full h-80 rounded-xl overflow-hidden bg-[#05070f] mb-5 cursor-pointer">
        {/* Long Image Container */}
        {/*
            ✨ Magic trick:
            1. default (mouse-out): duration-500 (খুব দ্রুত উপরে ফিরে যাবে)
            2. group-hover (mouse-in): duration-[4000ms] (ধীরে ধীরে নিচে স্ক্রল করবে)
        */}
        <div className="relative w-full transition-all duration-1000 ease-in-out group-hover:duration-5000 group-hover:-translate-y-[calc(100%-320px)]">
          <Image
            src={`/website-images/${project.imageSrc}`}
            alt={project.title}
            width={800}
            height={2400}
            className="w-full h-auto object-top opacity-90 group-hover:opacity-100 transition-opacity duration-300"
            priority={false}
          />
        </div>

        {/* Minimal Hover Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 pointer-events-none group-hover:pointer-events-auto">
          <Link
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#c9a86a] text-[#070913] font-bold text-xs hover:bg-[#dfbd7e] transition-all duration-300 shadow-lg"
          >
            <span>Visit Site</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </Link>
        </div>
      </div>

      {/* 📝 Minimal Info Section */}
      <div className="px-1 pb-1">
        <div className="flex items-center justify-between mb-1.5">
          <h3 className="cabinet text-xl font-bold text-white group-hover:text-[#c9a86a] transition-colors duration-300">
            {project.title}
          </h3>
          <span className="text-[10px] font-mono text-[#c9a86a] bg-[#c9a86a]/10 px-2 py-0.5 rounded border border-[#c9a86a]/20">
            {project.techStack[0]}
          </span>
        </div>

        <p className="garet text-slate-400 text-xs leading-relaxed line-clamp-2">
          {project.description}
        </p>
      </div>
    </div>
  );
}
