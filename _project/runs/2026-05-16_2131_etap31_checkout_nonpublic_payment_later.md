# Run report - Etap 31 checkout non-public payment later

## Scan-first confirmation

- Repo: sklep-projekty-domow
- Branch: main
- Read files/folders: AGENTS.md, _project/01_PROJECT_GOAL.md, _project/03_CURRENT_STAGE.md, package.json, app/zamowienie/page.tsx, components/order/CheckoutForm.tsx, scripts/check-manual-payment-v48.cjs, scripts/check-payment-direction-v48.cjs.
- Active source of truth: repo for code/guards/_project; Obsidian for dashboard/status.
- Planned changed files: checkout page, checkout form, payment-direction guard, package scripts, _project memory, Obsidian notes.

## FAKTY Z KODU / PLIKÓW

- Poprzedni checkout mówił o tymczasowym flow i automatycznym providerze, ale nadal wyglądał jak normalny zakup.
- Etap 31 zmienia narrację na techniczny test zamówienia bez płatności.

## DECYZJE DAMIANA

- Aplikacja niepubliczna.
- Płatności później.
- Nie pisać klientowi o ręcznym przelewie jako docelowym flow.

## TESTY AUTOMATYCZNE

APPLY uruchamia:
- npm run verify:payment-direction-v48
- npm run typecheck
- npm run build
- npm run check:project-memory

## GUARDY

- scripts/check-manual-payment-v48.cjs pilnuje markerów Etapu 31 i blokuje copy o ręcznym przelewie/manual-payment.

## TESTY RĘCZNE

- TEST RĘCZNY DO WYKONANIA: otworzyć /zamowienie, sprawdzić copy, wysłać testowe zamówienie i potwierdzić brak narracji o ręcznym przelewie.

## WPŁYW NA OBSIDIANA

- APPLY aktualizuje dashboard i status projektu w 10_PROJEKTY/Sklep_projekty_domow/.

## GIT / ZIP STATUS

- Dostarczenie: ZIP + lokalne polecenie PowerShell.
- Push wykonuje Damian lokalnie po przejściu testów.