const fs = require("fs");
const path = require("path");

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const exists = (file) => fs.existsSync(path.join(root, file));

function fail(message) {
  console.error("FAIL: " + message);
  process.exit(1);
}

const requiredFiles = [
  "lib/admin/audit-log.ts",
  "app/admin/audit/page.tsx",
  "components/admin/AdminHeader.tsx",
  "app/admin/page.tsx",
  "app/admin-v8.css",
  "supabase/migrations/0016_admin_audit_log.sql",
  "app/admin/projekty/actions.ts",
  "app/admin/projekty/nowy/actions.ts",
  "app/admin/zamowienia/actions.ts",
  "package.json"
];

for (const file of requiredFiles) {
  if (!exists(file)) fail("missing admin audit log file: " + file);
}

function requireIncludes(file, needles) {
  const content = read(file);
  for (const needle of needles) {
    if (!content.includes(needle)) fail(file + " missing marker: " + needle);
  }
  return content;
}

const migration = requireIncludes("supabase/migrations/0016_admin_audit_log.sql", [
  "create table if not exists public.admin_audit_log",
  "id uuid primary key",
  "actor_user_id uuid",
  "actor_email text",
  "entity_type text not null",
  "entity_id text not null",
  "action text not null",
  "metadata jsonb not null",
  "created_at timestamptz not null",
  "admin_audit_log_created_at_idx",
  "admin_audit_log_entity_idx",
  "admin_audit_log_actor_idx"
]);

const helper = requireIncludes("lib/admin/audit-log.ts", [
  "export async function writeAdminAuditLog",
  "export async function getAdminAuditLogEntries",
  "ADMIN_AUDIT_ACTION_FILTERS",
  "ADMIN_AUDIT_ACTION_FILTER_LABELS",
  "toAdminAuditActionFilter",
  "adminAuditMetadataSummary",
  "adminAuditMetadataJson",
  "actionLabel",
  "admin_audit_log",
  "actor_user_id",
  "actor_email",
  "entity_type",
  "entity_id",
  "action",
  "metadata",
  "created_at",
  ".order("created_at", { ascending: false })",
  ".limit(limit)",
  ".eq("action", action)",
  "throw new Error"
]);

const criticalActions = [
  "project_create",
  "project_sample_create",
  "project_status_update",
  "project_archive",
  "project_hard_delete",
  "project_hard_delete_blocked",
  "project_update",
  "project_media_delete",
  "project_media_type_update",
  "project_private_file_delete",
  "order_status_update",
  "order_fulfillment_checklist_update"
];

for (const action of criticalActions) {
  const filterNeedle = """ + action + """;
  const labelNeedle = action + ":";
  if (!helper.includes(filterNeedle)) fail("audit helper missing action filter: " + action);
  if (!helper.includes(labelNeedle)) fail("audit helper missing action label: " + action);
}

const auditPage = requireIncludes("app/admin/audit/page.tsx", [
  'data-admin-audit-v50="true"',
  'data-admin-audit-filter-bar="true"',
  'data-admin-audit-action-filter="true"',
  'data-admin-audit-filter-submit="true"',
  'data-admin-audit-filter-reset="true"',
  'data-admin-audit-empty="true"',
  'data-admin-audit-table="true"',
  'data-admin-audit-entry="true"',
  "data-admin-audit-action-value",
  'data-admin-audit-created-at="true"',
  'data-admin-audit-actor="true"',
  'data-admin-audit-action="true"',
  'data-admin-audit-entity-type="true"',
  'data-admin-audit-entity-id="true"',
  'data-admin-audit-metadata-summary="true"',
  "getAdminAuditLogEntries",
  "toAdminAuditActionFilter",
  "ADMIN_AUDIT_ACTION_FILTERS",
  "ADMIN_AUDIT_ACTION_FILTER_LABELS",
  "adminAuditMetadataSummary",
  "adminAuditMetadataJson",
  "actionLabel"
]);

for (const forbidden of [
  "writeAdminAuditLog(",
  "updateAdminOrderStatus(",
  "updateAdminOrderFulfillmentChecklist(",
  "updateAdminProject",
  "deleteAdminProject",
  "archiveAdminProject"
]) {
  if (auditPage.includes(forbidden)) fail("admin audit page must be read-only and not call mutation marker: " + forbidden);
}

