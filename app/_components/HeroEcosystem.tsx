import Link from "next/link";
import {
  Code,
  Layers,
  Smartphone,
  Gamepad2,
  Shield,
  Globe,
  ArrowRight,
} from "lucide-react";
import Button from "@/components/ui/Button";

const iconClass =
  "w-4 h-4 sm:w-5 sm:h-5 text-slate-400 transition-colors duration-300 hover:text-cyan-400 cursor-pointer";

// 🟢 Official WhatsApp SVG Icon Component
function WhatsAppIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.05 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.413Z" />
    </svg>
  );
}

export default function HeroEcosystemSection() {
  return (
    <section className="relative flex min-h-[85vh] w-full flex-col items-center justify-center overflow-hidden px-5 py-16 text-white sm:px-6 lg:py-20">
      {/* Top Icon Bar */}
      <div className="mb-8 lg:mb-10">
        <div className="flex items-center gap-4 rounded-full border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-md shadow-2xl sm:gap-6 sm:px-8 sm:py-3.5">
          <Code className={iconClass} />
          <Layers className={iconClass} />
          <Smartphone className={iconClass} />

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
        At Grow Tech, we build high-impact digital experiences. Whether
        it&apos;s launching a scalable full-stack web app, crafting an engaging
        mobile application, or developing interactive 3D games—our ecosystem is
        engineered to scale your vision.
      </p>

      {/* 🚀 Dual Action CTA */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        {/* 🟢 Official WhatsApp Button */}
        <Link
          href="https://wa.me/918902709631?text=Hi%20Grow%20Tech,%20I%20want%20to%20discuss%20a%20project."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-lg bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-xs sm:text-sm tracking-wide active:scale-95 transition-all duration-300"
        >
          <WhatsAppIcon className="w-5 h-5 fill-white shrink-0" />
          <span>Chat on WhatsApp</span>
        </Link>

        {/* 🌐 Explore Services Button */}
        <Button
          href="/services"
          size="lg"
          variant="secondary"
          className="flex items-center gap-2"
        >
          <span>Explore Services</span>
          <ArrowRight className="w-4 h-4 text-cyan-400" />
        </Button>
      </div>
    </section>
  );
}
