"use client";

import React from "react";
import { Code2, Smartphone, Gamepad2, Wrench } from "lucide-react";
import { RiInstagramFill, RiFacebookCircleFill } from "react-icons/ri";

interface Visionary {
  name: string;
  role: string;
  quote: string;
  IconComponent: React.ElementType;
  socials: {
    facebook?: string;
    instagram?: string;
  };
}

const visionariesData: Visionary[] = [
  {
    name: "Joy Thayal",
    role: "FULL-STACK WEB DEVELOPER",
    quote:
      '"Building robust, scalable web architectures with precision and clean engineering."',
    IconComponent: Code2,
    socials: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
    },
  },
  {
    name: "Aman Shaw",
    role: "APP DEVELOPMENT",
    quote:
      '"Transforming complex ideas into seamless, user-centric mobile experiences."',
    IconComponent: Smartphone,
    socials: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
    },
  },
  {
    name: "Bijoy Thayal",
    role: "INDIE GAME DEVELOPER",
    quote:
      '"Crafting immersive worlds and interactive gameplay mechanics that captivate gamers."',
    IconComponent: Gamepad2,
    socials: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
    },
  },
  {
    name: "Biprajit Paul",
    role: "HARDWARE EXPERT",
    quote:
      '"Optimizing computer architecture and system integrity for peak performance."',
    IconComponent: Wrench,
    socials: {
      facebook: "https://facebook.com",
      instagram: "https://instagram.com",
    },
  },
];

export default function MeetVisionariesSection(): React.ReactNode {
  return (
    <section className="w-full text-white py-20 px-6 lg:px-15 flex flex-col items-center justify-center overflow-hidden">
      {/* 🌟 Header Area */}
      <div className="text-center flex flex-col items-center mb-16">
        <span className="golden-tag mb-3">THE MINDS BEHIND GROW TECH</span>

        <h2 className="cabinet text-4xl font-bold tracking-tight leading-tight">
          <span className="gradient-text">Meet The Visionaries</span>
        </h2>

        {/* Small Golden Divider Line */}
        <div className="w-12 h-0.5 bg-[#c9a86a] mt-6 rounded-full" />
      </div>

      {/* 👥 4 Visionary Cards Grid */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {visionariesData.map((member, index) => {
          const Icon = member.IconComponent;

          return (
            /* 3D Perspective Wrapper */
            <div
              key={index}
              className="group h-90 w-full perspective-[1000px] cursor-pointer"
            >
              {/* 🔄 Flip Card Inner Container */}
              <div className="relative h-full w-full rounded-3xl transition-transform duration-700 transform-3d group-hover:transform-[rotateY(-180deg)]">
                {/* 1️⃣ FRONT SIDE */}
                <div className="absolute inset-0 h-full w-full rounded-3xl bg-[#ffffff08] border border-[#ffffff14] p-8 flex flex-col items-center justify-center text-center backface-hidden">
                  {/* Dashed Golden Circle Container */}
                  <div className="w-24 h-24 rounded-full border border-dashed border-[#c9a86a] flex items-center justify-center mb-8 text-[#c9a86a] bg-[#c9a86a]/10">
                    <Icon className="w-10 h-10" />
                  </div>

                  {/* Name */}
                  <h3 className="cabinet text-2xl font-bold text-white mb-2">
                    {member.name}
                  </h3>

                  {/* Role */}
                  <p className="garet text-[#c9a86a] text-xs font-extrabold tracking-widest uppercase leading-relaxed">
                    {member.role}
                  </p>
                </div>

                {/* 2️⃣ BACK SIDE (Golden Card Overlay) */}
                <div className="absolute inset-0 h-full w-full rounded-3xl bg-[#c9a86a] text-[#0a0d17] p-8 flex flex-col items-center justify-center text-center transform-[rotateY(180deg)] backface-hidden">
                  {/* Quote */}
                  <p className="garet italic text-sm sm:text-base font-semibold leading-relaxed mb-8 text-[#141414] max-w-55">
                    {member.quote}
                  </p>

                  {/* Social Icons */}
                  <div className="flex items-center gap-5 text-[#0a0d17]">
                    {member.socials.facebook && (
                      <a
                        href={member.socials.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-white/20 p-2 transition-all duration-300 hover:scale-110 hover:bg-white/30"
                        aria-label={`${member.name} Facebook`}
                      >
                        <RiFacebookCircleFill className="w-8 h-8" />
                      </a>
                    )}

                    {member.socials.instagram && (
                      <a
                        href={member.socials.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-white/20 p-2 transition-all duration-300 hover:scale-110 hover:bg-white/30"
                        aria-label={`${member.name} Instagram`}
                      >
                        <RiInstagramFill className="w-8 h-8" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
