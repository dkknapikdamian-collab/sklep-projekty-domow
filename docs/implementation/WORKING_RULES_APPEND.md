# Dopisek do zasad pracy

## Jedna karta projektu, wiele projektów

Od teraz karta projektu jest traktowana jako szablon.

Nie wolno tworzyć osobnych ręcznych stron:

```txt
dom-w-aurorach-14.tsx
dom-w-malinowkach-6.tsx
```

Zamiast tego:

```txt
/projekty/[slug]
```

## Folder projektu po kodzie

Każdy projekt ma folder mediów po kodzie:

```txt
public/projects/DP-AUR-014/
```

Kod projektu jest stabilny i nie powinien się zmieniać.

## Publiczne i prywatne osobno

Publiczne:

```txt
public/projects/DP-AUR-014/
```

Prywatne:

```txt
private/projects/DP-AUR-014/
```

albo odpowiednik w storage/chmurze.

## Dane osobno od obrazów

Nie wolno trzymać kluczowych danych tylko na obrazku rzutu.

Dane mają być w bazie/demo data:

- powierzchnie,
- pomieszczenia,
- wymiary,
- parametry,
- cena,
- działka,
- dodatki.
