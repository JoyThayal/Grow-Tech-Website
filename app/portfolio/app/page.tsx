"use client";

import React, { useState } from "react";
import { CheckCircle2, Sparkles } from "lucide-react";
import { completedAppProjects, demoAppProjects } from "./data";
import AppHeader from "./_components/AppHeader";
import AppCard from "./_components/AppCard";
import VideoModal from "./_components/VideoModal";

export default function AppUniversePage() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  return (
    <div className="w-full text-white py-8 px-5 sm:px-6 lg:px-10 xl:px-12">
      {/* 🌟 Top Header */}
      <AppHeader />

      {/* 🎯 Completed Projects */}
      <div className="mb-20">
        <div className="flex items-center gap-2.5 mb-8 text-cyan-400">
          <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
          <h2 className="cabinet text-2xl font-bold text-white tracking-wide">
            Completed Projects
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {completedAppProjects.map((project) => (
            <AppCard
              key={project.id}
              project={project}
              onViewLive={(url) => setSelectedVideo(url)}
            />
          ))}
        </div>
      </div>

      {/* 🚀 Demo Works */}
      <div>
        <div className="flex items-center gap-2.5 mb-8 text-amber-400">
          <Sparkles className="w-6 h-6 stroke-[2.5]" />
          <h2 className="cabinet text-2xl font-bold text-white tracking-wide">
            Demo Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {demoAppProjects.map((project) => (
            <AppCard
              key={project.id}
              project={project}
              onViewLive={(url) => setSelectedVideo(url)}
            />
          ))}
        </div>
      </div>

      {/* 🎬 Video Popup Modal */}
      <VideoModal
        isOpen={!!selectedVideo}
        onClose={() => setSelectedVideo(null)}
        videoUrl={selectedVideo || ""}
      />
    </div>
  );
}
