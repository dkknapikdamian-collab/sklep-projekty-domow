# AGENTS.md — AI Working Contract

## Najważniejsza zasada

Repozytorium jest źródłem prawdy dla tego projektu. Czat nie jest źródłem prawdy. Jeśli decyzja, etap, test albo ryzyko ma mieć znaczenie dla dalszej pracy, musi trafić do repo.

Projekt: `sklep-projekty-domow`.
Typ: aplikacja webowa / sklep-katalog projektów domów oparty o Next.js, React, TypeScript i Supabase.

## Pliki obowiązkowe przed pracą

Każdy agent AI, Codex, ChatGPT albo inny model przed zmianami ma przeczytać:

- `AGENTS.md`
- `_project/00_PROJECT_STATUS.md`
- `_project/01_PROJECT_GOAL.md`
- `_project/02_WORK_RULES.md`
- `_project/03_CURRENT_STAGE.md`
- `_project/04_DECISIONS.md`
- `_project/05_MANUAL_TESTS.md`
- `_project/06_GUARDS_AND_TESTS.md`
- `_project/07_NEXT_STEPS.md`

Dodatkowo po pracy ma aktualizować:

- `_project/03_CURRENT_STAGE.md`
- `_project/05_MANUAL_TESTS.md`
- `_project/06_GUARDS_AND_TESTS.md`
- `_project/08_CHANGELOG_AI.md`
- `_project/runs/`

## Zakres pracy agenta

Agent ma:

- najpierw sprawdzić aktualny stan repo,
- pracować tylko w zakresie aktualnego zadania,
- nie robić dużych refaktorów bez potrzeby,
- nie usuwać działających funkcji bez wyraźnej decyzji,
- nie zmieniać UI, routingu, komponentów ani styli bez zakresu zadania,
- nie dodawać fikcyjnych projektów, zdjęć ani ofert jako aktywnych danych produkcyjnych,
- dopisywać testy albo guardy do istotnych zmian,
- aktualizować pamięć projektu po zakończeniu większej pracy.

## Zasada guardów

Jeśli agent dodaje funkcję, przycisk, przepływ, panel, status, ważny tekst, źródło danych albo krytyczną logikę, ma dodać guard/test.

Jeśli agent usuwa funkcję, przycisk, tekst albo stary mechanizm, ma też usunąć albo zaktualizować guard/test, który tego pilnował.

Nie wolno zostawiać martwych guardów, które sprawdzają coś, czego już nie ma.

## Zasada oszczędzania tokenów

Agent ma:

- czytać najpierw pliki pamięci projektu,
- używać wyszukiwania po repo zamiast zgadywać,
- nie przepisywać dużych plików bez potrzeby,
- robić małe, kontrolowane zmiany,
- podawać konkretne pliki i konkretne wyniki testów,
- nie produkować długich opisów bez wartości.

## Po każdej większej zmianie

Po większej zmianie agent musi:

1. Zaktualizować `_project/03_CURRENT_STAGE.md`.
2. Zaktualizować `_project/05_MANUAL_TESTS.md`.
3. Zaktualizować `_project/06_GUARDS_AND_TESTS.md`.
4. Dopisać wpis w `_project/08_CHANGELOG_AI.md`.
5. Dodać raport w `_project/runs/YYYY-MM-DD_HHMM_stage-name.md`.
6. Uruchomić adekwatne checki, szczególnie `npm run check:project-memory`, jeśli dotyczy pamięci projektu.

## Czego nie wolno robić bez decyzji

- Nie zmieniaj logiki sklepu poza zakresem zadania.
- Nie zmieniaj UI bez decyzji.
- Nie ruszaj routingu bez decyzji.
- Nie usuwaj istniejących testów ani guardów bez uzasadnienia.
- Nie dodawaj aktywnych fikcyjnych ofert.
- Nie ukrywaj błędów testów.
- Nie oznaczaj etapu jako zakończonego, jeśli testy wymagane dla etapu nie przeszły.

## Obsidian

`_project/09_CONTEXT_FOR_OBSIDIAN.md` jest indeksem/dashboardem dla Obsidiana. Nie jest nadrzędnym źródłem prawdy. Źródłem prawdy pozostaje repo.
