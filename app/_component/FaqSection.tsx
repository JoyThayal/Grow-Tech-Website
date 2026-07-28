"use client";
import { useState } from "react";
import { Plus, ArrowRight } from "lucide-react";
import Button from "@/components/Button";

// FAQ Item-এর টাইপ ডিফাইন করা হলো
interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqSection(): React.ReactNode {
  // openIndex স্টেটটির জন্য number বা null টাইপ দেওয়া হলো
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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

  const toggleAccordion = (index: number): void => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full text-white py-20 px-6 lg:px-16 flex items-center justify-center">
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* ⬅️ Left Side: Heading & Contact Info (5 Columns) */}
        <div className="lg:col-span-5 space-y-3">
          <span className="px-4 py-1.5 rounded-full bg-[#082f49]/60 border border-cyan-500/30 text-cyan-400 text-xs font-semibold tracking-widest uppercase">
            FAQ&apos;S
          </span>

          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight cabinet gradient-text">
            Frequently <span className="text-slate-100">Asked</span> <br />
            <span className="text-slate-100">Questions.</span>
          </h2>

          <p className="text-slate-400 text-sm md:text-base font-light leading-relaxed max-w-md garet">
            Can&apos;t find the answer you&apos;re looking for? Reach out to our
            specialized team for a detailed consultation.
          </p>

          <Button href="/contact" variant="ghost" className="flex items-center gap-2 font-bold">
            Contect Support
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* ➡️ Right Side: Accordion Cards (7 Columns) */}
        <div className="lg:col-span-7 space-y-4">
          {faqs.map((faq: FaqItem, index: number) => {
            const isOpen: boolean = openIndex === index;

            return (
              <div
                key={index}
                className={`rounded-2xl transition-all duration-300 overflow-hidden cursor-pointer ${
                  isOpen
                    ? "bg-[#0b132b]/80 border border-cyan-500/50 shadow-[0_0_20px_rgba(6,182,212,0.15)]"
                    : "bg-[#ffffff08] border border-[#ffffff14] hover:bg-[#ffffff0d] hover:border-[#ffffff1a]"
                }`}
                onClick={() => toggleAccordion(index)}
              >
                {/* Accordion Header */}
                <div className="p-6 flex items-center justify-between gap-4">
                  <h3 className="text-lg md:text-xl font-bold text-slate-100">
                    {faq.question}
                  </h3>

                  {/* Animated Plus Icon (Rotates 45deg to become Cross/Minus) */}
                  <div
                    className={`text-cyan-400 transition-transform duration-300 shrink-0 ${
                      isOpen ? "rotate-45" : "rotate-0"
                    }`}
                  >
                    <Plus className="w-6 h-6" />
                  </div>
                </div>

                {/* Accordion Content Body */}
                <div
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100 pb-6 px-6"
                      : "grid-rows-[0fr] opacity-0 pb-0 px-6"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-slate-400 text-sm md:text-base leading-relaxed font-light garet">
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
