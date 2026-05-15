const fs = require("fs");
const path = require("path");

const root = process.cwd();
const migration = path.join(root, "supabase/migrations/0014_orders_v1.sql");

if (!fs.existsSync(migration)) {
  console.error("FAIL: Missing V38 order schema migration.");
  process.exit(1);
}

const sql = fs.readFileSync(migration, "utf8");

for (const needle of [
  "create table if not exists public.orders",
  "create table if not exists public.order_items",
  "create table if not exists public.order_item_addons",
  "status text not null default 'new'",
  "'contacted'",
  "'paid_manual'",
  "'cancelled'",
  "'sent'",
  "total_gross",
  "variant_price_gross",
  "delivery_action"
]) {
  if (!sql.includes(needle)) {
    console.error(`FAIL: order schema missing marker: ${needle}`);
    process.exit(1);
  }
}

if (sql.includes("stripe") || sql.includes("przelewy") || sql.includes("project_files")) {
  console.error("FAIL: V38 schema must not add payment provider automation or private file delivery.");
  process.exit(1);
}

console.log("OK: order schema V38 guard passed.");
