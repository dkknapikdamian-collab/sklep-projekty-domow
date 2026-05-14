# Stage 20E — Admin CSS import cleanup

## Cel
Naprawić build po V20C/V20D bez cofania architektury V20.

## Problem
`app/globals.css` importował `./admin-real-v19.css`, ale ten plik był starym, nieśledzonym artefaktem z poprzednich paczek i został usunięty podczas sprzątania lokalnego repo. Build Next.js kończył się błędem `Module not found: Can't resolve './admin-real-v19.css'`.

## Decyzja
Nie przywracamy martwego CSS-a V19. Usuwamy import `admin-real-v19.css` i zostawiamy aktywną warstwę V20.

## Guard
Dodano `scripts/check-admin-css-imports-v20e.cjs`.

Guard sprawdza:
- `app/globals.css` nie importuje `admin-real-v19.css`,
- `app/globals.css` importuje `admin-real-v20.css`,
- każdy lokalny CSS importowany z `app/globals.css` faktycznie istnieje w folderze `app/`.

## Kryterium zakończenia
`npm run verify` przechodzi do końca, łącznie z `next build`.
