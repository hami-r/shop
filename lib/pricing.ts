import { getProductById } from "@/lib/products";
import type { CartItem } from "@/lib/types";

/**
 * Rebuilds cart items from the product catalogue so customers cannot change
 * prices or names in the request. Returns null if any product is unknown or hidden.
 */
export async function priceCartItems(items: Array<{ id: unknown; quantity: unknown }>): Promise<CartItem[] | null> {
  const priced: CartItem[] = [];
  for (const item of items) {
    const quantity = Number(item.quantity);
    if (typeof item.id !== "string" || !Number.isInteger(quantity) || quantity < 1 || quantity > 999) return null;
    const product = await getProductById(item.id);
    if (!product || !product.is_active) return null;
    priced.push({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: Number(product.price),
      image: product.images?.[0] ?? "",
      quantity
    });
  }
  return priced;
}

export function cartTotal(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
