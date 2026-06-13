"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { slugify } from "@/lib/products";
import { getSupabaseBrowser } from "@/lib/supabase";
import type { Product } from "@/lib/types";
import { productSchema } from "@/lib/validators";

type ProductValues = z.infer<typeof productSchema>;

export function ProductForm({ product, categories }: { product?: Product; categories: string[] }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [images, setImages] = useState<string[]>(product?.images ?? []);
  const form = useForm<ProductValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name ?? "",
      slug: product?.slug ?? "",
      description: product?.description ?? "",
      price: Number(product?.price ?? 0),
      compare_price: product?.compare_price ? Number(product.compare_price) : null,
      category: product?.category ?? categories[0] ?? "",
      stock: product?.stock ?? 0,
      is_active: product?.is_active ?? true,
      images: product?.images ?? []
    }
  });
  const name = form.watch("name");

  useEffect(() => {
    if (!product && name) form.setValue("slug", slugify(name));
  }, [form, name, product]);

  async function upload(files: FileList | null) {
    if (!files?.length) return;
    setError("");
    const supabase = getSupabaseBrowser();
    const { data: sessionData } = supabase ? await supabase.auth.getSession() : { data: { session: null } };
    const token = sessionData.session?.access_token;
    if (!token) {
      setError("Admin session is required for image upload.");
      return;
    }
    const uploaded: string[] = [];
    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/uploads", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      const payload = await response.json();
      if (!response.ok) {
        setError(payload.error ?? "Could not upload image.");
        return;
      }
      uploaded.push(payload.url);
    }
    const nextImages = [...images, ...uploaded];
    setImages(nextImages);
    form.setValue("images", nextImages);
  }

  function removeImage(image: string) {
    const nextImages = images.filter((item) => item !== image);
    setImages(nextImages);
    form.setValue("images", nextImages);
  }

  async function onSubmit(values: ProductValues) {
    setError("");
    const body = { ...values, images };
    const response = await fetch(product ? `/api/products/${product.id}` : "/api/products", {
      method: product ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    const payload = await response.json();
    if (!response.ok) {
      setError(payload.error ?? "Could not save product.");
      return;
    }
    router.push("/admin/products");
    router.refresh();
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-5 rounded-3xl bg-white p-6 shadow-boutique">
      <h1 className="font-display text-4xl font-semibold text-primary">{product ? "Edit Product" : "Add Product"}</h1>
      <div className="grid gap-4 md:grid-cols-2">
        <input className="input" placeholder="Name" {...form.register("name")} />
        <input className="input" placeholder="Slug" {...form.register("slug")} />
        <input className="input md:col-span-2" placeholder="Description" {...form.register("description")} />
        <input className="input" type="number" step="0.01" placeholder="Price" {...form.register("price")} />
        <input className="input" type="number" step="0.01" placeholder="Compare price" {...form.register("compare_price")} />
        <select className="input" {...form.register("category")}>
          {categories.map((item) => <option key={item}>{item}</option>)}
        </select>
        <input className="input" type="number" placeholder="Stock" {...form.register("stock")} />
        <label className="flex items-center gap-3 rounded-2xl bg-surface-container-low px-4 py-3 text-sm font-semibold">
          <input type="checkbox" {...form.register("is_active")} />
          Active
        </label>
        <input className="input" type="file" multiple accept="image/*" onChange={(event) => upload(event.target.files)} />
      </div>
      <div className="grid gap-3">
        <p className="text-sm font-semibold text-primary">Product Images</p>
        {images.length ? (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {images.map((image, index) => (
              <div key={image} className="overflow-hidden rounded-2xl border border-outline-variant bg-surface-container-low">
                <div className="relative aspect-square">
                  <Image src={image} alt={`${form.getValues("name") || "Product"} image ${index + 1}`} fill className="object-cover" sizes="(min-width: 768px) 25vw, 50vw" />
                </div>
                <button type="button" className="w-full px-3 py-2 text-sm font-semibold text-error" onClick={() => removeImage(image)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="rounded-2xl bg-surface-container-low p-4 text-sm text-on-surface-variant">No images attached yet.</p>
        )}
      </div>
      {Object.values(form.formState.errors)[0]?.message ? <p className="text-sm font-semibold text-error">{String(Object.values(form.formState.errors)[0]?.message)}</p> : null}
      {error ? <p className="text-sm font-semibold text-error">{error}</p> : null}
      <button disabled={form.formState.isSubmitting} className="btn-primary w-fit disabled:opacity-60">Save Product</button>
    </form>
  );
}
