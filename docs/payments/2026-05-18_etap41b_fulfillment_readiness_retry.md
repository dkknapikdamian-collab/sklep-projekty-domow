# Etap 41B - fulfillment readiness, retry i admin visibility

Status: DO WDROŻENIA / TEST RĘCZNY DO WYKONANIA
Data: 2026-05-18
Project ID: sklep_projekty_domow

## Cel

Po potwierdzonym Etapie 41A admin musi widzieć, dlaczego `project_files_access` może być `skipped` oraz mieć możliwość ponowienia przygotowania dostępu po uzupełnieniu plików.

## Zakres

- nowy helper `lib/admin/order-fulfillment-readiness.ts`,
- panel gotowości w `/admin/zamowienia/[id]`,
- lista brakujących typów plików,
- runtime status: `order_payments`, `order_fulfillment_access`, `email_outbox`,
- akcja server action `retryOrderPostPaymentFulfillmentAction`,
- audit log `order_post_payment_fulfillment_retry`,
- daty admina w `Europe/Warsaw`, baza zostaje w UTC.

## Guard

- `npm run verify:fulfillment-readiness-v41b`
- `npm run verify:email-outbox-v41a`
- `npm run typecheck`

## Test ręczny

1. Wejść w `/admin/zamowienia/[id]` dla zamówienia paid.
2. Sprawdzić panel `Gotowość plików i retry dostępu`.
3. Dla zamówienia z brakami zobaczyć `Manual review required` i brakujące typy.
4. Po uzupełnieniu plików kliknąć `Ponów przygotowanie dostępu i e-maila`.
5. Sprawdzić w Supabase, że `email_outbox.project_files_access` ma status `queued`.

## Ryzyko

Retry nadal używa fake-provider. Nie wysyła prawdziwego maila. Realny provider e-mail zostaje kolejnym etapem po potwierdzeniu widoczności i retry.
