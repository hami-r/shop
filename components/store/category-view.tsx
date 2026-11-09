import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Pagination } from "@/components/store/pagination";
import { ProductCard } from "@/components/store/product-card";
import { getCategories } from "@/lib/categories";
import { categoryLabel, getDictionary, localePath, locales, productName, type Locale } from "@/lib/i18n";
import { getProducts, PAGE_SIZE, paginate, toCardProduct } from "@/lib/products";
import { alternatesFor, categoryPath, categorySlug, getCategoryCopy, toAbsoluteUrl } from "@/lib/seo";
import { getBaseUrl } from "@/lib/site-url";

async function findCategory(slug: string) {
  const categories = await getCategories();
  return categories.find((category) => categorySlug(category) === slug) ?? null;
}

/** English path of a category page: page 1 is /shop/x, later pages /shop/x/page/n. */
function pagePath(category: string, page: number) {
  return `/shop/${categorySlug(category)}${page > 1 ? `/page/${page}` : ""}`;
}

/** All (locale, category, page) combinations, for static generation. */
export async function categoryStaticParams({ pagesOnly }: { pagesOnly: boolean }) {
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);
  return locales.flatMap((locale) =>
    categories.flatMap((category) => {
      const count = products.filter((product) => product.category === category).length;
      const pageCount = Math.max(1, Math.ceil(count / PAGE_SIZE));
      if (!pagesOnly) return [{ locale, category: categorySlug(category) }];
      return Array.from({ length: pageCount - 1 }, (_, i) => ({ locale, category: categorySlug(category), page: String(i + 2) }));
    })
  );
}

export async function categoryMetadata(locale: Locale, slug: string, page: number): Promise<Metadata> {
  const category = await findCategory(slug);
  if (!category) return {};
  const t = getDictionary(locale);
  const copy = getCategoryCopy(category, locale);
  const alternates = alternatesFor(locale, pagePath(category, page), getBaseUrl());
  const products = (await getProducts()).filter((product) => product.category === category);
  const image = products.find((product) => product.images?.[0])?.images?.[0];
  const suffix = page > 1 ? (locale === "ar" ? ` – صفحة ${page}` : ` – Page ${page}`) : "";
  const title = `${t.category.metaTitle(copy.heading, categoryLabel(category, locale))}${suffix}`;

  return {
    title: { absolute: title },
    description: copy.intro,
    keywords: copy.keywords,
    alternates,
    openGraph: { title, description: copy.intro, url: alternates.canonical, type: "website", images: image ? [{ url: image, alt: copy.heading }] : undefined }
  };
}

export async function CategoryView({ locale, slug, page: requestedPage }: { locale: Locale; slug: string; page: number }) {
  const category = await findCategory(slug);
  if (!category) notFound();

  const t = getDictionary(locale);
  const [allProducts, categories] = await Promise.all([getProducts(), getCategories()]);
  const inCategory = allProducts.filter((product) => product.category === category);
  const { items: products, page, pageCount } = paginate(inCategory, requestedPage);
  if (requestedPage > 1 && page !== requestedPage) notFound();

  const copy = getCategoryCopy(category, locale);
  const label = categoryLabel(category, locale);
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}${localePath(locale, pagePath(category, page))}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#page`,
        name: copy.heading,
        description: copy.intro,
        url,
        inLanguage: locale,
        isPartOf: { "@id": `${baseUrl}/#website` },
        about: { "@id": `${baseUrl}/#localbusiness` },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: inCategory.length,
          itemListElement: products.map((product, index) => ({
            "@type": "ListItem",
            position: (page - 1) * PAGE_SIZE + index + 1,
            url: `${baseUrl}${localePath(locale, `/products/${product.slug}`)}`,
            name: productName(product, locale),
            image: product.images?.[0] ? toAbsoluteUrl(product.images[0], baseUrl) : undefined
          }))
        }
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: t.breadcrumb.home, item: `${baseUrl}${localePath(locale, "/")}` },
          { "@type": "ListItem", position: 2, name: t.breadcrumb.products, item: `${baseUrl}${localePath(locale, "/products")}` },
          { "@type": "ListItem", position: 3, name: label, item: `${baseUrl}${categoryPath(category, locale)}` }
        ]
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="container-x py-12 md:py-20">
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-sm text-ash">
          <Link href={localePath(locale, "/")} className="hover:text-ink">{t.breadcrumb.home}</Link>
          <span aria-hidden>/</span>
          <Link href={localePath(locale, "/products")} className="hover:text-ink">{t.breadcrumb.products}</Link>
          <span aria-hidden>/</span>
          <span className="text-ink" aria-current="page">{label}</span>
        </nav>
        <p className="label animate-rise text-ink">{t.area}</p>
        <h1 style={{ animationDelay: "80ms" }} className="heading-display mt-4 animate-rise text-5xl md:text-7xl rtl:leading-[1.3]">{copy.heading}</h1>
        <p style={{ animationDelay: "180ms" }} className="mt-6 max-w-3xl animate-rise font-display text-xl font-light leading-snug text-stone md:text-2xl">{copy.intro}</p>

        <p className="mt-12 text-sm text-ash">{t.products.count(inCategory.length)}</p>
        <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={toCardProduct(product)} priority={index < 4} index={index} />
          ))}
        </div>
        {!products.length ? (
          <p className="mt-6 rounded-card border border-hairline bg-white p-8 text-stone">
            {t.category.comingSoon(label)}{" "}
            <Link className="text-ink underline underline-offset-4" href={localePath(locale, "/contact")}>{t.category.askUs}</Link>
          </p>
        ) : null}
        <Pagination locale={locale} page={page} pageCount={pageCount} href={(n) => localePath(locale, pagePath(category, n))} />

        <div data-reveal className="mt-24 border-t border-hairline pt-10">
          <h2 className="font-display text-3xl font-light text-ink">{t.category.moreFrom}</h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {categories
              .filter((item) => item !== category)
              .map((item) => (
                <Link key={item} href={categoryPath(item, locale)} className="rounded-full border border-silver px-4 py-2 text-sm text-stone hover:border-stone">
                  {getCategoryCopy(item, locale).heading}
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
