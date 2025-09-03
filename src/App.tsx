import { useState } from 'react'
import Header from './components/Header'
import QuienesSomos from './components/QuienesSomos'
import NuestroEquipo from './components/NuestroEquipo'
import PricingPacks from './components/PricingPacks'
import SolicitarPresupuesto from './components/SolicitarPresupuesto'

export default function App() {
  const [showForm, setShowForm] = useState(false);
  const [selectedPackInfo, setSelectedPackInfo] = useState<{ service: string; tier: string; price: string; serviceKey?: string } | null>(null);

  const handlePackSelect = (packInfo: { service: string; tier: string; price: string; serviceKey?: string }) => {
    setSelectedPackInfo(packInfo);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-slate-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <Header />
        <QuienesSomos />
        <NuestroEquipo />
        <PricingPacks showForm={showForm} setShowForm={setShowForm} onPackSelect={handlePackSelect} />
        {showForm && <SolicitarPresupuesto selectedPack={selectedPackInfo} />}
      </div>
    </div>
  )
}