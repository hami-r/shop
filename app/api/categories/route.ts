import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { getCategories } from "@/lib/categories";
import { getSupabaseAdmin } from "@/lib/supabase";
import { categorySchema } from "@/lib/validators";

export async function GET() {
  return NextResponse.json(await getCategories());
}

export async function POST(request: Request) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: "Supabase service role is not configured." }, { status: 500 });

  const parsed = categorySchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.errors[0]?.message }, { status: 400 });

  const { data, error } = await supabase
    .from("categories")
    .insert({ name: parsed.data.name })
    .select("*")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/admin/categories");
  revalidatePath("/admin/products");
  return NextResponse.json(data, { status: 201 });
}
