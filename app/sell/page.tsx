"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const steps = ["Véhicule", "Photos", "Contact"];

export default function SellPage() {
  const [step, setStep] = useState(0);

  return (
    <div className="px-6 md:px-10 pt-28 pb-20 mx-auto max-w-5xl">
      <h1 className="text-4xl font-bold mb-3">Vendre sa voiture</h1>
      <p className="text-white/70 mb-6">Publiez votre annonce en quelques étapes simples.</p>

      <div className="card mb-6">
        <div className="flex items-center gap-4">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-3">
              <div className={`h-10 w-10 grid place-items-center rounded-full ${i <= step ? "bg-accent text-black" : "bg-white/6"}`}>{i+1}</div>
              <div className="text-white/70">{s}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-white/70">Marque</label>
                  <input className="input mt-2" placeholder="Ex: Renault" />
                </div>
                <div>
                  <label className="text-sm text-white/70">Modèle</label>
                  <input className="input mt-2" placeholder="Ex: Clio" />
                </div>
                <div>
                  <label className="text-sm text-white/70">Année</label>
                  <input className="input mt-2" type="number" placeholder="2019" />
                </div>
                <div>
                  <label className="text-sm text-white/70">Kilométrage</label>
                  <input className="input mt-2" type="number" placeholder="45000" />
                </div>
              </div>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
              <div>
                <label className="text-sm text-white/70">Photos</label>
                <div className="mt-3 border-2 border-dashed border-white/10 rounded-2xl p-6 text-center">Glisser-déposer les photos</div>
                <div className="mt-4">
                  <label className="text-sm text-white/70">Titre de l’annonce</label>
                  <input className="input mt-2" />
                </div>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-white/70">Nom</label>
                  <input className="input mt-2" />
                </div>
                <div>
                  <label className="text-sm text-white/70">Email</label>
                  <input className="input mt-2" type="email" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-6 flex justify-between">
          <button onClick={() => setStep(Math.max(0, step-1))} className="btn btn-ghost">Retour</button>
          {step < steps.length - 1 ? (
            <button onClick={() => setStep(step+1)} className="btn btn-accent">Suivant</button>
          ) : (
            <button className="btn btn-accent">Publier l'annonce</button>
          )}
        </div>
      </div>
    </div>
  );
}