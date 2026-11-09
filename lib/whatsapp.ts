import { cartItemName, getDictionary, type Locale } from "@/lib/i18n";
import { storeInfo } from "@/lib/sample-data";
import type { CartItem } from "@/lib/types";

export function getWhatsAppCheckoutUrl(items: CartItem[], cartUrl?: string, locale: Locale = "en") {
  const t = getDictionary(locale);
  const orderLines = items.map((item) => `- ${cartItemName(item, locale)} x ${item.quantity}`).join("\n");
  const cartLinkLine = cartUrl ? `\n\n${t.whatsapp.cartLink}\n${cartUrl}` : "";
  const message = `${t.whatsapp.greeting}\n${orderLines}${cartLinkLine}`;

  return `https://wa.me/${storeInfo.whatsapp}?text=${encodeURIComponent(message)}`;
}
