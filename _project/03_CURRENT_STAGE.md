# 03_CURRENT_STAGE - aktualny etap

Ostatnia aktualizacja: 2026-05-15 16:45 Europe/Warsaw

## Aktualny etap

Etap 10B: Blokada idealnego układu listy projektów i dopasowanie kolumny akcji

## Status etapu

Przygotowany w paczce wdrożeniowej. Do potwierdzenia lokalnie przez guardy, build i ręczny test w przeglądarce.

## Cel etapu

Zostawić obecny idealny układ `/admin/projekty`, ale dopiąć ostatni problem: przycisk `Ustaw active` nie może wypadać poza prawą krawędź tabeli.

## Co zostało zrobione

- Zachowano pełnoszeroki, jednowierszowy layout tabeli z Etapu 10.
- Poszerzono kolumnę `Akcje` do stabilnej szerokości.
- Lekko skompresowano część kolumn informacyjnych, żeby tabela nadal mieściła się na desktopie.
- Zmniejszono odstęp i mikro-rozmiar tekstu w przyciskach akcji.
- Zachowano teksty przycisków, w tym `Ustaw active` i `Ustaw draft`.
- Guard `verify:admin-project-list-compact-v41` pilnuje teraz także action-column fit lock: minimalnej szerokości tabeli, szerokości kolumny akcji, braku powrotu do `width: 286px`, braku za dużych gapów i braku starego rozmiaru fontu akcji.

## Czego nie zmieniano

- Nie zmieniano server actions.
- Nie zmieniano routingu.
- Nie zmieniano publicznych stron.
- Nie zmieniano logiki statusów.
- Nie zmieniano modelu usuwania.
- Nie zmieniano danych Supabase.

## Checki wymagane

```powershell
npm run verify:admin-project-list-compact-v41
npm run verify:admin-buttons-v19
npm run typecheck
npm run build
npm run check:project-memory
```

## Następny krok

Po wdrożeniu sprawdzić ręcznie `/admin/projekty`: na desktopie cały zestaw akcji w wierszu ma być widoczny, w tym `Ustaw active`.
