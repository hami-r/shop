import type { Config } from "tailwindcss";

// Tokens follow DESIGN.md (Oura analysis), adapted for Al Miaraj:
// the single action colour is espresso instead of Oura's blue.
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // DESIGN.md palette
        canvas: "#f7f1e8",
        "surface-grey": "#ececec",
        silver: "#cccac7",
        hairline: "#e1dcd3",
        ink: "#1c1b1a",
        "ink-band": "#000000",
        "ink-band-soft": "#19191c",
        stone: "#4a4741",
        ash: "#838280",
        mute: "#a8a5a0",
        clay: "#6b443d",
        espresso: "#39221e",
        gold: "#af751b",
        ochre: "#bc924c",
        "gold-soft": "#ddaa61",
        "gold-pale": "#ddbe78",
        "gold-deep": "#684d07",
        forest: "#224228",
        olive: "#5c6f5d",
        sage: "#849671",
        "sage-pale": "#ced4b8",

        // Semantic names used across the app (incl. admin)
        background: "#f7f1e8",
        surface: "#f7f1e8",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#efe8dc",
        "surface-container": "#ececec",
        "surface-container-high": "#e1dcd3",
        "surface-container-highest": "#cccac7",
        "on-surface": "#1c1b1a",
        "on-surface-variant": "#4a4741",
        outline: "#838280",
        "outline-variant": "#e1dcd3",
        primary: "#39221e",
        "primary-container": "#6b443d",
        "on-primary": "#ffffff",
        secondary: "#684d07",
        "secondary-container": "#ddbe78",
        whatsapp: "#25D366",
        error: "#e33a22"
      },
      fontFamily: {
        display: ["var(--font-display-latin)", "var(--font-display-arabic)", "Georgia", "serif"],
        sans: ["var(--font-sans-latin)", "var(--font-sans-arabic)", "system-ui", "sans-serif"]
      },
      borderRadius: {
        card: "24px",
        media: "40px"
      },
      boxShadow: {
        boutique: "0 18px 40px -24px rgba(57, 34, 30, 0.28)",
        float: "0 24px 60px -30px rgba(57, 34, 30, 0.35)"
      },
      maxWidth: {
        boutique: "1280px"
      },
      // Calm, editorial motion: slow ease-out, small distances.
      keyframes: {
        rise: { "0%": { opacity: "0", transform: "translateY(18px)" }, "100%": { opacity: "1", transform: "none" } },
        "fade-in": { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        pop: { "0%": { transform: "scale(1)" }, "40%": { transform: "scale(1.35)" }, "100%": { transform: "scale(1)" } },
        "slide-down": { "0%": { opacity: "0", transform: "translateY(-8px)" }, "100%": { opacity: "1", transform: "none" } },
        "page-in": { "0%": { opacity: "0", transform: "translateY(6px)" }, "100%": { opacity: "1", transform: "none" } },
        shimmer: { "0%": { backgroundPosition: "200% 0" }, "100%": { backgroundPosition: "-200% 0" } }
      },
      animation: {
        rise: "rise 0.9s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fade-in 0.6s ease-out both",
        pop: "pop 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
        "slide-down": "slide-down 0.3s cubic-bezier(0.22, 1, 0.36, 1) both",
        "page-in": "page-in 0.45s cubic-bezier(0.22, 1, 0.36, 1) both",
        shimmer: "shimmer 1.6s ease-in-out infinite"
      },
      transitionTimingFunction: {
        calm: "cubic-bezier(0.22, 1, 0.36, 1)"
      }
    }
  },
  plugins: []
};

export default config;
