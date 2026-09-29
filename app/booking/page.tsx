"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Send,
  ShieldCheck,
  Clock,
  Sparkles,
  Globe,
  Smartphone,
  Gamepad2,
  ArrowRight,
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { useToast } from "@/components/ui/Toast";
import type { User } from "@supabase/supabase-js";

function BookingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showToast } = useToast();

  const [user, setUser] = useState<User | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // URL থেকে আসা সার্ভিস ও প্যাকেজ
  const packageName = searchParams.get("package") || "";
  const rawService = (searchParams.get("service") || "web").toLowerCase();

  // 🧭 ডাইনামিক সার্ভিস মেটাডাটা নির্ধারণ
  const serviceMeta = {
    web: {
      name: "Web Development",
      icon: Globe,
      color: "text-cyan-400",
      bg: "bg-cyan-500/10",
      border: "border-cyan-500/30",
    },
    app: {
      name: "Mobile App Development",
      icon: Smartphone,
      color: "text-indigo-400",
      bg: "bg-indigo-500/10",
      border: "border-indigo-500/30",
    },
    game: {
      name: "Game Development",
      icon: Gamepad2,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      border: "border-purple-500/30",
    },
  }[
    rawService.includes("game")
      ? "game"
      : rawService.includes("app")
        ? "app"
        : "web"
  ];

  const ServiceIcon = serviceMeta.icon;

  // ফর্মের ডেটা
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session?.user) {
        const currentUrl = `/booking?${searchParams.toString()}`;
        router.push(`/auth?next=${encodeURIComponent(currentUrl)}`);
        return;
      }

      const currentUser = session.user;
      setUser(currentUser);
      setClientName(
        currentUser.user_metadata?.full_name ||
          currentUser.email?.split("@")[0] ||
          "",
      );
      setClientEmail(currentUser.email || "");
      setCheckingAuth(false);
    });
  }, [router, searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      router.push("/auth?next=/booking");
      return;
    }

    if (!phone || phone.trim().length < 10) {
      showToast(
        "Phone Number Required",
        "Please enter a valid WhatsApp contact number.",
        "error",
      );
      return;
    }

    setSubmitting(true);

    try {
      const { error } = await supabase.from("client_bookings").insert([
        {
          user_id: user.id,
          client_name: clientName.trim(),
          client_phone: phone.trim(),
          service_type: serviceMeta.name,
          package_name: packageName,
          price: "Selected Package",
          project_notes: notes.trim() || null,
          status: "pending",
        },
      ]);

      if (error) throw error;

      showToast(
        "Booking Registered!",
        "Redirecting to WhatsApp for confirmation... 🚀",
        "success",
      );

      const waMsg =
        `*New Booking Request - Grow Tech*\n\n` +
        `👤 *Name:* ${clientName.trim()}\n` +
        `📧 *Email:* ${clientEmail.trim()}\n` +
        `📞 *WhatsApp:* ${phone.trim()}\n` +
        `🛠️ *Service Type:* ${serviceMeta.name}\n` +
        `📦 *Selected Package:* ${packageName}\n` +
        (notes ? `📝 *Requirements:* ${notes.trim()}\n\n` : `\n`) +
        `Hi Grow Tech, I have confirmed my booking on the website. Let's discuss the project! 🙌`;

      setTimeout(() => {
        window.open(
          `https://wa.me/+918902709631?text=${encodeURIComponent(waMsg)}`,
          "_blank",
        );
        router.push("/profile/orders");
      }, 700);
    } catch (err: unknown) {
      const errMsg =
        err instanceof Error ? err.message : "Failed to register booking.";
      showToast("Error", errMsg, "error");
    } finally {
      setSubmitting(false);
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-7 h-7 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* 🔙 ব্যাক লিঙ্ক */}
      <div className="flex items-center justify-between">
        <Link
          href={rawService === "game" ? "/services/game" : "/services"}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Change Package</span>
        </Link>
        <span className="golden-tag">GROW TECH CHECKOUT</span>
      </div>

      {/* 📦 সিলেক্ট করা প্যাকেজের ব্যানার (সার্ভিস আইডেন্টিটি সহ) */}
      <div className="rounded-2xl border border-cyan-500/40 bg-linear-to-br from-[#0e1838] to-[#0c1533] p-5 sm:p-6 backdrop-blur-xl">
        <div className="flex items-center justify-between gap-3 mb-2">
          {/* সার্ভিস ক্যাটাগরি ব্যাজ */}
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider ${serviceMeta.bg} ${serviceMeta.border} ${serviceMeta.color} border`}
          >
            <ServiceIcon className="w-3.5 h-3.5" />
            {serviceMeta.name}
          </span>

          <span className="text-[10px] font-mono text-[#C9A86A] flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Active Plan
          </span>
        </div>

        <h2 className="cabinet text-xl sm:text-2xl font-extrabold text-white mt-1">
          {packageName}
        </h2>

        <div className="flex items-center gap-2 text-xs text-slate-400 font-mono pt-1.5">
          <Clock className="w-3.5 h-3.5 text-cyan-400" />
          <span>40% Advance • 60% on Final Delivery</span>
        </div>
      </div>

      {/* 📝 ছোট ও ক্লিন বুকিং ফর্ম */}
      <form
        onSubmit={handleSubmit}
        className="rounded-3xl border border-[#1c2d66] bg-[#0e1838]/80 p-6 sm:p-8 backdrop-blur-xl space-y-5 shadow-2xl"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
              Your Name *
            </label>
            <input
              type="text"
              required
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#0a1128] border border-[#1c2d66] text-white text-xs focus:outline-none focus:border-cyan-400 transition-all font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
              Email Address *
            </label>
            <input
              type="email"
              required
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#0a1128] border border-[#1c2d66] text-white text-xs focus:outline-none focus:border-cyan-400 transition-all font-mono"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
            WhatsApp Number *
          </label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91 89027 09631"
            className="w-full px-4 py-2.5 rounded-xl bg-[#0a1128] border border-[#1c2d66] text-white text-xs focus:outline-none focus:border-cyan-400 transition-all font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
            Project Notes / Details (Optional)
          </label>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Tell us about your requirements or reference designs..."
            className="w-full px-4 py-2.5 rounded-xl bg-[#0a1128] border border-[#1c2d66] text-white text-xs focus:outline-none focus:border-cyan-400 transition-all resize-none"
          />
        </div>

        <div className="p-3 rounded-xl bg-[#0a1128]/70 border border-[#1c2d66] flex items-center gap-2.5">
          <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
          <p className="text-[11px] text-slate-400">
            Milestone progress tracking & 100% source code handover guaranteed.
          </p>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-cyan-300 transition-all shadow-[0_0_15px_rgba(0,229,255,0.3)] disabled:opacity-50 cursor-pointer"
        >
          {submitting ? (
            <span>Saving Order...</span>
          ) : (
            <>
              <span>Confirm & Connect on WhatsApp</span>
              <Send className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </form>

      {/* 🚀 পপআপ: সরাসরি এলে ৩টি সার্ভিসের পেজে যাওয়ার অপশন */}
      {!packageName && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md rounded-3xl border border-[#1c2d66] bg-[#0c1533] p-6 sm:p-7 shadow-2xl space-y-5 text-center">
            <div className="space-y-1">
              <span className="golden-tag">CHOOSE A SERVICE</span>
              <h3 className="cabinet text-xl font-bold text-white pt-1">
                Select What You Need First
              </h3>
              <p className="text-xs text-slate-400">
                Please pick a service category to explore plans and complete
                booking:
              </p>
            </div>

            {/* ৩টি সার্ভিসের সঠিক লিংক */}
            <div className="space-y-2.5 pt-2">
              <Link
                href="/services"
                className="flex items-center justify-between p-3.5 rounded-xl border border-[#1c2d66] bg-[#0e1838] hover:border-cyan-400 hover:bg-[#121f48] text-white transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                    <Globe className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold">Web Development</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
              </Link>

              <Link
                href="/portfolio/app"
                className="flex items-center justify-between p-3.5 rounded-xl border border-[#1c2d66] bg-[#0e1838] hover:border-indigo-400 hover:bg-[#121f48] text-white transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold">
                    Mobile App Development
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-indigo-400 group-hover:translate-x-1 transition-all" />
              </Link>

              <Link
                href="/services/game"
                className="flex items-center justify-between p-3.5 rounded-xl border border-[#1c2d66] bg-[#0e1838] hover:border-purple-400 hover:bg-[#121f48] text-white transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                    <Gamepad2 className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold">Game Development</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BookingPage() {
  return (
    <main className="min-h-screen bg-[#0a1128] text-white py-12 px-4 sm:px-6 relative overflow-hidden">
      <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 -z-10 h-80 w-full max-w-2xl rounded-full bg-cyan-500/10 blur-[130px]" />
      <Suspense
        fallback={
          <div className="min-h-[50vh] flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
          </div>
        }
      >
        <BookingForm />
      </Suspense>
    </main>
  );
}
