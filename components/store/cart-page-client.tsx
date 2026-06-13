"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { WhatsAppCheckoutButton } from "@/components/store/whatsapp-checkout-button";
import { formatAED } from "@/lib/products";
import { getCartTotal, useCartStore } from "@/lib/store";

export function CartPageClient() {
  const { items, updateQuantity, removeItem } = useCartStore();
  const total = getCartTotal(items);

  return (
    <section className="px-5 py-10 md:px-16">
      <div className="mx-auto max-w-boutique">
        <h1 className="font-display text-4xl font-semibold text-primary">Your Enquiry List</h1>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="grid gap-4">
            {items.map((item) => (
              <div key={item.id} className="grid grid-cols-[96px_1fr] gap-4 rounded-3xl bg-surface-container-low p-4">
                <div className="relative aspect-square overflow-hidden rounded-2xl">
                  {item.image ? <Image src={item.image} alt={item.name} fill className="object-cover" sizes="96px" /> : null}
                </div>
                <div>
                  <div className="flex justify-between gap-3">
                    <Link href={`/products/${item.slug}`} className="font-semibold text-primary">{item.name}</Link>
                    <button onClick={() => removeItem(item.id)}><X size={18} /></button>
                  </div>
                  <p className="mt-1 text-sm text-on-surface-variant">{formatAED(item.price)}</p>
                  <div className="mt-4 inline-flex items-center rounded-full border border-outline-variant">
                    <button className="p-2" onClick={() => updateQuantity(item.id, item.quantity - 1)}><Minus size={14} /></button>
                    <span className="w-9 text-center text-sm font-semibold">{item.quantity}</span>
                    <button className="p-2" onClick={() => updateQuantity(item.id, item.quantity + 1)}><Plus size={14} /></button>
                  </div>
                </div>
              </div>
            ))}
            {!items.length ? <p className="rounded-3xl bg-surface-container-low p-6">Your enquiry list is empty.</p> : null}
          </div>
          <aside className="h-fit rounded-3xl bg-white p-6 shadow-boutique">
            <p className="label text-secondary">Enquiry Summary</p>
            <div className="mt-5 flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>{formatAED(total)}</span>
            </div>
            <p className="mt-3 text-sm text-on-surface-variant">Send an enquiry on WhatsApp with your selected product names and quantities.</p>
            <WhatsAppCheckoutButton items={items} className="btn-primary mt-6 w-full" />
          </aside>
        </div>
      </div>
    </section>
  );
}
