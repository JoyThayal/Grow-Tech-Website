"use client";

import React from "react";

interface StatItem {
  number: string;
  title: string;
  description: string;
}

const statsData: StatItem[] = [
  {
    number: "10 +",
    title: "SUCCESS STORIES",
    description: "High-end solutions delivered with 100% precision.",
  },
  {
    number: "1 +",
    title: "HAPPY PARTNERS",
    description: "Building long-term trust across the borders.",
  },
  {
    number: "1.5 +",
    title: "YEAR OF EXPERIENCE",
    description: "Continuous innovation and technical dedication.",
  },
];

export default function GrowthRealTimeSection(): React.ReactNode {
  return (
    <section className="w-full text-white py-10 lg:py-20 px-6 lg:px-15 flex flex-col items-center justify-center overflow-hidden">
      {/* 🌟 Header Area */}
      <div className="text-center flex flex-col items-center mb-16">
        <span className="golden-tag mb-3">OUR DIGITAL FOOTPRINT</span>

        <h2 className="cabinet text-4xl font-bold tracking-tight leading-tight">
          <span className="gradient-text">Growth In Real Time</span>
        </h2>

        {/* Small Golden Divider Line */}
        <div className="w-12 h-0.5 bg-[#c9a86a] mt-6 rounded-full" />
      </div>

      {/* 📊 Stats Cards Container */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className="rounded-3xl bg-[#ffffff08] border border-[#ffffff14] p-8 sm:p-10 flex flex-col items-center text-center transition-all duration-300 hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(0,229,255,0.12)] hover:-translate-y-1 group"
          >
            {/* ⭕ Circular Indicator */}
            <div className="relative w-40 h-40 flex items-center justify-center mb-8">
              <svg
                className="w-full h-full transform -rotate-90 overflow-visible"
                viewBox="0 0 100 100"
              >
                {/* Background Track Ring */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#ffffff12"
                  strokeWidth="4"
                  fill="none"
                />
                {/* Active Cyan Glowing Ring */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#00e5ff"
                  strokeWidth="5"
                  strokeDasharray="251"
                  strokeDashoffset="60"
                  strokeLinecap="round"
                  fill="none"
                  style={{
                    filter: "drop-shadow(0px 0px 8px rgba(0, 229, 255, 0.9))",
                  }}
                />
              </svg>

              {/* Number inside Circle */}
              <span className="absolute cabinet text-3xl sm:text-4xl font-extrabold text-[#c9a86a] tracking-tight">
                {stat.number}
              </span>
            </div>

            {/* Title */}
            <h3 className="cabinet text-md font-bold tracking-widest text-[#c9a86a] uppercase mb-3">
              {stat.title}
            </h3>

            {/* Description */}
            <p className="garet text-slate-400 text-xs sm:text-sm leading-relaxed max-w-xs">
              {stat.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
