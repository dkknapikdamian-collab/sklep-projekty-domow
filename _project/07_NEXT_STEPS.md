# 07_NEXT_STEPS - nastepne kroki

## Najblizszy rekomendowany krok po Etapie 10

Wykonać ręczny test `/admin/projekty` na desktopie i średniej szerokości okna. Najważniejsze: tabela ma używać prawie całego ekranu, wiersze mają być jednowierszowe, a akcje nie mogą układać się pionową kolumną.

## Zasady dalszej pracy

- Nie zmieniać już logiki admina podczas poprawiania samego layoutu.
- Nie przebudowywać całego panelu admina, jeśli problem dotyczy tylko listy projektów.
- Dla ekranów desktopowych stosować wzorzec: pełna szerokość strony + tabela z własnym poziomym overflow.
- Długie treści w tabeli skracać przez ellipsis i `title`, nie przez łamanie wierszy.
- Widok mobilny zostawić jako karty, nie wciskać tabeli na telefon.

## Kolejne możliwe etapy

1. Runtime test Etapu 10 w panelu admina.
2. Archived-first zamiast bezpośredniego fizycznego delete.
3. Osobny audit log operacji admina.
4. Stabilny runtime test pełnej ścieżki `/koszyk` -> `/zamowienie` -> `/admin/zamowienia`.
