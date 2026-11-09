import { createServerClient, type CookieOptions } from "@supabase/ssr";

type CookieToSet = { name: string; value: string; options: CookieOptions };
import type { User } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/**
 * Comma-separated list of emails allowed into the admin, e.g.
 * ADMIN_EMAILS=owner@example.com,staff@example.com
 * If it is not set, nobody is treated as an admin (fail closed), because a
 * Supabase project with sign-ups enabled lets anyone create an account.
 */
export function isAdminEmail(email: string | undefined | null) {
  const allowed = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
  return Boolean(email && allowed.includes(email.toLowerCase()));
}

export async function getAdminUser(request?: Request): Promise<User | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;

  const cookieStore = cookies();
  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (list: CookieToSet[]) => {
        try {
          list.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // Called from a Server Component: cookies are read-only there; middleware refreshes them.
        }
      }
    }
  });

  const bearer = request?.headers.get("authorization")?.replace(/^Bearer\s+/i, "") || undefined;
  const { data, error } = await supabase.auth.getUser(bearer);
  if (error || !data.user || !isAdminEmail(data.user.email)) return null;
  return data.user;
}

/** Returns a 401 response when the caller is not an admin, otherwise null. */
export async function requireAdmin(request?: Request) {
  const user = await getAdminUser(request);
  if (user) return null;
  return NextResponse.json({ error: "Admin session is required." }, { status: 401 });
}
