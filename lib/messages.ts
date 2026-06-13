import { unstable_noStore as noStore } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase";
import type { ContactMessage } from "@/lib/types";

export async function getMessages(): Promise<ContactMessage[]> {
  noStore();
  const supabase = getSupabaseAdmin();
  if (!supabase) return [];

  const { data, error } = await supabase.from("messages").select("*").order("created_at", { ascending: false });
  if (error) return [];
  return (data ?? []) as ContactMessage[];
}
