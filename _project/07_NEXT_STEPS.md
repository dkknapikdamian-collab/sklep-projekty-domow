# 07_NEXT_STEPS - nastepne kroki

## Najblizszy rekomendowany krok po Etapie 15

Wykonać ręczny test `/admin/projekty`: rozwinąć `Awaryjne usunięcie` przy projekcie archived i active, sprawdzić czy panel mieści się w tabeli i czy teksty nie są ucięte.

## Zasady dalszej pracy

- Nie rozbudowywać destrukcyjnego panelu w tabeli o długie teksty.
- Długie ostrzeżenia przenosić na osobną stronę albo skracać.
- W tabeli projektów nadal obowiązuje jednowierszowy layout, wyjątkiem jest tylko rozwinięty panel awaryjnego delete.
- Fizyczne delete zostaje operacją awaryjną, nie codzienną.

## Kolejne możliwe etapy

1. Runtime test Etapu 15.
2. Dodać filtr `Zarchiwizowane` w liście projektów.
3. Runtime test pełnej ścieżki zamówienia V1.
4. Widok audit logu `/admin/audit`.
