import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SharedCartClient } from "@/components/store/shared-cart-client";
import { getCartLink } from "@/lib/cart-links";

export const metadata: Metadata = {
  title: "Shared Enquiry | Al Miaraj Sharjah UAE",
  description: "Review a shared Al Miaraj enquiry list with product details and images."
};

export default async function SharedCartPage({
  params,
  searchParams
}: {
  params: { id: string };
  searchParams: { edit?: string };
}) {
  const cart = await getCartLink(params.id);
  if (!cart) notFound();

  return <SharedCartClient cartId={cart.id} initialItems={cart.items} editToken={searchParams.edit} />;
}
