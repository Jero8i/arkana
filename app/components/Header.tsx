"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headerRef.current && logoRef.current) {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" }
      );
      
      gsap.fromTo(
        logoRef.current,
        { scale: 0.5, opacity: 0, rotationY: 180 },
        { scale: 1, opacity: 1, rotationY: 0, duration: 2, delay: 0.5, ease: "back.out(1.7)" }
      );

      // Floating animation
      gsap.to(logoRef.current, {
        y: -10,
        duration: 3,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
        delay: 2.5
      });
    }
  }, []);

  return (
    <header ref={headerRef} className="text-center mb-12 py-12 relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-teal-900/20 via-transparent to-transparent pointer-events-none" />
      
      {/* Animated particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-teal-400/30 rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-cyan-400/40 rounded-full animate-ping" />
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-teal-300/20 rounded-full animate-pulse" />
      </div>

      <div ref={logoRef} className="relative z-10 mb-4">
        <div className="relative group inline-block">
          {/* Gradient backdrop */}
          <div className="absolute -inset-8 bg-gradient-to-br from-teal-500/30 via-cyan-500/20 to-blue-500/30 rounded-3xl blur-2xl opacity-60 group-hover:opacity-80 transition-all duration-500" />
          
          {/* Secondary glow */}
          <div className="absolute -inset-4 bg-gradient-to-r from-teal-400/40 to-cyan-400/40 rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-all duration-300" />
          
          {/* Logo container with enhanced styling */}
          <div className="relative bg-gradient-to-br from-white/95 to-gray-50/95 backdrop-blur-sm rounded-2xl p-4 shadow-2xl border border-white/20 group-hover:shadow-teal-500/25 transition-all duration-300">
            <Image
              src="/logo.jpg"
              alt="Arkana Studio"
              width={600}
              height={300}
              className="mx-auto relative z-10 rounded-xl hover:scale-105 transition-transform duration-300"
              priority
            />
          </div>
        </div>
      </div>
    </header>
  );
}