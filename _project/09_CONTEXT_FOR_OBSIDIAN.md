# 09_CONTEXT_FOR_OBSIDIAN - indeks projektu

## Projekt

`sklep-projekty-domow`

## Aktualny etap

Etap 11: Archived-first zamiast fizycznego delete jako domyślna ścieżka.

## Ostatnia ważna zmiana

2026-05-15 17:15 Europe/Warsaw: panel admina dostał bezpieczną ścieżkę `Archiwizuj`. Fizyczne `Usuń trwale` zostało przeniesione do strefy awaryjnej i jest blokowane dla projektów innych niż `archived` albo `draft`.

## Najważniejsze ustalenia

- codzienna praca admina nie wymaga fizycznego delete,
- standardowa ścieżka to `Archiwizuj`,
- projekt `active` trzeba najpierw zarchiwizować albo ustawić draft,
- `Usuń trwale` wymaga statusu `archived` albo `draft`, kodu projektu i confirmu,
- publiczny katalog pozostaje oparty wyłącznie o status `active`.

## Pliki techniczne ważne dla Etapu 11

- `../components/admin/AdminProjectDeleteForm.tsx`
- `../components/admin/AdminProjectsTable.tsx`
- `../app/admin/projekty/actions.ts`
- `../app/admin/projekty/page.tsx`
- `../scripts/check-admin-buttons-v19.cjs`

## Uwaga

Obsidian jest tylko indeksem/dashboardem. Źródłem prawdy pozostaje repo.
