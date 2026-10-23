"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Briefcase, Sparkles, Layers } from "lucide-react";
import WebHeader from "./_components/WebHeader";
import WebProjectCard from "./_components/WebProjectCard";
import UniverseFilterBar, {
  FilterTabItem,
  FilterOptionItem,
} from "@/components/ui/UniverseFilterBar"; // তোমার পাথ অনুযায়ী ইমপোর্ট করো
import { webProjectsData } from "./data";

// 🏷️ ১. ওয়েব পেজের ৩টি সোর্স ট্যাব
const WEB_TABS: readonly FilterTabItem<"all" | "own" | "client">[] = [
  { id: "all", label: "All", fullLabel: "All Works", icon: Layers },
  { id: "own", label: "Grow Tech", fullLabel: "Grow Tech", icon: Sparkles },
  { id: "client", label: "Client", fullLabel: "Client Works", icon: Briefcase },
] as const;

// 📦 ২. প্যাকেজ ফিল্টারের অপশনসমূহ
const PACKAGE_OPTIONS: readonly FilterOptionItem[] = [
  {
    id: "all",
    label: "All Packages",
    desc: "Show projects from all service tiers",
  },
  {
    id: "single-page",
    label: "Single Page",
    desc: "High-converting landing pages",
  },
  {
    id: "multi-page",
    label: "Multi Page",
    desc: "Comprehensive brand & business sites",
  },
  {
    id: "dynamic-portal",
    label: "Dynamic Portal",
    desc: "Complex apps with dashboard & auth",
  },
  {
    id: "redesign-upgrade",
    label: "Redesign & Upgrade",
    desc: "Modern UI/UX revamp of existing sites",
  },
] as const;

type WebTabType = (typeof WEB_TABS)[number]["id"];

export default function WebUniversePage(): React.ReactNode {
  const [activeTab, setActiveTab] = useState<WebTabType>("all");
  const [selectedPackage, setSelectedPackage] = useState<string>("all");

  // 🎯 ফিল্টারিং লজিক (Grow Tech ট্যাবে own ও demo একসাথে থাকবে)
  const filteredProjects = useMemo(() => {
    return webProjectsData.filter((project) => {
      const matchesSource =
        activeTab === "all" ||
        (activeTab === "own"
          ? project.source === "own" || project.source === "demo"
          : project.source === "client");

      const matchesPackage =
        selectedPackage === "all" || project.packageId === selectedPackage;

      return matchesSource && matchesPackage;
    });
  }, [activeTab, selectedPackage]);

  return (
    <main className="min-h-screen text-white px-3 sm:px-6 py-10 sm:py-16">
      <div className="mx-auto max-w-7xl">
        <WebHeader />

        {/* 🎛️ মাত্র কয়েক লাইনে রিইউজেবল ফিল্টার বার */}
        <UniverseFilterBar
          tabs={WEB_TABS}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          options={PACKAGE_OPTIONS}
          selectedOption={selectedPackage}
          onOptionChange={setSelectedPackage}
          filterLabel="Package"
          layoutId="activeWebUniverseTabPill"
        />

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
