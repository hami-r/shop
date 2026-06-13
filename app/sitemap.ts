import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/products";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://almiaraj.ae";
  const products = await getProducts();
  const staticRoutes = ["", "/products", "/cart", "/checkout", "/contact"].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date()
  }));
  return [
    ...staticRoutes,
    ...products.map((product) => ({
      url: `${baseUrl}/products/${product.slug}`,
      lastModified: product.created_at ? new Date(product.created_at) : new Date()
    }))
  ];
}
