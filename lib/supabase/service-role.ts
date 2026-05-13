import { createClient } from "@supabase/supabase-js";
import { getSupabaseServerEnv } from "./env";

export function createSupabaseServiceRoleClient() {
  const env = getSupabaseServerEnv();

  if (!env?.supabaseServiceRoleKey) {
    return null;
  }

  return createClient(env.supabaseUrl, env.supabaseServiceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}
