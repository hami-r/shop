import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { saveProduct } from "@/lib/product-write";
import { getSupabaseAdmin } from "@/lib/supabase";
import { productSchema } from "@/lib/validators";

function revalidateProductPaths(slug?: string) {
  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/admin/products");
  if (slug) revalidatePath(`/products/${slug}`);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: "Supabase service role is not configured." }, { status: 500 });
  const parsed = productSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.errors[0]?.message }, { status: 400 });

  const { data, error } = await saveProduct(supabase, parsed.data, params.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  revalidateProductPaths(data.slug);
  return NextResponse.json(data);
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: "Supabase service role is not configured." }, { status: 500 });

  const body = await request.json();
  if (typeof body.is_active !== "boolean") return NextResponse.json({ error: "is_active must be true or false." }, { status: 400 });

  const { data, error } = await supabase
    .from("products")
    .update({ is_active: body.is_active })
    .eq("id", params.id)
    .select("id, slug, is_active")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  revalidateProductPaths(data.slug);
  return NextResponse.json(data);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const denied = await requireAdmin(request);
  if (denied) return denied;
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: "Supabase service role is not configured." }, { status: 500 });
  const { data, error } = await supabase.from("products").update({ is_active: false }).eq("id", params.id).select("slug").single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  revalidateProductPaths(data.slug);
  return NextResponse.json({ ok: true });
}
