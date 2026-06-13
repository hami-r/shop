import type { Metadata } from "next";
import { AdminGuard, AdminNav } from "@/components/admin/admin-guard";
import { ProductForm } from "@/components/admin/product-form";
import { getCategories } from "@/lib/categories";

export const metadata: Metadata = {
  title: "Add Product | Al Miaraj Sharjah UAE",
  description: "Add a new Al Miaraj product for Sharjah UAE customers."
};

export default async function NewProductPage() {
  const categories = await getCategories();
  return (
    <AdminGuard>
      <section className="px-5 py-10 md:px-16">
        <div className="mx-auto max-w-boutique">
          <AdminNav />
          <ProductForm categories={categories} />
        </div>
      </section>
    </AdminGuard>
  );
}
