import { unstable_noStore as noStore } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase";
import { sampleProducts } from "@/lib/sample-data";
import type { Product } from "@/lib/types";

export async function getProducts(includeInactive = false): Promise<Product[]> {
  noStore();
  const supabase = getSupabaseAdmin();
  if (!supabase) return sampleProducts.filter((product) => includeInactive || product.is_active);

  let query = supabase.from("products").select("*").order("created_at", { ascending: false });
  if (!includeInactive) query = query.eq("is_active", true);
  const { data, error } = await query;
  if (error) {
    console.error(error);
    return sampleProducts;
  }
  return data ?? [];
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  noStore();
  const supabase = getSupabaseAdmin();
  if (!supabase) return sampleProducts.find((product) => product.slug === slug) ?? null;

  const { data, error } = await supabase.from("products").select("*").eq("slug", slug).single();
  if (error) return null;
  return data;
}

export async function getProductById(id: string): Promise<Product | null> {
  noStore();
  const supabase = getSupabaseAdmin();
  if (!supabase) return sampleProducts.find((product) => product.id === id) ?? null;

  const { data, error } = await supabase.from("products").select("*").eq("id", id).single();
  if (error) return null;
  return data;
}

export function formatAED(value: number) {
  return new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency: "AED",
    minimumFractionDigits: 2
  }).format(value);
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
