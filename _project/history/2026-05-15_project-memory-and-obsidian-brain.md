<!-- SKLEP_PROJEKTY_DOMOW_MEMORY_V1_START -->
# Historia: wdrożenie pamięci projektu i Obsidian brain

## Data

2026-05-15

## Co się zmieniło

Projekt dostał formalny system pamięci:

- `AGENTS.md`,
- `_project/`,
- guard pamięci,
- Obsidian brain.

## Dlaczego

Czat nie może być źródłem prawdy. Przy rosnącym sklepie trzeba utrzymać decyzje, etapy, testy i potwierdzenia w plikach, żeby kolejny AI developer nie zgadywał kierunku.

## Co obowiązuje teraz

Każdy etap musi aktualizować pamięć projektu i Obsidian.

## Wpływ na aplikację

Brak wpływu na UI, routing i logikę produktu.

## Wpływ na testy

Dodano guard pamięci projektu:

```bash
npm run check:project-memory
```

Jeśli nie działa `npm`, użyć:

```bash
node scripts/check-project-memory.cjs
```
<!-- SKLEP_PROJEKTY_DOMOW_MEMORY_V1_END -->

