"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { WhatsAppCheckoutButton } from "@/components/store/whatsapp-checkout-button";
import { formatAED } from "@/lib/products";
import { getCartTotal, useCartStore } from "@/lib/store";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity } = useCartStore();
  const total = getCartTotal(items);

  return (
    <div className={`fixed inset-0 z-[60] ${isOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
      <button className={`absolute inset-0 bg-primary/30 ${isOpen ? "opacity-100" : "opacity-0"}`} onClick={closeCart} aria-label="Close cart overlay" />
      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-surface p-5 shadow-boutique duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-outline-variant pb-4">
          <h2 className="font-display text-2xl font-semibold text-primary">Enquiry List</h2>
          <button onClick={closeCart} aria-label="Close cart">
            <X />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto py-5">
          {items.length ? (
            <div className="grid gap-4">
              {items.map((item) => (
                <div key={item.id} className="grid grid-cols-[80px_1fr] gap-4">
                  <div className="relative aspect-square overflow-hidden rounded-2xl bg-surface-container">
                    {item.image ? <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" /> : null}
                  </div>
                  <div>
                    <div className="flex justify-between gap-2">
                      <Link href={`/products/${item.slug}`} onClick={closeCart} className="font-semibold text-primary">
                        {item.name}
                      </Link>
                      <button className="text-outline" onClick={() => removeItem(item.id)}>
                        <X size={16} />
                      </button>
                    </div>
                    <p className="mt-1 text-sm text-on-surface-variant">{formatAED(item.price)}</p>
                    <div className="mt-3 inline-flex items-center rounded-full border border-outline-variant">
                      <button className="p-2" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                      <button className="p-2" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="rounded-3xl bg-surface-container-low p-6 text-sm text-on-surface-variant">Add products here before sending an enquiry.</p>
          )}
        </div>
        <div className="border-t border-outline-variant pt-4">
          <div className="mb-4 flex justify-between font-semibold">
            <span>Total</span>
            <span>{formatAED(total)}</span>
          </div>
          <WhatsAppCheckoutButton items={items} className="btn-primary w-full" onCheckout={closeCart} />
          <Link onClick={closeCart} href="/cart" className="mt-3 flex justify-center text-sm font-semibold text-secondary">
            View enquiry list
          </Link>
        </div>
      </aside>
    </div>
  );
}
