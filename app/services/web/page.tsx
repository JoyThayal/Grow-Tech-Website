"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Check,
  Globe,
  Layers,
  Database,
  RefreshCw,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Clock,
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";

interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  popular?: boolean;
  category: "starter" | "growth" | "enterprise";
  tagline: string;
  price: string;
  delivery: string;
  revisions: string;
  renewal: string;
  icon: typeof Globe;
  features: string[];
  ctaText: string;
}

const plans: PricingPlan[] = [
  {
    id: "single-page",
    name: "1-Page Business Website",
    category: "starter",
    tagline:
      "A clean, modern single-page website to launch your business online and get direct WhatsApp leads.",
    price: "₹4,999",
    delivery: "3–5 Days",
    revisions: "2 Free Revision Rounds",
    renewal: "₹2,000 / year (Domain & Maintenance)",
    icon: Globe,
    features: [
      "Custom 1-Page Design for Your Business",
      "100% Mobile & Tablet Responsive",
      "Free 1 Year Domain (.com or .in)",
      "Direct One-Tap WhatsApp Button",
      "Google Maps Location Setup",
      "Services, Products & Price List",
      "Ultra-Fast Loading Speed",
      "Simple Process — Handled on WhatsApp",
    ],
    ctaText: "Get 1-Page Website",
  },
  {
    id: "multi-page",
    name: "Complete Multi-Page Website",
    badge: "MOST POPULAR",
    popular: true,
    category: "growth",
    tagline:
      "A full 4–5 page website to showcase your brand, rank higher on Google, and win customer trust.",
    price: "₹9,999",
    delivery: "6–8 Days",
    revisions: "3 Rounds + 14 Days Tech Support",
    renewal: "₹2,500 / year (Domain, Hosting & Care)",
    icon: Layers,
    features: [
      "Full 4 to 5 Pages (Home, About, Services, Gallery, Contact)",
      "Built with Next.js for Instant Speed",
      "Local Google SEO (Findable in Your City)",
      "Direct Email Contact & Inquiry Forms",
      "Instant WhatsApp Chat & Call Buttons",
      "Google Maps & Social Media Links",
      "Visitor Analytics to Track Traffic",
      "Clean, Premium & Modern Look",
    ],
    ctaText: "Get Complete Website",
  },
  {
    id: "dynamic-portal",
    name: "Custom Web App & Portal",
    badge: "ADVANCED TECH",
    category: "enterprise",
    tagline:
      "For businesses that need customer logins, private data management, or an online dashboard.",
    price: "₹18,999",
    delivery: "12–15 Days",
    revisions: "30 Days Full Technical Support",
    renewal: "Custom Annual Cloud Maintenance",
    icon: Database,
    features: [
      "Custom Built Web Application",
      "Customer Login & Sign Up (Google/Email)",
      "Secure Cloud Database Storage",
      "Upload & Store Photos or Documents",
      "Private Admin Control Dashboard",
      "Enterprise Data Protection & Backups",
      "Automated WhatsApp & Email Alerts",
      "Tailored Exactly to Your Workflow",
    ],
    ctaText: "Build Custom Portal",
  },
  {
    id: "redesign-upgrade",
    name: "Old Website Redesign & Speed Up",
    category: "growth",
    tagline:
      "Give your slow or outdated website a modern, fast, and mobile-friendly new look.",
    price: "₹5,999",
    delivery: "4–6 Days",
    revisions: "2 Rounds Pre-Launch + 7 Days Monitoring",
    renewal: "Retains your existing domain authority",
    icon: RefreshCw,
    features: [
      "100% Fresh & Modern New Design",
      "Smooth on All Phones & Tablets",
      "Speed Boost with Next.js Technology",
      "Safe Transfer — Zero Data or Content Lost",
      "SEO Upgrade to Improve Google Rank",
      "Direct WhatsApp & Click-to-Call Added",
      "Fix All Broken Links & Bugs",
      "Keep Your Existing Domain & Links",
    ],
    ctaText: "Redesign My Website",
  },
];

