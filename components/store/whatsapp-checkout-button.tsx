"use client";

import { MessageCircle } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/components/i18n/locale-provider";
import { Spinner } from "@/components/ui/spinner";
import { localePath } from "@/lib/i18n";
import { getWhatsAppCheckoutUrl } from "@/lib/whatsapp";
import type { CartItem } from "@/lib/types";

type CartLinkResponse = { publicUrl: string; editUrl: string; error?: string };

/** Saves the list as a shareable link, then opens WhatsApp with the message. */
export async function sendToWhatsApp(items: CartItem[], locale: "en" | "ar") {
  const response = await fetch("/api/cart-links", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items, locale })
  });
  const payload = (await response.json()) as CartLinkResponse;
  if (!response.ok) throw new Error(payload.error);
  window.localStorage.setItem(`almiaraj-cart-edit-${payload.publicUrl}`, payload.editUrl);
  window.location.href = getWhatsAppCheckoutUrl(items, payload.publicUrl, locale);
}

export function WhatsAppCheckoutButton({
  items,
  className = "btn-primary",
  onCheckout
}: {
  items: CartItem[];
  className?: string;
  onCheckout?: () => void;
}) {
  const { locale, t } = useI18n();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function checkout() {
    setError("");
    if (!items.length) {
      window.location.href = localePath(locale, "/products");
      return;
    }
    setIsLoading(true);
    try {
      await sendToWhatsApp(items, locale);
      onCheckout?.();
      // Keep the spinner until WhatsApp opens (the page navigates away).
      window.setTimeout(() => setIsLoading(false), 4000);
    } catch {
      setError(t.cart.error);
      setIsLoading(false);
    }
  }

  return (
    <div>
      <button type="button" className={className} disabled={isLoading} aria-busy={isLoading} onClick={checkout}>
        {isLoading ? <Spinner /> : <MessageCircle size={18} />}
        {isLoading ? t.cart.preparing : t.cart.send}
      </button>
      {error ? <p className="mt-3 text-sm font-semibold text-error">{error}</p> : null}
    </div>
  );
}
