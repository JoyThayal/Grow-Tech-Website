import Link from "next/link";
import {
  RiInstagramFill,
  RiYoutubeFill,
  RiLinkedinBoxFill,
  RiFacebookCircleFill,
  RiTwitterXFill,
} from "react-icons/ri";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Our Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Contact Us", href: "/contact" },
];

const socialLinks = [
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: RiInstagramFill,
    hover:
      "hover:bg-gradient-to-tr hover:from-amber-500 hover:via-rose-500 hover:to-purple-600 hover:text-white hover:shadow-[0_0_20px_rgba(225,29,72,0.6)]",
  },
  {
    name: "YouTube",
    href: "https://youtube.com",
    icon: RiYoutubeFill,
    hover:
      "hover:bg-red-600 hover:text-white hover:shadow-[0_0_20px_rgba(220,38,38,0.7)]",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/grow-tech/",
    icon: RiLinkedinBoxFill,
    hover:
      "hover:bg-[#0A66C2] hover:text-white hover:scale-105 hover:shadow-[0_0_22px_rgba(201,168,106,0.7)]",
  },
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: RiFacebookCircleFill,
    hover:
      "hover:bg-blue-600 hover:text-white hover:shadow-[0_0_20px_rgba(37,99,235,0.7)]",
  },
  {
    name: "X",
    href: "https://x.com",
    icon: RiTwitterXFill,
    hover:
      "hover:bg-black hover:text-white hover:border-slate-700 hover:shadow-[0_0_20px_rgba(255,255,255,0.25)]",
  },
];

const socialClass =
  "flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-800/80 bg-[#0d1527] text-slate-300 transition-all duration-300 hover:-translate-y-2 hover:-rotate-6";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-[#C9A86A4D] bg-[#030712] px-5 pt-16 pb-8 text-white sm:px-6 lg:px-10 xl:px-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 pb-16 md:grid-cols-12">
          {/* Brand */}
          <div className="space-y-5 md:col-span-5">
            <h2 className="cabinet flex items-center text-3xl font-black uppercase tracking-wider">
              <span className="text-white">GROW</span>
              <span className="text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.8)]">
                TECH
              </span>
            </h2>

            <p className="garet max-w-sm text-sm leading-relaxed font-light text-slate-400">
              At Grow Tech, we empower businesses with innovative technology
              solutions. From software engineering to hardware services, our
              mission is to help clients grow through cutting-edge digital
              experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-5 md:col-span-3">
            <h3 className="cabinet text-sm font-bold uppercase tracking-[0.15em] text-[#c9a86a]">
              Quick Links
            </h3>

            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="garet inline-block text-sm text-slate-400 transition-all duration-300 hover:translate-x-2 hover:text-cyan-400"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-5 md:col-span-4">
            <h3 className="cabinet text-sm font-bold uppercase tracking-[0.15em] text-[#c9a86a]">
              Connect With Us
            </h3>

            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              {socialLinks.map(({ name, href, icon: Icon, hover }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className={`${socialClass} ${hover}`}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="my-6 h-px w-full bg-slate-800/80" />

        <div className="garet text-center text-sm font-light text-slate-500">
          © {currentYear}{" "}
          <span className="font-semibold text-white">Grow </span>
          <span className="font-semibold text-cyan-400">Tech</span>. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
