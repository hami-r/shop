"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

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

  async function updateStatus(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    const response = await fetch(`/api/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: value })
    });
    if (!response.ok) {
      const payload = await response.json();
      setError(payload.error ?? "Could not update status.");
      return;
    }
    router.refresh();
  }

  return (
    <form onSubmit={updateStatus} className="mt-6 grid gap-3">
      <select className="input" value={value} onChange={(event) => setValue(event.target.value as typeof status)}>
        <option value="pending">pending</option>
        <option value="processing">processing</option>
        <option value="delivered">delivered</option>
      </select>
      {error ? <p className="text-sm font-semibold text-error">{error}</p> : null}
      <button className="btn-primary">Update Status</button>
    </form>
  );
}
