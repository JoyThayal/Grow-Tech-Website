"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <nav className="w-full px-15 grid h-20 grid-cols-3 items-center">
        {/* Logo */}
        <div className="justify-self-start">
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/images/growtech-logo.jpg"
              width={45}
              height={45}
              priority
              alt="Grow Tech Logo"
              className="w-auto h-auto rounded-xl shadow-lg shadow-cyan-500/30 transition duration-300 group-hover:scale-110 group-hover:rotate-6"
            />

            <h2 className="cabinet text-2xl font-extrabold tracking-wide text-white">
              Grow
              <span className="text-cyan-400">Tech</span>
            </h2>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="justify-self-center hidden md:flex items-center gap-8 text-sm font-medium tracking-wide garet">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative transition-colors duration-300 ${
                  isActive
                    ? "text-cyan-400 font-semibold after:w-full"
                    : "text-slate-300 hover:text-cyan-400 after:w-0 hover:after:w-full"
                } after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-cyan-400 after:transition-all after:duration-300`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="justify-self-end">
          <Button href="/contact" variant="glow" size="md">
            Let&apos;s Talk
          </Button>
        </div>
      </nav>
    </header>
  );
}
