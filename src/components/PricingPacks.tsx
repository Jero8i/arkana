import React, { useState, useEffect } from "react";

interface PricingPacksProps {
  showForm: boolean;
  setShowForm: (show: boolean) => void;
  onPackSelect?: (packInfo: { service: string; tier: string; price: string; serviceKey?: string }) => void;
}

export default function PricingPacks({ showForm, setShowForm, onPackSelect }: PricingPacksProps) {
  const [tab, setTab] = useState<"book" | "producto" | "redes" | "eventos">("book");
  const [showModal, setShowModal] = useState(false);
  const [selectedPack, setSelectedPack] = useState<{ service: string; tier: string; price: string } | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const PACKS: Record<string, {
    title: string;
    blurb: string;
    tiers: { name: string; price: string; priceNote?: string; features: string[] }[];
  }> = {
    book: {
      title: "Book de fotos (retrato)",
      blurb: "Sesiones pensadas para armar o renovar tu porfolio: dirección de poses, luz cuidada y retoque profesional.",
      tiers: [
        {
          name: "Básico",
          price: "$120.000",
          features: [
            "1 h de sesión · 1 locación (exterior o estudio)",
            "1 cambio de vestuario",
            "25 fotos editadas (color/luz)",
            "5 retoques de piel de alta calidad",
            "Entrega en carpeta online · 3–5 días hábiles",
          ],
        },
        {
          name: "Intermedio",
          price: "$180.000",
          features: [
            "2 h · hasta 2 locaciones cercanas",
            "2–3 cambios de vestuario",
            "45 fotos editadas",
            "10 retoques de piel",
            "1 reel vertical de 20–30s",
            "Entrega 3–5 días hábiles",
          ],
        },
        {
          name: "Premium",
          price: "$240.000",
          features: [
            "3 h · estudio incluido",
            "3–4 cambios + asesoría de poses",
            "70 fotos editadas",
            "20 retoques de piel",
            "2 reels (15–30s)",
            "10 impresiones 10×15",
          ],
        },
      ],
    },
    producto: {
      title: "Foto producto / catálogo",
      blurb: "Imágenes limpias y consistentes para e‑commerce y marketplaces. Flujo preparado para volumen y velocidad.",
      tiers: [
        {
          name: "Básico",
          price: "$220.000",
          features: [
            "Hasta 15 productos",
            "3 ángulos por producto (45 fotos) — fondo blanco",
            "PNG recortado + 2000px lado mayor",
            "Renombrado por SKU",
            "Entrega 5 días hábiles",
          ],
        },
        {
          name: "Intermedio",
          price: "$300.000",
          features: [
            "Hasta 30 productos",
            "4 ángulos + 1 detalle macro (≈150 fotos)",
            "Fondo blanco + sombras naturales / infinito",
            "Variantes para ML y Shopify",
            "1 GIF o mini‑reel behind the scenes",
            "Entrega 5–7 días hábiles",
          ],
        },
        {
          name: "Premium",
          price: "$420.000",
          features: [
            "Hasta 60 productos",
            "5 ángulos por producto (≈300 fotos)",
            "Mix e‑commerce + lifestyle (props básicos incluidos)",
            "2 reels (15–30s) o 1 stop‑motion",
            "Mini catálogo PDF 8–12 páginas",
            "Entrega 7–10 días hábiles",
          ],
        },
      ],
    },
    redes: {
      title: "Redes sociales (plan mensual)",
      blurb: "Contenido mensual listo para publicar: fotos, reels, copies y calendario. Opcional: métricas y coordinación de pauta.",
      tiers: [
        {
          name: "Básico",
          price: "$260.000",
          priceNote: "/mes",
          features: [
            "8 posts estáticos + 2 reels + 8 stories",
            "1 sesión de contenido de 2 h/mes",
            "Calendario editorial + copies y hashtags",
            "1 ronda de cambios",
          ],
        },
        {
          name: "Intermedio",
          price: "$340.000",
          priceNote: "/mes",
          features: [
            "12 posts + 4 reels + 16 stories",
            "1 sesión de 4 h/mes",
            "Edición de video y subtítulos",
            "2 plantillas de diseño reutilizables",
            "Reporte simple de métricas",
          ],
        },
        {
          name: "Premium",
          price: "$480.000",
          priceNote: "/mes",
          features: [
            "16 posts + 6 reels + 24 stories",
            "Hasta 6 h de producción (pueden ser 2 jornadas)",
            "Guiones de reels + dirección creativa",
            "Community management light (3 días/semana)",
            "Reporte avanzado + coordinación de pauta (honorarios incluidos; inversión no incluida)",
          ],
        },
      ],
    },
    eventos: {
      title: "Cobertura de eventos",
      blurb: "Cobertura foto + video para eventos sociales, corporativos y culturales. Entrega lista para redes.",
      tiers: [
        {
          name: "Básico",
          price: "$230.000",
          features: [
            "Cobertura audiovisual de 3 hs.",
            "Fotografía: 30 fotos editadas (momentos clave: gente, barra, detalles de marca).",
            "Video: 2 reels de 30s (Instagram/TikTok)",
            "1 video resumen de 1 min (vertical)",
            "Entrega digital en carpeta online",
            "Plazo de entrega: 3–5 días hábiles",
          ],
        },
        {
          name: "Intermedio",
          price: "$300.000",
          features: [
            "Cobertura audiovisual de 5 hs.",
            "Fotografía: 50 fotos editadas (retratos, grupales, detalles de comida/bebida, ambientación).",
            "Video: 4 reels de 30s",
            "1 video de 1:30 min",
            "Entrega digital en carpeta online",
            "Plazo de entrega: 5 días hábiles",
          ],
        },
        {
          name: "Premium",
          price: "$350.000",
          features: [
            "Cobertura audiovisual de 7 hs.",
            "Fotografía: 100 fotos editadas (cobertura completa: asistentes, grupos, artistas, detalles, locación día y noche).",
            "Video: 6 reels de 30s",
            "1 video largo de 2:30–3 min",
            "1 video web de 1 min",
            "Entrega digital en carpeta online",
            "Plazo de entrega: 5–7 días hábiles",
          ],
        },
      ],
    },
  };

  const tabs: { key: "book" | "producto" | "redes" | "eventos"; label: string; emoji: string }[] = [
    { key: "book", label: "Book", emoji: "📸" },
    { key: "producto", label: "Producto/Catálogo", emoji: "📦" },
    { key: "redes", label: "Redes", emoji: "✨" },
    { key: "eventos", label: "Eventos", emoji: "🎉" },
  ];

  const Check = () => (
    <svg viewBox="0 0 24 24" className="w-5 h-5 flex-none" aria-hidden>
      <path d="M20 6 9 17l-5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const Diamond = () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6" aria-hidden>
      <path d="M6 3h12l4 6-10 12L2 9 6 3zm0 0 6 12L18 3M2 9h20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <div className={`flex justify-center gap-2 mb-6 flex-wrap transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: '0.8s' }}>
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={[
                "px-4 py-2 rounded-full text-sm md:text-base transition",
                tab === t.key
                  ? "bg-teal-400/20 text-teal-300 ring-1 ring-inset ring-teal-400/40"
                  : "bg-white/5 text-slate-300 hover:bg-white/10",
              ].join(" ")}
            >
              <span className="mr-1">{t.emoji}</span>
              {t.label}
            </button>
          ))}
        </div>

        <section className="mb-10">
          <h2 className={`text-center text-2xl md:text-3xl font-medium mb-2 flex items-center justify-center gap-2 transition-all duration-800 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
            <Diamond /> {PACKS[tab].title}
          </h2>
          <p className={`text-center text-slate-300 max-w-3xl mx-auto mb-6 transition-all duration-600 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: '0.2s' }}>{PACKS[tab].blurb}</p>

          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {PACKS[tab].tiers.map((tier, i) => (
              <div
                key={tier.name}
                className={`rounded-2xl bg-slate-800/60 border border-white/10 shadow-xl p-6 flex flex-col transition-all duration-800 ${isLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}`}
                style={{ transitionDelay: `${0.4 + i * 0.15}s` }}
              >
                <div className="flex items-center gap-2 text-teal-300 mb-1">
                  <Diamond />
                  <span className="uppercase tracking-wide text-sm">{tier.name}</span>
                </div>
                <div className="text-3xl md:text-4xl font-semibold mb-4">
                  {tier.price}
                  {tier.priceNote && (
                    <span className="text-lg text-slate-300 align-baseline"> {tier.priceNote}</span>
                  )}
                </div>
                <ul className="space-y-2 text-slate-200">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="mt-0.5 text-teal-300"><Check /></span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <button 
                    onClick={() => {
                      setSelectedPack({
                        service: PACKS[tab].title,
                        tier: tier.name,
                        price: tier.price + (tier.priceNote || '')
                      });
                      setShowModal(true);
                    }}
                    className="w-full rounded-xl bg-teal-500/90 hover:bg-teal-400 text-slate-900 font-medium py-2.5 transition cursor-pointer"
                    type="button"
                  >
                    Pedir este pack
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={`border-t border-white/10 pt-6 transition-all duration-800 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '1.2s' }}>
          <h3 className="text-xl font-medium mb-2">Extras y Condiciones</h3>
          <ul className="grid md:grid-cols-2 gap-x-6 gap-y-2 text-slate-300 text-sm">
            <li>Hora extra de producción: <span className="text-slate-100 font-medium">$35.000</span></li>
            <li>Desplazamientos, alquileres de locación/props y MUAH: a cotizar.</li>
            <li>Derechos de uso incluidos para web y redes; campañas masivas/OOH a cotizar.</li>
            <li>Reserva del 30% para bloquear fecha.</li>
            <li>Precios de referencia (ARS) 2025. Sujetos a ajuste por alcance.</li>
          </ul>
        </section>

        <section className={`mt-10 bg-white/5 rounded-2xl p-6 border border-white/10 transition-all duration-800 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '1.4s' }}>
          <h3 className="text-xl font-medium mb-2">¿Necesitás algo personalizado?</h3>
          <p className="text-slate-200">
            Además de nuestros packs, ofrecemos presupuestos personalizados según tu propuesta. 
            Cada proyecto es único y nos adaptamos a tus necesidades específicas de alcance, 
            locaciones, props, tiempos y cantidad de piezas.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button 
              onClick={() => setShowForm(!showForm)}
              className="rounded-xl bg-teal-500/90 hover:bg-teal-400 text-slate-900 font-medium px-4 py-2 cursor-pointer"
              type="button"
            >
              {showForm ? 'Ocultar Formulario' : 'Solicitar Presupuesto'}
            </button>
            <button className="rounded-xl bg-white/10 hover:bg-white/20 text-slate-100 font-medium px-4 py-2">Contactar por WhatsApp</button>
          </div>
        </section>

      {/* Modal */}
      {showModal && selectedPack && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-slate-800 rounded-2xl p-6 max-w-md w-full border border-white/10">
            <h3 className="text-xl font-semibold mb-4 text-teal-300">
              {selectedPack.service} - {selectedPack.tier}
            </h3>
            <p className="text-slate-300 mb-6">
              Precio: <span className="font-semibold text-white">{selectedPack.price}</span>
            </p>
            <p className="text-slate-300 mb-6">
              ¿Cómo te gustaría contactarnos?
            </p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  const serviceMap: Record<string, string> = {
                    "Book de fotos (retrato)": "book",
                    "Foto producto / catálogo": "producto", 
                    "Redes sociales (plan mensual)": "redes",
                    "Cobertura de eventos": "eventos"
                  };
                  onPackSelect?.({
                    ...selectedPack,
                    serviceKey: serviceMap[selectedPack.service] || "personalizado"
                  });
                  setShowForm(true);
                  setShowModal(false);
                  setTimeout(() => {
                    document.querySelector('[data-form-section]')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="w-full bg-teal-500/90 hover:bg-teal-400 text-slate-900 font-medium py-3 rounded-xl transition"
              >
                📧 Enviar Email
              </button>
              <button
                onClick={() => {
                  const message = `Hola! Me interesa el pack ${selectedPack.service} - ${selectedPack.tier} (${selectedPack.price}). ¿Podrían darme más información?`;
                  window.open(`https://wa.me/6492616149877?text=${encodeURIComponent(message)}`, '_blank');
                  setShowModal(false);
                }}
                className="w-full bg-green-600 hover:bg-green-500 text-white font-medium py-3 rounded-xl transition"
              >
                💬 WhatsApp
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="w-full bg-slate-600 hover:bg-slate-500 text-slate-200 font-medium py-2 rounded-xl transition"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}