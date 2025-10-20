"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="px-6 md:px-10 pt-28 pb-20 mx-auto max-w-6xl">
      <h1 className="text-4xl font-bold mb-3">À propos</h1>
      <p className="text-white/70 mb-8">AutoLink allie esthétique et clarté pour simplifier l'achat/vente entre particuliers.</p>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          { title: "Vision", desc: "Rendre la transaction automobile simple et transparente." },
          { title: "Design", desc: "Expérience premium, animations utiles." },
          { title: "Confiance", desc: "Informations claires et publication encadrée." }
        ].map((c, i) => (
          <motion.div key={c.title} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="card">
            <div className="text-xl font-semibold">{c.title}</div>
            <p className="text-white/70 mt-2">{c.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}