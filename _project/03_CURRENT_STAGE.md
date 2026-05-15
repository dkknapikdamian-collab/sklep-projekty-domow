# 03_CURRENT_STAGE - aktualny etap

Ostatnia aktualizacja: 2026-05-15 17:15 Europe/Warsaw

## Aktualny etap

Etap 11: Archived-first zamiast fizycznego delete jako domyślna ścieżka

## Status etapu

Przygotowany w paczce wdrożeniowej. Do potwierdzenia lokalnie przez guardy, build i ręczny test w przeglądarce.

## Cel etapu

Zmniejszyć ryzyko katastrofy w panelu admina. Codzienna praca ma archiwizować projekt, a fizyczne usunięcie ma zostać operacją awaryjną.

## Co zostało zrobione

- Dodano server action `archiveProjectAction`.
- W tabeli projektów dodano normalną akcję `Archiwizuj`.
- Fizyczne usuwanie zostało przeniesione do strefy awaryjnej `Awaryjne`.
- `Usuń trwale` jest dostępne dopiero po rozwinięciu awaryjnej strefy i wpisaniu kodu projektu.
- Fizyczne delete jest blokowane dla statusów innych niż `archived` albo `draft`.
- Dla projektu `active` UI pokazuje ostrzeżenie, że najpierw trzeba archiwizować albo zejść do draft.
- Server action `deleteProjectAction` również blokuje fizyczne delete, jeśli projekt nie jest `archived` albo `draft`.
- Zaktualizowano guard `verify:admin-buttons-v19`, żeby pilnował archived-first.
- Zaktualizowano layout tabeli admina, żeby nowa akcja `Archiwizuj` nadal mieściła się w jednym wierszu.
- Publiczny katalog nadal pozostaje oparty o `status = active`.

## Czego nie zmieniano

- Nie zmieniano schematu Supabase.
- Nie zmieniano auth.
- Nie zmieniano publicznego katalogu poza utrzymaniem zasady, że tylko `active` jest publiczne.
- Nie usuwano fizycznego delete całkowicie.
- Nie zmieniano modelu płatności, koszyka ani zamówień.

## Checki wymagane

```powershell
npm run verify:admin-buttons-v19
npm run verify:admin-project-list-compact-v41
npm run verify:public-project-data-v22
npm run typecheck
npm run build
npm run check:project-memory
```

## Kryterium zakończenia

Codzienna praca admina nie wymaga fizycznego kasowania projektu. Standardowa ścieżka to archiwizacja.
