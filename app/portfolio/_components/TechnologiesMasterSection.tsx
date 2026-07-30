"use client";

import React from "react";
import { Atom, Smartphone, Gamepad2, Cpu } from "lucide-react";

interface TechMasterItem {
  title: string;
  description: string;
  category: string;
  IconComponent: React.ElementType;
}

const techMasterData: TechMasterItem[] = [
  {
    title: "Web Architecture",
    description: "React, Next.js, Node.js & Cloud",
    category: "WEB DEVELOPMENT",
    IconComponent: Atom,
  },
  {
    title: "App Ecosystem",
    description: "Flutter, Firebase & Native Android",
    category: "MOBILE SOLUTIONS",
    IconComponent: Smartphone,
  },
  {
    title: "Game Engine",
    description: "Unity 3D, C# & Immersive Tech",
    category: "GAME DEVELOPMENT",
    IconComponent: Gamepad2,
  },
  {
    title: "Core Systems",
    description: "Hardware, OS & Cyber Security",
    category: "IT INFRASTRUCTURE",
    IconComponent: Cpu,
  },
];

export default function TechnologiesMasterSection(): React.ReactNode {
  return (
    <section className="w-full text-white py-20 px-6 lg:px-15 flex flex-col items-center justify-center overflow-hidden">
      
      {/* 🌟 Header Area */}
      <div className="text-center flex flex-col items-center mb-14">
        <span className="golden-tag mb-3">OUR POWERHOUSE</span>

        <h2 className="cabinet gradient-text text-4xl font-bold tracking-tight leading-tight">
          Technologies We Master
        </h2>

        {/* Small Golden Divider Line */}
        <div className="w-12 h-0.5 bg-[#c9a86a] mt-6 rounded-full" />
      </div>

      {/* 💻 4 Master Tech Cards Grid */}
      <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {techMasterData.map((item, index) => {
          const Icon = item.IconComponent;

          return (
            <div
              key={index}
              className="rounded-3xl bg-[#ffffff08] border border-[#ffffff14] p-8 flex flex-col items-center text-center transition-all duration-300 hover:border-cyan-500/40 hover:shadow-[0_0_25px_rgba(0,229,255,0.12)] group"
            >
              {/* Icon Container */}
              <div className="mb-6 text-[#c9a86a] group-hover:text-cyan-400 group-hover:scale-110 transition-all duration-300">
                <Icon className="w-10 h-10" />
              </div>

              {/* Title */}
              <h3 className="cabinet text-xl font-bold text-white mb-2">
                {item.title}
              </h3>

              {/* Description */}
              <p className="garet text-slate-400 text-xs leading-relaxed mb-8 min-h-8">
                {item.description}
              </p>

              {/* Bottom Golden Pill Badge (Not a button) */}
              <div className="mt-auto px-4 py-1.5 rounded-full bg-[#c9a86a] text-[#0a0d17] font-extrabold text-[10px] tracking-widest uppercase select-none">
                {item.category}
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}