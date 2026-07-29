"use client";

import React from "react";
import Image from "next/image";
import { Code2, Smartphone, Server, Gamepad2, Zap, Layers } from "lucide-react";

interface TechItem {
  name: string;
  IconComponent: React.ElementType;
}

const techStack: TechItem[] = [
  { name: "React / Next.js", IconComponent: Code2 },
  { name: "Flutter", IconComponent: Smartphone },
  { name: "Node.js", IconComponent: Server },
  { name: "Unity", IconComponent: Gamepad2 },
  { name: "Firebase", IconComponent: Zap },
  { name: "Tech Ecosystem", IconComponent: Layers },
];

const TechStackSection = () => {
  return (
    <section className="flex w-full flex-col items-center justify-center overflow-hidden px-6 py-20 sm:px-8 lg:px-16">
      <style jsx>{`
        @keyframes gtPulse {
          0% {
            transform: scale(0.35);
            opacity: 0.9;
          }

          50% {
            transform: scale(1.15);
            opacity: 0.2;
          }

          100% {
            transform: scale(0.35);
            opacity: 0.9;
          }
        }

        .gt-pulse-circle {
          animation: gtPulse 3.5s ease-in-out infinite;
        }
      `}</style>

      {/* Header */}
      <div className="mb-14 text-center">
        <span className="golden-tag">OUR POWERHOUSE</span>

        <h2 className="cabinet mx-auto mt-3 max-w-2xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
          <span className="gradient-text">Tech We Use to Build</span>
        </h2>
      </div>

      {/* Orbit */}
      <div className="relative flex h-70 w-70 items-center justify-center sm:h-95 sm:w-95 md:h-107.5 md:w-107.5">
        {/* Pulse */}
        <div className="gt-pulse-circle pointer-events-none absolute inset-0 rounded-full border border-cyan-400/50 shadow-[0_0_25px_rgba(0,229,255,0.3)]" />

        {/* Ring */}
        <div className="pointer-events-none absolute inset-2 rounded-full border border-slate-800/80" />

        {/* Logo */}
        <div className="relative z-10 flex items-center justify-center">
          <Image
            src="/images/gt.png"
            alt="Grow Tech Logo"
            width={100}
            height={100}
            priority
            className="h-auto w-auto object-contain drop-shadow-[0_0_20px_rgba(201,168,106,0.5)] sm:w-27.5"
          />
        </div>

        {/* Tech Items */}
        {techStack.map((tech, index) => {
          const angle =
            (index * (360 / techStack.length) - 90) * (Math.PI / 180);

          const radius =
            typeof window !== "undefined" && window.innerWidth < 640
              ? 125
              : 185;

          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          const Icon = tech.IconComponent;

          return (
            <div
              key={tech.name}
              style={{
                transform: `translate(${x}px, ${y}px)`,
              }}
              className="group absolute z-20 flex cursor-pointer flex-col items-center justify-center transition-transform duration-300 hover:scale-110"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#ffffff14] bg-[#ffffff08] transition-all duration-300 group-hover:border-cyan-400 group-hover:bg-[#00e5ff10] group-hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] sm:h-16 sm:w-16">
                <Icon className="h-6 w-6 text-[#c9a86a] transition-colors duration-300 group-hover:text-cyan-400 sm:h-7 sm:w-7" />
              </div>

              <span className="garet absolute -bottom-7 whitespace-nowrap text-xs font-semibold tracking-wider text-cyan-400 opacity-0 transition-all duration-300 group-hover:opacity-100">
                {tech.name}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TechStackSection;