requireIncludes("components/admin/AdminHeader.tsx", ['href="/admin/audit"', "History", "Audit"]);
requireIncludes("app/admin/page.tsx", ['href="/admin/audit"', 'data-admin-audit-dashboard-link="true"', "Audit", "ślad operacji"]);
requireIncludes("app/admin-v8.css", [
  "STAGE50 ADMIN AUDIT VIEW START",
  ".admin-audit-shell",
  ".admin-audit-filter-bar",
  ".admin-audit-table-card",
  ".admin-audit-table-wrap",
  ".admin-audit-table",
  "STAGE50 ADMIN AUDIT VIEW END"
]);

const projectCreateActions = requireIncludes("app/admin/projekty/nowy/actions.ts", [
  'import { writeAdminAuditLog } from "@/lib/admin/audit-log";',
  "writeAdminAuditLog",
  'action: "project_create"',
  'entityType: "project"',
  'source: "createProjectAction"',
  "fromStatus: null",
  "toStatus: status",
  "previousStatus: null",
  "newStatus: status",
  "projectCode: code",
  "roomsCount: roomRows.length",
  "variantsCount: variantRows.length",
  "addonsCount: addonRows.length"
]);

const projectActions = requireIncludes("app/admin/projekty/actions.ts", [
  'import { writeAdminAuditLog } from "@/lib/admin/audit-log";',
  "writeAdminAuditLog",
  'action: "project_status_update"',
  'action: "project_archive"',
  'action: "project_hard_delete"',
  'action: "project_hard_delete_blocked"',
  'action: "project_update"',
  'entityType: "project"',
  "projectStatusBeforeDelete",
  '!["archived", "draft"].includes(projectStatusBeforeDelete)',
  'source: "updateProjectStatusAction"',
  'source: "archiveProjectAction"',
  'source: "deleteProjectAction"',
  'source: "updateProjectAction"',
  "fromStatus:",
  "toStatus:",
  "previousStatus:",
  "newStatus:"
]);

for (const needle of [
  'action: "project_media_delete"',
  'entityType: "project_media"',
  'action: "project_media_type_update"',
  'action: "project_private_file_delete"',
  'entityType: "project_private_file"',
  'action: "project_sample_create"',
  'source: "deleteProjectMediaItemAction"',
  'source: "setProjectMediaTypeAction"',
  'source: "deleteProjectPrivateFileItemAction"',
  'source: "createSampleProjectAction"',
  "previousMediaType",
  "newMediaType",
  "fileType",
  "projectCode",
  "fromStatus:",
  "toStatus:"
]) {
  if (!projectActions.includes(needle)) fail("project actions missing Etap 22 runtime audit marker: " + needle);
}

const statusDeclCount = (projectActions.match(/const projectStatusBeforeDelete = String(project.status || "");/g) || []).length;
if (statusDeclCount !== 1) fail("expected exactly one projectStatusBeforeDelete declaration, got " + statusDeclCount);

const orderActions = requireIncludes("app/admin/zamowienia/actions.ts", [
  'import { writeAdminAuditLog } from "@/lib/admin/audit-log";',
  "getAdminOrderById",
  "writeAdminAuditLog",
  'entityType: "order"',
  'action: "order_status_update"',
  'action: "order_fulfillment_checklist_update"',
  'source: "updateOrderStatusAction"',
  'source: "updateOrderFulfillmentChecklistAction"',
  "orderId,",
  "fromStatus: orderBeforeStatusUpdate?.status || null",
  "toStatus: status",
  "previousStatus: orderBeforeStatusUpdate?.status || null",
  "newStatus: status",
  "checklistBefore",
  "previousPaymentConfirmed",
  "previousPdfSent",
  "previousZipSent",
  "previousOrderClosed",
  "previousHasInternalNote",
  "previousHasPaymentInstruction"
]);

const pkg = JSON.parse(read("package.json"));
if (!pkg.scripts || pkg.scripts["verify:admin-audit-log-v44"] !== "node scripts/check-admin-audit-log-v44.cjs") {
  fail("package.json missing verify:admin-audit-log-v44 script.");
}

if (!String(pkg.scripts.verify || "").includes("verify:admin-audit-log-v44")) {
  fail("main verify script does not include verify:admin-audit-log-v44.");
}

console.log("OK: admin audit log V44/V50 + Etap 22 runtime audit contract guard passed.");
