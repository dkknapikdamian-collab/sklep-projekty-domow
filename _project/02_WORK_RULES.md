# 02_WORK_RULES - zasady pracy

1. Repo jest zrodlem prawdy.
2. Czat nie jest zrodlem prawdy.
3. Przed praca przeczytaj `AGENTS.md` oraz pliki `_project`.
4. Nie zmieniaj zakresu zadania samowolnie.
5. Nie usuwaj funkcji bez decyzji.
6. Nie zmieniaj UI bez decyzji.
7. Nie dodawaj aktywnych fikcyjnych projektow ani ofert.
8. Kazda wieksza zmiana wymaga aktualizacji pamieci projektu.
9. Kazda istotna zmiana wymaga testu albo guarda.
10. Guardy musza byc aktualizowane razem z funkcja.
11. Jesli funkcja, przycisk, tekst albo przeplyw znika, odpowiadajacy guard tez musi zostac zmieniony albo usuniety.
12. Raport po pracy zapisuj w `_project/runs/`.
13. Jesli cos jest niejasne, wpisz to jako ryzyko albo pytanie, zamiast zgadywac.
14. Jesli projekt ma dzialajace testy, uruchamiaj je przed i po zmianie, o ile to mozliwe.
15. Nie zostawiaj repo w stanie czesciowo naprawionym bez opisu.
16. Nie ukrywaj bledow.
17. Nie oznaczaj etapu jako zakonczony, jesli wymagane testy albo guardy nie przeszly.
18. Nie dodawaj zaleznosci bez potrzeby i bez uzasadnienia.
19. Preferuj male, kontrolowane zmiany zamiast szerokich refaktorow.
20. W odpowiedzi koncowej podawaj konkretne pliki, testy i ryzyka.

## Globalny standard pamieci projektu od 2026-05-15

Kazdy sensowny etap pracy musi utrzymywac synchronizacje miedzy kodem, guardami i pamiecia projektu.

Zawsze po etapie:

- aktualizuj `_project/08_CHANGELOG_AI.md`,
- tworz raport w `_project/runs/YYYY-MM-DD_HHMM_stage-name.md`,
- aktualizuj `_project/09_CONTEXT_FOR_OBSIDIAN.md`.

Jesli etap sie zmienil:

- aktualizuj `_project/03_CURRENT_STAGE.md`,
- aktualizuj `_project/07_NEXT_STEPS.md`.

Jesli zmienily sie testy albo guardy:

- aktualizuj `_project/05_MANUAL_TESTS.md`,
- aktualizuj `_project/06_GUARDS_AND_TESTS.md`.

Jesli zmienil sie kierunek projektu:

- aktualizuj `_project/01_PROJECT_GOAL.md`,
- aktualizuj `_project/04_DECISIONS.md`,
- aktualizuj `_project/10_PROJECT_TIMELINE.md`,
- dodaj notatke w `_project/history/YYYY-MM-DD_direction-change.md`.

Nie wolno wymyslac metryk, feedbacku, reakcji rynku, publikacji ani zakonczonej pracy, ktora realnie nie zostala wykonana.
