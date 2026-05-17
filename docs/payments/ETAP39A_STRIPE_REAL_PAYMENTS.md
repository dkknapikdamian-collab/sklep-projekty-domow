# Etap 39A - Stripe real payments foundation

## Status

Wdrożenie techniczne w paczce ZIP. Test runtime Stripe test-mode nadal do wykonania.

## Cel

Zamienić checkout z zapisu technicznego na fundament realnych płatności online, bez uruchamiania jeszcze produkcyjnej wysyłki e-mail.

## Kontrakt

- Provider: Stripe.
- Checkout tworzy Stripe Checkout Session po zapisaniu zamówienia.
- Webhook jest jedynym źródłem prawdy dla statusu `paid`.
- Success page nie wydaje plików.
- `order_payments` zapisuje sesję Stripe i status płatności.
- `payment_events` zapisuje eventy webhooka i idempotencję eventów.
- Po `paid` backend oznacza payment checklist jako potwierdzony i uruchamia fulfillment access z Etapu 26C.
- Realne e-maile no-reply zostają na Etap 26D; w 39A nie ma realnej wysyłki e-mail. Etap 26D startuje od fake mail / fake provider.

## Env

Wymagane do testu runtime:

```env
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PAYMENT_CURRENCY=pln
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Endpointy

- Checkout: server action `submitOrderAction`.
- Webhook: `POST /api/payments/stripe/webhook`.
- Return/success page: `/zamowienie/status?session_id=...`.

## Testy automatyczne

- `npm run verify:stripe-real-payments-v39a`
- `npm run verify:post-payment-project-files-v26c`
- `npm run verify:stage36-post-payment-fulfillment`
- `npm run verify:project-private-files-ux-v26b`
- `npm run verify:project-files-model-v26a`
- `npm run typecheck`
- `npm run build`

## Test ręczny do wykonania

1. Ustawić Stripe test keys i webhook secret.
2. Uruchomić aplikację lokalnie.
3. Złożyć zamówienie z koszyka.
4. Potwierdzić przekierowanie do Stripe Checkout.
5. Opłacić testową kartą.
6. Odebrać webhook `checkout.session.completed`.
7. Sprawdzić `order_payments.status = paid`.
8. Sprawdzić `payment_events`.
9. Sprawdzić, że fulfillment access jest generowany dopiero po `paid`.
10. Sprawdzić, że bez webhooka/samej success page pliki nie są wydawane.

## Następny etap

Etap 26D - email outbox no-reply: fake provider, dwa typy maili, idempotencja, retry, real provider po DNS/env.
