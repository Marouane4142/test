"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

export default function LoginModal({ open, onClose }: { open: boolean; onClose: () => void; }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-60 grid place-items-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-xs" />
          <motion.div initial={{ opacity: 0, y: 20, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.98 }} transition={{ type: "spring", stiffness: 140, damping: 16 }} className="card w-full max-w-md relative">
            <button onClick={onClose} className="absolute top-3 right-3 btn btn-ghost !px-3 !py-2"><X className="w-4 h-4" /></button>
            <div className="text-2xl font-bold">Se connecter</div>
            <p className="text-white/70 mt-2">Gérez vos annonces et vos messages.</p>

            <div className="mt-6 grid gap-4">
              <div>
                <label className="text-sm text-white/70">Email</label>
                <input className="input mt-2" type="email" />
              </div>
              <div>
                <label className="text-sm text-white/70">Mot de passe</label>
                <input className="input mt-2" type="password" />
              </div>
              <button className="btn btn-accent w-full">Connexion</button>
              <button className="btn btn-ghost w-full">Créer un compte</button>
            </div>

            <div className="mt-4 text-xs text-white/50">En vous connectant vous acceptez nos conditions.</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}