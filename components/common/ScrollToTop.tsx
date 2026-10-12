"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;

      const scrollHeight =
        document.documentElement.scrollHeight ||
        document.body.scrollHeight ||
        0;

      const clientHeight =
        document.documentElement.clientHeight || window.innerHeight || 0;

      const totalHeight = scrollHeight - clientHeight;

      // ২০০px স্ক্রোল করলেই বাটন দেখা যাবে
      setIsVisible(scrollTop > 200);

      if (totalHeight > 0) {
        // ১. প্রোগ্রেস পার্সেন্টেজ (০ থেকে ১০০)
        const progress = Math.min(
          100,
          Math.max(0, (scrollTop / totalHeight) * 100),
        );
        setScrollProgress(progress);

        // ২. মাউস স্ক্রোলের সাথে বর্ডার রোটেশন (চাকার মতো ঘুরবে) 🎡
        // এখানে factor বাড়িয়ে দিলে আরও দ্রুত ঘুরবে (যেমন: scrollTop * 0.8)
        setRotation(scrollTop * 0.5);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - (scrollProgress / 100) * circumference;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={`group relative flex items-center justify-center w-12 h-12 rounded-full bg-[#0d1527]/90 text-cyan-400 backdrop-blur-md shadow-[0_0_20px_rgba(0,229,255,0.25)] transition-all duration-300 hover:scale-110 hover:text-white cursor-pointer active:scale-95 ${
          isVisible
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        {/* 🎡 ঘূর্ণায়মান বর্ডার SVG */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none transition-transform ease-out duration-75"
          style={{ transform: `rotate(${rotation}deg)` }}
          viewBox="0 0 48 48"
        >
          {/* ব্যাকগ্রাউন্ড ড্যাশড ট্র্যাক (যাতে ঘোরার সময় দেখতে আরও দারুণ লাগে) */}
          <circle
            cx="24"
            cy="24"
            r={radius}
            className="stroke-white/10"
            strokeWidth="2.5"
            strokeDasharray="4 4"
            fill="transparent"
          />

          {/* স্ক্রোলের সাথে ফিল হওয়া এবং একসাথে ঘুরতে থাকা বর্ডার */}
          <circle
            cx="24"
            cy="24"
            r={radius}
            stroke="#22d3ee"
            strokeWidth="2.5"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>

        {/* ⬆️ Arrow Icon (এটা কিন্তু ঘুরবে না, সোজা ওপরের দিকেই থাকবে) */}
        <ArrowUp className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1 relative z-10" />
      </button>
    </div>
  );
}
