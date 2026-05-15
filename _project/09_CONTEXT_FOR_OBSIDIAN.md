# 09_CONTEXT_FOR_OBSIDIAN - indeks projektu

## Projekt

`sklep-projekty-domow`

## Aktualny etap

Etap 17: Płatność manualna / instrukcja przelewu.

## Ostatnia ważna zmiana

2026-05-15 21:15 Europe/Warsaw: checkout komunikuje płatność po kontakcie, a admin może ustawić instrukcję przelewu na stronie zamówienia. Instrukcja trafia do roboczego e-maila potwierdzenia zamówienia.

## Najważniejsze ustalenia

- V1 działa na płatności manualnej,
- nie ma Stripe/PayU,
- status `paid_manual` oznacza ręcznie potwierdzoną płatność,
- dane do płatności są częścią roboczego e-maila,
- system nadal niczego sam nie wysyła.

## Pliki techniczne ważne dla Etapu 17

- `../components/order/CheckoutForm.tsx`
- `../app/zamowienie/page.tsx`
- `../app/admin/zamowienia/[id]/page.tsx`
- `../lib/admin/order-email-drafts.ts`
- `../supabase/migrations/0018_order_manual_payment_instruction.sql`
- `../scripts/check-manual-payment-v48.cjs`

## Uwaga

Obsidian jest tylko indeksem/dashboardem. Źródłem prawdy pozostaje repo.
