import { Search, Code2, Layers, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discovery & Strategy",
    description:
      "We dive deep into your business goals, analyzing market trends to define a precise technical roadmap for Grow Tech's execution.",
    icon: Search,
    highlight: "text-cyan-400",
    border: "hover:border-cyan-400/50",
  },
  {
    number: "02",
    title: "Blueprint & Architecture",
    description:
      "Designing a robust digital backbone focusing on scalability, security, and clean code architecture to ensure long-term success.",
    icon: Code2,
    highlight: "text-[#C9A86A]",
    border: "hover:border-[#C9A86A]/50",
  },
  {
    number: "03",
    title: "Development & Engineering",
    description:
      "Our specialized team brings your vision to life using cutting-edge web, mobile, and gaming technologies.",
    icon: Layers,
    highlight: "text-cyan-400",
    border: "hover:border-cyan-400/50",
  },
  {
    number: "04",
    title: "Quality Assurance & Launch",
    description:
      "After rigorous testing, we launch your product with confidence and provide long-term technical support.",
    icon: Rocket,
    highlight: "text-[#C9A86A]",
    border: "hover:border-[#C9A86A]/50",
  },
];

export default function DevelopmentLifecycle() {
  return (
    <section className="relative mx-auto w-full max-w-7xl overflow-hidden px-5 py-16 sm:px-6 lg:px-10 lg:py-20 xl:px-16">
      {/* Header */}
      <div className="mb-20 text-center">
        <span className="golden-tag">HOW WE WORK</span>

        <h2 className="cabinet mt-3 text-3xl font-extrabold sm:text-4xl md:text-5xl">
          <span className="gradient-text">Our Development Lifecycle</span>
        </h2>
      </div>

      <div className="relative">
        {/* Timeline */}
        <div className="absolute left-5 top-0 h-full w-px bg-linear-to-b from-cyan-400/20 via-[#C9A86A]/40 to-cyan-400/20 lg:left-1/2 lg:-translate-x-1/2" />

        <div className="space-y-12">
          {steps.map(
            (
              { number, title, description, icon: Icon, highlight, border },
              index,
            ) => {
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={number}
                  className={`relative flex w-full ${
                    isLeft ? "lg:justify-start" : "lg:justify-end"
                  }`}
                >
                  {/* Timeline Icon */}
                  <div className="absolute left-5 top-8 z-20 -translate-x-1/2 lg:left-1/2">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#C9A86A] bg-[#07111D] text-cyan-400 shadow-[0_0_25px_rgba(201,168,106,0.25)] transition-all duration-300 hover:scale-110 hover:bg-[#C9A86A] hover:text-black">
                      <Icon size={22} />
                    </div>
                  </div>

                  {/* Card */}
                  <article
                    className={`ml-16 w-full rounded-2xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl lg:ml-0 lg:w-[45%] ${border}`}
                  >
                    <span
                      className={`cabinet text-sm font-black tracking-[0.25em] ${highlight}`}
                    >
                      {number}
                    </span>

                    <h3 className="cabinet mt-2 text-2xl font-bold text-white">
                      {title}
                    </h3>

                    <p className="garet mt-4 text-sm leading-7 text-slate-400 md:text-base">
                      {description}
                    </p>
                  </article>
                </div>
              );
            },
          )}
        </div>
      </div>
    </section>
  );
}
