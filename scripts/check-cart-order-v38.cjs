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
  "components/Header.tsx",
  "components/HeaderCartLink.tsx",
  "components/HeaderFavoritesLink.tsx",
  "components/order/CheckoutForm.tsx",
  "components/project/FavoriteButton.tsx",
  "components/project/ProjectPurchaseBox.tsx",
  "lib/cart/types.ts",
  "lib/cart/storage.ts",
  "lib/favorites/storage.ts",
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
for (const needle of [
  "data-cart-v38",
  "data-cart-item-code",
  "data-cart-item-slug",
  "data-cart-item-variant",
  "data-cart-item-total",
  "removeCartItem",
  "updateCartItemAddons",
  "cartTotal",
  "Przejdz do zamowienia"
]) {
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
for (const needle of [
  "localStorage",
  "project-cart-v38",
  "safeCartPayload",
  "normalizeCartItem",
  "Number.isFinite",
  "projectCode",
  "projectSlug",
  "projectName",
  "basePriceGross",
  "variantName",
  "variantPriceGross",
  "selectedAddons",
  "availableAddons",
  "deliveryAction",
  "cartItemTotal"
]) {
  if (!storage.includes(needle)) {
    console.error(`FAIL: cart storage missing marker: ${needle}`);
    process.exit(1);
  }
}

const header = read("components/Header.tsx");
for (const needle of ["HeaderCartLink", "HeaderFavoritesLink"]) {
  if (!header.includes(needle)) {
    console.error(`FAIL: header missing live cart/favorites marker: ${needle}`);
    process.exit(1);
  }
}

const headerCart = read("components/HeaderCartLink.tsx");
for (const needle of ["readCart", "project-cart-updated", "storage", "Koszyk"]) {
  if (!headerCart.includes(needle)) {
    console.error(`FAIL: header cart counter missing marker: ${needle}`);
    process.exit(1);
  }
}

const favoritesStorage = read("lib/favorites/storage.ts");
for (const needle of ["project-favorites-v1", "project-favorites-updated", "projectCode", "projectSlug", "projectName"]) {
  if (!favoritesStorage.includes(needle)) {
    console.error(`FAIL: favorites storage missing marker: ${needle}`);
    process.exit(1);
  }
}

const favoriteButton = read("components/project/FavoriteButton.tsx");
for (const needle of ["toggleFavorite", "aria-pressed", "data-favorite-project-button", "data-favorite-active"]) {
  if (!favoriteButton.includes(needle)) {
    console.error(`FAIL: favorite button missing marker: ${needle}`);
    process.exit(1);
  }
}

const purchasePdfGuardMarkers = ["send_pdf_email", "data-project-pdf-email-addon"];
for (const needle of purchasePdfGuardMarkers) {
  if (!purchase.includes(needle) && !storage.includes(needle)) {
    console.error(`FAIL: PDF email addon guard missing marker: ${needle}`);
    process.exit(1);
  }
}

const checkoutPage = read("app/zamowienie/page.tsx");
const checkout = read("components/order/CheckoutForm.tsx");
const checkoutAction = read("app/zamowienie/actions.ts");

for (const needle of ["data-checkout-form-v38", "customerName", "customerEmail", "customerPhone", "invoiceData", "termsConsent", "contactConsent", "cartJson"]) {
  if (!checkout.includes(needle)) {
    console.error(`FAIL: checkout form missing marker: ${needle}`);
    process.exit(1);
  }
}

const checkoutCopySources = [checkoutPage, checkout, checkoutAction].join("\n");
for (const needle of [
  "Zamówienie projektu",
  "Po wysłaniu potwierdzimy dostępność, płatność i sposób realizacji",
  "Kupujesz wybrane projekty, warianty i dodatki z koszyka",
  "Pliki projektu przekażemy po ręcznym potwierdzeniu dostępności, płatności",
  "PDF na e-mail oznacza dodatkowy pakiet PDF",
  "Skontaktujemy się z Tobą"
]) {
  if (!checkoutCopySources.includes(needle)) {
    console.error(`FAIL: checkout V43 copy missing required text: ${needle}`);
    process.exit(1);
  }
}

const checkoutCopyLower = checkoutCopySources.toLocaleLowerCase("pl-PL");
for (const forbidden of [
  "zamowienie testowe",
  "zamówienie testowe",
  "zamowienia testowego",
  "zamówienia testowego",
  "rekord trafi do supabase"
]) {
  if (checkoutCopyLower.includes(forbidden)) {
    console.error(`FAIL: checkout must not look like a demo/test flow: ${forbidden}`);
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
