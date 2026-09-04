import type { Metadata } from "next";
import { CheckoutForm } from "@/components/store/checkout-form";

export const metadata: Metadata = {
  title: "Send Enquiry | Al Miaraj Sharjah UAE",
  description: "Send a product enquiry to Al Miaraj on WhatsApp before visiting the shop.",
  robots: {
    index: false,
    follow: false
  }
};

export default function CheckoutPage() {
  return (
    <section className="px-5 py-10 md:px-16">
      <div className="mx-auto max-w-boutique">
        <h1 className="font-display text-4xl font-semibold text-primary">Send Enquiry</h1>
        <p className="mt-3 text-on-surface-variant">We are not offering delivery at the moment. Send us your enquiry on WhatsApp and visit the shop for pickup.</p>
        <CheckoutForm />
      </div>
    </section>
  );
}
