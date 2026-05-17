# Etap 35 - projekt automatycznych płatności

Status: ZAPROJEKTOWANE / DO DECYZJI DAMIANA / BEZ LIVE PAYMENT.
Data: 2026-05-17 Europe/Warsaw.

## 1. Werdykt

Rekomenduję Stripe Checkout jako pierwszy provider V1.1.

Poziom przekonania: 8/10.

Argument za: najmniej własnego kodu płatniczego, hosted checkout, webhooki, BLIK i inne metody można aktywować w Stripe Dashboard.

Argument przeciw: Stripe może nie być najlepszy kosztowo lub UX-owo dla wszystkich polskich metod płatności; PayU/Przelewy24 mogą być rozważone, jeśli Stripe okaże się słaby dla konwersji w Polsce.

Co zmieni zdanie: brak akceptacji Stripe, wysokie opłaty, brak wymaganej metody płatności, problemy z BLIK/PLN, słaba obsługa polskiego klienta.

Najkrótszy test: Stripe test mode + BLIK/card checkout + webhook + fulfillment lock na jednym realnym zamówieniu.

## 2. Provider

### Rekomendacja główna

Stripe Checkout hosted page.

### Alternatywy

- PayU / Przelewy24: rozważyć, jeśli priorytetem jest stricte polski ekosystem i stawki.
- Stripe Elements / własny PaymentIntent UI: nie na start; większa złożoność i większe ryzyko UX/security.

## 3. Statusy

Nie mieszać statusu operacyjnego zamówienia ze statusem płatności.

### orders.status

- `new`
- `awaiting_payment`
- `paid`
- `in_fulfillment`
- `fulfilled`
- `cancelled`
- `payment_failed`

Legacy / kompatybilność:
- `contacted`
- `paid_manual`
- `sent`

### order_payments.status

- `not_started`
- `checkout_created`
- `requires_action`
- `processing`
- `paid`
- `failed`
- `expired`
- `refunded`
- `disputed`

### order_fulfillment.status

- `blocked_until_paid`
- `ready`
- `manual_review_required`
- `links_generated`
- `sent`
- `expired`

## 4. Payment Session / Payment Intent

Start: Checkout Session.

Zapisujemy:
- `stripe_checkout_session_id`
- `stripe_payment_intent_id`
- `provider = stripe`
- `amount_gross`
- `currency = pln`
- `payment_status`
- `metadata.orderId`
- `metadata.cartHash`

PaymentIntent jest źródłem technicznym pod spodem, ale klient nie dostaje własnego formularza PaymentIntent w V1.1.

## 5. Flow

1. Klient wybiera projekt i dodatki.
2. Checkout waliduje koszyk przeciw bazie.
3. Tworzy zamówienie z `orders.status = awaiting_payment`.
4. Tworzy `order_payments.status = checkout_created`.
5. Tworzy Stripe Checkout Session z idempotency key.
6. Redirect do Stripe.
7. Stripe redirectuje na success/cancel.
8. Webhook potwierdza płatność.
9. Po webhooku system oznacza płatność `paid`.
10. Fulfillment decyduje, czy pliki są gotowe automatycznie, czy wymagają manual review.

## 6. Webhook

Endpoint: `/api/stripe/webhook`.

Eventy:
- `checkout.session.completed`
- `checkout.session.async_payment_succeeded`
- `checkout.session.async_payment_failed`
- `checkout.session.expired`
- `payment_intent.payment_failed`
- później: `charge.refunded`, `charge.dispute.created`

Webhook musi:
- weryfikować raw body i `Stripe-Signature`,
- sprawdzać `orderId`, kwotę, walutę i session id,
- deduplikować eventy po `stripe_event_id`,
- działać idempotentnie,
- nie wydawać plików przy statusach `failed`, `expired`, `unpaid`, `processing`.

## 7. Success / failure

### Success page

URL: `/zamowienie/sukces?session_id={CHECKOUT_SESSION_ID}`.

