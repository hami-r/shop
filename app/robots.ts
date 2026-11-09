import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/site-url";

const privatePaths = ["/admin", "/admin/", "/api/", "/cart", "/checkout", "/shared-cart/", "/ar/cart", "/ar/checkout", "/ar/shared-cart/"];

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getBaseUrl();
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: privatePaths },
      {
        userAgent: ["GPTBot", "OAI-SearchBot", "PerplexityBot", "ClaudeBot", "Applebot", "Google-Extended"],
        allow: ["/", "/products", "/shop/", "/ar", "/ar/", "/contact", "/llms.txt"],
        disallow: privatePaths
      }
    ],
    sitemap: `${baseUrl}/sitemap.xml`
  };
}
