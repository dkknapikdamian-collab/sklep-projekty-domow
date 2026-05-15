# 07_NEXT_STEPS - nastepne kroki

## Najblizszy rekomendowany krok po Etapie 10B

Wykonać ręczny test `/admin/projekty` na desktopie. Jeśli układ wygląda jak na zaakceptowanym zrzucie i `Ustaw active` nie jest ucięte, zamykamy temat layoutu listy projektów.

## Zasady dalszej pracy

- Tego układu tabeli nie ruszać przy kolejnych etapach, chyba że Damian jawnie poprosi.
- Dla listy projektów admina obowiązuje wzorzec: pełna szerokość strony, jednowierszowe komórki, ellipsis dla długich wartości, akcje w jednej linii.
- Nie dodawać nowych przycisków do kolumny `Akcje` bez ponownego sprawdzenia szerokości i guarda.
- Długie treści w tabeli skracać przez ellipsis i `title`, nie przez łamanie wierszy.
- Widok mobilny zostawić jako karty.

## Kolejne możliwe etapy

1. Runtime test Etapu 10B w panelu admina.
2. Archived-first zamiast bezpośredniego fizycznego delete.
3. Osobny audit log operacji admina.
4. Stabilny runtime test pełnej ścieżki `/koszyk` -> `/zamowienie` -> `/admin/zamowienia`.
