# Etap 41C V3 - admin order copy simplify

Status: WDROŻONE W KODZIE / TEST RĘCZNY DO WYKONANIA
Data: 2026-05-18
Project ID: sklep_projekty_domow

## Scan-first confirmation

- Repo: C:\Users\malim\Desktop\biznesy_ai\strony\strona z projektami
- Branch: main
- Read files/folders: AGENTS.md, _project/01_PROJECT_GOAL.md, _project/15_ACTIVE_SOURCE_MAP.md, _project/16_PRODUCTION_ROADMAP_AND_ACCEPTANCE.md, package.json, scripts/, app/admin/zamowienia/[id]/page.tsx, scripts/check-fulfillment-readiness-v41b.cjs.
- Obsidian notes read/targeted: 10_PROJEKTY/Sklep_projekty_domow/00_START - Sklep projekty domow.md, 11_ROADMAPA PRODUKCYJNA I ODHACZANIE - Sklep projekty domow.md, Etap 41A, Etap 41B.
- Active source of truth: repo dla kodu/guardów, Obsidian dla statusu wysokiego poziomu.

## FAKTY Z KODU / PLIKÓW

- Aktywny UI szczegółów zamówienia jest w app/admin/zamowienia/[id]/page.tsx.
- Etap 41B dodał readiness/retry/outbox, ale copy było techniczne i przytłaczające.
- Etap 41C V3 zmienia copy i układ informacji bez zmiany logiki płatności, retry, webhooka ani fulfillmentu.

## DECYZJE DAMIANA

- Usunąć teksty testowe i obronne z panelu admina.
- Zostawić tylko to, co realnie ma sens w produkcyjnej aplikacji.
- Panel ma być intuicyjny i zrozumiały w 5 sekund.

## Zmienione pliki

- app/admin/zamowienia/[id]/page.tsx
- package.json
- scripts/check-admin-order-copy-v41c.cjs
- docs/payments/2026-05-18_etap41c_v3_admin_copy_simplify.md
- _project/runs/2026-05-18_41c_v3_admin_copy_simplify.md
- _project/06_GUARDS_AND_TESTS.md
- _project/07_NEXT_STEPS.md
- _project/08_CHANGELOG_AI.md
- _project/10_PROJECT_TIMELINE.md
- _project/12_IMPLEMENTATION_LEDGER.md
- _project/14_TEST_HISTORY.md
- _project/16_PRODUCTION_ROADMAP_AND_ACCEPTANCE.md

## TESTY AUTOMATYCZNE

- npm run verify:admin-order-copy-v41c
- npm run verify:fulfillment-readiness-v41b
- npm run typecheck

## TEST RĘCZNY

TEST RĘCZNY DO WYKONANIA: /admin/zamowienia/[id], ocena czy najważniejsze informacje są zrozumiałe w 5 sekund.

## BRAKI I RYZYKA

- Zmiana nie uruchamia realnego providera e-mail.
- Zmiana nie zmienia mechaniki Stripe/webhook/fulfillment.
- Jeśli admin nadal będzie przytłoczony, następny etap powinien scalić sekcje w jeden kompaktowy order control panel.

## WPŁYW NA OBSIDIANA

- Paczka kopiuje notatkę Etapu 41C V3 do Obsidiana.
- Paczka dopisuje bloki do dashboardu i roadmapy, jeśli vault istnieje lokalnie.

## NASTĘPNY KROK

Po potwierdzeniu wizualnym: Etap 41D, czyli realny provider e-mail albo dalsza konsolidacja panelu zamówienia, zależnie od ręcznego testu Damiana.
