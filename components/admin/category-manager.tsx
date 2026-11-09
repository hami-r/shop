"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";

export function CategoryManager({ categories }: { categories: string[] }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  async function addCategory(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setIsSaving(true);
    const response = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    });
    const payload = await response.json();
    setIsSaving(false);
    if (!response.ok) {
      setError(payload.error ?? "Could not add category.");
      return;
    }
    setName("");
    router.refresh();
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={addCategory} className="grid gap-4 rounded-3xl bg-white p-6 shadow-boutique md:grid-cols-[1fr_auto]">
        <input className="input" value={name} onChange={(event) => setName(event.target.value)} placeholder="Category name, e.g. Oud" />
        <button className="btn-primary" disabled={isSaving || !name.trim()}>
          {isSaving ? <Spinner /> : null}
          {isSaving ? "Adding…" : "Add Category"}
        </button>
        {error ? <p className="text-sm font-semibold text-error md:col-span-2">{error}</p> : null}
      </form>
      <div className="rounded-3xl bg-white p-6 shadow-boutique">
        <h2 className="font-display text-2xl font-semibold text-primary">Categories</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((category) => (
            <span key={category} className="animate-fade-in rounded-full bg-surface-container-low px-4 py-2 text-sm font-semibold text-primary">
              {category}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
