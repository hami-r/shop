import { createBrowserClient } from "@supabase/ssr";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const hasSupabaseEnv = Boolean(url && anonKey);

let browserClient: SupabaseClient | null = null;

/**
 * Browser client. Stores the auth session in cookies (not localStorage) so the
 * server, middleware and API routes can verify the admin session.
 */
export function getSupabaseBrowser() {
  if (!url || !anonKey) return null;
  if (!browserClient) browserClient = createBrowserClient(url, anonKey);
  return browserClient;
}

/** Service-role client. Bypasses RLS — only use on the server after checking access. */
export function getSupabaseAdmin() {
  if (!url || !serviceRoleKey) return null;
  return createClient(url, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false }
  });
}
