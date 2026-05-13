# ADR-0002 — Automatyczne generowanie kodów projektów

## Status

Accepted.

## Decyzja

Kody projektów generuje system.

Format:

```txt
DP-YYYY-NNNN
```

Przykład:

```txt
DP-2026-0001
```

## Przechowywanie

Licznik:

```txt
public.project_code_counters
```

Projekt:

```txt
public.projects.code
```

## Dlaczego

Kod projektu ma być stabilnym identyfikatorem, nie nośnikiem kategorii ani nazwy.

Kategorie, typ budynku, styl i przeznaczenie powinny być osobnymi polami.

## Konflikt z wcześniejszym kierunkiem

Wcześniejszy kierunek `DP-MAL-014` zostaje zastąpiony przez format automatyczny.

Zmiana jest zapisana w:

```txt
docs/project-rules/DECISION_LOG.md
```
