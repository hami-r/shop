import { getCategories } from "@/lib/categories";
import { getProducts } from "@/lib/products";
import { categoryPath, productImageAlt, toAbsoluteUrl } from "@/lib/seo";
import { getBaseUrl } from "@/lib/site-url";

// Custom sitemap with Google image extensions so product photos are found by Google Images.
export const revalidate = 3600;

function escapeXml(value: string) {
  return value.replace(/[<>&'"]/g, (char) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[char]!);
}

type Entry = { loc: string; lastmod?: string; changefreq: string; priority: number; images?: { loc: string; title: string }[] };

export async function GET() {
  const baseUrl = getBaseUrl();
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);
  const now = new Date().toISOString();

  const entries: Entry[] = [
    { loc: baseUrl, lastmod: now, changefreq: "daily", priority: 1 },
    { loc: `${baseUrl}/products`, lastmod: now, changefreq: "daily", priority: 0.9 },
    ...categories.map((category) => ({
      loc: `${baseUrl}${categoryPath(category)}`,
      lastmod: now,
      changefreq: "daily",
      priority: 0.9
    })),
    ...products
      .filter((product) => product.slug)
      .map((product) => ({
        loc: `${baseUrl}/products/${product.slug}`,
        lastmod: product.created_at ? new Date(product.created_at).toISOString() : now,
        changefreq: "weekly",
        priority: 0.8,
        images: (product.images ?? []).filter(Boolean).map((image, index) => ({
          loc: toAbsoluteUrl(image, baseUrl),
          title: productImageAlt(product.name, product.category, index + 1)
        }))
      })),
    { loc: `${baseUrl}/contact`, lastmod: now, changefreq: "monthly", priority: 0.7 }
  ];

  const body = entries
    .map((entry) => {
      const images = (entry.images ?? [])
        .map((image) => `    <image:image><image:loc>${escapeXml(image.loc)}</image:loc><image:title>${escapeXml(image.title)}</image:title></image:image>`)
        .join("\n");
      return [
        "  <url>",
        `    <loc>${escapeXml(entry.loc)}</loc>`,
        entry.lastmod ? `    <lastmod>${entry.lastmod}</lastmod>` : "",
        `    <changefreq>${entry.changefreq}</changefreq>`,
        `    <priority>${entry.priority}</priority>`,
        images,
        "  </url>"
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${body}
</urlset>
`;

  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
