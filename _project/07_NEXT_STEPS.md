# 07_NEXT_STEPS — następne kroki

## Najbliższe kroki po Etapie 0

1. Przejrzeć pamięć projektu i doprecyzować cel, jeśli repo nie daje pełnej odpowiedzi.
2. Uzupełnić aktualny etap projektu zgodnie z realnym stanem prac po kolejnym audycie.
3. Zmapować istniejące testy i guardy bardziej szczegółowo.
4. Dodać brakujące guardy do krytycznych obszarów projektu.
5. Sprawdzić zgodność panelu admina z publicznym katalogiem i kartą projektu.
6. Sprawdzić, czy przyciski admina mają realne handlery i czy odpowiadające guardy chronią te przepływy.
7. Sprawdzić, czy status projektu można zmieniać zgodnie z oczekiwanym workflow.
8. Sprawdzić, czy usuwanie projektu jest zabezpieczone przed przypadkowym użyciem i ma jasny guard.
9. Po każdej kolejnej zmianie aktualizować `_project/`.

## Następny rekomendowany etap

Etap 1: pełny audyt zgodności repo z pamięcią projektu oraz mapa guardów.

Cel Etapu 1:

- sprawdzić, czy istniejące guardy nadal pilnują aktualnych funkcji,
- wykryć martwe albo przestarzałe guardy,
- wykryć krytyczne przepływy bez guarda,
- rozpisać naprawy w pakietach wdrożeniowych.
