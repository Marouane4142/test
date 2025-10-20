import Link from "next/link";

export default function Footer() {
  return (
    <footer className="px-6 md:px-10 pb-10 pt-16">
      <div className="mx-auto max-w-7xl glass rounded-3xl p-6">
        <div className="flex flex-col md:flex-row items-start justify-between gap-6">
          <div>
            <div className="flex items-center gap-3">
              <img src="/logo.svg" alt="Logo" className="h-7" />
              <div className="font-semibold">AutoLink</div>
            </div>
            <div className="text-sm text-white/60 mt-2">Design & expérience utilisateur au cœur du produit.</div>
          </div>

          <div className="flex gap-12">
            <div>
              <div className="font-semibold mb-3">Pages</div>
              <ul className="space-y-2 text-white/70">
                <li><Link href="/buy">Acheter</Link></li>
                <li><Link href="/sell">Vendre</Link></li>
                <li><Link href="/about">À propos</Link></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold mb-3">Légal</div>
              <ul className="space-y-2 text-white/70">
                <li><a href="#">CGU</a></li>
                <li><a href="#">Confidentialité</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 text-sm text-white/60 flex justify-between">
          <div>© {new Date().getFullYear()} AutoLink</div>
          <div>Fait avec ❤ — design soigné</div>
        </div>
      </div>
    </footer>
  );
}