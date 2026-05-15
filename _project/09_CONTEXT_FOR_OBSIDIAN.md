# 09_CONTEXT_FOR_OBSIDIAN - indeks projektu

## Projekt

`sklep-projekty-domow`

## Typ

Aplikacja webowa / sklep-katalog projektów domów.

## Krótki opis

Repo dla sklepu z projektami domów. Publiczna część obejmuje stronę główną, katalog, kartę projektu, koszyk i checkout. Dane projektów mają pochodzić z realnego źródła danych oraz panelu admina, bez aktywnych fikcyjnych ofert.

## Aktualny etap

Etap 8: Pliki prywatne i dostawa ręczna.

## Ostatnia ważna zmiana

2026-05-15 10:05 Europe/Warsaw: panel zamówień dostał operacyjną warstwę ręcznej realizacji. Admin widzi prywatne pliki przypięte do projektów w zamówieniu, informację czy klient zamówił PDF na e-mail, instrukcję co wysłać oraz checklistę realizacji.

Najważniejsze ustalenia:

- pliki prywatne są źródłem ręcznej realizacji, nie publicznym linkiem dla klienta,
- panel nie generuje signed URL i nie wysyła maili,
- PDF na e-mail jest dodatkiem realizowanym po potwierdzeniu płatności i realizacji,
- zamówienia V1 są obsługiwane ręcznie statusami `new`, `contacted`, `paid_manual`, `sent`, `cancelled`,
- nie ma jeszcze Stripe/PayU, automatycznych maili, faktur ani automatycznej wysyłki plików,
- czat nie jest źródłem prawdy; źródłem prawdy pozostają pliki projektu.

## Najważniejsze pliki

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

## Pliki techniczne ważne dla Etapu 8

- `../app/admin/zamowienia/page.tsx`
- `../lib/admin/orders-admin.ts`
- `../lib/admin/order-files.ts`
- `../lib/admin/projects-admin.ts`
- `../components/admin/AdminProjectMediaManager.tsx`
- `../scripts/check-admin-orders-v42.cjs`
- `../scripts/check-admin-project-media-v34.cjs`

## Standard pracy agentów

Od 2026-05-15 repo używa globalnego workflow Damiana:

- każdy sensowny etap aktualizuje changelog, run report i kontekst dla Obsidiana,
- zmiana etapu aktualizuje `03_CURRENT_STAGE` i `07_NEXT_STEPS`,
- zmiana testów albo guardów aktualizuje `05_MANUAL_TESTS` i `06_GUARDS_AND_TESTS`,
- zmiana kierunku projektu wymaga decyzji, timeline i notatki w `_project/history/`,
- `npm run check:project-memory` pilnuje obecności timeline i historii.

## Następny praktyczny krok

Uruchomić runtime test: zamówienie z dodatkiem PDF na e-mail i projektem z prywatnymi plikami -> `/admin/zamowienia` -> sprawdzenie prywatnych plików, instrukcji wysyłki i checklisty.

## Uwaga

Obsidian jest tylko indeksem/dashboardem. Źródłem prawdy pozostaje repo.
