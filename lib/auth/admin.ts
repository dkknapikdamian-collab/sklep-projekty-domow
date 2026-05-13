import { createSupabaseServerClient } from "@/lib/supabase/server";

export type AdminSessionResult =
  | { ok: true; userId: string; email?: string; role: "admin" }
  | { ok: false; reason: "not_configured" | "not_logged_in" | "not_admin" | "profile_error" };

export async function getAdminSession(): Promise<AdminSessionResult> {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return { ok: false, reason: "not_configured" };
  }

  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { ok: false, reason: "not_logged_in" };
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (profileError) {
    return { ok: false, reason: "profile_error" };
  }

  if (profile?.role !== "admin") {
    return { ok: false, reason: "not_admin" };
  }

  return {
    ok: true,
    userId: user.id,
    email: user.email ?? undefined,
    role: "admin"
  };
}
