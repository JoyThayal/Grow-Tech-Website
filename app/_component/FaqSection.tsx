"use client";

import React, { useState } from "react";
import { Plus, ArrowRight } from "lucide-react";
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

export default function FaqSection(): React.ReactNode {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number): void => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full text-white py-20 px-6 lg:px-15 flex items-center justify-center overflow-hidden">
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* ⬅️ Left Side: Heading & Contact Info (5 Columns) */}
        <div className="lg:col-span-5 flex flex-col items-start gap-5">
          <span className="golden-tag">FAQ&apos;S</span>

          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight cabinet">
            <span className="gradient-text">Frequently Asked</span>
            <span className="gradient-text">Questions.</span>
          </h2>

          <p className="text-slate-400 text-sm md:text-base font-light leading-relaxed max-w-md garet">
            Can&apos;t find the answer you&apos;re looking for? Reach out to our
            specialized team for a detailed consultation.
          </p>

          <div className="pt-2">
            <Button
              href="/contact"
              variant="glow"
              className="flex items-center gap-2 font-bold"
            >
              Contact Support
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* ➡️ Right Side: Accordion Cards (7 Columns) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {faqs.map((faq: FaqItem, index: number) => {
            const isOpen: boolean = openIndex === index;

            return (
              <div
                key={index}
                className={`rounded-2xl transition-all duration-300 overflow-hidden cursor-pointer border ${
                  isOpen
                    ? "bg-[#ffffff0c] border-cyan-500/50 shadow-[0_0_25px_rgba(0,229,255,0.12)]"
                    : "bg-[#ffffff08] border-[#ffffff14] hover:bg-[#ffffff0d] hover:border-slate-700"
                }`}
                onClick={() => toggleAccordion(index)}
              >
                {/* Accordion Header */}
                <div className="p-6 flex items-center justify-between gap-4">
                  <h3
                    className={`text-lg md:text-xl font-bold transition-colors duration-300 cabinet ${
                      isOpen ? "text-cyan-400" : "text-slate-100"
                    }`}
                  >
                    {faq.question}
                  </h3>

                  {/* Animated Plus Icon */}
                  <div
                    className={`transition-all duration-300 ease-in-out shrink-0 ${
                      isOpen
                        ? "rotate-45 text-cyan-400"
                        : "rotate-0 text-[#c9a86a]"
                    }`}
                  >
                    <Plus className="w-6 h-6" />
                  </div>
                </div>

                {/* Accordion Content Body (CSS Grid Animation) */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100 pb-6 px-6"
                      : "grid-rows-[0fr] opacity-0 pb-0 px-6"
                  }`}
                >
                  <div className="overflow-hidden border-t border-[#ffffff14] pt-4">
                    <p className="text-slate-300 text-sm md:text-base leading-relaxed font-light garet">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
