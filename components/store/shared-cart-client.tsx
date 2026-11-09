"use client";

import { FadeImage } from "@/components/motion/fade-image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useI18n } from "@/components/i18n/locale-provider";
import { Spinner } from "@/components/ui/spinner";
import { QuantityStepper } from "@/components/store/quantity-stepper";
import { cartItemName, formatPrice, localePath } from "@/lib/i18n";
import { getCartTotal } from "@/lib/store";
import type { CartItem } from "@/lib/types";

export function SharedCartClient({ cartId, initialItems, editToken }: { cartId: string; initialItems: CartItem[]; editToken?: string }) {
  const { locale, t } = useI18n();
  const [items, setItems] = useState(initialItems);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const canEdit = Boolean(editToken);
  const total = getCartTotal(items);

  useEffect(() => {
    if (editToken) return;
    const publicUrl = `${window.location.origin}${window.location.pathname}`;
    const editUrl = window.localStorage.getItem(`almiaraj-cart-edit-${publicUrl}`);
    if (editUrl) window.location.replace(editUrl);
  }, [cartId, editToken]);

  function updateQuantity(id: string, quantity: number) {
    setItems((current) => current.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item)));
  }

  async function saveCart() {
    if (!editToken) return;
    setStatus(t.shared.saving);
    setSaving(true);
    const response = await fetch(`/api/cart-links/${cartId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", "x-cart-edit-token": editToken },
      body: JSON.stringify({ items })
    });
    setSaving(false);
    setStatus(response.ok ? t.shared.saved : t.shared.saveError);
  }

  return (
    <section className="container-x py-12 md:py-20">
      <div className="flex animate-rise flex-wrap items-end justify-between gap-4">
        <div>
          <p className="label text-ink">{canEdit ? t.shared.editable : t.shared.shared}</p>
          <h1 className="heading-display mt-3 text-4xl md:text-6xl">{t.shared.title}</h1>
        </div>
        {canEdit ? (
          <button type="button" className="btn-primary" onClick={saveCart} disabled={saving} aria-busy={saving}>
            {saving ? <Spinner /> : null}
            {t.shared.save}
          </button>
        ) : null}
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
        <ul className="border-t border-hairline">
          {items.map((item) => {
            const name = cartItemName(item, locale);
            const href = localePath(locale, `/products/${item.slug}`);
            return (
              <li key={item.id} className="grid grid-cols-[96px_1fr] gap-4 border-b border-hairline py-6 md:grid-cols-[120px_1fr_auto]">
                <Link href={href} className="relative aspect-square overflow-hidden rounded-2xl bg-surface-grey">
                  {item.image ? <FadeImage src={item.image} alt={name} fill className="object-cover" sizes="120px" /> : null}
                </Link>
                <div>
                  <Link href={href} className="text-lg text-ink hover:text-stone">{name}</Link>
                  <p className="mt-1 text-sm text-stone">{formatPrice(item.price, locale)}</p>
                  <div className="mt-4">
                    {canEdit ? (
                      <QuantityStepper value={item.quantity} onChange={(value) => updateQuantity(item.id, value)} />
                    ) : (
                      <p className="text-sm text-ink">{t.shared.quantity(item.quantity)}</p>
                    )}
                  </div>
                </div>
                <p className="text-lg text-ink">{formatPrice(item.price * item.quantity, locale)}</p>
              </li>
            );
          })}
        </ul>

        <aside className="h-fit rounded-card border border-hairline bg-white p-6">
          <p className="label text-ink">{t.cart.summary}</p>
          <div className="mt-5 flex justify-between text-xl text-ink">
            <span>{t.cart.total}</span>
            <span>{formatPrice(total, locale)}</span>
          </div>
          <p className="mt-3 text-sm text-stone">{canEdit ? t.shared.editNote : t.shared.viewNote}</p>
          {status ? <p key={status} className="mt-4 animate-fade-in text-sm font-semibold text-ink" role="status">{status}</p> : null}
        </aside>
      </div>
    </section>
  );
}
