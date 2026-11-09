"use client";

import { FadeImage } from "@/components/motion/fade-image";
import Link from "next/link";
import { X } from "lucide-react";
import { useEffect } from "react";
import { useI18n } from "@/components/i18n/locale-provider";
import { QuantityStepper } from "@/components/store/quantity-stepper";
import { WhatsAppCheckoutButton } from "@/components/store/whatsapp-checkout-button";
import { cartItemName, formatPrice, localePath } from "@/lib/i18n";
import { getCartTotal, useCartStore } from "@/lib/store";

export function CartDrawer() {
  const { locale, t } = useI18n();
  const { items, isOpen, closeCart, removeItem, updateQuantity } = useCartStore();
  const total = getCartTotal(items);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && closeCart();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, closeCart]);

  return (
    <div className={`fixed inset-0 z-[60] ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`} aria-hidden={!isOpen}>
      <button
        className={`absolute inset-0 bg-ink/30 transition-opacity duration-500 ${isOpen ? "opacity-100" : "opacity-0"}`}
        onClick={closeCart}
        aria-label={t.cart.closeOverlay}
        tabIndex={isOpen ? 0 : -1}
      />
      <aside
        role="dialog"
        aria-label={t.cart.drawerTitle}
        className={`absolute end-0 top-0 flex h-full w-full max-w-md flex-col bg-canvas shadow-float transition-transform duration-500 ease-calm ${
          isOpen ? "translate-x-0" : "translate-x-full rtl:-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-hairline px-6 py-5">
          <h2 className="font-display text-2xl font-light text-ink">{t.cart.drawerTitle}</h2>
          <button className="icon-btn" onClick={closeCart} aria-label={t.cart.closeOverlay} tabIndex={isOpen ? 0 : -1}>
            <X size={18} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6">
          {items.length ? (
            <ul>
              {items.map((item) => {
                const name = cartItemName(item, locale);
                return (
                  <li key={item.id} className="grid animate-fade-in grid-cols-[84px_1fr] gap-4 border-b border-hairline py-5">
                    <div className="relative aspect-square overflow-hidden rounded-2xl bg-surface-grey">
                      {item.image ? <FadeImage src={item.image} alt={name} fill className="object-cover" sizes="84px" /> : null}
                    </div>
                    <div>
                      <div className="flex justify-between gap-2">
                        <Link href={localePath(locale, `/products/${item.slug}`)} onClick={closeCart} className="text-base text-ink hover:text-stone">
                          {name}
                        </Link>
                        <button className="h-8 w-8 shrink-0 text-ash hover:text-ink" onClick={() => removeItem(item.id)} aria-label={t.cart.remove(name)}>
                          <X size={16} className="mx-auto" />
                        </button>
                      </div>
                      <p className="mt-1 text-sm text-stone">{formatPrice(item.price, locale)}</p>
                      <div className="mt-3">
                        <QuantityStepper value={item.quantity} onChange={(value) => updateQuantity(item.id, value)} />
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="py-10 text-center">
              <p className="font-display text-2xl font-light text-ink">{t.cart.empty}</p>
              <p className="mt-3 text-base text-stone">{t.cart.emptyHint}</p>
              <Link href={localePath(locale, "/products")} onClick={closeCart} className="btn-secondary mt-6">
                {t.cart.browse}
              </Link>
            </div>
          )}
        </div>
        {items.length ? (
          <div className="border-t border-hairline px-6 py-5">
            <div className="mb-1 flex justify-between text-lg text-ink">
              <span>{t.cart.total}</span>
              <span>{formatPrice(total, locale)}</span>
            </div>
            <p className="mb-4 text-sm text-ash">{t.cart.summaryText}</p>
            <WhatsAppCheckoutButton items={items} className="btn-primary w-full" onCheckout={closeCart} />
            <Link onClick={closeCart} href={localePath(locale, "/cart")} className="mt-3 flex justify-center py-2 text-sm text-stone underline-offset-4 hover:underline">
              {t.cart.viewList}
            </Link>
          </div>
        ) : null}
      </aside>
    </div>
  );
}
