"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Boxes, Briefcase, Sparkles, Filter, Layers } from "lucide-react";
import WebHeader from "./_components/WebHeader";
import WebProjectCard from "./_components/WebProjectCard";
import { webProjectsData } from "./data";

const SOURCE_TABS = [
  { id: "all", label: "All", fullLabel: "All Works", icon: Layers },
  { id: "own", label: "Grow Tech", fullLabel: "Grow Tech", icon: Sparkles },
  { id: "client", label: "Client", fullLabel: "Client Works", icon: Briefcase },
  { id: "demo", label: "Templates", fullLabel: "Demo Templates", icon: Boxes },
] as const;

type SourceType = (typeof SOURCE_TABS)[number]["id"];

export default function WebUniversePage(): React.ReactNode {
  const [activeTab, setActiveTab] = useState<SourceType>("all");
  const [selectedPackage, setSelectedPackage] = useState<string>("all");

  const filteredProjects = useMemo(() => {
    return webProjectsData.filter((project) => {
      const matchesSource = activeTab === "all" || project.source === activeTab;
      const matchesPackage =
        selectedPackage === "all" || project.packageId === selectedPackage;

      return matchesSource && matchesPackage;
    });
  }, [activeTab, selectedPackage]);

  return (
    <main className="min-h-screen text-white px-3 sm:px-6 py-10 sm:py-16">
      <div className="mx-auto max-w-7xl">
        <WebHeader />

        {/* 🎛️ ১০০% নো-স্ক্রোল রেসপনসিভ ফিল্টার হাব */}
        <div className="sticky top-20 z-30 mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 p-2 rounded-2xl sm:rounded-full bg-[#0a1128]/90 border border-[#1c2d66] backdrop-blur-2xl shadow-2xl">
            {/* 🏷️ ৪টি ট্যাব (মোবাইলে স্ক্রিন ফিট গ্রিড, কোনো স্ক্রোল হবে না) */}
            <div className="grid grid-cols-4 sm:flex sm:items-center gap-1 w-full sm:w-auto">
              {SOURCE_TABS.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative z-10 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-2 px-1 sm:px-4 rounded-xl sm:rounded-full text-[11px] sm:text-xs font-semibold transition-colors duration-200 cursor-pointer select-none text-center ${
                      isActive
                        ? "text-slate-950 font-bold"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeWebTabPill"
                        className="absolute inset-0 rounded-xl sm:rounded-full bg-linear-to-r from-cyan-400 via-cyan-300 to-blue-400 shadow-[0_0_20px_rgba(34,211,238,0.35)]"
                        transition={{
                          type: "spring",
                          stiffness: 450,
                          damping: 32,
                        }}
                      />
                    )}

                    <span className="relative z-10 flex flex-col sm:flex-row items-center gap-1 sm:gap-1.5">
                      <Icon className="w-3.5 h-3.5 shrink-0 stroke-[2.2]" />
                      {/* মোবাইলে ছোট নাম, বড় স্ক্রিনে পুরো নাম */}
                      <span className="sm:hidden leading-none">
                        {tab.label}
                      </span>
                      <span className="hidden sm:inline">{tab.fullLabel}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* 📦 প্যাকেজ ড্রপডাউন (মোবাইলে পূর্ণ প্রস্থে ফিট) */}
            <div className="w-full sm:w-auto shrink-0">
              <div className="flex items-center justify-between sm:justify-start gap-2 w-full px-3.5 py-2 rounded-xl sm:rounded-full bg-[#132247]/70 border border-[#243982] hover:border-cyan-500/50 transition-colors">
                <div className="flex items-center gap-2">
                  <Filter className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span className="text-[11px] font-mono text-slate-400 uppercase sm:hidden">
                    Package:
                  </span>
                </div>
                <select
                  value={selectedPackage}
                  onChange={(e) => setSelectedPackage(e.target.value)}
                  className="bg-transparent text-slate-200 text-xs font-medium outline-none cursor-pointer text-right sm:text-left sm:w-36"
                >
                  <option value="all" className="bg-[#0a1128] text-white">
                    All Packages
                  </option>
                  <option
                    value="single-page"
                    className="bg-[#0a1128] text-white"
                  >
                    Single Page
                  </option>
                  <option
                    value="multi-page"
                    className="bg-[#0a1128] text-white"
                  >
                    Multi Page
                  </option>
                  <option
                    value="dynamic-portal"
                    className="bg-[#0a1128] text-white"
                  >
                    Dynamic Portal
                  </option>
                  <option
                    value="redesign-upgrade"
                    className="bg-[#0a1128] text-white"
                  >
                    Redesign
                  </option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* 🎯 Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeTab}-${selectedPackage}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="grid gap-5 sm:gap-6 lg:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          >
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <div key={project.id} className="w-full">
                  <WebProjectCard project={project} />
                </div>
              ))
            ) : (
              <div className="col-span-full py-16 sm:py-20 text-center border border-dashed border-[#ffffff14] rounded-3xl bg-[#ffffff03] backdrop-blur-sm px-4">
                <Sparkles className="w-8 h-8 text-cyan-400/60 mx-auto mb-3 animate-pulse" />
                <p className="text-slate-200 font-semibold text-sm sm:text-base">
                  No projects match this selection
                </p>
                <p className="text-slate-500 text-xs mt-1 max-w-sm mx-auto">
                  Try switching tabs or resetting the package filter to view
                  more work.
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
