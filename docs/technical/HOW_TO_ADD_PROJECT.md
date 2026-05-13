# Jak dodać projekt

## 1. Skopiuj szablon

Z:

```txt
content/projects/_TEMPLATE/project.json
```

Do:

```txt
content/projects/DP-AUR-014/project.json
```

## 2. Zmień dane

Wypełnij:

- code,
- shortCode,
- slug,
- name,
- subtitle,
- description,
- priceGross,
- parametry,
- pomieszczenia,
- dodatki,
- features.

## 3. Ustaw mediaBase

```json
"mediaBase": "/projects/DP-AUR-014"
```

## 4. Dodaj media

Do folderu:

```txt
public/projects/DP-AUR-014/
```

Nazwy:

```txt
hero.jpg
thumbnail.jpg
gallery-01.jpg
gallery-02.jpg
floor-plan-ground.jpg
floor-plan-roof.jpg
section-aa.jpg
section-bb.jpg
elevation-front.jpg
elevation-garden.jpg
elevation-left.jpg
elevation-right.jpg
```

## 5. Opublikuj

Dopiero gdy dane są prawdziwe:

```json
"status": "active"
```

## 6. Sprawdź

```txt
/projekty
/projekty/twoj-slug-projektu
```
