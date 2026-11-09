"use client";

import { FadeImage } from "@/components/motion/fade-image";
import Link from "next/link";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useI18n } from "@/components/i18n/locale-provider";
import { QuantityStepper } from "@/components/store/quantity-stepper";
import { ListRowsSkeleton, SkeletonBlock } from "@/components/ui/skeletons";
import { WhatsAppCheckoutButton } from "@/components/store/whatsapp-checkout-button";
import { cartItemName, formatPrice, localePath } from "@/lib/i18n";
import { getCartTotal, useCartStore } from "@/lib/store";

export function CartPageClient() {
  const { locale, t } = useI18n();
  const { items, updateQuantity, removeItem } = useCartStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const list = mounted ? items : [];
  const total = getCartTotal(list);

  return (
    <section className="container-x py-12 md:py-20">
      <h1 className="animate-rise heading-display text-4xl md:text-6xl">{t.cart.title}</h1>
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
        <div>
          {!mounted ? (
            <ListRowsSkeleton rows={2} />
          ) : list.length ? (
            <ul className="border-t border-hairline">
              {list.map((item) => {
                const name = cartItemName(item, locale);
                return (
                  <li key={item.id} className="grid animate-fade-in grid-cols-[96px_1fr_auto] items-start gap-4 border-b border-hairline py-6 md:grid-cols-[120px_1fr_auto]">
                    <Link href={localePath(locale, `/products/${item.slug}`)} className="relative aspect-square overflow-hidden rounded-2xl bg-surface-grey">
                      {item.image ? <FadeImage src={item.image} alt={name} fill className="object-cover" sizes="120px" /> : null}
                    </Link>
                    <div>
                      <Link href={localePath(locale, `/products/${item.slug}`)} className="text-lg text-ink hover:text-stone">{name}</Link>
                      <p className="mt-1 text-sm text-stone">{formatPrice(item.price, locale)}</p>
                      <div className="mt-4">
                        <QuantityStepper value={item.quantity} onChange={(value) => updateQuantity(item.id, value)} />
                      </div>
                    </div>
                    <button className="grid h-10 w-10 place-items-center text-ash hover:text-ink" onClick={() => removeItem(item.id)} aria-label={t.cart.remove(name)}>
                      <X size={18} />
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="rounded-card border border-hairline bg-white p-10 text-center">
              <p className="font-display text-3xl font-light text-ink">{t.cart.empty}</p>
              <p className="mt-3 text-stone">{t.cart.emptyHint}</p>
              <Link href={localePath(locale, "/products")} className="btn-secondary mt-6">{t.cart.browse}</Link>
            </div>
          )}
        </div>
        <aside className="h-fit rounded-card border border-hairline bg-white p-6 lg:sticky lg:top-32">
          <p className="label text-ink">{t.cart.summary}</p>
          <div className="mt-5 flex justify-between text-xl text-ink">
            <span>{t.cart.total}</span>
            {mounted ? <span className="animate-fade-in">{formatPrice(total, locale)}</span> : <SkeletonBlock className="h-6 w-24" />}
          </div>
          <p className="mt-3 text-sm leading-6 text-stone">{t.cart.summaryText}</p>
          <div className="mt-6">
            <WhatsAppCheckoutButton items={list} className="btn-primary w-full" />
          </div>
        </aside>
      </div>
    </section>
  );
}
