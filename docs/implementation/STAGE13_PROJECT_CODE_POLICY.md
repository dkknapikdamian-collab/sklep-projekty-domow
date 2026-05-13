# Stage 13 — project code policy

## Cel

Wymusić automatyczne kody projektów i zapisać zasadę w repo.

## Format

```txt
DP-YYYY-NNNN
```

Przykład:

```txt
DP-2026-0001
```

## Gdzie dane są zapisywane

Licznik:

```txt
public.project_code_counters
```

Projekt:

```txt
public.projects.code
```

## Zmiana względem wcześniejszego kierunku

Odrzucono ręczne skróty nazw typu `DP-MAL-014`.

Powód: admin nie ma pamiętać kodów, a sklep może w przyszłości obsługiwać różne typy projektów.

## Dodatkowo

Dodano zasadę zarządzania konfliktami decyzji w:

```txt
docs/project-rules/README.md
docs/project-rules/DECISION_LOG.md
```
