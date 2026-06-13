import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AdminGuard, AdminNav } from "@/components/admin/admin-guard";
import { OrderStatusForm } from "@/components/admin/order-status-form";
import { getOrderById } from "@/lib/orders";
import { formatAED } from "@/lib/products";

export const metadata: Metadata = {
  title: "Order Details | Al Miaraj Sharjah UAE",
  description: "View and update an Al Miaraj order for Sharjah UAE."
};

export default async function AdminOrderDetailPage({ params }: { params: { id: string } }) {
  const order = await getOrderById(params.id);
  if (!order) notFound();
  return (
    <AdminGuard>
      <section className="px-5 py-10 md:px-16">
        <div className="mx-auto max-w-boutique">
          <AdminNav />
          <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
            <div className="rounded-3xl bg-white p-6 shadow-boutique">
              <p className="label text-secondary">Order {order.id}</p>
              <h1 className="mt-3 font-display text-4xl font-semibold text-primary">{order.customer_name}</h1>
              <div className="mt-6 grid gap-2 text-on-surface-variant">
                <p>{order.customer_email}</p>
                <p>{order.customer_phone}</p>
                <p>{order.address}, {order.city ?? "Sharjah"}, UAE</p>
                {order.notes ? <p>Notes: {order.notes}</p> : null}
              </div>
              <div className="mt-8 grid gap-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between gap-4 rounded-2xl bg-surface-container-low p-4">
                    <span>{item.name} x {item.quantity}</span>
                    <span>{formatAED(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>
            <aside className="h-fit rounded-3xl bg-white p-6 shadow-boutique">
              <p className="label text-secondary">Total</p>
              <p className="mt-3 text-3xl font-semibold text-primary">{formatAED(Number(order.total))}</p>
              <OrderStatusForm id={order.id} status={order.status} />
            </aside>
          </div>
        </div>
      </section>
    </AdminGuard>
  );
}
