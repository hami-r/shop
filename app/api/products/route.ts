import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { getProducts } from "@/lib/products";
import { getSupabaseAdmin } from "@/lib/supabase";
import { productSchema } from "@/lib/validators";

export async function GET() {
  return NextResponse.json(await getProducts(true));
}

export async function POST(request: Request) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: "Supabase service role is not configured." }, { status: 500 });
  const parsed = productSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.errors[0]?.message }, { status: 400 });

  const { data, error } = await supabase.from("products").insert(parsed.data).select("*").single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/admin/products");
  revalidatePath(`/products/${data.slug}`);
  return NextResponse.json(data, { status: 201 });
}
