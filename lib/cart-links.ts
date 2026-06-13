import { unstable_noStore as noStore } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase";
import type { CartLink } from "@/lib/types";

export async function getCartLink(id: string): Promise<CartLink | null> {
  noStore();
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;

  const { data, error } = await supabase.from("cart_links").select("id, items, created_at, updated_at").eq("id", id).single();
  if (error) return null;
  return data;
}
