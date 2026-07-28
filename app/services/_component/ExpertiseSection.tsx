"use client";

import React, { useState } from "react";
import { Globe, Smartphone, Gamepad2, Plus, ArrowRight } from "lucide-react";
import Button from "@/components/Button";

interface ServiceItem {
  id: string;
  title: string;
  IconComponent: React.ElementType; // Dynamic color control-এর জন্য ElementType ব্যবহার করা হয়েছে
  features: string[];
}

const services: ServiceItem[] = [
  {
    id: "web",
    title: "Web Development",
    IconComponent: Globe,
    features: [
      "Single-Page Applications (SPA)",
      "Multi-Page Corporate Websites",
      "Custom API Design & Integration",
      "Responsive for All Devices",
      "Responsive UI/UX Optimization",
      "More Coming Soon",
    ],
  },
  {
    id: "app",
    title: "App Development",
    IconComponent: Smartphone,
    features: [
      "Using Flutter for Android App Development",
      "UI/UX Design Support",
      "API Integration & Backend",
      "Real-time Chat & Maps",
      "Maintenance & Updates",
      "Cross-Platform for all Platforms",
      "More Coming Soon",
    ],
  },
  {
    id: "game",
    title: "Game Development",
    IconComponent: Gamepad2,
    features: [
      "2D & 3D Game Design",
      "Indie Game Mechanics",
      "Multiplayer Functionality",
      "Mobile & PC Gaming",
      "Game Environment Design",
    ],
  },
  {
    id: "hardware",
    title: "Hardware Support",
    IconComponent: Plus,
    features: [
      "Hardware Diagnosis",
      "Component Repair",
      "IT Infrastructure Setup",
      "Maintenance & Updates",
    ],
  },
];

const ExpertiseSection: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="w-full px-15 py-16">
      {/* Header Area */}
      <div className="text-center mb-12">
        <span className="golden-tag">OUR EXPERTISE</span>

        <h2 className="cabinet gradient-text text-4xl font-bold tracking-tight max-w-2xl mx-auto leading-tight">
          Comprehensive Digital Solutions
        </h2>
      </div>

      {/* Accordion Container */}
      <div className="max-w-5xl mx-auto flex flex-col gap-4">
        {services.map((service) => {
          const isOpen = hoveredId === service.id;
          const Icon = service.IconComponent;

          return (
            <div
              key={service.id}
              onMouseEnter={() => setHoveredId(service.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`transition-all duration-300 rounded-2xl bg-[#ffffff08] border border-[#ffffff14] ${
                isOpen
                  ? "border-[#c9a86a]/60 shadow-[0_0_25px_rgba(201,168,106,0.1)]"
                  : "border-[#ffffff14] hover:border-slate-700"
              } overflow-hidden`}
            >
              {/* Header Bar */}
              <div className="p-6 flex items-center justify-between cursor-pointer">
                <div className="flex items-center justify-center gap-4">
                  {/* Open হলে Icon Cyan হবে, না হলে Golden থাকবে */}
                  <Icon
                    className={`w-8 h-8 transition-colors duration-300 ${
                      isOpen ? "text-cyan-400" : "text-[#c9a86a]"
                    }`}
                  />
                  <h3 className="cabinet text-xl font-bold text-white tracking-wide">
                    {service.title}
                  </h3>
                </div>

                {/* Animated Plus / X Icon */}
                <div
                  className={`transition-transform duration-300 ease-in-out ${
                    isOpen
                      ? "rotate-45 text-cyan-400"
                      : "rotate-0 text-[#c9a86a]"
                  }`}
                >
                  <Plus className="w-6 h-6" />
                </div>
              </div>

              {/* Smooth Expandable Content using CSS Grid */}
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen
                    ? "grid-rows-[1fr] opacity-100 pb-6 px-6"
                    : "grid-rows-[0fr] opacity-0 px-6"
                }`}
              >
                <div className="overflow-hidden border-t border-[#c9a86a33] pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-8">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="text-[#c9a86a] text-xs">✦</span>
                        <span className="garet text-slate-300 text-sm">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Action Button */}
      <div className="text-center mt-10">
        <Button href="/contact" variant="primary" size="lg">
          Start Your Project <ArrowRight size={16} />
        </Button>
      </div>
    </section>
  );
};

export default ExpertiseSection;
