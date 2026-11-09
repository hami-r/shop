import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { priceCartItems } from "@/lib/pricing";
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
  const rawItems = body.items;
  if (!Array.isArray(rawItems) || !rawItems.length || !rawItems.every(isCartItem)) {
    return NextResponse.json({ error: "Cart items are required." }, { status: 400 });
  }
  if (rawItems.length > 100) return NextResponse.json({ error: "Too many items." }, { status: 400 });

  // Re-price from the catalogue so the shared cart always shows real prices.
  const items = await priceCartItems(rawItems);
  if (!items) return NextResponse.json({ error: "One of the products is no longer available." }, { status: 400 });

  const editToken = crypto.randomUUID();
  const { data, error } = await supabase
    .from("cart_links")
    .insert({ items, edit_token: editToken })
    .select("id")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  const origin = getOrigin(request);
  const prefix = body.locale === "ar" ? "/ar" : "";
  const publicUrl = `${origin}${prefix}/shared-cart/${data.id}`;
  const editUrl = `${publicUrl}?edit=${editToken}`;

  return NextResponse.json({ id: data.id, publicUrl, editUrl }, { status: 201 });
}
