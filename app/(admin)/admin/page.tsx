import type { Metadata } from "next";
import Link from "next/link";
import { AdminGuard, AdminNav } from "@/components/admin/admin-guard";
import { getProducts } from "@/lib/products";
import { getMessages } from "@/lib/messages";

export const metadata: Metadata = {
  title: "Admin Dashboard | Al Miaraj Sharjah UAE",
  description: "Al Miaraj admin dashboard for products and customer enquiries."
};

export default async function AdminDashboardPage() {
  const [products, messages] = await Promise.all([getProducts(true), getMessages()]);

  return (
    <AdminGuard>
      <section className="px-5 py-10 md:px-16">
        <div className="mx-auto max-w-boutique">
          <AdminNav />
          <h1 className="font-display text-4xl font-semibold text-primary">Dashboard</h1>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <Metric label="Products" value={String(products.length)} />
            <Metric label="Messages" value={String(messages.length)} />
          </div>
          <div className="mt-8 rounded-3xl bg-white p-6 shadow-boutique">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-semibold text-primary">Recent Messages</h2>
              <Link className="text-sm font-semibold text-secondary" href="/admin/messages">View all</Link>
            </div>
            <div className="mt-4 grid gap-3">
              {messages.slice(0, 5).map((message) => (
                <Link key={message.id} href="/admin/messages" className="grid gap-1 rounded-2xl bg-surface-container-low p-4 md:grid-cols-[180px_1fr_160px]">
                  <span className="font-semibold text-primary">{message.name}</span>
                  <span className="truncate">{message.message}</span>
                  <span className="text-sm text-on-surface-variant">{new Date(message.created_at).toLocaleDateString("en-AE")}</span>
                </Link>
              ))}
              {!messages.length ? <p className="text-on-surface-variant">No messages yet.</p> : null}
            </div>
          </div>
        </div>
      </section>
    </AdminGuard>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-boutique">
      <p className="label text-secondary">{label}</p>
      <p className="mt-3 text-3xl font-semibold text-primary">{value}</p>
    </div>
  );
}
