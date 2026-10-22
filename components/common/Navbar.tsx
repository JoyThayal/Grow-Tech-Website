"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, User as UserIcon, Headphones, LogIn } from "lucide-react";
import Button from "../ui/Button";
import { supabase } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
      setAuthLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-[#1c2d66] bg-[#0a1128]/85 backdrop-blur-xl">
      <nav className="relative mx-auto flex h-16 md:h-20 items-center justify-between px-4 sm:px-6 lg:px-12">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image
            src="/images/growtech-logo.png"
            width={140}
            height={40}
            priority
            alt="Grow Tech Logo"
            className="w-28 sm:w-32 md:w-36 h-auto"
          />
        </Link>

        {/* 💻 Desktop Navigation Links */}
        <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-8 text-sm font-medium">
          <Link
            href="/"
            className={`py-1 transition-colors ${
              pathname === "/"
                ? "text-cyan-400 font-semibold"
                : "text-slate-300 hover:text-cyan-400"
            }`}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`py-1 transition-colors ${
              pathname === "/about"
                ? "text-cyan-400 font-semibold"
                : "text-slate-300 hover:text-cyan-400"
            }`}
          >
            About
          </Link>
          <Link
            href="/services"
            className={`py-1 transition-colors ${
              pathname.startsWith("/services")
                ? "text-cyan-400 font-semibold"
                : "text-slate-300 hover:text-cyan-400"
            }`}
          >
            Services
          </Link>
          <Link
            href="/portfolio"
            className={`py-1 transition-colors ${
              pathname.startsWith("/portfolio")
                ? "text-cyan-400 font-semibold"
                : "text-slate-300 hover:text-cyan-400"
            }`}
          >
            Portfolio
          </Link>
        </div>

        {/* 💻 Desktop Actions */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          {authLoading ? (
            <div className="w-24 h-9 rounded-xl bg-[#132247]/40 animate-pulse" />
          ) : user ? (
            <Link
              href="/profile"
              className="flex items-center gap-2 p-1.5 pr-3.5 rounded-xl border border-[#1c2d66] bg-[#132247]/60 text-slate-300 hover:text-white hover:border-cyan-500/40 transition-all"
            >
              <div className="relative w-7 h-7 rounded-lg overflow-hidden bg-[#1c2f62] flex items-center justify-center">
                {user.user_metadata?.avatar_url ? (
                  <Image
                    src={user.user_metadata.avatar_url}
                    alt="Profile"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <UserIcon className="w-4 h-4 text-cyan-300" />
                )}
              </div>
              <span className="text-xs font-semibold">Profile</span>
            </Link>
          ) : (
            /* 🚀 Styled Login Button for Desktop */
            <Link
              href="/auth"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-cyan-400 border border-cyan-500/30 bg-cyan-950/20 hover:bg-cyan-500/10 hover:border-cyan-400 transition-all shadow-[0_0_15px_rgba(6,182,212,0.1)] active:scale-95"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Log In</span>
            </Link>
          )}

          {/* Desktop Glow Button */}
          <Button href="/contact" variant="glow" size="md">
            <Headphones className="w-4 h-4" />
            Contact Us
          </Button>
        </div>

        {/* 📱 Mobile Actions */}
        <div className="flex items-center gap-2.5 md:hidden">
          {/* 🎧 Mobile Support Quick Action Button */}
          <Link
            href="/contact"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-500/40 bg-cyan-950/40 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)] active:scale-95 transition-all"
            aria-label="Support & Contact"
          >
            <Headphones className="w-4 h-4" />
          </Link>

          {/* Mobile Profile Icon (If Logged In) */}
          {!authLoading && user && (
            <Link
              href="/profile"
              className="relative w-8 h-8 rounded-xl overflow-hidden border border-[#1c2d66] flex items-center justify-center bg-[#132247]/60"
            >
              {user.user_metadata?.avatar_url ? (
                <Image
                  src={user.user_metadata.avatar_url}
                  alt="Profile"
                  fill
                  className="object-cover"
                />
              ) : (
                <UserIcon className="w-4 h-4 text-cyan-300" />
              )}
            </Link>
          )}

          {/* Hamburger Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-xl border border-[#1c2d66] bg-[#132247]/60 text-white cursor-pointer active:scale-95 transition-all"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* 📱 Mobile Dropdown Menu */}
      {isOpen && (
        <div className="border-b border-[#1c2d66] bg-[#0a1128]/95 px-6 py-5 md:hidden space-y-3">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="block py-1 text-slate-300 hover:text-cyan-400"
          >
            Home
          </Link>
          <Link
            href="/about"
            onClick={() => setIsOpen(false)}
            className="block py-1 text-slate-300 hover:text-cyan-400"
          >
            About
          </Link>
          <Link
            href="/services"
            onClick={() => setIsOpen(false)}
            className="block py-1 text-slate-300 hover:text-cyan-400"
          >
            Services
          </Link>
          <Link
            href="/portfolio"
            onClick={() => setIsOpen(false)}
            className="block py-1 text-slate-300 hover:text-cyan-400"
          >
            Portfolio
          </Link>

          {/* 📱 Mobile Action Buttons */}
          <div className="pt-3 border-t border-[#1c2d66]/60 flex flex-col gap-2.5">
            {!authLoading && !user && (
              <Link
                href="/auth"
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-cyan-500/40 bg-cyan-950/30 text-cyan-300 text-xs font-semibold shadow-[0_0_15px_rgba(6,182,212,0.15)] active:scale-95 transition-all"
              >
                <LogIn className="w-4 h-4" />
                <span>Log In / Sign Up</span>
              </Link>
            )}

            <Button
              href="/contact"
              variant="glow"
              size="md"
              className="w-full justify-center"
              onClick={() => setIsOpen(false)}
            >
              <Headphones className="w-4 h-4" />
              Contact Us
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
