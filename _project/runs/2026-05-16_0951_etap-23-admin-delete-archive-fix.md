# Etap 23 - admin archive/delete runtime fix

## FAKTY Z KODU / PLIKOW
- Przeczytano aktywny kierunek z _project/01_PROJECT_GOAL.md.
- Dotknieto: app/admin/projekty/actions.ts, app/admin/projekty/[id]/edytuj/page.tsx, components/admin/AdminProjectDeleteForm.tsx, scripts/check-admin-buttons-v19.cjs, scripts/check-admin-audit-log-v44.cjs.
- Problem z runtime: panel blokowal hard delete dla active i wymagal archiwizacji/draftu, a na ekranie edycji nie bylo bezposredniej archiwizacji obok strefy usuwania.

## DECYZJE DAMIANA
- Damian zglosil: nie da sie usunac projektu; archiwizacja miga i nie daje widocznego efektu.

## WDROZONE
- Awaryjne trwale usuniecie jest teraz dozwolone dla kazdego statusu po wpisaniu kodu projektu.
- Active nadal ma mocny warning i confirm, ale nie blokuje guzika.
- Ekran edycji dostal przycisk archiwizacji w strefie usuwania.
- Archiwizacja moze wrocic na ekran edycji przez returnTo i pokazac komunikat archived=1.
- Guardy zmieniono z polityki "delete tylko archived/draft" na polityke "delete po kodzie projektu".

## TESTY AUTOMATYCZNE
- Do wykonania przez APPLY: verify:admin-buttons-v19, verify:admin-project-management-v18, verify:admin-audit-log-v44, typecheck, build, check:project-memory.

## TESTY RECZNE
- TEST RECZNY DO WYKONANIA: archiwizacja z ekranu edycji i listy projektow.
- TEST RECZNY DO WYKONANIA: trwale usuniecie projektu active po wpisaniu kodu i potwierdzeniu.

## BRAKI I RYZYKA
- Hard delete active jest celowo odblokowany, bo Damian potrzebuje operacji admina. Ryzyko ogranicza wpisanie kodu projektu, confirm i audit log.

## OBSIDIAN
- Obsidian ma dostac status, guardy, ryzyko i next step.
