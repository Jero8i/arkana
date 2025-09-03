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
        <div className="relative group">
          {/* Glow effect behind logo */}
          <div className="absolute inset-0 bg-gradient-to-r from-teal-400/20 to-cyan-400/20 blur-3xl scale-110 opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
          
          <Image
            src="/arkana-logo.png"
            alt="Arkana Studio"
            width={800}
            height={300}
            className="mx-auto relative z-10 drop-shadow-2xl hover:scale-105 transition-transform duration-300"
            priority
          />
        </div>
        
        {/* Subtitle with gradient */}

      </div>
    </header>
  );
}