import Image from "next/image";

const tags = ["#Innovation", "#Scalability", "#Excellence", "#Unity"];

export default function OurVisionSection() {
  return (
    <section className="w-full px-5 py-16 sm:px-6 lg:px-10 lg:py-20 xl:px-16">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 lg:flex-row lg:gap-16">
        {/* Left Content */}
        <div className="w-full max-w-xl lg:w-3/5 text-center lg:text-left">
          <span className="golden-tag">OUR VISION</span>

          <h2 className="cabinet mt-3 text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
            <span className="gradient-text">
              Building Modern Solutions for Global Impact
            </span>
          </h2>

          <div className="garet mt-6 space-y-5 text-sm leading-relaxed text-gray-400 sm:text-base md:text-lg">
            <p>
              At <span className="font-semibold text-cyan-400">Grow Tech</span>,
              we believe that great code is the foundation of every successful
              business. Our{" "}
              <span className="font-semibold text-cyan-400">
                core team of specialists
              </span>{" "}
              focuses on creating high-end digital software that doesn&apos;t
              just look good but performs exceptionally in a competitive market.
            </p>

            <p>
              We bridge the gap between imagination and execution. By
              integrating
              <span className="font-semibold text-cyan-400"> Web</span>,
              <span className="font-semibold text-cyan-400"> Mobile</span>,
              <span className="font-semibold text-cyan-400"> Gaming</span>, and
              <span className="font-semibold text-cyan-400">
                {" "}
                Hardware Solutions
              </span>
              , we provide a 360-degree tech ecosystem designed to scale your
              business and deliver technical precision to every project.
            </p>
          </div>

          {/* Tags */}
          <div className="mt-8 flex flex-wrap gap-3">
            {tags.map((tag) => (
              <span
                key={tag}
                className="garet rounded-full border border-[#C9A86A]/40 bg-[#C9A86A]/10 px-4 py-1.5 text-xs font-medium text-[#C9A86A] sm:text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right Image */}
        <div className="flex w-full justify-center lg:w-2/5">
          <div className="relative aspect-square w-65 sm:w-[320px] md:w-95 lg:w-105">
            <Image
              src="/images/gt.png"
              alt="Grow Tech Logo"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
