# 05_MANUAL_TESTS — testy ręczne

## Test ręczny po Etapie 0

Sprawdź:

1. Czy istnieje `AGENTS.md`.
2. Czy istnieje folder `_project/`.
3. Czy istnieją wszystkie wymagane pliki `_project`:
   - `00_PROJECT_STATUS.md`
   - `01_PROJECT_GOAL.md`
   - `02_WORK_RULES.md`
   - `03_CURRENT_STAGE.md`
   - `04_DECISIONS.md`
   - `05_MANUAL_TESTS.md`
   - `06_GUARDS_AND_TESTS.md`
   - `07_NEXT_STEPS.md`
   - `08_CHANGELOG_AI.md`
   - `09_CONTEXT_FOR_OBSIDIAN.md`
4. Czy istnieje `_project/runs/.gitkeep`.
5. Czy istnieje raport `_project/runs/2026-05-14_2120_project-memory-foundation.md`.
6. Czy istnieje `scripts/check-project-memory.cjs`.
7. Czy `package.json` ma skrypt `check:project-memory`.
8. Czy check pamięci projektu przechodzi:

```powershell
npm run check:project-memory
```

## Wynik poprawny

- Komenda kończy się bez błędu.
- Terminal pokazuje:

```text
OK: project memory structure is complete.
```

## Wynik błędny

- Komenda pokazuje brakujące pliki albo brakujące odwołania w `AGENTS.md`.
- Wtedy nie wolno uznać Etapu 0 za zakończony.

## Kontrola treści

Przeczytaj:

- `AGENTS.md`
- `_project/00_PROJECT_STATUS.md`
- `_project/01_PROJECT_GOAL.md`
- `_project/02_WORK_RULES.md`

Sprawdź, czy nie ma tam fałszywych założeń o projekcie.
