"use client";
import { createBrowserClient } from "@supabase/ssr";

type AdminClient = ReturnType<typeof createBrowserClient>;
let cachedClient: AdminClient | null = null;

export function createAdminClient(): AdminClient {
  if (cachedClient) return cachedClient;
  
  cachedClient = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  
  return cachedClient;
}
