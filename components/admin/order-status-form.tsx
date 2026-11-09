"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";

export function OrderStatusForm({
  id,
  status
}: {
  id: string;
  status: "pending" | "processing" | "delivered";
}) {
  const router = useRouter();
  const [value, setValue] = useState(status);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function updateStatus(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setSaving(true);
    const response = await fetch(`/api/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: value })
    });
    if (!response.ok) {
      const payload = await response.json();
      setError(payload.error ?? "Could not update status.");
      setSaving(false);
      return;
    }
    router.refresh();
    setSaving(false);
  }

  return (
    <form onSubmit={updateStatus} className="mt-6 grid gap-3">
      <select className="input" value={value} onChange={(event) => setValue(event.target.value as typeof status)}>
        <option value="pending">pending</option>
        <option value="processing">processing</option>
        <option value="delivered">delivered</option>
      </select>
      {error ? <p className="text-sm font-semibold text-error">{error}</p> : null}
      <button className="btn-primary" disabled={saving} aria-busy={saving}>
        {saving ? <Spinner /> : null}
        {saving ? "Updating…" : "Update Status"}
      </button>
    </form>
  );
}
