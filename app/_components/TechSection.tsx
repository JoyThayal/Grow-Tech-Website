import React from "react";
import {
  SiNextdotjs,
  SiFlutter,
  SiDart,
  SiTypescript,
  SiUnity,
  SiBlender,
  SiAndroidstudio,
  SiSupabase,
  SiTailwindcss,
  SiFirebase,
} from "react-icons/si";
import { TbBrandCSharp } from "react-icons/tb";
import { VscVscode } from "react-icons/vsc";

const techCards = [
  {
    title: "Next.js & React 19",
    description:
      "High-speed, SEO-first architecture built with React Server Components & Turbopack.",
    Icon: SiNextdotjs,
    iconColor: "text-white",
    hoverBorder: "hover:border-white/50",
  },
  {
    title: "Flutter Framework",
    description:
      "Native-speed 60fps mobile applications with clean architecture and reactive UI.",
    Icon: SiFlutter,
    iconColor: "text-[#02569B]",
    hoverBorder: "hover:border-[#02569B]/50",
  },
  {
    title: "Dart Language",
    description:
      "Client-optimized language for fast apps on any platform, powering our Flutter development.",
    Icon: SiDart,
    iconColor: "text-[#0175C2]",
    hoverBorder: "hover:border-[#0175C2]/50",
  },
  {
    title: "TypeScript",
    description:
      "Clean architecture, enterprise type-safety, and maintainable production codebases.",
    Icon: SiTypescript,
    iconColor: "text-[#3178C6]",
    hoverBorder: "hover:border-[#3178C6]/50",
  },
  {
    title: "C# Programming",
    description:
      "Robust object-oriented programming powering custom Unity gameplay loops and physics.",
    Icon: TbBrandCSharp,
    iconColor: "text-[#9B4F96]",
    hoverBorder: "hover:border-[#9B4F96]/50",
  },
  {
    title: "Unity Engine",
    description:
      "Interactive 2D & 3D game worlds with custom mechanics, asset pipelines, and physics.",
    Icon: SiUnity,
    iconColor: "text-white",
    hoverBorder: "hover:border-purple-400/50",
  },
  {
    title: "Blender 3D",
    description:
      "Custom 3D modeling, low-poly game asset creation, texturing, and environment design.",
    Icon: SiBlender,
    iconColor: "text-[#E87D0D]",
    hoverBorder: "hover:border-[#E87D0D]/50",
  },
  {
    title: "Android Studio",
    description:
      "Comprehensive mobile toolchain for testing, profiling, and signed APK / AAB compilation.",
    Icon: SiAndroidstudio,
    iconColor: "text-[#3DDC84]",
    hoverBorder: "hover:border-[#3DDC84]/50",
  },
  {
    title: "VS Code Environment",
    description:
      "Customized, highly productive coding workspace optimized for fast web & script execution.",
    Icon: VscVscode,
    iconColor: "text-[#007ACC]",
    hoverBorder: "hover:border-[#007ACC]/50",
  },
  {
    title: "Supabase & Postgres",
    description:
      "Cloud database, instant real-time sync, Row-Level Security (RLS), and authentication.",
    Icon: SiSupabase,
    iconColor: "text-[#3ECF8E]",
    hoverBorder: "hover:border-[#3ECF8E]/50",
  },
  {
    title: "Tailwind CSS",
    description:
      "Bespoke, responsive, and ultra-sleek dark interface styling crafted for all viewports.",
    Icon: SiTailwindcss,
    iconColor: "text-[#06B6D4]",
    hoverBorder: "hover:border-[#06B6D4]/50",
  },
  {
    title: "Firebase Suite",
    description:
      "Cloud messaging, real-time backend sync, remote config, and analytics for mobile apps.",
    Icon: SiFirebase,
    iconColor: "text-[#FFCA28]",
    hoverBorder: "hover:border-[#FFCA28]/50",
  },
];

export default function TechSection() {
  return (
    <section className="w-full px-5 py-16 text-white sm:px-6 lg:py-20 relative overflow-hidden">
      {/* Background Ambience Glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-96 w-full max-w-6xl rounded-full bg-cyan-500/5 blur-[160px]" />

      {/* Header */}
      <div className="mx-auto mb-14 max-w-3xl text-center">
        <span className="golden-tag inline-block">OUR POWERHOUSE</span>

        <div>
          <h2 className="cabinet gradient-text mt-4 text-3xl font-extrabold sm:text-4xl md:text-5xl">
            Modern Technologies We
          </h2>
        </div>

        <h3 className="cabinet gradient-text text-2xl font-black italic uppercase tracking-wide sm:text-3xl md:text-4xl">
          Master & Deploy
        </h3>

        <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-[#C9A86A]" />
      </div>

      {/* 🚀 12 Grid Cards */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {techCards.map(
          ({ title, description, Icon, iconColor, hoverBorder }) => (
            <article
              key={title}
              className={`group flex flex-col justify-between rounded-2xl border border-white/10 bg-[#0c1533]/70 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:bg-[#0e1838] hover:shadow-xl ${hoverBorder}`}
            >
              <div>
                {/* Real Icon Container */}
                <div className="mb-4 flex h-13 w-13 items-center justify-center rounded-2xl border border-white/10 bg-[#121f48] shadow-inner transition-transform duration-300 group-hover:scale-110">
                  <Icon
                    className={`w-6 h-6 transition-transform duration-300 ${iconColor}`}
                  />
                </div>

                <h4 className="cabinet mb-2 text-base font-bold tracking-wide text-slate-100 group-hover:text-white transition-colors">
                  {title}
                </h4>

                <p className="garet text-xs leading-relaxed font-light text-slate-300">
                  {description}
                </p>
              </div>
            </article>
          ),
        )}
      </div>
    </section>
  );
}
