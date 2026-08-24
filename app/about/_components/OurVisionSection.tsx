import Image from "next/image";

const tags = ["#Innovation", "#Scalability", "#Excellence", "#Unity"];

export default function OurVisionSection() {
  return (
    <section className="relative w-full overflow-hidden px-5 py-16 sm:px-8 lg:px-12 lg:py-24 xl:px-20">
      {/* 🌌 ব্যাকগ্রাউন্ড অরা ও গ্লো ইফেক্ট (Glow Effects) */}
      <div className="pointer-events-none absolute left-1/4 top-1/2 -z-10 h-72 w-72 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-1/4 top-1/3 -z-10 h-80 w-80 rounded-full bg-[#C9A86A]/10 blur-[140px]" />

      <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 lg:flex-row lg:gap-16">
        {/* ১. বামপাশের কন্টেন্ট সেকশন */}
        <div className="w-full max-w-2xl lg:w-3/5 text-center lg:text-left">
          {/* সাব-হেডার ব্যাজ */}
          <span className="golden-tag inline-block">OUR VISION</span>

          {/* টাইটেল */}
          <h2 className="cabinet mt-4 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
            <span className="gradient-text">
              Building Modern Solutions for Global Impact
            </span>
          </h2>

          {/* প্যারাগ্রাফ */}
          <div className="garet mt-6 space-y-5 text-sm leading-relaxed text-gray-300 sm:text-base md:text-lg">
            <p className="p-4 rounded-2xl bg-white/2 border border-white/5 backdrop-blur-sm shadow-inner">
              At <span className="font-bold text-cyan-400">Grow Tech</span>, we
              believe that great code is the foundation of every successful
              business. Our{" "}
              <span className="font-semibold text-cyan-400 underline decoration-cyan-400/40 underline-offset-4">
                core team of specialists
              </span>{" "}
              focuses on creating high-end digital software that doesn&apos;t
              just look good but performs exceptionally in a competitive market.
            </p>

            <p>
              We bridge the gap between imagination and execution. By
              integrating{" "}
              <span className="font-semibold text-cyan-400">Web</span>,{" "}
              <span className="font-semibold text-cyan-400">Mobile</span>,{" "}
              <span className="font-semibold text-cyan-400">Gaming</span>, and{" "}
              <span className="font-semibold text-cyan-400">
                Hardware Solutions
              </span>
              , we provide a 360-degree tech ecosystem designed to scale your
              business and deliver technical precision to every project.
            </p>
          </div>

          {/* ট্যাগসমূহ */}
          <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-2.5 sm:gap-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className="garet rounded-full border border-[#C9A86A]/40 bg-[#C9A86A]/10 px-4 py-1.5 text-xs font-semibold text-[#C9A86A] sm:text-sm transition-all duration-300 hover:border-[#C9A86A] hover:bg-[#C9A86A]/20 hover:scale-105 cursor-default shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* ২. ডানপাশের লোগো সেকশন (গ্লোয়িং ফ্রেম সহ) */}
        <div className="flex w-full justify-center lg:w-2/5">
          <div className="group relative flex items-center justify-center">
            {/* ব্যাকগ্রাউন্ড অরা সার্কেল অ্যানিমেশন */}
            <div className="absolute inset-0 rounded-3xl bg-linear-to-tr from-cyan-500/20 to-[#C9A86A]/20 opacity-50 blur-2xl transition-all duration-500 group-hover:opacity-80 group-hover:blur-3xl" />

            {/* মেইন ইমেজ কন্টেইনার */}
            <div className="relative aspect-square w-64 sm:w-80 md:w-96 lg:w-105 rounded-3xl border border-white/10 bg-linear-to-b from-white/5 to-transparent p-6 shadow-2xl backdrop-blur-md transition-transform duration-500 group-hover:scale-[1.02]">
              <Image
                src="/images/gt.png"
                alt="Grow Tech Logo"
                fill
                priority
                sizes="(max-width: 768px) 256px, 420px"
                className="object-contain p-4 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] transition-transform duration-500 group-hover:rotate-1"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
