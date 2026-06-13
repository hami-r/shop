import { getSupabaseAdmin } from "@/lib/supabase";
import type { Order } from "@/lib/types";

export async function getOrders(): Promise<Order[]> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return [];
  const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
  if (error) return [];
  return (data ?? []) as Order[];
}

export async function getOrderById(id: string): Promise<Order | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;
  const { data, error } = await supabase.from("orders").select("*").eq("id", id).single();
  if (error) return null;
  return data as Order;
}
