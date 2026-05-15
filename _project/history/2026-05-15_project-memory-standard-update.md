# 2026-05-15 - aktualizacja standardu pamieci projektu

## Co sie zmienilo

Repo przyjelo nowszy globalny workflow Damiana dla pracy agentow AI.

## Najwazniejsze zasady

- Czat nie jest zrodlem prawdy.
- Zrodlem prawdy sa pliki projektu.
- Kazdy projekt powinien miec `AGENTS.md`, komplet `_project/00-10`, `_project/runs/` i `_project/history/`.
- Po kazdym sensownym etapie trzeba aktualizowac changelog, run report i kontekst dla Obsidiana.
- Zmiany kierunku projektu wymagaja wpisu w decyzjach, timeline i historii.

## Skutek

- Dodano `_project/10_PROJECT_TIMELINE.md`.
- Dodano `_project/history/`.
- Zaktualizowano `scripts/check-project-memory.cjs`, zeby pilnowal nowej struktury.
