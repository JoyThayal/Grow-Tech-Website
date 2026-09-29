"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User as UserIcon,
  Mail,
  Calendar,
  Sparkles,
  LogOut,
  ShoppingBag,
  Star,
  ArrowRight,
  LogIn,
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { useToast } from "@/components/ui/Toast";
import type { User } from "@supabase/supabase-js";

export default function ProfilePage() {
  const router = useRouter();
  const { showToast } = useToast();

  const [user, setUser] = useState<User | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // সরাসরি সেশন চেক
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setIsChecking(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    showToast("Signed Out", "You have been logged out safely.", "info");
    router.push("/");
  };

  const avatar = user?.user_metadata?.avatar_url;
  const name =
    user?.user_metadata?.full_name || user?.email?.split("@")[0] || "Explorer";
  const joinedDate = user?.created_at
    ? new Date(user.created_at).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : "";

  return (
    <main className="min-h-screen bg-[#0a1128] text-white py-12 px-4 sm:px-8 relative overflow-hidden">
      {/* 🌌 ব্যাকগ্রাউন্ড গ্লো */}
      <div className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 -z-10 h-80 w-full max-w-3xl rounded-full bg-cyan-500/10 blur-[130px]" />

      <div className="max-w-2xl mx-auto space-y-6">
        {user ? (
          <>
            {/* 🪪 ইউজার প্রোফাইল কার্ড */}
            <div className="rounded-3xl border border-[#1c2d66] bg-[#0e1838]/80 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
              <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-5">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden border border-[#243982] bg-[#121f48] flex items-center justify-center shrink-0 shadow-inner">
                    {avatar ? (
                      <Image
                        src={avatar}
                        alt={name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <UserIcon className="w-9 h-9 text-cyan-300" />
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-400/10 text-cyan-400 text-[10px] font-mono uppercase tracking-wider">
                      <Sparkles className="w-3 h-3" /> Client Account
                    </span>
                    <h1 className="cabinet text-2xl font-bold text-white">
                      {name}
                    </h1>
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 text-xs text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-cyan-400" />{" "}
                        {user.email}
                      </span>
                      <span className="hidden sm:inline text-slate-600">•</span>
                      <span className="flex items-center gap-1.5 font-mono">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400" />{" "}
                        Joined {joinedDate}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSignOut}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#132247]/60 hover:bg-rose-500/15 border border-[#273e7d] hover:border-rose-500/40 text-slate-300 hover:text-rose-400 text-xs font-semibold transition-all cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" /> Sign Out
                </button>
              </div>
            </div>

            {/* 🚀 কুইক অ্যাকশন হাব (বুকিং ও রেটিং-এর জন্য আলাদা পেজ লিঙ্ক) */}
            <div className="space-y-3 pt-2">
              <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400 pl-1 font-semibold">
                Account Sections
              </p>

              {/* ১. বুকিং হিস্ট্রি বাটন */}
              <Link
                href="/profile/orders"
                className="group flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-[#0c1533]/80 border border-[#1c2d66] hover:border-cyan-400/60 hover:bg-[#0e1838] transition-all shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:scale-105 transition-transform">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-2">
                      Package Bookings & Services
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Track ongoing websites, apps, status updates & deliveries.
                    </p>
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-[#132247]/40 text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>

              {/* ২. মাই রেটিংস ও রিভিউ বাটন */}
              <Link
                href="/profile/reviews"
                className="group flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-[#0c1533]/80 border border-[#1c2d66] hover:border-amber-400/60 hover:bg-[#0e1838] transition-all shadow-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 group-hover:scale-105 transition-transform">
                    <Star className="w-5 h-5 fill-amber-400/30" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-300 transition-colors flex items-center gap-2">
                      My Ratings & Feedback
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Manage your project reviews, ratings and comments.
                    </p>
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-[#132247]/40 text-slate-400 group-hover:text-amber-400 group-hover:translate-x-1 transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </div>
          </>
        ) : !isChecking ? (
          /* লগইন না থাকলে ক্লিয়ার কার্ড */
          <div className="rounded-3xl border border-[#1c2d66] bg-[#0e1838]/70 p-10 text-center backdrop-blur-xl space-y-5">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-[#121f48] border border-[#243982] flex items-center justify-center text-cyan-400 shadow-[0_0_20px_rgba(0,229,255,0.2)]">
              <UserIcon className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <h2 className="cabinet text-2xl font-bold text-white">
                Sign In to View Your Account
              </h2>
              <p className="garet text-xs sm:text-sm text-slate-400 max-w-sm mx-auto">
                Sign in to manage your website packages, project milestones, and
                reviews.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/auth?next=/profile"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-cyan-400 text-slate-950 font-bold text-xs hover:bg-cyan-300 transition-all shadow-[0_0_15px_rgba(0,229,255,0.3)]"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In Now</span>
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}
