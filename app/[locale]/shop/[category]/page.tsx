import type { Metadata } from "next";
import { CategoryView, categoryMetadata, categoryStaticParams } from "@/components/store/category-view";
import type { Locale } from "@/lib/i18n";

export const revalidate = 60;

export function generateStaticParams() {
  return categoryStaticParams({ pagesOnly: false });
}

export function generateMetadata({ params }: { params: { locale: Locale; category: string } }): Promise<Metadata> {
  return categoryMetadata(params.locale, params.category, 1);
}

export default function CategoryPage({ params }: { params: { locale: Locale; category: string } }) {
  return <CategoryView locale={params.locale} slug={params.category} page={1} />;
}
