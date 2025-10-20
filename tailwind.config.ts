import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,js,jsx,html,css}",
    "./components/**/*.{ts,tsx,js,jsx,html,css}",
    "./pages/**/*.{ts,tsx,js,jsx,html,css}",
    "./public/**/*.html",
    "./app/globals.css"
  ],
  safelist: [
    // classes utilisées via @apply dans app/globals.css
    "rounded-2xl",
    "rounded-3xl",
    "rounded-xl",
    "px-6",
    "py-3",
    "inline-flex",
    "items-center",
    "justify-center",
    "font-semibold",
    "transition-all",
    "duration-300",
    "bg-white/5",
    "bg-white/6",
    "bg-accent",
    "text-white",
    "text-white/60",
    "text-white/70",
    "text-white/80",
    "text-white/85",
    "text-white/90",
    "shadow-card",
    "badge",
    "card",
    "glass",
    "input",
    "btn",
    "btn-accent",
    "btn-ghost",
    "noise",
    "animate-pulse-soft",
    "rounded-full",
    "aspect-[16/9]"
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