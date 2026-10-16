"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Lenis instance check ba universal scroll tracker
    const handleScroll = () => {
      // 1. Sob dhoroner browser container check kora
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

      if (scrollTop > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      if (totalHeight > 0) {
        const progress = Math.min(
          100,
          Math.max(0, (scrollTop / totalHeight) * 100),
        );
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  // ⚡ Formula fixing
  const strokeDashoffset =
    circumference - (scrollProgress / 100) * circumference;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={`group relative flex items-center justify-center w-12 h-12 rounded-full bg-[#0d1527]/90 text-cyan-400 backdrop-blur-md shadow-[0_0_20px_rgba(0,229,255,0.2)] transition-all duration-300 hover:scale-110 hover:text-white cursor-pointer active:scale-95 ${
          isVisible
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <svg
          className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
          viewBox="0 0 48 48"
        >
          <circle
            cx="24"
            cy="24"
            r={radius}
            className="stroke-white/10"
            strokeWidth="3"
            fill="transparent"
          />
          <circle
            cx="24"
            cy="24"
            r={radius}
            stroke="#22d3ee"
            strokeWidth="3"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
          />
        </svg>

        <ArrowUp className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1 relative z-10" />
      </button>
    </div>
  );
}
