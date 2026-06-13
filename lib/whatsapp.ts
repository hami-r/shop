import { storeInfo } from "@/lib/sample-data";
import type { CartItem } from "@/lib/types";

export function getWhatsAppCheckoutUrl(items: CartItem[], cartUrl?: string) {
  const orderLines = items.map((item) => `- ${item.name} x ${item.quantity}`).join("\n");
  const cartLinkLine = cartUrl ? `\n\nCart link:\n${cartUrl}` : "";
  const message = `Hello Al Miaraj, I would like to enquire about:\n${orderLines}${cartLinkLine}`;

  return `https://wa.me/${storeInfo.whatsapp}?text=${encodeURIComponent(message)}`;
}
