# Stage 14 — admin select options

## Cel

Ograniczyć chaos w danych projektów przez zastąpienie części pól wolnego tekstu listami wyboru.

## Wdrożone listy

- badgePrimary
- badgeSecondary
- type
- garage
- roof
- technology
- style
- floorsCount
- room.floor

## Mechanizm

Komponent:

```txt
components/admin/SelectWithCustom.tsx
```

Działa tak:

```txt
wybór z listy → zapisuje wartość
Dodaj ręcznie → pokazuje pole custom i zapisuje ręczną wartość
```

## Zostawione jako tekst/liczba

Nie wszystko powinno być listą. Opis, nazwa, slug, wymiary, metraże i cena zostają polami ręcznymi/liczbowymi.

## Następny etap

`Podobne projekty` powinny dostać osobną logikę automatycznego doboru po parametrach + ręczna nadpiska admina.
