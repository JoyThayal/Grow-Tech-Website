import React from "react";

export default function WebHeader(): React.ReactNode {
  return (
    <div className="text-center flex flex-col items-center mb-16 relative z-10">
      <span className="golden-tag">
        OUR DIGITAL MASTERPIECES
      </span>

      <h1 className="cabinet text-4xl sm:text-5xl font-extrabold tracking-tight gradient-text">
        Web Universe
      </h1>

      <p className="garet text-slate-400 text-xs sm:text-sm max-w-xl mt-3 leading-relaxed">
        High-performance, scalable, and visually stunning web architecture
        crafted with precision.
      </p>

      {/* Thin Golden Divider */}
      <div className="w-12 h-0.5 bg-[#c9a86a] mt-6 rounded-full" />
    </div>
  );
}
