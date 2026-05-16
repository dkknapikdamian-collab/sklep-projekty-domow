# Run report - Etap 31 checkout non-public payment later

## Scan-first confirmation

- Repo: sklep-projekty-domow
- Branch: main
- Read files/folders: AGENTS.md, _project/01_PROJECT_GOAL.md, _project/03_CURRENT_STAGE.md, package.json, app/zamowienie/page.tsx, components/order/CheckoutForm.tsx, scripts/check-manual-payment-v48.cjs, scripts/check-payment-direction-v48.cjs.
- Active source of truth: repo for code/guards/_project; Obsidian for dashboard/status.
- Planned changed files: checkout page, checkout form, payment-direction guard, package scripts, _project memory, Obsidian notes.

## FAKTY Z KODU / PLIKĂ“W

- Poprzedni checkout mĂłwiĹ‚ o tymczasowym flow i automatycznym providerze, ale nadal wyglÄ…daĹ‚ jak normalny zakup.
- Etap 31 zmienia narracjÄ™ na techniczny test zamĂłwienia bez pĹ‚atnoĹ›ci.

## DECYZJE DAMIANA

- Aplikacja niepubliczna.
- PĹ‚atnoĹ›ci pĂłĹşniej.
- Nie pisaÄ‡ klientowi o rÄ™cznym przelewie jako docelowym flow.

## TESTY AUTOMATYCZNE

APPLY uruchamia:
- npm run verify:payment-direction-v48
- npm run typecheck
- npm run build
- npm run check:project-memory

## GUARDY

- scripts/check-manual-payment-v48.cjs pilnuje markerĂłw Etapu 31 i blokuje copy o rÄ™cznym przelewie/manual-payment.

## TESTY RÄCZNE

- TEST RÄCZNY DO WYKONANIA: otworzyÄ‡ /zamowienie, sprawdziÄ‡ copy, wysĹ‚aÄ‡ testowe zamĂłwienie i potwierdziÄ‡ brak narracji o rÄ™cznym przelewie.

## WPĹYW NA OBSIDIANA

- APPLY aktualizuje dashboard i status projektu w 10_PROJEKTY/Sklep_projekty_domow/.

## GIT / ZIP STATUS

- Dostarczenie: ZIP + lokalne polecenie PowerShell.
- Push wykonuje Damian lokalnie po przejĹ›ciu testĂłw.