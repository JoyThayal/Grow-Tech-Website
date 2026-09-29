"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  User as UserIcon,
  ChevronDown,
  Globe,
  Smartphone,
  Gamepad2,
  ArrowRight,
} from "lucide-react";
import Button from "../ui/Button";
import { supabase } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

const services = [
  {
    name: "Web Development",
    desc: "Next.js & modern platforms",
    href: "/services/web",
    icon: Globe,
  },
  {
    name: "App Development",
    desc: "Scalable mobile apps",
    href: "/services/app",
    icon: Smartphone,
  },
  {
    name: "Game Development",
    desc: "Interactive 2D/3D games",
    href: "/services/game",
    icon: Gamepad2,
  },
];

const links = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true); // 🛡️ গ্লিচ আটকানোর গার্ড
  const [servicesOpen, setServicesOpen] = useState(false);

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

        {/* 💻 Desktop Links */}
        <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center gap-7 text-sm font-medium">
          <Link
            href="/"
            className={`py-1 transition-colors ${pathname === "/" ? "text-cyan-400 font-semibold" : "text-slate-300 hover:text-cyan-400"}`}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`py-1 transition-colors ${pathname === "/about" ? "text-cyan-400 font-semibold" : "text-slate-300 hover:text-cyan-400"}`}
          >
            About
          </Link>

          {/* Services Hover Dropdown */}
          <div
            className="relative group py-5"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <div className="flex items-center gap-1 cursor-pointer text-slate-300 group-hover:text-cyan-400">
              <Link
                href="/services"
                className={
                  pathname.startsWith("/services")
                    ? "text-cyan-400 font-semibold"
                    : ""
                }
              >
                Services
              </Link>
              <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
            </div>

            {servicesOpen && (
              <div className="absolute top-14 -left-10 w-72 rounded-2xl border border-[#1c2d66] bg-[#0e1838] p-3 shadow-2xl backdrop-blur-2xl">
                {services.map(({ name, desc, href, icon: Icon }) => (
                  <Link
                    key={name}
                    href={href}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-[#132247]/70 text-slate-300 hover:text-white transition-all"
                  >
                    <div className="p-2 rounded-lg bg-[#121f48] text-cyan-400">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold">{name}</p>
                      <p className="text-[10px] text-slate-400">{desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/portfolio"
            className={`py-1 transition-colors ${pathname.startsWith("/portfolio") ? "text-cyan-400 font-semibold" : "text-slate-300 hover:text-cyan-400"}`}
          >
            Portfolio
          </Link>
          <Link
            href="/contact"
            className={`py-1 transition-colors ${pathname === "/contact" ? "text-cyan-400 font-semibold" : "text-slate-300 hover:text-cyan-400"}`}
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

          <Button href="/contact" variant="glow" size="md">
            Let&apos;s Talk
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
            className="p-2 rounded-xl border border-[#1c2d66] bg-[#132247]/60 text-white"
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
            className="block py-1 text-slate-300"
          >
            Home
          </Link>
          <Link
            href="/about"
            onClick={() => setIsOpen(false)}
            className="block py-1 text-slate-300"
          >
            About
          </Link>

          <div className="py-1">
            <span className="text-xs text-slate-500 font-mono uppercase">
              Services
            </span>
            <div className="pl-2 mt-1 space-y-1">
              {services.map(({ name, href }) => (
                <Link
                  key={name}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className="block py-1 text-sm text-cyan-400"
                >
                  {name}
                </Link>
              ))}
            </div>
          </div>

          <Link
            href="/portfolio"
            onClick={() => setIsOpen(false)}
            className="block py-1 text-slate-300"
          >
            Portfolio
          </Link>
          <Link
            href="/contact"
            onClick={() => setIsOpen(false)}
            className="block py-1 text-slate-300"
          >
            Contact
          </Link>
        </div>
      )}
    </header>
  );
}
