import Image from "next/image";
import Link from "next/link";
import Button from "./Button";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <nav className="mx-auto grid h-20 max-w-7xl grid-cols-3 items-center px-6 lg:px-10">
        {/* Logo */}
        <div className="justify-self-start">
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/growtech-logo.jpg"
              width={45}
              height={45}
              priority
              alt="Grow Tech Logo"
              className="w-auto h-auto rounded-xl shadow-lg shadow-cyan-500/30 transition duration-300 group-hover:scale-110 group-hover:rotate-6"
            />

            <h2 className="text-2xl font-extrabold tracking-wide">
              Grow
              <span className="text-cyan-400">Tech</span>
            </h2>
          </Link>
        </div>

        {/* Navigation */}
        <div className="justify-self-center hidden md:flex items-center gap-8 text-sm font-medium tracking-wide garet">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative transition duration-300 hover:text-cyan-400 after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-cyan-400 after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="justify-self-end">
          <Button href="/contact" variant="glow" size="md">
            Let&apos;s Talk
          </Button>
        </div>
      </nav>
    </header>
  );
}
