import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Enquiry Sent | Al Miaraj Sharjah UAE",
  description: "Your Al Miaraj enquiry has been received."
};

export default function ConfirmationPage({ params }: { params: { id: string } }) {
  return (
    <section className="px-5 py-16 md:px-16">
      <div className="mx-auto max-w-2xl rounded-3xl bg-white p-8 text-center shadow-boutique">
        <p className="label text-secondary">Enquiry Sent</p>
        <h1 className="mt-4 font-display text-4xl font-semibold text-primary">Thank you for contacting Al Miaraj.</h1>
        <p className="mt-4 text-on-surface-variant">
          Your enquiry reference is <span className="font-semibold text-primary">{params.id}</span>. We will contact you soon.
        </p>
        <Link href="/products" className="btn-primary mt-8">Browse Products</Link>
      </div>
    </section>
  );
}
