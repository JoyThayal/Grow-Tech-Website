"use client";

import React, { useState, useSyncExternalStore } from "react";
import { Sparkles, Briefcase, Boxes } from "lucide-react";
import { WebProject } from "../data";
import RatingModal, {
  RatingReview,
} from "@/components/hooks/rating/RatingModal";
import { useProjectReviews } from "@/components/hooks/useProjectReviews";
import ProjectRatingTrigger from "@/components/hooks/rating/ProjectRatingTrigger";
import ProjectBrowserMockup from "./ProjectBrowserMockup";

interface WebProjectCardProps {
  project: WebProject & {
    slug?: string;
    reviews?: RatingReview[];
  };
}

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

  const currentPackage = project.packageId
    ? PACKAGE_STYLES[project.packageId]
    : null;

  return (
    <>
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="h-full rounded-2xl bg-[#ffffff08] border border-[#ffffff14] p-3.5 sm:p-4 flex flex-col justify-between transition-all duration-300 hover:border-[#c9a86a]/40 hover:shadow-[0_0_30px_rgba(201,168,106,0.12)] group cursor-pointer"
      >
        {/* 💻 আলাদা ব্রাউজার মোকআপ কম্পোনেন্ট */}
        <ProjectBrowserMockup
          title={project.title}
          imageSrc={project.imageSrc}
          videoUrl={project.videoUrl}
          packageName={project.packageName || currentPackage?.label}
          packagePrice={project.packagePrice}
          packageStyle={currentPackage?.style}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          onVisit={handleSiteVisit}
        />

        {/* ℹ️ Info Section */}
        <div className="flex flex-col flex-1 justify-between px-0.5">
          <div>
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

            <h3 className="cabinet text-lg sm:text-xl font-bold text-white group-hover:text-[#c9a86a] transition-colors duration-300 leading-snug mb-1.5 line-clamp-1">
              {project.title}
            </h3>

            <p className="garet text-slate-400 text-xs leading-relaxed line-clamp-2 mb-4">
              {project.description}
            </p>
          </div>

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
