"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { formatAED } from "@/lib/products";
import { useCartStore } from "@/lib/store";
import { getWhatsAppCheckoutUrl } from "@/lib/whatsapp";

type CartLinkResponse = {
  publicUrl: string;
  editUrl: string;
  error?: string;
};

export function CheckoutForm() {
  const { items } = useCartStore();
  const hasStarted = useRef(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function redirectToWhatsApp() {
      if (!items.length || hasStarted.current) return;
      hasStarted.current = true;

      const response = await fetch("/api/cart-links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items })
      });
      const payload = (await response.json()) as CartLinkResponse;
      if (!response.ok) {
        setError(payload.error ?? "Could not prepare WhatsApp enquiry.");
        return;
      }

      window.localStorage.setItem(`almiaraj-cart-edit-${payload.publicUrl}`, payload.editUrl);
      window.location.href = getWhatsAppCheckoutUrl(items, payload.publicUrl);
    }

    redirectToWhatsApp();
  }, [items]);

  return (
    <div className="mt-8 rounded-3xl bg-white p-6 shadow-boutique">
      {items.length ? (
        <>
          <p className="label text-secondary">Opening WhatsApp</p>
          <p className="mt-3 text-on-surface-variant">Your enquiry message is ready with product names and quantities.</p>
        </>
      ) : (
        <>
          <p className="label text-secondary">Your Enquiry List Is Empty</p>
          <p className="mt-3 text-on-surface-variant">Add products to your enquiry list before sending a message.</p>
        </>
      )}
      {items.length ? (
        <div className="mt-5 grid gap-3 text-sm">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between gap-4">
              <span>{item.name} x {item.quantity}</span>
              <span>{formatAED(item.price)}</span>
            </div>
          ))}
        </div>
      ) : null}
      {error ? <p className="mt-4 text-sm font-semibold text-error">{error}</p> : null}
      {!items.length ? (
        <Link href="/products" className="btn-primary mt-6 w-fit">
          Browse Products
        </Link>
      ) : null}
    </div>
  );
}
