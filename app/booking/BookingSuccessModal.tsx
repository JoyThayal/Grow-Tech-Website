import React from "react";
import Link from "next/link";
import { CheckCircle2, FileText, Home } from "lucide-react";

interface BookingSuccessModalProps {
  clientName: string;
  packageName: string;
}

export default function BookingSuccessModal({
  clientName,
  packageName,
}: BookingSuccessModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-3xl border border-cyan-500/40 bg-[#0c1533] p-6 sm:p-8 shadow-2xl text-center space-y-5">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-500/30 bg-cyan-950/40 text-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.25)]">
          <CheckCircle2 className="h-9 w-9 text-cyan-400" />
        </div>

        <div className="space-y-2">
          <span className="golden-tag">ORDER CONFIRMED</span>
          <h3 className="cabinet text-2xl font-extrabold text-white">
            Booking Successful!
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Thank you,{" "}
            <span className="font-semibold text-white">{clientName}</span>! Your
            project request for{" "}
            <span className="font-semibold text-cyan-400">{packageName}</span>{" "}
            has been received. Our team will review your notes and contact you
            shortly.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            href="/profile/orders"
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-cyan-300 transition-all shadow-[0_0_15px_rgba(0,229,255,0.3)] active:scale-95"
          >
            <FileText className="w-4 h-4" />
            <span>Booking Details</span>
          </Link>

          <Link
            href="/"
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-white/10 bg-[#121f48] text-slate-200 font-semibold text-xs uppercase tracking-wider hover:bg-[#1a2d66] hover:text-white transition-all active:scale-95"
          >
            <Home className="w-4 h-4 text-cyan-400" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
