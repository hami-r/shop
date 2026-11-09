import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SharedCartClient } from "@/components/store/shared-cart-client";
import { getCartLink } from "@/lib/cart-links";
import { getDictionary, type Locale } from "@/lib/i18n";

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  return { title: { absolute: getDictionary(params.locale).shared.metaTitle }, robots: { index: false, follow: false } };
}

export default async function SharedCartPage({ params, searchParams }: { params: { locale: Locale; id: string }; searchParams: { edit?: string } }) {
  const cart = await getCartLink(params.id);
  if (!cart) notFound();
  return <SharedCartClient cartId={cart.id} initialItems={cart.items} editToken={searchParams.edit} />;
}
