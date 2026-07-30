"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Button from "./Button";

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

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 items-center justify-between px-6 lg:px-15">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <Image
            src="/images/growtech-logo.jpg"
            width={45}
            height={45}
            priority
            alt="Grow Tech Logo"
            className="rounded-xl shadow-lg shadow-cyan-500/30 transition duration-300 group-hover:scale-110 group-hover:rotate-6"
          />

          <h2 className="cabinet text-xl font-extrabold tracking-wide text-white sm:text-2xl">
            Grow
            <span className="text-cyan-400">Tech</span>
          </h2>
        </Link>

        {/* Desktop Nav */}
        <div className="garet hidden items-center gap-8 text-sm font-medium tracking-wide md:flex">
          {navLinks.map((link) => {
            // ✨ আপডেট করা লজিক: সাব-রুটেও পোর্টফোলিওকে অ্যাক্টিভ রাখবে
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative transition-colors duration-300 ${
                  isActive
                    ? "font-semibold text-cyan-400 after:w-full"
                    : "text-slate-300 hover:text-cyan-400 after:w-0 hover:after:w-full"
                } after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-cyan-400 after:transition-all after:duration-300`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Desktop Button */}
        <div className="hidden md:block">
          <Button href="/contact" variant="glow" size="md">
            Let&apos;s Talk
          </Button>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-50 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition hover:bg-white/10 md:hidden"
        >
          <Menu
            className={`absolute h-6 w-6 transition-all duration-300 ${
              isOpen
                ? "rotate-180 scale-0 opacity-0"
                : "rotate-0 scale-100 opacity-100"
            }`}
          />

          <X
            className={`absolute h-6 w-6 transition-all duration-300 ${
              isOpen
                ? "rotate-0 scale-100 opacity-100"
                : "-rotate-180 scale-0 opacity-0"
            }`}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`absolute left-0 top-20 z-40 w-full overflow-hidden transition-all duration-500 md:hidden ${
          isOpen ? "max-h-125 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-white/10 bg-slate-950/95 px-6 py-6 backdrop-blur-xl">
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => {
              // ✨ মোবাইল মেনুর জন্যও একই লজিক
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-lg transition ${
                    isActive
                      ? "text-cyan-400 font-semibold"
                      : "text-slate-300 hover:text-cyan-400"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            <Button
              href="/contact"
              variant="glow"
              size="md"
              onClick={() => setIsOpen(false)}
            >
              Let&apos;s Talk
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
