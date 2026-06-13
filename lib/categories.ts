import { unstable_noStore as noStore } from "next/cache";
import { categories as fallbackCategories } from "@/lib/sample-data";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function getCategories(): Promise<string[]> {
  noStore();
  const supabase = getSupabaseAdmin();
  if (!supabase) return fallbackCategories;

  const { data, error } = await supabase.from("categories").select("name").order("name", { ascending: true });
  if (error) return fallbackCategories;

  const names = (data ?? []).map((item: { name: string }) => item.name).filter(Boolean);
  return names.length ? names : fallbackCategories;
}
