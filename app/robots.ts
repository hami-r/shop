import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/site-url";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/*",
          "/api/*",
          "/cart",
          "/checkout",
          "/checkout/*",
          "/shared-cart/*"
        ]
      },
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "PerplexityBot",
          "ClaudeBot",
          "Applebot",
          "Google-Extended"
        ],
        allow: ["/", "/products", "/products/*", "/contact", "/llms.txt"],
        disallow: [
          "/admin",
          "/admin/*",
          "/api/*",
          "/cart",
          "/checkout",
          "/checkout/*",
          "/shared-cart/*"
        ]
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`
  };
}
