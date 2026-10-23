"use client";

import React, { Suspense, useTransition, useMemo } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Briefcase, Boxes, Layers } from "lucide-react";
import { completedAppProjects } from "./data";
import AppHeader from "./_components/AppHeader";
import AppCard from "./_components/AppCard";
import VideoModal from "./_components/VideoModal";
import UniverseFilterBar, {
  FilterTabItem,
  FilterOptionItem,
} from "@/components/ui/UniverseFilterBar";

// 🏷️ ১. সোর্স ট্যাব (All সহ ৩টি ট্যাব)
const APP_TABS: readonly FilterTabItem<"all" | "own" | "client">[] = [
  {
    id: "all",
    label: "All",
    fullLabel: "All Works",
    icon: Layers,
  },
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

// 📦 অ্যাপ সার্ভিস প্যাকেজ অনুযায়ী ফিল্টার অপশনসমূহ
const APP_PACKAGE_OPTIONS: readonly FilterOptionItem[] = [
  {
    id: "all",
    label: "All Packages",
    desc: "Show apps across all architecture tiers",
  },
  {
    id: "basic-app",
    label: "Basic App / MVP",
    desc: "Offline-first Flutter apps, personal utilities & catalogs (₹8k–₹15k)",
  },
  {
    id: "business-app",
    label: "Business & Cloud",
    desc: "Auth, cloud databases, booking & order workflows (₹15k–₹30k)",
  },
  {
    id: "advanced-app",
    label: "Advanced Platform",
    desc: "Multi-role, REST API, notifications & admin dashboards (₹30k–₹60k+)",
  },
] as const;

type TabType = (typeof APP_TABS)[number]["id"];

function AppUniverseContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const [selectedVideo, setSelectedVideo] = React.useState<string | null>(null);

  // 🔗 সরাসরি URL প্যারামিটার থেকে ট্যাব ও ফিল্টার নির্ধারণ (Default: all)
  const currentTabParam = searchParams.get("tab");
  const activeTab: TabType =
    currentTabParam === "own" || currentTabParam === "client"
      ? currentTabParam
      : "all";

  const currentCategoryParam = searchParams.get("category") || "all";
  const selectedCategory = currentCategoryParam;

  // 🔄 ট্যাবে ক্লিক করলে URL আপডেট
  const handleTabChange = (tabId: TabType) => {
    if (tabId === activeTab) return;

    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (tabId === "all") {
        params.delete("tab"); // ডিফল্ট 'all' হলে URL পরিচ্ছন্ন থাকবে
      } else {
        params.set("tab", tabId);
      }
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    });
  };

  // 🔄 ক্যাটাগরি ফিল্টার পরিবর্তন হলে URL আপডেট
  const handleCategoryChange = (catId: string) => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (catId === "all") {
        params.delete("category");
      } else {
        params.set("category", catId);
      }
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    });
  };

  // 🎯 ফিল্টারিং লজিক
  const filteredProjects = useMemo(() => {
    return completedAppProjects.filter((project) => {
      const matchesCategory =
        activeTab === "all" || project.category === activeTab;

      const matchesPackage =
        selectedCategory === "all" || project.packageId === selectedCategory;

      return matchesCategory && matchesPackage;
    });
  }, [activeTab, selectedCategory]);

  return (
    <div className="w-full min-h-screen text-white px-3 sm:px-6 lg:px-10 py-10 sm:py-16 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        {/* 🌟 Top Header */}
        <AppHeader />

        <UniverseFilterBar
          tabs={APP_TABS}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          options={APP_PACKAGE_OPTIONS}
          selectedOption={selectedCategory}
          onOptionChange={handleCategoryChange}
          filterLabel="Package"
          layoutId="activeAppUniverseTabPill"
        />

        {/* 🎯 Projects Grid */}
        <div className="mb-16 sm:mb-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeTab}-${selectedCategory}`}
              initial={{ opacity: 0, y: 12, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.99 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
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
                    No projects found
                  </p>
                  <p className="text-slate-500 text-xs mt-1.5 max-w-xs mx-auto">
                    Try switching tabs or changing the category filter to view
                    more work.
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
