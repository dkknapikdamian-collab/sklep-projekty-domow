# Run report - Etap 34 pełny flow sklepu bez płatności publicznej

Data: 2026-05-17 Europe/Warsaw.
Tryb: ZIP + lokalny push przez Damiana.
Status: WDROŻONE W PACZCE / TEST RĘCZNY DO WYKONANIA.

## Scan-first confirmation

- Repo: `dkknapikdamian-collab/sklep-projekty-domow`
- Branch: `main`
- Git status: do sprawdzenia lokalnie przez APPLY przed zmianami.
- Metoda skanu: repo przez GitHub connector + obowiązkowe pliki projektowe + aktywna mapa source file + ostatnie rozmowy projektowe.
- Pliki repo przeczytane:
  - `AGENTS.md`
  - `package.json`
  - `_project/01_PROJECT_GOAL.md`
  - `_project/03_CURRENT_STAGE.md`
  - `app/projekty/page.tsx`
  - `app/projekty/[slug]/page.tsx`
  - `lib/project-repository.ts`
  - `components/project/ProjectDetailPage.tsx`
  - `components/project/ProjectPurchaseBox.tsx`
  - `app/koszyk/page.tsx`
  - `components/cart/CartClient.tsx`
  - `app/zamowienie/page.tsx`
  - `components/order/CheckoutForm.tsx`
  - `app/zamowienie/actions.ts`
  - `lib/order/create-order.ts`
  - `lib/order/validate-cart-against-db.ts`
  - `app/admin/zamowienia/page.tsx`
  - `app/admin/zamowienia/[id]/page.tsx`
  - `app/admin/zamowienia/actions.ts`
  - `lib/admin/orders-admin.ts`
  - `scripts/check-admin-audit-log-v44.cjs`
- Obsidian notes read from project instructions:
  - `10_PROJEKTY/Sklep_projekty_domow/00_START - Sklep projekty domow.md`
  - `10_PROJEKTY/Sklep_projekty_domow/01_STATUS - Sklep projekty domow.md`
  - powiązane notatki projektu wskazane w aktywnej mapie.
- Missing files/folders: lokalny status repo i vaulta zostanie potwierdzony przez APPLY na komputerze Damiana.
- Active source of truth:
  - repo dla kodu, guardów, `_project`, run report,
  - Obsidian dla dashboardu/statusu wysokiego poziomu.
- Legacy / competing paths:
  - manual-payment pozostaje tylko jako temporary/internal/non-public, nie jako docelowy flow sprzedaży.
- Planned changed files:
  - guard Etapu 34,
  - package script,
  - `_project`,
  - notatki Obsidiana.
- Risks:
  - guard statyczny nie zastępuje runtime testu w Supabase.
  - etap nie potwierdza płatności online.
- Tests planned:
  - `npm run verify:stage34-full-flow-no-public-payment`
  - `npm run verify:v1-runtime-flow-markers-v49`
  - `npm run verify:order-price-source-v50`
  - `npm run verify:order-price-runtime-v25`
  - `npm run verify:admin-audit-log-v44`
  - `npm run verify:admin-orders-v42`
  - `npm run verify:cart-order-v38`
  - `npm run typecheck`

## FAKTY Z KODU / PLIKÓW

- Publiczny katalog używa `getPublicProjects()`.
- Repozytorium projektów filtruje status `active` i blokuje demo/sample.
- Karta projektu używa `ProjectPurchaseBox`, który zapisuje projekt do koszyka.
- Koszyk prowadzi do `/zamowienie`.
- Checkout jest opisany jako techniczny i niepubliczny.
- `createOrder()` zapisuje zamówienie i pozycje.
- `validateCartAgainstDb()` sprawdza aktualne ceny i status active w bazie.
- Admin ma listę i szczegóły zamówień.
- Audit admina zapisuje operacje projektu i zamówienia.

## DECYZJE DAMIANA

- Etap 34 ma sprawdzać pełny flow sklepu bez płatności publicznej.
- To nadal nie oznacza publikacji klientom.
- Praca w trybie ZIP + polecenie push lokalnie.

## HIPOTEZY / PROPOZYCJE AI

- Najlepszy zakres Etapu 34 to guard kontraktu + project memory + Obsidian + manualny runtime checklist, bez refaktoru UI.
- Nie warto teraz dokładać nowej automatyzacji płatności, bo to osobny etap o większym ryzyku.

## DO POTWIERDZENIA

- Runtime wynik na realnym projekcie.
- Negatywny runtime test zmiany ceny po dodaniu do koszyka.
- Czy po Etapie 34 przechodzimy do payment provider/webhook/statusów.

## TESTY AUTOMATYCZNE

Do uruchomienia przez APPLY:
- `npm run verify:stage34-full-flow-no-public-payment`
- `npm run verify:v1-runtime-flow-markers-v49`
- `npm run verify:order-price-source-v50`
- `npm run verify:order-price-runtime-v25`
- `npm run verify:admin-audit-log-v44`
- `npm run verify:admin-orders-v42`
- `npm run verify:cart-order-v38`
- `npm run typecheck`

## GUARDY

Dodano:
- `scripts/check-stage34-full-flow-no-public-payment.cjs`
- `package.json -> verify:stage34-full-flow-no-public-payment`

## TESTY RĘCZNE

Status: TEST RĘCZNY DO WYKONANIA.

Checklist:
1. Realny projekt active w adminie.
2. Katalog.
3. Karta.
4. Koszyk.
5. Zamówienie techniczne.
6. Admin orders.
7. Szczegóły zamówienia.
8. Walidacja cen.
9. Audit.

## POTWIERDZENIA DAMIANA

BRAK POTWIERDZONEGO TESTU RĘCZNEGO dla Etapu 34.

## BRAKI I RYZYKA

- Etap nie uruchamia publicznych płatności.
- Etap nie automatyzuje wysyłki plików.
- Guard jest statyczny.
- Pełne zamknięcie wymaga testu lokalnego na Supabase.

## WPŁYW NA OBSIDIANA

Aktualizowane pliki:
- `10_PROJEKTY/Sklep_projekty_domow/00_START - Sklep projekty domow.md`
- `10_PROJEKTY/Sklep_projekty_domow/01_STATUS - Sklep projekty domow.md`
- `10_PROJEKTY/Sklep_projekty_domow/2026-05-17 - Etap 34 pelny flow sklepu bez platnosci publicznej.md`

## WPŁYW NA KIERUNEK ROZWOJU

Etap wzmacnia V1 jako niepubliczny sklep gotowy do runtime testu. Nie przesuwa projektu do publicznego release.

## NASTĘPNY KROK

Wykonać test ręczny Etapu 34. Jeśli przejdzie, zapisać potwierdzenie Damiana. Jeśli nie, zrobić Etap 34B z konkretnymi regresjami.

## GIT / ZIP STATUS

- Delivery: ZIP.
- Push: wykonywany lokalnie przez APPLY po przejściu guardów.
- AI nie pushuje samodzielnie.
