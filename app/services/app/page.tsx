"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Smartphone,
  Layers,
  Database,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Clock,
  Code2,
  ShieldCheck,
  RotateCcw,
  Headphones,
  LayoutGrid,
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";

interface AppPackage {
  id: string;
  name: string;
  category: "all" | "basic" | "business" | "advanced";
  badge?: string;
  popular?: boolean;
  tagline: string;
  price: string;
  deliveryTime: string; // ডেলিভারি সময় স্পষ্টভাবে
  screensCount: string; // অ্যাপ স্ক্রিন সংখ্যা
  revisions: string; // ফ্রি রিভিশন
  freeSupport: string; // হ্যান্ডওভারের পর ফ্রি টেক সাপোর্ট
  icon: typeof Smartphone;
  features: string[];
}

const appPackages: AppPackage[] = [
  {
    id: "basic-app",
    name: "Basic App / MVP",
    category: "basic",
    tagline:
      "A fast, responsive Flutter Android app with offline storage for personal utilities or catalog showcases.",
    price: "₹8,000 – ₹15,000",
    deliveryTime: "5–8 Days Delivery",
    screensCount: "3–5 App Screens",
    revisions: "2 Free Revisions",
    freeSupport: "14 Days Free Support",
    icon: Smartphone,
    features: [
      "Custom Flutter Android App (Clean Architecture)",
      "Fully Responsive UI across all Mobile Sizes",
      "Local Database Integration (Hive / SharedPreferences)",
      "Form Validations, Search & Clean Navigation",
      "State Management with Provider",
      "Production-Ready Signed APK / AAB Handover",
    ],
  },
  {
    id: "business-app",
    name: "Business & Cloud App",
    category: "business",
    badge: "MOST POPULAR",
    popular: true,
    tagline:
      "Full cloud connectivity with user authentication, live database updates, and order/appointment workflows.",
    price: "₹15,000 – ₹30,000",
    deliveryTime: "10–14 Days Delivery",
    screensCount: "5–10+ App Screens",
    revisions: "3 Free Revisions",
    freeSupport: "30 Days Free Support",
    icon: Layers,
    features: [
      "Everything in Basic App, plus Cloud Architecture",
      "Firebase / Supabase User Authentication (Email/Google)",
      "Real-Time Cloud Database & CRUD Data Sync",
      "User Profiles, Dynamic Forms & Image Uploads",
      "Interactive Product Catalog or Booking System",
      "Basic Admin Controls & Data Filtration",
    ],
  },
  {
    id: "advanced-app",
    name: "Advanced Custom Platform",
    category: "advanced",
    badge: "ENTERPRISE",
    tagline:
      "Sophisticated architecture with multiple roles, REST API sync, notifications, and web dashboard integration.",
    price: "₹30,000 – ₹60,000+",
    deliveryTime: "18–25 Days Delivery",
    screensCount: "10–15+ App Screens",
    revisions: "Unlimited during Dev",
    freeSupport: "60 Days Full Support",
    icon: Database,
    features: [
      "Multi-Role System (Admin, Staff, Customer/Client)",
      "RESTful API & External Webhook Integrations",
      "Push Notifications & Automated Trigger Alerts",
      "Advanced Search, Complex Filters & Sorting Logic",
      "Payment Gateway Integration Ready Architecture",
      "Connected Admin Management Dashboard (Optional Add-on)",
    ],
  },
];

