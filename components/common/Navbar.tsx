"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, User as UserIcon } from "lucide-react";
import Button from "../ui/Button";
import { supabase } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  // 🔐 ইউজারের লগইন অবস্থা চেক
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const userAvatar = user?.user_metadata?.avatar_url;

  return (
    <header className="sticky top-0 z-50 border-b border-[#1c2d66] bg-[#0a1128]/80 backdrop-blur-xl transition-all">
      <nav className="mx-auto flex h-16 md:h-20 items-center justify-between px-4 sm:px-6 lg:px-12">
        {/* 🌟 লোগো */}
        <Link href="/" className="group flex items-center">
          <Image
            src="/images/growtech-logo.png"
            width={140}
            height={40}
            priority
            alt="Grow Tech Logo"
            className="w-28 sm:w-32 md:w-36 h-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* 💻 Desktop Nav Links */}
        <div className="garet hidden items-center gap-7 lg:gap-8 text-sm font-medium tracking-wide md:flex">
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative py-1 transition-colors duration-300 ${
                  isActive
                    ? "font-semibold text-cyan-400 after:w-full"
                    : "text-slate-300 hover:text-cyan-400 after:w-0 hover:after:w-full"
                } after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:bg-cyan-400 after:transition-all after:duration-300`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* 💻 Desktop Actions (Profile + Let's Talk) */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <Link
              href="/profile"
              className={`relative flex items-center gap-2 p-1.5 pr-3 rounded-full border transition-all duration-300 ${
                pathname === "/profile"
                  ? "border-cyan-400 bg-cyan-400/10 text-cyan-300 shadow-[0_0_15px_rgba(0,229,255,0.25)]"
                  : "border-[#1c2d66] bg-[#132247]/60 text-slate-300 hover:border-cyan-400/50 hover:text-white"
              }`}
            >
              <div className="relative w-8 h-8 rounded-full overflow-hidden bg-[#1c2f62] border border-[#273e7d] flex items-center justify-center">
                {userAvatar ? (
                  <Image
                    src={userAvatar}
                    alt="Profile"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <UserIcon className="w-4 h-4 text-cyan-300" />
                )}
              </div>
              <span className="text-xs font-medium">Profile</span>
            </Link>
          ) : (
            <Link
              href="/auth"
              className="text-xs font-medium text-slate-300 hover:text-cyan-400 transition-colors px-3 py-1.5"
            >
              Sign In
            </Link>
          )}

          <Button href="/contact" variant="glow" size="md">
            Let&apos;s Talk
          </Button>
        </div>

        {/* 📱 Mobile Hamburger Button */}
        <button
          type="button"
          aria-label="Toggle navigation menu"
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-50 flex h-10 w-10 items-center justify-center rounded-xl border border-[#1c2d66] bg-[#132247]/60 text-white transition-all hover:bg-[#1a2d5c] active:scale-95 md:hidden cursor-pointer"
        >
          <Menu
            className={`absolute h-5 w-5 transition-all duration-300 ${
              isOpen
                ? "rotate-90 scale-0 opacity-0"
                : "rotate-0 scale-100 opacity-100"
            }`}
          />

          <X
            className={`absolute h-5 w-5 transition-all duration-300 ${
              isOpen
                ? "rotate-0 scale-100 opacity-100"
                : "-rotate-90 scale-0 opacity-0"
            }`}
          />
        </button>
      </nav>

      {/* 📱 Mobile Menu Dropdown */}
      <div
        className={`absolute left-0 top-16 md:top-20 z-40 w-full overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
          isOpen
            ? "max-h-112 opacity-100 shadow-2xl"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="border-b border-[#1c2d66] bg-[#0a1128]/95 px-6 py-6 backdrop-blur-2xl">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-base font-medium transition-colors ${
                    isActive
                      ? "text-cyan-400 font-semibold"
                      : "text-slate-300 hover:text-cyan-400"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* 📱 Mobile Profile / Auth Link */}
            <div className="pt-2 border-t border-[#1c2d66]/80 flex flex-col gap-3">
              {user ? (
                <Link
                  href="/profile"
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 p-2.5 rounded-xl border transition-all ${
                    pathname === "/profile"
                      ? "border-cyan-400 bg-cyan-400/10 text-cyan-300"
                      : "border-[#1c2d66] bg-[#132247]/60 text-slate-300 hover:text-white"
                  }`}
                >
                  <div className="relative w-8 h-8 rounded-full overflow-hidden bg-[#1c2f62] border border-[#273e7d] flex items-center justify-center">
                    {userAvatar ? (
                      <Image
                        src={userAvatar}
                        alt="Profile"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <UserIcon className="w-4 h-4 text-cyan-300" />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-white">
                      My Profile
                    </span>
                    <span className="text-[11px] text-slate-400">
                      View reviews & downloads
                    </span>
                  </div>
                </Link>
              ) : (
                <Link
                  href="/auth"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center py-2.5 rounded-xl bg-[#132247]/60 border border-[#273e7d] text-sm font-medium text-slate-200 hover:text-cyan-300 transition-colors"
                >
                  Sign In / Register
                </Link>
              )}

              <Button
                href="/contact"
                variant="glow"
                size="md"
                className="w-full justify-center text-center mt-1"
                onClick={() => setIsOpen(false)}
              >
                Let&apos;s Talk
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
