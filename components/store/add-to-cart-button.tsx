"use client";

import { Check, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/components/i18n/locale-provider";
import { useCartStore } from "@/lib/store";
import type { CardProduct } from "@/lib/types";

export function AddToCartButton({ product }: { product: CardProduct }) {
  const { t } = useI18n();
  const addProduct = useCartStore((state) => state.addProduct);
  const [added, setAdded] = useState(false);

  return (
    <button
      className="btn-primary w-full sm:w-auto"
      onClick={() => {
        addProduct(product);
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1500);
      }}
    >
      {added ? <Check size={18} /> : <ShoppingBag size={18} />}
      {added ? t.product.added : t.product.addToList}
    </button>
  );
}
