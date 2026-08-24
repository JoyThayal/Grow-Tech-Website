"use client";

import React, { useState } from "react";
import { gameProjects } from "./data";
import GameHeader from "./_components/GameHeader";
import GameCard from "./_components/GameCard";
import GameTrailerModal from "./_components/GameTrailerModal"; // 👈 নতুন PC পপআপ

export default function GameUniversePage() {
  const [selectedTrailer, setSelectedTrailer] = useState<string | null>(null);

  return (
    <div className="w-full text-white px-4 py-16 sm:px-6 lg:px-10 xl:px-12">
      {/* 🌟 Header */}
      <GameHeader />

      {/* 🎮 Game Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {gameProjects.map((project) => (
          <GameCard
            key={project.id}
            project={project}
            onViewTrailer={(url) => setSelectedTrailer(url)}
          />
        ))}
      </div>

      {/* 🎬 Widescreen PC Game Trailer Modal */}
      <GameTrailerModal
        isOpen={!!selectedTrailer}
        onClose={() => setSelectedTrailer(null)}
        trailerUrl={selectedTrailer || ""}
      />
    </div>
  );
}
