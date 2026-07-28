import React from "react";
import { Search, Code2, Layers, Rocket } from "lucide-react";

export default function DevelopmentLifecycle() {
  const steps = [
    {
      number: "01",
      title: "Discovery & Strategy",
      description:
        "We dive deep into your business goals, analyzing market trends to define a precise technical roadmap for Grow Tech's execution.",
      icon: Search,
      align: "left",
      highlightColor: "text-[#00f2fe]",
      glowColor: "shadow-[0_0_25px_rgba(0,242,254,0.15)]",
      borderColor: "hover:border-[#00f2fe]/50",
    },
    {
      number: "02",
      title: "Blueprint & Architecture",
      description:
        "Designing a robust digital backbone focusing on scalability, security, and clean code architecture to ensure long-term success.",
      icon: Code2,
      align: "right",
      highlightColor: "text-[#c9a86a]",
      glowColor: "shadow-[0_0_25px_rgba(201,168,106,0.15)]",
      borderColor: "hover:border-[#c9a86a]/50",
    },
    {
      number: "03",
      title: "Development & Engineering",
      description:
        "Our specialized team—led by Joy, Aman, and Bijoy—brings your vision to life using cutting-edge web, mobile, and gaming tech stacks.",
      icon: Layers,
      align: "left",
      highlightColor: "text-[#00f2fe]",
      glowColor: "shadow-[0_0_25px_rgba(0,242,254,0.15)]",
      borderColor: "hover:border-[#00f2fe]/50",
    },
    {
      number: "04",
      title: "Quality Assurance & Launch",
      description:
        "After rigorous testing, we launch your product globally. Post-launch, Biprajit's team ensures 24/7 technical stability and support.",
      icon: Rocket,
      align: "right",
      highlightColor: "text-[#c9a86a]",
      glowColor: "shadow-[0_0_25px_rgba(201,168,106,0.15)]",
      borderColor: "hover:border-[#c9a86a]/50",
    },
  ];

  return (
    <section className="w-full py-20 px-6 max-w-6xl mx-auto relative overflow-hidden">
      {/* হেডার অংশ */}
      <div className="text-center space-y-3 mb-20 relative z-10">
        <p className="golden-tag">
          HOW WE WORK
        </p>
        <h2 className="cabinet gradient-text text-4xl md:text-4xl font-extrabold tracking-tight">
          Our Development Lifecycle
        </h2>
      </div>

      {/* টাইমলাইন কন্টেইনার */}
      <div className="relative z-10">
        {/* সেন্ট্রাল লাইন (গ্লোইং লাইন) */}
        <div className="absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-0.5 bg-linear-to-b from-[#00f2fe]/20 via-[#c9a86a]/40 to-[#00f2fe]/20" />

        {/* টাইমলাইন আইটেমসমূহ */}
        <div className="space-y-12">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            const isLeft = step.align === "left";

            return (
              <div key={index} className="flex items-center w-full relative">
                {/* বামদিকের কার্ড (যদি align left হয়) */}
                <div className="w-1/2 pr-12 text-right flex justify-end">
                  {isLeft && (
                    <div
                      className={`w-full max-w-md bg-[#ffffff08] border border-[#ffffff14] rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1 ${step.borderColor}`}
                    >
                      <h3
                        className={`cabinet text-xl font-extrabold mb-2 tracking-wide ${step.highlightColor}`}
                      >
                        {step.number}. {step.title}
                      </h3>
                      <p className="garet text-sm text-gray-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  )}
                </div>

                {/* মাঝের আইকন সার্কেল (গ্লো সহ) */}
                <div className="absolute left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#0a1128] border-2 border-[#c9a86a] flex items-center justify-center text-[#00f2fe] shadow-[0_0_15px_rgba(201,168,106,0.3)] transition-transform duration-300 hover:bg-[#c9a86a] hover:text-black">
                    <IconComponent size={20} strokeWidth={1.8} />
                  </div>
                </div>

                {/* ডানদিকের কার্ড (যদি align right হয়) */}
                <div className="w-1/2 pl-12 text-left flex justify-start">
                  {!isLeft && (
                    <div
                      className={`w-full max-w-md bg-[#ffffff08] border border-[#ffffff14] rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1 ${step.borderColor}`}
                    >
                      <h3
                        className={`cabinet text-xl font-extrabold mb-2 tracking-wide ${step.highlightColor}`}
                      >
                        {step.number}. {step.title}
                      </h3>
                      <p className="garet text-sm text-gray-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
