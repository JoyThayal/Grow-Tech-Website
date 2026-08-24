import React from "react";
import WebHeader from "./_components/WebHeader";
import WebProjectCard from "./_components/WebProjectCard";
import { webProjectsData } from "./data";

export default function WebUniversePage(): React.ReactNode {
  return (
    <main className="min-h-screen text-white px-4 py-16 sm:px-6 lg:px-10 xl:px-12">
      <div className="mx-auto max-w-7xl">
        <WebHeader />

        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 xl:grid-cols-3">
          {webProjectsData.map((project) => (
            <WebProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </main>
  );
}
