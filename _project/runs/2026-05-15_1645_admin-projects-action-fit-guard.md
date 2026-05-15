# Run report - 2026-05-15 16:45 - admin-projects-action-fit-guard

## Etap

Etap 10B: Blokada idealnego układu listy projektów i dopasowanie kolumny akcji.

## Cel

Zachować zaakceptowany układ `/admin/projekty`, ale naprawić ucinanie przycisku `Ustaw active`.

## Zmiany

- Poszerzono kolumnę `Akcje` do `450px`.
- Zmieniono minimalną szerokość tabeli na `1640px`.
- Lekko skompresowano część kolumn informacyjnych.
- Zmniejszono gap akcji do `4px`.
- Zmniejszono font przycisków akcji do `10.25px`.
- Zaostrzono guard `verify:admin-project-list-compact-v41`.

## Pliki zmienione

- `app/admin-v8.css`
- `scripts/check-admin-project-list-compact-v41.cjs`
- `_project/03_CURRENT_STAGE.md`
- `_project/05_MANUAL_TESTS.md`
- `_project/06_GUARDS_AND_TESTS.md`
- `_project/07_NEXT_STEPS.md`
- `_project/08_CHANGELOG_AI.md`
- `_project/09_CONTEXT_FOR_OBSIDIAN.md`
- `_project/10_PROJECT_TIMELINE.md`

## Checki do uruchomienia

```powershell
npm run verify:admin-project-list-compact-v41
npm run verify:admin-buttons-v19
npm run typecheck
npm run build
npm run check:project-memory
```

## Test ręczny

Sprawdzić `/admin/projekty` na desktopie:
- układ zostaje jak na zaakceptowanym zrzucie,
- `Ustaw active` jest w pełni widoczne,
- akcje nie schodzą pionowo,
- tabela nie wraca do zawijania.

## Ryzyka

- Przy kolejnym dokładaniu akcji do tej kolumny trzeba będzie ponownie sprawdzić szerokość i guard.
