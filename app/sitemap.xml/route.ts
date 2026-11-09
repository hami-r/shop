import { getCategories } from "@/lib/categories";
import { categoryLabel, getDictionary, localePath, locales, productName } from "@/lib/i18n";
import { getProducts, PAGE_SIZE } from "@/lib/products";
import { categorySlug, toAbsoluteUrl } from "@/lib/seo";
import { getBaseUrl } from "@/lib/site-url";

// Bilingual sitemap: every page is listed in English and Arabic with hreflang links,
// and product photos are listed for Google Images.
export const revalidate = 3600;

function escapeXml(value: string) {
  return value.replace(/[<>&'"]/g, (char) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[char]!);
}

type Page = {
  path: string; // English path
  lastmod: string;
  changefreq: string;
  priority: number;
  images?: (locale: (typeof locales)[number]) => { loc: string; title: string }[];
};

export async function GET() {
  const baseUrl = getBaseUrl();
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);
  const now = new Date().toISOString();

  const pages: Page[] = [
    { path: "/", lastmod: now, changefreq: "daily", priority: 1 },
    { path: "/products", lastmod: now, changefreq: "daily", priority: 0.9 },
    ...categories.flatMap((category) => {
      const count = products.filter((product) => product.category === category).length;
      const pageCount = Math.max(1, Math.ceil(count / PAGE_SIZE));
      return Array.from({ length: pageCount }, (_, i) => ({
        path: `/shop/${categorySlug(category)}${i ? `/page/${i + 1}` : ""}`,
        lastmod: now,
        changefreq: "daily",
        priority: i ? 0.6 : 0.9
      }));
    }),
    ...products
      .filter((product) => product.slug)
      .map((product) => ({
        path: `/products/${product.slug}`,
        lastmod: product.created_at ? new Date(product.created_at).toISOString() : now,
        changefreq: "weekly",
        priority: 0.8,
        images: (locale: (typeof locales)[number]) =>
          (product.images ?? []).filter(Boolean).map((image, index) => ({
            loc: toAbsoluteUrl(image, baseUrl),
            title: getDictionary(locale).product.imageAlt(productName(product, locale), categoryLabel(product.category, locale), index + 1)
          }))
      })),
    { path: "/contact", lastmod: now, changefreq: "monthly", priority: 0.7 }
  ];

  const urls = pages.flatMap((page) =>
    locales.map((locale) => {
      const alternates = [
        ...locales.map((alt) => `    <xhtml:link rel="alternate" hreflang="${alt}" href="${escapeXml(`${baseUrl}${localePath(alt, page.path)}`)}"/>`),
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(`${baseUrl}${localePath("en", page.path)}`)}"/>`
      ];
      const images = (page.images?.(locale) ?? []).map(
        (image) => `    <image:image><image:loc>${escapeXml(image.loc)}</image:loc><image:title>${escapeXml(image.title)}</image:title></image:image>`
      );
      return [
        "  <url>",
        `    <loc>${escapeXml(`${baseUrl}${localePath(locale, page.path)}`)}</loc>`,
        `    <lastmod>${page.lastmod}</lastmod>`,
        `    <changefreq>${page.changefreq}</changefreq>`,
        `    <priority>${page.priority}</priority>`,
        ...alternates,
        ...images,
        "  </url>"
      ].join("\n");
    })
  );

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls.join("\n")}
</urlset>
`;

  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
