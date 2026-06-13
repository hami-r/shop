import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

const bucket = "product-images";

function safeFilename(name: string) {
  return name.replace(/[^a-zA-Z0-9._-]/g, "-").replace(/-+/g, "-");
}

export async function POST(request: Request) {
  const supabase = getSupabaseAdmin();
  if (!supabase) return NextResponse.json({ error: "Supabase service role is not configured." }, { status: 500 });

  const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!token) return NextResponse.json({ error: "Admin session is required." }, { status: 401 });

  const { data: authData, error: authError } = await supabase.auth.getUser(token);
  if (authError || !authData.user) return NextResponse.json({ error: "Admin session is invalid." }, { status: 401 });

  const formData = await request.formData();
  const file = formData.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "Image file is required." }, { status: 400 });
  if (!file.type.startsWith("image/")) return NextResponse.json({ error: "Only image uploads are allowed." }, { status: 400 });

  const path = `${crypto.randomUUID()}-${safeFilename(file.name)}`;
  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    contentType: file.type,
    upsert: false
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return NextResponse.json({ url: data.publicUrl });
}
