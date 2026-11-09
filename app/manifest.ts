import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Al Miaraj Store Sharjah",
    short_name: "Al Miaraj",
    description: "Bukhoor, Oud, Perfumes and Everyday Items in Sharjah UAE",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f1e8",
    theme_color: "#f7f1e8",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png"
      }
    ]
  };
}
