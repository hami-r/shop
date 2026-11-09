"use client";

import Link from "next/link";
import { useI18n } from "@/components/i18n/locale-provider";
import { localePath } from "@/lib/i18n";

export default function NotFound() {
  const { locale, t } = useI18n();
  return (
    <section className="container-x py-24 md:py-36">
      <div className="mx-auto max-w-2xl animate-rise text-center">
        <p className="label text-ink">{t.notFound.eyebrow}</p>
        <h1 className="heading-display mt-5 text-4xl md:text-6xl">{t.notFound.title}</h1>
        <p className="mt-5 text-lg text-stone">{t.notFound.text}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href={localePath(locale, "/products")} className="btn-primary">{t.notFound.browse}</Link>
          <Link href={localePath(locale, "/")} className="btn-secondary">{t.notFound.home}</Link>
        </div>
      </div>
    </section>
  );
}
