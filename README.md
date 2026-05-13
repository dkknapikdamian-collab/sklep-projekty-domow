# Sklep z projektami domów — dynamiczny szablon V3

Ten etap wdraża jedną dynamiczną kartę projektu dla wielu projektów.

## Co zostało zrobione

- `/` jako lekka strona startowa,
- `/projekty` jako katalog projektów demo,
- `/projekty/[slug]` jako dynamiczna karta projektu,
- minimum 3 projekty demo,
- foldery mediów po kodzie projektu:
  - `public/projects/DP-AUR-014/`
  - `public/projects/DP-MAL-006/`
  - `public/projects/DP-KLE-029/`
- stałe nazwy plików:
  - `hero.jpg`
  - `thumbnail.jpg`
  - `gallery-01.jpg`
  - `floor-plan-ground.jpg`
  - `section-aa.jpg`
  - `elevation-front.jpg`
- komponenty karty projektu,
- dodatki, w tym `PDF_EMAIL_PACKAGE`,
- zachowany kierunek wizualny karty referencyjnej.

## Uruchomienie

```powershell
npm install
npm run dev
```

Adresy:

```txt
http://localhost:3000
http://localhost:3000/projekty
http://localhost:3000/projekty/dom-w-aurorach-14
http://localhost:3000/projekty/dom-w-malinowkach-6
http://localhost:3000/projekty/dom-klejnot-29
```

## Co dalej

Następny etap:
- dopracowanie katalogu wizualnie pod design lock,
- potem koszyk i checkout na dynamicznych danych,
- potem baza i panel admina.
