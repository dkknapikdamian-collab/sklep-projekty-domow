# 2026-05-18 - Etap 41A / 26D email outbox fake-provider

## Status

ZIP/APPLY / TEST AUTOMATYCZNY GUARD / TEST RĘCZNY DO WYKONANIA.

## Zakres

- Dodano model kodowy `lib/email/email-outbox.ts`.
- Dodano SQL `supabase/manual/2026-05-18_etap41a_email_outbox_fake_provider.sql`.
- Stripe webhook po `paid` kolejkuje email outbox.
- Typy maili:
  - `payment_confirmation`,
  - `project_files_access`.
- Statusy:
  - `queued`,
  - `sent`,
  - `failed`,
  - `retry_pending`,
  - `skipped`.
- Idempotencja: `order_id + payment_id + email_type`.
- Provider: `fake_noop`, bez realnej wysyłki.

## Testy automatyczne

- `npm run verify:email-outbox-v41a`
- `npm run verify:stripe-checkout-params-v40c`
- `npm run verify:stripe-checkout-params-v40c-v2`
- `npm run typecheck`

## Test ręczny

TEST RĘCZNY DO WYKONANIA:
- Uruchomić SQL w Supabase.
- Wykonać Stripe sandbox checkout.
- Sprawdzić `email_outbox` po webhooku.

## Ryzyko

Jeżeli SQL nie zostanie uruchomiony, webhook nie powinien psuć płatności/fulfillmentu, ale outbox nie zapisze wiadomości i zaloguje błąd w runtime.

## Następny krok

Po potwierdzeniu fake outbox runtime: realny provider e-mail no-reply.
