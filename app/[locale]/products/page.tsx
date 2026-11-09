import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";
import { ProductCard } from "@/components/store/product-card";
import { getCategories } from "@/lib/categories";
import { categoryLabel, getDictionary, localePath, type Locale } from "@/lib/i18n";
import { Pagination } from "@/components/store/pagination";
import { getProducts, paginate, toCardProduct } from "@/lib/products";
import { alternatesFor, categoryPath } from "@/lib/seo";
import { getBaseUrl } from "@/lib/site-url";

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  const t = getDictionary(params.locale);
  const alternates = alternatesFor(params.locale, "/products", getBaseUrl());
  return {
    title: { absolute: t.products.metaTitle },
    description: t.products.metaDescription,
    alternates,
    openGraph: { title: t.products.metaTitle, description: t.products.metaDescription, url: alternates.canonical }
  };
}

export default async function ProductsPage({
  params,
  searchParams
}: {
  params: { locale: Locale };
  searchParams: { category?: string; q?: string; page?: string };
}) {
  const locale = params.locale;
  const t = getDictionary(locale);
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);
  const category = searchParams.category ?? "All";
  const query = (searchParams.q ?? "").trim().toLowerCase();
  const filtered = products.filter((product) => {
    const matchesCategory = category === "All" || product.category === category;
    const haystack = `${product.name} ${product.name_ar ?? ""} ${product.description ?? ""} ${product.description_ar ?? ""} ${product.category ?? ""} ${categoryLabel(product.category, "ar")}`.toLowerCase();
    return matchesCategory && (!query || haystack.includes(query));
  });
  const { items: visible, page, pageCount } = paginate(filtered, Number(searchParams.page ?? 1));
  const pageHref = (n: number) => {
    const qs = new URLSearchParams();
    if (searchParams.q) qs.set("q", searchParams.q);
    if (searchParams.category) qs.set("category", searchParams.category);
    if (n > 1) qs.set("page", String(n));
    const query = qs.toString();
    return `${localePath(locale, "/products")}${query ? `?${query}` : ""}`;
  };

  return (
    <section className="container-x py-12 md:py-20">
      <p className="label animate-rise text-ink">{t.products.eyebrow}</p>
      <h1 style={{ animationDelay: "80ms" }} className="heading-display mt-4 animate-rise text-5xl md:text-7xl">{t.products.title}</h1>

      <nav style={{ animationDelay: "180ms" }} aria-label={t.home.categoriesEyebrow} className="mt-10 flex animate-rise flex-wrap gap-2">
        <Link
          href={localePath(locale, "/products")}
          className={`rounded-full border px-4 py-2 text-sm ${category === "All" && !query ? "border-stone bg-stone text-white" : "border-silver text-stone hover:border-stone"}`}
        >
          {t.products.allCategories}
        </Link>
        {categories.map((item) => (
          <Link key={item} href={categoryPath(item, locale)} className="rounded-full border border-silver px-4 py-2 text-sm text-stone hover:border-stone">
            {categoryLabel(item, locale)}
          </Link>
        ))}
      </nav>

      <form className="mt-6 flex max-w-xl gap-2" role="search">
        <label className="sr-only" htmlFor="q">{t.products.searchPlaceholder}</label>
        <input id="q" name="q" defaultValue={searchParams.q} className="input rounded-full ps-5" placeholder={t.products.searchPlaceholder} />
        <button className="btn-stone shrink-0 px-5" aria-label={t.products.apply}>
          <Search size={18} />
          <span className="hidden sm:inline">{t.products.apply}</span>
        </button>
      </form>

      <p className="mt-10 text-sm text-ash">{t.products.count(filtered.length)}</p>
      <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
        {visible.map((product, index) => (
          <ProductCard key={product.id} product={toCardProduct(product)} priority={index < 4} index={index} />
        ))}
      </div>
      <Pagination locale={locale} page={page} pageCount={pageCount} href={pageHref} />
      {!filtered.length ? <p className="mt-6 rounded-card border border-hairline bg-white p-8 text-stone">{t.products.empty}</p> : null}
    </section>
  );
}
