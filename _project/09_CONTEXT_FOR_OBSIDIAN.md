# 09_CONTEXT_FOR_OBSIDIAN - indeks projektu

## Projekt

`sklep-projekty-domow`

## Typ

Aplikacja webowa / sklep-katalog projektow domow.

## Krotki opis

Repo dla sklepu z projektami domow. Publiczna czesc obejmuje strone glowna, katalog, karte projektu, koszyk i checkout. Dane projektow maja pochodzic z realnego zrodla danych oraz panelu admina, bez aktywnych fikcyjnych ofert.

## Aktualny etap

Etap 6: Zamowienie V1 - realny zapis i podstawowy panel zamowien w adminie.

## Ostatnia wazna zmiana

2026-05-15 09:28 Europe/Warsaw: zaktualizowano `AGENTS.md` do globalnego workflow Damiana, dodano timeline projektu i folder historii.

Najwazniejsze ustalenia:

- zamowienia V1 sa obslugiwane recznie statusami `new`, `contacted`, `paid_manual`, `sent`, `cancelled`,
- nie ma jeszcze platnosci online, maili, faktur ani automatycznej wysylki plikow,
- czat nie jest zrodlem prawdy; zrodlem prawdy pozostaja pliki projektu,
- przy zmianie kierunku projektu trzeba aktualizowac decyzje, timeline i `_project/history/`.

## Najwazniejsze pliki

- `../AGENTS.md`
- `00_PROJECT_STATUS.md`
- `01_PROJECT_GOAL.md`
- `02_WORK_RULES.md`
- `03_CURRENT_STAGE.md`
- `04_DECISIONS.md`
- `05_MANUAL_TESTS.md`
- `06_GUARDS_AND_TESTS.md`
- `07_NEXT_STEPS.md`
- `08_CHANGELOG_AI.md`
- `09_CONTEXT_FOR_OBSIDIAN.md`
- `10_PROJECT_TIMELINE.md`
- `runs/`
- `history/`

## Pliki techniczne wazne dla Etapu 6

- `../app/admin/zamowienia/page.tsx`
- `../app/admin/zamowienia/actions.ts`
- `../lib/admin/orders-admin.ts`
- `../lib/order/create-order.ts`
- `../supabase/migrations/0014_orders_v1.sql`
- `../supabase/migrations/0015_orders_v42_statuses.sql`
- `../scripts/check-admin-orders-v42.cjs`
- `../scripts/check-order-schema-v38.cjs`

## Standard pracy agentow

Od 2026-05-15 repo uzywa globalnego workflow Damiana:

- kazdy sensowny etap aktualizuje changelog, run report i kontekst dla Obsidiana,
- zmiana etapu aktualizuje `03_CURRENT_STAGE` i `07_NEXT_STEPS`,
- zmiana testow albo guardow aktualizuje `05_MANUAL_TESTS` i `06_GUARDS_AND_TESTS`,
- zmiana kierunku projektu wymaga decyzji, timeline i notatki w `_project/history/`,
- `npm run check:project-memory` pilnuje obecnosci timeline i historii.

## Nastepny praktyczny krok

Zastosowac migracje `0015_orders_v42_statuses.sql`, wyslac testowe zamowienie i potwierdzic w `/admin/zamowienia`, ze widac rekord, pozycje oraz zapis zmiany statusu.

## Uwaga

Obsidian jest tylko indeksem/dashboardem. Zrodlem prawdy pozostaje repo.
