"use client";

import React, { Suspense, useTransition, useMemo } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Briefcase, Boxes, Layers } from "lucide-react";
import { gameProjects } from "./data";
import GameHeader from "./_components/GameHeader";
import GameCard from "./_components/GameCard";
import GameTrailerModal from "./_components/GameTrailerModal";
import UniverseFilterBar, {
  FilterTabItem,
  FilterOptionItem,
} from "@/components/ui/UniverseFilterBar";

// 🏷️ ১. সোর্স ট্যাব
const GAME_TABS: readonly FilterTabItem<"all" | "own" | "client">[] = [
  {
    id: "all",
    label: "All",
    fullLabel: "All Games",
    icon: Layers,
  },
  {
    id: "own",
    label: "Grow Tech",
    fullLabel: "Grow Tech Originals",
    icon: Boxes,
  },
  {
    id: "client",
    label: "Clients",
    fullLabel: "Client Works",
    icon: Briefcase,
  },
] as const;

// 🎮 ২. গেম সার্ভিসের ক্যাটাগরি অপশনসমূহ
const GAME_SERVICE_OPTIONS: readonly FilterOptionItem[] = [
  {
    id: "all",
    label: "All Services",
    desc: "Show complete games and all engineering disciplines",
  },
  {
    id: "code",
    label: "C# Scripting & Mechanics",
    desc: "Movement, combat hits, weapon logic & rules (₹1,000 – ₹3,000)",
  },
  {
    id: "3d",
    label: "3D Assets & Modeling",
    desc: "Hard-surface props, weapons, vehicles & low-poly assets (₹500 – ₹4,000)",
  },
  {
    id: "design",
    label: "UI & Environment Design",
    desc: "Game HUDs, interactive menus & terrain level design (₹2,000 – ₹8,000)",
  },
  {
    id: "optimization",
    label: "FPS & Bug Optimization",
    desc: "Physics bug fixes, crash diagnosis & solid 60 FPS tuning (₹1,000 – ₹3,000)",
  },
] as const;

type GameTabType = (typeof GAME_TABS)[number]["id"];

function GameUniverseContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const [selectedTrailer, setSelectedTrailer] = React.useState<string | null>(
    null,
  );

  // 🔗 URL প্যারামিটার সিঙ্ক (Default: all)
  const currentTabParam = searchParams.get("tab");
  const activeTab: GameTabType =
    currentTabParam === "own" || currentTabParam === "client"
      ? currentTabParam
      : "all";

  const currentCategoryParam = searchParams.get("service") || "all";
  const selectedCategory = currentCategoryParam;

  // 🔄 ট্যাব পরিবর্তন হ্যান্ডলার
  const handleTabChange = (tabId: GameTabType) => {
    if (tabId === activeTab) return;

    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (tabId === "all") {
        params.delete("tab");
      } else {
        params.set("tab", tabId);
      }
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    });
  };

  // 🔄 সার্ভিস ফিল্টার পরিবর্তন হ্যান্ডলার
  const handleServiceChange = (serviceId: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (serviceId === "all") {
        params.delete("service");
      } else {
        params.set("service", serviceId);
      }
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    });
  };

  // 🎯 ফিল্টারিং লজিক
  const filteredProjects = useMemo(() => {
    return gameProjects.filter((project) => {
      const matchesTab = activeTab === "all" || project.category === activeTab;

      const matchesService =
        selectedCategory === "all" ||
        project.serviceCategory === selectedCategory;

      return matchesTab && matchesService;
    });
  }, [activeTab, selectedCategory]);

  return (
    <div className="w-full min-h-screen text-white px-3 sm:px-6 lg:px-10 py-10 sm:py-16 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <GameHeader />

        {/* 🎛️ রিইউজেবল ইউনিফাইড ফিল্টার বার */}
        <UniverseFilterBar
          tabs={GAME_TABS}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          options={GAME_SERVICE_OPTIONS}
          selectedOption={selectedCategory}
          onOptionChange={handleServiceChange}
          filterLabel="Service"
          layoutId="activeGameUniverseTabPill"
        />

        {/* 🎯 Projects Grid */}
        <div className="mb-16 sm:mb-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeTab}-${selectedCategory}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
            >
              {filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <div key={project.id} className="w-full">
                    <GameCard
                      project={project}
                      onViewTrailer={(url) => setSelectedTrailer(url)}
                    />
                  </div>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-16 sm:py-20 text-center border border-dashed border-[#ffffff15] rounded-3xl bg-[#ffffff03] backdrop-blur-sm px-4">
                  <div className="p-3.5 rounded-2xl bg-purple-400/10 border border-purple-400/20 mb-4 text-purple-400">
                    <Sparkles className="w-6 h-6 animate-pulse" />
                  </div>
                  <p className="text-slate-200 font-semibold text-sm sm:text-base">
                    No games match this selection
                  </p>
                  <p className="text-slate-500 text-xs mt-1.5 max-w-xs mx-auto">
                    Try switching tabs or resetting the service filter to view
                    more games.
                  </p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 🎬 Trailer Popup Modal */}
        <GameTrailerModal
          isOpen={!!selectedTrailer}
          onClose={() => setSelectedTrailer(null)}
          trailerUrl={selectedTrailer || ""}
        />
      </div>
    </div>
  );
}

export default function GameUniversePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-950" />}>
      <GameUniverseContent />
    </Suspense>
  );
}
