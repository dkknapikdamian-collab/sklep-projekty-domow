# 03_CURRENT_STAGE - Aktualny etap

## Etap aktualny

**Pełny mózg projektu sklepu z projektami domów.**

## Cel etapu

Uzupełnić pamięć projektu w repo aplikacji i w Obsidianie tak, żeby kolejny AI developer nie zgadywał:

- co budujemy,
- jaki jest zakres V1,
- co jest V2,
- co już zostało wdrożone,
- co zostało porzucone,
- jakie decyzje obowiązują,
- co jest hipotezą,
- jakie testy i guardy istnieją,
- co Damian potwierdził ręcznie,
- czego jeszcze nie wiadomo,
- jaki jest kolejny krok.

## Pliki do sprawdzenia przed dalszą pracą

- `AGENTS.md`,
- `_project/00_PROJECT_STATUS.md`,
- `_project/01_PROJECT_GOAL.md`,
- `_project/04_DECISIONS.md`,
- `_project/05_MANUAL_TESTS.md`,
- `_project/06_GUARDS_AND_TESTS.md`,
- `_project/07_NEXT_STEPS.md`,
- `_project/11_USER_CONFIRMED_TESTS.md`,
- `package.json`,
- `scripts/check-project-memory.cjs`,
- aktualne trasy aplikacji i panel admina.

## Czego nie ruszać w tym etapie

- UI,
- routing,
- logika produktu,
- checkout,
- model danych,
- panel admina,
- płatności,
- storage,
- style.

Ten etap jest dokumentacyjno-operacyjny: pamięć, guard, raporty, Obsidian.

## Kryterium zakończenia

Etap jest zakończony, gdy:

1. repo ma pełny `AGENTS.md`,
2. repo ma pełny folder `_project/`,
3. Obsidian ma sekcję `10_PROJEKTY/Sklep_projekty_domow/` z plikami nazwanymi `Sklep projekty domow`,
4. istnieje raport AI w repo i Obsidianie,
5. istnieje guard `scripts/check-project-memory.cjs`,
6. `npm run check:project-memory` działa,
7. dostępne `typecheck` i `build` zostały uruchomione albo brak komendy został zapisany w raporcie,
8. zmiany są skomitowane i wypchnięte albo błąd push jest zapisany.

## Następny etap po pamięci

Po zakończeniu pamięci projektu najrozsądniejszy kierunek to **Etap 10: stabilizacja przepływu katalog -> karta projektu -> koszyk -> checkout -> zamówienie**, bez dokładania nowych bajerów.

To nie jest jeszcze decyzja implementacyjna tego etapu, ale rekomendowany kolejny krok operacyjny.
