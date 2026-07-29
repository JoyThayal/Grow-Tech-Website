"use client";

import React from "react";
import {
  Headphones,
  TrendingUp,
  ShieldCheck,
  ArrowUpCircle,
  Wrench,
} from "lucide-react";

const SustainabilitySection = () => {
  const features = [
    {
      icon: ShieldCheck,
      title: "Security & Data Protection",
    },
    {
      icon: ArrowUpCircle,
      title: "Regular Feature Updates",
    },
    {
      icon: Wrench,
      title: "Hardware & Server Maintenance",
    },
  ];

  return (
    <section className="w-full overflow-hidden px-6 py-20 text-white sm:px-8 lg:px-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
        {/* Left Content */}
        <div className="flex flex-col gap-6">
          <span className="golden-tag self-start">RELIABILITY FIRST</span>

          <h2 className="cabinet text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
            <span className="block gradient-text">
              We Don&apos;t Just Build,
            </span>

            <span className="block gradient-text">We Sustain & Scale.</span>
          </h2>

          <p className="garet max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
            A digital product is never truly finished; it evolves. At{" "}
            <strong className="font-semibold text-white">Grow Tech</strong>, we
            ensure your platform stays ahead of the curve with continuous
            monitoring, proactive security patches, and performance tuning —
            keeping your business running at peak efficiency 24/7.
          </p>

          {/* Feature List */}
          <div className="mt-2 flex flex-col gap-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div key={feature.title} className="flex items-center gap-3">
                  <div className="rounded-full bg-cyan-500/10 p-1 text-cyan-400">
                    <Icon className="h-5 w-5" />
                  </div>

                  <span className="garet text-sm font-medium text-slate-200 sm:text-base">
                    {feature.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Cards */}
        <div className="relative flex min-h-130 w-full items-center justify-center lg:justify-end">
          {/* Performance Card */}
          <div className="group absolute bottom-8 left-1/2 w-70 -translate-x-1/2 rounded-3xl border border-cyan-500/40 bg-white/5 p-8 backdrop-blur-xl shadow-xl transition-all duration-500 hover:-rotate-6 hover:scale-105 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(0,229,255,0.2)] sm:left-10 sm:translate-x-0 sm:w-[320px]">
            <div className="flex flex-col items-center gap-4 text-center">
              <TrendingUp className="h-10 w-10 text-[#c9a86a] transition-colors duration-300 group-hover:text-cyan-400" />

              <h3 className="cabinet text-xl font-bold text-cyan-400">
                Performance Insights
              </h3>

              <p className="garet text-xs leading-relaxed text-slate-400 sm:text-sm">
                Comprehensive health reports and analytics to track your digital
                growth and optimization.
              </p>
            </div>
          </div>

          {/* Support Card */}
          <div className="group absolute top-8 left-1/2 w-70 -translate-x-1/2 rounded-3xl border border-[#c9a86a]/30 bg-white/5 p-8 backdrop-blur-xl shadow-2xl transition-all duration-500 hover:rotate-6 hover:scale-105 hover:border-[#c9a86a] hover:shadow-[0_0_30px_rgba(201,168,106,0.2)] sm:right-8 sm:left-auto sm:translate-x-0 sm:w-[320px]">
            <div className="flex flex-col items-center gap-4 text-center">
              <Headphones className="h-10 w-10 text-[#c9a86a]" />

              <h3 className="cabinet text-xl font-bold text-cyan-400">
                24/7 Priority Support
              </h3>

              <p className="garet text-xs leading-relaxed text-slate-400 sm:text-sm">
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
