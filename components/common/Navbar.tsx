"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, User as UserIcon, Headphones } from "lucide-react";
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
        {/* লোগো */}
        <Link href="/" className="shrink-0">
          <Image
            src="/images/growtech-logo.png"
            width={140}
            height={40}
            priority
            alt="Logo"
            className="w-28 sm:w-32 md:w-36 h-auto"
          />
        </Link>

        {/* 💻 Desktop Links (একদম ক্লিন ও সাধারণ) */}
        <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-7 text-sm font-medium">
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
          <Link
            href="/contact"
            className={`py-1 transition-colors ${
              pathname === "/contact"
                ? "text-cyan-400 font-semibold"
                : "text-slate-300 hover:text-cyan-400"
            }`}
          >
            Contact
          </Link>
        </div>

        {/* 💻 Desktop Actions */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          {authLoading ? (
            <div className="w-20 h-8 rounded-full bg-[#132247]/40 animate-pulse" />
          ) : user ? (
            <Link
              href="/profile"
              className="flex items-center gap-2 p-1.5 pr-3 rounded-full border border-[#1c2d66] bg-[#132247]/60 text-slate-300 hover:text-white"
            >
              <div className="relative w-7 h-7 rounded-full overflow-hidden bg-[#1c2f62] flex items-center justify-center">
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
              <span className="text-xs font-medium">Profile</span>
            </Link>
          ) : (
            <Link
              href="/auth"
              className="text-xs font-medium text-slate-300 hover:text-cyan-400 px-3"
            >
              Sign In
            </Link>
          )}

          <Button
            href="/contact"
            variant="glow"
            size="md"
            className="flex items-center gap-2 group"
          >
            <Headphones className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span>Get Support</span>
          </Button>
        </div>

        {/* 📱 Mobile Actions */}
        <div className="flex items-center gap-2 md:hidden">
          {!authLoading &&
            (user ? (
              <Link
                href="/profile"
                className="relative w-8 h-8 rounded-full overflow-hidden border border-[#1c2d66] flex items-center justify-center"
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
            ) : (
              <Link
                href="/auth"
                className="text-xs px-2 py-1 rounded-lg border border-[#1c2d66] bg-[#132247]/50 text-slate-300"
              >
                Sign In
              </Link>
            ))}

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-xl border border-[#1c2d66] bg-[#132247]/60 text-white cursor-pointer"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* 📱 Mobile Menu Dropdown */}
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
            className="block py-1 text-cyan-400 font-medium"
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
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="block py-1 text-slate-300 hover:text-cyan-400"
          >
            Contact
          </Link>
        </div>
      )}
    </header>
  );
}
