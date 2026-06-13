import type { Metadata } from "next";
import { AdminGuard, AdminNav } from "@/components/admin/admin-guard";
import { CategoryManager } from "@/components/admin/category-manager";
import { getCategories } from "@/lib/categories";

export const metadata: Metadata = {
  title: "Manage Categories | Al Miaraj Sharjah UAE",
  description: "Add product categories for Al Miaraj."
};

export default async function AdminCategoriesPage() {
  const categories = await getCategories();
  return (
    <AdminGuard>
      <section className="px-5 py-10 md:px-16">
        <div className="mx-auto max-w-boutique">
          <AdminNav />
          <h1 className="font-display text-4xl font-semibold text-primary">Categories</h1>
          <div className="mt-8">
            <CategoryManager categories={categories} />
          </div>
        </div>
      </section>
    </AdminGuard>
  );
}
