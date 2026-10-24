import React from "react";
import Link from "next/link";
import { ArrowLeft, Clock, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface BookingHeaderProps {
  rawService: string;
  packageName: string;
  serviceMeta: {
    name: string;
    icon: LucideIcon;
    color: string;
    bg: string;
    border: string;
  };
}

export default function BookingHeader({
  rawService,
  packageName,
  serviceMeta,
}: BookingHeaderProps) {
  const ServiceIcon = serviceMeta.icon;

  return (
    <div className="space-y-6">
      {/* 🔙 ব্যাক লিংক */}
      <div className="flex items-center justify-between">
        <Link
          href={rawService === "game" ? "/services/game" : "/services"}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Change Package</span>
        </Link>
        <span className="golden-tag">GROW TECH CHECKOUT</span>
      </div>

      {/* 📦 প্যাকেজ ব্যানার */}
      <div className="rounded-2xl border border-cyan-500/40 bg-linear-to-br from-[#0e1838] to-[#0c1533] p-5 sm:p-6 backdrop-blur-xl">
        <div className="flex items-center justify-between gap-3 mb-2">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider ${serviceMeta.bg} ${serviceMeta.border} ${serviceMeta.color} border`}
          >
            <ServiceIcon className="w-3.5 h-3.5" />
            {serviceMeta.name}
          </span>

          <span className="text-[10px] font-mono text-[#C9A86A] flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Active Plan
          </span>
        </div>

        <h2 className="cabinet text-xl sm:text-2xl font-extrabold text-white mt-1">
          {packageName}
        </h2>

        <div className="flex items-center gap-2 text-xs text-slate-400 font-mono pt-1.5">
          <Clock className="w-3.5 h-3.5 text-cyan-400" />
          <span>40% Advance • 60% on Final Delivery</span>
        </div>
      </div>
    </div>
  );
}
