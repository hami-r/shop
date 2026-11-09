import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/supabase";
import { cartTotal, priceCartItems } from "@/lib/pricing";
import { checkoutSchema } from "@/lib/validators";

const orderSchema = checkoutSchema.extend({
  items: z.array(z.object({ id: z.string(), quantity: z.coerce.number().int().positive() })).min(1).max(100)
});

export async function GET(request: Request) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json([]);
  const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data ?? []);
}

export async function POST(request: Request) {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return NextResponse.json({ id: `demo-${Date.now()}` }, { status: 201 });
  }
  const parsed = orderSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.errors[0]?.message }, { status: 400 });

  // Never trust prices or totals from the browser.
  const items = await priceCartItems(parsed.data.items);
  if (!items) return NextResponse.json({ error: "One of the products is no longer available." }, { status: 400 });

  const { data, error } = await supabase
    .from("orders")
    .insert({
      ...parsed.data,
      items,
      total: cartTotal(items),
      customer_name: parsed.data.customer_name,
      customer_email: parsed.data.customer_email,
      customer_phone: parsed.data.customer_phone,
      country: "UAE",
      status: "pending"
    })
    .select("id")
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json(data, { status: 201 });
}
