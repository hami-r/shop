import { Amiri, Fraunces, IBM_Plex_Sans_Arabic, Inter } from "next/font/google";

// Display serif + reading sans, following DESIGN.md (Editorial New → Fraunces, AkkuratLL → Inter).
// Arabic text falls back per-glyph to Amiri (display) and IBM Plex Sans Arabic (body).
export const fraunces = Fraunces({ subsets: ["latin"], weight: ["300", "400"], variable: "--font-display-latin", display: "swap" });
export const inter = Inter({ subsets: ["latin"], variable: "--font-sans-latin", display: "swap" });
export const amiri = Amiri({ subsets: ["arabic"], weight: ["400", "700"], variable: "--font-display-arabic", display: "swap" });
export const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans-arabic",
  display: "swap"
});

export const fontVariables = [fraunces.variable, inter.variable, amiri.variable, plexArabic.variable].join(" ");
