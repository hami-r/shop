import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { FadeImage } from "@/components/motion/fade-image";
import { ProductCard } from "@/components/store/product-card";
import { revealDelay } from "@/lib/motion";
import { getCategories } from "@/lib/categories";
import { categoryImages, defaultCategoryImage } from "@/lib/category-images";
import { categoryLabel, getDictionary, localePath, productName, type Locale } from "@/lib/i18n";
import { getProducts, toCardProduct } from "@/lib/products";
import { storeInfo } from "@/lib/sample-data";
import { alternatesFor, categoryPath } from "@/lib/seo";
import { getBaseUrl } from "@/lib/site-url";

export const revalidate = 60;

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const t = getDictionary(params.locale);
  return {
    title: { absolute: t.home.metaTitle },
    description: t.home.metaDescription,
    alternates: alternatesFor(params.locale, "/", getBaseUrl())
  };
}

export default async function HomePage({ params }: { params: { locale: Locale } }) {
  const locale = params.locale;
  const t = getDictionary(locale);
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);
  const heroProducts = products.filter((product) => product.images?.[0]).slice(0, 3);
  const Arrow = () => <ArrowRight size={18} className="rtl:rotate-180" />;

  return (
    <>
      {/* Hero — cream canvas, thin serif display headline, one action pill */}
      <section className="container-x pb-12 pt-14 md:pb-20 md:pt-24">
        <p className="label animate-rise text-ink">{t.home.eyebrow}</p>
        <h1 style={{ animationDelay: "80ms" }} className="heading-display mt-6 max-w-5xl animate-rise text-[2.75rem] md:text-7xl lg:text-[5.5rem] rtl:leading-[1.3]">{t.home.title}</h1>
        <p style={{ animationDelay: "200ms" }} className="mt-6 max-w-2xl animate-rise font-display text-xl font-light leading-snug text-stone md:text-2xl">{t.home.lead}</p>
        <div style={{ animationDelay: "320ms" }} className="mt-10 flex animate-rise flex-wrap gap-3">
          <Link href={categoryPath("Bukhoor", locale)} className="btn-primary">
            {t.home.shopBukhoor} <Arrow />
          </Link>
          <a href={`https://wa.me/${storeInfo.whatsapp}`} className="btn-secondary">
            <MessageCircle size={18} /> {t.home.whatsappUs}
          </a>
        </div>
      </section>

      {/* Photography band — real product photos instead of a logo */}
      {heroProducts.length ? (
        <section className="container-x">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
            {heroProducts.map((product, index) => (
              <Link
                key={product.id}
                href={localePath(locale, `/products/${product.slug}`)}
                style={{ animationDelay: `${360 + index * 90}ms` }}
                className={`group relative animate-rise overflow-hidden rounded-card bg-surface-grey md:rounded-media ${
                  index === 0 ? "col-span-2 aspect-[16/10] md:col-span-1 md:aspect-[4/5]" : "aspect-[4/5]"
                }`}
              >
                <FadeImage
                  src={product.images![0]}
                  alt={t.product.imageAlt(productName(product, locale), categoryLabel(product.category, locale))}
                  fill
                  priority={index === 0}
                  className="object-cover group-hover:scale-[1.03]"
                  sizes="(min-width: 768px) 33vw, 50vw"
                />
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {/* Categories */}
      <section className="container-x py-20 md:py-32">
        <div data-reveal className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="label text-ink">{t.home.categoriesEyebrow}</p>
            <h2 className="heading-display mt-4 text-4xl md:text-5xl">{t.home.categoriesTitle}</h2>
          </div>
          <Link href={localePath(locale, "/products")} className="btn-secondary">
            {t.home.viewAll} <Arrow />
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-5">
          {categories.map((category, index) => (
            <Link key={category} href={categoryPath(category, locale)} className="group" data-reveal style={revealDelay(index, 5)}>
              <div className="relative aspect-square overflow-hidden rounded-card bg-surface-grey">
                <FadeImage
                  src={categoryImages[category] ?? defaultCategoryImage}
                  alt={categoryLabel(category, locale)}
                  fill
                  className="object-cover group-hover:scale-[1.04]"
                  sizes="(min-width: 1024px) 20vw, (min-width: 768px) 33vw, 50vw"
                />
              </div>
              <p className="mt-4 flex items-center justify-between gap-2 text-lg text-ink">
                {categoryLabel(category, locale)}
                <span className="text-ash transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1"><Arrow /></span>
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works — espresso earth band */}
      <section className="bg-espresso text-white">
        <div className="container-x py-20 md:py-28">
          <div data-reveal>
          <p className="label text-gold-pale">{t.home.howEyebrow}</p>
          <h2 className="mt-4 max-w-3xl font-display text-4xl font-light leading-tight md:text-5xl">{t.home.howTitle}</h2>
          </div>
          <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            {t.home.steps.map((step, index) => (
              <li key={step.title} data-reveal style={revealDelay(index, 3)} className="border-t border-white/15 pt-6">
                <span className="font-display text-5xl font-light text-gold-pale">0{index + 1}</span>
                <h3 className="mt-4 text-xl">{step.title}</h3>
                <p className="mt-2 text-base leading-7 text-white/70">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Featured products */}
      <section className="container-x py-20 md:py-32">
        <div data-reveal>
          <p className="label text-ink">{t.home.featuredEyebrow}</p>
          <h2 className="heading-display mt-4 text-4xl md:text-5xl">{t.home.featuredTitle}</h2>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-4 md:gap-x-6">
          {products.slice(0, 8).map((product, index) => (
            <ProductCard key={product.id} product={toCardProduct(product)} index={index} />
          ))}
        </div>
      </section>

      {/* Visit the shop */}
      <section className="container-x pb-24 md:pb-32">
        <div data-reveal className="grid overflow-hidden rounded-card border border-hairline bg-white md:grid-cols-2 md:rounded-media">
          <div className="flex flex-col justify-center p-8 md:p-14">
            <p className="label text-ink">{t.home.visitEyebrow}</p>
            <h2 className="heading-display mt-4 text-4xl md:text-5xl">{t.home.visitTitle}</h2>
            <p className="mt-5 text-lg leading-8 text-stone">{t.home.visitText}</p>
            <p className="mt-6 text-lg text-ink">{t.address}</p>
            <a className="mt-1 text-lg text-ink" href={`tel:${storeInfo.phone.replace(/\s/g, "")}`} dir="ltr">
              {storeInfo.phone}
            </a>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={storeInfo.googleMapsUrl} target="_blank" rel="noreferrer" className="btn-stone">
                {t.home.openMaps}
              </a>
              <a href={`https://wa.me/${storeInfo.whatsapp}`} className="btn-secondary">
                <MessageCircle size={18} /> {t.home.whatsappUs}
              </a>
            </div>
          </div>
          <iframe className="h-80 w-full border-0 md:h-full md:min-h-[420px]" src={storeInfo.mapsEmbed} loading="lazy" title={t.contact.mapTitle} />
        </div>
      </section>
    </>
  );
}
