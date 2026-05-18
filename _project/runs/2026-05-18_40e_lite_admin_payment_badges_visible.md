# Etap 40E LITE - widoczny status płatności w adminie

Status: LOKALNIE DO COMMIT/PUSH

Zakres:
- lista zamówień pokazuje płatność potwierdzona / niepotwierdzona,
- lista zamówień pokazuje ID przelewu `ZAM-{SHORT_ID}`,
- szczegóły zamówienia pokazują status płatności, ID przelewu ręcznego i pełne UUID.

Źródło statusu:
- `order.fulfillmentChecklist.paymentConfirmed`,
- `order.status === "paid_manual"` jako ręczny fallback.

Decyzja:
- Stripe Checkout/BLIK/karta/P24 automatyzujemy przez webhook.
- Zwykły przelew bankowy poza Stripe zostaje fallbackiem ręcznym.
- Email outbox jest konieczny przed produkcją.
- Pełny panel order_payments / Stripe session / payment intent zostaje jako osobny etap po ustabilizowaniu 40E LITE.

Test:
- npm run typecheck
- ręczny test: /admin/zamowienia oraz /admin/zamowienia/[id]
