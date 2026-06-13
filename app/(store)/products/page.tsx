import type { Metadata } from "next";
import { ProductCard } from "@/components/store/product-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { getCategories } from "@/lib/categories";
import { getProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop Bukhoor, Oud, Perfumes and Cosmetics in Sharjah UAE",
  description: "Browse Al Miaraj products, send an enquiry on WhatsApp, and visit the Sharjah shop for pickup."
};

export default async function ProductsPage({
  searchParams
}: {
  searchParams: { category?: string; q?: string };
}) {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);
  const category = searchParams.category ?? "All";
  const query = (searchParams.q ?? "").toLowerCase();
  const filtered = products.filter((product) => {
    const matchesCategory = category === "All" || product.category === category;
    const matchesQuery = !query || `${product.name} ${product.description} ${product.category}`.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });

  return (
    <section className="px-5 py-10 md:px-16 md:py-16">
      <div className="mx-auto max-w-boutique">
        <SectionHeading eyebrow="Products" title="Browse Al Miaraj in Sharjah" />
        <form className="mt-8 grid gap-3 rounded-3xl bg-surface-container-low p-4 md:grid-cols-[1fr_auto]">
          <input name="q" defaultValue={searchParams.q} className="input" placeholder="Search Bukhoor, Oud, perfume..." />
          <select name="category" defaultValue={category} className="input md:w-56">
            <option>All</option>
            {categories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <button className="btn-primary md:col-span-2 md:w-fit">Apply Filters</button>
        </form>
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 md:gap-x-6">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {!filtered.length ? <p className="mt-10 rounded-3xl bg-surface-container-low p-6 text-on-surface-variant">No products found.</p> : null}
      </div>
    </section>
  );
}
