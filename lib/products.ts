import { getSupabaseAdmin } from "@/lib/supabase";
import { sampleProducts } from "@/lib/sample-data";
import type { CardProduct, Product } from "@/lib/types";

let memoryCache: { products: Product[]; timestamp: number } | null = null;
const CACHE_TTL_MS = 60_000;

export async function getProducts(includeInactive = false): Promise<Product[]> {
  const now = Date.now();
  if (memoryCache && now - memoryCache.timestamp < CACHE_TTL_MS) {
    return memoryCache.products.filter((product) => includeInactive || product.is_active);
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) return sampleProducts.filter((product) => includeInactive || product.is_active);

  try {
    // Cache the full list (including hidden products) and filter in memory, so the
    // admin view never gets a cached list that is missing hidden products.
    const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    if (error || !data?.length) {
      return sampleProducts.filter((product) => includeInactive || product.is_active);
    }
    memoryCache = { products: data, timestamp: now };
    return data.filter((product) => includeInactive || product.is_active);
  } catch {
    return sampleProducts.filter((product) => includeInactive || product.is_active);
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (memoryCache) {
    const found = memoryCache.products.find((product) => product.slug === slug);
    if (found) return found;
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) return sampleProducts.find((product) => product.slug === slug) ?? null;

  try {
    const { data, error } = await supabase.from("products").select("*").eq("slug", slug).single();
    if (error || !data) return sampleProducts.find((product) => product.slug === slug) ?? null;
    return data;
  } catch {
    return sampleProducts.find((product) => product.slug === slug) ?? null;
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  if (memoryCache) {
    const found = memoryCache.products.find((product) => product.id === id);
    if (found) return found;
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) return sampleProducts.find((product) => product.id === id) ?? null;

  try {
    const { data, error } = await supabase.from("products").select("*").eq("id", id).single();
    if (error || !data) return sampleProducts.find((product) => product.id === id) ?? null;
    return data;
  } catch {
    return sampleProducts.find((product) => product.id === id) ?? null;
  }
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

export function toCardProduct(product: Product): CardProduct {
  return {
    id: product.id,
    name: product.name,
    name_ar: product.name_ar ?? null,
    slug: product.slug,
    price: Number(product.price),
    compare_price: product.compare_price ? Number(product.compare_price) : null,
    category: product.category,
    images: product.images?.slice(0, 1) ?? []
  };
}

export const PAGE_SIZE = 24;

export function paginate<T>(items: T[], page: number, size = PAGE_SIZE) {
  const pageCount = Math.max(1, Math.ceil(items.length / size));
  const current = Math.min(Math.max(1, Math.floor(page) || 1), pageCount);
  return { items: items.slice((current - 1) * size, current * size), page: current, pageCount };
}
