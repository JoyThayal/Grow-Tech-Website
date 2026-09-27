"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence, type Variants } from "motion/react";
import LoginForm from "@/app/auth/LoginForm";
import SignupForm from "@/app/auth/SignupForm";
import { supabase } from "@/lib/supabase/client";

function AuthForm(): React.ReactNode {
  const searchParams = useSearchParams();
  // যদি কোনো next প্যারামিটার না থাকে তবে ডিফল্ট হিসেবে হোমপেজে ("/") পাঠাবে
  const nextUrl = searchParams.get("next") || "/";

  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [googleLoading, setGoogleLoading] = useState(false);
  const [oauthError, setOauthError] = useState<string | null>(null);

  const slideVariants: Variants = {
    initial: (direction: number) => ({
      x: direction > 0 ? 30 : -30,
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.25, ease: "easeOut" },
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -30 : 30,
      opacity: 0,
      transition: { duration: 0.15, ease: "easeIn" },
    }),
  };

  const direction = activeTab === "login" ? -1 : 1;

  const handleGoogleAuth = async () => {
    try {
      setGoogleLoading(true);
      setOauthError(null);

      // লোকাল ও প্রোডাকশনের জন্য সঠিক বেস ইউআরএল নির্ধারণ
      const redirectBase =
        typeof window !== "undefined" &&
        window.location.hostname === "localhost"
          ? "http://localhost:3000"
          : window.location.origin;

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          // কলব্যাক রাউটে next URL টা পাঠিয়ে দিচ্ছি
          redirectTo: `${redirectBase}/auth/callback?next=${encodeURIComponent(nextUrl)}`,
        },
      });

      if (error) throw error;
    } catch (err: unknown) {
      const error = err as Error;
      setOauthError(error.message || "Failed to connect with Google");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-100 border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-xl rounded-2xl p-6 sm:p-8 shadow-2xl">
      {/* ব্র্যান্ড হেডার */}
      <div className="mb-6 text-center">
        <h1 className="text-xl font-semibold text-white tracking-tight">
          {activeTab === "login" ? "Welcome to Grow Tech" : "Create an account"}
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          {activeTab === "login"
            ? "Sign in to manage and review projects"
            : "Start reviewing and interacting today"}
        </p>
      </div>

      {/* 🔀 মিনিমাল ট্যাব সুইচার */}
      <div className="relative flex p-1 rounded-xl bg-zinc-950/80 border border-zinc-800 mb-6">
        <button
          type="button"
          onClick={() => setActiveTab("login")}
          className={`relative flex-1 py-1.5 text-xs font-medium transition-colors z-10 cursor-pointer ${
            activeTab === "login"
              ? "text-white"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          {activeTab === "login" && (
            <motion.div
              layoutId="authTab"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="absolute inset-0 bg-zinc-800 rounded-lg shadow-sm"
            />
          )}
          <span className="relative z-10">Sign in</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("signup")}
          className={`relative flex-1 py-1.5 text-xs font-medium transition-colors z-10 cursor-pointer ${
            activeTab === "signup"
              ? "text-white"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          {activeTab === "signup" && (
            <motion.div
              layoutId="authTab"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="absolute inset-0 bg-zinc-800 rounded-lg shadow-sm"
            />
          )}
          <span className="relative z-10">Sign up</span>
        </button>
      </div>

      {/* Google Authentication Button */}
      <button
        type="button"
        disabled={googleLoading}
        onClick={handleGoogleAuth}
        className="w-full flex items-center justify-center gap-2.5 py-2.5 px-4 rounded-xl bg-zinc-950 hover:bg-zinc-800/80 border border-zinc-800 text-zinc-200 text-xs font-medium transition-all duration-200 cursor-pointer shadow-sm active:scale-[0.99] disabled:opacity-50"
      >
        {googleLoading ? (
          <span className="w-4 h-4 border-2 border-zinc-400 border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
              />
              <path
                fill="#4285F4"
                d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
              />
              <path
                fill="#FBBC05"
                d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.8s.2-2.1.4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z"
              />
              <path
                fill="#34A853"
                d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
              />
            </svg>
            <span>Continue with Google</span>
          </>
        )}
      </button>

      {oauthError && (
        <p className="mt-2 text-center text-xs text-rose-400">{oauthError}</p>
      )}

      {/* সেপারেটর */}
      <div className="flex items-center my-5 gap-3">
        <div className="flex-1 h-px bg-zinc-800" />
        <span className="text-[11px] text-zinc-500 uppercase tracking-wider font-mono">
          or
        </span>
        <div className="flex-1 h-px bg-zinc-800" />
      </div>

      {/* ফর্ম কনটেইনার ও স্লাইড অ্যানিমেশন */}
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeTab}
            custom={direction}
            variants={slideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {activeTab === "login" ? <LoginForm /> : <SignupForm />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* টার্মস ও প্রাইভেসি টেক্সট */}
      <p className="text-center text-[11px] text-zinc-500 mt-6 leading-relaxed">
        By continuing, you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  );
}

export default function AuthPage(): React.ReactNode {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-[#09090b] text-zinc-100 p-4 sm:p-10 antialiased relative selection:bg-zinc-700 selection:text-white">
      {/* অত্যন্ত পরিচ্ছন্ন ও সাবটল ব্যাকগ্রাউন্ড গ্রিড */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* useSearchParams এর জন্য Suspense বাউন্ডারি */}
      <Suspense
        fallback={
          <div className="text-xs text-zinc-500">Loading portal...</div>
        }
      >
        <AuthForm />
      </Suspense>
    </main>
  );
}
