import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdminGuard, AdminNav } from "@/components/admin/admin-guard";
import { ProductForm } from "@/components/admin/product-form";
import { getCategories } from "@/lib/categories";
import { getProductById } from "@/lib/products";

export const metadata: Metadata = {
  title: "Edit Product | Al Miaraj Sharjah UAE",
  description: "Edit Al Miaraj product details for Sharjah UAE customers."
};

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const [product, categories] = await Promise.all([getProductById(params.id), getCategories()]);
  if (!product) notFound();
  return (
    <AdminGuard>
      <section className="px-5 py-10 md:px-16">
        <div className="mx-auto max-w-boutique">
          <AdminNav />
          <ProductForm product={product} categories={categories} />
        </div>
      </section>
    </AdminGuard>
  );
}
