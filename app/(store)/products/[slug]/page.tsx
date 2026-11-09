import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/store/add-to-cart-button";
import { ProductGallery } from "@/components/store/product-gallery";
import { ProductCard } from "@/components/store/product-card";
import { getProductBySlug, getProducts, formatAED } from "@/lib/products";
import { storeInfo } from "@/lib/sample-data";
import { categoryPath, productImageAlt, toAbsoluteUrl, truncate } from "@/lib/seo";
import { getBaseUrl } from "@/lib/site-url";

export const revalidate = 60;

export async function generateStaticParams() {
  const products = await getProducts();
  return products
    .filter((product) => product.slug)
    .map((product) => ({
      slug: product.slug
    }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) return {};
  const baseUrl = getBaseUrl();
  const canonicalUrl = `${baseUrl}/products/${product.slug}`;
  // e.g. "Amber Rose Bukhoor – AED 450 | Al Miaraj Sharjah"
  const title = { absolute: `${product.name} – AED ${Number(product.price).toFixed(0)} | Al Miaraj Sharjah` };
  const description = truncate(
    `${product.description ? `${product.description} ` : ""}Buy ${product.name}${
      product.category ? ` (${product.category})` : ""
    } at Al Miaraj, Hay Mogader, Sharjah. Enquire on WhatsApp, pick up in store.`
  );
  const image = product.images?.[0];

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl
    },
    openGraph: {
      title: `${product.name} | Al Miaraj Sharjah UAE`,
      description,
      url: canonicalUrl,
      type: "website",
      images: image ? [{ url: image, alt: productImageAlt(product.name, product.category) }] : []
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Al Miaraj Sharjah UAE`,
      description,
      images: image ? [image] : []
    }
  };
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();
  const products = await getProducts();
  const images = product.images?.length ? product.images : [];
  const baseUrl = getBaseUrl();

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description ?? `${product.name} available at Al Miaraj in Sharjah UAE`,
    image: product.images?.length ? product.images.map((image) => toAbsoluteUrl(image, baseUrl)) : undefined,
    sku: product.id,
    url: `${baseUrl}/products/${product.slug}`,
    category: product.category ?? undefined,
    brand: {
      "@type": "Brand",
      name: "Al Miaraj"
    },
    offers: {
      "@type": "Offer",
      url: `${baseUrl}/products/${product.slug}`,
      priceCurrency: "AED",
      price: product.price,
      priceValidUntil: "2027-12-31",
      availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@id": `${baseUrl}/#localbusiness` },
      availableAtOrFrom: {
        "@type": "Place",
        name: storeInfo.name,
        address: { "@type": "PostalAddress", streetAddress: storeInfo.address, addressLocality: "Sharjah", addressCountry: "AE" }
      }
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl
      },
      {
        "@type": "ListItem",
        position: 2,
        name: product.category || "Products",
        item: product.category ? `${baseUrl}${categoryPath(product.category)}` : `${baseUrl}/products`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: `${baseUrl}/products/${product.slug}`
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <section className="px-5 py-8 md:px-16 md:py-12">
        <div className="mx-auto max-w-boutique">
          <nav aria-label="Breadcrumb" className="label mb-6 flex items-center gap-2 overflow-x-auto text-on-surface-variant">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href={product.category ? categoryPath(product.category) : "/products"} className="hover:text-primary transition-colors">
              {product.category ?? "Products"}
            </Link>
            <span>/</span>
            <span className="text-secondary font-medium" aria-current="page">{product.name}</span>
          </nav>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <ProductGallery images={images} name={product.name} category={product.category} />
            <div className="flex flex-col gap-7">
              <div>
                <p className="label mb-3 text-secondary">{product.category ?? "Shop Item"}</p>
                <h1 className="font-display text-4xl font-semibold leading-tight text-primary">{product.name}</h1>
                <div className="mt-4 flex items-center gap-3 text-xl font-semibold">
                  <span>{formatAED(product.price)}</span>
                  {product.compare_price ? <span className="text-base text-outline line-through">{formatAED(product.compare_price)}</span> : null}
                </div>
              </div>
              <p className="text-base leading-8 text-on-surface-variant">{product.description}</p>
              <div className="grid gap-3 border-y border-outline-variant py-6 text-sm font-semibold text-primary">
                <span>Available for shop enquiry</span>
                <span>Visit the shop for pickup</span>
                <span>{product.stock > 0 ? `${product.stock} available` : "Ask us for availability"}</span>
              </div>
              <AddToCartButton product={product} />
            </div>
          </div>
          <div className="mt-20">
            <h2 className="font-display text-3xl font-semibold text-primary">You may also like</h2>
            <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
              {products.filter((item) => item.id !== product.id).slice(0, 4).map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
