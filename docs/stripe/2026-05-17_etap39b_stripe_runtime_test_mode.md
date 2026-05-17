# Etap 39B - Stripe runtime test-mode po 39A

Status: TEST RĘCZNY DO WYKONANIA.

## Cel

Potwierdzić na runtime, że fundament 39A real payments działa w test-mode i nie wydaje prywatnych plików bez opłaconego zamówienia.

Ten etap jest bramką przed 26D email outbox no-reply fake-provider.

## Zakres

Sprawdzamy:
- env Stripe test-mode,
- Stripe CLI i webhook lokalny,
- zapis w `order_payments`,
- zapis w `payment_events`,
- utworzenie `order_fulfillment_access` dopiero po paid,
- brak `order_download_events` bez paid,
- guard DB no fulfillment/download without paid.

Nie wdrażamy tu realnego email providera.

## Wymagane env lokalne

Nie commituj `.env.local`.

Sprawdź nazwy zmiennych użyte w Etapie 39A i w kodzie webhooka. Minimalnie potrzebujesz odpowiedników:

```env
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
```

Jeżeli repo używa innych nazw z 39A, użyj nazw z kodu jako źródła prawdy.

## Stripe CLI

W jednym terminalu uruchom aplikację lokalnie:

```powershell
cd "C:\Users\malim\Desktop\biznesy_ai\strony\strona z projektami"
npm run dev
```

W drugim terminalu zaloguj Stripe CLI i przekieruj webhook:

```powershell
stripe login
stripe listen --forward-to http://localhost:3000/api/stripe/webhook
```

Jeżeli endpoint webhooka w 39A jest inny niż `/api/stripe/webhook`, użyj endpointa z kodu.

Stripe CLI pokaże `whsec_...`. Wstaw tę wartość do lokalnego env jako `STRIPE_WEBHOOK_SECRET` albo nazwę używaną przez kod 39A.

## Testowy checkout

1. Otwórz lokalną aplikację.
2. Dodaj projekt do koszyka.
3. Przejdź checkout.
4. Użyj testowej karty Stripe `4242 4242 4242 4242`, dowolny przyszły termin i dowolny CVC.
5. Poczekaj na webhook w terminalu Stripe CLI.
6. Zapisz `order_id`, `payment_id` albo email testowy, jeśli UI go pokazuje.

## SQL diagnostyczny

W Supabase SQL Editor uruchom:

```sql
-- plik w repo
supabase/manual/2026-05-17_stage39b_stripe_runtime_diagnostics.sql
```

Kryterium PASS:
- `order_payments` ma rekord paid/succeeded dla testowego zamówienia,
- `payment_events` ma event webhooka,
- `order_fulfillment_access` istnieje dopiero dla paid,
- `order_download_events` nie ma rekordów dla unpaid,
- końcowy status SQL nie pokazuje `FAIL`.

## Guard DB

Po ustawieniu Supabase env uruchom:

```powershell
cd "C:\Users\malim\Desktop\biznesy_ai\strony\strona z projektami"
$env:STAGE39B_REQUIRE_DB="1"
node scripts/check-stage39b-stripe-no-fulfillment-without-paid.cjs
```

Albo helper:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "scripts/run-stage39b-stripe-runtime-local.ps1"
```

PASS oznacza: guard nie znalazł fulfillmentu ani downloadów bez opłaconej płatności.

## Co wkleić do kolejnego czatu, jeśli FAIL

Wklej tylko:
- ostatnie 40 linii terminala Stripe CLI,
- wynik guardu `check-stage39b...`,
- wynik końcowego SQL `stage39b_no_fulfillment_without_paid_status`,
- 3 najnowsze JSON rows z tabeli, która wygląda źle.

Nie wklejaj sekretów: `sk_`, `pk_`, `whsec_`, service role key.

## Decyzja po 39B

Jeżeli PASS:
- zamknąć 39B jako runtime PASS,
- przejść do 26D fake email outbox.

Jeżeli FAIL:
- nie robić email outbox,
- naprawić przyczynę webhook/paid/fulfillment,
- dopiero potem wrócić do 26D.
