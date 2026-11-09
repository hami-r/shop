"use client";

import { FadeImage } from "@/components/motion/fade-image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Edit, Eye, EyeOff, Plus } from "lucide-react";
import { useMemo, useState, useTransition } from "react";
import { Spinner } from "@/components/ui/spinner";
import { formatAED } from "@/lib/products";
import type { Product } from "@/lib/types";

export function AdminProductsClient({ products }: { products: Product[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return [...products]
      .filter((product) => {
        const matchesQuery =
          !normalizedQuery ||
          `${product.name} ${product.slug} ${product.category ?? ""}`.toLowerCase().includes(normalizedQuery);
        const matchesStatus =
          status === "all" ||
          (status === "active" && product.is_active) ||
          (status === "inactive" && !product.is_active);
        return matchesQuery && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === "name") return a.name.localeCompare(b.name);
        if (sortBy === "price-low") return Number(a.price) - Number(b.price);
        if (sortBy === "price-high") return Number(b.price) - Number(a.price);
        if (sortBy === "stock-low") return Number(a.stock) - Number(b.stock);
        if (sortBy === "status") return Number(b.is_active) - Number(a.is_active);
        return new Date(b.created_at ?? "").getTime() - new Date(a.created_at ?? "").getTime();
      });
  }, [products, query, sortBy, status]);

  async function toggleActive(product: Product) {
    setTogglingId(product.id);
    await fetch(`/api/products/${product.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_active: !product.is_active })
    });
    startTransition(() => {
      router.refresh();
      window.setTimeout(() => setTogglingId(null), 400);
    });
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-4xl font-semibold text-primary">Products</h1>
        <Link className="btn-primary" href="/admin/products/new"><Plus size={16} /> Add Product</Link>
      </div>
      <div className="mt-6 grid gap-3 rounded-3xl bg-white p-4 shadow-boutique md:grid-cols-[1fr_180px_180px]">
        <input className="input" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products..." />
        <select className="input" value={status} onChange={(event) => setStatus(event.target.value)}>
          <option value="all">All statuses</option>
          <option value="active">Active only</option>
          <option value="inactive">Inactive only</option>
        </select>
        <select className="input" value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
          <option value="newest">Newest first</option>
          <option value="name">Name A-Z</option>
          <option value="price-low">Price low-high</option>
          <option value="price-high">Price high-low</option>
          <option value="stock-low">Stock low-high</option>
          <option value="status">Active first</option>
        </select>
      </div>
      <div className="mt-8 overflow-hidden rounded-3xl bg-white shadow-boutique">
        {filteredProducts.map((product) => (
          <div key={product.id} className="grid gap-3 border-b border-outline-variant p-4 md:grid-cols-[minmax(0,1fr)_140px_120px_120px] md:items-center">
            <div className="grid grid-cols-[72px_1fr] items-center gap-4">
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-surface-container-low">
                {product.images?.[0] ? (
                  <FadeImage src={product.images[0]} alt={product.name} fill className="object-cover" sizes="72px" />
                ) : (
                  <div className="grid h-full place-items-center text-xs font-semibold text-on-surface-variant">No image</div>
                )}
              </div>
              <div>
                <p className="font-semibold text-primary">{product.name}</p>
                <p className="text-sm text-on-surface-variant">{product.slug}</p>
              </div>
            </div>
            <span>{formatAED(Number(product.price))}</span>
            <span className={product.is_active ? "text-primary" : "text-outline"}>{product.is_active ? "Active" : "Inactive"}</span>
            <div className="flex gap-2">
              <Link className="grid h-10 w-10 place-items-center rounded-full border border-outline-variant" href={`/admin/products/${product.id}`} aria-label="Edit product">
                <Edit size={16} />
              </Link>
              <button
                className={`grid h-10 w-10 place-items-center rounded-full border border-outline-variant ${product.is_active ? "text-primary" : "text-outline"}`}
                onClick={() => toggleActive(product)}
                disabled={togglingId === product.id}
                aria-busy={togglingId === product.id}
                aria-label={product.is_active ? "Mark product inactive" : "Mark product active"}
                title={product.is_active ? "Mark inactive" : "Mark active"}
              >
                {togglingId === product.id ? <Spinner size={14} /> : product.is_active ? <Eye size={16} /> : <EyeOff size={16} />}
              </button>
            </div>
          </div>
        ))}
        {!filteredProducts.length ? <p className="p-6 text-on-surface-variant">No products found.</p> : null}
      </div>
    </>
  );
}
