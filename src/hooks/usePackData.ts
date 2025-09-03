import { useState, useEffect } from 'react';
import type { PackData } from '../components/AdminPanel';

const DEFAULT_PACKS: PackData = {
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

export function usePackData() {
  const [packData, setPackData] = useState<PackData>(DEFAULT_PACKS);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const ADMIN_PASSWORD = 'arkana!77';

  useEffect(() => {
    const saved = localStorage.getItem('photography-packs');
    if (saved) {
      try {
        setPackData(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading saved packs:', e);
      }
    }

    const adminMode = localStorage.getItem('photography-admin') === 'true';
    setIsAdmin(adminMode);
  }, []);

  const updatePacks = (newData: PackData) => {
    setPackData(newData);
    localStorage.setItem('photography-packs', JSON.stringify(newData));
  };

  const toggleAdmin = () => {
    if (isAdmin) {
      setIsAdmin(false);
      localStorage.setItem('photography-admin', 'false');
    } else {
      setShowLogin(true);
    }
  };

  const handleLogin = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      localStorage.setItem('photography-admin', 'true');
      setTimeout(() => {
        const pricingSection = document.querySelector('section[data-pricing-section]');
        if (pricingSection) {
          pricingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      return true;
    }
    return false;
  };

  const resetPacks = () => {
    setPackData(DEFAULT_PACKS);
    localStorage.removeItem('photography-packs');
  };

  // Ensure we always have at least one category
  useEffect(() => {
    if (Object.keys(packData).length === 0) {
      setPackData(DEFAULT_PACKS);
    }
  }, [packData]);

  return {
    packData,
    updatePacks,
    isAdmin,
    toggleAdmin,
    resetPacks,
    showLogin,
    setShowLogin,
    handleLogin
  };
}