Nie jest źródłem prawdy. Ma tylko:
- pokazać status po serwerowym sprawdzeniu session/order,
- powiedzieć, czy płatność jest opłacona, processing, czy oczekuje,
- pokazać linki dopiero gdy fulfillment jest gotowy.

### Cancel/failure page

URL: `/zamowienie/anulowano?order_id=...`

Pokazuje:
- brak płatności,
- możliwość ponowienia płatności,
- informację, że zamówienie nie jest realizowane bez opłacenia.

## 8. Idempotencja

### Tworzenie session

Idempotency key:
`order:${orderId}:checkout:v1`

Nie tworzyć wielu aktywnych Checkout Sessions dla jednego zamówienia bez jawnego `retry`.

### Webhook

Tabela `payment_events`:
- `stripe_event_id unique`
- `event_type`
- `order_id`
- `payment_id`
- `payload jsonb`
- `processed_at`
- `processing_result`

Jeśli event już był, odpowiedzieć 200 i nic nie robić.

### Fulfillment

`fulfillment_lock_key = order_id + payment_id`.

Jeśli linki już wygenerowane lub wysłane, nie generować drugi raz automatycznie.

## 9. Security

- Sekrety tylko w env server.
- Nie commitować `.env.local`.
- Nie trzymać kart ani danych płatniczych w Supabase.
- Nie ufać localStorage.
- Nie ufać success page.
- Nie ufać kwocie z klienta.
- Webhook ma sprawdzać signature, amount, currency, orderId, session id, payment status.
- Pliki prywatne tylko private bucket.
- Linki czasowe, nie publiczne URL.

## 10. Pliki po płatności

Rekomendacja V1.1: hybryda bezpieczna.

### Auto tylko gdy projekt kompletny

Jeśli projekt ma komplet prywatnych plików i flagę `auto_fulfillment_ready`, po `paid`:
- wygeneruj signed URLs,
- zapisz w `order_fulfillment_access`,
- pokaż na success page,
- pokaż w adminie.

### Manual review gdy są braki

Jeśli brakuje pliku, jest dziwny addon albo projekt nie jest oznaczony jako gotowy:
- status `manual_review_required`,
- admin dostaje zadanie w zamówieniu,
- klient widzi komunikat: płatność przyjęta, realizacja w przygotowaniu.

### PDF e-mail +250 zł

Nie wysyłać automatycznie w 35B, jeśli nie ma pewnego pakietu. Najpierw tylko status i checklistę.

## 11. Minimalny model danych 35B

### order_payments

- `id uuid`
- `order_id uuid`
- `provider text`
- `status text`
- `amount_gross numeric`
- `currency text`
- `stripe_checkout_session_id text unique`
- `stripe_payment_intent_id text`
- `idempotency_key text unique`
- `metadata jsonb`
- `created_at`, `updated_at`, `paid_at`, `failed_at`

### payment_events

- `id uuid`
- `provider text`
- `stripe_event_id text unique`
- `event_type text`
- `order_id uuid`
- `payment_id uuid`
- `payload jsonb`
- `processed_at timestamptz`
- `processing_result text`

### order_fulfillment_access

- `id uuid`
- `order_id uuid`
- `payment_id uuid`
- `status text`
- `access_token_hash text`
- `expires_at timestamptz`
- `generated_at timestamptz`
- `sent_at timestamptz`
- `metadata jsonb`

## 12. Test plan 35B

- create checkout session happy path,
- price mismatch blocks session,
- inactive project blocks session,
- webhook signature invalid returns 400,
- duplicate webhook returns 200 and no double fulfillment,
- wrong amount/currency blocks fulfillment,
- `completed` marks payment paid,
- async success marks payment paid,
- async failed marks payment failed,
- expired marks expired,
- files not visible before paid,
- signed URLs only after paid.

## 13. Warunki startu 35B

Damian musi potwierdzić:

1. Stripe jako provider V1.1.
2. BLIK/card jako wymagane metody startowe.
3. TTL linków.
4. Auto fulfillment czy manual review jako default.
5. Brak faktur w 35B.
6. Brak automatycznego e-maila w 35B albo zgoda na osobny etap e-maili.
