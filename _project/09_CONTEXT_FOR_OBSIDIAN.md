# 09_CONTEXT_FOR_OBSIDIAN - indeks projektu

## Projekt

`sklep-projekty-domow`

## Typ

Aplikacja webowa / sklep-katalog projektow domow.

## Krotki opis

Repo dla sklepu z projektami domow. Publiczna czesc obejmuje strone glowna, katalog, karte projektu, koszyk i checkout. Dane projektow maja pochodzic z realnego zrodla danych oraz panelu admina, bez aktywnych fikcyjnych ofert.

## Aktualny etap

Etap 7: Checkout - komunikacja półprodukcyjna V1.

## Ostatnia wazna zmiana

2026-05-15 09:42 Europe/Warsaw: checkout dostał komunikację półprodukcyjną V1. Publiczny formularz nie mówi już o zamówieniu testowym, tylko o `Zamówieniu projektu`, ręcznym potwierdzeniu dostępności, płatności i sposobu realizacji oraz o tym, że PDF na e-mail jest dodatkowym pakietem PDF realizowanym po potwierdzeniu.

Najwazniejsze ustalenia:

- checkout V1 przyjmuje zamowienia recznie i uczciwie komunikuje brak automatycznej platnosci,
- zamowienia V1 sa obslugiwane recznie statusami `new`, `contacted`, `paid_manual`, `sent`, `cancelled`,
- nie ma jeszcze platnosci online, maili, faktur ani automatycznej wysylki plikow,
- `PDF na e-mail` nie jest natychmiastowa dostawa automatyczna; to dodatek realizowany po potwierdzeniu,
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

## Pliki techniczne wazne dla Etapu 7

- `../app/zamowienie/page.tsx`
- `../components/order/CheckoutForm.tsx`
- `../app/zamowienie/actions.ts`
- `../scripts/check-cart-order-v38.cjs`

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

Uruchomic checki Etapu 7, potem manualnie przejsc `/koszyk` -> `/zamowienie` -> sukces zamowienia i potwierdzic, ze komunikacja checkoutu jest sprzedażowa, uczciwa i nie obiecuje automatyzacji.

## Uwaga

Obsidian jest tylko indeksem/dashboardem. Zrodlem prawdy pozostaje repo.
