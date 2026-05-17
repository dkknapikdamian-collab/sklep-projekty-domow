const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

function fail(message, extra) {
  console.error("FAIL: " + message);
  if (extra) console.error(extra);
  process.exit(1);
}

function loadEnvFile(fileName) {
  const filePath = path.join(process.cwd(), fileName);
  if (!fs.existsSync(filePath)) return false;
  const content = fs.readFileSync(filePath, "utf8").replace(/^\uFEFF/, "");
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const eqIndex = line.indexOf("=");
    if (eqIndex <= 0) continue;
    const key = line.slice(0, eqIndex).trim();
    let value = line.slice(eqIndex + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (key && process.env[key] === undefined) process.env[key] = value;
  }
  return true;
}

loadEnvFile(".env.local");
loadEnvFile(".env");

function stringify(value) {
  try { return JSON.stringify(value || {}); } catch { return String(value || ""); }
}

const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_ADMIN_KEY;
const sinceHours = Number(process.env.ADMIN_AUDIT_RUNTIME_SINCE_HOURS || "24");
const allowBlockedDelete = process.env.ADMIN_AUDIT_ALLOW_BLOCKED_DELETE === "1";

if (!url) fail("Missing Supabase URL. Set NEXT_PUBLIC_SUPABASE_URL or SUPABASE_URL in the shell or .env.local.");
if (!key) fail("Missing Supabase service key. Set SUPABASE_SERVICE_ROLE_KEY, SUPABASE_SERVICE_KEY or SUPABASE_ADMIN_KEY in the shell or .env.local. Do not commit it. If you do not want to expose service key locally, use the SQL proof in Supabase SQL Editor.");
if (!Number.isFinite(sinceHours) || sinceHours <= 0) fail("ADMIN_AUDIT_RUNTIME_SINCE_HOURS must be a positive number.");

const since = new Date(Date.now() - sinceHours * 60 * 60 * 1000).toISOString();
const supabase = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });

function hasAction(row, actions) {
  return actions.includes(row.action);
}

function metadataText(row) {
  return stringify(row.metadata).toLowerCase();
}

const requiredGroups = [
  {
    key: "dodanie projektu",
    actions: ["project_create"],
    match: (row) => hasAction(row, ["project_create"])
  },
  {
    key: "publikacja projektu",
    actions: ["project_status_update"],
    match: (row) => hasAction(row, ["project_status_update"]) && (metadataText(row).includes("active") || metadataText(row).includes("published"))
  },
  {
    key: "archiwizacja projektu",
    actions: ["project_archive"],
    match: (row) => hasAction(row, ["project_archive"])
  },
  {
    key: "usuniecie projektu",
    actions: allowBlockedDelete ? ["project_hard_delete", "project_hard_delete_blocked"] : ["project_hard_delete"],
    match: (row) => hasAction(row, allowBlockedDelete ? ["project_hard_delete", "project_hard_delete_blocked"] : ["project_hard_delete"])
  },
  {
    key: "media projektu",
    actions: ["project_media_delete", "project_media_type_update"],
    match: (row) => hasAction(row, ["project_media_delete", "project_media_type_update"])
  },
  {
    key: "pliki prywatne",
    actions: ["project_private_file_delete"],
    match: (row) => hasAction(row, ["project_private_file_delete"])
  },
  {
    key: "zamowienia",
    actions: ["order_status_update"],
    match: (row) => hasAction(row, ["order_status_update"])
  },
  {
    key: "checklisty zamowien",
    actions: ["order_fulfillment_checklist_update"],
    match: (row) => hasAction(row, ["order_fulfillment_checklist_update"])
  }
];

async function main() {
  const { data, error } = await supabase
    .from("admin_audit_log")
    .select("created_at, admin_email, action, entity_type, entity_id, metadata")
    .gte("created_at", since)
    .order("created_at", { ascending: false })
    .limit(250);

  if (error) fail("Supabase query failed for public.admin_audit_log", error.message || String(error));

  const rows = data || [];
  console.log("Etap 33 admin audit runtime proof");
  console.log("Window hours: " + sinceHours);
  console.log("Since: " + since);
  console.log("Rows found: " + rows.length);
  console.log("");

  const missing = [];
  for (const group of requiredGroups) {
    const matched = rows.filter(group.match);
    const status = matched.length > 0 ? "PASS" : "FAIL";
    console.log(status + " | " + group.key + " | actions: " + group.actions.join(", ") + " | entries: " + matched.length);
    if (matched.length > 0) {
      const sample = matched[0];
      console.log("  last: " + sample.created_at + " | " + sample.action + " | " + sample.entity_type + " | " + sample.entity_id);
    } else {
      missing.push(group.key);
    }
  }

  console.log("");
  console.log("Recent audit rows:");
  for (const row of rows.slice(0, 20)) {
    console.log("- " + row.created_at + " | " + row.action + " | " + row.entity_type + " | " + row.entity_id + " | " + stringify(row.metadata).slice(0, 220));
  }

  if (rows.length === 0) missing.push("/admin/audit - brak jakichkolwiek wpisow w oknie testowym");
  if (missing.length > 0) {
    fail("Etap 33 runtime audit is not confirmed. Missing groups: " + missing.join(", "));
  }

  console.log("");
  console.log("OK: Etap 33 runtime audit confirmed in Supabase admin_audit_log for required admin flows.");
}

main().catch((err) => fail("Unexpected runtime proof error", err && err.stack ? err.stack : String(err)));
