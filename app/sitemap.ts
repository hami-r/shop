import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/products";
import { getBaseUrl } from "@/lib/site-url";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();
  const products = await getProducts();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7
    }
  ];

  const productRoutes: MetadataRoute.Sitemap = products
    .filter((product) => product.is_active && product.slug)
    .map((product) => ({
      url: `${baseUrl}/products/${product.slug}`,
      lastModified: product.created_at ? new Date(product.created_at) : new Date(),
      changeFrequency: "weekly",
      priority: 0.8
    }));

  return [...staticRoutes, ...productRoutes];
}
