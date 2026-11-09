import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryView, categoryMetadata, categoryStaticParams } from "@/components/store/category-view";
import type { Locale } from "@/lib/i18n";

export const revalidate = 60;

export function generateStaticParams() {
  return categoryStaticParams({ pagesOnly: true });
}

function pageNumber(value: string) {
  const page = Number(value);
  return Number.isInteger(page) && page >= 2 ? page : null;
}

export function generateMetadata({ params }: { params: { locale: Locale; category: string; page: string } }): Promise<Metadata> {
  return categoryMetadata(params.locale, params.category, pageNumber(params.page) ?? 1);
}

export default function CategoryPagedPage({ params }: { params: { locale: Locale; category: string; page: string } }) {
  const page = pageNumber(params.page);
  if (!page) notFound();
  return <CategoryView locale={params.locale} slug={params.category} page={page} />;
}
