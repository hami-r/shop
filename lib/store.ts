"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, Product } from "@/lib/types";

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  addProduct: (product: Product, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      addProduct: (product, quantity = 1) =>
        set((state) => {
          const image = product.images?.[0] ?? "";
          const existing = state.items.find((item) => item.id === product.id);
          if (existing) {
            return {
              isOpen: true,
              items: state.items.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
              )
            };
          }
          return {
            isOpen: true,
            items: [
              ...state.items,
              { id: product.id, name: product.name, slug: product.slug, price: product.price, image, quantity }
            ]
          };
        }),
      removeItem: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item))
        })),
      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false })
    }),
    { name: "almiaraj-cart" }
  )
);

export function getCartTotal(items: CartItem[]) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
