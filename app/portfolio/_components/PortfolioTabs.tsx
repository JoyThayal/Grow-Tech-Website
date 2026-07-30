// e.g. components/PortfolioTabs.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { name: "All Works", href: "/portfolio" },
  { name: "Web Universe", href: "/portfolio/web" },
  { name: "App Development", href: "/portfolio/app" },
  { name: "Game Production", href: "/portfolio/game" },
];

export default function PortfolioTabs() {
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-center gap-3 my-1 flex-wrap">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.name}
            href={tab.href}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all duration-300 ${
              isActive
                ? "bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-400/20 scale-105"
                : "bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white"
            }`}
          >
            {tab.name}
          </Link>
        );
      })}
    </div>
  );
}
