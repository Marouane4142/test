"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, LogIn } from "lucide-react";
import LoginModal from "./LoginModal";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[94%] md:w-[90%] max-w-7xl transition-all ${scrolled ? "drop-shadow-lg" : ""}`}>
        <div className="glass rounded-3xl px-5 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <img src="/logo.svg" alt="Logo" className="h-8 w-auto" />
            </Link>

            <div className="hidden md:flex items-center gap-6">
              <Link href="/sell" className="text-white/85 hover:text-white">Vendre sa voiture</Link>
              <Link href="/buy" className="text-white/85 hover:text-white">Acheter une voiture</Link>
              <Link href="/about" className="text-white/85 hover:text-white">À propos</Link>
              <button onClick={() => setLoginOpen(true)} className="btn btn-accent flex items-center gap-2">
                <LogIn className="w-4 h-4" /> Login
              </button>
            </div>

            <button className="md:hidden btn btn-ghost !px-3" onClick={() => setOpen(!open)}>
              {open ? <X /> : <Menu />}
            </button>
          </div>

          {open && (
            <div className="md:hidden mt-3 border-t border-white/8 pt-3 flex flex-col gap-3">
              <Link href="/sell" onClick={() => setOpen(false)} className="btn btn-ghost">Vendre sa voiture</Link>
              <Link href="/buy" onClick={() => setOpen(false)} className="btn btn-ghost">Acheter une voiture</Link>
              <Link href="/about" onClick={() => setOpen(false)} className="btn btn-ghost">À propos</Link>
              <button onClick={() => { setLoginOpen(true); setOpen(false); }} className="btn btn-accent">Login</button>
            </div>
          )}
        </div>
      </nav>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}