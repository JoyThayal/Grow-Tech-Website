"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

interface PortfolioCardProps {
  title: string;
  leadBy: string;
  imageSrc: string;
  description: React.ReactNode;
  linkHref: string;
}

const portfolioData: PortfolioCardProps[] = [
  {
    title: "Web Development",
    leadBy: "JOY THAYAL",
    imageSrc:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop",
    description: (
      <>
        Full-stack web applications and digital platforms built with{" "}
        <span className="text-cyan-400 font-semibold">technical precision</span>{" "}
        and modern scalability.
      </>
    ),
    linkHref: "/portfolio/web",
  },
  {
    title: "App Development",
    leadBy: "AMAN SHAW",
    imageSrc:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800&auto=format&fit=crop",
    description: (
      <>
        High-performance Android and cross-platform apps built for{" "}
        <span className="text-cyan-400 font-semibold">seamless</span> mobile
        user experiences.
      </>
    ),
    linkHref: "/portfolio/app",
  },
  {
    title: "Game Development",
    leadBy: "BIJOY THAYAL",
    imageSrc:
      "https://images.unsplash.com/photo-1665041982909-8a86864a1e49?q=80&w=1170&auto=format&fit=crop",
    description: (
      <>
        Interactive gameplay mechanics and{" "}
        <span className="text-cyan-400 font-semibold">immersive</span> 3D worlds
        built for players.
      </>
    ),
    linkHref: "/portfolio/game",
  },
];

export default function PortfolioShowcaseSection(): React.ReactNode {
  return (
    <section className="w-full text-white px-4 py-16 sm:px-6 lg:px-10 xl:px-12 flex flex-col items-center justify-center overflow-hidden">
      {/* 🌟 Header Area */}
      <div className="text-center flex flex-col items-center mb-14">
        <span className="golden-tag">OUR WORK SHOWCASE</span>

        <h2 className="cabinet text-4xl font-bold tracking-tight leading-tight">
          <span className="gradient-text">Featured Portfolio</span>
        </h2>

        {/* Small Golden Divider Line */}
        <div className="w-12 h-0.5 bg-[#c9a86a] mt-6 rounded-full" />
      </div>

      {/* 🚀 3 Portfolio Cards */}
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8">
        {portfolioData.map((item, index) => (
          <div
            key={index}
            className="rounded-3xl bg-[#ffffff08] border border-[#ffffff14] p-6 flex flex-col transition-all duration-300 hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(0,229,255,0.12)] group"
          >
            {/* Card Image Container */}
            <div className="relative w-full h-52 rounded-2xl overflow-hidden mb-6 bg-slate-900">
              <Image
                src={item.imageSrc}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Title & Lead Tag */}
            <h3 className="cabinet text-2xl font-bold text-white mb-1">
              {item.title}
            </h3>

            <p className="garet text-[#c9a86a] text-xs font-bold tracking-widest uppercase mb-4">
              LED BY: {item.leadBy}
            </p>

            {/* Description */}
            <p className="garet text-slate-400 text-sm leading-relaxed mb-8 grow">
              {item.description}
            </p>

            <Button href={item.linkHref} variant="secondary" className="">
              View Projects <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
}
