"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function QuienesSomos() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current && titleRef.current && contentRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo(
        contentRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 40, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 90%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    }
  }, []);

  return (
    <section ref={sectionRef} className="mb-16 bg-slate-800/30 rounded-3xl p-8 border border-white/10">
      <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent">
        Quiénes Somos
      </h2>
      
      <div ref={contentRef} className="max-w-4xl mx-auto space-y-6">
        <p className="text-lg text-slate-200 leading-relaxed">
          Somos <strong className="text-teal-300">Irupé y Delfina</strong>, dos jóvenes creativas que 
          estudiamos Dirección y Producción Audiovisual y decidimos formar nuestra propia productora. 
          Nos apasiona capturar momentos y transformar ideas en imágenes con identidad.
        </p>
        
        <p className="text-lg text-slate-200 leading-relaxed">
          Ofrecemos servicios de fotografía y comunicación visual: books personales, 
          cobertura de eventos, fotografía de producto y creación de contenido para redes sociales. 
          Trabajamos con un estilo profesional pero cercano, buscando siempre que cada proyecto 
          tenga un sello auténtico y único.
        </p>
        
        <div ref={cardsRef} className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="text-center p-4 bg-slate-700/30 rounded-xl border border-white/5">
            <div className="text-3xl mb-2">🌟</div>
            <h3 className="font-semibold text-teal-300 mb-2">Frescura</h3>
            <p className="text-sm text-slate-300">Perspectiva joven y creativa en cada proyecto</p>
          </div>
          
          <div className="text-center p-4 bg-slate-700/30 rounded-xl border border-white/5">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="font-semibold text-teal-300 mb-2">Agilidad</h3>
            <p className="text-sm text-slate-300">Entregas rápidas sin comprometer la calidad</p>
          </div>
          
          <div className="text-center p-4 bg-slate-700/30 rounded-xl border border-white/5">
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="font-semibold text-teal-300 mb-2">Personalización</h3>
            <p className="text-sm text-slate-300">Cada proyecto adaptado a tus necesidades específicas</p>
          </div>
        </div>
      </div>
    </section>
  );
}