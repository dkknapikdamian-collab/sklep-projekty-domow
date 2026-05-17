# ETAP26A_PROJECT_FILES_MODEL

Status: WDROZONE W PACZCE V2 REPAIR / SQL URUCHOMIONE / TEST RĘCZNY DO WYKONANIA.
Data: 2026-05-17 Europe/Warsaw.

## Cel

Ujednolicic model prywatnych plikow projektu w Supabase Storage bez przechodzenia na Google Drive.

## Decyzja

Supabase Storage jest produkcyjnym storage dla plikow projektu. Google Drive nie jest kierunkiem Etapu 26.

## Zakres 26A

- Nowe zrodlo prawdy typow plikow: `lib/admin/project-files-model.ts`.
- Rozszerzenie `project_files`: `active`, `auto_send_after_payment`, `required_for_publication`, `sort_order`, `metadata`, `updated_at`.
- Admin upload prywatnych plikow zapisuje flagi modelu.
- Publikacja projektu sprawdza aktywne/wymagane pliki.
- Fulfillment zamowien ignoruje nieaktywne pliki.
- `tsconfig.json` wyklucza `_backup_local`, zeby lokalne backupy nie psuly typecheck.
- Guard `verify:project-files-model-v26a` pilnuje kontraktu.

## SQL

SQL zostal uruchomiony przez Damiana w Supabase. Wynik: `Success. No rows returned.`

## Testy

Automatyczne: `verify:project-files-model-v26a`, `verify:private-files-fulfillment-v51`, `verify:project-publication-readiness-v35`, `typecheck`.

Ręczne: TEST RĘCZNY DO WYKONANIA na realnych danych Supabase.

## Status

SQL: URUCHOMIONE / POTWIERDZONE PRZEZ DAMIANA. Runtime: BRAK POTWIERDZONEGO TESTU RĘCZNEGO.
