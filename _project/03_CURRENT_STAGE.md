# 03_CURRENT_STAGE - aktualny etap

Ostatnia aktualizacja: 2026-05-15 19:35 Europe/Warsaw

## Aktualny etap

Etap 15: Dopasowanie panelu awaryjnego usunięcia w tabeli projektów

## Status etapu

Przygotowany w paczce wdrożeniowej. Do potwierdzenia lokalnie przez guardy, typecheck, build i test ręczny.

## Cel etapu

Otwarty panel awaryjnego usunięcia w `/admin/projekty` nie może rozpychać ani ucinać tabeli. Ma być mniejszy, czytelny i mieścić tekst w ekranie.

## Co zostało zrobione

- Zmieniono etykietę z `Awaryjne` na `Awaryjne usunięcie`.
- Skrócono treści w czerwonym panelu.
- Zmieniono tytuł panelu z `Ostatni guzik pod szkłem` na prostsze `Trwałe usunięcie`.
- Dodano override CSS `STAGE45 ADMIN PROJECT EMERGENCY DELETE PANEL FIT`.
- Panel w tabeli ma mniejszą szerokość, padding, font i input.
- W panelu wymuszono `white-space: normal` i `overflow-wrap: anywhere`, żeby teksty nie były ucinane przez jednowierszowe reguły tabeli.
- Zaktualizowano guard `verify:admin-buttons-v19`, żeby pilnował krótszej kopii i CSS panelu.

## Czego nie zmieniano

- Nie zmieniano logiki archiwizacji.
- Nie zmieniano fizycznego delete po stronie server action.
- Nie zmieniano publicznego sklepu.
- Nie zmieniano Supabase schema.
- Nie zmieniano układu całej tabeli poza panelem awaryjnego delete.

## Checki wymagane

```powershell
npm run verify:admin-buttons-v19
npm run verify:admin-project-list-compact-v41
npm run typecheck
npm run build
npm run check:project-memory
```

## Kryterium zakończenia

Po rozwinięciu `Awaryjne usunięcie` teksty mieszczą się w panelu, panel jest mniejszy i nie ucina treści po prawej stronie.
