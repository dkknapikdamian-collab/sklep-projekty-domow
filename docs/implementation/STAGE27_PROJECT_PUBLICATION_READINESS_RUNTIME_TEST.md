# STAGE27_PROJECT_PUBLICATION_READINESS_RUNTIME_TEST

Data: 2026-05-16
Status: WDROZONE W KODZIE / TEST AUTOMATYCZNY / TEST RECZNY DO WYKONANIA

## Cel

Domkniecie Etapu 27 przez dodanie scenariuszowego guarda publikacji projektu oraz naprawe luki, w ktorej `rooms: []` moglo nie dodac checka `projectRooms`.

## Zakres

- `lib/admin/project-publication-readiness.ts`
- `scripts/check-project-publication-runtime-v27.cjs`
- `package.json`
- `_project/`
- Obsidian

## Co pilnuje guard

`npm run verify:project-publication-runtime-v27` sprawdza:

- kompletny projekt przechodzi publikacje,
- projekt bez hero jest blokowany,
- projekt bez miniatury jest blokowany,
- projekt bez rzutu jest blokowany,
- projekt bez prywatnego PDF/dokumentacji jest blokowany,
- projekt bez wariantu i bez potwierdzonego projektu podstawowego jest blokowany,
- projekt bez nazwanych pomieszczen jest blokowany,
- komunikaty brakow sa czytelne,
- akcja admina sprawdza readiness przed ustawieniem `active`,
- guard jest podpiety w `package.json` i glownym `verify`.

## Status reczny

TEST RECZNY DO WYKONANIA.

Do sprawdzenia na realnych danych Supabase:

1. Projekt bez hero nie przechodzi na `active`.
2. Projekt bez miniatury nie przechodzi na `active`.
3. Projekt bez rzutu nie przechodzi na `active`.
4. Projekt bez prywatnego PDF/dokumentacji nie przechodzi na `active`.
5. Projekt bez pomieszczen nie przechodzi na `active`.
6. Kompletny projekt przechodzi na `active`.
7. Komunikaty brakow sa czytelne w adminie.

## Ryzyko

Guard automatyczny testuje helper i kontrakt akcji admina. Nie potwierdza runtime Supabase, storage ani realnego UI po kliknieciu w panelu admina.
