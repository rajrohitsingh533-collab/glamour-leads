import { createClient } from "@supabase/supabase-js";

/**
 * Server-only admin client using the service_role key.
 * ⚠️  NEVER import this in Client Components or expose it to the browser.
 *     The service_role key bypasses RLS — it is a superuser credential.
 *
 * Use this only in:
 *   - Route Handlers (app/api/*)
 *   - Server Actions ("use server")
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. " +
        "Add them to .env.local and Vercel environment variables."
    );
  }

  return createClient(url, serviceKey, {
    auth: {
      // Service-role client doesn't need session persistence
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
