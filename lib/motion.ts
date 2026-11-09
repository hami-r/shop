import type { CSSProperties } from "react";

/** Staggered delay for items in a grid row (0, 70, 140, 210 ms…). */
export function revealDelay(index: number, perRow = 4): CSSProperties {
  return { "--reveal-delay": `${(index % perRow) * 70}ms` } as CSSProperties;
}
