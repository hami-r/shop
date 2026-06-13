import type { Metadata } from "next";
import { AdminGuard, AdminNav } from "@/components/admin/admin-guard";
import { getMessages } from "@/lib/messages";

export const metadata: Metadata = {
  title: "Messages | Al Miaraj Sharjah UAE",
  description: "View customer contact messages sent to Al Miaraj."
};

export default async function AdminMessagesPage() {
  const messages = await getMessages();

  return (
    <AdminGuard>
      <section className="px-5 py-10 md:px-16">
        <div className="mx-auto max-w-boutique">
          <AdminNav />
          <h1 className="font-display text-4xl font-semibold text-primary">Messages</h1>
          <div className="mt-8 grid gap-4">
            {messages.map((item) => (
              <article key={item.id} className="rounded-3xl bg-white p-5 shadow-boutique">
                <div className="flex flex-wrap justify-between gap-3 border-b border-outline-variant pb-4">
                  <div>
                    <p className="font-semibold text-primary">{item.name}</p>
                    <p className="text-sm text-on-surface-variant">{item.email}</p>
                    {item.phone ? <p className="text-sm text-on-surface-variant">{item.phone}</p> : null}
                  </div>
                  <time className="text-sm text-on-surface-variant" dateTime={item.created_at}>
                    {new Date(item.created_at).toLocaleString("en-AE")}
                  </time>
                </div>
                <p className="mt-4 whitespace-pre-wrap leading-7 text-on-surface-variant">{item.message}</p>
              </article>
            ))}
            {!messages.length ? <p className="rounded-3xl bg-white p-6 text-on-surface-variant shadow-boutique">No messages yet.</p> : null}
          </div>
        </div>
      </section>
    </AdminGuard>
  );
}
