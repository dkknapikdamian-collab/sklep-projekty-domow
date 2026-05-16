# STAGE27_ORDER_PUBLICATION_READINESS_RUNTIME_TEST

Status: WDROZONE W KODZIE / TEST AUTOMATYCZNY / TEST RECZNY DO WYKONANIA.
Data: 2026-05-16.

## Cel

Domknac Etap 27: sanity check publikacji projektu przez test automatyczny scenariuszy publikacji oraz naprawic luke, w ktorej pusty zestaw pomieszczen mogl przejsc walidacje.

## Fakty z kodu

- `lib/admin/project-publication-readiness.ts` jest zrodlem prawdy dla gotowosci publikacji projektu.
- `app/admin/projekty/actions.ts` uzywa `getProjectPublicationReadiness` przy probie ustawienia statusu `active`.
- Dotychczasowy guard statyczny `verify:project-publication-readiness-v35` potwierdzal markery, ale nie wykonywal scenariuszy runtime helpera.

## Zmiana

- `projectRooms` ma byc wymagane zawsze, a nie tylko wtedy, gdy `rooms.length > 0`.
- Dodano guard: `npm run verify:project-publication-readiness-runtime-v27`.

## Scenariusze guarda

Guard sprawdza:

- projekt bez hero nie przechodzi,
- projekt bez miniatury nie przechodzi,
- projekt bez rzutu nie przechodzi,
- projekt bez prywatnego PDF/dokumentacji nie przechodzi,
- projekt bez wariantu i bez potwierdzonego projektu podstawowego nie przechodzi,
- projekt bez pomieszczen nie przechodzi,
- projekt z pustymi nazwami pomieszczen nie przechodzi,
- kompletny projekt przechodzi,
- kompletny projekt podstawowy bez wariantow przechodzi tylko przy `baseVariantConfirmed: true`.

## Testy

Do uruchomienia po wdrozeniu:

```powershell
npm run verify:project-publication-readiness-v35
npm run verify:project-publication-readiness-runtime-v27
npm run typecheck
npm run build
npm run check:project-memory
```

## Test reczny

Status: TEST RECZNY DO WYKONANIA.

Na realnych danych Supabase sprawdzic:

- projekt bez hero nie przechodzi na active,
- projekt bez miniatury nie przechodzi,
- projekt bez rzutu nie przechodzi,
- projekt bez prywatnego PDF nie przechodzi,
- projekt bez pomieszczen nie przechodzi,
- kompletny projekt przechodzi,
- komunikaty brakow sa czytelne.

## Ryzyko

Guard scenariuszowy testuje helper lokalnie. Nie zastepuje recznego runtime testu z realnymi rekordami Supabase i UI admina.
