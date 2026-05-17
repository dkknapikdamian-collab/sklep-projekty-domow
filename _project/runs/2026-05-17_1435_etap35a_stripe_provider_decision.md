# 2026-05-17 14:35 - Etap 35A Stripe provider decision

## Scan-first confirmation

- Repo: `dkknapikdamian-collab/sklep-projekty-domow`
- Branch: `main`
- Tryb: ZIP + lokalny commit/push po stronie Damiana.
- Kontekst: Etap 35 payment architecture został wdrożony i wypchnięty; Damian potwierdził wybór Stripe.

## FAKTY Z PLIKÓW

- Etap 35 zaprojektował Stripe Checkout jako rekomendowany kierunek.
- Etap 35 przed decyzją miał status: do decyzji Damiana.
- Etap 34C potwierdził runtime flow sklepu bez płatności publicznej.

## DECYZJE DAMIANA

- Provider płatności dla V1.1: Stripe.

## HIPOTEZY / PROPOZYCJE AI

- Etap 35B powinien wdrażać Stripe test-mode foundation bez live payment.

## DO POTWIERDZENIA

- TTL signed URLs.
- Czy pliki po płatności mają iść automatycznie, czy przez manual review.
- Czy e-mail po płatności ma być automatyczny.
- Czy BLIK ma być aktywowany w Stripe Dashboard.

## TESTY AUTOMATYCZNE

- `npm run verify:stage35-stripe-provider-decision`

## TESTY RĘCZNE

- Brak testu runtime, bo nie ma implementacji płatności.

## BRAKI I RYZYKA

- Brak Stripe runtime.
- Brak webhooka.
- Brak live payment.
- Brak automatycznego fulfillmentu.

## NASTĘPNY KROK

Przygotować Etap 35B: Stripe test-mode foundation.
