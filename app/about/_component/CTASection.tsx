import React from "react";
import { ArrowRight } from "lucide-react";
import Button from "@/components/Button";

const CTASection = () => {
  return (
    <section className="w-full px-15 py-16">
      {/* Inner CTA Card */}
      <div className="bg-[#ffffff08] border border-[#ffffff14] rounded-3xl p-10 md:p-14 flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Left Content Area */}
        <div className="max-w-2xl">
          {/* Main Title */}
          <h2 className="cabinet gradient-text text-4xl font-bold tracking-tight mb-4 leading-tight">
            Ready to build something Extraordinary?
          </h2>

          {/* Subtitle / Description */}
          <p className="garet text-slate-400 text-base leading-relaxed mb-8">
            Partner with <span className="font-bold text-white">Grow Tech</span>{" "}
            today and let our specialized team transform your vision into a
            high-performance digital reality with technical precision and modern
            innovation.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Primary Golden Button */}
            <Button href="/contact" variant="primary">
              Start a Project
              <ArrowRight size={16} />
            </Button>

            {/* Secondary WhatsApp Button */}
            <Button
              href="https://wa.me/918800888888"
              variant="secondary"
              className="flex items-center gap-2"
            >
              Chat on WhatsApp
              <ArrowRight size={16} />
            </Button>
          </div>
        </div>

        {/* Right Stats Area */}
        <div className="flex items-center gap-12 lg:gap-16 border-t lg:border-t-0 lg:border-l border-slate-800 pt-8 lg:pt-0 lg:pl-12 w-full lg:w-auto justify-start lg:justify-end">
          {/* Stat 1 */}
          <div className="text-center lg:text-left">
            <h3 className="cabinet text-4xl font-extrabold text-[#00E5FF] mb-2 text-center">
              100%
            </h3>
            <p className="garet text-xs text-slate-400 tracking-wide uppercase">
              Client Satisfaction
            </p>
          </div>

          {/* Stat 2 */}
          <div className="text-center lg:text-left">
            <h3 className="cabinet text-4xl font-extrabold text-[#c9a86a] mb-2 text-center">
              4
            </h3>
            <p className="garet text-xs text-slate-400 tracking-wide uppercase">
              Specialized Experts
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
