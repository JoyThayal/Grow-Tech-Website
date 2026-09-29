"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Gamepad2,
  Box,
  Layers,
  Cpu,
  Map,
  Wrench,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";

interface GameService {
  id: string;
  name: string;
  category: "all" | "3d" | "code" | "design" | "optimization";
  desc: string;
  price: string;
  note: string;
  icon: typeof Gamepad2;
}

const gameServices: GameService[] = [
  {
    id: "game-ui",
    name: "Game UI & HUD Design",
    category: "design",
    desc: "Clean menus, interactive buttons, responsive scoreboards, and in-game popup screens.",
    price: "₹2,000 – ₹5,000",
    note: "Depends on screen count & button complexity",
    icon: Gamepad2,
  },
  {
    id: "hard-surface-3d",
    name: "Hard-Surface 3D Modeling",
    category: "3d",
    desc: "Custom high-detail 3D models for vehicles, weapons, sci-fi robots, and hard props.",
    price: "₹1,500 – ₹4,000",
    note: "Per complex model, vehicle, or weapon asset",
    icon: Box,
  },
  {
    id: "low-poly-3d",
    name: "Low-Poly 3D Assets",
    category: "3d",
    desc: "Lightweight, stylized 3D assets optimized to run buttery-smooth even on budget mobile devices.",
    price: "₹500 – ₹1,500",
    note: "Per character, simple prop, or environment piece",
    icon: Layers,
  },
  {
    id: "csharp-mechanics",
    name: "C# Scripting & Mechanics",
    category: "code",
    desc: "Core character movement, jumps, combat hits, weapon logic, and game rules written in clean C#.",
    price: "₹1,000 – ₹3,000",
    note: "Per specific gameplay mechanic or feature",
    icon: Cpu,
  },
  {
    id: "level-environment",
    name: "Level & Environment Design",
    category: "design",
    desc: "Atmospheric game worlds, terrain sculpting, buildings, roads, and balanced arena maps.",
    price: "₹3,000 – ₹8,000",
    note: "Based on map scale, density & scene detail",
    icon: Map,
  },
  {
    id: "bug-fixing",
    name: "Bug Fixing & FPS Optimization",
    category: "optimization",
    desc: "Resolve stuttering, fix game crashes, eliminate physics bugs, and achieve solid 60 FPS performance.",
    price: "₹1,000 – ₹3,000",
    note: "Depending on error complexity & engine profiling",
    icon: Wrench,
  },
];

export default function GameServicesPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<
    "all" | "3d" | "code" | "design" | "optimization"
  >("all");

  const filteredServices =
    filter === "all"
      ? gameServices
      : gameServices.filter((s) => s.category === filter);

  const handleBooking = async (packageName: string) => {
    const targetUrl = `/booking?service=game&package=${encodeURIComponent(packageName)}`;
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      router.push(`/auth?next=${encodeURIComponent(targetUrl)}`);
    } else {
      router.push(targetUrl);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a1128] text-white py-16 lg:py-24 px-4 sm:px-6 lg:px-12 relative overflow-hidden">
      {/* 💜 Purple Gaming Auroras */}
      <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 -z-10 h-96 w-full max-w-5xl rounded-full bg-purple-600/15 blur-[150px]" />
      <div className="pointer-events-none absolute bottom-20 right-10 -z-10 h-96 w-96 rounded-full bg-violet-500/10 blur-[150px]" />

      <div className="mx-auto max-w-6xl">
        {/* 🌟 Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
          <span className="golden-tag inline-block">
            BIJOY • GAME DEV STUDIO
          </span>

          <h1 className="cabinet text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            <span className="gradient-text">Engineered for Immersion.</span>
            <br />
            <span className="text-slate-100 gradient-text">
              Built for 60 FPS.
            </span>
          </h1>

          <p className="garet text-slate-400 text-sm sm:text-base md:text-lg leading-relaxed pt-2">
            Modular game assets, responsive UI, robust C# mechanics, and engine
            performance optimization tailored for indie devs and mobile studios.
          </p>

          {/* 🏷️ Game Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {[
              { label: "All Services", val: "all" },
              { label: "3D Models", val: "3d" },
              { label: "C# Mechanics", val: "code" },
              { label: "UI & Levels", val: "design" },
              { label: "Optimization", val: "optimization" },
            ].map((tab) => (
              <button
                key={tab.val}
                type="button"
                onClick={() => setFilter(tab.val as typeof filter)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  filter === tab.val
                    ? "bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                    : "border border-[#1c2d66] bg-[#0c1533]/80 text-slate-400 hover:text-white hover:border-purple-500/30"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 🚀 ৩-কলাম স্লিম কার্ড গ্রিড */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.id}
                className="rounded-3xl border border-[#1c2d66] bg-[#0c1533]/80 p-6 sm:p-7 flex flex-col justify-between hover:border-purple-500/60 hover:bg-[#0e1838] transition-all duration-300 group shadow-xl backdrop-blur-xl"
              >
                <div>
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className="p-3 rounded-2xl bg-purple-950/40 border border-purple-500/30 text-purple-400 group-hover:scale-105 group-hover:border-purple-400 transition-all shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="cabinet text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                      {service.name}
                    </h3>
                  </div>

                  <p className="garet text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                    {service.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1c2d66]/60 space-y-3 mt-auto">
                  <div>
                    <span className="cabinet text-2xl font-extrabold text-purple-400">
                      {service.price}
                    </span>
                    <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                      {service.note}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleBooking(service.name)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#121f48] hover:bg-purple-600 text-slate-200 hover:text-white border border-purple-500/30 hover:border-purple-400 text-xs font-bold transition-all active:scale-95 cursor-pointer shadow-sm"
                  >
                    <span>Book Service</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* 💜 কাস্টম গেম প্রজেক্ট ব্যানার */}
        <div className="mt-16 rounded-3xl border border-purple-500/30 bg-gradient-to-r from-purple-950/20 via-[#0c1533]/60 to-[#0c1533]/80 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-xl">
          <div className="text-center md:text-left space-y-2">
            <h3 className="cabinet text-xl sm:text-2xl font-bold text-white">
              Building a Complete Game from Scratch?
            </h3>
            <p className="garet text-sm text-slate-400 max-w-xl">
              From Game Design Documents (GDD) and level art to multiplayer
              architecture and release—we build production-ready games.
            </p>
          </div>

          <a
            href="https://wa.me/+918902709631?text=Hi%20Grow%20Tech,%20I%20want%20to%20discuss%20a%20full%20custom%20game%20development%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-6 py-3.5 rounded-xl bg-purple-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-purple-500 transition-all shadow-[0_0_20px_rgba(168,85,247,0.35)] flex items-center gap-2"
          >
            <span>WhatsApp Discussion</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </main>
  );
}
