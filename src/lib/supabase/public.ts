import { createClient as createSupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabasePublishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
}

if (!supabasePublishableKey) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY");
}

const SUPABASE_URL: string = supabaseUrl;
const SUPABASE_PUBLISHABLE_KEY: string = supabasePublishableKey;

export function createPublicClient() {
  return createSupabaseClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
}
