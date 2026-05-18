# Etap 40D - package.json BOM fix for Cloudflare/OpenNext build

Data: 2026-05-18
Project ID: sklep-projekty-domow
Status: DO WDROŻENIA / BUILD BLOCKER FIX

## Problem

Po naprawie 40C runtime source nie zawiera już `automatic_payment_methods`, ale Cloudflare/publiczny URL nadal zwracał stary błąd Stripe.
Audyt lokalny potwierdził, że aktywne źródło repo jest czyste, natomiast lokalny `npm run cf:build` padł na parsowaniu `package.json`:

- `SyntaxError: Unexpected token FEFF ... is not valid JSON`
- błąd dotyczył BOM / znaku FEFF na początku `package.json`.

## Wniosek

Cloudflare najpewniej nie mógł zbudować najnowszego commita po naprawie 40C i publiczny Worker nadal działał na starszym deploymentcie.

## Zmiana

- Usunąć UTF-8 BOM z `package.json`.
- Dodać guard `scripts/check-package-json-no-bom-v40d.cjs`.
- Dodać skrypt `verify:package-json-no-bom-v40d`.
- Uruchomić:
  - `npm run verify:package-json-no-bom-v40d`
  - `npm run verify:stripe-checkout-params-v40c`
  - `npm run verify:stripe-checkout-params-v40c-v2`
  - `npm run typecheck`
  - `npm run cf:build`

## Test ręczny

Po deployu Cloudflare ponowić checkout Stripe sandbox na worker URL.
Oczekiwane: błąd `automatic_payment_methods` znika.

## Ryzyka

- Jeżeli Cloudflare dalej pokazuje stary błąd, trzeba sprawdzić konkretny deployment ID i commit w panelu Cloudflare.
- Jeżeli pojawi się nowy błąd Stripe, robić kolejny mały etap na podstawie request logu.
