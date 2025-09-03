"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function NuestroEquipo() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const equipmentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionRef.current && titleRef.current && equipmentRef.current) {
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
            toggleActions: "play none none reverse"
          }
        }
      );

      gsap.fromTo(
        equipmentRef.current.children,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: equipmentRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  const equipment = [
    {
      number: "01",
      title: "Celular de alta Calidad",
      subtitle: "iPhone 13 – Cámara de alta calidad",
      description: "Captura en resolución profesional y me permite trabajar con rapidez en rodajes, registros espontáneos o detrás de escena. Ideal para generar contenido ágil y de calidad para redes sociales.",
      icon: "📱"
    },
    {
      number: "02",
      title: "Cámara de fotos",
      subtitle: "Nikon D3200 + lente 18–200 mm",
      description: "Versatilidad para fotografía y video. El rango del lente me permite cubrir desde planos generales hasta detalles, aportando variedad estética y precisión en la composición.",
      icon: "📷"
    },
    {
      number: "03",
      title: "Estabilizadores y trípodes",
      subtitle: "DJI Osmo Mobile (estabilizador)",
      description: "Aporta fluidez y profesionalismo a las tomas con celular. Permite movimientos suaves y dinámicos que elevan la narrativa visual en registros rápidos o creativos.",
      icon: "🎬"
    },
    {
      number: "04",
      title: "Drone",
      subtitle: "Drone DJI Mini",
      description: "Herramienta para capturar planos aéreos y perspectivas únicas. Enriquece la narración audiovisual con imágenes que transmiten amplitud, contexto y un factor diferencial.",
      icon: "🚁"
    }
  ];

  return (
    <section ref={sectionRef} className="mb-16 bg-slate-800/30 rounded-3xl p-8 border border-white/10">
      <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent">
        Nuestro Equipo
      </h2>
      
      <div ref={equipmentRef} className="grid md:grid-cols-2 gap-6">
        {equipment.map((item) => (
          <div key={item.number} className="bg-slate-700/30 rounded-xl p-6 border border-white/5 hover:border-teal-400/20 transition-colors">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-teal-400/20 rounded-full flex items-center justify-center text-teal-300 font-bold text-lg border border-teal-400/30">
                  {item.number}
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{item.icon}</span>
                  <h3 className="font-semibold text-teal-300 text-lg">{item.title}</h3>
                </div>
                <h4 className="font-medium text-slate-200 mb-3">{item.subtitle}</h4>
                <p className="text-slate-300 text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}