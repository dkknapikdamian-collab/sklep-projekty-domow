# Etap 41A / 26D - email outbox fake-provider

## Status

ZIP/APPLY, bez realnego providera e-mail.

## Cel

Po potwierdzonym `paid` przez Stripe webhook system ma zapisać do `email_outbox` dwa typy wiadomości:

- `payment_confirmation`,
- `project_files_access`.

## Zasady

- Brak `paid` = brak maila i brak outbox row.
- Źródłem prawdy jest webhook Stripe, nie success page.
- Idempotencja: `order_id + payment_id + email_type`.
- Provider w tym etapie: `fake_noop`.
- Nie ma realnego SMTP/Resend/Postmark/SendGrid.
- `project_files_access` jest `queued` tylko wtedy, gdy fulfillment access jest gotowy.
- Gdy fulfillment wymaga sprawdzenia, `project_files_access` dostaje status `skipped`.

## SQL

Uruchomić ręcznie w Supabase SQL editor:

`supabase/manual/2026-05-18_etap41a_email_outbox_fake_provider.sql`

## Test

Po SQL i deployu:

1. Stripe test checkout.
2. Webhook `checkout.session.completed` lub `checkout.session.async_payment_succeeded`.
3. DB check:
   - `order_payments.status = paid`,
   - `order_fulfillment_access` istnieje,
   - `email_outbox` ma `payment_confirmation`,
   - `email_outbox` ma `project_files_access` jako `queued` albo `skipped`.

## Następny etap

Realny provider e-mail dopiero po potwierdzeniu fake outbox runtime.
