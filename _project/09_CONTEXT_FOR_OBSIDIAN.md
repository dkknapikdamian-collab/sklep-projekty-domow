# 09_CONTEXT_FOR_OBSIDIAN - indeks projektu

## Projekt

`sklep-projekty-domow`

## Aktualny etap

Etap 15: Dopasowanie panelu awaryjnego usunięcia w tabeli projektów.

## Ostatnia ważna zmiana

2026-05-15 19:35 Europe/Warsaw: panel `Awaryjne usunięcie` w `/admin/projekty` został zmniejszony i dostał zawijanie tekstów, żeby nie rozjeżdżał tabeli i nie ucinał treści.

## Najważniejsze ustalenia

- etykieta ma brzmieć `Awaryjne usunięcie`,
- panel ma być mały i techniczny,
- długie ostrzeżenia nie pasują do komórki tabeli,
- fizyczne delete zostaje operacją awaryjną,
- logika archiwizacji/delete po stronie server action nie została zmieniona.

## Pliki techniczne ważne dla Etapu 15

- `../components/admin/AdminProjectDeleteForm.tsx`
- `../app/admin-v8.css`
- `../scripts/check-admin-buttons-v19.cjs`

## Uwaga

Obsidian jest tylko indeksem/dashboardem. Źródłem prawdy pozostaje repo.
