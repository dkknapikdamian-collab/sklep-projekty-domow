# 2026-05-17 09:00 - Etap 33 runtime test admina i audit

## Cel etapu

Przygotować kontrolowany runtime test admina i audit logu, tak aby kryterium nie było deklaracją w UI, tylko realnym dowodem z Supabase `public.admin_audit_log`.

## Scan-first confirmation

- Repo aplikacji: `dkknapikdamian-collab/sklep-projekty-domow`, branch `main`.
- Obsidian: `dkknapikdamian-collab/obsidian-vault`, branch `main`.
- Metoda skanu: GitHub repo metadata, GitHub search, fetch plików, aktywna mapa source file z przestrzeni roboczej.
- Przeczytane pliki repo:
  - `AGENTS.md`,
  - `_project/01_PROJECT_GOAL.md`,
  - `_project/03_CURRENT_STAGE.md`,
  - `package.json`,
  - `scripts/check-admin-audit-log-v44.cjs`.
- Przeczytane notatki Obsidiana:
  - `10_PROJEKTY/Sklep_projekty_domow/00_START - Sklep projekty domow.md`,
  - `10_PROJEKTY/Sklep_projekty_domow/02_STAN OBECNY - Sklep projekty domow.md`.
- Foldery oczekiwane w lokalnym apply:
  - repo aplikacji: `C:\Users\malim\Desktop\biznesy_ai\strony\strona z projektami`,
  - vault: `C:\Users\malim\Desktop\biznesy_ai\00_OBSIDIAN_VAULT`.
- Konflikt znaleziony podczas skanu: `package.json` wymaga `verify:admin-audit-runtime-v53`, ale plik `scripts/check-admin-audit-runtime-v53.cjs` nie był dostępny w repo przez GitHub fetch. Etap 33 uzupełnia ten brak.

## FAKTY Z KODU / PLIKOW

- `verify` w `package.json` zawiera `verify:admin-audit-runtime-v53`.
- Istnieje statyczny guard `scripts/check-admin-audit-log-v44.cjs`, który sprawdza krytyczne akcje audit logu w kodzie.
- Statyczny guard nie potwierdza runtime wpisów w Supabase.
- Etap 33 dodaje runtime proof `scripts/check-admin-audit-runtime-v54.cjs`, który po kliknięciach odpytuje `public.admin_audit_log`.
- Etap 33 dodaje SQL proof `supabase/manual/2026-05-17_etap33_admin_audit_runtime_verification.sql`.

## DECYZJE DAMIANA

- Priorytet Etapu 33: 4.
- Kliknąć: dodanie projektu, publikacja, archiwizacja, usunięcie, media, pliki prywatne, zamówienia, checklisty, `/admin/audit`.
- Kryterium: wpisy audit muszą realnie być w Supabase.
- Tryb dostarczenia: ZIP + polecenie push po stronie Damiana.

## HIPOTEZY / PROPOZYCJE AI

- Najbezpieczniejszy runtime proof to dwa warianty: Node z service role key albo SQL Editor w Supabase.
- Usunięcie projektu powinno być wykonywane tylko na projekcie testowym.

## DO POTWIERDZENIA

- Czy środowisko lokalne ma dostęp do `SUPABASE_SERVICE_ROLE_KEY` albo równoważnego klucza.
- Czy w testowym projekcie są media i prywatne pliki, które można bezpiecznie usunąć.
- Czy publikacja w UI zapisuje status `active` czy inny równoważny marker publikacji.

## Zmienione pliki

- `scripts/check-admin-audit-runtime-v53.cjs`
- `scripts/check-admin-audit-runtime-v54.cjs`
- `supabase/manual/2026-05-17_etap33_admin_audit_runtime_verification.sql`
- `_project/17_ETAP33_ADMIN_AUDIT_RUNTIME_CHECKLIST.md`
- `_project/runs/2026-05-17_0900_etap33_runtime_test_admin_audit.md`
- `_project/03_CURRENT_STAGE.md`
- `_project/05_MANUAL_TESTS.md`
- `_project/06_GUARDS_AND_TESTS.md`
- `_project/07_NEXT_STEPS.md`
- `_project/08_CHANGELOG_AI.md`
- `_project/10_PROJECT_TIMELINE.md`
- `_project/12_IMPLEMENTATION_LEDGER.md`
- `_project/14_TEST_HISTORY.md`
- `_project/15_ACTIVE_SOURCE_MAP.md`
- `package.json`
- Obsidian: `10_PROJEKTY/Sklep_projekty_domow/00_START - Sklep projekty domow.md`
- Obsidian: `10_PROJEKTY/Sklep_projekty_domow/02_STAN OBECNY - Sklep projekty domow.md`
- Obsidian: `10_PROJEKTY/Sklep_projekty_domow/06_GUARDY I TESTY AUTOMATYCZNE - Sklep projekty domow.md`
- Obsidian: `10_PROJEKTY/Sklep_projekty_domow/07_POTWIERDZENIA DAMIANA - Sklep projekty domow.md`
- Obsidian: `10_PROJEKTY/Sklep_projekty_domow/09_NASTEPNY KROK - Sklep projekty domow.md`
- Obsidian: `10_PROJEKTY/Sklep_projekty_domow/2026-05-17 - Etap 33 runtime test admina i audit.md`

## TESTY AUTOMATYCZNE

Do uruchomienia przez apply:

```powershell
npm run verify:admin-audit-log-v44
npm run verify:admin-audit-runtime-v53
npm run check:project-memory
npm run typecheck
npm run build
```

## GUARDY

- `verify:admin-audit-runtime-v53` - guard pakietu Etap 33, potwierdza obecność runtime proof, SQL proof, checklisty i raportu run.
- `audit:admin-runtime-v54` - realny test Supabase po ręcznych kliknięciach, nie jest częścią głównego `npm run verify`, bo wymaga sekretów i danych runtime.

## TESTY RĘCZNE

Status: TEST RĘCZNY DO WYKONANIA.

Wymagane kliknięcia:
- dodanie projektu,
- publikacja,
- archiwizacja,
- usunięcie,
- media,
- pliki prywatne,
- zamówienia,
- checklisty,
- `/admin/audit`.

## POTWIERDZENIA DAMIANA

BRAK POTWIERDZONEGO TESTU RĘCZNEGO na moment przygotowania paczki.

## BRAKI I RYZYKA

- Node runtime proof wymaga sekretu Supabase w lokalnym środowisku i nie wolno go commitować.
- Hard delete jest destrukcyjny, więc test usunięcia wolno robić tylko na projekcie testowym.
- Jeśli brak wpisów dla mediów albo plików prywatnych, najczęściej oznacza to brak odpowiednich danych testowych do kliknięcia.

## WPŁYW NA OBSIDIANA

Obsidian zostaje zaktualizowany przez paczkę: status, testy, guardy, next step i notatka Etapu 33.

## WPŁYW NA KIERUNEK ROZWOJU

Etap pasuje do V1, bo dotyczy admina, zamówień, mediów, plików prywatnych i audytu, czyli krytycznych ścieżek sklepu.

## NASTĘPNY KROK

Po apply i pushu wykonać kliknięcia z checklisty, uruchomić `npm run audit:admin-runtime-v54` albo SQL proof i wkleić wynik.

## GIT / ZIP STATUS

Tryb: ZIP + lokalny commit/push po stronie Damiana.

Etap 33 pozostaje NIEZAMKNIĘTY, dopóki realny runtime proof nie pokaże wszystkich grup `PASS` i Damian nie potwierdzi testu ręcznego.
