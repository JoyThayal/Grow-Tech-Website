"use client";

import Link from "next/link";
import { Globe, Smartphone, Gamepad2, ArrowRight, X } from "lucide-react";

interface ServiceSelectModalProps {
  isOpen: boolean;
  onClose?: () => void;
  title?: string;
  description?: string;
}

export default function ServiceSelectModal({
  isOpen,
  onClose,
  title = "Select What You Need First",
  description = "Please pick a service category to explore plans and complete booking:",
}: ServiceSelectModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl border border-[#1c2d66] bg-[#0c1533] p-6 sm:p-7 shadow-2xl space-y-5 text-center">
        {/* Optional Close Button (যদি ইউজার ক্লোজ করার সুবিধা দিতে চাও) */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-xl border border-[#1c2d66] bg-[#121f48] text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close Modal"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        <div className="space-y-1">
          <span className="golden-tag">CHOOSE A SERVICE</span>
          <h3 className="cabinet text-xl font-bold text-white pt-1">{title}</h3>
          <p className="text-xs text-slate-400">{description}</p>
        </div>

        {/* ৩টি সার্ভিসের লিংক */}
        <div className="space-y-2.5 pt-2 text-left">
          {/* 🌐 Web Development */}
          <Link
            href="/services/web"
            onClick={onClose}
            className="flex items-center justify-between p-3.5 rounded-xl border border-[#1c2d66] bg-[#0e1838] hover:border-cyan-400 hover:bg-[#121f48] text-white transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                <Globe className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold">Web Development</span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
          </Link>

          {/* 📱 Mobile App Development */}
          <Link
            href="/services/app"
            onClick={onClose}
            className="flex items-center justify-between p-3.5 rounded-xl border border-[#1c2d66] bg-[#0e1838] hover:border-indigo-400 hover:bg-[#121f48] text-white transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                <Smartphone className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold">Mobile App Development</span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
          </Link>

          {/* 🎮 Game Development */}
          <Link
            href="/services/game"
            onClick={onClose}
            className="flex items-center justify-between p-3.5 rounded-xl border border-[#1c2d66] bg-[#0e1838] hover:border-purple-400 hover:bg-[#121f48] text-white transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                <Gamepad2 className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold">Game Development</span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
          </Link>
        </div>
      </div>
    </div>
  );
}
