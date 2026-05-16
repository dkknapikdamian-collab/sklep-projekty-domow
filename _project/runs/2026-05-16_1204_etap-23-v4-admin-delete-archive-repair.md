# Etap 23 V4 - repair admin archive/delete runtime flow

## FAKTY Z KODU / PLIKOW
- Naprawa jest repair po nieudanych V23/V2/V3, bez git pull, na brudnym worktree.
- Dotknieto: actions.ts, edit page, AdminProjectDeleteForm, guard V19, guard V44, _project, Obsidian.

## DECYZJE DAMIANA
- Damian zglosil: nie da sie usunac projektu; archiwizacja tylko miga ekranem i nie daje efektu.

## WDROZONE
- Hard delete nie jest juz blokowany dla active, jezeli admin wpisze poprawny kod projektu.
- Delete ma ostrzezenie dla active i confirm, ale nie blokade.
- Ekran edycji ma przycisk archiwizacji w strefie usuwania.
- Archiwizacja przyjmuje returnTo i moze wracac na ekran edycji z archived=1.
- Guardy V19/V44 przestawiono z polityki archived/draft-only na kod projektu + audit.

## TESTY AUTOMATYCZNE
- Do wykonania przez APPLY V4: verify:admin-buttons-v19, verify:admin-project-management-v18, verify:admin-audit-log-v44, typecheck, build, check:project-memory.

## TESTY RECZNE
- TEST RECZNY DO WYKONANIA: archiwizacja z ekranu edycji.
- TEST RECZNY DO WYKONANIA: hard delete projektu active po kodzie.
- TEST RECZNY DO WYKONANIA: sprawdzenie wpisow /admin/audit.

## BRAKI I RYZYKA
- Operacja hard delete active jest destrukcyjna. Bezpieczniki: kod projektu, confirm, audit log.

## OBSIDIAN
- Zaktualizowac dashboard Sklep_projekty_domow, guardy i next step.
