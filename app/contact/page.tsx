"use client";

import React from "react";
import Link from "next/link";
import {
  Mail,
  MessageCircle,
  Phone,
  Send,
  Clock,
  MapPin,
  ArrowRight,
} from "lucide-react";

export default function ContactSection(): React.ReactNode {
  return (
    <section className="w-full text-white py-20 px-6 sm:px-12 lg:px-15 flex flex-col items-center justify-center overflow-hidden">
      {/* 🌟 Header Area */}
      <div className="text-center flex flex-col items-center mb-14">
        <span className="golden-tag mb-3">GET IN TOUCH</span>

        <h2 className="cabinet gradient-text text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
          Connect With Expertise
        </h2>

        <p className="garet text-slate-400 text-sm sm:text-base font-light max-w-xl mt-4 leading-relaxed">
          Have a vision? We have the technical precision to build it. Reach out
          through any of our official channels below.
        </p>

        {/* Small Golden Divider Line */}
        <div className="w-12 h-0.5 bg-[#c9a86a] mt-6 rounded-full" />
      </div>

      {/* 📬 3 Contact Cards Container */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Card 1: Email Inquiry */}
        <div className="rounded-3xl bg-[#ffffff08] border border-[#ffffff14] p-8 flex flex-col items-center text-center transition-all duration-300 hover:border-cyan-500/50 hover:shadow-[0_0_25px_rgba(0,229,255,0.15)] group">
          <div className="w-14 h-14 rounded-2xl bg-[#ffffff08] flex items-center justify-center mb-6 text-[#c9a86a] group-hover:text-cyan-400 transition-colors">
            <Mail className="w-7 h-7" />
          </div>

          <h3 className="cabinet text-xl font-bold text-white mb-2">
            Email Inquiry
          </h3>

          <p className="garet text-slate-400 text-xs leading-relaxed mb-8 min-h-9">
            Drop us a line for project proposals and partnerships.
          </p>

          <a
            href="mailto:growtechofficials4@gmail.com"
            className="w-full py-3 px-4 rounded-xl bg-cyan-950/40 border border-cyan-500/60 text-cyan-400 font-semibold text-xs flex items-center justify-center gap-2 transition-all hover:bg-cyan-500 hover:text-black hover:shadow-[0_0_20px_rgba(0,229,255,0.4)]"
          >
            <Send className="w-3.5 h-3.5" />
            <span>growtechofficials4@gmail.com</span>
          </a>
        </div>

        {/* Card 2: Instant Support */}
        <div className="rounded-3xl bg-[#ffffff08] border border-[#ffffff14] p-8 flex flex-col items-center text-center transition-all duration-300 hover:border-[#c9a86a]/50 hover:shadow-[0_0_25px_rgba(201,168,106,0.15)] group">
          <div className="w-14 h-14 rounded-2xl bg-[#ffffff08] flex items-center justify-center mb-6 text-[#c9a86a] transition-colors">
            <MessageCircle className="w-7 h-7" />
          </div>

          <h3 className="cabinet text-xl font-bold text-white mb-2">
            Instant Support
          </h3>

          <p className="garet text-slate-400 text-xs leading-relaxed mb-8 min-h-9">
            Talk to us directly on WhatsApp for faster response.
          </p>

          <a
            href="https://wa.me/918902709631"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 rounded-xl bg-[#ffffff08] border border-[#ffffff1a] text-cyan-400 font-semibold text-xs flex items-center justify-center gap-2 transition-all hover:border-cyan-400 hover:bg-[#00e5ff10]"
          >
            <MessageCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span>+91 890 2709 631</span>
          </a>
        </div>

        {/* Card 3: Voice Call */}
        <div className="rounded-3xl bg-[#ffffff08] border border-[#ffffff14] p-8 flex flex-col items-center text-center transition-all duration-300 hover:border-cyan-500/50 hover:shadow-[0_0_25px_rgba(0,229,255,0.15)] group">
          <div className="w-14 h-14 rounded-2xl bg-[#ffffff08] flex items-center justify-center mb-6 text-[#c9a86a] group-hover:text-cyan-400 transition-colors">
            <Phone className="w-7 h-7" />
          </div>

          <h3 className="cabinet text-xl font-bold text-white mb-2">
            Voice Call
          </h3>

          <p className="garet text-slate-400 text-xs leading-relaxed mb-8 min-h-9">
            Call us during working hours for a quick consultation.
          </p>

          <a
            href="tel:+919088879219"
            className="w-full py-3 px-4 rounded-xl bg-cyan-950/40 border border-cyan-500/60 text-cyan-400 font-semibold text-xs flex items-center justify-center gap-2 transition-all hover:bg-cyan-500 hover:text-black hover:shadow-[0_0_20px_rgba(0,229,255,0.4)]"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>+91 908 8879 219</span>
          </a>
        </div>
      </div>

      {/* ⏰ Location & Timing Badges */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
        <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#101426] border border-[#ffffff14] text-xs text-slate-300 garet">
          <Clock className="w-3.5 h-3.5 text-[#c9a86a]" />
          <span>Available: Mon - Sun (10 AM - 10 PM)</span>
        </div>

        <div className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#101426] border border-[#ffffff14] text-xs text-slate-300 garet">
          <MapPin className="w-3.5 h-3.5 text-[#c9a86a]" />
          <span>Kolkata, India</span>
        </div>
      </div>

      {/* 🔮 Bottom Magic Portfolio Banner (Dashed Border Card) */}
      <div className="w-full max-w-5xl rounded-3xl border border-dashed border-[#c9a86a]/40 bg-[#101426]/50 p-10 sm:p-14 flex flex-col items-center text-center gap-4">
        <h2 className="cabinet text-3xl sm:text-4xl font-extrabold text-white tracking-wide">
          Ready to see our magic?
        </h2>

        <p className="garet text-slate-400 text-sm max-w-lg mb-4">
          Explore our portfolio to see how we&apos;ve helped other businesses scale.
        </p>

        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 bg-cyan-400 text-black font-extrabold text-sm px-8 py-3.5 rounded-full transition-all duration-300 hover:bg-cyan-300 hover:shadow-[0_0_25px_rgba(0,229,255,0.6)] hover:scale-105"
        >
          <span>View Portfolio</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
