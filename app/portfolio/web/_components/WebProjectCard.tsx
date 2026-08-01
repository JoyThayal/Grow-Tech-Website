"use client";

import React, { useState } from "react";
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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      onClick={() => setIsOpen((prev) => !prev)}
      className="rounded-2xl bg-[#ffffff08] border border-[#ffffff14] p-4 flex flex-col justify-between transition-all duration-300 hover:border-[#c9a86a]/40 group cursor-pointer"
    >
      {/* 🖼️ Image Box */}
      <div className="relative w-full h-80 rounded-xl overflow-hidden bg-[#05070f] mb-5">
        {/* ⚡ SKELETON LOADER (ছবি লোড হওয়া পর্যন্ত শুধু ফাঁকা ভাব আটকাবে) */}
        <div className="absolute inset-0 bg-[#ffffff10] animate-pulse z-0" />

        {/* Image Scroll Wrapper */}
        <div
          className={`
            relative w-full transition-transform ease-in-out
            duration-500 z-10
            md:group-hover:duration-5000
            md:group-hover:-translate-y-[calc(100%-320px)]
            ${
              isOpen
                ? "-translate-y-[calc(100%-320px)] duration-5000"
                : "translate-y-0"
            }
          `}
        >
          <Image
            src={`/website-images/${project.imageSrc}`}
            alt={project.title}
            width={800}
            height={2400}
            priority={false}
            className="w-full h-auto object-top opacity-90 md:group-hover:opacity-100 transition-opacity duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Overlay Button (No Background Blur / No Black Overlay) */}
        <div
          className={`
            absolute inset-0 z-20
            flex items-center justify-center
            pointer-events-none
            transition-opacity duration-300

            ${isOpen ? "opacity-100" : "opacity-0"}

            md:opacity-0
            md:group-hover:opacity-100
          `}
        >
          <Link
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
            className="pointer-events-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#c9a86a] text-[#070913] font-bold text-xs hover:bg-[#dfbd7e] hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(201,168,106,0.4)] cursor-pointer"
          >
            <span>Visit Site</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </Link>
        </div>
      </div>

      {/* 📝 Info */}
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
