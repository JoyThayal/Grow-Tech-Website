import Image from "next/image";
import Button from "@/components/Button";

export default function HeroSection() {
  return (
    <section className="h-150 w-full relative">
      <Image
        src="https://preview.cruip.com/neon/images/hero-illustration.svg"
        fill={true}
        priority
        alt="Hero Illustration"
        className="object-cover"
      />

      <div className="relative w-250 px-30 py-20 z-10 space-y-6">
        <h1 className="cabinet text-8xl font-black leading-[0.9] uppercase">
          <span className="block gradient-text">SCALE YOUR</span>
          <span className="block gradient-text">REVENUE WITH</span>
          <span className="block gradient-text italic">GROW TECH</span>
        </h1>
        
        <p className="garet text-lg">
          Stop losing clients to outdated systems. We build high-converting
          software and optimize your entire tech ecosystem to scale your
          business on autopilot.
        </p>

        <div className="flex gap-4">
          <Button href="/contact" variant="primary" size="lg">
            Scale your business
          </Button>
          <Button href="/services" variant="secondary" size="lg">
            Explore services
          </Button>
        </div>
      </div>
    </section>
  );
}
