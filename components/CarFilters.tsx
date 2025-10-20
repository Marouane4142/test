"use client";

import { useId } from "react";

type Props = {
  query: string; onQuery: (v: string) => void;
  brand: string | null; onBrand: (v: string | null) => void;
  allBrands: string[];
};

export default function CarFilters({ query, onQuery, brand, onBrand, allBrands }: Props) {
  const inputId = useId();
  return (
    <div className="card">
      <div className="grid md:grid-cols-4 gap-4">
        <div className="md:col-span-2">
          <label className="text-sm text-white/70" htmlFor={inputId}>Recherche</label>
          <input id={inputId} className="input mt-2" placeholder="Marque, modèle..." value={query} onChange={(e) => onQuery(e.target.value)} />
        </div>
        <div>
          <label className="text-sm text-white/70">Marque</label>
          <select className="input mt-2" value={brand ?? ""} onChange={(e) => onBrand(e.target.value || null)}>
            <option value="">Toutes</option>
            {allBrands.sort().map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm text-white/70">Trier</label>
          <select className="input mt-2">
            <option>Recommandées</option>
            <option>Prix croissant</option>
            <option>Prix décroissant</option>
          </select>
        </div>
      </div>
    </div>
  );
}