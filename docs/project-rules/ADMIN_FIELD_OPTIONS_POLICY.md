# Zasada pól wybieralnych w panelu admina

## Status

Obowiązuje od V14.

## Decyzja

Pola, które mają wpływ na katalog, wyszukiwarkę, filtry, porównywanie i podobne projekty, nie powinny być zwykłym wolnym tekstem.

Powinny mieć:

```txt
lista wyboru
+ opcja Dodaj ręcznie
```

## Dlaczego

Wolny tekst powoduje chaos:

```txt
Murowana
murowany
cegła
tradycyjna
technologia murowana
```

Dla człowieka to prawie to samo. Dla filtra to kilka różnych wartości.

## Pola, które powinny być wybieralne

### Obowiązkowo jako lista

- status
- badge główny
- badge dodatkowy
- typ / kondygnacja
- garaż
- dach
- technologia
- styl
- liczba kondygnacji
- kondygnacja pomieszczenia

### Zostają jako liczby

- cena
- powierzchnia użytkowa
- powierzchnia zabudowy
- liczba pokoi
- liczba łazienek
- szerokość działki
- długość działki
- wysokość budynku
- powierzchnia pomieszczenia

### Zostają jako tekst

- nazwa projektu
- slug
- podtytuł
- opis projektu
- cechy projektu
- wymiary pomieszczenia

## Podobne projekty

Docelowo pole `Podobne projekty` nie powinno być tylko ręcznie wpisywanym slugiem.

Właściwy model:

```txt
1. system automatycznie dobiera podobne projekty po parametrach
2. admin może ręcznie dopiąć albo nadpisać listę
```

Parametry do automatycznego doboru:

- typ / kondygnacja
- powierzchnia użytkowa
- liczba pokoi
- garaż
- dach
- styl
- technologia
- minimalna szerokość działki
- cena

## Zasada wdrożeniowa

Nowe pola stałe dodawane w przyszłości powinny iść do wspólnego źródła opcji, a nie jako przypadkowy tekst w komponencie.
