# 07_NEXT_STEPS - nastepne kroki

## Najblizszy rekomendowany krok po Etapie 11

Wykonać ręczny test archived-first w `/admin/projekty` na projekcie testowym: `Archiwizuj` ma być standardową ścieżką, a `Usuń trwale` ma być dostępne tylko w strefie awaryjnej i tylko dla `archived` albo `draft`.

## Zasady dalszej pracy

- Nie używać fizycznego delete jako codziennej operacji admina.
- Przy pracy operacyjnej projekty mają być archiwizowane.
- Fizyczne delete traktować jako awaryjne sprzątanie danych testowych albo błędnych rekordów.
- Nie usuwać realnych projektów produkcyjnych w testach.
- Nie dodawać nowych akcji destrukcyjnych bez server-side guardów.

## Kolejne możliwe etapy

1. Runtime test Etapu 11 w panelu admina.
2. Osobny audit log operacji admina.
3. Stabilny runtime test pełnej ścieżki `/koszyk` -> `/zamowienie` -> `/admin/zamowienia`.
4. Uporządkowanie filtrów admina, żeby łatwo pokazywać/ukrywać archived.
