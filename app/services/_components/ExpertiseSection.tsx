"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Globe,
  Smartphone,
  Gamepad2,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  href: string;
  badge: string;
  imageSrc: string;
  IconComponent: React.ElementType;
  glowColor: string;
  badgeColor: string;
  accentText: string;
}

const services: ServiceItem[] = [
  {
    id: "web",
    title: "Web Development",
    tagline:
      "Ultra-fast modern websites, interactive web apps, and custom database solutions for your business.",
    href: "/services/web",
    badge: "Next.js 15",
    imageSrc: "/services-images/web-development.png",
    IconComponent: Globe,
    glowColor:
      "group-hover:border-cyan-400/60 group-hover:shadow-[0_0_35px_rgba(0,229,255,0.2)]",
    badgeColor: "border-cyan-400/30 bg-cyan-950/50 text-cyan-300",
    accentText: "text-cyan-400",
  },
  {
    id: "app",
    title: "App Development",
    tagline:
      "Custom Android and cross-platform mobile apps with smooth performance, cloud sync, and offline support.",
    href: "/services/app",
    badge: "Flutter & Cloud",
    imageSrc: "/services-images/app-development.png",
    IconComponent: Smartphone,
    glowColor:
      "group-hover:border-indigo-400/60 group-hover:shadow-[0_0_35px_rgba(99,102,241,0.2)]",
    badgeColor: "border-indigo-400/30 bg-indigo-950/50 text-indigo-300",
    accentText: "text-indigo-400",
  },
  {
    id: "game",
    title: "Game Development",
    tagline:
      "Interactive 2D and 3D games with engaging storylines, custom mechanics, and fluid physics.",
    href: "/services/game",
    badge: "2D / 3D Games",
    imageSrc: "/services-images/game-development.png",
    IconComponent: Gamepad2,
    glowColor:
      "group-hover:border-purple-400/60 group-hover:shadow-[0_0_35px_rgba(168,85,247,0.2)]",
    badgeColor: "border-purple-400/30 bg-purple-950/50 text-purple-300",
    accentText: "text-purple-400",
  },
];

export default function ExpertiseSection() {
  return (
    <section
      id="expertise"
      className="w-full px-4 sm:px-6 lg:px-12 py-24 relative overflow-hidden"
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-14 text-center max-w-3xl mx-auto space-y-3">
          <span className="golden-tag inline-block">OUR SERVICES</span>

          <h2 className="cabinet text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
            <span className="gradient-text">Services We Provide</span>
          </h2>
          <p className="garet text-xs sm:text-sm text-slate-400">
            High-performance web, mobile app, and game development tailored to
            bring your ideas to life.
          </p>
        </div>

        {/* 🚀 পাশাপাশি ৩টি কার্ড গ্রিড */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {services.map((service) => {
            const Icon = service.IconComponent;

            return (
              <div
                key={service.id}
                className={`group relative flex flex-col justify-between rounded-3xl border border-[#1c2d66] bg-[#0c1533]/80 p-5 sm:p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 hover:bg-[#0e1838] ${service.glowColor}`}
              >
                <div>
                  {/* 🖼️ ইমেজ কন্টেইনার (16:9 ব্যানার) */}
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-900 border border-white/10 mb-5">
                    <Image
                      src={service.imageSrc}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    {/* ডার্ক গ্রেডিয়েন্ট ওভারলে */}
                    <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-transparent z-10" />

                    {/* ব্যাজ */}
                    <div className="absolute top-3 right-3 z-20">
                      <span
                        className={`inline-flex items-center gap-1 text-[10px] font-mono tracking-wider uppercase px-2.5 py-1 rounded-full border backdrop-blur-md shadow-md ${service.badgeColor}`}
                      >
                        <Sparkles className="w-2.5 h-2.5" />
                        {service.badge}
                      </span>
                    </div>

                    {/* আইকন */}
                    <div className="absolute bottom-3 left-3 z-20 p-2.5 rounded-xl bg-slate-950/80 border border-white/15 backdrop-blur-md">
                      <Icon className={`w-5 h-5 ${service.accentText}`} />
                    </div>
                  </div>

                  {/* টেক্সট ডিটেইলস */}
                  <h3 className="cabinet text-xl font-bold text-white mb-2 group-hover:text-white transition-colors">
                    {service.title}
                  </h3>

                  <p className="garet text-xs text-slate-300 leading-relaxed mb-6">
                    {service.tagline}
                  </p>
                </div>

                {/* বাটন */}
                <div className="pt-3 border-t border-white/5 mt-auto">
                  <Link
                    href={service.href}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#121f48] hover:bg-white hover:text-slate-950 text-slate-200 border border-[#1c2d66] hover:border-white text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-sm"
                  >
                    <span>View Pricing & Packages</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
