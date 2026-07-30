"use client";

import React, { useEffect, useState } from "react";
import { Globe, Smartphone, Gamepad2, Plus, ArrowRight } from "lucide-react";
import Button from "@/components/Button";

interface ServiceItem {
  id: string;
  title: string;
  IconComponent: React.ElementType;
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

const ExpertiseSection = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  // Detect screen size
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="w-full px-6 py-20 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-14 text-center">
          <span className="golden-tag">OUR EXPERTISE</span>

          <h2 className="cabinet mx-auto mt-4 max-w-3xl text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
            <span className="gradient-text">
              Comprehensive Digital Solutions
            </span>
          </h2>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-5">
          {services.map((service) => {
            const Icon = service.IconComponent;

            const isOpen =
              (isDesktop && hoveredId === service.id) ||
              (!isDesktop && activeId === service.id);

            return (
              <div
                key={service.id}
                onMouseEnter={() => {
                  if (isDesktop) {
                    setHoveredId(service.id);
                  }
                }}
                onMouseLeave={() => {
                  if (isDesktop) {
                    setHoveredId(null);
                  }
                }}
                onClick={() => {
                  if (!isDesktop) {
                    setActiveId(activeId === service.id ? null : service.id);
                  }
                }}
                className={`cursor-pointer overflow-hidden rounded-2xl border bg-white/5 transition-all duration-300 lg:cursor-default ${
                  isOpen
                    ? "border-[#c9a86a]/60 shadow-[0_0_40px_rgba(201,168,106,0.15)]"
                    : "border-white/10 hover:border-slate-700"
                }`}
              >
                {/* Header */}
                <div className="flex items-center justify-between p-5 sm:p-6">
                  <div className="flex items-center gap-4">
                    <Icon
                      className={`h-7 w-7 transition-colors duration-300 sm:h-8 sm:w-8 ${
                        isOpen ? "text-cyan-400" : "text-[#c9a86a]"
                      }`}
                    />

                    <h3 className="cabinet text-lg font-bold tracking-wide text-white sm:text-xl md:text-2xl">
                      {service.title}
                    </h3>
                  </div>

                  <div
                    className={`transition-transform duration-300 ${
                      isOpen ? "rotate-45 text-cyan-400" : "text-[#c9a86a]"
                    }`}
                  >
                    <Plus className="h-6 w-6" />
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`grid transition-all duration-500 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] px-5 pb-6 opacity-100 sm:px-6"
                      : "grid-rows-[0fr] px-5 opacity-0 sm:px-6"
                  }`}
                >
                  <div className="overflow-hidden border-t border-[#c9a86a33] pt-5">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-3 md:grid-cols-2">
                      {service.features.map((feature) => (
                        <div key={feature} className="flex items-center gap-3">
                          <span className="text-xs text-[#c9a86a]">✦</span>

                          <span className="garet text-sm text-slate-300 sm:text-base">
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

        {/* CTA */}
        <div className="mt-14 flex justify-center">
          <Button href="/contact" variant="primary" size="lg">
            Start Your Project
            <ArrowRight size={18} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ExpertiseSection;
