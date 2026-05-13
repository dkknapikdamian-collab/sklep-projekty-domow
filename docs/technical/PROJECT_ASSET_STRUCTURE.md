# Struktura folderów i nazewnictwo plików projektów

## Decyzja

Dla każdego projektu tworzymy osobny folder oparty o stały kod projektu.

Kod projektu jest źródłem porządku.

Przykład:

```txt
DP-AUR-014
DP-MAL-006
DP-KLE-029
```

---

## Publiczne media

Publiczne media to pliki, które każdy może zobaczyć na stronie:

- wizualizacje,
- miniatury,
- rzuty poglądowe,
- elewacje poglądowe,
- przekroje poglądowe,
- zdjęcia wnętrz, jeśli występują.

Struktura:

```txt
/public/projects/DP-AUR-014/
  hero.jpg
  thumbnail.jpg
  gallery-01.jpg
  gallery-02.jpg
  gallery-03.jpg
  gallery-04.jpg
  interior-01.jpg
  interior-02.jpg
  floor-plan-ground.jpg
  floor-plan-floor.jpg
  floor-plan-roof.jpg
  section-aa.jpg
  section-bb.jpg
  elevation-front.jpg
  elevation-garden.jpg
  elevation-left.jpg
  elevation-right.jpg
```

Dla kolejnego projektu:

```txt
/public/projects/DP-MAL-006/
  hero.jpg
  thumbnail.jpg
  gallery-01.jpg
  gallery-02.jpg
  gallery-03.jpg
  floor-plan-ground.jpg
  floor-plan-roof.jpg
  section-aa.jpg
  elevation-front.jpg
  elevation-garden.jpg
```

---

## Prywatne pliki zakupowe

Prywatne pliki nie mogą być w publicznym folderze.

Prywatne:

- pełna dokumentacja PDF,
- paczka ZIP,
- kosztorys,
- plik do dodatku PDF na e-mail,
- dokumenty po zakupie.

Struktura logiczna:

```txt
/private/projects/DP-AUR-014/
  documentation-v1.pdf
  full-package-v1.zip
  cost-estimate-v1.pdf
  pdf-email-package-v1.pdf
```

W produkcji to może być:

- Supabase Storage,
- Cloudflare R2,
- Google Cloud Storage,
- własny serwer,
- inny prywatny storage.

Ale zasada zostaje ta sama:

```txt
publiczne media ≠ prywatne pliki zakupowe
```

---

## Stałe nazwy plików publicznych

Zalecane nazwy:

```txt
hero.jpg
thumbnail.jpg
gallery-01.jpg
gallery-02.jpg
gallery-03.jpg
gallery-04.jpg
gallery-05.jpg
interior-01.jpg
interior-02.jpg
floor-plan-ground.jpg
floor-plan-floor.jpg
floor-plan-roof.jpg
section-aa.jpg
section-bb.jpg
elevation-front.jpg
elevation-garden.jpg
elevation-left.jpg
elevation-right.jpg
```

## Stałe nazwy plików prywatnych

```txt
documentation-v1.pdf
documentation-v2.pdf
full-package-v1.zip
cost-estimate-v1.pdf
pdf-email-package-v1.pdf
```

---

## Dlaczego nie używać losowych nazw

Źle:

```txt
zdjecie123.jpg
dom-final-final2.png
rzut nowy poprawiony.jpg
pdf klient.pdf
```

Dobrze:

```txt
hero.jpg
gallery-01.jpg
floor-plan-ground.jpg
section-aa.jpg
documentation-v1.pdf
```

Stałe nazwy zmniejszają ryzyko błędów i ułatwiają automatyzację.

---

## Obrazy a dane

Obraz rzutu to tylko grafika.

Dane pomieszczeń muszą być zapisane osobno.

Nie wolno uznawać, że dane pomieszczeń „są na obrazku”, bo wtedy:

- nie da się ich filtrować,
- nie da się ich wyszukiwać,
- nie da się ich porównywać,
- nie da się ich łatwo poprawić,
- nie da się generować tabel.

Dane pomieszczeń zapisujemy w bazie lub demo data.

Przykład:

```ts
rooms: [
  {
    floor: "Parter",
    number: "1.01",
    name: "Wiatrołap",
    area: 4.2,
    dimensions: "2,10 × 2,00 m"
  }
]
```

---

## Mapowanie mediów w danych projektu

Projekt powinien mieć mapowanie mediów.

```ts
media: {
  hero: "/projects/DP-AUR-014/hero.jpg",
  thumbnail: "/projects/DP-AUR-014/thumbnail.jpg",
  gallery: [
    "/projects/DP-AUR-014/gallery-01.jpg",
    "/projects/DP-AUR-014/gallery-02.jpg"
  ],
  plans: [
    {
      title: "Rzut parteru",
      type: "floor_plan",
      url: "/projects/DP-AUR-014/floor-plan-ground.jpg"
    }
  ],
  elevations: [
    {
      title: "Elewacja frontowa",
      url: "/projects/DP-AUR-014/elevation-front.jpg"
    }
  ]
}
```

---

## Kryterium wdrożenia

Struktura jest wdrożona, gdy:

- każdy projekt demo ma osobny folder po kodzie,
- szablon karty projektu czyta media z danych,
- obrazki publiczne są w publicznym folderze,
- prywatne pliki nie są w publicznym folderze,
- nazwy plików są stałe,
- nie ma losowych nazw plików,
- dane pomieszczeń są osobno, nie tylko na rzutach.
