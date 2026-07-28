import React from "react";
import { Cpu, Atom, Smartphone, Gamepad2 } from "lucide-react";

export default function OurGrowthSection() {
  return (
    <section className="w-full py-16 px-15 flex items-center justify-between gap-12">
      {/* 🌀 বামদিকের ঘূর্ণায়মান অরবিট অ্যানিমেশন */}
      <div className="w-2/5 flex items-center justify-center relative min-h-100">
        {/* সেন্টার গোল্ডেন সার্কেল */}
        <div className="w-32 h-32 rounded-full border-2 border-[#c9a86a] absolute z-0 shadow-[0_0_20px_rgba(201,168,106,0.15)]" />

        {/* ঘূর্নায়মান ড্যাশড অরবিট রিং (CSS Spin) */}
        <div className="w-72 h-72 rounded-full border-2 border-dashed border-gray-600/60 absolute animate-[spin_25s_linear_infinite] flex items-center justify-center">
          {/* আইকন ১: চিপ/হার্ডওয়্যার (Top-Left) */}
          <div className="absolute top-2 left-8 -translate-x-1/2 -translate-y-1/2">
            <div className="animate-[spin_25s_linear_infinite_reverse]">
              <div className="w-12 h-12 rounded-full bg-[#0a1128] border-2 border-[#00f2fe] flex items-center justify-center text-[#00f2fe] shadow-[0_0_12px_rgba(0,242,254,0.3)]">
                <Cpu size={20} />
              </div>
            </div>
          </div>

          {/* আইকন ২: রিঅ্যাক্ট/ওয়েব (Top-Right) */}
          <div className="absolute top-1/4 right-0 translate-x-1/2 -translate-y-1/2">
            <div className="animate-[spin_25s_linear_infinite_reverse]">
              <div className="w-12 h-12 rounded-full bg-[#0a1128] border-2 border-[#00f2fe] flex items-center justify-center text-[#00f2fe] shadow-[0_0_12px_rgba(0,242,254,0.3)]">
                <Atom size={20} />
              </div>
            </div>
          </div>

          {/* আইকন ৩: অ্যান্ড্রয়েড/মোবাইল (Bottom-Right) */}
          <div className="absolute bottom-2 right-8 translate-x-1/2 translate-y-1/2">
            <div className="animate-[spin_25s_linear_infinite_reverse]">
              <div className="w-12 h-12 rounded-full bg-[#0a1128] border-2 border-[#00f2fe] flex items-center justify-center text-[#00f2fe] shadow-[0_0_12px_rgba(0,242,254,0.3)]">
                <Smartphone size={20} />
              </div>
            </div>
          </div>

          {/* আইকন ৪: ইউনিটি/গেমিং (Bottom-Left) */}
          <div className="absolute bottom-1/4 left-0 -translate-x-1/2 translate-y-1/2">
            <div className="animate-[spin_25s_linear_infinite_reverse]">
              <div className="w-12 h-12 rounded-full bg-[#0a1128] border-2 border-[#00f2fe] flex items-center justify-center text-[#00f2fe] shadow-[0_0_12px_rgba(0,242,254,0.3)]">
                <Gamepad2 size={20} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 📝 ডানদিকের টেক্সট কন্টেন্ট */}
      <div className="w-3/5 space-y-6 text-left">
        {/* গোল্ডেন ট্যাগ */}
        <p className="golden-tag">
          OUR GROWTH
        </p>

        {/* হেডিং */}
        <h2 className="cabinet gradient-text text-4xl md:text-4xl font-extrabold tracking-tight leading-tight">
          Driven by Passion, Built for Impact
        </h2>

        {/* প্যারাগ্রাফ ১ */}
        <p className="garet text-sm md:text-base leading-relaxed text-gray-400">
          At <span className="text-white font-semibold">Grow Tech</span>, we
          don&apos;t just write code; we architect success. Our journey began in the
          heart of Kolkata, fueled by the relentless energy of four best
          friends. What started as late-night coding sessions and ambitious
          brainstorming has evolved into a unified digital ecosystem.
        </p>

        {/* প্যারাগ্রাফ ২ */}
        <p className="garet text-sm md:text-base leading-relaxed text-gray-400">
          Today, we bridge the gap between imagination and reality—delivering
          high-performance software and expert hardware solutions with a
          commitment to quality that only a dedicated team like ours can
          provide.
        </p>

        {/* স্ট্যাটিস্টিক্স (Stats Row) */}
        <div className="flex items-center gap-12 pt-4">
          {/* স্ট্যাট ১ */}
          <div className="space-y-1">
            <h3 className="cabinet text-4xl font-extrabold text-[#c9a86a]">
              100%
            </h3>
            <p className="garet text-xs text-gray-400 font-medium tracking-wide">
              Dedication
            </p>
          </div>

          {/* স্ট্যাট ২ */}
          <div className="space-y-1">
            <h3 className="cabinet text-4xl font-extrabold text-[#00f2fe]">
              24/7
            </h3>
            <p className="garet text-xs text-gray-400 font-medium tracking-wide">
              Technical Support
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
