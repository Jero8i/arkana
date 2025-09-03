"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SolicitarPresupuestoProps {
  selectedPack?: { service: string; tier: string; price: string; serviceKey?: string } | null;
}

export default function SolicitarPresupuesto({ selectedPack }: SolicitarPresupuestoProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    servicio: selectedPack?.serviceKey || "",
    mensaje: selectedPack ? `Me interesa el pack ${selectedPack.service} - ${selectedPack.tier} (${selectedPack.price}). ` : ""
  });

  useEffect(() => {
    if (selectedPack) {
      setFormData({
        nombre: "",
        email: "",
        telefono: "",
        servicio: selectedPack.serviceKey || "",
        mensaje: `Me interesa el pack ${selectedPack.service} - ${selectedPack.tier} (${selectedPack.price}). `
      });
    }
  }, [selectedPack]);

  useEffect(() => {
    if (sectionRef.current && formRef.current) {
      gsap.fromTo(
        sectionRef.current.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission here
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section ref={sectionRef} data-form-section className="mb-16 bg-slate-800/30 rounded-3xl p-8 border border-white/10">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent">
        Solicitar Presupuesto
      </h2>
      
      <form ref={formRef} onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Nombre *
            </label>
            <input
              type="text"
              name="nombre"
              required
              value={formData.nombre}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-700/50 border border-white/10 rounded-xl text-slate-100 placeholder-slate-400 focus:border-teal-400 focus:outline-none transition-colors"
              placeholder="Tu nombre completo"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Email *
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-700/50 border border-white/10 rounded-xl text-slate-100 placeholder-slate-400 focus:border-teal-400 focus:outline-none transition-colors"
              placeholder="tu@email.com"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Teléfono
            </label>
            <input
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-700/50 border border-white/10 rounded-xl text-slate-100 placeholder-slate-400 focus:border-teal-400 focus:outline-none transition-colors"
              placeholder="+54 9 11 1234-5678"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Servicio de interés *
            </label>
            <select
              name="servicio"
              required
              value={formData.servicio}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-700/50 border border-white/10 rounded-xl text-slate-100 focus:border-teal-400 focus:outline-none transition-colors"
            >
              <option value="">Seleccionar servicio</option>
              <option value="book">Book de fotos (retrato)</option>
              <option value="producto">Foto producto / catálogo</option>
              <option value="redes">Redes sociales (plan mensual)</option>
              <option value="eventos">Cobertura de eventos</option>
              <option value="personalizado">Proyecto personalizado</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Contanos sobre tu proyecto *
          </label>
          <textarea
            name="mensaje"
            required
            rows={4}
            value={formData.mensaje}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-700/50 border border-white/10 rounded-xl text-slate-100 placeholder-slate-400 focus:border-teal-400 focus:outline-none transition-colors resize-none"
            placeholder="Describí tu proyecto, fechas, locación, cantidad de fotos, etc."
          />
        </div>

        <button
          type="submit"
          className="w-full bg-teal-500/90 hover:bg-teal-400 text-slate-900 font-medium py-3 px-6 rounded-xl transition-colors"
        >
          Enviar Solicitud
        </button>
      </form>
    </section>
  );
}