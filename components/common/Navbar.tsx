"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Button from "../ui/Button";

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
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/75 backdrop-blur-xl transition-all">
      <nav className="mx-auto flex h-16 md:h-20 items-center justify-between px-4 sm:px-6 lg:px-12">
        {/* 🌟 লোগো: মোবাইলে w-28 আর ডেস্কটপে md:w-36 */}
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

        {/* 💻 Desktop Nav */}
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

        {/* 💻 Desktop Button */}
        <div className="hidden md:block">
          <Button href="/contact" variant="glow" size="md">
            Let&apos;s Talk
          </Button>
        </div>

        {/* 📱 Mobile Hamburger Button */}
        <button
          type="button"
          aria-label="Toggle navigation menu"
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-50 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-all hover:bg-white/10 active:scale-95 md:hidden cursor-pointer"
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
            ? "max-h-96 opacity-100 shadow-2xl"
            : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="border-b border-white/10 bg-slate-950/95 px-6 py-6 backdrop-blur-2xl">
          <div className="flex flex-col gap-5">
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

            <div className="pt-2">
              <Button
                href="/contact"
                variant="glow"
                size="md"
                className="w-full justify-center text-center"
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
