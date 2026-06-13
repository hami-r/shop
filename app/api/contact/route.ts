import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { contactSchema } from "@/lib/validators";

export async function POST(request: Request) {
  const parsed = contactSchema.safeParse(await request.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.errors[0]?.message }, { status: 400 });
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ ok: true });

  const { error } = await supabase.from("messages").insert(parsed.data);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}
