# STAGE22B — Public catalog search/filter wiring

## Cel

Publiczny katalog `/projekty` i hero search ze strony głównej nie mogą być atrapą. Kontrolki mają realnie filtrować aktywne projekty z Supabase.

## Zakres

- Query params jako źródło filtrów.
- Server-side filtering na aktywnych projektach pobranych z `getPublicProjects()`.
- Filtry po:
  - `q`
  - `style`
  - `garage`
  - `type`
  - `technology`
  - `rooms`
  - `floors`
  - `areaFrom`
  - `areaTo`
- Opcje selectów budowane z realnych aktywnych projektów.
- Pusty stan dla braku wyników.
- Hero search kieruje do `/projekty`.
- Guard: `scripts/check-public-catalog-filters-v22b.cjs`.

## Decyzja

Na V22B filtracja działa po stronie serwera przez query params. To daje stabilne linki, prostą weryfikację i brak dodatkowego klientowego stanu.
