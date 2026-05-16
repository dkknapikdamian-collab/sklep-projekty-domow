const fs = require("fs");
const path = require("path");

const root = process.cwd();

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

function exists(file) {
  return fs.existsSync(path.join(root, file));
}

function fail(message) {
  console.error(`FAIL: ${message}`);
  process.exit(1);
}

function requireFile(file) {
  if (!exists(file)) fail(`missing required order price source file: ${file}`);
  return read(file);
}

function requireMarkers(file, markers) {
  const source = requireFile(file);
  for (const marker of markers) {
    if (!source.includes(marker)) fail(`${file} missing marker: ${marker}`);
  }
  return source;
}

const validator = requireMarkers("lib/order/validate-cart-against-db.ts", [
  "validateCartAgainstDb",
  "CART_PRICE_CHANGED_MESSAGE",
  "Cena projektu lub dodatków zmieniła się. Odśwież koszyk.",
  '.from("projects")',
  '.eq("code", item.projectCode)',
  '.eq("slug", item.projectSlug)',
  'project.status !== "active"',
  '.from("project_addons")',
  '.eq("active", true)',
  '.from("project_variants")',
  'assertSamePrice(item.basePriceGross, project.price_gross)',
  'assertSamePrice(item.variantPriceGross, variant.price_gross)',
  'assertSamePrice(selectedAddon.priceGross, addon.price_gross)',
  "projectCode: project.code",
  "projectSlug: project.slug",
  "projectName: project.name",
  "basePriceGross: moneyNumber(project.price_gross)",
  "selectedAddons",
  "availableAddons"
]);

for (const forbidden of [
  "return cart;",
  "return input.cart;"
]) {
  if (validator.includes(forbidden)) fail(`validator must not return unvalidated client cart directly: ${forbidden}`);
}

const createOrder = requireMarkers("lib/order/create-order.ts", [
  "validateCartAgainstDb",
  "const validatedCart = await validateCartAgainstDb(supabase, input.cart)",
  "const totalGross = orderTotal(validatedCart)",
  "for (const item of validatedCart.items)",
  "base_price_gross: item.basePriceGross",
  "variant_price_gross: item.variantPriceGross",
  "item_total_gross: item.basePriceGross + item.variantPriceGross + addonsTotal",
  "price_gross: addon.priceGross"
]);

if (createOrder.includes("const totalGross = orderTotal(input.cart)")) {
  fail("createOrder still calculates total directly from client CartPayload.");
}

if (createOrder.includes("for (const item of input.cart.items)")) {
  fail("createOrder still writes order items directly from client CartPayload.");
}

const action = requireMarkers("app/zamowienie/actions.ts", [
  "submitOrderAction",
  "createOrder",
  "message: error instanceof Error ? error.message"
]);

const orderSchemaGuard = requireMarkers("scripts/check-order-schema-v38.cjs", [
  "orders",
  "order_items",
  "order_item_addons"
]);

const packageJson = JSON.parse(requireFile("package.json"));
if (packageJson.scripts?.["verify:order-price-source-v50"] !== "node scripts/check-order-price-source-v50.cjs") {
  fail("package.json missing verify:order-price-source-v50 script.");
}

if (!String(packageJson.scripts?.verify || "").includes("verify:order-price-source-v50")) {
  fail("main verify script missing verify:order-price-source-v50.");
}

console.log("OK: order price source V50 guard passed.");
