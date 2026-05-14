# STAGE20_ADMIN_LIST_SEARCH_FILTER

## Cel
Zamienić wizualną atrapę wyszukiwarki i filtra statusu na liście `/admin/projekty` w działające filtrowanie lokalne po danych pobranych z Supabase.

## Zakres
- Nowy client component `AdminProjectsListClient` trzyma stan wyszukiwarki i filtra statusu.
- Wyszukiwarka filtruje po:
  - nazwie projektu,
  - kodzie `DP-YYYY-NNNN`,
  - slug,
  - statusie.
- Select statusu filtruje po `draft`, `active`, `hidden`, `archived` albo pokazuje wszystkie.
- Lista pokazuje licznik wyników i pusty stan dla braku dopasowań.
- Usunięto martwe pole `input` i martwy `select` z server page.

## Nie zmieniono
- Nie zmieniono źródła danych Supabase.
- Nie dodano Firestore/Firebase.
- Nie zmieniono zasad widoczności publicznej: publicznie pokazują się tylko projekty active.
- Nie zmieniono generatora kodów projektów.

## Guard
`scripts/check-admin-list-search-filter-v20.cjs`
