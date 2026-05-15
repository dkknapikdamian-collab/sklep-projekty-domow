const fs = require("fs");
const path = require("path");

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const exists = (file) => fs.existsSync(path.join(root, file));

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exit(1);
}

const requiredFiles = [
  "lib/admin/audit-log.ts",
  "supabase/migrations/0016_admin_audit_log.sql",
  "app/admin/projekty/actions.ts",
  "app/admin/zamowienia/actions.ts",
  "package.json"
];

for (const file of requiredFiles) {
  if (!exists(file)) fail(`missing admin audit log file: ${file}`);
}

const migration = read("supabase/migrations/0016_admin_audit_log.sql");
for (const needle of [
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
]) {
  if (!migration.includes(needle)) fail(`migration missing marker: ${needle}`);
}

const helper = read("lib/admin/audit-log.ts");
for (const needle of [
  "export async function writeAdminAuditLog",
  "admin_audit_log",
  "actor_user_id",
  "actor_email",
  "entity_type",
  "entity_id",
  "action",
  "metadata",
  "created_at",
  "throw new Error"
]) {
  if (!helper.includes(needle)) fail(`audit helper missing marker: ${needle}`);
}

const projectActions = read("app/admin/projekty/actions.ts");
for (const needle of [
  'import { writeAdminAuditLog } from "@/lib/admin/audit-log";',
  "writeAdminAuditLog",
  'action: "project_status_update"',
  'action: "project_archive"',
  'action: "project_hard_delete"',
  'action: "project_update"',
  'entityType: "project"',
  "projectStatusBeforeDelete",
  '![\"archived\", \"draft\"].includes(projectStatusBeforeDelete)'
]) {
  if (!projectActions.includes(needle)) fail(`project actions missing audit marker: ${needle}`);
}

const statusDeclCount = (projectActions.match(/const projectStatusBeforeDelete = String\(project\.status \|\| ""\);/g) || []).length;
if (statusDeclCount !== 1) {
  fail(`expected exactly one projectStatusBeforeDelete declaration, got ${statusDeclCount}`);
}

const orderActions = read("app/admin/zamowienia/actions.ts");
for (const needle of [
  'import { writeAdminAuditLog } from "@/lib/admin/audit-log";',
  "writeAdminAuditLog",
  'entityType: "order"',
  'action: "order_status_update"',
  "toStatus: status"
]) {
  if (!orderActions.includes(needle)) fail(`order actions missing audit marker: ${needle}`);
}

const pkg = JSON.parse(read("package.json"));
if (!pkg.scripts || pkg.scripts["verify:admin-audit-log-v44"] !== "node scripts/check-admin-audit-log-v44.cjs") {
  fail("package.json missing verify:admin-audit-log-v44 script.");
}

if (!String(pkg.scripts.verify || "").includes("verify:admin-audit-log-v44")) {
  fail("main verify script does not include verify:admin-audit-log-v44.");
}

console.log("OK: admin audit log V44 guard passed.");
