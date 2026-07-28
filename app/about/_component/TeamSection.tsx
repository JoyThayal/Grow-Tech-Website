import React from "react";
import { Globe, Smartphone, Gamepad2, Cpu } from "lucide-react";

export default function TeamSection() {
  const teamMembers = [
    {
      name: "Joy Thayal",
      role: "WEB DEVELOPER",
      description:
        "Mastering the art of full-stack web solutions with technical planning and high-performance digital architecture.",
      icon: Globe,
    },
    {
      name: "Aman Shaw",
      role: "APP DEVELOPER",
      description:
        "Leading the mobile revolution with seamless, user-centric app management and cross-platform development strategies.",
      icon: Smartphone,
    },
    {
      name: "Bijoy Thayal",
      role: "GAME DEVELOPER",
      description:
        "Pushing the boundaries of imagination by creating immersive, high-quality 2D/3D gaming experiences.",
      icon: Gamepad2,
    },
    {
      name: "Biprajit Paul",
      role: "HARDWARE EXPERT",
      description:
        "Ensuring technical stability through expert hardware diagnostics, precision repairs, and infrastructure maintenance.",
      icon: Cpu,
    },
  ];

  return (
    <section className="w-full py-16 px-12 text-center">
      {/* হেডার অংশ */}
      <div className="space-y-3 mb-12">
        <p className="golden-tag">
          THE VISIONARIES BEHIND GROW TECH
        </p>
        <h2 className="cabinet gradient-text text-4xl font-extrabold tracking-tight">
          Meet Our Expert Team
        </h2>
      </div>

      {/* টিম কার্ডস (৩-কলাম লেআউট) */}
      <div className="grid grid-cols-4 gap-6 w-full px-15">
        {teamMembers.map((member, index) => {
          const IconComponent = member.icon;
          return (
            <div
              key={index}
              className="bg-[#ffffff08] border border-[#ffffff14] rounded-2xl p-8 flex flex-col items-center text-center space-y-4 hover:border-[#c9a86a]/40 transition-all duration-300"
            >
              {/* গোল্ডেন আইকন */}
              <div className="text-[#c9a86a]">
                <IconComponent size={36} strokeWidth={1.5} />
              </div>

              {/* নাম */}
              <h3 className="cabinet text-2xl font-bold text-white tracking-wide">
                {member.name}
              </h3>

              {/* রোল / পদবী */}
              <p className="garet text-xs font-bold text-[#00f2fe] tracking-widest uppercase">
                {member.role}
              </p>

              {/* বিবরণ */}
              <p className="garet text-sm text-gray-400 leading-relaxed pt-2">
                {member.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
