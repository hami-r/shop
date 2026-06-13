import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#fcf9f8",
        surface: "#fcf9f8",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f6f3f2",
        "surface-container": "#f0eded",
        "surface-container-high": "#eae7e7",
        "surface-container-highest": "#e5e2e1",
        "on-surface": "#1c1b1b",
        "on-surface-variant": "#404944",
        outline: "#707974",
        "outline-variant": "#bfc9c3",
        primary: "#003527",
        "primary-container": "#064e3b",
        "on-primary": "#ffffff",
        secondary: "#735c00",
        gold: "#d4af37",
        "secondary-container": "#fed65b",
        whatsapp: "#25D366",
        error: "#ba1a1a"
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-jakarta)", "sans-serif"]
      },
      boxShadow: {
        boutique: "0 20px 40px -15px rgba(0, 53, 39, 0.15)"
      },
      maxWidth: {
        boutique: "1200px"
      }
    }
  },
  plugins: []
};

export default config;
