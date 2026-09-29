"use client";

import { useEffect } from "react";
import gsap from "gsap";

export default function ClickParticles() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // 🌌 শান্ত ও প্রিমিয়াম টেক কালার (সায়ান, আইস ব্লু ও সফট সিলভার)
      const colors = ["#00e5ff", "#67e8f9", "#e0f2fe", "#93c5fd"];

      // ১. সাবটল মাইক্রো রিং রিপল (শান্ত ও প্রফেশনাল স্পর্শ)
      const ripple = document.createElement("div");
      ripple.style.position = "fixed";
      ripple.style.left = `${e.clientX}px`;
      ripple.style.top = `${e.clientY}px`;
      ripple.style.width = "6px";
      ripple.style.height = "6px";
      ripple.style.borderRadius = "50%";
      ripple.style.border = "1px solid rgba(0, 229, 255, 0.4)";
      ripple.style.pointerEvents = "none";
      ripple.style.zIndex = "999998";
      ripple.style.transform = "translate(-50%, -50%)";
      document.body.appendChild(ripple);

      gsap.to(ripple, {
        scale: 4,
        opacity: 0,
        duration: 0.45,
        ease: "power2.out",
        onComplete: () => ripple.remove(),
      });

      // ২. সূক্ষ্ম শান্ত ডাস্ট কণা (সংখ্যা কমিয়ে মাত্র ৭টি করা হয়েছে)
      const particleCount = 7;

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");

        // কণার সাইজ একদম ছোট ও প্রিমিয়াম (২ থেকে ৩.৫ পিক্সেল)
        const size = gsap.utils.random(2, 3.5);
        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        particle.style.position = "fixed";
        particle.style.left = `${e.clientX}px`;
        particle.style.top = `${e.clientY}px`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.borderRadius = "9999px";
        particle.style.background = randomColor;
        particle.style.pointerEvents = "none";
        particle.style.zIndex = "999999";
        particle.style.transform = "translate(-50%, -50%)";

        // হালকা সফট আভা (চোখে লাগবে না)
        particle.style.boxShadow = `0 0 6px ${randomColor}`;

        document.body.appendChild(particle);

        // শান্ত ও মসৃণ ড্রিফট
        gsap.to(particle, {
          x: gsap.utils.random(-35, 35),
          y: gsap.utils.random(-35, 35),
          scale: 0.2,
          opacity: 0,
          duration: gsap.utils.random(0.4, 0.6),
          ease: "power2.out",
          onComplete: () => particle.remove(),
        });
      }
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  return null;
}
