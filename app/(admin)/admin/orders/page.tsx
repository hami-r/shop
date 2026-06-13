import type { Metadata } from "next";
import Link from "next/link";
import { AdminGuard, AdminNav } from "@/components/admin/admin-guard";
import { formatAED } from "@/lib/products";
import { getOrders } from "@/lib/orders";

export const metadata: Metadata = {
  title: "Manage Orders | Al Miaraj Sharjah UAE",
  description: "Manage Al Miaraj cash on delivery orders in Sharjah UAE."
};

export default async function AdminOrdersPage() {
  const orders = await getOrders();
  return (
    <AdminGuard>
      <section className="px-5 py-10 md:px-16">
        <div className="mx-auto max-w-boutique">
          <AdminNav />
          <h1 className="font-display text-4xl font-semibold text-primary">Orders</h1>
          <div className="mt-8 overflow-hidden rounded-3xl bg-white shadow-boutique">
            {orders.map((order) => (
              <Link key={order.id} href={`/admin/orders/${order.id}`} className="grid gap-2 border-b border-outline-variant p-4 md:grid-cols-[1fr_180px_140px_130px]">
                <div>
                  <p className="font-semibold text-primary">{order.customer_name}</p>
                  <p className="text-sm text-on-surface-variant">{order.customer_phone}</p>
                </div>
                <span>{order.city ?? "Sharjah"}</span>
                <span>{formatAED(Number(order.total))}</span>
                <span className="capitalize text-secondary">{order.status}</span>
              </Link>
            ))}
            {!orders.length ? <p className="p-6 text-on-surface-variant">No orders yet.</p> : null}
          </div>
        </div>
      </section>
    </AdminGuard>
  );
}
