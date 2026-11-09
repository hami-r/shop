import type { SupabaseClient } from "@supabase/supabase-js";

type ProductInput = Record<string, unknown> & { name_ar?: string | null; description_ar?: string | null };

const ARABIC_FIELDS = ["name_ar", "description_ar"] as const;

function isMissingArabicColumn(error: { message?: string; code?: string } | null) {
  return Boolean(error && /name_ar|description_ar/.test(error.message ?? "") && /column/i.test(error.message ?? ""));
}

/**
 * Inserts or updates a product. The Arabic columns are optional: if the database
 * does not have them yet (supabase/arabic.sql not run) and no Arabic text was
 * entered, the product is saved without them instead of failing.
 */
export async function saveProduct(supabase: SupabaseClient, input: ProductInput, id?: string) {
  const run = (data: ProductInput) =>
    id
      ? supabase.from("products").update(data).eq("id", id).select("*").single()
      : supabase.from("products").insert(data).select("*").single();

  const first = await run(input);
  if (!isMissingArabicColumn(first.error)) return first;

  const hasArabic = ARABIC_FIELDS.some((field) => Boolean(input[field]));
  if (hasArabic) {
    return {
      data: null,
      error: { message: "To save Arabic text, first run supabase/arabic.sql in the Supabase SQL editor." }
    };
  }

  const withoutArabic = { ...input };
  ARABIC_FIELDS.forEach((field) => delete withoutArabic[field]);
  return run(withoutArabic);
}
