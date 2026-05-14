const fs = require("fs");
const path = require("path");

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const exists = (file) => fs.existsSync(path.join(root, file));

const requiredFiles = [
  "app/koszyk/page.tsx",
  "app/zamowienie/page.tsx",
  "app/zamowienie/actions.ts",
  "components/cart/CartClient.tsx",
  "components/order/CheckoutForm.tsx",
  "components/project/ProjectPurchaseBox.tsx",
  "lib/cart/types.ts",
  "lib/cart/storage.ts",
  "lib/order/create-order.ts",
  "docs/implementation/STAGE38_CART_ORDER_V1.md"
];

const missing = requiredFiles.filter((file) => !exists(file));
if (missing.length) {
  console.error("FAIL: Missing V38 cart/order files:");
  for (const file of missing) console.error("- " + file);
  process.exit(1);
}

const cart = read("components/cart/CartClient.tsx");
for (const needle of ["data-cart-v38", "removeCartItem", "updateCartItemAddons", "cartTotal", "Przejdz do zamowienia"]) {
  if (!cart.includes(needle)) {
    console.error(`FAIL: cart UI missing marker: ${needle}`);
    process.exit(1);
  }
}

const purchase = read("components/project/ProjectPurchaseBox.tsx");
for (const needle of ["addCartItem", "selectedVariantPrice", "selectedAddons", "availableAddons", "deliveryAction"]) {
  if (!purchase.includes(needle)) {
    console.error(`FAIL: purchase box missing cart payload marker: ${needle}`);
    process.exit(1);
  }
}

const storage = read("lib/cart/storage.ts");
for (const needle of ["localStorage", "project-cart-v38", "cartItemTotal", "variantPriceGross", "selectedAddons"]) {
  if (!storage.includes(needle)) {
    console.error(`FAIL: cart storage missing marker: ${needle}`);
    process.exit(1);
  }
}

const checkout = read("components/order/CheckoutForm.tsx");
for (const needle of ["data-checkout-form-v38", "customerName", "customerEmail", "customerPhone", "invoiceData", "termsConsent", "contactConsent", "cartJson"]) {
  if (!checkout.includes(needle)) {
    console.error(`FAIL: checkout form missing marker: ${needle}`);
    process.exit(1);
  }
}

const order = read("lib/order/create-order.ts");
for (const needle of ["from(\"orders\")", "from(\"order_items\")", "from(\"order_item_addons\")", "status: \"new\"", "variant_price_gross", "selectedAddons"]) {
  if (!order.includes(needle)) {
    console.error(`FAIL: order persistence missing marker: ${needle}`);
    process.exit(1);
  }
}

const allSources = requiredFiles.map((file) => read(file)).join("\n");
for (const forbidden of ["project_files", "storage.from", "send_pdf_email("]) {
  if (allSources.includes(forbidden)) {
    console.error(`FAIL: V38 must not automatically send private files or use private storage: ${forbidden}`);
    process.exit(1);
  }
}

console.log("OK: cart/order V38 guard passed.");
