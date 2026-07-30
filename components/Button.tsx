import Link from "next/link";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement>;
  variant?: "primary" | "secondary" | "outline" | "glow" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      "bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:bg-gradient-to-br hover:from-cyan-600 hover:to-blue-700 border border-cyan-400/30",

    glow: "bg-slate-900 text-cyan-400 font-semibold border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.15)] hover:shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:bg-slate-800/80 hover:border-cyan-400",

    secondary:
      "bg-slate-800/90 text-slate-100 font-medium border border-slate-700 hover:bg-slate-700/80 hover:border-slate-600 hover:text-white shadow-sm",

    outline:
      "bg-transparent text-cyan-400 font-semibold border-2 border-cyan-400/80 hover:bg-cyan-400 hover:text-slate-950 hover:shadow-lg hover:shadow-cyan-400/30",

    ghost:
      "bg-transparent text-cyan-500 font-bold hover:text-cyan-400 hover:bg-slate-800",
  };

  const sizes = {
    sm: "px-3.5 py-1.5 text-xs rounded-lg gap-1.5",
    md: "px-5 py-2.5 text-sm rounded-xl gap-2",
    lg: "px-7 py-3.5 text-base rounded-xl font-bold gap-2.5",
  };

  const baseClasses = `inline-flex items-center justify-center tracking-wide select-none transition-all ease-out active:scale-95 disabled:opacity-50 disabled:pointer-events-none ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    const isExternal =
      href.startsWith("http") ||
      href.startsWith("https") ||
      href.startsWith("mailto:") ||
      href.startsWith("tel:");

    if (isExternal) {
      return (
        <a
          href={href}
          className={baseClasses}
          onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }

    return (
      <Link
        href={href}
        className={baseClasses}
        onClick={onClick as React.MouseEventHandler<HTMLAnchorElement>}
      >
        {children}
      </Link>
    );
  }

  return (
    <button className={baseClasses} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
