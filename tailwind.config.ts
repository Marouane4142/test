import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,js,jsx,css}",
    "./components/**/*.{ts,tsx,js,jsx,css}",
    "./pages/**/*.{ts,tsx,js,jsx,css}",
    "./public/**/*.html",
    // ajoute explicitement le fichier global CSS si besoin
    "./app/globals.css"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark1: "#23292C",
          dark2: "#346565"
        },
        accent: {
          DEFAULT: "#FFAA00"
        },
        base: {
          white: "#FFFFFF"
        }
      },
      boxShadow: {
        glow: "0 0 0 6px rgba(255,170,0,0.08)",
        card: "0 10px 30px rgba(0,0,0,0.3)"
      }
    }
  },
  plugins: []
};

export default config;