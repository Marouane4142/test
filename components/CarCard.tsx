"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Fuel, Cog, Calendar } from "lucide-react";
import { Car } from "@/data/cars";

export default function CarCard({ car }: { car: Car }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-80, 80], [10, -10]), { stiffness: 200, damping: 18 });
  const ry = useSpring(useTransform(x, [-80, 80], [-10, 10]), { stiffness: 200, damping: 18 });

  const onMove = (e: React.MouseEvent) => {
    const r = (e.currentTarget as HTMLDivElement).getBoundingClientRect();
    x.set(e.clientX - (r.left + r.width / 2));
    y.set(e.clientY - (r.top + r.height / 2));
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div onMouseMove={onMove} onMouseLeave={onLeave} style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" as any }} className="card group cursor-pointer" whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 180, damping: 18 }}>
      <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-white/5 border border-white/8 grid place-items-center">
        <div className="absolute top-3 left-3 badge bg-white/6">{car.brand}</div>
        <div className="absolute top-3 right-3 badge bg-accent text-black border-0">€{car.price.toLocaleString()}</div>
        <div className="text-white/60">{car.brand} {car.model}</div>
      </div>

      <div className="mt-4">
        <div className="font-semibold text-lg">{car.brand} {car.model}</div>
        <div className="text-white/60 text-sm">{car.year} • {car.mileage.toLocaleString()} km</div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3 text-xs">
        <div className="badge"><Fuel className="w-3 h-3" /> {car.fuel}</div>
        <div className="badge"><Cog className="w-3 h-3" /> {car.transmission}</div>
        <div className="badge"><Calendar className="w-3 h-3" /> {car.year}</div>
      </div>

      <button className="mt-5 btn btn-accent w-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all">Voir le détail</button>
    </motion.div>
  );
}