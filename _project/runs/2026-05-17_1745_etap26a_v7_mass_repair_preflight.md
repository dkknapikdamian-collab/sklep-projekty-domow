# 2026-05-17 17:45 - Etap 26A V7 mass repair + preflight paczek

## Status

NAPRAWA TECHNICZNA PACZKI / DO URUCHOMIENIA LOKALNIE / BEZ PUSHU AI.

## FAKTY

- V5 przeszło guardy 26A, private fulfillment i publication readiness.
- Typecheck padł na `lib/admin/project-publication-readiness.ts` przez rozbity template literal w `getProjectPublicationErrorMessage`.
- V6 nie doszło do aplikacji, bo `apply_v6.cjs` miało markdown/backticki jako nieucieczony kod JS.

## DECYZJA PROCESOWA

Od V7 paczki naprawcze mają mieć preflight:
- `node --check` na skryptach paczki przed apply,
- długie notatki jako pliki payload, nie jako inline markdown w JS,
- `node --check` na `scripts/*.cjs`,
- focused guardy,
- `typecheck`,
- `build`.

## ZMIANY

- Naprawa `getProjectPublicationErrorMessage`.
- Utrzymanie wyłączenia `_backup_local` z `tsconfig.exclude` bez kasowania backupów.
- Dodanie notatki Etapu 38 o kontraście selectów i brakujących opcjach filtrów.

## TESTY

Do uruchomienia przez APPLY V7:
- `node --check payload/apply_v7.cjs`
- `node --check scripts/*.cjs`
- `npm run verify:project-files-model-v26a`
- `npm run verify:private-files-fulfillment-v51`
- `npm run verify:project-publication-readiness-v35`
- `npm run typecheck`
- `npm run build`

## TEST RĘCZNY

BRAK POTWIERDZONEGO TESTU RĘCZNEGO dla runtime Etapu 26A.

## NEXT

Po przejściu V7 wykonać review diff i dopiero wtedy `PUSH_AFTER_REVIEW_ETAP26A_V7.ps1`.
