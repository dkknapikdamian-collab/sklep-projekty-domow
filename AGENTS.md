# GLOBAL AGENTS.md - DAMIAN PROJECT WORKFLOW

## Core rule

Every project must maintain project memory.

Do not treat chat history as the source of truth.  
The source of truth must be project files.

Before working in any repository, first read:

- `AGENTS.md`
- `_project/00_PROJECT_STATUS.md` or `_project/00_STATUS.md`
- `_project/01_PROJECT_GOAL.md` or the project-specific goal file
- `_project/02_WORK_RULES.md`
- `_project/03_CURRENT_STAGE.md`
- `_project/04_DECISIONS.md`
- `_project/05_MANUAL_TESTS.md`
- `_project/06_GUARDS_AND_TESTS.md`
- `_project/07_NEXT_STEPS.md`
- `_project/08_CHANGELOG_AI.md`
- `_project/09_CONTEXT_FOR_OBSIDIAN.md`
- `_project/10_PROJECT_TIMELINE.md` if present

If these files do not exist, propose or create the project memory structure before feature work.

## Project memory standard

Every project should maintain:

- `AGENTS.md`
- `_project/00_PROJECT_STATUS.md`
- `_project/01_PROJECT_GOAL.md`
- `_project/02_WORK_RULES.md`
- `_project/03_CURRENT_STAGE.md`
- `_project/04_DECISIONS.md`
- `_project/05_MANUAL_TESTS.md`
- `_project/06_GUARDS_AND_TESTS.md`
- `_project/07_NEXT_STEPS.md`
- `_project/08_CHANGELOG_AI.md`
- `_project/09_CONTEXT_FOR_OBSIDIAN.md`
- `_project/10_PROJECT_TIMELINE.md`
- `_project/runs/`
- `_project/history/`

For business-idea repositories, use equivalent names, for example:

- `_project/00_STATUS.md`
- `_project/01_RULES_BUSINESS_IDEA_OPERATOR.md`
- `_project/02_SCORING_RUBRIC.md`
- `_project/03_CURRENT_RANKING.md`
- `_project/09_IDEA_TIMELINE.md`

## After every meaningful stage

Always update the relevant memory files:

### Always

- update `_project/08_CHANGELOG_AI.md`
- create a run report in `_project/runs/YYYY-MM-DD_HHMM_stage-name.md`
- update `_project/09_CONTEXT_FOR_OBSIDIAN.md`

### If the stage changed

- update `_project/03_CURRENT_STAGE.md`
- update `_project/07_NEXT_STEPS.md`

### If tests/checks changed

- update `_project/05_MANUAL_TESTS.md`
- update `_project/06_GUARDS_AND_TESTS.md`

### If project direction changed

- update `_project/01_PROJECT_GOAL.md`
- update `_project/04_DECISIONS.md`
- update `_project/10_PROJECT_TIMELINE.md`
- add a note in `_project/history/YYYY-MM-DD_direction-change.md`

### If a business idea was added or changed

- save it to the correct ideas folder
- update its status
- update the ranking if needed
- update decisions and next actions

## Work rules

- Work in small, controlled stages.
- Do not create new branches unless Damian explicitly asks.
- Do not push unless Damian explicitly asks.
- Do not perform broad unrelated refactors.
- Do not silently remove existing behavior.
- Do not leave fake success states.
- Do not hide errors.
- Do not invent completed work.
- Do not invent metrics, feedback, market reactions or publication results.
- Add or update guards/tests for important behavior.
- If a guard becomes obsolete because a feature was intentionally removed, update or remove the guard in the same change.
- Keep documentation and project memory synchronized with the actual state.

## Output after each stage

Always report:

- what changed,
- touched files,
- tests/guards run,
- what Damian should manually check,
- project memory files updated,
- remaining risks,
- next recommended step.

--- project-doc ---

# AGENTS.md - AI Working Contract

## Najwazniejsza zasada

Repozytorium jest zrodlem prawdy dla tego projektu. Czat nie jest zrodlem prawdy. Jesli decyzja, etap, test albo ryzyko ma miec znaczenie dla dalszej pracy, musi trafic do repo.

Projekt: `sklep-projekty-domow`.
Typ: aplikacja webowa / sklep-katalog projektow domow oparty o Next.js, React, TypeScript i Supabase.

## Zakres pracy agenta w tym projekcie

Agent ma:

- najpierw sprawdzic aktualny stan repo,
- pracowac tylko w zakresie aktualnego zadania,
- nie robic duzych refaktorow bez potrzeby,
- nie usuwac dzialajacych funkcji bez wyraznej decyzji,
- nie zmieniac UI, routingu, komponentow ani styli bez zakresu zadania,
- nie dodawac fikcyjnych projektow, zdjec ani ofert jako aktywnych danych produkcyjnych,
- dopisywac testy albo guardy do istotnych zmian,
- aktualizowac pamiec projektu po zakonczeniu wiekszej pracy.

## Zasada guardow

Jesli agent dodaje funkcje, przycisk, przeplyw, panel, status, wazny tekst, zrodlo danych albo krytyczna logike, ma dodac guard/test.

Jesli agent usuwa funkcje, przycisk, tekst albo stary mechanizm, ma tez usunac albo zaktualizowac guard/test, ktory tego pilnowal.

Nie wolno zostawiac martwych guardow, ktore sprawdzaja cos, czego juz nie ma.

## Czego nie wolno robic bez decyzji

- Nie zmieniaj logiki sklepu poza zakresem zadania.
- Nie zmieniaj UI bez decyzji.
- Nie ruszaj routingu bez decyzji.
- Nie usuwaj istniejacych testow ani guardow bez uzasadnienia.
- Nie dodawaj aktywnych fikcyjnych ofert.
- Nie ukrywaj bledow testow.
- Nie oznaczaj etapu jako zakonczonego, jesli testy wymagane dla etapu nie przeszly.

## Obsidian

`_project/09_CONTEXT_FOR_OBSIDIAN.md` jest indeksem/dashboardem dla Obsidiana. Nie jest nadrzednym zrodlem prawdy. Zrodlem prawdy pozostaje repo.
