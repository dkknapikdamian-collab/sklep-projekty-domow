# Wyszukiwarka i normalizacja

## Wymóg

Wyszukiwarka ma działać po:

- nazwie,
- kodzie projektu,
- metrażu,
- wymiarach domu,
- wymiarach/minimalnych wymiarach działki,
- szerokości działki,
- liczbie pokoi,
- garażu,
- typie domu,
- dachu,
- stylu,
- parametrach technicznych.

## Przykłady zapytań

```txt
aurora
DP-AUR-014
dom 100m2
dom 100 m² z garażem
parterowy 120 m2
działka 20x30
dzialka 20 x 30
szerokość działki 18
dom na wąską działkę
4 pokoje
garaż dwustanowiskowy
garaz 2
dach dwuspadowy
nowoczesna stodoła
mały dom do 90m2
```

## Normalizacja

Funkcja normalizacji ma:

- zamieniać na małe litery,
- usuwać polskie znaki,
- usuwać nadmiarowe spacje,
- normalizować myślniki,
- normalizować `m2`, `m²`, `m kw`, `metrów kwadratowych`,
- zamieniać przecinek w liczbach na kropkę,
- rozpoznawać `20x30`, `20 x 30`, `20/30`,
- rozpoznawać `do 100m2`, `od 100 do 140`.

## Aliasy

```txt
dzialka = działka
garaz = garaż
pietrowy = piętrowy
parter = parterowy
poddasze = z poddaszem
dwustanowiskowy = garaż 2
jednostanowiskowy = garaż 1
m2 = m²
m kw = m²
```

## Minimalna wersja

- normalizacja w TypeScript,
- search po `normalized_text`,
- filtry po polach liczbowych,
- specjalne traktowanie kodu projektu,
- sortowanie po trafności bazowej.
