import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabaseAdmin } from "@/lib/supabase";
import { checkoutSchema } from "@/lib/validators";

const orderSchema = checkoutSchema.extend({
  items: z.array(z.any()).min(1),
  total: z.coerce.number().nonnegative()
});

export async function GET() {
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

  const { data, error } = await supabase
    .from("orders")
    .insert({
      ...parsed.data,
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
