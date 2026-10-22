"use client";

import React, { Suspense } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Briefcase, Boxes } from "lucide-react";
import { completedAppProjects } from "./data";
import AppHeader from "./_components/AppHeader";
import AppCard from "./_components/AppCard";
import VideoModal from "./_components/VideoModal";

const TABS = [
  {
    id: "own",
    label: "Grow Tech",
    fullLabel: "Grow Tech Projects",
    icon: Boxes,
  },
  {
    id: "client",
    label: "Clients",
    fullLabel: "Client Works",
    icon: Briefcase,
  },
] as const;

type TabType = (typeof TABS)[number]["id"];

function AppUniverseContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selectedVideo, setSelectedVideo] = React.useState<string | null>(null);

  // 🔗 সরাসরি URL থেকে activeTab নির্ধারণ
  const currentTabParam = searchParams.get("tab");
  const activeTab: TabType = currentTabParam === "client" ? "client" : "own";

  // 🔄 ট্যাবে ক্লিক করলে URL আপডেট
  const handleTabChange = (tabId: TabType) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tabId);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const filteredProjects = completedAppProjects.filter(
    (project) => project.category === activeTab,
  );

  return (
    <div className="w-full min-h-screen text-white px-3 sm:px-6 lg:px-10 py-10 sm:py-16 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        {/* 🌟 Top Header */}
        <AppHeader />

        {/* 🎛️ ১০০% নো-স্ক্রোল আল্ট্রা-রেসপনসিভ অ্যানিমেটেড ট্যাবস */}
        <div className="flex justify-center mb-10 sm:mb-14 px-1">
          <div className="grid grid-cols-2 sm:flex sm:items-center w-full max-w-md sm:w-auto p-1.5 rounded-2xl sm:rounded-full bg-[#ffffff05] border border-[#ffffff15] backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleTabChange(tab.id)}
                  className={`relative z-10 flex items-center justify-center gap-2 px-3 sm:px-6 py-2.5 rounded-xl sm:rounded-full text-xs sm:text-sm font-semibold transition-colors duration-200 cursor-pointer select-none text-center ${
                    isActive
                      ? "text-slate-950 font-bold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeAppTabIndicator"
                      className="absolute inset-0 rounded-xl sm:rounded-full bg-linear-to-r from-cyan-400 via-cyan-300 to-blue-400 shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                      transition={{
                        type: "spring",
                        stiffness: 450,
                        damping: 32,
                      }}
                    />
                  )}

                  <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 stroke-[2.2]" />
                    {/* মোবাইলে কম্প্যাক্ট নাম, বড় স্ক্রিনে পুরো নাম */}
                    <span className="sm:hidden">{tab.label}</span>
                    <span className="hidden sm:inline">{tab.fullLabel}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 🎯 Projects Grid */}
        <div className="mb-16 sm:mb-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8"
            >
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <div key={project.id} className="w-full">
                    <AppCard
                      project={project}
                      onViewLive={(url) => setSelectedVideo(url)}
                    />
                  </div>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-16 sm:py-20 text-center border border-dashed border-[#ffffff15] rounded-3xl bg-[#ffffff03] backdrop-blur-sm px-4">
                  <div className="p-3.5 rounded-2xl bg-cyan-400/10 border border-cyan-400/20 mb-4 text-cyan-400">
                    <Sparkles className="w-6 h-6 animate-pulse" />
                  </div>
                  <p className="text-slate-200 font-semibold text-sm sm:text-base">
                    No projects published yet
                  </p>
                  <p className="text-slate-500 text-xs mt-1.5 max-w-xs mx-auto">
                    Exciting projects are currently in development. Stay tuned!
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 🎬 Video Popup Modal */}
        <VideoModal
          isOpen={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
          videoUrl={selectedVideo || ""}
        />
      </div>
    </div>
  );
}

export default function AppUniversePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950" />}>
      <AppUniverseContent />
    </Suspense>
  );
}
