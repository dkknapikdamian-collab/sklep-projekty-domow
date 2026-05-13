# Dynamiczny szablon karty projektu

## Decyzja

Karta projektu, którą teraz budujemy wizualnie, ma być jednym dynamicznym szablonem dla wszystkich projektów.

Nie robimy osobnej strony ręcznie dla każdego domu.

Robimy jeden szablon:

```txt
/projekty/[slug]
```

Przykłady:

```txt
/projekty/dom-w-aurorach-14
/projekty/dom-w-malinowkach-6
/projekty/dom-klejnot-29
```

Ten sam szablon wyświetla różne dane:

- nazwę,
- kod projektu,
- cenę,
- opis,
- galerię,
- rzuty,
- elewacje,
- parametry,
- pomieszczenia,
- warianty,
- dodatki,
- podobne projekty,
- pliki prywatne po zakupie.

---

## Zasada główna

Szablon strony nie może mieć na sztywno wpisanego jednego projektu.

Źle:

```tsx
<h1>Dom w Aurorach 14</h1>
```

Dobrze:

```tsx
<h1>{project.name}</h1>
```

Źle:

```tsx
<Image src="/images/house-main.jpg" />
```

Dobrze:

```tsx
<Image src={project.media.hero} />
```

---

## Co jest szablonem

Szablonem są:

- układ strony,
- header,
- breadcrumb,
- duża galeria,
- prawy box zakupowy,
- kafle parametrów,
- zakładki,
- opis,
- rzuty,
- tabela pomieszczeń,
- podobne projekty.

Te elementy zostają stałe.

---

## Co się podmienia

Dla każdego projektu podmieniamy:

```txt
project.code
project.slug
project.name
project.subtitle
project.price
project.description
project.specs
project.rooms
project.media
project.variants
project.addons
project.files
project.relatedProjects
```

---

## Docelowy model adresów

Publiczny URL:

```txt
/projekty/[slug]
```

Wewnętrzny kod projektu:

```txt
DP-AUR-014
```

Przykład:

```txt
Nazwa: Dom w Aurorach 14
Kod: DP-AUR-014
Slug: dom-w-aurorach-14
URL: /projekty/dom-w-aurorach-14
```

Kod jest stały.  
Nazwa i slug mogą się zmienić, ale kod projektu musi zostać stabilny.

---

## Przykładowy obiekt projektu

```ts
{
  code: "DP-AUR-014",
  slug: "dom-w-aurorach-14",
  name: "Dom w Aurorach 14",
  subtitle: "Nowoczesny dom parterowy z garażem dwustanowiskowym",
  priceGross: 4290,
  status: "active",
  type: "Parterowy",
  style: "Nowoczesny",
  roof: "Czterospadowy",
  garage: "2 stanowiska",
  usableArea: 131.24,
  buildingArea: 172.25,
  roomsCount: 5,
  bathroomsCount: 2,
  floorsCount: 1,
  buildingHeight: 7.2,
  minPlotWidth: 22.6,
  minPlotLength: 28.0,
  technology: "Murowana",
  media: {
    hero: "/projects/DP-AUR-014/hero.jpg",
    thumbnail: "/projects/DP-AUR-014/thumbnail.jpg",
    gallery: [
      "/projects/DP-AUR-014/gallery-01.jpg",
      "/projects/DP-AUR-014/gallery-02.jpg",
      "/projects/DP-AUR-014/gallery-03.jpg"
    ],
    plans: [
      {
        type: "floor_plan",
        title: "Rzut parteru",
        url: "/projects/DP-AUR-014/floor-plan-ground.jpg"
      },
      {
        type: "roof_plan",
        title: "Rzut dachu",
        url: "/projects/DP-AUR-014/floor-plan-roof.jpg"
      },
      {
        type: "section",
        title: "Przekrój A-A",
        url: "/projects/DP-AUR-014/section-aa.jpg"
      }
    ],
    elevations: [
      {
        title: "Elewacja frontowa",
        url: "/projects/DP-AUR-014/elevation-front.jpg"
      }
    ]
  },
  rooms: [
    {
      floor: "Parter",
      number: "1.01",
      name: "Wiatrołap",
      area: 4.2,
      dimensions: "2,10 × 2,00 m"
    }
  ],
  addons: [
    {
      code: "PDF_EMAIL_PACKAGE",
      name: "Pakiet PDF na e-mail",
      priceGross: 250
    }
  ]
}
```

---

## Dlaczego to ważne

Bez dynamicznego szablonu powstałyby ręcznie robione strony dla każdego projektu. To szybko stworzy chaos:

- trudne poprawki,
- różne style,
- błędy w cenach,
- brak spójności,
- trudne filtrowanie,
- trudne SEO,
- trudny panel admina.

Dynamiczny szablon pozwala zrobić raz dobry układ i zasilać go danymi.

---

## Kryterium zakończenia etapu

Etap jest zakończony, gdy:

- istnieje trasa `/projekty/[slug]`,
- jedna karta projektu obsługuje minimum 3 różne projekty demo,
- zmiana danych projektu zmienia widok bez zmiany kodu komponentu,
- media są pobierane z obiektu projektu,
- parametry są pobierane z obiektu projektu,
- tabela pomieszczeń jest pobierana z danych,
- dodatki są pobierane z danych,
- nie ma na sztywno wpisanego jednego projektu w komponentach szablonu.
