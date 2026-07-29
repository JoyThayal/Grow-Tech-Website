import Image from "next/image";
import Button from "@/components/Button";

export default function HeroSection() {
  return (
    <section className="relative min-h-[50vh] w-full overflow-hidden">
      <Image
        src="/images/hero-illustration.svg"
        fill
        priority
        alt="Hero Illustration"
        className="
          object-cover
          object-[85%_center]
          sm:object-[90%_center]
          md:object-right
          lg:object-cover
        "
      />

      <div className="absolute inset-0 bg-black/60 lg:bg-transparent z-1" />

      <div className="relative z-10 w-full lg:w-250 px-6 sm:px-10 md:px-16 lg:px-30 py-14 sm:py-16 lg:py-20 space-y-6">
        <h1 className="cabinet leading-[0.9] uppercase text-[2.5rem] gradient-text sm:text-6xl md:text-7xl lg:text-8xl">
          SCALE YOUR <br />
          REVENUE WITH <br />
          <span className="italic pr-3">GROW TECH</span>
        </h1>

        <p className="garet max-w-xl text-base sm:text-lg mt-2">
          Stop losing clients to outdated systems. We build high-converting
          software and optimize your entire tech ecosystem to scale your
          business on autopilot.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
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
