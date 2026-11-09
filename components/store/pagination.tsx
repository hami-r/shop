import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Locale } from "@/lib/i18n";

const labels = {
  en: { nav: "Pages", prev: "Previous", next: "Next", page: (n: number) => `Page ${n}` },
  ar: { nav: "الصفحات", prev: "السابق", next: "التالي", page: (n: number) => `صفحة ${n}` }
};

/** Plain links (no JavaScript) so Google can follow every page. */
export function Pagination({ locale, page, pageCount, href }: { locale: Locale; page: number; pageCount: number; href: (page: number) => string }) {
  if (pageCount <= 1) return null;
  const t = labels[locale];
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1).filter((n) => n === 1 || n === pageCount || Math.abs(n - page) <= 1);
  const pill = "inline-flex h-11 min-w-11 items-center justify-center whitespace-nowrap rounded-full border px-3 text-sm";

  return (
    <nav aria-label={t.nav} className="mt-16 flex flex-wrap items-center justify-center gap-2">
      {page > 1 ? (
        <Link href={href(page - 1)} rel="prev" className={`${pill} gap-2 border-silver text-stone hover:border-stone`}>
          <ArrowLeft size={16} className="rtl:rotate-180" /> {t.prev}
        </Link>
      ) : null}
      {pages.map((n, index) => (
        <span key={n} className="flex items-center gap-2">
          {index > 0 && n - pages[index - 1] > 1 ? <span className="px-1 text-ash">…</span> : null}
          <Link
            href={href(n)}
            aria-label={t.page(n)}
            aria-current={n === page ? "page" : undefined}
            className={`${pill} ${n === page ? "border-stone bg-stone text-white" : "border-silver text-stone hover:border-stone"}`}
          >
            {n}
          </Link>
        </span>
      ))}
      {page < pageCount ? (
        <Link href={href(page + 1)} rel="next" className={`${pill} gap-2 border-silver text-stone hover:border-stone`}>
          {t.next} <ArrowRight size={16} className="rtl:rotate-180" />
        </Link>
      ) : null}
    </nav>
  );
}
