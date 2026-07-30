import Image from "next/image";
import { Cpu, Atom, Smartphone, Gamepad2 } from "lucide-react";

const orbitIcons = [
  { icon: Cpu, angle: -90 },
  { icon: Atom, angle: 0 },
  { icon: Smartphone, angle: 90 },
  { icon: Gamepad2, angle: 180 },
];

export default function OurGrowthSection() {
  return (
    <section className="w-full px-5 py-16 sm:px-6 lg:px-10 lg:py-20 xl:px-16">
      <div className="mx-auto flex max-w-7xl flex-col-reverse items-center gap-16 lg:flex-row">
        {/* Orbit Animation */}
        <div className="flex w-full justify-center lg:w-2/5">
          <div className="relative flex h-105 w-105 items-center justify-center">
            {/* Background Glow */}
            <div className="absolute h-80 w-80 rounded-full bg-cyan-500/5 blur-3xl" />
            <div className="absolute h-56 w-56 rounded-full bg-[#C9A86A]/10 blur-3xl" />

            {/* Center Logo */}
            <div className="absolute z-20 flex h-36 w-36 items-center justify-center rounded-full border border-[#C9A86A]/40 bg-[#07111D] shadow-[0_0_40px_rgba(201,168,106,0.15)]">
              <div className="absolute inset-0 rounded-full bg-cyan-400/10 blur-2xl" />

              <Image
                src="/images/gt.png"
                alt="Grow Tech"
                width={90}
                height={90}
                priority
                className="relative z-10 object-contain"
              />
            </div>

            {/* Orbit Ring */}
            <div className="relative h-72 w-72 animate-[spin_25s_linear_infinite] rounded-full border-2 border-dashed border-gray-600/60">
              {orbitIcons.map(({ icon: Icon, angle }) => (
                <div
                  key={angle}
                  className="absolute left-1/2 top-1/2"
                  style={{
                    transform: `
                      translate(-50%, -50%)
                      rotate(${angle}deg)
                      translateY(-144px)
                    `,
                  }}
                >
                  <div
                    style={{
                      transform: `rotate(${-angle}deg)`,
                    }}
                  >
                    <div className="animate-[spin_25s_linear_infinite_reverse]">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-cyan-400 bg-[#0A1128] text-cyan-400 shadow-[0_0_12px_rgba(0,242,254,0.35)] transition-transform duration-300 hover:scale-110">
                        <Icon size={20} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="w-full max-w-xl lg:w-3/5">
          <span className="golden-tag">OUR GROWTH</span>

          <h2 className="cabinet mt-3 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
            <span className="gradient-text">Driven by Passion, Built for Impact</span>
          </h2>

          <div className="garet mt-6 space-y-5 text-sm leading-relaxed text-gray-400 sm:text-base md:text-lg">
            <p>
              At <span className="font-semibold text-white">Grow Tech</span>, we
              don&apos;t just write code—we architect success. Our journey began
              in the heart of Kolkata, fueled by the relentless energy of four
              best friends. What started as late-night coding sessions and
              ambitious brainstorming has evolved into a unified digital
              ecosystem.
            </p>

            <p>
              Today, we bridge the gap between imagination and reality,
              delivering high-performance software and expert hardware solutions
              with a commitment to quality that only a dedicated team like ours
              can provide.
            </p>
          </div>

          {/* Stats */}
          <div className="mt-8 flex flex-wrap gap-10 sm:gap-12">
            <div>
              <h3 className="cabinet text-4xl font-extrabold text-[#C9A86A]">
                100%
              </h3>

              <p className="garet mt-1 text-xs font-medium tracking-wide text-gray-400">
                Dedication
              </p>
            </div>

            <div>
              <h3 className="cabinet text-4xl font-extrabold text-cyan-400">
                24/7
              </h3>

              <p className="garet mt-1 text-xs font-medium tracking-wide text-gray-400">
                Technical Support
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
