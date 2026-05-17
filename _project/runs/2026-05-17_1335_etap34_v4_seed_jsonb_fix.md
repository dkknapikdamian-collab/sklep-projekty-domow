# Etap 34 V4 - seed projektu testowego JSONB fix

## Cel

Naprawić SQL seed projektu testowego po błędzie Supabase:

`column "features" is of type jsonb but expression is of type text[]`

## FAKTY Z KODU / PLIKÓW

- Etap 34 V3 został wdrożony i wypchnięty:
  - app commit: `b10268a feat(admin): stabilize edit UX and add test project seed v3`,
  - Obsidian commit: `005142b docs(sklep): record etap34 admin ux tests`.
- SQL seed V3 próbował zapisać `features` jako `array[...]::text[]`.
- Supabase zgłosił, że `projects.features` jest typu `jsonb`.
- V4 zmienia:
  - `features` na JSONB,
  - `related_slugs` na JSONB,
  - update istniejącego projektu też ustawia `related_slugs = '[]'::jsonb`.
- Seed nadal tworzy projekt testowy jako `draft`, nie `active`.

## DECYZJE DAMIANA

- Projekt testowy ma wrócić, bo poprzedni został skasowany.
- SQL musi być zapisany w repo i Obsidianie.
- Testy Etapu 33 i Etapu 34 zostają jako do wykonania / do potwierdzenia.

## HIPOTEZY / PROPOZYCJE AI

- Błąd jest typowo schematowy, nie runtime UI: kolumna w bazie jest JSONB, a seed podał text[].
- Po V4 SQL powinien przejść do kolejnych insertów.

## DO POTWIERDZENIA

- Czy SQL seed V4 uruchamia się w Supabase SQL Editor.
- Czy projekt `DP-TEST-034` pojawia się w `/admin/projekty`.
- Czy projekt jest `draft`.
- Czy ma rekordy media i pliki prywatne.

## ZMIENIONE PLIKI

- `supabase/manual/2026-05-17_etap34_seed_admin_test_project.sql`
- `scripts/check-admin-ux-stability-v34.cjs`
- `_project/runs/2026-05-17_1335_etap34_v4_seed_jsonb_fix.md`
- `_project/03_CURRENT_STAGE.md`
- `_project/06_GUARDS_AND_TESTS.md`
- `_project/07_NEXT_STEPS.md`
- `_project/08_CHANGELOG_AI.md`
- `_project/10_PROJECT_TIMELINE.md`
- `_project/11_USER_CONFIRMED_TESTS.md`
- `_project/12_IMPLEMENTATION_LEDGER.md`
- `_project/14_TEST_HISTORY.md`
- `_project/18_SQL_LEDGER.md`
- Obsidian: dashboard/status/next/sql ledger.

## TESTY AUTOMATYCZNE / GUARDY

- `node scripts/check-admin-ux-stability-v34.cjs`
- `node scripts/check-admin-audit-log-v44.cjs`

## TESTY RĘCZNE

Status: TEST RĘCZNY DO WYKONANIA.

- Uruchomić SQL seed V4 w Supabase SQL Editor.
- Potwierdzić projekt `DP-TEST-034`.
- Potwierdzić status `draft`.
- Potwierdzić, że projekt ma ładne media testowe.
- Potwierdzić scroll i szerokość panelu admina po realnych akcjach.

## BRAKI I RYZYKA

- SQL seed nadal mutuje dane testowe, więc nie uruchamiać na publicznej produkcji bez świadomej decyzji.
- Jeżeli po V4 wyskoczy kolejny błąd schematu, trzeba poprawić seed pod realny schemat Supabase.
- Etap 33 nadal wymaga 8 PASS / 0 FAIL.

## WPŁYW NA OBSIDIANA

- Obsidian dostaje informację, że V4 naprawia typy JSONB w SQL seed.
- SQL ledger zostaje uzupełniony o V4.

## NASTĘPNY KROK

1. Uruchomić paczkę V4.
2. Skopiować SQL seed.
3. Wkleić do Supabase SQL Editor.
4. Potwierdzić projekt testowy w adminie.
