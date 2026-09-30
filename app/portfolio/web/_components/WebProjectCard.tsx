"use client";

import React, { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
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

export default function WebProjectCard({
  project,
}: WebProjectCardProps): React.ReactNode {
  const [isOpen, setIsOpen] = useState(false);

  const projectSlug =
    project.slug || project.title.toLowerCase().replace(/\s+/g, "-");

  // ⚡ ভিজিট ট্র্যাকিং
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

  // 🔍 ইউজার রেটিং দিয়ে ফেলেছে কি না
  const hasUserRated = Boolean(
    user?.id && reviewsList.some((r) => r.userId === user.id),
  );

  // 🎯 সাইট ভিজিট ট্র্যাক
  const handleSiteVisit = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem(`visited_${projectSlug}`, "true");
      window.dispatchEvent(new Event("storage"));
    }
    window.open(project.liveUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        className="rounded-2xl bg-[#ffffff08] border border-[#ffffff14] p-4 flex flex-col justify-between transition-all duration-300 hover:border-[#c9a86a]/40 group cursor-pointer"
      >
        {/* Image Box */}
        <div className="relative w-full h-80 rounded-xl overflow-hidden bg-[#05070f] mb-5">
          <div className="absolute inset-0 bg-[#ffffff10] animate-pulse z-0" />

          {/* Image Scroll Wrapper */}
          <div
            className={`
              relative w-full transition-transform ease-in-out
              duration-500 z-10
              md:group-hover:duration-5000
              md:group-hover:-translate-y-[calc(100%-320px)]
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

          {/* Overlay Button */}
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

        {/* Info Section */}
        <div className="px-1 pb-1">
          <div className="flex items-center justify-between mb-1.5">
            <h3 className="cabinet text-xl font-bold text-white group-hover:text-[#c9a86a] transition-colors duration-300">
              {project.title}
            </h3>

            <span className="text-[10px] font-mono text-[#c9a86a] bg-[#c9a86a]/10 px-2 py-0.5 rounded border border-[#c9a86a]/20">
              {project.techStack[0]}
            </span>
          </div>

          <p className="garet text-slate-400 text-xs leading-relaxed line-clamp-2 mb-3">
            {project.description}
          </p>

          {/* 🌟 Unified Clean Rating Action */}
          <div className="pt-2.5 border-t border-[#ffffff0f]">
            <ProjectRatingTrigger
              totalReviews={totalReviews}
              averageRating={averageRating}
              hasUserRated={hasUserRated}
              onOpenModal={() => setIsModalOpen(true)}
            />
          </div>
        </div>
      </div>

      {/* Rating Modal */}
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
