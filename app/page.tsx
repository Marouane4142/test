"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, ShieldCheck, Zap, Gauge, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="relative pt-28 pb-28 px-6 md:px-10">
      <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-10 items-center">
        <section>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-3 badge mb-6 rounded-full bg-white/6 px-4 py-2">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-white/80 text-sm">Design premium • Flow fluide</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05, duration: 0.6 }} className="text-5xl md:text-6xl font-extrabold leading-tight">
            Trouvez votre prochaine voiture ou vendez-la en un instant
            <span className="block accent-text">entre particuliers</span>
          </motion.h1>

          <motion.p className="mt-6 text-white/75 max-w-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
            Une expérience moderne, sécurisée et ultra-design. Parcourez des annonces filtrées, publiez en quelques étapes et gérez vos contacts facilement.
          </motion.p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/buy" className="btn btn-accent inline-flex items-center gap-2">
              Acheter une voiture <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/sell" className="btn btn-ghost">Vendre sa voiture</Link>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
            <div className="text-white/80">
              <Sparkles className="w-5 h-5 text-accent mb-2" />
              <div className="font-semibold">Design</div>
              <div className="text-sm text-white/60">Interface soignée</div>
            </div>
            <div className="text-white/80">
              <ShieldCheck className="w-5 h-5 text-accent mb-2" />
              <div className="font-semibold">Confiance</div>
              <div className="text-sm text-white/60">Informations claires</div>
            </div>
            <div className="text-white/80">
              <Zap className="w-5 h-5 text-accent mb-2" />
              <div className="font-semibold">Rapide</div>
              <div className="text-sm text-white/60">Publication en quelques clics</div>
            </div>
          </div>
        </section>

        <motion.section initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <div className="card relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full blur-2xl opacity-30" style={{ background: "radial-gradient(circle,#FFAA00,transparent)" }} />
            <div className="aspect-video rounded-2xl overflow-hidden bg-white/5 border border-white/8 grid place-items-center">
              {/* Visuel stylisé placeholder */}
              <svg width="70%" viewBox="0 0 1200 600" className="opacity-90">
                <defs>
                  <linearGradient id="g" x1="0" x2="1">
                    <stop offset="0%" stopColor="#FFAA00" />
                    <stop offset="100%" stopColor="#FFC94D" />
                  </linearGradient>
                </defs>
                <path d="M120 380 C260 200 460 200 600 220 C760 240 920 260 1100 380" stroke="url(#g)" strokeWidth="18" fill="none" strokeLinecap="round" />
                <circle cx="420" cy="360" r="48" fill="none" stroke="url(#g)" strokeWidth="14"/>
                <circle cx="920" cy="360" r="48" fill="none" stroke="url(#g)" strokeWidth="14"/>
              </svg>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <div className="badge">+1200 annonces</div>
              <div className="badge">Matching intelligent</div>
            </div>
          </div>
        </motion.section>
      </div>

      <section className="mt-20 mx-auto max-w-7xl">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card">
            <Gauge className="w-6 h-6 text-accent mb-3" />
            <div className="font-semibold text-xl">Filtres puissants</div>
            <p className="text-white/70 mt-2">Trouvez la voiture idéale rapidement.</p>
          </div>
          <div className="card">
            <ShieldCheck className="w-6 h-6 text-accent mb-3" />
            <div className="font-semibold text-xl">Confiance</div>
            <p className="text-white/70 mt-2">Informations et transparence pour chaque annonce.</p>
          </div>
          <div className="card">
            <Zap className="w-6 h-6 text-accent mb-3" />
            <div className="font-semibold text-xl">Publication rapide</div>
            <p className="text-white/70 mt-2">Publiez en quelques étapes, photos incluses.</p>
          </div>
        </div>
      </section>
    </div>
  );
}