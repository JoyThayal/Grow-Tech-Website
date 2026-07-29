"use client";

import { useState } from "react";
import { ArrowRight, Plus } from "lucide-react";
import Button from "@/components/Button";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "What services does Grow Tech specialize in?",
    answer:
      "Grow Tech is a multi-disciplinary agency. We excel in Full-Stack Web Development, Native & Cross-Platform Mobile Apps, and Immersive Game Development. We also provide dedicated Computer Repairing and Technical Support services.",
  },
  {
    question: "How do you handle project management?",
    answer:
      "We follow an agile development methodology with clear milestones, regular progress updates, and complete transparency using modern collaboration tools.",
  },
  {
    question: "Do you offer hardware and maintenance support?",
    answer:
      "Yes! Our dedicated hardware department handles everything from advanced system diagnostics and component repairs to full IT infrastructure setup.",
  },
  {
    question: "Can you build custom games for brands?",
    answer:
      "Absolutely! We design and develop custom 2D/3D interactive games optimized for mobile, web, and desktop platforms tailored to your brand's vision.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <section className="w-full overflow-hidden px-5 py-16 text-white sm:px-6 lg:px-10 lg:py-20 xl:px-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left */}
        <div className="flex flex-col items-start gap-5 lg:col-span-5">
          <span className="golden-tag">FAQ&apos;S</span>

          <h2 className="cabinet font-extrabold leading-tight tracking-tight">
            <span className="gradient-text text-3xl sm:text-4xl md:text-5xl">
              Frequently Asked
            </span>

            <br />

            <span className="gradient-text text-3xl sm:text-4xl md:text-5xl">
              Questions.
            </span>
          </h2>

          <p className="garet max-w-md text-sm font-light leading-relaxed text-slate-400 md:text-base">
            Can&apos;t find the answer you&apos;re looking for? Reach out to our
            specialized team for a detailed consultation.
          </p>

          <Button
            href="/contact"
            variant="glow"
            className="mt-2 flex items-center gap-2 font-bold"
          >
            Contact Support
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Right */}
        <div className="flex flex-col gap-4 lg:col-span-7">
          {faqs.map(({ question, answer }, index) => {
            const isOpen = openIndex === index;

            return (
              <article
                key={question}
                onClick={() => toggleAccordion(index)}
                className={`cursor-pointer overflow-hidden rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "border-cyan-500/50 bg-white/10 shadow-[0_0_25px_rgba(0,229,255,0.12)]"
                    : "border-white/10 bg-white/5 hover:border-slate-700 hover:bg-white/10"
                }`}
              >
                <div className="flex items-center justify-between gap-4 p-6">
                  <h3
                    className={`cabinet text-lg font-bold transition-colors duration-300 md:text-xl ${
                      isOpen ? "text-cyan-400" : "text-slate-100"
                    }`}
                  >
                    {question}
                  </h3>

                  <Plus
                    className={`h-6 w-6 shrink-0 transition-all duration-300 ${
                      isOpen ? "rotate-45 text-cyan-400" : "text-[#C9A86A]"
                    }`}
                  />
                </div>

                <div
                  className={`grid transition-all duration-300 ${
                    isOpen
                      ? "grid-rows-[1fr] px-6 pb-6 opacity-100"
                      : "grid-rows-[0fr] px-6 pb-0 opacity-0"
                  }`}
                >
                  <div className="overflow-hidden border-t border-white/10 pt-4">
                    <p className="garet text-sm font-light leading-relaxed text-slate-300 md:text-base">
                      {answer}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
