import React from "react";
import WebHeader from "./_components/WebHeader";
import WebProjectCard from "./_components/WebProjectCard";
import { webProjectsData } from "./data";

export default function WebUniversePage(): React.ReactNode {
  return (
    <main className="min-h-screen text-white py-20 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* 🌟 Clean Header */}
        <WebHeader />

        {/* 💻 Minimal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {webProjectsData.map((project) => (
            <WebProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </main>
  );
}
