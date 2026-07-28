import {
  Code,
  Layers,
  Wrench,
  Gamepad2,
  Shield,
  Globe,
} from "lucide-react";
import Button from "@/components/Button";

export default function HeroEcosystemSection() {
  return (
    <section className="w-full min-h-[85vh] text-white flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden">
      {/* 1. Top Glassmorphic Icon Bar */}
      <div className="relative mb-10">
        <div className="flex items-center gap-6 px-8 py-3.5 rounded-full bg-[#ffffff08] border border-[#ffffff14] backdrop-blur-md shadow-2xl relative z-10">
          <Code className="w-5 h-5 text-slate-400 hover:text-cyan-400 transition cursor-pointer" />
          <Layers className="w-5 h-5 text-slate-400 hover:text-cyan-400 transition cursor-pointer" />
          <Wrench className="w-5 h-5 text-slate-400 hover:text-cyan-400 transition cursor-pointer" />

          {/* Active / Glowing Center Icon Effect */}
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-cyan-500/40 blur-lg rounded-full scale-150 animate-pulse" />
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 relative z-10 shadow-[0_0_12px_#06b6d4]" />
          </div>

          <Gamepad2 className="w-5 h-5 text-slate-400 hover:text-cyan-400 transition cursor-pointer" />
          <Shield className="w-5 h-5 text-slate-400 hover:text-cyan-400 transition cursor-pointer" />
          <Globe className="w-5 h-5 text-slate-400 hover:text-cyan-400 transition cursor-pointer" />
        </div>
      </div>

      {/* 2. Seamless Ecosystem Pill Tag */}
      <div className="mb-6">
        <span className="px-5 py-1.5 rounded-full bg-[#082f49]/40 border border-cyan-500/30 text-cyan-400 text-xs font-semibold tracking-wider uppercase">
          SEAMLESS ECOSYSTEM
        </span>
      </div>

      {/* 3. Main Headings with Right Decorative Circular Dot */}
      <div className="relative max-w-4xl text-center space-y-2 mb-6">
        <h1 className="cabinet gradient-text text-4xl md:text-6xl font-extrabold tracking-tigh">
          One Integrated System
        </h1>

        <h2 className="cabinet gradient-text text-3xl md:text-5xl font-black italic tracking-wide uppercase">
          FOR ALL YOUR TECH NEEDS.
        </h2>

        {/* Small Golden Accent Line Below Heading */}
        <div className="w-16 h-1 bg-[#D4AF37] mx-auto rounded-full mt-4" />

        {/* Decorative Right Circular Badge */}
        <div className="hidden lg:flex absolute -right-20 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-[#D4AF37]/50 items-center justify-center bg-transparent">
          <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4]" />
        </div>
      </div>

      {/* 4. Subtitle Description */}
      <p className="max-w-2xl text-center text-slate-400 text-base md:text-lg font-light leading-relaxed mb-10 garet">
        At Grow Tech, we bridge the gap between hardware and software. Whether
        it&apos;s launching a full-stack web app, developing a 3D game, or
        maintaining complex hardware infrastructure—our ecosystem is built to
        scale your vision.
      </p>

      <Button href="/contact" size="lg" variant="primary">
        LET&apos;S DISCUSS YOUR PROJECT
      </Button>
    </section>
  );
}
