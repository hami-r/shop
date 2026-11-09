"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatAED } from "@/lib/products";
import { useCartStore } from "@/lib/store";
import { productImageAlt } from "@/lib/seo";

export function ProductCard({ product }: { product: Product }) {
  const addProduct = useCartStore((state) => state.addProduct);
  const image = product.images?.[0] ?? "/placeholder.png";

  return (
    <article className="group">
      <div className="relative">
        <Link href={`/products/${product.slug}`} className="relative block aspect-[4/5] overflow-hidden rounded-3xl bg-surface-container-low shadow-boutique">
          <Image src={image} alt={productImageAlt(product.name, product.category)} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(min-width: 768px) 25vw, 50vw" />
        </Link>
        <button
          className="absolute bottom-3 right-3 grid h-10 w-10 place-items-center rounded-full bg-secondary text-white shadow-boutique hover:scale-105 md:h-11 md:w-11"
          onClick={() => addProduct(product)}
          aria-label={`Add ${product.name} to enquiry`}
        >
          <Plus size={18} />
        </button>
      </div>
      <div className="mt-3">
        <p className="label text-secondary">{product.category ?? "Shop Item"}</p>
        <Link href={`/products/${product.slug}`} className="mt-2 block font-display text-lg font-semibold leading-snug text-primary md:text-xl">
          {product.name}
        </Link>
        <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-on-surface-variant">
          <span>{formatAED(product.price)}</span>
          {product.compare_price ? <span className="text-outline line-through">{formatAED(product.compare_price)}</span> : null}
        </div>
      </div>
    </article>
  );
}
