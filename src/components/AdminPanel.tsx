import { useState } from 'react';

export interface PackTier {
  name: string;
  price: string;
  priceNote?: string;
  features: string[];
}

export interface PackCategory {
  title: string;
  blurb: string;
  tiers: PackTier[];
}

export type PackData = Record<string, PackCategory>;

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  packData: PackData;
  onUpdatePacks: (newData: PackData) => void;
}

export default function AdminPanel({ isOpen, onClose, packData, onUpdatePacks }: AdminPanelProps) {
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [newCategoryKey, setNewCategoryKey] = useState('');
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [, setEditingTier] = useState<number | null>(null);
  const [formData, setFormData] = useState<PackCategory | null>(null);

  if (!isOpen) return null;

  const defaultCategories = [
    { key: 'book', label: 'Book de fotos', emoji: '📸' },
    { key: 'producto', label: 'Producto/Catálogo', emoji: '📦' },
    { key: 'redes', label: 'Redes sociales', emoji: '✨' },
    { key: 'eventos', label: 'Eventos', emoji: '🎉' },
  ];

  const categories = Object.keys(packData).map(key => {
    const defaultCat = defaultCategories.find(c => c.key === key);
    return defaultCat || { key, label: packData[key].title, emoji: '📋' };
  });

  const startEdit = (categoryKey: string, tierIndex?: number) => {
    setEditingCategory(categoryKey);
    setEditingTier(tierIndex ?? null);
    setFormData(JSON.parse(JSON.stringify(packData[categoryKey])));
  };

  const saveChanges = () => {
    if (!editingCategory || !formData) return;
    
    const newData = { ...packData };
    newData[editingCategory] = formData;
    onUpdatePacks(newData);
    setEditingCategory(null);
    setEditingTier(null);
    setFormData(null);
  };

  const addTier = () => {
    if (!formData) return;
    const newTier: PackTier = {
      name: 'Nuevo Plan',
      price: '$0',
      features: ['Nueva característica']
    };
    setFormData({
      ...formData,
      tiers: [...formData.tiers, newTier]
    });
  };

  const removeTier = (index: number) => {
    if (!formData) return;
    setFormData({
      ...formData,
      tiers: formData.tiers.filter((_, i) => i !== index)
    });
  };

  const addNewCategory = () => {
    if (!newCategoryKey.trim()) return;
    const newData = { ...packData };
    newData[newCategoryKey] = {
      title: 'Nueva Categoría',
      blurb: 'Descripción de la nueva categoría',
      tiers: [{ name: 'Básico', price: '$0', features: ['Nueva característica'] }]
    };
    onUpdatePacks(newData);
    setNewCategoryKey('');
    setShowNewCategory(false);
  };

  const deleteCategory = (categoryKey: string) => {
    if (Object.keys(packData).length <= 1) return;
    const newData = { ...packData };
    delete newData[categoryKey];
    onUpdatePacks(newData);
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-teal-300">Panel de Administración</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-2xl">×</button>
        </div>

        {!editingCategory ? (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Categorías</h3>
              <button
                onClick={() => setShowNewCategory(true)}
                className="bg-green-500/20 hover:bg-green-500/30 text-green-300 px-3 py-1 rounded-lg text-sm"
              >
                + Nueva Categoría
              </button>
            </div>

            {showNewCategory && (
              <div className="bg-slate-700/30 rounded-xl p-4 border border-white/10 mb-4">
                <h4 className="font-medium mb-3">Crear Nueva Categoría</h4>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={newCategoryKey}
                    onChange={(e) => setNewCategoryKey(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, ''))}
                    placeholder="clave-categoria"
                    className="flex-1 bg-slate-600 border border-white/20 rounded px-3 py-2 text-sm"
                  />
                  <button
                    onClick={addNewCategory}
                    className="bg-green-500/20 hover:bg-green-500/30 text-green-300 px-4 py-2 rounded text-sm"
                  >
                    Crear
                  </button>
                  <button
                    onClick={() => { setShowNewCategory(false); setNewCategoryKey(''); }}
                    className="bg-slate-600 hover:bg-slate-500 text-slate-200 px-4 py-2 rounded text-sm"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              {categories.map(cat => (
                <div key={cat.key} className="bg-slate-700/50 rounded-xl p-4 border border-white/10">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <span>{cat.emoji}</span>
                      {cat.label}
                    </h3>
                    {Object.keys(packData).length > 1 && (
                      <button
                        onClick={() => deleteCategory(cat.key)}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        ×
                      </button>
                    )}
                  </div>
                  <p className="text-slate-300 text-sm mb-3">{packData[cat.key].title}</p>
                  <div className="text-xs text-slate-400 mb-3">
                    {packData[cat.key].tiers.length} planes disponibles
                  </div>
                  <button
                    onClick={() => startEdit(cat.key)}
                    className="w-full bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 py-2 rounded-lg transition"
                  >
                    Editar Categoría
                  </button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={() => setEditingCategory(null)}
                className="text-slate-400 hover:text-white"
              >
                ← Volver
              </button>
              <h3 className="text-xl font-medium">
                Editando: {categories.find(c => c.key === editingCategory)?.label || editingCategory}
              </h3>
            </div>

            {formData && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Título</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full bg-slate-700 border border-white/20 rounded-lg px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Descripción</label>
                  <textarea
                    value={formData.blurb}
                    onChange={(e) => setFormData({ ...formData, blurb: e.target.value })}
                    className="w-full bg-slate-700 border border-white/20 rounded-lg px-3 py-2 text-white h-20"
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="text-lg font-medium">Planes</h4>
                    <button
                      onClick={addTier}
                      className="bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 px-3 py-1 rounded-lg text-sm"
                    >
                      + Agregar Plan
                    </button>
                  </div>

                  <div className="space-y-4">
                    {formData.tiers.map((tier, index) => (
                      <div key={index} className="bg-slate-700/30 rounded-lg p-4 border border-white/10">
                        <div className="flex justify-between items-start mb-3">
                          <h5 className="font-medium">Plan {index + 1}</h5>
                          <button
                            onClick={() => removeTier(index)}
                            className="text-red-400 hover:text-red-300 text-sm"
                          >
                            Eliminar
                          </button>
                        </div>

                        <div className="grid md:grid-cols-3 gap-3 mb-3">
                          <div>
                            <label className="block text-xs text-slate-400 mb-1">Nombre</label>
                            <input
                              type="text"
                              value={tier.name}
                              onChange={(e) => {
                                const newTiers = [...formData.tiers];
                                newTiers[index] = { ...tier, name: e.target.value };
                                setFormData({ ...formData, tiers: newTiers });
                              }}
                              className="w-full bg-slate-600 border border-white/20 rounded px-2 py-1 text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-slate-400 mb-1">Precio</label>
                            <input
                              type="text"
                              value={tier.price}
                              onChange={(e) => {
                                const newTiers = [...formData.tiers];
                                newTiers[index] = { ...tier, price: e.target.value };
                                setFormData({ ...formData, tiers: newTiers });
                              }}
                              className="w-full bg-slate-600 border border-white/20 rounded px-2 py-1 text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-slate-400 mb-1">Nota precio</label>
                            <input
                              type="text"
                              value={tier.priceNote || ''}
                              onChange={(e) => {
                                const newTiers = [...formData.tiers];
                                newTiers[index] = { ...tier, priceNote: e.target.value || undefined };
                                setFormData({ ...formData, tiers: newTiers });
                              }}
                              className="w-full bg-slate-600 border border-white/20 rounded px-2 py-1 text-sm"
                              placeholder="/mes"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-xs text-slate-400 mb-1">Características</label>
                          <div className="space-y-2">
                            {tier.features.map((feature, fIndex) => (
                              <div key={fIndex} className="flex gap-2">
                                <input
                                  type="text"
                                  value={feature}
                                  onChange={(e) => {
                                    const newTiers = [...formData.tiers];
                                    const newFeatures = [...tier.features];
                                    newFeatures[fIndex] = e.target.value;
                                    newTiers[index] = { ...tier, features: newFeatures };
                                    setFormData({ ...formData, tiers: newTiers });
                                  }}
                                  className="flex-1 bg-slate-600 border border-white/20 rounded px-2 py-1 text-sm"
                                />
                                <button
                                  onClick={() => {
                                    const newTiers = [...formData.tiers];
                                    const newFeatures = tier.features.filter((_, i) => i !== fIndex);
                                    newTiers[index] = { ...tier, features: newFeatures };
                                    setFormData({ ...formData, tiers: newTiers });
                                  }}
                                  className="text-red-400 hover:text-red-300 px-2"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                            <button
                              onClick={() => {
                                const newTiers = [...formData.tiers];
                                newTiers[index] = { ...tier, features: [...tier.features, 'Nueva característica'] };
                                setFormData({ ...formData, tiers: newTiers });
                              }}
                              className="text-teal-400 hover:text-teal-300 text-sm"
                            >
                              + Agregar característica
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-white/10">
                  <button
                    onClick={saveChanges}
                    className="bg-teal-500 hover:bg-teal-400 text-slate-900 font-medium px-6 py-2 rounded-lg"
                  >
                    Guardar Cambios
                  </button>
                  <button
                    onClick={() => setEditingCategory(null)}
                    className="bg-slate-600 hover:bg-slate-500 text-slate-200 px-6 py-2 rounded-lg"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}