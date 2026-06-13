import type { Metadata } from "next";
import { CartPageClient } from "@/components/store/cart-page-client";

export const metadata: Metadata = {
  title: "Your Enquiry List | Al Miaraj Sharjah UAE",
  description: "Review products before sending an enquiry to Al Miaraj on WhatsApp."
};

export default function CartPage() {
  return <CartPageClient />;
}
