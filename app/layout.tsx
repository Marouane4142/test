import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AutoLink - Acheter & Vendre entre particuliers",
  description: "Place de marché moderne pour acheter et vendre des voitures entre particuliers."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${inter.className} antialiased noise`}>
        <div className="fixed -z-10 inset-0 pointer-events-none">
          <div className="absolute -top-36 right-10 h-[60vh] w-[60vw] rounded-full blur-3xl opacity-30 animate-pulse-soft" style={{ background: "radial-gradient(closest-side,#FFAA00,transparent)" }} />
          <div className="absolute bottom-[-20%] left-[-10%] h-[70vh] w-[60vw] rounded-full blur-3xl opacity-30" style={{ background: "radial-gradient(closest-side,#346565,transparent)" }} />
        </div>

        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}