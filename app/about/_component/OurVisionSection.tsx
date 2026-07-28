import React from "react";
import Image from "next/image";

export default function OurVisionSection() {
  const tags = ["#Innovation", "#Scalability", "#Excellence", "#Unity"];

  return (
    <section className="w-full py-16 px-15 md:px-12 flex flex-col md:flex-row items-center justify-between gap-12">
      {/* বামদিকের টেক্সট কন্টেন্ট */}
      <div className="w-full md:w-3/5 space-y-6 text-left">
        {/* গোল্ডেন ট্যাগ (তোমার .golden-tag ক্লাস) */}
        <p className="golden-tag text-xs tracking-widest uppercase">
          OUR VISION
        </p>

        {/* হেডিং */}
        <h2 className="cabinet gradient-text text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
          Building Modern Solutions for Global Impact
        </h2>

        {/* প্যারাগ্রাফ ১ */}
        <p className="garet text-sm md:text-base leading-relaxed text-gray-400">
          At <span className="text-[#00f2fe] font-semibold">Grow Tech</span>, we
          believe that great code is the foundation of every successful
          business. Our{" "}
          <span className="text-[#00f2fe] font-semibold">
            core team of specialists
          </span>{" "}
          focuses on creating high-end digital software that don&apos;t just look
          good but perform exceptionally in a competitive market.
        </p>

        {/* প্যারাগ্রাফ ২ */}
        <p className="garet text-sm md:text-base leading-relaxed text-gray-400">
          We bridge the gap between imagination and execution. By integrating{" "}
          <span className="text-[#00f2fe] font-semibold">Web</span>,{" "}
          <span className="text-[#00f2fe] font-semibold">Mobile</span>,{" "}
          <span className="text-[#00f2fe] font-semibold">Gaming</span>, and{" "}
          <span className="text-[#00f2fe] font-semibold">
            Hardware solutions
          </span>
          , we provide a 360-degree tech ecosystem designed to scale your
          business and bring technical precision to every project.
        </p>

        {/* পিলস / হ্যাশট্যাগ (Pill Buttons) */}
        <div className="flex flex-wrap gap-3 pt-4">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="garet text-xs md:text-sm px-4 py-1.5 rounded-full border border-[#c9a86a]/40 bg-[#c9a86a]/10 text-[#c9a86a] font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* ডানদিকের GT লোগো ইমেজ */}
      <div className="w-full md:w-2/5 flex justify-center items-center">
        <div className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px]">
          <Image
            src="/images/gt.png"
            alt="Grow Tech Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}
