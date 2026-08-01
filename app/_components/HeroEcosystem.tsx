import { Code, Layers, Wrench, Gamepad2, Shield, Globe } from "lucide-react";
import Button from "@/components/ui/Button";

const iconClass =
  "w-4 h-4 sm:w-5 sm:h-5 text-slate-400 transition-colors duration-300 hover:text-cyan-400 cursor-pointer";

export default function HeroEcosystemSection() {
  return (
    <section className="relative flex min-h-[85vh] w-full flex-col items-center justify-center overflow-hidden px-5 py-16 text-white sm:px-6 lg:py-20">
      {/* Top Icon Bar */}
      <div className="mb-8 lg:mb-10">
        <div className="flex items-center gap-4 rounded-full border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-md shadow-2xl sm:gap-6 sm:px-8 sm:py-3.5">
          <Code className={iconClass} />
          <Layers className={iconClass} />
          <Wrench className={iconClass} />

          {/* Active Indicator */}
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 scale-150 rounded-full bg-cyan-500/40 blur-lg animate-pulse" />
            <div className="relative z-10 h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#06b6d4]" />
          </div>

          <Gamepad2 className={iconClass} />
          <Shield className={iconClass} />
          <Globe className={iconClass} />
        </div>
      </div>

      {/* Badge */}
      <span className="mb-5 rounded-full border border-cyan-500/30 bg-cyan-950/30 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-cyan-400 sm:mb-6 sm:px-5 sm:text-xs">
        Seamless Ecosystem
      </span>

      {/* Heading */}
      <div className="relative mb-6 max-w-4xl text-center">
        <h1 className="cabinet font-extrabold leading-[0.95]">
          <span className="gradient-text text-3xl sm:text-4xl md:text-6xl">
            One Integrated System
          </span>

          <br />

          <span className="gradient-text text-[1.35rem] font-black italic uppercase sm:text-3xl md:text-5xl">
            For All Your Tech Needs.
          </span>
        </h1>

        <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-[#D4AF37]" />

        <div className="absolute -right-20 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-[#D4AF37]/50 lg:flex">
          <div className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4]" />
        </div>
      </div>

      {/* Description */}
      <p className="garet mb-8 max-w-2xl px-2 text-center text-sm font-light leading-relaxed text-slate-400 sm:text-base md:text-lg lg:mb-10">
        At Grow Tech, we bridge the gap between hardware and software. Whether
        it&apos;s launching a full-stack web app, developing a 3D game, or
        maintaining complex hardware infrastructure—our ecosystem is built to
        scale your vision.
      </p>

      <Button
        href="https://wa.me/+918902709631?text=Hi%20Grow%20Tech,%20I%20want%20to%20discuss%20a%20project."
        size="lg"
        variant="primary"
      >
        LET&apos;S DISCUSS YOUR PROJECT
      </Button>
    </section>
  );
}
