# 07_NEXT_STEPS - nastepne kroki

## Najblizszy rekomendowany krok po Etapie 9

Wykonać ręczny test bezpieczeństwa delete w adminie na projekcie testowym: bez kodu projekt nie może zostać usunięty, z błędnym kodem akcja ma być zablokowana, a projekt `active` ma pokazać dodatkowe ostrzeżenie.

## Zasady dalszej pracy

- Nie usuwać realnych projektów produkcyjnych w testach.
- Fizyczne delete nadal istnieje, ale jest zabezpieczone kodem projektu i confirmem.
- Jeśli chcemy jeszcze bezpieczniejszy model, kolejnym etapem powinno być archived-first: zwykły panel tylko archiwizuje, a fizyczne delete zostaje jako osobna operacja awaryjna.
- Nie zmieniać routingu ani publicznych stron przy dalszym wzmacnianiu admina.

## Kolejne możliwe etapy

1. Runtime test Etapu 9 w panelu admina.
2. Archived-first zamiast bezpośredniego fizycznego delete.
3. Osobny audit log operacji admina.
4. Stabilny runtime test pełnej ścieżki `/koszyk` -> `/zamowienie` -> `/admin/zamowienia`.
