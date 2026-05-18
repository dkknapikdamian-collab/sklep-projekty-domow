# Etap 40C - Stripe Checkout params fix

Data: 2026-05-18
Project ID: sklep-projekty-domow
Status: FIX PO RUNTIME STRIPE CHECKOUT

## Problem

Cloudflare checkout zapisał zamówienie, ale nie uruchomił płatności Stripe.
Stripe zwrócił błąd:

```text
STRIPE_CHECKOUT_CREATE_FAILED: Received unknown parameter: automatic_payment_methods
```

## Diagnoza

`automatic_payment_methods` jest parametrem PaymentIntents, nie poprawnym top-level parametrem dla `checkout.sessions.create` w Stripe Checkout Session.
Dla Checkout Session trzeba albo pominąć `payment_method_types` i zarządzać metodami w Stripe Dashboard, albo jawnie podać `payment_method_types`, np. `['card']`.

## Zmiana 40C

- Usunięto `automatic_payment_methods` z kodu źródłowego tworzenia Stripe Checkout Session.
- Dodano guard `verify:stripe-checkout-params-v40c`, który blokuje powrót tego parametru do źródeł aplikacji.
- Nie zmieniono webhooka ani fulfillmentu.
- Nie przełączono live payments.

## Test automatyczny

```powershell
npm run verify:stripe-checkout-params-v40c
```

## Test ręczny do wykonania

1. Wypchnąć fix i poczekać na deploy Cloudflare.
2. Wejść na:
   `https://sklep-projekty-domow.dudekhomeprojekty.workers.dev/zamowienie`
3. Wykonać testowy checkout Stripe kartą testową.
4. W Stripe Dashboard sprawdzić webhook `checkout.session.completed`.
5. Uruchomić DB guard 39B:
   `scripts/run-stage39b-stripe-runtime-local.ps1`
6. Oczekiwane:
   - `order_payments > 0`,
   - `payment_events > 0`,
   - `order_fulfillment_access > 0`,
   - brak fulfillmentu bez paid.

## Ryzyka

- Jeżeli po usunięciu parametru pojawi się kolejny błąd Stripe, trzeba zrobić kolejny mały runtime fix na podstawie request logu Stripe.
- Jeżeli webhook nie zapisze płatności po udanym checkout, nie przechodzić do email outbox.
