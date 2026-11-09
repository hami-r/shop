import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/store/product-card";
import { getCategories } from "@/lib/categories";
import { getProducts } from "@/lib/products";
import { storeInfo } from "@/lib/sample-data";
import { categoryPath, categorySlug, getCategoryCopy, toAbsoluteUrl } from "@/lib/seo";
import { getBaseUrl } from "@/lib/site-url";

export const revalidate = 60;

async function findCategory(slug: string) {
  const categories = await getCategories();
  return categories.find((category) => categorySlug(category) === slug) ?? null;
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({ category: categorySlug(category) }));
}

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const category = await findCategory(params.category);
  if (!category) return {};
  const copy = getCategoryCopy(category);
  const url = `${getBaseUrl()}${categoryPath(category)}`;
  const products = (await getProducts()).filter((product) => product.category === category);
  const image = products.find((product) => product.images?.[0])?.images?.[0];

  return {
    title: { absolute: `${copy.heading} – Buy ${category} | Al Miaraj` },
    description: copy.intro,
    keywords: copy.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: `${copy.heading} | Al Miaraj`,
      description: copy.intro,
      url,
      type: "website",
      images: image ? [{ url: image, alt: `${category} at Al Miaraj Sharjah` }] : undefined
    }
  };
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const category = await findCategory(params.category);
  if (!category) notFound();

  const [allProducts, categories] = await Promise.all([getProducts(), getCategories()]);
  const products = allProducts.filter((product) => product.category === category);
  const copy = getCategoryCopy(category);
  const baseUrl = getBaseUrl();
  const url = `${baseUrl}${categoryPath(category)}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#page`,
        name: copy.heading,
        description: copy.intro,
        url,
        isPartOf: { "@id": `${baseUrl}/#website` },
        about: { "@id": `${baseUrl}/#localbusiness` },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: products.length,
          itemListElement: products.map((product, index) => ({
            "@type": "ListItem",
            position: index + 1,
            url: `${baseUrl}/products/${product.slug}`,
            name: product.name,
            image: product.images?.[0] ? toAbsoluteUrl(product.images[0], baseUrl) : undefined
          }))
        }
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
          { "@type": "ListItem", position: 2, name: "Products", item: `${baseUrl}/products` },
          { "@type": "ListItem", position: 3, name: category, item: url }
        ]
      }
    ]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="px-5 py-10 md:px-16 md:py-16">
        <div className="mx-auto max-w-boutique">
          <nav aria-label="Breadcrumb" className="label mb-6 flex items-center gap-2 overflow-x-auto text-on-surface-variant">
            <Link href="/" className="transition-colors hover:text-primary">Home</Link>
            <span>/</span>
            <Link href="/products" className="transition-colors hover:text-primary">Products</Link>
            <span>/</span>
            <span className="font-medium text-secondary" aria-current="page">{category}</span>
          </nav>
          <p className="label mb-3 text-secondary">Al Miaraj · {storeInfo.address}</p>
          <h1 className="font-display text-4xl font-semibold leading-tight text-primary md:text-5xl">{copy.heading}</h1>
          <div className="mt-4 h-1 w-12 rounded-full bg-secondary" />
          <p className="mt-6 max-w-3xl text-base leading-8 text-on-surface-variant">{copy.intro}</p>

          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {!products.length ? (
            <p className="mt-10 rounded-3xl bg-surface-container-low p-6 text-on-surface-variant">
              New {category} is coming soon. <Link className="font-semibold text-secondary" href="/contact">Ask us</Link> what is in the shop today.
            </p>
          ) : null}

          <div className="mt-16 border-t border-outline-variant pt-8">
            <h2 className="font-display text-2xl font-semibold text-primary">More from Al Miaraj</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {categories
                .filter((item) => item !== category)
                .map((item) => (
                  <Link key={item} href={categoryPath(item)} className="rounded-full bg-surface-container-low px-4 py-2 text-sm font-semibold text-primary hover:text-secondary">
                    {getCategoryCopy(item).heading}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
