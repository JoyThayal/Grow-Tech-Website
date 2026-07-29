import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lucide React-এর ইমপোর্ট অপটিমাইজ করার জন্য
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },

  // তোমার পুরনো ইমেজ কনফিগারেশন
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
