"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Globe, Smartphone, Gamepad2, Send, ShieldCheck } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { useToast } from "@/components/ui/Toast";
import ServiceSelectModal from "@/components/ui/ServiceSelectModal";
import BookingHeader from "@/app/booking/BookingHeader";
import BookingSuccessModal from "@/app/booking/BookingSuccessModal";
import BookingInputField from "@/app/booking/BookingInputField";
import type { User } from "@supabase/supabase-js";

function BookingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showToast } = useToast();

  const [user, setUser] = useState<User | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  const packageName = searchParams.get("package") || "";
  const rawService = (searchParams.get("service") || "web").toLowerCase();

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

  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [touched, setTouched] = useState({
    name: true,
    email: true,
    phone: false,
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session?.user) {
        router.push(
          `/auth?next=${encodeURIComponent(`/booking?${searchParams.toString()}`)}`,
        );
        return;
      }
      const currentUser = session.user;
      setUser(currentUser);

      const initialName =
        currentUser.user_metadata?.full_name ||
        currentUser.email?.split("@")[0] ||
        "";
      const initialEmail = currentUser.email || "";

      setClientName(initialName);
      setClientEmail(initialEmail);

      setTouched((prev) => ({
        ...prev,
        name: Boolean(initialName.trim().length >= 2),
        email: Boolean(initialEmail.trim().length > 0),
      }));

      setCheckingAuth(false);
    });
  }, [router, searchParams]);

  const indianPhoneRegex = /^[6-9]\d{9}$/;

  const errors = {
    name: clientName.trim().length === 0 ? "Name is missing" : "",
    email: clientEmail.trim().length === 0 ? "Email is missing" : "",
    phone:
      phone.length === 0
        ? "Phone number is required"
        : !indianPhoneRegex.test(phone)
          ? "10 digits starting 6-9"
          : "",
  };

  const isFormValid =
    !errors.name &&
    !errors.email &&
    !errors.phone &&
    clientName.trim().length > 0 &&
    clientEmail.trim().length > 0 &&
    phone.trim().length === 10;

  const handleBlur = (field: "phone") =>
    setTouched((prev) => ({ ...prev, [field]: true }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, phone: true });
    if (!isFormValid || !user) return;

    setSubmitting(true);
    try {
      // 🛠️ client_email যোগ করা হয়েছে যাতে Supabase-এ কার বুকিং স্পষ্ট রেকর্ড থাকে
      const { error } = await supabase.from("client_bookings").insert([
        {
          user_id: user.id,
          client_name: clientName.trim(),
          client_email: clientEmail.trim().toLowerCase(), // 👈 এই ফিল্ডটি মিসিং ছিল
          client_phone: `+91${phone.trim()}`,
          service_type: serviceMeta.name,
          package_name: packageName,
          price: "Selected Package",
          project_notes: notes.trim() || null,
          status: "pending",
        },
      ]);
      if (error) throw error;

      fetch("/api/notify-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: clientName.trim(),
          phone: `+91 ${phone.trim()}`,
          email: clientEmail.trim().toLowerCase(),
          service: serviceMeta.name,
          packageName,
          price: "Selected Package",
        }),
      }).catch((err) => console.error("Telegram alert failed silently:", err));

      showToast(
        "Booking Successful!",
        "Your project request has been submitted.",
        "success",
      );
      setShowSuccessModal(true);
    } catch (err: unknown) {
      showToast(
        "Error",
        err instanceof Error ? err.message : "Failed to register booking.",
        "error",
      );
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
      <BookingHeader
        rawService={rawService}
        packageName={packageName}
        serviceMeta={serviceMeta}
      />

      <form
        onSubmit={handleSubmit}
        noValidate
        className="rounded-3xl border border-[#1c2d66] bg-[#0e1838]/80 p-6 sm:p-8 backdrop-blur-xl space-y-5 shadow-2xl"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* 🔒 নাম (ReadOnly) */}
          <BookingInputField
            label="Account Name (Verified)"
            name="name"
            value={clientName}
            readOnly={true}
            showProfileShortcut={true}
            touched={touched.name}
            error={errors.name}
          />

          {/* 🔒 ইমেইল (ReadOnly) */}
          <BookingInputField
            label="Email Address (Verified)"
            type="email"
            name="email"
            value={clientEmail}
            readOnly={true}
            touched={touched.email}
            error={errors.email}
          />
        </div>

        {/* ✍️ শুধু ফোন নম্বর ইউজার নিজে টাইপ করবে */}
        <BookingInputField
          label="WhatsApp Number *"
          type="tel"
          name="phone"
          value={phone}
          placeholder="9876543210"
          prefix="+91"
          maxLength={10}
          touched={touched.phone}
          error={errors.phone}
          onChange={(e) => {
            const cleanDigits = e.target.value.replace(/\D/g, "");
            if (cleanDigits.length <= 10) setPhone(cleanDigits);
            if (!touched.phone)
              setTouched((prev) => ({ ...prev, phone: true }));
          }}
          onBlur={() => handleBlur("phone")}
        />

        <div>
          <label className="block text-xs font-mono uppercase text-slate-400 mb-1.5">
            Project Notes / Details (Optional)
          </label>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Tell us about your requirements or reference designs..."
            className="w-full px-4 py-2.5 rounded-xl bg-[#0a1128] border border-[#1c2d66] text-white text-xs focus:outline-none focus:border-cyan-400 transition-all resize-none placeholder:text-slate-600"
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
          disabled={!isFormValid || submitting}
          className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 ${
            isFormValid && !submitting
              ? "bg-cyan-400 text-slate-950 hover:bg-cyan-300 shadow-[0_0_20px_rgba(0,229,255,0.35)] cursor-pointer active:scale-[0.99]"
              : "bg-slate-800/80 text-slate-500 border border-slate-700/50 cursor-not-allowed opacity-60"
          }`}
        >
          {submitting ? (
            <span>Saving Order...</span>
          ) : (
            <>
              <span>Confirm Booking</span>
              <Send
                className={`w-3.5 h-3.5 ${isFormValid ? "text-slate-950" : "text-slate-500"}`}
              />
            </>
          )}
        </button>
      </form>

      <ServiceSelectModal isOpen={!packageName} />
      {showSuccessModal && (
        <BookingSuccessModal
          clientName={clientName}
          packageName={packageName}
        />
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
