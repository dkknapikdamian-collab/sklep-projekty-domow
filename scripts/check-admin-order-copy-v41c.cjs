const fs = require("fs");

const file = "app/admin/zamowienia/[id]/page.tsx";
let text = fs.readFileSync(file, "utf8");
if (text.charCodeAt(0) === 0xfeff) text = text.slice(1);

const required = [
  'data-admin-order-post-payment-readiness-v41b',
  'data-admin-order-fulfillment-retry-form-v41b',
  'data-admin-fulfillment-missing-files-v41b',
  'data-admin-email-outbox-latest-v41b',
  'timeZone: "Europe/Warsaw"',
  'Dostęp po płatności',
  'Pliki klienta',
  'Ponów automatyczne wydanie',
  'Szablony wiadomości dla klienta.'
];

const banned = [
  'Ta strona nie generuje linków czasowych',
  'Panel dla admina. Nie generuje publicznych linków',
  'Ten panel pokazuje, czy webhook',
  'Retry działa tylko po statusie paid',
  'Pobierz ręcznie w Supabase Storage',
  'System niczego nie wysyła',
  'auto_send_after_payment',
  'Manual review required',
  'Płatność paid',
  'Runtime po płatności',
  'fake-provider',
  'fake_noop',
  'Provider:'
];

let failed = false;
for (const marker of required) {
  if (!text.includes(marker)) {
    console.error('[Stage41C] FAIL missing marker:', marker);
    failed = true;
  } else {
    console.log('[Stage41C] OK marker:', marker);
  }
}
for (const marker of banned) {
  if (text.includes(marker)) {
    console.error('[Stage41C] FAIL banned copy still present:', marker);
    failed = true;
  }
}
if (failed) process.exit(1);
console.log('[Stage41C] PASS: admin order copy simplified.');
