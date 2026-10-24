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
  Edit3,
} from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import { useToast } from "@/components/ui/Toast";
import SignOutModal from "@/app/profile/components/SignOutModal";
import EditNameModal from "@/app/profile/components/EditNameModal";
import type { User } from "@supabase/supabase-js";

export default function ProfilePage() {
  const router = useRouter();
  const { showToast } = useToast();

  const [user, setUser] = useState<User | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  // মোডাল ও লোডিং স্টেট
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [isSavingName, setIsSavingName] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        setNewName(
          currentUser.user_metadata?.full_name ||
            currentUser.email?.split("@")[0] ||
            "",
        );
      }
      setIsChecking(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      if (currentUser) {
        setNewName(
          currentUser.user_metadata?.full_name ||
            currentUser.email?.split("@")[0] ||
            "",
        );
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleConfirmSignOut = async () => {
    setIsLoggingOut(true);
    await supabase.auth.signOut();
    setIsLoggingOut(false);
    setIsSignOutModalOpen(false);
    showToast("Signed Out", "You have been logged out safely.", "info");
    router.push("/");
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = newName.trim();

    if (trimmed.length < 2) {
      showToast("Invalid Name", "Name must be at least 2 characters.", "error");
      return;
    }

    setIsSavingName(true);

    try {
      const { data, error } = await supabase.auth.updateUser({
        data: { full_name: trimmed },
      });

      if (error) throw error;

      setUser(data.user);
      setIsEditModalOpen(false);
      showToast("Updated!", "Your profile name has been updated.", "success");
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Failed to update profile";
      showToast("Error", msg, "error");
    } finally {
      setIsSavingName(false);
    }
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
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-cyan-400/10 text-cyan-400 text-[10px] font-mono uppercase tracking-wider">
                        <Sparkles className="w-3 h-3" /> Client Account
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setNewName(name);
                          setIsEditModalOpen(true);
                        }}
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#132247] hover:bg-[#1c3269] text-slate-300 hover:text-cyan-300 border border-[#273e7d] text-[10px] font-mono transition-all cursor-pointer"
                      >
                        <Edit3 className="w-2.5 h-2.5" /> Edit
                      </button>
                    </div>

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
                  onClick={() => setIsSignOutModalOpen(true)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-red-950/40 hover:bg-red-900/50 border border-red-500/30 hover:border-red-500/70 text-red-300 hover:text-white text-xs font-semibold shadow-[0_0_12px_rgba(239,68,68,0.15)] hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-all cursor-pointer active:scale-95"
                >
                  <LogOut className="w-3.5 h-3.5 text-red-400" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>

            {/* 🚀 কুইক লিঙ্কস */}
            <div className="space-y-3 pt-2">
              <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400 pl-1 font-semibold">
                Account Sections
              </p>

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

      {/* ✏️ এডিট মোডাল */}
      <EditNameModal
        isOpen={isEditModalOpen}
        name={newName}
        isLoading={isSavingName}
        onChangeName={setNewName}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveProfile}
      />

      {/* 🛑 সাইন আউট মোডাল */}
      <SignOutModal
        isOpen={isSignOutModalOpen}
        isLoading={isLoggingOut}
        onClose={() => setIsSignOutModalOpen(false)}
        onConfirm={handleConfirmSignOut}
      />
    </main>
  );
}
