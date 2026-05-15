# 09_CONTEXT_FOR_OBSIDIAN - indeks projektu

## Projekt

`sklep-projekty-domow`

## Aktualny etap

Etap 10: Responsywny, pełnoszeroki layout listy projektów w panelu admina.

## Ostatnia ważna zmiana

2026-05-15 16:15 Europe/Warsaw: lista `/admin/projekty` została dostosowana do ekranów desktopowych. Strona dostała pełnoszeroki shell, tabela ma własny poziomy overflow, komórki są jednowierszowe z ellipsis, a akcje w tabeli nie układają się już pionowo.

## Najważniejsze ustalenia

- dla data-dense widoków admina nie używamy ciasnego kontenera marketingowego,
- desktop: pełna szerokość strony + tabela z kontrolowanym poziomym overflow,
- długie teksty w tabeli skracamy `ellipsis` i pokazujemy pełną wartość przez `title`,
- mobile: karty zamiast tabeli,
- layout nie zmienia logiki admina, statusów, delete ani Supabase.

## Pliki techniczne ważne dla Etapu 10

- `../app/admin/projekty/page.tsx`
- `../components/admin/AdminProjectsTable.tsx`
- `../app/admin-v8.css`
- `../scripts/check-admin-project-list-compact-v41.cjs`

## Uwaga

Obsidian jest tylko indeksem/dashboardem. Źródłem prawdy pozostaje repo.
