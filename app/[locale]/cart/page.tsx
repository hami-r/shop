import type { Metadata } from "next";
import { CartPageClient } from "@/components/store/cart-page-client";
import { getDictionary, type Locale } from "@/lib/i18n";

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  return { title: { absolute: getDictionary(params.locale).cart.metaTitle }, robots: { index: false, follow: false } };
}

export default function CartPage() {
  return <CartPageClient />;
}
