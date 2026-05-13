# Zasada pól wybieralnych w panelu admina

## Status

Obowiązuje od V14, zaktualizowane w V15.

## Decyzja

Pola, które mają wpływ na katalog, wyszukiwarkę, filtry, porównywanie i podobne projekty, nie powinny być zwykłym wolnym tekstem.

Powinny mieć:

```txt
lista wyboru
+ opcja Dodaj ręcznie
+ możliwość usunięcia własnej opcji
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

## Pola jako lista

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
- cechy projektu

## Cechy projektu

Cechy projektu nie powinny być jednym tekstowym polem.

Właściwy model:

```txt
kilka grup tematycznych
+ wybór gotowych cech
+ dodaj ręcznie
+ usuń wybrane / własne cechy
```

Grupy:

- układ i funkcja
- salon / kuchnia / strefa dzienna
- strefa nocna
- garaż i techniczne
- energooszczędność i komfort
- działka / taras / ogród
- efekt sprzedażowy

## Własne opcje

W V15 własne opcje są zapamiętywane lokalnie w przeglądarce admina przez `localStorage`.

Docelowo, gdy panel będzie miał więcej adminów albo większą skalę, własne słowniki opcji powinny trafić do Supabase, np.:

```txt
admin_option_dictionaries
admin_option_values
```

## Podobne projekty

Docelowo pole `Podobne projekty` nie powinno być tylko ręcznie wpisywanym slugiem.

Właściwy model:

```txt
1. system automatycznie dobiera podobne projekty po parametrach
2. admin może ręcznie dopiąć albo nadpisać listę
```
