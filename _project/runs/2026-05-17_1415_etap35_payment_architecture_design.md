# 2026-05-17 14:15 - Etap 35 payment architecture design

## Scan-first confirmation

- Repo: `dkknapikdamian-collab/sklep-projekty-domow`
- Branch: `main`
- Tryb: ZIP + lokalny commit/push po stronie Damiana.
- Przeczytane repo: `AGENTS.md`, `_project/01_PROJECT_GOAL.md`, `_project/03_CURRENT_STAGE.md`, `package.json`, `supabase/migrations/0014_orders_v1.sql`, guard order schema.
- Przeczytane Obsidian: `10_PROJEKTY/Sklep_projekty_domow/00_START - Sklep projekty domow.md`.
- Aktywny source file: `SKLEP_PROJEKTY_DOMOW__AKTYWNA_MAPA_I_PROCES_OBSIDIAN_FINAL_V1.md`.

## FAKTY Z KODU / PLIKÓW

- Etap 34C potwierdził ręcznie pełny flow sklepu bez płatności publicznej.
- Obecna tabela `orders` ma statusy manualne: `new`, `contacted`, `paid_manual`, `sent`, `cancelled`.
- Obecny checkout nie uruchamia płatności.
- Obecna walidacja ceny przed zapisem zamówienia działa jako fundament bezpieczeństwa przed płatnością.

## DECYZJE DAMIANA

- Zaprojektować Etap 35 automatycznych płatności.
- Nie wdrażać live payment bez osobnej decyzji.

## HIPOTEZY / PROPOZYCJE AI

- Rekomendowany provider V1.1: Stripe Checkout.
- Rekomendowany model: osobne statusy zamówienia, płatności i fulfillmentu.
- Rekomendowane wydawanie plików: dopiero po webhook-confirmed `paid`, przez signed URLs albo manual review.

## DO POTWIERDZENIA

- Finalny provider.
- Czy aktywować BLIK w Stripe Dashboard.
- TTL linków do plików.
- Czy wysyłka e-mail ma być automatyczna.
- Czy faktury pozostają poza zakresem.

## TESTY AUTOMATYCZNE

- `npm run verify:stage35-payment-architecture`

## GUARDY

- Dodano `scripts/check-stage35-payment-architecture.cjs`.

## TESTY RĘCZNE

- BRAK POTWIERDZONEGO TESTU RĘCZNEGO, bo etap jest projektowy i nie zmienia runtime płatności.

## POTWIERDZENIA DAMIANA

- Etap 34C full flow potwierdzony wcześniej.

## BRAKI I RYZYKA

- Brak live payment.
- Brak runtime webhooka.
- Brak automatycznego fulfillmentu.
- To celowy zakres projektu, nie regresja.

## WPŁYW NA OBSIDIANA

- Obsidian dostaje notatkę Etapu 35 i aktualizację dashboard/status.

## WPŁYW NA KIERUNEK ROZWOJU

- Etap 35 przełącza projekt z technicznego checkoutu bez płatności na zaprojektowany model płatności online.
- Implementacja dopiero w Etapie 35B po decyzji Damiana.

## NASTĘPNY KROK

Damian potwierdza provider i model wydawania plików. Potem wdrożyć 35B: Stripe test-mode foundation.

## GIT / ZIP STATUS

- Paczka ZIP zawiera dokumentację repo, guard, `_project` i Obsidian.
- Kod runtime aplikacji nie jest zmieniany.


