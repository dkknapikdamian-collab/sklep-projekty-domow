const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

const root = process.cwd();

function loadEnvFile(file) {
  const envPath = path.join(root, file);
  if (!fs.existsSync(envPath)) return;

  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    if (!line || line.trim().startsWith("#")) continue;
    const index = line.indexOf("=");
    if (index === -1) continue;
    const key = line.slice(0, index).trim();
    let value = line.slice(index + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvFile(".env.local");

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
  console.error("FAIL: Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY for read-only audit.");
  process.exit(1);
}

const supabase = createClient(url, serviceRoleKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false
  }
});

function toNumber(value) {
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : 0;
}

async function main() {
  const { data: projects, error } = await supabase
    .from("projects")
    .select("id, code, slug, name, status, price_gross, usable_area, rooms_count, updated_at")
    .order("updated_at", { ascending: false })
    .limit(50);

  if (error) {
    console.error(`FAIL: Could not read projects: ${error.message}`);
    process.exit(1);
  }

  const rows = projects || [];
  const ids = rows.map((row) => row.id);

  const mediaCounts = new Map();
  const roomCounts = new Map();

  if (ids.length) {
    const [{ data: media }, { data: rooms }] = await Promise.all([
      supabase.from("project_media").select("project_id").in("project_id", ids),
      supabase.from("project_rooms").select("project_id").in("project_id", ids)
    ]);

    for (const item of media || []) {
      mediaCounts.set(item.project_id, (mediaCounts.get(item.project_id) || 0) + 1);
    }

    for (const item of rooms || []) {
      roomCounts.set(item.project_id, (roomCounts.get(item.project_id) || 0) + 1);
    }
  }

  const statusCounts = rows.reduce((acc, project) => {
    acc[project.status] = (acc[project.status] || 0) + 1;
    return acc;
  }, {});

  console.log("== SUPABASE PROJECT AUDIT V22D ==");
  console.log(`Total recent projects checked: ${rows.length}`);
  console.log(`Status counts: ${JSON.stringify(statusCounts)}`);

  const active = rows.filter((project) => project.status === "active");
  console.log(`Active/public projects: ${active.length}`);

  console.log("\n== RECENT PROJECTS ==");
  for (const project of rows.slice(0, 15)) {
    const mediaCount = mediaCounts.get(project.id) || 0;
    const dbRoomCount = roomCounts.get(project.id) || 0;
    const warnings = [];

    if (project.status === "active" && mediaCount === 0) warnings.push("ACTIVE_WITHOUT_MEDIA");
    if (project.status === "active" && toNumber(project.usable_area) === 0) warnings.push("ACTIVE_WITH_ZERO_AREA");
    if (project.status === "active" && toNumber(project.rooms_count) === 0) warnings.push("ACTIVE_WITH_ZERO_ROOMS");
    if (project.status === "active" && dbRoomCount === 0) warnings.push("ACTIVE_WITHOUT_ROOM_ROWS");

    console.log([
      project.code || "(no-code)",
      project.status,
      project.slug || "(no-slug)",
      project.name || "(no-name)",
      `price=${project.price_gross || 0}`,
      `area=${project.usable_area || 0}`,
      `rooms=${project.rooms_count || 0}`,
      `media=${mediaCount}`,
      `roomRows=${dbRoomCount}`,
      warnings.length ? `WARN=${warnings.join(",")}` : "OK"
    ].join(" | "));
  }

  const suspicious = active.filter((project) => {
    const mediaCount = mediaCounts.get(project.id) || 0;
    const dbRoomCount = roomCounts.get(project.id) || 0;

    return mediaCount === 0 || toNumber(project.usable_area) === 0 || toNumber(project.rooms_count) === 0 || dbRoomCount === 0;
  });

  if (suspicious.length) {
    console.log("\nAUDIT RESULT: Active projects exist, but some are incomplete. They will appear public with placeholders or 0 values.");
    return;
  }

  console.log("\nAUDIT RESULT: No incomplete active project found in the checked recent rows.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
