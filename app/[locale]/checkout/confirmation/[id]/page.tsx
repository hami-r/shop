import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary, localePath, type Locale } from "@/lib/i18n";

export function generateMetadata({ params }: { params: { locale: Locale } }): Metadata {
  return { title: { absolute: getDictionary(params.locale).confirmation.metaTitle }, robots: { index: false, follow: false } };
}

export default function ConfirmationPage({ params }: { params: { locale: Locale; id: string } }) {
  const t = getDictionary(params.locale);
  return (
    <section className="container-x py-16 md:py-28">
      <div className="mx-auto max-w-2xl animate-rise rounded-card border border-hairline bg-white p-8 text-center md:p-12">
        <p className="label text-ink">{t.confirmation.eyebrow}</p>
        <h1 className="heading-display mt-4 text-4xl md:text-5xl">{t.confirmation.title}</h1>
        <p className="mt-4 text-stone">{t.confirmation.text(params.id)}</p>
        <Link href={localePath(params.locale, "/products")} className="btn-primary mt-8">{t.cart.browse}</Link>
      </div>
    </section>
  );
}
