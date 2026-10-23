"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, type PanInfo } from "motion/react";
import { Filter, Check, X, ChevronDown, type LucideIcon } from "lucide-react";

export interface FilterTabItem<T extends string = string> {
  id: T;
  label: string;
  fullLabel: string;
  icon: LucideIcon;
}

export interface FilterOptionItem<T extends string = string> {
  id: T;
  label: string;
  desc?: string;
}

interface UniverseFilterBarProps<TTab extends string, TOption extends string> {
  tabs: readonly FilterTabItem<TTab>[];
  activeTab: TTab;
  onTabChange: (tabId: TTab) => void;
  options: readonly FilterOptionItem<TOption>[];
  selectedOption: TOption;
  onOptionChange: (optionId: TOption) => void;
  filterLabel?: string;
  layoutId?: string;
}

export default function UniverseFilterBar<
  TTab extends string,
  TOption extends string,
>({
  tabs,
  activeTab,
  onTabChange,
  options,
  selectedOption,
  onOptionChange,
  filterLabel = "Filter",
  layoutId = "activeUniverseTabPill",
}: UniverseFilterBarProps<TTab, TOption>) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 🚫 শুধুমাত্র মোবাইলে (< 640px) বটম ড্রয়ার ওপেন থাকলে বডি স্ক্রোল লক হবে
  useEffect(() => {
    const isMobile = window.innerWidth < 640;
    if (isMenuOpen && isMobile) {
      const originalOverflow = document.body.style.overflow;
      const originalTouchAction = document.body.style.touchAction;

      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";

      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.touchAction = originalTouchAction;
      };
    } else {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
    }
  }, [isMenuOpen]);

  // ⌨️ Escape কী প্রেস, উইন্ডো রিসাইজ এবং ক্লিক-আউটসাইড হ্যান্ডলার
  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    const handleResize = () => {
      // স্ক্রিন সাইজ মোবাইলের বাইরে গেলে মেনু রিসেট হবে
      if (window.innerWidth >= 640) {
        setIsMenuOpen(false);
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      // ডেস্কটপে ড্রপডাউনের বাইরে ক্লিক করলে বন্ধ হবে কিন্তু ক্লিকে বাধা দেবে না
      if (
        window.innerWidth >= 640 &&
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);
    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isMenuOpen]);

  const currentOptionLabel =
    options.find((opt) => opt.id === selectedOption)?.label || "All";

  const handleSelectOption = (optionId: TOption) => {
    onOptionChange(optionId);
    setIsMenuOpen(false);
  };

  // 📱 নিচে টেনে নামানোর হ্যান্ডলার (শুধু মোবাইল)
  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (info.offset.y > 80 || info.velocity.y > 300) {
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="sticky top-20 z-30 mb-8 sm:mb-12">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 p-2 rounded-2xl sm:rounded-full bg-[#0a1128]/95 sm:bg-[#0a1128]/90 border border-[#1c2d66] sm:backdrop-blur-2xl shadow-xl">
        {/* 🏷️ ডায়নামিক ট্যাব গ্রিড */}
        <div
          className="grid gap-1 w-full sm:w-auto sm:flex sm:items-center"
          style={{
            gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))`,
          }}
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onTabChange(tab.id)}
                className={`relative z-10 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-2 px-1.5 sm:px-4 rounded-xl sm:rounded-full text-[11px] sm:text-xs font-semibold transition-colors duration-150 cursor-pointer select-none text-center ${
                  isActive
                    ? "text-slate-950 font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId={layoutId}
                    className="absolute inset-0 rounded-xl sm:rounded-full bg-linear-to-r from-cyan-400 via-cyan-300 to-blue-400 shadow-[0_0_15px_rgba(34,211,238,0.35)] transform-gpu will-change-transform"
                    transition={{
                      type: "spring",
                      stiffness: 550,
                      damping: 38,
                      mass: 0.5,
                    }}
                  />
                )}

                <span className="relative z-10 flex flex-col sm:flex-row items-center gap-1 sm:gap-1.5">
                  <Icon className="w-3.5 h-3.5 shrink-0 stroke-[2.2]" />
                  <span className="sm:hidden leading-none">{tab.label}</span>
                  <span className="hidden sm:inline">{tab.fullLabel}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* 📦 ডায়নামিক ফিল্টার ড্রপডাউন বাটন্স */}
        <div ref={containerRef} className="relative w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="flex items-center justify-between sm:justify-start gap-2.5 w-full sm:w-auto px-4 py-2.5 rounded-xl sm:rounded-full bg-[#132247]/90 sm:bg-[#132247]/70 border border-[#243982] hover:border-cyan-500/50 transition-colors shadow-inner cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span className="text-[11px] font-mono text-slate-400 uppercase sm:hidden">
                {filterLabel}:
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
              <span>{currentOptionLabel}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-cyan-400 shrink-0 transition-transform duration-200 ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
            </div>
          </button>

          {/* 🖥️ ডেস্কটপ পপওভার */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="hidden sm:block absolute right-0 mt-2 w-64 rounded-2xl bg-[#0a1128]/95 border border-[#1c2d66] p-1.5 shadow-[0_15px_35px_rgba(0,0,0,0.6)] backdrop-blur-2xl z-40 select-none transform-gpu will-change-transform"
              >
                <div className="space-y-0.5">
                  {options.map((opt) => {
                    const isSelected = selectedOption === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => handleSelectOption(opt.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-colors cursor-pointer ${
                          isSelected
                            ? "bg-cyan-500/15 text-cyan-300 font-semibold"
                            : "text-slate-300 hover:bg-white/5 hover:text-white"
                        }`}
                      >
                        <span className="text-xs">{opt.label}</span>
                        {isSelected && (
                          <Check className="w-3.5 h-3.5 text-cyan-400 stroke-[2.5]" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 📱 অপ্টিমাইজড মোবাইল বটম ড্রয়ার */}
      <AnimatePresence>
        {isMenuOpen && (
          <div className="sm:hidden fixed inset-0 z-50 flex items-end justify-center">
            {/* মোবাইলের ব্যাকড্রপ: ক্লিক করলেই ড্রয়ার বন্ধ হবে */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => setIsMenuOpen(false)}
              className="absolute inset-0 bg-slate-950/80"
            />

            {/* ড্রয়ার কন্টেন্ট */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              drag="y"
              dragDirectionLock
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.7 }}
              onDragEnd={handleDragEnd}
              dragTransition={{
                bounceStiffness: 600,
                bounceDamping: 35,
              }}
              transition={{
                type: "spring",
                stiffness: 550,
                damping: 32,
                mass: 0.45,
              }}
              className="relative w-full rounded-t-3xl bg-[#0d1635] border-t border-[#1c2d66] p-5 shadow-[0_-10px_25px_rgba(0,0,0,0.5)] z-10 select-none max-h-[85vh] transform-gpu will-change-transform touch-none"
            >
              {/* ড্র্যাগ ইন্ডিকেটর বার */}
              <div className="w-12 h-1.5 rounded-full bg-white/25 mx-auto mb-4 cursor-grab active:cursor-grabbing" />

              <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-cyan-400" />
                  <h3 className="text-sm font-bold text-white tracking-wide">
                    Select {filterLabel}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-1.5">
                {options.map((opt) => {
                  const isSelected = selectedOption === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleSelectOption(opt.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-2xl transition-all cursor-pointer text-left active:scale-[0.98] ${
                        isSelected
                          ? "bg-cyan-500/15 border border-cyan-400/30 text-white"
                          : "hover:bg-white/5 border border-transparent text-slate-300"
                      }`}
                    >
                      <div>
                        <span
                          className={`text-xs font-bold ${
                            isSelected ? "text-cyan-300" : "text-white"
                          }`}
                        >
                          {opt.label}
                        </span>
                        {opt.desc && (
                          <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                            {opt.desc}
                          </p>
                        )}
                      </div>
                      {isSelected && (
                        <div className="w-5 h-5 rounded-full bg-cyan-400 flex items-center justify-center shrink-0">
                          <Check className="w-3 h-3 text-slate-950 stroke-3" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
