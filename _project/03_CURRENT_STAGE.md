# 03_CURRENT_STAGE - aktualny etap

Ostatnia aktualizacja: 2026-05-15 17:40 Europe/Warsaw

## Aktualny etap

Etap 11 HOTFIX: Naprawa po nieudanym checku archived-first

## Status etapu

Hotfix przygotowany po tym, jak Etap 11 został wypchnięty mimo błędów `verify:admin-project-list-compact-v41`, `typecheck` i `build`.

## Cel etapu

Doprowadzić repo do stanu, w którym Etap 11 jest realnie poprawny: archived-first działa, guardy są spójne z nowym layoutem, a `actions.ts` nie ma duplikatu zmiennej.

## Co naprawiono

- Usunięto zduplikowany blok `projectStatusBeforeDelete` w `deleteProjectAction`.
- Zaktualizowano `scripts/check-admin-project-list-compact-v41.cjs`, żeby pasował do layoutu Etapu 11:
  - `min-width: 1770px`,
  - kolumna `Akcje` `width: 620px`,
  - marker `ETAP11 ARCHIVED FIRST ACTION FIT`.
- Zaostrzono skrypt PowerShell: od teraz po błędzie checka skrypt przerywa pracę i nie robi commit/push.
- Zaktualizowano pamięć projektu po hotfixie.

## Czego nie zmieniano

- Nie zmieniano publicznego katalogu.
- Nie zmieniano Supabase schema.
- Nie zmieniano auth.
- Nie zmieniano modelu archived-first z Etapu 11.

## Checki wymagane

```powershell
npm run verify:admin-buttons-v19
npm run verify:admin-project-list-compact-v41
npm run verify:public-project-data-v22
npm run typecheck
npm run build
npm run check:project-memory
```

## Następny krok

Po przejściu hotfixa sprawdzić w panelu `/admin/projekty`, czy archived-first działa i czy tabela nadal trzyma zaakceptowany układ.
