"use client";

import { useEffect } from "react";
import gsap from "gsap";

export default function ClickParticles() {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      // 🎨 বন্দুকের গুলির স্পার্ক ও ফায়ারের সেরা কালার কম্বিনেশন
      const colors = ["#ffffff", "#ffcc00", "#ff6600", "#ff3300"];

      for (let i = 0; i < 15; i++) {
        const particle = document.createElement("div");

        // র্যান্ডম সাইজ ও ফায়ার কালার
        const size = gsap.utils.random(6, 10);
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

        // ✨ ফায়ারের গ্লো এফেক্ট
        particle.style.boxShadow = `0 0 10px ${randomColor}, 0 0 20px ${randomColor}`;

        document.body.appendChild(particle);

        gsap.to(particle, {
          x: gsap.utils.random(-90, 90),
          y: gsap.utils.random(-90, 90),
          scale: 0,
          opacity: 0,
          duration: gsap.utils.random(0.5, 0.8),
          ease: "power3.out",
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
