# Etap 40C V2 - Stripe Checkout actual source repair

Data: 2026-05-18
Project ID: sklep-projekty-domow
Status: DO WDROŻENIA

## Cel
Naprawić niepełne wdrożenie Etapu 40C: poprzedni patch nie zmienił aktywnego źródła `lib/payments/stripe-payments.ts`, bo patcher uruchomił skan od `C:\WINDOWS\System32` i zakończył się błędem EPERM.

## Fakty
- Błąd runtime Stripe: `Received unknown parameter: automatic_payment_methods`.
- Guard po poprzednim apply wskazał aktywny plik: `lib/payments/stripe-payments.ts`.
- Poprzedni push 40C wypchnął dokumentację/skrypty, ale nie zawierał zmiany w `lib/payments/stripe-payments.ts`.

## Zmiana
- Usunięcie `automatic_payment_methods` z `lib/payments/stripe-payments.ts`.
- Dodanie guardu V2: `scripts/check-stripe-checkout-params-v40c-v2.cjs`.
- Aktualizacja project memory i Obsidiana.

## Testy
- `node scripts/check-stripe-checkout-params-v40c-v2.cjs`
- `npm run verify:stripe-checkout-params-v40c` jeśli istnieje.

## Test ręczny
Po deployu Cloudflare ponowić checkout testowy kartą Stripe sandbox.

## Ryzyka
Jeżeli Stripe zwróci kolejny parametr błędny, naprawiać kolejny konkretny request error, nie przechodzić do email outbox.
