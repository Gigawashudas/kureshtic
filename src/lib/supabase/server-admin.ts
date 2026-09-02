import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

if (!supabaseUrl) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
}

if (!supabaseSecretKey) {
  throw new Error("Missing SUPABASE_SECRET_KEY");
}

const SUPABASE_URL: string = supabaseUrl;
const SUPABASE_SECRET_KEY: string = supabaseSecretKey;

export function createServerAdminClient() {
  return createClient(
    SUPABASE_URL,
    SUPABASE_SECRET_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );
}
