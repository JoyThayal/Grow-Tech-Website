"use client";
import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";

export default function TopGradientLoader() {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    // শুধুমাত্র যদি সত্যি সত্যি পেজ/পাথ চেঞ্জ হয়
    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 800);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-9999 h-0.75 w-full overflow-hidden">
      <div className="h-full w-full bg-linear-to-r from-cyan-500 via-purple-500 to-pink-500 animate-gradient-line shadow-[0_0_10px_rgba(168,85,247,0.7)]" />
    </div>
  );
}
