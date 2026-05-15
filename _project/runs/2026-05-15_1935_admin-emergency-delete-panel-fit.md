# Run report - 2026-05-15 19:35 - admin-emergency-delete-panel-fit

## Etap

Etap 15: Dopasowanie panelu awaryjnego usunięcia w tabeli projektów.

## Cel

Panel awaryjnego delete nie może ucinać tekstów ani rozpychać widoku `/admin/projekty`.

## Zmiany

- Etykieta `Awaryjne` -> `Awaryjne usunięcie`.
- Krótsza kopia panelu.
- Mniejszy panel i input.
- Zawijanie tekstów w panelu.
- Guard V19 pilnuje nowego układu i braku starej długiej kopii.

## Checki do uruchomienia

```powershell
npm run verify:admin-buttons-v19
npm run verify:admin-project-list-compact-v41
npm run typecheck
npm run build
npm run check:project-memory
```

## Ryzyka

- Jeśli w przyszłości do panelu dojdą długie instrukcje, trzeba będzie przenieść je na osobną stronę albo modal.
