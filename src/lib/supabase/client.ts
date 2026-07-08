import { createBrowserClient } from "@supabase/ssr";

/**
 * Browser-side Supabase client (singleton per tab).
 * Sessions are persisted in cookies via @supabase/ssr so the middleware
 * and server components can read them too.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