export default function AppServicesPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<
    "all" | "basic" | "business" | "advanced"
  >("all");

  const filteredPackages =
    filter === "all"
      ? appPackages
      : appPackages.filter((p) => p.category === filter);

  const handleBooking = async (packageName: string) => {
    const targetUrl = `/booking?service=app&package=${encodeURIComponent(packageName)}`;
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      router.push(`/auth?next=${encodeURIComponent(targetUrl)}`);
    } else {
      router.push(targetUrl);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a1128] text-white py-16 lg:py-24 px-4 sm:px-6 lg:px-12 relative overflow-hidden">
      {/* 🌌 Indigo / Cyan Aurora Background Glow */}
      <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 -z-10 h-96 w-full max-w-5xl rounded-full bg-indigo-500/15 blur-[150px]" />
      <div className="pointer-events-none absolute bottom-20 right-10 -z-10 h-96 w-96 rounded-full bg-cyan-500/10 blur-[150px]" />

      <div className="mx-auto max-w-7xl">
        {/* 🌟 Centered Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
          <span className="golden-tag inline-block">
            AMAN SHAW • APP DEV STUDIO
          </span>

          <h1 className="cabinet text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            <span className="gradient-text">Cross-Platform Flutter Apps.</span>
            <br />
            <span className="text-slate-100 gradient-text">
              Engineered for Scale.
            </span>
          </h1>

          <p className="garet text-slate-400 text-sm sm:text-base md:text-lg leading-relaxed pt-2">
            Native-performance Android and cross-platform apps built with modern
            Flutter architecture, offline-first reliability, and real-time cloud
            backends.
          </p>

          {/* 🏷️ Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {[
              { label: "All Packages", val: "all" },
              { label: "Basic MVP", val: "basic" },
              { label: "Business Cloud", val: "business" },
              { label: "Advanced Tech", val: "advanced" },
            ].map((tab) => (
              <button
                key={tab.val}
                type="button"
                onClick={() => setFilter(tab.val as typeof filter)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  filter === tab.val
                    ? "bg-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]"
                    : "border border-[#1c2d66] bg-[#0c1533]/80 text-slate-400 hover:text-white hover:border-indigo-500/30"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 🚀 3-Column Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {filteredPackages.map((pkg) => {
            const Icon = pkg.icon;

            return (
              <div
                key={pkg.id}
                className={`relative flex flex-col justify-between rounded-3xl p-6 sm:p-7 backdrop-blur-xl transition-all duration-300 ${
                  pkg.popular
                    ? "border-2 border-indigo-400/80 bg-[#0e1838]/95 shadow-[0_0_35px_rgba(99,102,241,0.2)] ring-1 ring-indigo-400/30"
                    : "border border-[#1c2d66] bg-[#0c1533]/70 hover:border-indigo-400/50 hover:bg-[#0e1838]"
                }`}
              >
                {/* Popular / Enterprise Badge */}
                {pkg.badge && (
                  <div
                    className={`absolute -top-3 right-6 flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-md ${
                      pkg.popular
                        ? "bg-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)]"
                        : "border border-[#C9A86A] bg-[#0A1128] text-[#C9A86A]"
                    }`}
                  >
                    <Sparkles className="w-3 h-3" />
                    <span>{pkg.badge}</span>
                  </div>
                )}

                <div>
                  {/* Top: Icon + Title */}
                  <div className="flex items-center gap-3.5 mb-3">
                    <div className="p-3 rounded-2xl bg-[#121f48] border border-[#243982] text-indigo-400 shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="cabinet text-lg sm:text-xl font-bold text-white">
                        {pkg.name}
                      </h3>
                    </div>
                  </div>

                  {/* 🕒 Timeline, Screens & Support Badges */}
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#121f48] border border-[#1c2d66] text-[11px] text-indigo-300 font-mono">
                      <Clock className="w-3.5 h-3.5 text-indigo-400" />
                      {pkg.deliveryTime}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#121f48] border border-[#1c2d66] text-[11px] text-slate-300 font-mono">
                      <LayoutGrid className="w-3.5 h-3.5 text-[#C9A86A]" />
                      {pkg.screensCount}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#121f48] border border-[#1c2d66] text-[11px] text-emerald-300 font-mono">
                      <Headphones className="w-3.5 h-3.5 text-emerald-400" />
                      {pkg.freeSupport}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#121f48] border border-[#1c2d66] text-[11px] text-slate-400 font-mono">
                      <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                      {pkg.revisions}
                    </span>
                  </div>

                  <p className="garet text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                    {pkg.tagline}
                  </p>

                  {/* Pricing Box */}
                  <div className="p-4 rounded-2xl border border-[#1c2d66]/60 bg-[#121f48]/40 mb-6">
                    <span className="cabinet text-2xl sm:text-3xl font-extrabold text-indigo-300">
                      {pkg.price}
                    </span>
                    <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                      40% Advance • 60% on Milestone Delivery
                    </p>
                  </div>

                  {/* Deliverables */}
                  <div className="space-y-2.5 mb-6">
                    <p className="text-[11px] uppercase tracking-wider font-mono text-[#C9A86A] font-semibold mb-2">
                      Package Inclusions:
                    </p>
                    {pkg.features.map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2 text-xs text-slate-300"
                      >
                        <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                        <span className="leading-snug">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA Button & Guarantee */}
                <div className="pt-4 border-t border-[#1c2d66]/60 mt-auto space-y-3">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Includes {pkg.freeSupport} post-handover</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleBooking(pkg.name)}
                    className={`w-full text-xs font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95 shadow-sm ${
                      pkg.popular
                        ? "bg-indigo-500 hover:bg-indigo-400 text-white shadow-[0_0_15px_rgba(99,102,241,0.35)]"
                        : "bg-[#121f48] hover:bg-indigo-600 text-slate-200 hover:text-white border border-[#1c2d66] hover:border-indigo-400"
                    }`}
                  >
                    <span>Book App Package</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* 🛠️ Add-ons Table / Overview Section */}
        <div className="mt-16 rounded-3xl border border-[#1c2d66] bg-[#0c1533]/80 p-6 sm:p-8 backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1c2d66] pb-4 mb-6">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#C9A86A] font-bold">
                MODULAR SCALING
              </span>
              <h3 className="cabinet text-xl font-bold text-white mt-0.5">
                Popular Architecture Add-ons
              </h3>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Customize features without scope creep
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                name: "Extra Custom Screen",
                price: "₹500 – ₹1,500",
                note: "Responsive UI & validation",
              },
              {
                name: "Firebase / Supabase Auth",
                price: "₹1,500 – ₹3,000",
                note: "Google, Phone or Email",
              },
              {
                name: "REST API Integration",
                price: "₹2,000 – ₹6,000",
                note: "Third-party backend hooks",
              },
              {
                name: "Push Notifications",
                price: "₹1,500 – ₹4,000",
                note: "FCM triggered messaging",
              },
              {
                name: "Payment Gateway",
                price: "₹3,000 – ₹8,000",
                note: "Razorpay / Cashfree setup",
              },
              {
                name: "Play Store Release Service",
                price: "₹1,000 – ₹3,000",
                note: "App signing & console setup*",
              },
              {
                name: "Admin Web Panel",
                price: "₹5,000 – ₹15,000+",
                note: "Next.js data dashboard",
              },
              {
                name: "Monthly Maintenance",
                price: "₹1,500 – ₹5,000/mo",
                note: "Bug scrub & dependency updates",
              },
            ].map((addon, index) => (
              <div
                key={index}
                className="p-4 rounded-2xl bg-[#0a1128] border border-[#1c2d66]/80 flex flex-col justify-between"
              >
                <div>
                  <h4 className="text-xs font-bold text-white">{addon.name}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                    {addon.note}
                  </p>
                </div>
                <div className="pt-3 mt-2 border-t border-[#1c2d66]/40">
                  <span className="cabinet text-sm font-extrabold text-indigo-400">
                    {addon.price}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <p className="text-[11px] text-slate-500 font-mono mt-4 text-center">
            *Google Play Console account fee ($25 one-time) or third-party
            server costs are payable directly by the client.
          </p>
        </div>

        {/* 📱 Custom Architecture Banner */}
        <div className="mt-12 rounded-3xl border border-indigo-500/30 bg-linear-to-r from-indigo-950/30 via-[#0c1533]/70 to-[#0c1533]/80 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-xl">
          <div className="text-center md:text-left space-y-2">
            <h3 className="cabinet text-xl sm:text-2xl font-bold text-white flex items-center justify-center md:justify-start gap-2">
              <Code2 className="w-5 h-5 text-indigo-400" /> Have Custom
              Enterprise App Specs?
            </h3>
            <p className="garet text-sm text-slate-400 max-w-xl">
              Need multi-tenant architecture, offline synchronization, or
              proprietary enterprise tools? Let&apos;s analyze your tech
              requirements and build an exact quote.
            </p>
          </div>

          <a
            href="https://wa.me/+918902709631?text=Hi%20Grow%20Tech,%20I%20want%20to%20discuss%20a%20custom%20Flutter%20mobile%20app%20project."
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-6 py-3.5 rounded-xl bg-indigo-500 text-white font-bold text-xs uppercase tracking-wider hover:bg-indigo-400 transition-all shadow-[0_0_20px_rgba(99,102,241,0.35)] flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <span>Discuss App Architecture</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </main>
  );
}
