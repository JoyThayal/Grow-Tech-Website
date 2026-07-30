"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";

export default function StringAnimation() {
  const pathRef = useRef<SVGPathElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // SVG Center Y = 30
  const initialPath = "M 10 30 Q 500 30 990 30";

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isGrabbed = false;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();

      const relativeX = e.clientX - rect.left;
      const relativeY = e.clientY - rect.top;

      const svgX = (relativeX / rect.width) * 1000;
      const svgY = (relativeY / rect.height) * 60;

      // Mouse distance from string
      const distanceFromString = Math.abs(svgY - 30);

      // Grab when close to string
      if (distanceFromString < 12) {
        isGrabbed = true;
      }

      // Release only when very far
      if (distanceFromString > 80 && isGrabbed) {
        isGrabbed = false;

        gsap.to(pathRef.current, {
          attr: { d: initialPath },
          duration: 1.2,
          ease: "elastic.out(1, 0.15)",
          overwrite: "auto",
        });

        return;
      }

      if (isGrabbed) {
        // Increase pull strength
        const pullStrength = 2.5;

        const offsetY = (svgY - 30) * pullStrength;

        // Clamp so it doesn't go too far
        const newY = Math.max(-100, Math.min(160, 30 + offsetY));

        const path = `M 10 30 Q ${svgX} ${newY} 990 30`;

        gsap.to(pathRef.current, {
          attr: { d: path },
          duration: 0.05,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    const handleMouseLeave = () => {
      if (isGrabbed) {
        isGrabbed = false;

        gsap.to(pathRef.current, {
          attr: { d: initialPath },
          duration: 1.2,
          ease: "elastic.out(1, 0.15)",
          overwrite: "auto",
        });
      }
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full flex items-center justify-center my-2 py-2 select-none overflow-hidden"
    >
      <svg
        viewBox="0 0 1000 60"
        className="w-full h-12 overflow-visible"
        preserveAspectRatio="none"
      >
        {/* Invisible Touch Zone */}
        <path
          d={initialPath}
          stroke="transparent"
          strokeWidth="20"
          className="cursor-pointer"
        />

        {/* Visible String */}
        <path
          ref={pathRef}
          d={initialPath}
          stroke="#00e5ff"
          strokeWidth="2.5"
          fill="transparent"
          strokeLinecap="round"
          className="pointer-events-none"
        />
      </svg>
    </div>
  );
}
