import type { Metadata } from "next";
import { AdminGuard, AdminNav } from "@/components/admin/admin-guard";
import { AdminProductsClient } from "@/components/admin/admin-products-client";
import { getProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "Manage Products | Al Miaraj Sharjah UAE",
  description: "Manage Al Miaraj shop products for customer enquiries."
};

export default async function AdminProductsPage() {
  const products = await getProducts(true);
  return (
    <AdminGuard>
      <section className="px-5 py-10 md:px-16">
        <div className="mx-auto max-w-boutique">
          <AdminNav />
          <AdminProductsClient products={products} />
        </div>
      </section>
    </AdminGuard>
  );
}
