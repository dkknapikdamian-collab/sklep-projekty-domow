# 09_CONTEXT_FOR_OBSIDIAN - indeks projektu

## Projekt

`sklep-projekty-domow`

## Aktualny etap

Etap 10B: Blokada idealnego układu listy projektów i dopasowanie kolumny akcji.

## Ostatnia ważna zmiana

2026-05-15 16:45 Europe/Warsaw: zaakceptowany layout `/admin/projekty` został zachowany i zabezpieczony guardem. Poprawiono ostatni problem: `Ustaw active` nie powinno być ucinane po prawej stronie tabeli.

## Najważniejsze ustalenia

- obecny układ tabeli projektów jest docelowym układem desktopowym,
- kolumna `Akcje` musi mieścić pełny zestaw akcji w jednej linii,
- guard blokuje powrót do za wąskiej kolumny akcji,
- nie ruszać tego layoutu przy kolejnych etapach bez osobnej decyzji,
- mobile nadal używa kart.

## Pliki techniczne ważne dla Etapu 10B

- `../app/admin-v8.css`
- `../scripts/check-admin-project-list-compact-v41.cjs`

## Uwaga

Obsidian jest tylko indeksem/dashboardem. Źródłem prawdy pozostaje repo.
