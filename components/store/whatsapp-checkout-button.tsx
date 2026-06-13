"use client";

import { useState } from "react";
import { getWhatsAppCheckoutUrl } from "@/lib/whatsapp";
import type { CartItem } from "@/lib/types";

type CartLinkResponse = {
  publicUrl: string;
  editUrl: string;
  error?: string;
};

export function WhatsAppCheckoutButton({
  items,
  className = "btn-primary",
  onCheckout
}: {
  items: CartItem[];
  className?: string;
  onCheckout?: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function checkout() {
    setError("");
    if (!items.length) {
      window.location.href = "/products";
      return;
    }

    setIsLoading(true);
    const response = await fetch("/api/cart-links", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items })
    });
    const payload = (await response.json()) as CartLinkResponse;
    setIsLoading(false);

    if (!response.ok) {
      setError(payload.error ?? "Could not prepare WhatsApp enquiry.");
      return;
    }

    window.localStorage.setItem(`almiaraj-cart-edit-${payload.publicUrl}`, payload.editUrl);
    onCheckout?.();
    window.location.href = getWhatsAppCheckoutUrl(items, payload.publicUrl);
  }

  return (
    <div>
      <button type="button" className={className} disabled={isLoading} onClick={checkout}>
        {isLoading ? "Preparing..." : "Send Enquiry"}
      </button>
      {error ? <p className="mt-3 text-sm font-semibold text-error">{error}</p> : null}
    </div>
  );
}
