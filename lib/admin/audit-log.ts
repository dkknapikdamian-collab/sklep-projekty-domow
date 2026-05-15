import { createSupabaseServiceRoleClient } from "@/lib/supabase/service-role";

export type AdminAuditActor = {
  ok: true;
  userId: string;
  email?: string;
  role: "admin";
};

export type AdminAuditLogInput = {
  supabase?: NonNullable<ReturnType<typeof createSupabaseServiceRoleClient>> | null;
  admin: AdminAuditActor;
  entityType: "project" | "order" | string;
  entityId: string;
  action: string;
  metadata?: Record<string, unknown>;
};

export async function writeAdminAuditLog(input: AdminAuditLogInput) {
  const client = input.supabase || createSupabaseServiceRoleClient();

  if (!client) {
    throw new Error("Brak Supabase service role client dla admin audit log.");
  }

  if (!input.admin?.ok || !input.admin.userId) {
    throw new Error("Brak danych admina dla admin audit log.");
  }

  if (!input.entityType || !input.entityId || !input.action) {
    throw new Error("Brak wymaganych danych admin audit log.");
  }

  const { error } = await client.from("admin_audit_log").insert({
    actor_user_id: input.admin.userId,
    actor_email: input.admin.email || null,
    entity_type: input.entityType,
    entity_id: input.entityId,
    action: input.action,
    metadata: input.metadata || {},
    created_at: new Date().toISOString()
  });

  if (error) {
    throw new Error(`Nie udało się zapisać admin audit log: ${error.message}`);
  }
}
