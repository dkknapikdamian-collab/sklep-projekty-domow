# Run report - 2026-05-15 17:15 - archived-first-delete

## Etap

Etap 11: Archived-first zamiast fizycznego delete jako domyślna ścieżka.

## Cel

Zmniejszyć ryzyko katastrofy przez przeniesienie codziennej operacji z fizycznego delete na archiwizację.

## Zmiany

- Dodano `archiveProjectAction`.
- Dodano `AdminProjectArchiveForm`.
- W tabeli projektów widoczna jest akcja `Archiwizuj`.
- Fizyczny delete jest w strefie `Awaryjne`.
- Delete wymaga statusu `archived` albo `draft`.
- Delete nadal wymaga kodu projektu.
- Server action blokuje fizyczne usunięcie projektów active.
- Zaktualizowano guardy i pamięć projektu.

## Pliki zmienione

- `components/admin/AdminProjectDeleteForm.tsx`
- `components/admin/AdminProjectsTable.tsx`
- `app/admin/projekty/actions.ts`
- `app/admin/projekty/page.tsx`
- `app/admin-v8.css`
- `scripts/check-admin-buttons-v19.cjs`
- `_project/03_CURRENT_STAGE.md`
- `_project/04_DECISIONS.md`
- `_project/05_MANUAL_TESTS.md`
- `_project/06_GUARDS_AND_TESTS.md`
- `_project/07_NEXT_STEPS.md`
- `_project/08_CHANGELOG_AI.md`
- `_project/09_CONTEXT_FOR_OBSIDIAN.md`
- `_project/10_PROJECT_TIMELINE.md`

## Checki do uruchomienia

```powershell
npm run verify:admin-buttons-v19
npm run verify:admin-project-list-compact-v41
npm run verify:public-project-data-v22
npm run typecheck
npm run build
npm run check:project-memory
```

## Test ręczny

Sprawdzić `/admin/projekty` na projekcie testowym:
- `Archiwizuj` działa,
- active nie da się fizycznie usunąć,
- archived/draft wymaga kodu i confirmu do awaryjnego usunięcia.

## Ryzyka

- Nie testować fizycznego delete na realnym projekcie.
- Jeśli w przyszłości dodamy audit log, archive/delete powinny zapisywać autora i timestamp.
