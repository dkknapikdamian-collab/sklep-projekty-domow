# 03_CURRENT_STAGE - aktualny etap

Ostatnia aktualizacja: 2026-05-15 21:15 Europe/Warsaw

## Aktualny etap

Etap 17: Płatność manualna / instrukcja przelewu

## Status etapu

Przygotowany w paczce wdrożeniowej. Do potwierdzenia lokalnie przez guardy, typecheck, build i test ręczny.

## Cel etapu

Dodać profesjonalną, ale prostą obsługę płatności manualnej bez Stripe/PayU. Klient wie, że płatność następuje po kontakcie, a admin może przygotować instrukcję przelewu i wkleić ją do roboczego e-maila.

## Co zostało zrobione

- Checkout jasno komunikuje: płatność po kontakcie, brak automatycznej płatności online.
- Dodano migrację `0018_order_manual_payment_instruction.sql`.
- Do `order_fulfillment_checklist` dodano kolumnę `payment_instruction`.
- Na `/admin/zamowienia/[id]` admin może wpisać/zapisać instrukcję przelewu.
- Instrukcja przelewu jest wykorzystywana w roboczym e-mailu `E-mail: potwierdzenie zamówienia`.
- Status `paid_manual` pozostaje operacyjnym statusem ręcznie potwierdzonej płatności.
- Dodano guard `verify:manual-payment-v48`.

## Czego nie zmieniano

- Nie dodano Stripe.
- Nie dodano PayU.
- Nie dodano automatycznego księgowania.
- Nie dodano SMTP/Resend/Mailgun.
- Nie zmieniano automatycznej wysyłki plików.
- Nie zmieniano storage linków.

## Checki wymagane

```powershell
npm run verify:manual-payment-v48
npm run verify:cart-order-v38
npm run verify:admin-orders-v42
npm run typecheck
npm run build
npm run check:project-memory
```

## Ważne przed testem runtime

Trzeba zastosować migrację w Supabase:

```text
supabase/migrations/0018_order_manual_payment_instruction.sql
```

## Kryterium zakończenia

Możesz przyjąć zamówienie i poprowadzić klienta do płatności ręcznie, bez chaosu.
