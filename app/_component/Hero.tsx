import Image from "next/image";
import Button from "@/components/Button";

export default function HeroSection() {
  return (
    <section className="h-150 w-full relative">
      <Image
        src="https://preview.cruip.com/neon/images/hero-illustration.svg"
        fill={true}
        alt="Hero Illustration"
        className="object-cover"
      />

      <div className="relative w-200 px-30 py-20 z-10 space-y-6">
        <h1 className="cabinet text-7xl">SCALE YOUR REVENUE WITH GROW TECH</h1>
        <p className="garet">
          Stop losing clients to outdated systems. We build high-converting
          software and optimize your entire tech ecosystem to scale your
          business on autopilot.
        </p>

        <div>
          <Button href="/contact" variant="primary">Scale your business</Button>
          <Button href="/services" variant="secondary">Explore services</Button>
        </div>
      </div>
    </section>
  );
}
