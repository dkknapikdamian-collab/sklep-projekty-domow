const fs = require("fs");
const path = require("path");

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const exists = (file) => fs.existsSync(path.join(root, file));

function fail(message) {
  console.error("FAIL: " + message);
  process.exit(1);
}

function requireIncludes(file, needles) {
  if (!exists(file)) fail("missing admin audit file: " + file);
  const content = read(file);
  for (const needle of needles) {
    if (!content.includes(needle)) fail(file + " missing marker: " + needle);
  }
  return content;
}

requireIncludes("supabase/migrations/0016_admin_audit_log.sql", [
  "create table if not exists public.admin_audit_log",
  "entity_type text not null",
  "entity_id text not null",
  "action text not null",
  "metadata jsonb not null",
  "admin_audit_log_created_at_idx",
  "admin_audit_log_entity_idx"
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
  ".order(\"created_at\", { ascending: false })",
  ".limit(limit)",
  ".eq(\"action\", action)",
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
  if (!helper.includes('"' + action + '"')) fail("audit helper missing action filter: " + action);
  if (!helper.includes(action + ":")) fail("audit helper missing action label: " + action);
}

const auditPage = requireIncludes("app/admin/audit/page.tsx", [
  'data-admin-audit-v50="true"',
  'data-admin-audit-filter-bar="true"',
  'data-admin-audit-action-filter="true"',
  'data-admin-audit-table="true"',
  'data-admin-audit-entry="true"',
  "getAdminAuditLogEntries",
  "toAdminAuditActionFilter",
  "ADMIN_AUDIT_ACTION_FILTERS",
  "adminAuditMetadataSummary",
  "adminAuditMetadataJson",
  "actionLabel"
]);

for (const forbidden of ["writeAdminAuditLog(", "deleteAdminProject", "archiveAdminProject"]) {
  if (auditPage.includes(forbidden)) fail("admin audit page must be read-only and not call mutation marker: " + forbidden);
}

requireIncludes("components/admin/AdminHeader.tsx", ['href="/admin/audit"', "History", "Audit"]);
requireIncludes("app/admin/page.tsx", ['href="/admin/audit"', 'data-admin-audit-dashboard-link="true"', "Audit"]);

requireIncludes("app/admin/projekty/nowy/actions.ts", [
  'import { writeAdminAuditLog } from "@/lib/admin/audit-log";',
  'action: "project_create"',
  'entityType: "project"',
  'source: "createProjectAction"',
  "projectCode: code",
  "fromStatus: null",
  "toStatus: status"
]);

const projectActions = requireIncludes("app/admin/projekty/actions.ts", [
  'import { writeAdminAuditLog } from "@/lib/admin/audit-log";',
  "tryWriteAdminAuditLog",
  "writeAdminAuditLog",
  "safeAdminProjectReturnPath",
  'action: "project_status_update"',
  'action: "project_archive"',
  'action: "project_hard_delete"',
  'action: "project_update"',
  'entityType: "project"',
  "projectStatusBeforeDelete",
  "hardDeleteAllowedByTypedCode",
  'source: "updateProjectStatusAction"',
  'source: "archiveProjectAction"',
  'source: "deleteProjectAction"',
  'source: "updateProjectAction"',
  "fromStatus:",
  "toStatus:",
  "previousStatus:",
  "newStatus:"
]);

for (const forbidden of [
  'if (!["archived", "draft"].includes(projectStatusBeforeDelete))',
  'status_not_allowed'
]) {
  if (projectActions.includes(forbidden)) fail("project hard delete still blocks active by status: " + forbidden);
}

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
  "projectCode"
]) {
  if (!projectActions.includes(needle)) fail("project actions missing runtime audit marker: " + needle);
}

requireIncludes("app/admin/zamowienia/actions.ts", [
  'import { writeAdminAuditLog } from "@/lib/admin/audit-log";',
  "getAdminOrderById",
  'entityType: "order"',
  'action: "order_status_update"',
  'action: "order_fulfillment_checklist_update"',
  'source: "updateOrderStatusAction"',
  'source: "updateOrderFulfillmentChecklistAction"',
  "fromStatus: orderBeforeStatusUpdate?.status || null",
  "toStatus: status",
  "checklistBefore"
]);

const pkg = JSON.parse(read("package.json"));
if (!pkg.scripts || pkg.scripts["verify:admin-audit-log-v44"] !== "node scripts/check-admin-audit-log-v44.cjs") {
  fail("package.json missing verify:admin-audit-log-v44 script.");
}
if (!String(pkg.scripts.verify || "").includes("verify:admin-audit-log-v44")) {
  fail("main verify script does not include verify:admin-audit-log-v44.");
}

console.log("OK: admin audit log V44/V50 + Etap 23 V7 runtime archive/delete guard passed.");
