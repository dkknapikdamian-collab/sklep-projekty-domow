export type SupabasePublicEnv = {
  supabaseUrl: string;
  supabaseAnonKey: string;
};

export type SupabaseServerEnv = SupabasePublicEnv & {
  supabaseServiceRoleKey?: string;
};

export function getSupabasePublicEnv(): SupabasePublicEnv | null {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  return {
    supabaseUrl,
    supabaseAnonKey
  };
}

export function getSupabaseServerEnv(): SupabaseServerEnv | null {
  const publicEnv = getSupabasePublicEnv();

  if (!publicEnv) {
    return null;
  }

  return {
    ...publicEnv,
    supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY
  };
}

export function isSupabaseConfigured() {
  return Boolean(getSupabasePublicEnv());
}
