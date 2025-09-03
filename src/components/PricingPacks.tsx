"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AdminPanel from './AdminPanel';
import AdminLogin from './AdminLogin';
import { usePackData } from '../hooks/usePackData';

// Ensure GSAP is only initialized on client side
let gsapInitialized = false;

const initGSAP = () => {
  if (typeof window !== "undefined" && !gsapInitialized) {
    gsap.registerPlugin(ScrollTrigger);
    gsapInitialized = true;
  }
};

interface PricingPacksProps {
  showForm: boolean;
  setShowForm: (show: boolean) => void;
  onPackSelect?: (packInfo: { service: string; tier: string; price: string; serviceKey?: string }) => void;
}

export default function PricingPacks({ showForm, setShowForm, onPackSelect }: PricingPacksProps) {
  const { packData, updatePacks, isAdmin, toggleAdmin, resetPacks, showLogin, setShowLogin, handleLogin } = usePackData();
  const [tab, setTab] = useState<string>(Object.keys(packData)[0] || 'book');
  const [showModal, setShowModal] = useState(false);
  const [selectedPack, setSelectedPack] = useState<{ service: string; tier: string; price: string } | null>(null);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const blurbRef = useRef<HTMLParagraphElement>(null);
  const extrasRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);



  const defaultTabs = [
    { key: "book", label: "Book", emoji: "📸" },
    { key: "producto", label: "Producto/Catálogo", emoji: "📦" },
    { key: "redes", label: "Redes", emoji: "✨" },
    { key: "eventos", label: "Eventos", emoji: "🎉" },
  ];

  const tabs = Object.keys(packData).map(key => {
    const defaultTab = defaultTabs.find(t => t.key === key);
    return defaultTab || { key, label: packData[key].title.split(' ')[0], emoji: "📋" };
  });

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
    initGSAP();
    if (tabsRef.current && typeof window !== "undefined") {
      gsap.fromTo(
        tabsRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out", delay: 0.8 }
      );
    }
  }, []);

  useEffect(() => {
    initGSAP();
    if (titleRef.current && blurbRef.current && cardsRef.current && typeof window !== "undefined") {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)" }
      );
      
      gsap.fromTo(
        blurbRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: "power2.out" }
      );
      
      gsap.fromTo(
        cardsRef.current.children,
        { opacity: 0, y: 40, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.15, delay: 0.4, ease: "back.out(1.7)" }
      );
    }
  }, [tab]);

  useEffect(() => {
    initGSAP();
    if (extrasRef.current && contactRef.current && typeof window !== "undefined") {
      const timer = setTimeout(() => {
        gsap.fromTo(
          extrasRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: extrasRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );

        gsap.fromTo(
          contactRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: contactRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <section data-pricing-section className="mb-16 bg-slate-800/30 rounded-3xl p-8 border border-white/10">
      {isAdmin && (
        <div className="flex justify-center gap-2 mb-6">
          <button
            onClick={() => setShowAdminPanel(true)}
            className="bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 px-4 py-2 rounded-lg text-sm border border-orange-500/40"
          >
            ⚙️ Admin Panel
          </button>
          <button
            onClick={resetPacks}
            className="bg-red-500/20 hover:bg-red-500/30 text-red-300 px-4 py-2 rounded-lg text-sm border border-red-500/40"
          >
            🔄 Reset Data
          </button>
          <button
            onClick={toggleAdmin}
            className="bg-slate-500/20 hover:bg-slate-500/30 text-slate-300 px-4 py-2 rounded-lg text-sm border border-slate-500/40"
          >
            👤 Exit Admin
          </button>
        </div>
      )}
      
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent">
        Planes que se Adaptan a Ti
      </h2>
      
      <div ref={tabsRef} className="flex justify-center gap-2 mb-6 flex-wrap">
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
          <h2 ref={titleRef} className="text-center text-2xl md:text-3xl font-medium mb-2 flex items-center justify-center gap-2">
            <Diamond /> {packData[tab].title}
          </h2>
          <p ref={blurbRef} className="text-center text-slate-300 max-w-3xl mx-auto mb-6">{packData[tab].blurb}</p>

          <div ref={cardsRef} className="grid md:grid-cols-3 gap-4 md:gap-6">
            {packData[tab].tiers.map((tier) => (
              <div
                key={tier.name}
                className="rounded-2xl bg-slate-800/60 border border-white/10 shadow-xl p-6 flex flex-col"
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
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      try {
                        console.log('Button clicked:', tier.name);
                        setSelectedPack({
                          service: packData[tab].title,
                          tier: tier.name,
                          price: tier.price + (tier.priceNote || '')
                        });
                        setShowModal(true);
                      } catch (error) {
                        console.error('Button click error:', error);
                        alert('Error: ' + (error instanceof Error ? error.message : String(error)));
                      }
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

        <section ref={extrasRef} className="border-t border-white/10 pt-6">
          <h3 className="text-xl font-medium mb-2">Extras y Condiciones</h3>
          <ul className="grid md:grid-cols-2 gap-x-6 gap-y-2 text-slate-300 text-sm">
            <li>Hora extra de producción: <span className="text-slate-100 font-medium">$35.000</span></li>
            <li>Desplazamientos, alquileres de locación/props y MUAH: a cotizar.</li>
            <li>Derechos de uso incluidos para web y redes; campañas masivas/OOH a cotizar.</li>
            <li>Reserva del 30% para bloquear fecha.</li>
            <li>Precios de referencia (ARS) 2025. Sujetos a ajuste por alcance.</li>
          </ul>
        </section>

        <section ref={contactRef} className="mt-10 bg-white/5 rounded-2xl p-6 border border-white/10">
          <h3 className="text-xl font-medium mb-2">¿Necesitás algo personalizado?</h3>
          <p className="text-slate-200">
            Además de nuestros packs, ofrecemos presupuestos personalizados según tu propuesta. 
            Cada proyecto es único y nos adaptamos a tus necesidades específicas de alcance, 
            locaciones, props, tiempos y cantidad de piezas.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button 
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                try {
                  console.log('Solicitar button clicked, current showForm:', showForm);
                  setShowForm(!showForm);
                } catch (error) {
                  console.error('Solicitar button error:', error);
                  alert('Error: ' + (error instanceof Error ? error.message : String(error)));
                }
              }}
              className="rounded-xl bg-teal-500/90 hover:bg-teal-400 text-slate-900 font-medium px-4 py-2 cursor-pointer"
              type="button"
            >
              {showForm ? 'Ocultar Formulario' : 'Solicitar Presupuesto'}
            </button>
            <button className="rounded-xl bg-white/10 hover:bg-white/20 text-slate-100 font-medium px-4 py-2">Contactar por WhatsApp</button>
          </div>
        </section>

      <footer className="text-center text-xs text-slate-400 mt-8">
        <button
          onClick={toggleAdmin}
          className="text-slate-500 hover:text-slate-400 text-xs"
        >
          {isAdmin ? '👤 Exit Admin' : '🔐 Admin'}
        </button>
      </footer>

      <AdminPanel
        isOpen={showAdminPanel}
        onClose={() => setShowAdminPanel(false)}
        packData={packData}
        onUpdatePacks={updatePacks}
      />

      <AdminLogin
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onLogin={handleLogin}
      />

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
                  const serviceMap: Record<string, string> = {};
                  Object.keys(packData).forEach(key => {
                    serviceMap[packData[key].title] = key;
                  });
                  onPackSelect?.({
                    ...selectedPack,
                    serviceKey: serviceMap[selectedPack.service] || tab
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
                  window.open(`https://wa.me/5492257400465?text=${encodeURIComponent(message)}`, '_blank');
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
    </section>
  );
}