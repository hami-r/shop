import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/store/add-to-cart-button";
import { ProductGallery } from "@/components/store/product-gallery";
import { ProductCard } from "@/components/store/product-card";
import { getProductBySlug, getProducts, formatAED } from "@/lib/products";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) return {};
  return {
    title: `${product.name} in Sharjah UAE`,
    description: product.description ?? `Ask about ${product.name} from Al Miaraj Sharjah UAE.`,
    openGraph: {
      title: `${product.name} | Al Miaraj Sharjah UAE`,
      description: product.description ?? "Product available for enquiry at Al Miaraj.",
      images: product.images?.[0] ? [{ url: product.images[0], alt: product.name }] : []
    }
  };
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();
  const products = await getProducts();
  const images = product.images?.length ? product.images : [];

  return (
    <section className="px-5 py-8 md:px-16 md:py-12">
      <div className="mx-auto max-w-boutique">
        <nav className="label mb-6 flex gap-2 overflow-x-auto text-on-surface-variant">
          <span>Home</span>
          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <span className="text-secondary">{product.name}</span>
        </nav>
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <ProductGallery images={images} name={product.name} />
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
  );
}
