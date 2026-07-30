import { ArrowRight } from "lucide-react";
import Button from "@/components/Button";

export default function CTASection() {
  return (
    <section className="w-full px-5 py-16 sm:px-6 lg:px-10 lg:py-20 xl:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 sm:p-10 lg:p-14">
          {/* Background Glow */}
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-cyan-400/5 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[#C9A86A]/5 blur-3xl" />

          <div className="relative grid items-center gap-12 lg:grid-cols-[1fr_auto]">
            {/* Left */}
            <div className="max-w-3xl">
              <h2 className="cabinet gradient-text text-2xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
                Ready to Build Something Extraordinary?
              </h2>

              <p className="garet mt-6 max-w-2xl text-sm leading-7 text-slate-400 md:text-base">
                Partner with{" "}
                <span className="font-semibold text-white">Grow Tech</span> and
                let our specialized team transform your ideas into
                high-performance digital products through modern technology,
                precision engineering, and innovative thinking.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button
                  href="/contact"
                  variant="primary"
                  className="flex items-center justify-center gap-2"
                >
                  Start a Project
                  <ArrowRight size={18} />
                </Button>

                <Button
                  href="https://wa.me/918800888888"
                  variant="secondary"
                  className="flex items-center justify-center gap-2"
                >
                  Chat on WhatsApp
                  <ArrowRight size={18} />
                </Button>
              </div>
            </div>

            {/* Right Stats */}
            <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
              <div className="text-center">
                <h3 className="cabinet text-4xl font-extrabold text-cyan-400">
                  100%
                </h3>

                <p className="garet mt-2 text-xs uppercase tracking-[0.2em] text-slate-400">
                  Client Satisfaction
                </p>
              </div>

              <div className="text-center">
                <h3 className="cabinet text-4xl font-extrabold text-[#C9A86A]">
                  4
                </h3>

                <p className="garet mt-2 text-xs uppercase tracking-[0.2em] text-slate-400">
                  Specialists
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
