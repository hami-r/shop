import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import type { CartItem } from "@/lib/types";

function isCartItem(item: unknown): item is CartItem {
  if (!item || typeof item !== "object") return false;
  const value = item as Record<string, unknown>;
  return (
    typeof value.id === "string" &&
    typeof value.name === "string" &&
    typeof value.slug === "string" &&
    typeof value.price === "number" &&
    typeof value.image === "string" &&
    typeof value.quantity === "number" &&
    Number.isInteger(value.quantity) &&
    value.quantity > 0
  );
}

function getOrigin(request: Request) {
  return request.headers.get("origin") ?? new URL(request.url).origin;
}

export async function POST(request: Request) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: "Supabase service role is not configured." }, { status: 500 });

  const body = await request.json();
  const items = body.items;
  if (!Array.isArray(items) || !items.length || !items.every(isCartItem)) {
    return NextResponse.json({ error: "Cart items are required." }, { status: 400 });
  }

  const editToken = crypto.randomUUID();
  const { data, error } = await supabase
    .from("cart_links")
    .insert({ items, edit_token: editToken })
    .select("id")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  const origin = getOrigin(request);
  const publicUrl = `${origin}/shared-cart/${data.id}`;
  const editUrl = `${publicUrl}?edit=${editToken}`;

  return NextResponse.json({ id: data.id, publicUrl, editUrl }, { status: 201 });
}
