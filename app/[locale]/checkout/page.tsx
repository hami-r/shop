import type { Metadata } from "next";
import { CheckoutForm } from "@/components/store/checkout-form";
import { getDictionary, type Locale } from "@/lib/i18n";

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  return { title: { absolute: getDictionary(params.locale).checkout.metaTitle }, robots: { index: false, follow: false } };
}

export default function CheckoutPage({ params }: { params: { locale: Locale } }) {
  const t = getDictionary(params.locale);
  return (
    <section className="container-x max-w-3xl py-12 md:py-20">
      <h1 className="animate-rise heading-display text-4xl md:text-6xl">{t.checkout.title}</h1>
      <p className="mt-5 text-lg text-stone">{t.checkout.text}</p>
      <CheckoutForm />
    </section>
  );
}
