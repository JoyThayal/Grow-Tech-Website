import { ShieldCheck, Zap, Users } from "lucide-react";

const cards = [
  {
    title: "Unmatched Reliability",
    description:
      "We build robust digital ecosystems that don't just work—they thrive under pressure. Your business success is our greatest reputation.",
    icon: ShieldCheck,
  },
  {
    title: "Agile Innovation",
    description:
      "As a young, high-energy team, we adopt modern technologies faster than industry standards, giving your business a lasting competitive advantage.",
    icon: Zap,
  },
  {
    title: "Direct Founder Access",
    description:
      "No middlemen. Work directly with our founders to ensure every detail of your vision is transformed into reality.",
    icon: Users,
  },
];

export default function FeaturesSection() {
  return (
    <section className="w-full px-5 py-16 sm:px-6 lg:px-10 lg:py-20 xl:px-16">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="golden-tag">OUR DNA</span>

          <h2 className="cabinet mt-3 text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
            <span className="gradient-text">Why Partners Choose Grow Tech</span>
          </h2>

          <p className="garet mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-400 md:text-base">
            Every project we build is driven by innovation, reliability, and a
            commitment to delivering technology that creates real business
            impact.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {cards.map(({ title, description, icon: Icon }) => (
            <article
              key={title}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 transition-all duration-500 hover:-translate-y-2 hover:border-[#C9A86A]/50 hover:bg-white/[0.07] hover:shadow-[0_20px_60px_rgba(201,168,106,0.12)]"
            >
              {/* Glow */}
              <div className="absolute -right-12 -top-12 h-28 w-28 rounded-full bg-cyan-400/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Badge */}
              <div className="absolute right-6 top-6 flex h-7 w-7 items-center justify-center rounded-full border border-[#C9A86A]/40 bg-[#07111D] opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                <div className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]" />
              </div>

              {/* Icon */}
              <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-[#101827] text-[#C9A86A] transition-all duration-300 group-hover:scale-110 group-hover:border-[#C9A86A]/40 group-hover:bg-[#162033]">
                <Icon size={26} strokeWidth={1.8} />
              </div>

              {/* Title */}
              <h3 className="cabinet text-2xl font-bold text-white">{title}</h3>

              {/* Description */}
              <p className="garet mt-4 text-sm leading-7 text-slate-400 md:text-base">
                {description}
              </p>

              {/* Bottom Accent */}
              <div className="mt-8 h-px w-0 bg-linear-to-r from-[#C9A86A] to-cyan-400 transition-all duration-500 group-hover:w-full" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
