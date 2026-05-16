# 12_IMPLEMENTATION_LEDGER - Sklep projekty domow

## Ledger

Kazdy etap zapisuje: data, zakres, pliki, decyzje, testy, ryzyka, wynik i nastepny krok.

## 2026-05-16 - Roadmapa produkcyjna i odhaczanie etapow

| Pole | Wartosc |
|---|---|
| Typ | project memory / Obsidian / roadmapa produkcyjna |
| Dlaczego | Damian wymaga odhaczania tego, co wdrozone, przetestowane guardami i potwierdzone recznie |
| Zmieniono | `_project/16_PRODUCTION_ROADMAP_AND_ACCEPTANCE.md`, `_project/15_ACTIVE_SOURCE_MAP.md`, `_project/07_NEXT_STEPS.md`, `_project/08_CHANGELOG_AI.md`, `_project/09_CONTEXT_FOR_OBSIDIAN.md`, `_project/10_PROJECT_TIMELINE.md`, Obsidian dashboard i nowa notatka roadmapy |
| Nie zmieniono | kod aplikacji, UI, checkout, routing, baza, guardy runtime |
| Guardy | nie uruchomiono lokalnie; zmiana przez GitHub API |
| Test reczny | TEST RECZNY DO WYKONANIA - sprawdzic Obsidian i nowy plik roadmapy |
| Ryzyko | brak lokalnego uruchomienia `check:project-memory` w tej sesji |
| Nastepny krok | Etap 22 - runtime audit admina |

## 2026-05-16 - Etap 21 real audit coverage V6

FAKT: dodano i zweryfikowano statycznie realne markery audit logu dla brakujacych mutacji admina.
TEST RECZNY DO WYKONANIA: runtime audit w /admin/audit po realnych operacjach admina.

## 2026-05-15 22:12:34 - full memory + Obsidian + repo V6

| Field | Value |
|---|---|
| Type | project memory / Obsidian / guard package |
| Why | prevent context loss across ChatGPT, Codex, AI developers and Obsidian |
| Changed | AGENTS.md, _project files, guard script, Obsidian dashboard |
| Not changed | app UI, routes, checkout, admin handlers, database schema |
| Tests | memory guard required, existing project-memory guard if present, build optional if present |
| Manual status | BRAK POTWIERDZONEGO TESTU for UI |
| Next | verify dashboard, then continue store implementation stages |
