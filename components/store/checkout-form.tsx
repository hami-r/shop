"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/i18n/locale-provider";
import { sendToWhatsApp } from "@/components/store/whatsapp-checkout-button";
import { SkeletonBlock } from "@/components/ui/skeletons";
import { Spinner } from "@/components/ui/spinner";
import { cartItemName, formatPrice, localePath } from "@/lib/i18n";
import { useCartStore } from "@/lib/store";

export function CheckoutForm() {
  const { locale, t } = useI18n();
  const { items } = useCartStore();
  const hasStarted = useRef(false);
  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted || !items.length || hasStarted.current) return;
    hasStarted.current = true;
    sendToWhatsApp(items, locale).catch(() => setError(t.cart.error));
  }, [items, locale, mounted, t.cart.error]);

  if (!mounted) {
    return (
      <div className="mt-10 rounded-card border border-hairline bg-white p-6 md:p-8" aria-busy="true">
        <SkeletonBlock className="h-3 w-40" />
        <SkeletonBlock className="mt-4 h-4 w-3/4" />
        <SkeletonBlock className="mt-8 h-4 w-full" />
        <SkeletonBlock className="mt-3 h-4 w-full" />
      </div>
    );
  }

  return (
    <div className="mt-10 rounded-card border border-hairline bg-white p-6 md:p-8">
      <p className="label flex animate-fade-in items-center gap-3 text-ink">
        {items.length && !error ? <Spinner size={14} /> : null}
        {items.length ? t.checkout.opening : t.checkout.emptyTitle}
      </p>
      <p className="mt-3 text-stone">{items.length ? t.checkout.openingText : t.checkout.emptyText}</p>
      {items.length ? (
        <ul className="mt-6 grid gap-3 border-t border-hairline pt-5 text-base">
          {items.map((item) => (
            <li key={item.id} className="flex justify-between gap-4">
              <span>{cartItemName(item, locale)} × {item.quantity}</span>
              <span className="text-stone">{formatPrice(item.price, locale)}</span>
            </li>
          ))}
        </ul>
      ) : (
        <Link href={localePath(locale, "/products")} className="btn-primary mt-6">
          {t.cart.browse}
        </Link>
      )}
      {error ? <p className="mt-4 text-sm font-semibold text-error">{error}</p> : null}
    </div>
  );
}