export default function ServicesPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<
    "all" | "starter" | "growth" | "enterprise"
  >("all");

  const filteredPlans =
    filter === "all" ? plans : plans.filter((p) => p.category === filter);

  // 🛡️ বুলেটপ্রুফ রিডাইরেক্ট হ্যান্ডলার: বাটন ক্লিক করার মুহূর্তে সরাসরি Supabase সেশন পড়বে
  const handleBookingRedirect = async (packageName: string) => {
    const targetUrl = `/booking?service=web&package=${encodeURIComponent(packageName)}`;

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      // সত্যি সত্যি লগইন না থাকলেই কেবল লগইন পেজে পাঠাবে
      router.push(`/auth?next=${encodeURIComponent(targetUrl)}`);
    } else {
      // লগইন থাকলে সরাসরি বুকিং পেজে যাবে
      router.push(targetUrl);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a1128] text-white py-16 lg:py-24 px-4 sm:px-6 lg:px-12 relative overflow-hidden">
      {/* 🌌 Background Atmosphere Glows */}
      <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 -z-10 h-96 w-full max-w-5xl rounded-full bg-cyan-500/10 blur-[150px]" />
      <div className="pointer-events-none absolute bottom-20 right-10 -z-10 h-96 w-96 rounded-full bg-[#C9A86A]/10 blur-[150px]" />

      <div className="mx-auto max-w-6xl">
        {/* 🌟 Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
          <span className="golden-tag inline-block">
            CLEAR & TRANSPARENT PRICING
          </span>

          <h1 className="cabinet text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            <span className="gradient-text">Packages Built for Growth.</span>
            <br />
            <span className="text-slate-100 gradient-text">
              Zero Hidden Costs.
            </span>
          </h1>

          <p className="garet text-slate-400 text-sm sm:text-base md:text-lg leading-relaxed pt-2">
            Every business has different requirements. Choose a tailored package
            engineered with modern technology to scale your digital presence.
          </p>

          {/* 🏷️ Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {[
              { label: "All Packages", val: "all" },
              { label: "1-Page Websites", val: "starter" },
              { label: "Full Websites", val: "growth" },
              { label: "Custom Portals", val: "enterprise" },
            ].map((tab) => (
              <button
                key={tab.val}
                type="button"
                onClick={() => setFilter(tab.val as typeof filter)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  filter === tab.val
                    ? "bg-cyan-400 text-slate-950 shadow-[0_0_15px_rgba(0,229,255,0.4)]"
                    : "border border-[#1c2d66] bg-[#0c1533]/80 text-slate-400 hover:text-white hover:border-cyan-500/30"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 🚀 2x2 Balanced Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {filteredPlans.map((plan) => {
            const Icon = plan.icon;

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col justify-between rounded-3xl p-6 sm:p-8 backdrop-blur-xl transition-all duration-300 ${
                  plan.popular
                    ? "border-2 border-cyan-400 bg-[#0e1838]/90 shadow-[0_0_35px_rgba(0,229,255,0.15)] ring-1 ring-cyan-400/30"
                    : "border border-[#1c2d66] bg-[#0c1533]/70 hover:border-cyan-500/40 hover:bg-[#0e1838]"
                }`}
              >
                {/* Popular Badge */}
                {plan.badge && (
                  <div
                    className={`absolute -top-3 right-6 flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-md ${
                      plan.popular
                        ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow-[0_0_12px_rgba(0,229,255,0.3)]"
                        : "border border-[#C9A86A] bg-[#0A1128] text-[#C9A86A]"
                    }`}
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>{plan.badge}</span>
                  </div>
                )}

                <div>
                  {/* Top Bar: Icon + Title + Timeline */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3.5">
                      <div className="p-3 rounded-2xl bg-[#121f48] border border-[#243982] text-cyan-400 shrink-0">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="cabinet text-xl sm:text-2xl font-bold text-slate-100">
                          {plan.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400 font-mono">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-[#C9A86A]" />
                            {plan.delivery}
                          </span>
                          <span>•</span>
                          <span>{plan.revisions}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="garet text-xs sm:text-sm text-slate-400 leading-relaxed mb-6">
                    {plan.tagline}
                  </p>

                  {/* Price Banner */}
                  <div className="p-4 rounded-2xl border border-[#1c2d66]/60 bg-[#121f48]/40 mb-6 flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="cabinet text-3xl font-extrabold text-cyan-400">
                          {plan.price}
                        </span>
                        <span className="text-xs text-slate-400">
                          / project
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        40% Advance • 60% on Delivery
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] uppercase font-mono tracking-wider text-[#C9A86A] block">
                        Annual Renewal
                      </span>
                      <span className="text-xs text-slate-300 font-medium">
                        {plan.renewal.split(" (")[0]}
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <p className="text-[11px] uppercase tracking-wider font-mono text-[#C9A86A] font-semibold mb-3">
                      Package Features & Deliverables:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {plan.features.map((feature, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2 text-xs text-slate-300"
                        >
                          <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                          <span className="leading-snug">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom CTA Row */}
                <div className="pt-5 border-t border-[#1c2d66]/60 flex flex-col sm:flex-row items-center justify-between gap-4 mt-auto">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                    <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>Free ongoing maintenance support</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleBookingRedirect(plan.name)}
                    className={`w-full sm:w-auto text-xs font-bold px-6 py-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 ${
                      plan.popular
                        ? "bg-cyan-400 text-slate-950 shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:bg-cyan-300"
                        : "border border-[#1c2d66] bg-[#121f48]/70 hover:bg-[#1a2c66] text-white hover:border-cyan-400/40"
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* 🤝 Custom Project Banner */}
        <div className="mt-16 rounded-3xl border border-[#1c2d66] bg-[#0c1533]/60 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-xl">
          <div className="text-center md:text-left space-y-2">
            <h3 className="cabinet text-xl sm:text-2xl font-bold text-white">
              Have a Specific Custom Tech Requirement?
            </h3>
            <p className="garet text-sm text-slate-400 max-w-xl">
              From dedicated mobile apps to 2D/3D browser games and SaaS
              dashboards—we engineer custom solutions aligned with your exact
              roadmap.
            </p>
          </div>

          <button
            type="button"
            onClick={() => handleBookingRedirect("Custom Tech Scope")}
            className="shrink-0 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-all shadow-[0_0_20px_rgba(0,229,255,0.3)] flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <span>Request Custom Booking</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </main>
  );
}
