# Następny etap: dynamiczny szablon projektu

## Cel

Przerobić obecną kartę projektu z widoku jednego projektu na dynamiczny szablon obsługujący wiele projektów.

---

## Pliki do sprawdzenia

Aktualnie:

```txt
app/page.tsx
data/project.ts
app/globals.css
public/images/
```

Docelowo:

```txt
app/page.tsx
app/projekty/page.tsx
app/projekty/[slug]/page.tsx
components/project/
data/projects.ts
public/projects/DP-AUR-014/
public/projects/DP-MAL-006/
public/projects/DP-KLE-029/
```

---

## Zmień

### 1. Dane

Zamień pojedynczy plik:

```txt
data/project.ts
```

na:

```txt
data/projects.ts
```

W `projects.ts` ma być tablica minimum 3 projektów demo.

Każdy projekt musi mieć:

- code,
- slug,
- name,
- price,
- description,
- specs,
- rooms,
- media,
- variants,
- addons,
- relatedProjects.

---

### 2. Trasy

Dodać:

```txt
app/projekty/page.tsx
app/projekty/[slug]/page.tsx
```

`app/projekty/[slug]/page.tsx` ma pobierać projekt po `slug`.

---

### 3. Komponenty

Rozbić obecną kartę na komponenty:

```txt
components/project/ProjectDetailPage.tsx
components/project/ProjectHeader.tsx
components/project/ProjectGallery.tsx
components/project/ProjectPurchaseBox.tsx
components/project/ProjectStatsStrip.tsx
components/project/ProjectTabs.tsx
components/project/ProjectPlansGrid.tsx
components/project/RelatedProjects.tsx
```

---

### 4. Foldery mediów

Dodać strukturę:

```txt
public/projects/DP-AUR-014/
public/projects/DP-MAL-006/
public/projects/DP-KLE-029/
```

Każdy folder powinien mieć minimum:

```txt
hero.jpg
thumbnail.jpg
gallery-01.jpg
gallery-02.jpg
floor-plan-ground.jpg
floor-plan-roof.jpg
section-aa.jpg
elevation-front.jpg
```

Na start mogą być placeholdery/demo obrazy, ale nazwy mają być finalne.

---

### 5. Media z danych

Nie wolno już używać globalnych ścieżek typu:

```txt
/images/house-main.jpg
```

Zamiast tego:

```tsx
<Image src={project.media.hero} />
```

---

### 6. Dodatki

Dodatek PDF na e-mail ma zostać w danych każdego projektu:

```ts
{
  code: "PDF_EMAIL_PACKAGE",
  name: "Pakiet PDF na e-mail",
  priceGross: 250
}
```

---

## Nie zmieniaj

- design lock,
- kolorystyki,
- układu karty projektu,
- prawego boxa zakupowego,
- wyglądu galerii,
- wyglądu kafli parametrów,
- stylu zakładek.

---

## Po wdrożeniu sprawdź

1. `/` działa.
2. `/projekty` działa.
3. `/projekty/dom-w-aurorach-14` działa.
4. `/projekty/dom-w-malinowkach-6` działa.
5. `/projekty/dom-klejnot-29` działa.
6. Każdy projekt ma inną nazwę.
7. Każdy projekt ma inne parametry.
8. Każdy projekt ma inne media z własnego folderu.
9. Dodatki liczą się per projekt.
10. Nie ma twardo wpisanego jednego projektu w komponencie strony.

---

## Kryterium zakończenia

Etap jest zakończony, gdy jedna karta projektu obsługuje minimum 3 różne projekty demo, a wszystkie dane i media są podstawiane z danych projektu.
