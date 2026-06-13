"use client";

import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/store";
import type { Product } from "@/lib/types";

export function AddToCartButton({ product }: { product: Product }) {
  const addProduct = useCartStore((state) => state.addProduct);
  return (
    <button className="btn-primary w-full md:w-fit" onClick={() => addProduct(product)}>
      <ShoppingBag size={17} />
      Add to Enquiry
    </button>
  );
}
