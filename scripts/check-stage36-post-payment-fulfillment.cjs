const fs = require("fs");
const path = require("path");

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const exists = (file) => fs.existsSync(path.join(root, file));

function fail(message) {
  console.error("FAIL: " + message);
  process.exit(1);
}

function requireFile(file) {
  if (!exists(file)) fail("missing Etap 36 file: " + file);
  return read(file);
}

function requireMarkers(file, markers) {
  const source = requireFile(file);
  for (const marker of markers) {
    if (!source.includes(marker)) fail(`${file} missing marker: ${marker}`);
  }
  return source;
}

const helper = requireMarkers("lib/fulfillment/post-payment-fulfillment.ts", [
  "POST_PAYMENT_FULFILLMENT_STATUSES",
  "POST_PAYMENT_FILE_LINK_TTL_SECONDS",
  "hashPostPaymentAccessToken",
  "ensurePostPaymentFulfillmentAccessForOrder",
  "getPostPaymentFulfillmentAccessView",
  "createSignedFileRedirectForAccess",
  "order_payments",
  "order_fulfillment_access",
  "order_download_events",
  "createSignedUrl",
  "checkout.session.completed",
  "checkout.session.async_payment_succeeded",
  "successPageIsNotSourceOfTruth"
]);

const accessPage = requireMarkers("app/zamowienie/dostep/[token]/page.tsx", [
  "data-post-payment-access-panel-v36",
  "data-post-payment-access-ready",
  "data-post-payment-access-security",
  "data-post-payment-file-list",
  "data-post-payment-file-download",
  "Płatność została potwierdzona po stronie serwera",
  "Brak publicznych linków",
  "krótki, czasowy link"
]);

const fileRoute = requireMarkers("app/zamowienie/dostep/[token]/plik/[fileId]/route.ts", [
  "type DownloadRouteContext",
  "params: Promise<{ token: string; fileId: string }>",
  "const params = await context.params",
  "createSignedFileRedirectForAccess",
  "NextResponse.redirect",
  "access_denied"
]);

if (fileRoute.includes("params?:")) {
  fail("Etap 36 route handler params must not be optional in Next generated route context.");
}

const sql = requireMarkers("supabase/manual/2026-05-17_etap36_post_payment_fulfillment.sql", [
  "SQL_LEDGER_ID: 2026-05-17_etap36_post_payment_fulfillment",
  "create table if not exists public.order_payments",
  "create table if not exists public.payment_events",
  "create table if not exists public.order_fulfillment_access",
  "create table if not exists public.order_download_events",
  "access_token_hash",
  "enable row level security",
  "DO_URUCHOMIENIA"
]);

const doc = requireMarkers("docs/payments/ETAP36_POST_PAYMENT_FULFILLMENT.md", [
  "Etap 36",
  "fulfillment po płatności",
  "signed URLs",
  "tokenowany panel pobrań",
  "logi pobrań",
  "e-mail po płatności",
  "brak publicznego wycieku plików",
  "success page nie jest źródłem prawdy"
]);

requireMarkers("_project/runs/2026-05-17_1130_etap36_post_payment_fulfillment.md", [
  "Scan-first confirmation",
  "FAKTY Z KODU / PLIKÓW",
  "TESTY AUTOMATYCZNE",
  "WPŁYW NA OBSIDIANA",
  "GIT / ZIP STATUS"
]);

for (const forbidden of ["getPublicUrl", "publicUrl", "sendEmail(", "send_email(", "nodemailer", "resend.emails.send"]) {
  if (helper.includes(forbidden) || accessPage.includes(forbidden) || fileRoute.includes(forbidden)) {
    fail("Etap 36 must not expose public URLs or send real email without provider decision: " + forbidden);
  }
}

for (const forbiddenOnPublicPage of ["createSignedUrl", "SUPABASE_SERVICE_ROLE_KEY", "service_role"]) {
  if (accessPage.includes(forbiddenOnPublicPage)) {
    fail("public access page must not create storage links directly or expose service-role details: " + forbiddenOnPublicPage);
  }
}

const pkg = JSON.parse(requireFile("package.json"));
if (pkg.scripts?.["verify:stage36-post-payment-fulfillment"] !== "node scripts/check-stage36-post-payment-fulfillment.cjs") {
  fail("package.json missing verify:stage36-post-payment-fulfillment script");
}
if (!String(pkg.scripts?.verify || "").includes("verify:stage36-post-payment-fulfillment")) {
  fail("main verify script missing verify:stage36-post-payment-fulfillment");
}

console.log("OK: Etap 36 post-payment fulfillment guard passed.");
