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

export const ADMIN_AUDIT_ACTION_FILTERS = [
  "all",
  "project_status_update",
  "project_archive",
  "project_hard_delete",
  "project_update",
  "order_status_update",
  "order_fulfillment_checklist_update"
] as const;

export type AdminAuditActionFilter = (typeof ADMIN_AUDIT_ACTION_FILTERS)[number];

export const ADMIN_AUDIT_ACTION_FILTER_LABELS: Record<AdminAuditActionFilter, string> = {
  all: "Wszystkie akcje",
  project_status_update: "Zmiana statusu projektu",
  project_archive: "Archiwizacja projektu",
  project_hard_delete: "Twarde usunięcie projektu",
  project_update: "Edycja projektu",
  order_status_update: "Zmiana statusu zamówienia",
  order_fulfillment_checklist_update: "Aktualizacja realizacji zamówienia"
};

export type AdminAuditLogEntry = {
  id: string;
  actorUserId: string;
  actorEmail: string;
  entityType: string;
  entityId: string;
  action: string;
  metadata: Record<string, unknown>;
  createdAt: string;
};

type AdminAuditLogRow = {
  id: string | null;
  actor_user_id: string | null;
  actor_email: string | null;
  entity_type: string | null;
  entity_id: string | null;
  action: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string | null;
};

export type GetAdminAuditLogEntriesInput = {
  action?: AdminAuditActionFilter | string;
  limit?: number;
};

export function toAdminAuditActionFilter(value: string | undefined): AdminAuditActionFilter {
  if (!value) return "all";
  return ADMIN_AUDIT_ACTION_FILTERS.includes(value as AdminAuditActionFilter)
    ? (value as AdminAuditActionFilter)
    : "all";
}

function normalizeMetadata(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return value as Record<string, unknown>;
}

function metadataValueToText(value: unknown): string {
  if (value === null || value === undefined) return "-";
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);

  try {
    return JSON.stringify(value);
  } catch {
    return "[metadata]";
  }
}

export function adminAuditMetadataSummary(metadata: Record<string, unknown>, maxLength = 180) {
  const entries = Object.entries(metadata || {});
  if (entries.length === 0) return "brak metadata";

  const summary = entries
    .map(([key, value]) => `${key}: ${metadataValueToText(value)}`)
    .join(" · ");

  if (summary.length <= maxLength) return summary;

  return `${summary.slice(0, Math.max(0, maxLength - 1))}…`;
}

export function adminAuditMetadataJson(metadata: Record<string, unknown>) {
  try {
    return JSON.stringify(metadata || {}, null, 2);
  } catch {
    return "{}";
  }
}

export async function getAdminAuditLogEntries(input: GetAdminAuditLogEntriesInput = {}): Promise<AdminAuditLogEntry[]> {
  const client = createSupabaseServiceRoleClient();

  if (!client) {
    return [];
  }

  const action = toAdminAuditActionFilter(String(input.action || "all"));
  const limit = Math.min(Math.max(Number(input.limit || 80), 1), 200);

  let query = client
    .from("admin_audit_log")
    .select("id, actor_user_id, actor_email, entity_type, entity_id, action, metadata, created_at")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (action !== "all") {
    query = query.eq("action", action);
  }

  const { data, error } = await query;

  if (error || !data) {
    console.error("Failed to load admin audit log", error);
    return [];
  }

  return ((data || []) as AdminAuditLogRow[]).map((row) => ({
    id: String(row.id || ""),
    actorUserId: String(row.actor_user_id || ""),
    actorEmail: String(row.actor_email || ""),
    entityType: String(row.entity_type || ""),
    entityId: String(row.entity_id || ""),
    action: String(row.action || ""),
    metadata: normalizeMetadata(row.metadata),
    createdAt: String(row.created_at || "")
  }));
}

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
