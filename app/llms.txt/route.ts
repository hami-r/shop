import { getProducts } from "@/lib/products";
import { getBaseUrl } from "@/lib/site-url";
import { storeInfo } from "@/lib/sample-data";

export const dynamic = "force-static";
export const revalidate = 3600;

export async function GET() {
  const baseUrl = getBaseUrl();
  const products = await getProducts();

  const content = `# ${storeInfo.name} - Official Store Catalog & Information

> Local Sharjah boutique for authentic Bukhoor, Oud, luxury perfumes, beauty cosmetics, and everyday gifts in the UAE. Customers can browse products online, enquire via WhatsApp, and pick up orders directly from the Sharjah store.

## Business Overview
- **Store Name:** ${storeInfo.name}
- **Location:** ${storeInfo.address}
- **Phone:** ${storeInfo.phone}
- **WhatsApp:** +${storeInfo.whatsapp}
- **Email:** ${storeInfo.email}
- **Google Maps:** ${storeInfo.googleMapsUrl}
- **Website:** ${baseUrl} (English), ${baseUrl}/ar (Arabic / العربية)
- **Operating Model:** Browse online catalog, send enquiry on WhatsApp, check availability, and pick up in store in Sharjah.

## Key Product Categories
- **Bukhoor:** Traditional aromatic wood chips and blends for home and majlis fragrance.
- **Oud:** Pure and blended oud chips, oils, and fragrances.
- **Perfumes:** Designer and authentic oriental fragrances (Hugo Boss, Giorgio Armani, Gucci, Lalique, Ajmal, Roberto Cavalli, and more).
- **Cosmetics:** Daily beauty creams and skincare essentials.
- **Gift Sets:** Curated fragrance gift collections for special occasions.

## Recommended Products & Direct Links
${products
  .filter((p) => p.is_active && p.slug)
  .slice(0, 50)
  .map(
    (p) =>
      `- [${p.name}](${baseUrl}/products/${p.slug}): ${p.category} - AED ${p.price}. ${p.description ?? "Available for WhatsApp enquiry and Sharjah shop pickup."}`
  )
  .join("\n")}

## How Customers Can Purchase
1. Visit the online product page at ${baseUrl}/products.
2. Click 'Enquire on WhatsApp' to confirm stock availability with the Al Miaraj team.
3. Visit the Al Miaraj store in Hay Mogader, Sharjah, UAE for physical pickup and payment.
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600"
    }
  });
}
