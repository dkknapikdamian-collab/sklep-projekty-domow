# STAGE22 Public Project Data Parity

## Cel

Publiczne strony `/`, `/projekty`, `/projekty/[slug]` sa zasilane danymi Supabase i pokazuja tylko projekty `active`.

## Zakres

- `lib/project-repository.ts`
  - tylko odczyt z Supabase
  - filtr `status = active`
  - mapowanie `projects`, `project_rooms`, `project_variants`, `project_addons`, `project_media`, `project_files`
  - podobne projekty: `related_slugs` -> fallback scoring (typ, powierzchnia, styl, garaz, technologia)
- `/projekty/[slug]`
  - `notFound()` dla nieaktywnych/niedostepnych slugow
- karta projektu
  - pomieszczenia z `project_rooms`
  - warianty i dodatki z relacji
  - informacja o plikach prywatnych bez publicznych linkow
- admin
  - przycisk `Dodaj przykladowy projekt` na liscie projektow

## Guard

Dodano `scripts/check-public-project-data-v22.cjs` i script `verify:public-project-data-v22` w `package.json` oraz podpiecie do `npm run verify`.
