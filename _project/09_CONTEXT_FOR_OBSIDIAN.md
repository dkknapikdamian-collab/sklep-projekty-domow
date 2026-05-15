# 09_CONTEXT_FOR_OBSIDIAN - indeks projektu

## Projekt

`sklep-projekty-domow`

## Aktualny etap

Etap 11 HOTFIX: Naprawa po nieudanym checku archived-first.

## Ostatnia ważna zmiana

2026-05-15 17:40 Europe/Warsaw: hotfix naprawia zduplikowany `projectStatusBeforeDelete` w `deleteProjectAction` oraz aktualizuje guard listy projektów do layoutu Etapu 11 (`1770px` / `620px`).

## Najważniejsze ustalenia

- Etap 11 pozostaje kierunkiem docelowym: archived-first.
- Fizyczne delete jest operacją awaryjną.
- Guardy muszą odzwierciedlać aktualny layout, nie poprzedni Etap 10B.
- Skrypty wdrożeniowe muszą przerywać pracę po błędzie checka, żeby nie commitować wadliwego kodu.

## Pliki techniczne ważne dla hotfixa

- `../app/admin/projekty/actions.ts`
- `../scripts/check-admin-project-list-compact-v41.cjs`

## Uwaga

Obsidian jest tylko indeksem/dashboardem. Źródłem prawdy pozostaje repo.
