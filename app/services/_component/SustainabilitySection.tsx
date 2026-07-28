"use client";

import React from "react";
import {
  Headphones,
  TrendingUp,
  ShieldCheck,
  ArrowUpCircle,
  Wrench,
} from "lucide-react";

const SustainabilitySection: React.FC = () => {
  return (
    <section className="w-full px-15 py-24 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Content Area */}
        <div className="flex flex-col gap-6">
          {/* Subtitle Tag */}
          <span className="golden-tag self-start">RELIABILITY FIRST</span>

          {/* Heading */}
          <h2 className="cabinet text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
            <span className="block gradient-text">We Don&apos;t Just Build,</span>
            <span className="block gradient-text">We Sustain & Scale.</span>
          </h2>

          {/* Description */}
          <p className="garet text-slate-400 text-base leading-relaxed max-w-xl">
            A digital product is never truly finished; it evolves. At{" "}
            <strong className="text-white font-semibold">Grow Tech</strong>, we
            ensure your platform stays ahead of the curve with continuous
            monitoring, proactive security patches, and performance
            tuning—keeping your business running at peak efficiency 24/7.
          </p>

          {/* Bullet Feature List */}
          <div className="flex flex-col gap-4 mt-2">
            <div className="flex items-center gap-3">
              <div className="p-1 rounded-full bg-cyan-500/10 text-cyan-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="garet text-slate-200 text-sm font-medium">
                Security & Data Protection
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-1 rounded-full bg-cyan-500/10 text-cyan-400">
                <ArrowUpCircle className="w-5 h-5" />
              </div>
              <span className="garet text-slate-200 text-sm font-medium">
                Regular Feature Updates
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-1 rounded-full bg-cyan-500/10 text-cyan-400">
                <Wrench className="w-5 h-5" />
              </div>
              <span className="garet text-slate-200 text-sm font-medium">
                Hardware & Server Maintenance
              </span>
            </div>
          </div>
        </div>

        {/* Right Cards Area (Interactive Hover Tilt Effect) */}
        <div className="relative h-105 w-full flex items-center justify-center lg:justify-end">
          {/* Bottom Card (Performance Insights) */}
          <div className="absolute left-4 sm:left-12 bottom-4 w-70 sm:w-[320px] p-8 rounded-3xl bg-[#ffffff08] border border-cyan-500/40 backdrop-blur-md shadow-xl transition-all duration-500 ease-out hover:-rotate-6 hover:scale-105 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(0,229,255,0.2)] z-10 cursor-pointer group">
            <div className="flex flex-col items-center text-center gap-4">
              <TrendingUp className="w-10 h-10 text-[#c9a86a] group-hover:text-cyan-400 transition-colors duration-300" />
              <h3 className="cabinet text-xl font-bold text-cyan-400">
                Performance Insights
              </h3>
              <p className="garet text-slate-400 text-xs leading-relaxed">
                Comprehensive health reports and analytics to track your digital
                growth and optimization.
              </p>
            </div>
          </div>

          {/* Top Card (24/7 Priority Support) */}
          <div className="absolute right-4 sm:right-8 top-4 w-70 sm:w-[320px] p-8 rounded-3xl bg-[#ffffff08] border border-[#c9a86a]/30 backdrop-blur-md shadow-2xl transition-all duration-500 ease-out hover:rotate-6 hover:scale-105 hover:border-[#c9a86a] hover:shadow-[0_0_30px_rgba(201,168,106,0.2)] z-20 cursor-pointer group">
            <div className="flex flex-col items-center text-center gap-4">
              <Headphones className="w-10 h-10 text-[#c9a86a] transition-colors duration-300" />
              <h3 className="cabinet text-xl font-bold text-cyan-400">
                24/7 Priority Support
              </h3>
              <p className="garet text-slate-400 text-xs leading-relaxed">
                Get direct access to our expert team for instant troubleshooting
                and urgent technical fixes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SustainabilitySection;
