// components/PortfolioTabs.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { Layers, Globe, Smartphone, Gamepad2 } from "lucide-react";

const tabs = [
  {
    name: "All",
    fullName: "All Works",
    href: "/portfolio",
    icon: Layers,
  },
  {
    name: "Web",
    fullName: "Web Universe",
    href: "/portfolio/web",
    icon: Globe,
  },
  {
    name: "Apps",
    fullName: "App Creation",
    href: "/portfolio/app",
    icon: Smartphone,
  },
  {
    name: "Games",
    fullName: "Game Craft",
    href: "/portfolio/game",
    icon: Gamepad2,
  },
];

export default function PortfolioTabs() {
  const pathname = usePathname();

  return (
    <div className="w-full flex justify-center my-6 px-2 sm:px-4">
      {/* 🎛️ মোবাইলে গ্রিড ফিট, ডেস্কটপে আনরেস্ট্রিক্টেড এক লাইন */}
      <div className="grid grid-cols-4 sm:flex sm:items-center sm:justify-center w-full max-w-lg sm:max-w-none sm:w-auto p-1.5 rounded-2xl sm:rounded-full bg-[#0a1128]/80 border border-[#1c2d66] backdrop-blur-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive =
            tab.href === "/portfolio"
              ? pathname === "/portfolio"
              : pathname.startsWith(tab.href);

          return (
            <Link
              key={tab.name}
              href={tab.href}
              className={`relative z-10 flex items-center justify-center py-2 sm:py-2.5 px-2 sm:px-6 rounded-xl sm:rounded-full text-[11px] sm:text-xs font-semibold transition-colors duration-200 select-none whitespace-nowrap text-center ${
                isActive
                  ? "text-slate-950 font-bold"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {/* 🌟 Active স্লাইডিং পিল অ্যানিমেশন */}
              {isActive && (
                <motion.div
                  layoutId="activePortfolioMainTab"
                  className="absolute inset-0 rounded-xl sm:rounded-full bg-linear-to-r from-cyan-400 via-cyan-300 to-blue-400 shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                  transition={{
                    type: "spring",
                    stiffness: 450,
                    damping: 32,
                  }}
                />
              )}

              {/* মোবাইলে কলাম (আইকন উপরে, নাম নিচে), ডেস্কটপে স্ট্রিক্ট এক লাইন (রো) */}
              <span className="relative z-10 flex flex-col sm:flex-row items-center gap-1 sm:gap-2 leading-none">
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 stroke-[2.2]" />
                <span className="sm:hidden">{tab.name}</span>
                <span className="hidden sm:inline-block whitespace-nowrap">
                  {tab.fullName}
                </span>
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
