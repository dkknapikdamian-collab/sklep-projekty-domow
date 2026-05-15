# 03_CURRENT_STAGE - aktualny etap

Ostatnia aktualizacja: 2026-05-15 10:35 Europe/Warsaw

## Aktualny etap

Etap 9: Minimum bezpieczeństwa admina i operacji destrukcyjnych

## Status etapu

Przygotowany w paczce naprawczej FIX3 po błędach wcześniejszych patcherów. Do potwierdzenia lokalnie przez wymagane guardy i build.

## Cel etapu

Nie dać przypadkowo usunąć projektu jednym szybkim kliknięciem.

## Co zostało zrobione

- Usuwanie projektu jest ukryte w rozwijanej strefie destrukcyjnej.
- Admin musi wpisać kod projektu przed usunięciem.
- Przycisk usuwania jest zablokowany bez poprawnego kodu.
- `deleteProjectAction` waliduje kod projektu po stronie serwera przed usunięciem.
- Projekt `active` pokazuje osobne ostrzeżenie.
- Guard `verify:admin-buttons-v19` pilnuje, że delete nie jest zwykłym linkiem i wymaga potwierdzenia kodem.
- Naprawiono zaległe błędy typecheck po Etapie 8: `AdminProjectFileItem.bucket` oraz nullable `supabase` w `order-files.ts`.

## Czego nie zmieniano

- Nie zmieniano całego auth.
- Nie zmieniano routingu.
- Nie zmieniano publicznych stron.
- Nie zmieniano fizycznego delete na archived-first.

## Checki wymagane

```powershell
npm run verify:admin-project-media-v34
npm run verify:project-media-controls-v34
npm run verify:admin-buttons-v19
npm run typecheck
npm run build
npm run check:project-memory
```

## Następny krok

Po wdrożeniu sprawdzić w panelu admina, czy projekt bez wpisania kodu nie da się usunąć, a projekt aktywny pokazuje dodatkowe ostrzeżenie.
