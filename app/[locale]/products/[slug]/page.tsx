import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, MessageCircle } from "lucide-react";
import { AddToCartButton } from "@/components/store/add-to-cart-button";
import { ProductCard } from "@/components/store/product-card";
import { ProductGallery } from "@/components/store/product-gallery";
import { categoryLabel, formatPrice, getDictionary, localePath, locales, productDescription, productName, type Locale } from "@/lib/i18n";
import { getProductBySlug, getProducts, toCardProduct } from "@/lib/products";
import { storeInfo } from "@/lib/sample-data";
import { alternatesFor, categoryPath, toAbsoluteUrl, truncate } from "@/lib/seo";
import { getBaseUrl } from "@/lib/site-url";

export const revalidate = 60;

export async function generateStaticParams() {
  const products = await getProducts();
  return locales.flatMap((locale) => products.filter((product) => product.slug).map((product) => ({ locale, slug: product.slug })));
}

export async function generateMetadata({ params }: { params: { locale: Locale; slug: string } }): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product || !product.is_active) return {};
  const locale = params.locale;
  const t = getDictionary(locale);
  const name = productName(product, locale);
  const category = categoryLabel(product.category, locale);
  const description = productDescription(product, locale);
  const title = t.product.metaTitle(name, formatPrice(Number(product.price), locale));
  const metaDescription = truncate(`${description ? `${description} ` : ""}${t.product.metaDescription(name, category)}`);
  const alternates = alternatesFor(locale, `/products/${product.slug}`, getBaseUrl());
  const image = product.images?.[0];

  return {
    title: { absolute: title },
    description: metaDescription,
    alternates,
    openGraph: {
      title,
      description: metaDescription,
      url: alternates.canonical,
      type: "website",
      locale: locale === "ar" ? "ar_AE" : "en_AE",
      images: image ? [{ url: image, alt: t.product.imageAlt(name, category) }] : undefined
    },
    twitter: { card: "summary_large_image", title, description: metaDescription, images: image ? [image] : undefined }
  };
}

export default async function ProductDetailPage({ params }: { params: { locale: Locale; slug: string } }) {
  const locale = params.locale;
  const t = getDictionary(locale);
  const product = await getProductBySlug(params.slug);
  if (!product || !product.is_active) notFound();

  const products = await getProducts();
  const baseUrl = getBaseUrl();
  const name = productName(product, locale);
  const description = productDescription(product, locale);
  const category = categoryLabel(product.category, locale);
  const images = product.images?.filter(Boolean) ?? [];
  const pageUrl = alternatesFor(locale, `/products/${product.slug}`, baseUrl).canonical;
  const related = [
    ...products.filter((item) => item.id !== product.id && item.category === product.category),
    ...products.filter((item) => item.id !== product.id && item.category !== product.category)
  ].slice(0, 4);

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    alternateName: locale === "ar" ? product.name : product.name_ar ?? undefined,
    description: description ?? t.product.metaDescription(name, category),
    image: images.length ? images.map((image) => toAbsoluteUrl(image, baseUrl)) : undefined,
    sku: product.id,
    url: pageUrl,
    inLanguage: locale,
    category: category || undefined,
    brand: { "@type": "Brand", name: "Al Miaraj" },
    offers: {
      "@type": "Offer",
      url: pageUrl,
      priceCurrency: "AED",
      price: product.price,
      priceValidUntil: `${new Date().getFullYear() + 1}-12-31`,
      availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@id": `${baseUrl}/#localbusiness` },
      availableAtOrFrom: {
        "@type": "Place",
        name: storeInfo.name,
        address: { "@type": "PostalAddress", streetAddress: t.address, addressLocality: "Sharjah", addressCountry: "AE" }
      }
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: t.breadcrumb.home, item: `${baseUrl}${localePath(locale, "/")}` },
      {
        "@type": "ListItem",
        position: 2,
        name: product.category ? category : t.breadcrumb.products,
        item: `${baseUrl}${product.category ? categoryPath(product.category, locale) : localePath(locale, "/products")}`
      },
      { "@type": "ListItem", position: 3, name, item: pageUrl }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <section className="container-x py-8 md:py-14">
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 overflow-x-auto whitespace-nowrap text-sm text-ash">
          <Link href={localePath(locale, "/")} className="hover:text-ink">{t.breadcrumb.home}</Link>
          <span aria-hidden>/</span>
          <Link href={product.category ? categoryPath(product.category, locale) : localePath(locale, "/products")} className="hover:text-ink">
            {product.category ? category : t.breadcrumb.products}
          </Link>
          <span aria-hidden>/</span>
          <span className="text-ink" aria-current="page">{name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div className="animate-fade-in">
            <ProductGallery images={images} name={name} category={category} />
          </div>
          <div style={{ animationDelay: "120ms" }} className="animate-rise lg:pt-6">
            <p className="label text-ink">{category}</p>
            <h1 className="heading-display mt-4 text-4xl md:text-6xl rtl:leading-[1.3]">{name}</h1>
            <div className="mt-6 flex items-baseline gap-3">
              <span className="text-2xl text-ink">{formatPrice(Number(product.price), locale)}</span>
              {product.compare_price ? <span className="text-lg text-ash line-through">{formatPrice(Number(product.compare_price), locale)}</span> : null}
            </div>
            {description ? <p className="mt-8 text-lg leading-8 text-stone">{description}</p> : null}
            <div className="mt-10">
              <AddToCartButton product={toCardProduct(product)} />
            </div>
            <ul className="mt-10 grid gap-4 border-t border-hairline pt-8 text-base text-stone">
              <li className="flex items-start gap-3">
                <span className={`mt-2 h-2 w-2 shrink-0 rounded-full ${product.stock > 0 ? "bg-olive" : "bg-ochre"}`} />
                {product.stock > 0 ? t.product.inStock(product.stock) : t.product.askAvailability}
              </li>
              <li className="flex items-start gap-3"><MapPin size={18} className="mt-0.5 shrink-0" /> {t.product.pickup}</li>
              <li className="flex items-start gap-3"><MessageCircle size={18} className="mt-0.5 shrink-0" /> {t.product.whatsappNote}</li>
            </ul>
          </div>
        </div>
      </section>

      {related.length ? (
        <section className="container-x py-20 md:py-28">
          <h2 data-reveal className="heading-display text-4xl md:text-5xl">{t.product.alsoLike}</h2>
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-4 md:gap-x-6">
            {related.map((item, index) => (
              <ProductCard key={item.id} product={toCardProduct(item)} index={index} />
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
}
