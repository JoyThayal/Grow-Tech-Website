"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, User as UserIcon, Headphones, LogIn } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Button from "../ui/Button";
import { supabase } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

const NAV_LINKS = [
  { href: "/", label: "Home", exact: true },
  { href: "/about", label: "About", exact: true },
  { href: "/services", label: "Services", exact: false },
  { href: "/portfolio", label: "Portfolio", exact: false },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // 🔐 Supabase Auth সেশন লিসেনার
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

  // 🚫 মোবাইল মেনু ওপেন থাকলে পেছনের পেজ স্ক্রোল লক করা
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      const originalTouchAction = document.body.style.touchAction;

      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none"; // আইওএস সাফারি রাবার-ব্যান্ড স্ক্রোলিং আটকায়

      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.touchAction = originalTouchAction;
      };
    }
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  const isLinkActive = (href: string, exact: boolean) => {
    return exact ? pathname === href : pathname.startsWith(href);
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[#1c2d66] bg-[#0a1128]/85 backdrop-blur-xl">
        <nav className="relative mx-auto flex h-16 md:h-20 items-center justify-between px-4 sm:px-6 lg:px-12">
          {/* Logo */}
          <Link href="/" onClick={closeMenu} className="shrink-0">
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
            {NAV_LINKS.map((link) => {
              const active = isLinkActive(link.href, link.exact);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`py-1 transition-colors ${
                    active
                      ? "text-cyan-400 font-semibold"
                      : "text-slate-300 hover:text-cyan-400"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
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
              <Link
                href="/auth"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-cyan-400 border border-cyan-500/30 bg-cyan-950/20 hover:bg-cyan-500/10 hover:border-cyan-400 transition-all shadow-[0_0_15px_rgba(6,182,212,0.1)] active:scale-95"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Log In</span>
              </Link>
            )}

            <Button href="/contact" variant="glow" size="md">
              <Headphones className="w-4 h-4" />
              Contact Us
            </Button>
          </div>

          {/* 📱 Mobile Actions */}
          <div className="flex items-center gap-2.5 md:hidden">
            <Link
              href="/contact"
              onClick={closeMenu}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-500/40 bg-cyan-950/40 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)] active:scale-95 transition-all"
              aria-label="Support & Contact"
            >
              <Headphones className="w-4 h-4" />
            </Link>

            {!authLoading && user && (
              <Link
                href="/profile"
                onClick={closeMenu}
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

            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="p-2 rounded-xl border border-[#1c2d66] bg-[#132247]/60 text-white cursor-pointer active:scale-95 transition-all"
              aria-label="Toggle Menu"
            >
              <motion.div
                key={isOpen ? "close" : "open"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {isOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </motion.div>
            </button>
          </div>
        </nav>

        {/* 📱 ভাসমান মেনু (Header-এর ভেতরে absolute) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 450,
                damping: 35,
                mass: 0.7,
              }}
              className="absolute top-full left-0 right-0 z-50 overflow-hidden border-b border-[#1c2d66] bg-[#0a1128]/95 shadow-[0_20px_40px_rgba(0,0,0,0.6)] backdrop-blur-2xl md:hidden transform-gpu will-change-transform"
            >
              <div className="px-4 py-4 space-y-1">
                {NAV_LINKS.map((link, index) => {
                  const active = isLinkActive(link.href, link.exact);
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.03 * index, duration: 0.18 }}
                    >
                      <Link
                        href={link.href}
                        onClick={closeMenu}
                        className={`relative flex items-center px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                          active
                            ? "bg-cyan-500/10 text-cyan-400 border border-cyan-400/30 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                            : "text-slate-300 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        {active && (
                          <span className="absolute left-2 w-1 h-4 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                        )}
                        <span className={active ? "pl-2" : ""}>
                          {link.label}
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}

                <motion.div
                  initial={{ y: 8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.14, duration: 0.2 }}
                  className="pt-3 border-t border-[#1c2d66]/60 flex flex-col gap-2.5 mt-2"
                >
                  {!authLoading && !user && (
                    <Link
                      href="/auth"
                      onClick={closeMenu}
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
                    onClick={closeMenu}
                  >
                    <Headphones className="w-4 h-4" />
                    Contact Us
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 🌑 সম্পূর্ণ স্ক্রিনের ব্যাকড্রপ (Header-এর বাইরে z-40 হিসেবে থাকবে) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeMenu}
            className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-xs md:hidden"
          />
        )}
      </AnimatePresence>
    </>
  );
}
