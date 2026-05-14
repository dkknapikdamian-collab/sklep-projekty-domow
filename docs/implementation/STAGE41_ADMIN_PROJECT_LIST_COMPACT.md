# STAGE41_ADMIN_PROJECT_LIST_COMPACT

## Cel

Lista projektów w panelu admina ma być czytelna jako jedna kompaktowa linia na projekt. Po dodaniu kolumn z gotowością, mediami i pomieszczeniami tabela zaczęła łamać treść na kilka linii, co utrudnia szybki przegląd.

## Zakres

- `app/admin-v8.css` — kompaktowe style tylko dla `.admin-projects-table`.
- `scripts/check-admin-project-list-compact-v41.cjs` — guard chroniący przed powrotem wielowierszowego, rozjechanego układu.
- `package.json` — `verify:admin-project-list-compact-v41` dopięty do głównego `verify`.

## Założenia UI

- Jedna linia na projekt.
- Małe, czytelne komórki.
- Brak łamania kodu projektu, daty, linku i badge’y.
- Przy nadmiarze tekstu stosujemy ellipsis zamiast rozpychania wiersza.
- Tabela może mieć poziomy scroll w panelu, bo to jest widok administracyjny z wieloma kolumnami.

## Test ręczny

1. Wejdź w `/admin/projekty`.
2. Sprawdź, czy jeden projekt zajmuje jedną kompaktową linię.
3. Sprawdź, czy kod projektu nie łamie się na kilka linii.
4. Sprawdź, czy statusy/badge są w jednej linii.
5. Sprawdź, czy link publiczny i aktualizacja nie rozwalają wysokości wiersza.

## Guard

`npm run verify:admin-project-list-compact-v41`
