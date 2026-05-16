# RUN_STAGE25_ORDER_PRICE_RUNTIME_VALIDATION_TEST_2026-05-16

## Cel etapu

Domknięcie braku po Etapie 25: dodać test automatyczny z mockiem Supabase dla walidacji cen koszyka względem bazy.

## Scan-first confirmation

- Repo: `dkknapikdamian-collab/sklep-projekty-domow`
- Branch docelowy: `main`
- Aktywna mapa: `SKLEP_PROJEKTY_DOMOW__AKTYWNA_MAPA_I_PROCES_OBSIDIAN_FINAL_V1.md`
- Obsidian: `dkknapikdamian-collab/obsidian-vault`, sekcja `10_PROJEKTY/Sklep_projekty_domow/`

## Co przeczytano przed zmianą

- `AGENTS.md`
- `_project/01_PROJECT_GOAL.md`
- `_project/06_GUARDS_AND_TESTS.md`
- `_project/16_PRODUCTION_ROADMAP_AND_ACCEPTANCE.md`
- `package.json`
- `scripts/check-order-price-source-v50.cjs`
- `lib/order/validate-cart-against-db.ts`
- `lib/order/create-order.ts`
- `lib/cart/types.ts`
- Obsidian: `10_PROJEKTY/Sklep_projekty_domow/00_START - Sklep projekty domow.md`

## FAKTY Z KODU / PLIKÓW

- `createOrder` używa `validateCartAgainstDb` przed wyliczeniem `totalGross` i zapisuje pozycje z `validatedCart`.
- `validateCartAgainstDb` ładuje projekt z `projects`, aktywne addony z `project_addons` i aktywne warianty z `project_variants`.
- Istniejący guard `verify:order-price-source-v50` pilnuje statycznego kontraktu źródła cen.
- Brakowało automatycznego testu z mockiem Supabase dla scenariuszy runtime: stary koszyk, zmieniona cena, nieaktywny projekt, usunięty addon, zmieniony wariant.

## DECYZJE DAMIANA

- Dodać test ręczny i najlepiej test automatyczny z mockiem Supabase.
- Dostarczyć ZIP i polecenie push, bez samodzielnego pushowania przez ChatGPT.

## HIPOTEZY / PROPOZYCJE AI

- Najmniejsza sensowna zmiana to osobny guard runtime bez ruszania produkcyjnej logiki checkoutu.

## DO POTWIERDZENIA

- Runtime na realnych danych Supabase nadal wymaga ręcznego testu Damiana.
- Test automatyczny używa mocka Supabase, więc nie potwierdza realnych rekordów w bazie.

## ZMIENIONE PLIKI

- `scripts/check-order-price-runtime-v25.cjs`
- `package.json`
- `docs/implementation/STAGE25_ORDER_PRICE_RUNTIME_VALIDATION_TEST.md`
- `_project/runs/RUN_STAGE25_ORDER_PRICE_RUNTIME_VALIDATION_TEST_2026-05-16.md`
- `_project/03_CURRENT_STAGE.md`
- `_project/05_MANUAL_TESTS.md`
- `_project/06_GUARDS_AND_TESTS.md`
- `_project/07_NEXT_STEPS.md`
- `_project/08_CHANGELOG_AI.md`
- `_project/10_PROJECT_TIMELINE.md`
- `_project/12_IMPLEMENTATION_LEDGER.md`
- `_project/14_TEST_HISTORY.md`
- `_project/16_PRODUCTION_ROADMAP_AND_ACCEPTANCE.md`
- Obsidian: `10_PROJEKTY/Sklep_projekty_domow/2026-05-16 - Etap 25 walidacja cen runtime test.md`
- Obsidian dashboard/guard notes, jeśli istnieją lokalnie.

## TESTY AUTOMATYCZNE

Do uruchomienia przez APPLY:

```powershell
npm run verify:order-price-source-v50
npm run verify:order-price-runtime-v25
npm run typecheck
npm run build
npm run check:project-memory
```

## GUARDY

Nowy guard:

```powershell
npm run verify:order-price-runtime-v25
```

## TESTY RĘCZNE

Status: TEST RĘCZNY DO WYKONANIA.

Scenariusze ręczne:
- stary koszyk,
- zmieniona cena bazowa,
- nieaktywny projekt,
- usunięty addon,
- zmieniony wariant,
- zmieniona cena addonu.

## POTWIERDZENIA DAMIANA

- BRAK POTWIERDZONEGO TESTU RĘCZNEGO dla runtime Supabase.

## BRAKI I RYZYKA

- Mock Supabase nie zastępuje testu na realnych rekordach.
- Jeśli `typescript` nie jest zainstalowany lokalnie, guard poprosi o `npm install`.

## WPŁYW NA OBSIDIANA

- Do ZIP-a dodano notatkę Obsidiana dla Etapu 25.
- APPLY aktualizuje dashboard sklepu i notatki guard/roadmapy, jeśli istnieją w vaultcie.

## WPŁYW NA KIERUNEK ROZWOJU

- Zmiana pasuje do V1: koszyk, checkout, zamówienie i guardy krytycznej ścieżki.
- Nie dodaje płatności online, panelu klienta, faktur ani automatycznej wysyłki.

## NASTĘPNY KROK

Po przejściu guardów wykonać ręczny runtime test na realnych danych Supabase i wpisać wynik do `_project/11_USER_CONFIRMED_TESTS.md` oraz Obsidiana.

## GIT / ZIP STATUS

- Tryb: ZIP.
- ChatGPT nie wykonuje push.
- Push wykonuje Damian po lokalnym APPLY i sprawdzeniu statusu.


## DELIVERY V2 NOTE

- V1 package apply script failed before execution because Windows PowerShell parsed UTF-8 without BOM / non-ASCII string literals incorrectly.
- V2 replaces APPLY script with ASCII-only executable PowerShell and Base64-decoded UTF-8 markdown blocks.
- Application code and guard scope remain the same.
