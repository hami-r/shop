"use client";

import Link from "next/link";
import { Check, Plus } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/components/i18n/locale-provider";
import { FadeImage } from "@/components/motion/fade-image";
import { revealDelay } from "@/lib/motion";
import { categoryLabel, formatPrice, localePath, productName } from "@/lib/i18n";
import { useCartStore } from "@/lib/store";
import type { CardProduct } from "@/lib/types";

export function ProductCard({ product, priority = false, index = 0 }: { product: CardProduct; priority?: boolean; index?: number }) {
  const { locale, t } = useI18n();
  const addProduct = useCartStore((state) => state.addProduct);
  const [added, setAdded] = useState(false);
  const image = product.images?.[0];
  const name = productName(product, locale);
  const category = categoryLabel(product.category, locale);
  const href = localePath(locale, `/products/${product.slug}`);

  function add() {
    addProduct(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1500);
  }

  return (
    <article className="group" data-reveal style={revealDelay(index)}>
      <div className="relative">
        <Link href={href} className="relative block aspect-[4/5] overflow-hidden rounded-card bg-surface-grey md:rounded-[32px]">
          {image ? (
            <FadeImage
              src={image}
              alt={t.product.imageAlt(name, category)}
              fill
              priority={priority}
              className="object-cover group-hover:scale-[1.03]"
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
            />
          ) : null}
        </Link>
        <button
          type="button"
          className="icon-btn absolute bottom-3 end-3 shadow-boutique [@media(hover:hover)]:translate-y-1 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:focus-visible:translate-y-0 [@media(hover:hover)]:focus-visible:opacity-100"
          onClick={add}
          aria-label={t.product.addAria(name)}
        >
          {added ? <Check size={18} className="animate-pop" /> : <Plus size={18} />}
        </button>
      </div>
      <div className="mt-4 px-1">
        <p className="label text-ash">{category}</p>
        <Link href={href} className="mt-1.5 block text-base leading-snug text-ink hover:text-stone md:text-lg">
          {name}
        </Link>
        <div className="mt-1 flex flex-wrap items-baseline gap-2 text-base text-stone">
          <span>{formatPrice(Number(product.price), locale)}</span>
          {product.compare_price ? <span className="text-sm text-ash line-through">{formatPrice(Number(product.compare_price), locale)}</span> : null}
        </div>
      </div>
    </article>
  );
}
