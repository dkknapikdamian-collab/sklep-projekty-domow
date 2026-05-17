# 2026-05-17 09:30 - Etap 33 V2 SQL ledger i env fix

## Cel etapu

Naprawić paczkę Etapu 33 po dwóch realnych wynikach z PowerShell:

1. `verify:admin-audit-runtime-v53` zatrzymał się na zbyt kruchym markerze checklisty `dodanie projektu`.
2. `audit:admin-runtime-v54` nie widział Supabase URL, bo nie wczytywał `.env.local`.

Dodatkowo zapisać stałą zasadę SQL: każdy SQL musi być w repo i Obsidianie, a użyte SQL-e mają być jawnie ledgowane.

## Scan-first confirmation

- Repo aplikacji: `dkknapikdamian-collab/sklep-projekty-domow`, branch `main`.
- Obsidian: `dkknapikdamian-collab/obsidian-vault`, branch `main`.
- Przeczytane źródła przed V2: aktywna mapa projektu, `AGENTS.md`, `_project/01_PROJECT_GOAL.md`, `package.json`, guard `check-admin-audit-log-v44.cjs`, wynik błędu PowerShell z V1.
- Lokalny wynik Damiana z V1 jest faktem wejściowym: guard checklisty FAIL oraz runtime proof FAIL Missing Supabase URL.

## FAKTY Z KODU / PLIKOW

- V1 napisał pliki przed uruchomieniem guardów, ale zatrzymał się przed commitem/pushem.
- `verify:admin-audit-runtime-v53` wymagał markera z dokładną wielkością liter, mimo że checklista miała `Dodanie projektu`.
- `audit:admin-runtime-v54` czytał tylko `process.env`, a nie `.env.local`.
- SQL z Etapu 33 jest proofem `SELECT`, nie migracją i nie zmianą schematu.

## DECYZJE DAMIANA

- Etap 33 ma potwierdzić realne wpisy audit w Supabase.
- Wszystkie SQL-e mają być zapisane, żeby było wiadomo, co zostało dodane/uruchomione.
- Obsidian ma mieć stałe zadanie/regułę dla pracy z SQL.

## HIPOTEZY / PROPOZYCJE AI

- Jeśli po V2 Node proof nadal nie ruszy, najpewniej lokalne `.env.local` nie ma service role key. Wtedy bezpieczniej użyć Supabase SQL Editor z plikiem `supabase/manual/2026-05-17_etap33_admin_audit_runtime_verification.sql`.

## DO POTWIERDZENIA

- Czy `.env.local` zawiera `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_SERVICE_KEY` albo `SUPABASE_ADMIN_KEY`.
- Czy po kliknięciach w adminie wszystkie wymagane akcje faktycznie mają wpisy w `public.admin_audit_log`.
- Czy SQL proof w Supabase pokazuje wszystkie grupy `PASS`.

## SQL LEDGER

Dodano trwały ledger SQL:

- `_project/18_SQL_LEDGER.md`,
- Obsidian: `10_PROJEKTY/Sklep_projekty_domow/12_SQL_LEDGER - Sklep projekty domow.md`,
- reguła w `AGENTS.md`.

Wpisany SQL Etapu 33:

- `supabase/manual/2026-05-17_etap33_admin_audit_runtime_verification.sql`,
- typ: `READ_ONLY_VERIFICATION`,
- mutacja: NIE,
- cel: proof wpisów admin audit po kliknięciach.

## Zmienione pliki

- `AGENTS.md`
- `package.json`
- `scripts/check-admin-audit-runtime-v53.cjs`
- `scripts/check-admin-audit-runtime-v54.cjs`
- `supabase/manual/2026-05-17_etap33_admin_audit_runtime_verification.sql`
- `_project/17_ETAP33_ADMIN_AUDIT_RUNTIME_CHECKLIST.md`
- `_project/18_SQL_LEDGER.md`
- `_project/runs/2026-05-17_0930_etap33_v2_sql_ledger_env_fix.md`
- `_project/03_CURRENT_STAGE.md`
- `_project/05_MANUAL_TESTS.md`
- `_project/06_GUARDS_AND_TESTS.md`
- `_project/07_NEXT_STEPS.md`
- `_project/08_CHANGELOG_AI.md`
- `_project/10_PROJECT_TIMELINE.md`
- `_project/12_IMPLEMENTATION_LEDGER.md`
- `_project/14_TEST_HISTORY.md`
- `_project/15_ACTIVE_SOURCE_MAP.md`
- Obsidian: `00_START`, `02_STAN OBECNY`, `06_GUARDY`, `07_POTWIERDZENIA`, `09_NASTEPNY KROK`, `12_SQL_LEDGER`, notatka Etapu 33 V2.

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

- `verify:admin-audit-runtime-v53` - guard statyczny V2, case-insensitive dla checklisty, sprawdza SQL ledger i `.env.local` loader w v54.
- `audit:admin-runtime-v54` - realny proof Supabase po kliknięciach, teraz wczytuje `.env.local`.

## TESTY RĘCZNE

Status: TEST RĘCZNY DO WYKONANIA.

Wymagane kliknięcia: dodanie projektu, publikacja, archiwizacja, usunięcie projektu testowego, media, pliki prywatne, zamówienia, checklisty i `/admin/audit`.

## POTWIERDZENIA DAMIANA

BRAK POTWIERDZONEGO TESTU RĘCZNEGO.

## BRAKI I RYZYKA

- Node proof wymaga service role key. Jeśli go nie ma lokalnie, użyć SQL Editor.
- Hard delete tylko na projekcie testowym.
- Brak danych testowych dla mediów/prywatnych plików może dać `FAIL` dla tych grup mimo poprawnego mechanizmu audit.

## WPŁYW NA OBSIDIANA

Obsidian dostaje stały SQL ledger oraz zadanie/regułę: każdy SQL musi być zapisany w repo i w Obsidianie.

## WPŁYW NA KIERUNEK ROZWOJU

Etap pasuje do V1, bo domyka audyt krytycznych operacji admina bez dodawania płatności, automatycznej wysyłki ani panelu klienta.

## NASTĘPNY KROK

1. Uruchomić V2.
2. Kliknąć checklistę admina.
3. Uruchomić `npm run audit:admin-runtime-v54` albo SQL proof.
4. Wkleić wynik.
5. Dopiero po `PASS` dla wszystkich grup dopisać potwierdzenie Damiana.

## GIT / ZIP STATUS

Tryb: ZIP + lokalny commit/push po stronie Damiana.

Etap 33 pozostaje NIEZAMKNIĘTY do czasu realnego proofu Supabase.
