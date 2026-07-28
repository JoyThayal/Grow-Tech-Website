import React from "react";
import Link from "next/link";

export default function Footer(): React.ReactNode {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "#" },
    { name: "About Us", href: "#about" },
    { name: "Our Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Contact Us", href: "#contact" },
  ];

  return (
    <footer className="w-full bg-[#030712] text-white pt-16 pb-8 px-6 lg:px-16 border-t border-[#c9a86a4d]">
      <div className="max-w-7xl mx-auto">
        {/* 📦 Main Footer Content (3 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 items-start">
          {/* 1. Left Column: Brand Info (5 Cols) */}
          <div className="md:col-span-5 space-y-5">
            <h2 className="cabinet text-3xl font-black tracking-wider uppercase flex items-center">
              <span className="text-white">GROW</span>
              <span className="text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.8)]">
                TECH
              </span>
            </h2>

            <p className="garet text-slate-400 text-sm leading-relaxed font-light max-w-sm">
              At Grow Tech, we are passionate about empowering businesses with
              innovative technology solutions. Our mission is to drive growth
              and success for our clients through cutting-edge digital
              strategies and services.
            </p>
          </div>

          {/* 2. Middle Column: Quick Links (3 Cols) */}
          <div className="md:col-span-3 space-y-5">
            <h3 className="text-amber-200/90 text-sm font-bold tracking-[0.15em] uppercase cabinet">
              QUICK LINKS
            </h3>

            <ul className="space-y-3">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-slate-400 hover:text-cyan-400 hover:translate-x-2 text-sm transition-all duration-300 ease-in-out inline-block garet"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Right Column: Social Links (4 Cols) */}
          <div className="md:col-span-4 space-y-5">
            <h3 className="text-amber-200/90 text-sm font-bold tracking-[0.15em] uppercase cabinet">
              CONNECT WITH US
            </h3>

            {/* Social Icons Container */}
            <div className="flex items-center gap-3.5 pt-1">
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-11 h-11 rounded-2xl bg-[#0d1527] border border-slate-800/80 flex items-center justify-center text-slate-300 transition-all duration-300 hover:bg-linear-to-tr hover:from-amber-500 hover:via-rose-500 hover:to-purple-600 hover:text-white hover:-translate-y-2 hover:-rotate-6 hover:shadow-[0_0_20px_rgba(225,29,72,0.6)]"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-11 h-11 rounded-2xl bg-[#0d1527] border border-slate-800/80 flex items-center justify-center text-slate-300 transition-all duration-300 hover:bg-red-600 hover:text-white hover:-translate-y-2 hover:-rotate-6 hover:shadow-[0_0_20px_rgba(220,38,38,0.7)]"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>

              {/* LinkedIn (Hover-এ গোল্ডেন গ্লো ও রোটেট ইফেক্ট) */}
              <a
                href="https://www.linkedin.com/company/grow-tech/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-11 h-11 rounded-2xl bg-[#0d1527] border border-slate-800/80 flex items-center justify-center text-slate-300 transition-all duration-300 hover:bg-[#C9A86A] hover:text-slate-950 hover:-translate-y-2 hover:-rotate-6 hover:scale-105 hover:shadow-[0_0_22px_rgba(201,168,106,0.7)]"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-11 h-11 rounded-2xl bg-[#0d1527] border border-slate-800/80 flex items-center justify-center text-slate-300 transition-all duration-300 hover:bg-blue-600 hover:text-white hover:-translate-y-2 hover:-rotate-6 hover:shadow-[0_0_20px_rgba(37,99,235,0.7)]"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* X / Twitter */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="w-11 h-11 rounded-2xl bg-[#0d1527] border border-slate-800/80 flex items-center justify-center text-slate-300 transition-all duration-300 hover:bg-black hover:text-white hover:border-slate-700 hover:-translate-y-2 hover:-rotate-6 hover:shadow-[0_0_20px_rgba(255,255,255,0.25)]"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* ➖ Bottom Separator Line */}
        <div className="w-full h-px bg-slate-800/80 mb-6" />

        {/* Ⓒ Copyright Section */}
        <div className="text-center text-slate-500 text-sm font-light garet">
          © {currentYear}{" "}
          <span className="font-semibold text-white">Grow </span>
          <span className="font-semibold text-cyan-400">Tech</span>. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
