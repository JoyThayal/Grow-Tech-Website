"use client";

import React from "react";
import Link from "next/link";
import { Mail, PhoneCall, Send, Clock, MapPin, ArrowRight } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

export default function ContactSection(): React.ReactNode {
  return (
    <section className="w-full text-white py-10 lg:py-20 px-5 sm:px-12 lg:px-15 flex flex-col items-center justify-center overflow-hidden">
      {/* 🌟 Header Area */}
      <div className="text-center flex flex-col items-center mb-14">
        <span className="golden-tag mb-3">GET IN TOUCH</span>

        <h2 className="cabinet text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
          <span className="gradient-text">Connect With Expertise</span>
        </h2>

        <p className="garet text-slate-400 text-sm sm:text-base font-light max-w-xl mt-4 leading-relaxed">
          Have a vision? We have the technical precision to build it. Reach out
          through any of our official channels below.
        </p>

        {/* Small Golden Divider Line */}
        <div className="w-12 h-0.5 bg-[#c9a86a] mt-6 rounded-full" />
      </div>

      {/* 📬 3 Contact Cards Container */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Card 1: Official Email */}
        <div className="rounded-3xl bg-[#ffffff08] border border-[#ffffff14] p-8 flex flex-col items-center text-center transition-all duration-300 hover:border-cyan-500/50 hover:shadow-[0_0_25px_rgba(0,229,255,0.15)] group">
          <div className="w-14 h-14 rounded-2xl bg-[#ffffff08] flex items-center justify-center mb-5 text-[#c9a86a] group-hover:text-cyan-400 transition-colors">
            <Mail className="w-7 h-7" />
          </div>

          <h3 className="cabinet text-xl font-bold text-white mb-2">
            Email Inquiry
          </h3>

          <p className="garet text-slate-400 text-xs leading-relaxed mb-6 min-h-9">
            Drop us a line for project proposals and formal partnerships.
          </p>

          <a
            href="mailto:growtechofficials4@gmail.com"
            className="w-full py-3 px-4 rounded-xl bg-cyan-950/40 border border-cyan-500/60 text-cyan-400 font-bold text-xs flex items-center justify-center gap-2 transition-all hover:bg-cyan-500 hover:text-black hover:shadow-[0_0_20px_rgba(0,229,255,0.4)]"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send Email</span>
          </a>
        </div>

        {/* 🟢 Card 2: Official WhatsApp (Real Logo & Green Theme) */}
        <div className="rounded-3xl bg-[#ffffff08] border border-[#25D366]/30 p-8 flex flex-col items-center text-center transition-all duration-300 hover:border-[#25D366] hover:shadow-[0_0_25px_rgba(37,211,102,0.25)] group relative overflow-hidden">
          {/* Highlight Badge */}
          <span className="absolute top-4 right-4 text-[10px] font-mono uppercase tracking-wider text-[#25D366] bg-[#25D366]/10 px-2 py-0.5 rounded-full border border-[#25D366]/30">
            Fastest
          </span>

          <div className="w-14 h-14 rounded-2xl bg-[#25D366]/10 flex items-center justify-center mb-5 text-[#25D366] transition-transform duration-300">
            <SiWhatsapp className="w-7 h-7" />
          </div>

          <h3 className="cabinet text-xl font-bold text-white mb-2">
            WhatsApp Chat
          </h3>

          <p className="garet text-slate-400 text-xs leading-relaxed mb-6 min-h-9">
            Chat with our engineering team directly for instant consultation.
          </p>

          <a
            href="https://wa.me/918902709631?text=Hi%20Grow%20Tech,%20I%20want%20to%20discuss%20a%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-95"
          >
            <SiWhatsapp className="w-4 h-4 fill-white" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

        {/* Card 3: Direct Phone Call */}
        <div className="rounded-3xl bg-[#ffffff08] border border-[#ffffff14] p-8 flex flex-col items-center text-center transition-all duration-300 hover:border-cyan-500/50 hover:shadow-[0_0_25px_rgba(0,229,255,0.15)] group">
          <div className="w-14 h-14 rounded-2xl bg-[#ffffff08] flex items-center justify-center mb-5 text-[#c9a86a] group-hover:text-cyan-400 transition-colors">
            <PhoneCall className="w-7 h-7" />
          </div>

          <h3 className="cabinet text-xl font-bold text-white mb-2">
            Direct Call
          </h3>

          <p className="garet text-slate-400 text-xs leading-relaxed mb-6 min-h-9">
            Call us directly during active working hours for urgent queries.
          </p>

          <a
            href="tel:+918902709631"
            className="w-full py-3 px-4 rounded-xl bg-cyan-950/40 border border-cyan-500/60 text-cyan-400 font-bold text-xs flex items-center justify-center gap-2 transition-all hover:bg-cyan-500 hover:text-black hover:shadow-[0_0_20px_rgba(0,229,255,0.4)]"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Call Now</span>
          </a>
        </div>
      </div>

      {/* ⏰ Location & Timing Badges */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
        <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#101426] border border-[#ffffff14] text-xs text-slate-300 garet">
          <Clock className="w-3.5 h-3.5 text-[#c9a86a]" />
          <span>Available: Mon - Sun (10 AM - 10 PM)</span>
        </div>

        <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#101426] border border-[#ffffff14] text-xs text-slate-300 garet">
          <MapPin className="w-3.5 h-3.5 text-[#c9a86a]" />
          <span>Kolkata, India</span>
        </div>
      </div>

      {/* 🔮 Bottom Magic Portfolio Banner */}
      <div className="w-full max-w-5xl rounded-3xl border border-dashed border-[#c9a86a]/60 bg-[#ffffff08] p-10 sm:p-14 flex flex-col items-center text-center gap-4">
        <h2 className="cabinet text-3xl sm:text-4xl font-extrabold text-white tracking-wide">
          Ready to see our magic?
        </h2>

        <p className="garet text-slate-400 text-sm max-w-lg mb-4">
          Explore our portfolio to see how we&apos;ve helped other businesses
          scale with modern digital experiences.
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
