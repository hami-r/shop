"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { formatAED } from "@/lib/products";
import { getCartTotal } from "@/lib/store";
import type { CartItem } from "@/lib/types";

export function SharedCartClient({
  cartId,
  initialItems,
  editToken
}: {
  cartId: string;
  initialItems: CartItem[];
  editToken?: string;
}) {
  const [items, setItems] = useState(initialItems);
  const [status, setStatus] = useState("");
  const canEdit = Boolean(editToken);
  const total = getCartTotal(items);

  useEffect(() => {
    if (editToken) return;
    const editUrl = window.localStorage.getItem(`almiaraj-cart-edit-${window.location.origin}/shared-cart/${cartId}`);
    if (editUrl) window.location.replace(editUrl);
  }, [cartId, editToken]);

  function updateQuantity(id: string, quantity: number) {
    setItems((current) => current.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item)));
  }

  async function saveCart() {
    if (!editToken) return;
    setStatus("Saving...");
    const response = await fetch(`/api/cart-links/${cartId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-cart-edit-token": editToken
      },
      body: JSON.stringify({ items })
    });
    const payload = await response.json();
    setStatus(response.ok ? "Enquiry list updated." : payload.error ?? "Could not update enquiry list.");
  }

  return (
    <section className="px-5 py-10 md:px-16">
      <div className="mx-auto max-w-boutique">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="label text-secondary">{canEdit ? "Editable Enquiry" : "Shared Enquiry"}</p>
            <h1 className="mt-3 font-display text-4xl font-semibold text-primary">Customer Enquiry List</h1>
          </div>
          {canEdit ? (
            <button type="button" className="btn-primary" onClick={saveCart}>
              Save Enquiry
            </button>
          ) : null}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
          <div className="grid gap-4">
            {items.map((item) => (
              <div key={item.id} className="grid grid-cols-[96px_1fr] gap-4 rounded-3xl bg-surface-container-low p-4 md:grid-cols-[120px_1fr_auto]">
                <Link href={`/products/${item.slug}`} className="relative aspect-square overflow-hidden rounded-2xl bg-surface-container">
                  {item.image ? <Image src={item.image} alt={item.name} fill className="object-cover" sizes="120px" /> : null}
                </Link>
                <div>
                  <Link href={`/products/${item.slug}`} className="font-semibold text-primary">
                    {item.name}
                  </Link>
                  <p className="mt-1 text-sm text-on-surface-variant">{formatAED(item.price)}</p>
                  {canEdit ? (
                    <div className="mt-4 inline-flex items-center rounded-full border border-outline-variant bg-white">
                      <button className="p-2" onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Decrease quantity">
                        <Minus size={14} />
                      </button>
                      <span className="w-9 text-center text-sm font-semibold">{item.quantity}</span>
                      <button className="p-2" onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Increase quantity">
                        <Plus size={14} />
                      </button>
                    </div>
                  ) : (
                    <p className="mt-4 text-sm font-semibold text-primary">Quantity: {item.quantity}</p>
                  )}
                </div>
                <p className="font-semibold text-primary">{formatAED(item.price * item.quantity)}</p>
              </div>
            ))}
          </div>

          <aside className="h-fit rounded-3xl bg-white p-6 shadow-boutique">
            <p className="label text-secondary">Enquiry Summary</p>
            <div className="mt-5 flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>{formatAED(total)}</span>
            </div>
            <p className="mt-3 text-sm text-on-surface-variant">
              {canEdit ? "Only this private edit link can change quantities." : "This shared enquiry link is view-only."}
            </p>
            {status ? <p className="mt-4 text-sm font-semibold text-primary">{status}</p> : null}
          </aside>
        </div>
      </div>
    </section>
  );
}
