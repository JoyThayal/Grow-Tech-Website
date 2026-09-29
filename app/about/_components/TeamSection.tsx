"use client";

import { useRef, type ComponentType, type Ref } from "react";
import { GlobeIcon } from "@/components/icons/globe-icon";
import { SmartphoneIcon } from "@/components/icons/smart-phone";
import { GamepadIcon } from "@/components/icons/game-pade";
import { CpuIcon } from "@/components/icons/cpu-icon";

interface AnimatedHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface TeamMember {
  name: string;
  role: string;
  description: string;
  icon: ComponentType<{ ref?: Ref<AnimatedHandle>; size?: number }>;
}

const teamMembers: TeamMember[] = [
  {
    name: "Joy Thayal",
    role: "WEB DEVELOPER",
    description:
      "Mastering the art of full-stack web solutions with technical planning and high-performance digital architecture.",
    icon: GlobeIcon,
  },
  {
    name: "Aman Shaw",
    role: "APP DEVELOPER",
    description:
      "Leading the mobile revolution with seamless, user-centric app management and cross-platform development strategies.",
    icon: SmartphoneIcon,
  },
  {
    name: "Bijoy Thayal",
    role: "GAME DEVELOPER",
    description:
      "Pushing the boundaries of imagination by creating immersive, high-quality 2D/3D gaming experiences.",
    icon: GamepadIcon,
  },
];

// একটিমাত্র রিয়ুজেবল কার্ড কম্পোনেন্ট
function MemberCard({ member }: { member: TeamMember }) {
  const iconRef = useRef<AnimatedHandle>(null);
  const Icon = member.icon;

  return (
    <article
      onMouseEnter={() => iconRef.current?.startAnimation()}
      onMouseLeave={() => iconRef.current?.stopAnimation()}
      className="group rounded-2xl border border-white/10 bg-white/5 p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:border-[#C9A86A]/40 hover:shadow-lg hover:shadow-[#C9A86A]/10 cursor-pointer"
    >
      <div className="mb-5 flex justify-center text-[#C9A86A] transition-transform duration-300 group-hover:scale-110">
        <Icon ref={iconRef} size={38} />
      </div>

      <h3 className="cabinet text-2xl font-bold tracking-wide text-white">
        {member.name}
      </h3>

      <p className="garet mt-2 text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">
        {member.role}
      </p>

      <p className="garet mt-5 text-sm leading-relaxed text-gray-400">
        {member.description}
      </p>
    </article>
  );
}

export default function TeamSection() {
  return (
    <section className="max-w-7xl mx-auto w-full px-5 py-16 text-center sm:px-6 lg:px-10 lg:py-20 xl:px-16">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12">
          <span className="golden-tag">THE VISIONARIES BEHIND GROW TECH</span>

          <h2 className="cabinet mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            <span className="gradient-text">Meet Our Expert Team</span>
          </h2>
        </div>

        {/* Team Cards */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 xl:grid-cols-3">
          {teamMembers.map((member) => (
            <MemberCard key={member.name} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}
