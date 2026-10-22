"use client";

import React, { useState, useSyncExternalStore, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, Sparkles, Briefcase, Boxes } from "lucide-react";
import { WebProject } from "../data";
import RatingModal, {
  RatingReview,
} from "@/components/hooks/rating/RatingModal";
import { useProjectReviews } from "@/components/hooks/useProjectReviews";
import ProjectRatingTrigger from "@/components/hooks/rating/ProjectRatingTrigger";

interface WebProjectCardProps {
  project: WebProject & {
    slug?: string;
    reviews?: RatingReview[];
  };
}

// 🎨 প্যাকেজ আইডি অনুযায়ী স্টাইল কনফিগ
const PACKAGE_STYLES: Record<string, { label: string; style: string }> = {
  "single-page": {
    label: "Single Page",
    style: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  },
  "multi-page": {
    label: "Multi Page",
    style: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  },
  "dynamic-portal": {
    label: "Dynamic Portal",
    style:
      "text-amber-300 bg-amber-500/10 border-amber-500/20 shadow-[0_0_12px_rgba(245,158,11,0.2)]",
  },
  "redesign-upgrade": {
    label: "Redesign",
    style: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  },
};

export default function WebProjectCard({
  project,
}: WebProjectCardProps): React.ReactNode {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const projectSlug =
    project.slug || project.title.toLowerCase().replace(/\s+/g, "-");

  // ⚡ Visit Tracking
  const hasVisited = useSyncExternalStore(
    (callback) => {
      window.addEventListener("storage", callback);
      return () => window.removeEventListener("storage", callback);
    },
    () => localStorage.getItem(`visited_${projectSlug}`) === "true",
    () => false,
  );

  const {
    isModalOpen,
    setIsModalOpen,
    user,
    reviewsList,
    totalReviews,
    averageRating,
    handleLoginRedirect,
    handleSubmitRating,
  } = useProjectReviews(projectSlug, project.reviews);

  const hasUserRated = Boolean(
    user?.id && reviewsList.some((r) => r.userId === user.id),
  );

  const handleSiteVisit = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(`visited_${projectSlug}`, "true");
      window.dispatchEvent(new Event("storage"));
    }
    window.open(project.liveUrl, "_blank", "noopener,noreferrer");
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const currentPackage = project.packageId
    ? PACKAGE_STYLES[project.packageId]
    : null;

  const showVideo = Boolean(project.videoUrl && (isHovered || isOpen));

  return (
    <>
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="h-full rounded-2xl bg-[#ffffff08] border border-[#ffffff14] p-3.5 sm:p-4 flex flex-col justify-between transition-all duration-300 hover:border-[#c9a86a]/40 hover:shadow-[0_0_30px_rgba(201,168,106,0.12)] group cursor-pointer"
      >
        {/* 💻 Browser Mockup Shell */}
        <div className="rounded-xl overflow-hidden border border-white/10 bg-[#05070f] mb-4 shadow-lg shrink-0">
          {/* 🌐 Browser Top Bar (Responsive wrap-safe) */}
          <div className="flex items-center justify-between gap-2 px-3 py-2 sm:px-3.5 sm:py-2.5 bg-[#0d1527] border-b border-white/10 text-[11px] font-mono select-none">
            {/* Traffic Dots */}
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-40" />
                <span className="relative inline-flex rounded-full h-full w-full bg-rose-500/80" />
              </span>
              <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-40 [animation-delay:200ms]" />
                <span className="relative inline-flex rounded-full h-full w-full bg-amber-500/80" />
              </span>
              <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-40 [animation-delay:400ms]" />
                <span className="relative inline-flex rounded-full h-full w-full bg-emerald-500/80" />
              </span>
            </div>

            {/* Package Name & Price */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-hidden">
              <span
                className={`truncate max-w-27.5 sm:max-w-none text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full border font-bold uppercase tracking-wider ${
                  currentPackage
                    ? currentPackage.style
                    : "text-slate-400 bg-slate-500/10 border-slate-500/20"
                }`}
              >
                {project.packageName || currentPackage?.label || "Single Page"}
              </span>

              {project.packagePrice && (
                <span className="text-cyan-300 font-bold font-mono text-[10px] shrink-0">
                  {project.packagePrice}
                </span>
              )}
            </div>
          </div>

          {/* 🖼️ / 🎬 Image or Hover Video Container */}
          <div
            className={`relative w-full overflow-hidden bg-[#05070f] ${
              project.videoUrl ? "aspect-video" : "h-80"
            }`}
          >
            <div className="absolute inset-0 bg-[#ffffff10] animate-pulse z-0" />

            {/* 🎥 Case 1: Video Project (একদম ডেস্কটপ 16:9 সাইজ, নো স্ক্রল) */}
            {project.videoUrl ? (
              <>
                <video
                  ref={videoRef}
                  src={project.videoUrl}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className={`absolute inset-0 w-full h-full object-cover z-10 transition-opacity duration-500 pointer-events-none ${
                    showVideo ? "opacity-100" : "opacity-0"
                  }`}
                />

                <div
                  className={`relative w-full h-full z-10 transition-opacity duration-500 ${
                    showVideo
                      ? "opacity-0"
                      : "opacity-90 md:group-hover:opacity-100"
                  }`}
                >
                  <Image
                    src={project.imageSrc}
                    alt={project.title}
                    fill
                    priority={false}
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              </>
            ) : (
              /* 🖼️ Case 2: Long Screenshot Project (আগের মতোই h-80 লং স্ক্রল) */
              <div
                className={`
                  relative w-full transition-transform ease-in-out duration-500 z-10
                  md:group-hover:duration-5000 md:group-hover:-translate-y-[calc(100%-320px)]
                  ${
                    isOpen
                      ? "-translate-y-[calc(100%-320px)] duration-5000"
                      : "translate-y-0"
                  }
                `}
              >
                <Image
                  src={project.imageSrc}
                  alt={project.title}
                  width={800}
                  height={2400}
                  priority={false}
                  className="w-full h-auto object-top opacity-90 md:group-hover:opacity-100 transition-opacity duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            )}

            {/* Visit Site Overlay Button */}
            <div
              className={`
                absolute inset-0 z-20
                flex items-center justify-center
                pointer-events-none
                transition-opacity duration-300
                ${isOpen ? "opacity-100" : "opacity-0"}
                md:opacity-0
                md:group-hover:opacity-100
              `}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                  handleSiteVisit();
                }}
                className="pointer-events-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#c9a86a] text-[#070913] font-bold text-xs hover:bg-[#dfbd7e] hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(201,168,106,0.4)] cursor-pointer"
              >
                <span>Visit Site</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>

        {/* ℹ️ Info Section (Clean Stacked Layout) */}
        <div className="flex flex-col flex-1 justify-between px-0.5">
          <div>
            {/* 🏷️ Top Badges Row */}
            <div className="flex flex-wrap items-center gap-1.5 mb-2">
              {project.source === "client" ? (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded border border-cyan-400/20">
                  <Briefcase className="w-2.5 h-2.5" /> Client
                </span>
              ) : project.source === "own" ? (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                  <Sparkles className="w-2.5 h-2.5" /> Grow Tech
                </span>
              ) : project.source === "demo" ? (
                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-indigo-300 bg-indigo-400/10 px-2 py-0.5 rounded border border-indigo-400/20">
                  <Boxes className="w-2.5 h-2.5" /> Demo
                </span>
              ) : null}

              {project.techStack?.[0] && (
                <span className="text-[10px] font-mono text-[#c9a86a] bg-[#c9a86a]/10 px-2 py-0.5 rounded border border-[#c9a86a]/20">
                  {project.techStack[0]}
                </span>
              )}
            </div>

            {/* 📌 Project Title */}
            <h3 className="cabinet text-lg sm:text-xl font-bold text-white group-hover:text-[#c9a86a] transition-colors duration-300 leading-snug mb-1.5 line-clamp-1">
              {project.title}
            </h3>

            {/* 📝 Description */}
            <p className="garet text-slate-400 text-xs leading-relaxed line-clamp-2 mb-4">
              {project.description}
            </p>
          </div>

          {/* 🌟 Unified Clean Rating Action */}
          <div
            className="pt-3 border-t border-[#ffffff0f] mt-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <ProjectRatingTrigger
              totalReviews={totalReviews}
              averageRating={averageRating}
              hasUserRated={hasUserRated}
              onOpenModal={() => setIsModalOpen(true)}
            />
          </div>
        </div>
      </div>

      {/* 📝 Rating Modal */}
      <RatingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        projectTitle={project.title}
        averageRating={averageRating}
        totalReviews={totalReviews}
        reviews={reviewsList}
        isLoggedIn={!!user}
        currentUserId={user?.id}
        requireVisit={true}
        hasVisited={hasVisited}
        onVisitClick={handleSiteVisit}
        onLoginClick={handleLoginRedirect}
        onSubmitRating={handleSubmitRating}
      />
    </>
  );
}
