"use client";

import React from "react";
import Image from "next/image";
import {
  Code2, // React / Web
  Smartphone, // Flutter / Mobile App
  Server, // Node.js / Backend
  Gamepad2, // Unity / Game Dev
  Zap, // Firebase / Database
  Layers, // Tech Ecosystem
} from "lucide-react";

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

const TechStackSection: React.FC = () => {
  return (
    <section className="w-full px-15 py-20 flex flex-col items-center justify-center overflow-hidden">
      {/* Pulse Animation Style Inject */}
      <style jsx>{`
        @keyframes gtPulse {
          0% {
            transform: scale(0.35); /* একদম মাঝখানের GT ইমেজের কাছে ছোট থাকবে */
            opacity: 0.9;
          }
          50% {
            transform: scale(1.15); /* বাইরের দিকে বড় হয়ে ছড়াবে */
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

      {/* Header Area */}
      <div className="text-center mb-16">
        <span className="golden-tag">OUR POWERHOUSE</span>

        <h2 className="cabinet gradient-text text-4xl font-bold tracking-tight max-w-2xl mx-auto leading-tight mt-2">
          Tech We Use to Build
        </h2>
      </div>

      {/* Orbit Container */}
      <div className="relative w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] flex items-center justify-center">
        {/* Animated Smooth Expanding Pulse Circle (Gt অব্দি ছোট থেকে বড় হবে) */}
        <div className="gt-pulse-circle absolute inset-0 rounded-full border border-cyan-400/50 shadow-[0_0_25px_rgba(0,229,255,0.3)] pointer-events-none" />

        {/* Fixed Orbit Line Ring */}
        <div className="absolute inset-2 rounded-full border border-slate-800/80 pointer-events-none" />

        {/* Center GT Logo Image */}
        <div className="relative z-10 flex items-center justify-center">
          <Image
            src="/images/gt.png" // তোমার GT লোগো ইমেজের ফাইল পাথ এখানে দেবে
            alt="Grow Tech Logo"
            width={100}
            height={100}
            priority
            className="w-auto h-auto object-contain drop-shadow-[0_0_20px_rgba(201,168,106,0.5)]"
          />
        </div>

        {/* Circular Tech Icons */}
        {techStack.map((tech, index) => {
          // 60 deg apart for 6 items
          const angle =
            (index * (360 / techStack.length) - 90) * (Math.PI / 180);
          const radius = 180; // Circle radius

          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          const Icon = tech.IconComponent;

          return (
            <div
              key={tech.name}
              style={{
                transform: `translate(${x}px, ${y}px)`,
              }}
              className="absolute group flex flex-col items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-110 z-20"
            >
              {/* Icon Box */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#ffffff08] border border-[#ffffff14] flex items-center justify-center transition-all duration-300 group-hover:bg-[#00e5ff10] group-hover:border-cyan-400 group-hover:shadow-[0_0_20px_rgba(0,229,255,0.4)]">
                <Icon className="w-7 h-7 text-[#c9a86a] transition-colors duration-300 group-hover:text-cyan-400" />
              </div>

              {/* Hover Name Label */}
              <span className="garet absolute -bottom-7 text-xs font-semibold text-cyan-400 opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap tracking-wider">
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
