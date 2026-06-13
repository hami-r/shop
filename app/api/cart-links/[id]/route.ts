import { revalidatePath } from "next/cache";
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

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: "Supabase service role is not configured." }, { status: 500 });

  const editToken = request.headers.get("x-cart-edit-token");
  if (!editToken) return NextResponse.json({ error: "Edit token is required." }, { status: 401 });

  const body = await request.json();
  const items = body.items;
  if (!Array.isArray(items) || !items.length || !items.every(isCartItem)) {
    return NextResponse.json({ error: "Cart items are required." }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("cart_links")
    .update({ items, updated_at: new Date().toISOString() })
    .eq("id", params.id)
    .eq("edit_token", editToken)
    .select("id")
    .single();

  if (error || !data) return NextResponse.json({ error: "You cannot edit this cart." }, { status: 403 });

  revalidatePath(`/shared-cart/${params.id}`);
  return NextResponse.json({ ok: true });
}
