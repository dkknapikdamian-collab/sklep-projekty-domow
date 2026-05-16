# STAGE52 / Etap 27 - produkcyjne sanity checki danych projektu przed publikacją

Data: 2026-05-16

## Teza

Skoro katalog publiczny pokazuje tylko `active`, to status `active` musi być twardą bramką jakości. Projekt bez danych sprzedażowych nie może wejść do katalogu jako oferta.

## Co wdrażane przez paczkę

- Rozszerzenie `lib/admin/project-publication-readiness.ts`.
- Twardsza blokada `status=active` w `app/admin/projekty/actions.ts`.
- Twardsza blokada tworzenia nowego projektu jako active w `app/admin/projekty/nowy/actions.ts`.
- Box `Gotowość publikacji` na edycji projektu.
- Rozszerzenie guarda `scripts/check-project-publication-readiness-v35.cjs`.
- Style dla zielonych/czerwonych elementów gotowości publikacji.

## Wymagane przed publikacją active

- nazwa,
- slug,
- kod,
- cena > 0,
- metraż > 0,
- liczba pokoi > 0,
- jasny opis,
- hero,
- thumbnail,
- minimum jeden rzut,
- prywatny plik dokumentacji PDF,
- wariant albo potwierdzony projekt podstawowy,
- jeśli są pomieszczenia: minimum jedno nazwane pomieszczenie.

## UI admina

Na stronie `/admin/projekty/[id]/edytuj` pojawia się box:

`Gotowość publikacji`

Pokazuje zielone elementy OK i czerwone braki. Jeśli projekt nie jest gotowy, pokazuje komunikat:

`Aktywacja projektu zostanie zablokowana.`

## Guard

```powershell
npm run verify:project-publication-readiness-v35
```

Guard sprawdza produkcyjne markery gotowości publikacji, UI box, akcje admina i active-only katalog publiczny.

## Test ręczny

1. Otwórz edycję projektu z brakującym hero/thumbnail/rzutem/dokumentacją.
2. Sprawdź box `Gotowość publikacji`.
3. Spróbuj ustawić status `active`.
4. Oczekiwany wynik: blokada z powodem.
5. Uzupełnij wymagane dane.
6. Sprawdź, czy box pokazuje OK.
7. Ustaw status `active`.
8. Oczekiwany wynik: publikacja przechodzi.

## Status

- ZIP przygotowany.
- Bez push do GitHuba.
- Test lokalny i Vercel: do wykonania po apply.
