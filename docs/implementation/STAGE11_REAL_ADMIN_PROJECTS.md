# Stage 11 — Real admin project creation

## Cel

Panel admina ma realnie dodawać projekty do Supabase.

## Pola projektu w adminie

### Dane podstawowe

- code
- shortCode
- slug
- name
- subtitle
- description
- status

### Sprzedaż

- priceGross
- badgePrimary
- badgeSecondary
- variants
- addons

### Parametry techniczne

- usableArea
- buildingArea
- roomsCount
- bathroomsCount
- floorsCount
- buildingHeight
- minPlotWidth
- minPlotLength
- type
- style
- roof
- garage
- technology

### Pomieszczenia

- floor
- number
- name
- area
- dimensions

### Media publiczne

Bucket:

```txt
project-media
```

Pliki:

- hero.jpg
- thumbnail.jpg
- gallery-01.jpg
- floor-plan-ground.jpg
- floor-plan-roof.jpg
- section-aa.jpg
- section-bb.jpg
- elevation-front.jpg
- elevation-garden.jpg

### Pliki prywatne

Bucket:

```txt
project-private-files
```

Pliki:

- documentation-v1.pdf
- full-package-v1.zip
- pdf-email-package-v1.pdf

## Publiczny katalog

Publiczny katalog czyta aktywne projekty z Supabase.

Jeśli Supabase nie jest skonfigurowany, zostaje lokalny fallback.

## Bezpieczeństwo

Projekt publiczny tylko gdy:

```txt
status = active
```

Prywatne pliki nigdy nie są publiczne.
