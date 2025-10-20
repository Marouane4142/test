"use client";

import { useMemo, useState } from "react";
import CarFilters from "@/components/CarFilters";
import CarCard from "@/components/CarCard";
import carsData from "@/data/cars";

export default function BuyPage() {
  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState<string | null>(null);

  const results = useMemo(() => {
    return carsData.filter((c) => {
      const q = query.toLowerCase();
      if (q && !(`${c.brand} ${c.model}`.toLowerCase().includes(q))) return false;
      if (brand && c.brand !== brand) return false;
      return true;
    });
  }, [query, brand]);

  return (
    <div className="px-6 md:px-10 pt-28 pb-20 mx-auto max-w-7xl">
      <h1 className="text-4xl font-bold mb-3">Acheter une voiture</h1>
      <p className="text-white/70 mb-6">Filtrez et parcourez les annonces.</p>

      <CarFilters query={query} onQuery={setQuery} brand={brand} onBrand={setBrand} allBrands={[...new Set(carsData.map(c => c.brand))]} />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {results.map((c) => <CarCard key={c.id} car={c} />)}
        {results.length === 0 && <div className="col-span-full card text-center py-20">Aucun résultat — essaye d’élargir les filtres.</div>}
      </div>
    </div>
  );
}