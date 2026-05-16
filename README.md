# Sklep z projektami domów — production pages V5

To jest produkcyjny format strony sklepu z projektami domów, bez fikcyjnych zdjęć i bez fikcyjnych aktywnych projektów.

## Co zawiera

- strona główna zgodna z obranym kierunkiem wizualnym,
- katalog projektów,
- dynamiczna karta projektu `/projekty/[slug]`,
- koszyk pusty/produkcyjny shell,
- checkout produkcyjny shell,
- folder `content/projects/` do dodawania realnych projektów,
- folder `public/projects/` do dodawania mediów projektu po kodzie,
- szablon JSON projektu,
- placeholdery wizualne zamiast zdjęć, jeśli nie dodasz plików,
- guard sprawdzający źródło danych.

## Najważniejsza zasada

Nie ma aktywnych projektów przykładowych.  
Projekt pojawi się na stronie dopiero, gdy dodasz folder w `content/projects/`, wypełnisz prawdziwe dane i ustawisz:

```json
"status": "active"
```

## Jak dodać projekt

1. Utwórz folder danych:

```txt
content/projects/DP-AUR-014/project.json
```

2. Utwórz folder mediów:

```txt
public/projects/DP-AUR-014/
```

3. Dodaj pliki mediów, jeśli je masz:

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

4. Uruchom:

```powershell
npm run dev
```

5. Projekt pojawi się pod:

```txt
/projekty/[slug]
```

oraz w katalogu `/projekty`.

## Bez zdjęć

Jeżeli dodasz projekt bez zdjęć, strona pokaże eleganckie placeholdery w docelowym układzie.  
Dzięki temu można testować dane bez wrzucania obrazów.

## Etap 29 — pre-release checklist V1

Etap 29 jest bramką pre-release, a nie wdrożeniem płatności, faktur, panelu klienta ani automatycznej wysyłki.

Cel: sprawdzić, czy V1 może być użyte do testowej sprzedaży realnego projektu bez udawania automatyzacji, której jeszcze nie ma.

Checklist znajduje się w:

```txt
_project/16_PRODUCTION_READINESS_CHECKLIST.md
```

Guard:

```powershell
npm run verify:production-readiness-v52
```

Pełna weryfikacja:

```powershell
npm run verify
```

Minimalny runtime test ręczny po etapach 22-28:

```txt
realny projekt active -> karta projektu -> koszyk -> checkout/zamówienie -> admin zamówień -> audit log -> checklist -> Obsidian
```

## Uruchomienie

```powershell
npm install
npm run dev
```

## Weryfikacja

```powershell
npm run verify
```
