import { categories as fallbackCategories } from "@/lib/sample-data";
import { getSupabaseAdmin } from "@/lib/supabase";

export async function getCategories(): Promise<string[]> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return fallbackCategories;

  try {
    const { data, error } = await supabase.from("categories").select("name").order("name", { ascending: true });
    if (error || !data?.length) return fallbackCategories;

    const names = (data ?? []).map((item: { name: string }) => item.name).filter(Boolean);
    return names.length ? names : fallbackCategories;
  } catch {
    return fallbackCategories;
  }
}
