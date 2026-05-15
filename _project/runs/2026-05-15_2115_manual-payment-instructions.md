# Run report - 2026-05-15 21:15 - manual-payment-instructions

## Etap

Etap 17: Płatność manualna / instrukcja przelewu.

## Cel

Można przyjąć zamówienie i poprowadzić klienta do płatności ręcznie, bez Stripe/PayU.

## Zmiany

- Checkout jasno komunikuje płatność po kontakcie.
- Dodano `payment_instruction` do checklisty realizacji.
- Admin może zapisać instrukcję przelewu na stronie zamówienia.
- Roboczy e-mail potwierdzenia zawiera dane do płatności.
- Dodano guard `verify:manual-payment-v48`.

## Checki do uruchomienia

```powershell
npm run verify:manual-payment-v48
npm run verify:cart-order-v38
npm run verify:admin-orders-v42
npm run typecheck
npm run build
npm run check:project-memory
```

## Ryzyka

- Runtime wymaga migracji `0018_order_manual_payment_instruction.sql`.
- Instrukcję przelewu trzeba sprawdzić ręcznie przed wysłaniem e-maila.
