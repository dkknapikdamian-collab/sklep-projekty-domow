# 2026-05-17 18:10 - Etap 26A V8 actions fileDefaults + mass check

## Status

NAPRAWA TECHNICZNA / DO URUCHOMIENIA LOKALNIE / BEZ PUSHU AI.

## Powód

V7 poprawił preflight paczki i guardy, ale `typecheck` wykrył realny błąd w `app/admin/projekty/actions.ts`: użycie `fileDefaults` bez lokalnej definicji w pętli uploadu prywatnych plików.

## Co naprawia V8

- Dodaje `const fileDefaults = getProjectFileDefaults(item.fileType);` w pętli prywatnych plików.
- Upewnia się, że `actions.ts` importuje `PROJECT_FILE_STORAGE_BUCKET` i `getProjectFileDefaults`.
- Naprawia `getProjectPublicationErrorMessage()` po wcześniejszym rozbitym stringu.
- Utrzymuje `_backup_local` w `tsconfig.exclude`.
- Dodaje preflight: wykrywanie `fileDefaults` bez definicji, rozbitego `labels.join`, brakującego guarda w `package.json` i syntax check CJS.

## Testy

Automatyczne do wykonania przez APPLY:
- `npm run verify:project-files-model-v26a`
- `npm run verify:private-files-fulfillment-v51`
- `npm run verify:project-publication-readiness-v35`
- `npm run typecheck`
- `npm run build`

Ręczne:
- BRAK POTWIERDZONEGO TESTU RĘCZNEGO.

## Obsidian

W paczce utrzymano notatki Etapu 26A i Etapu 38.

## Następny krok

Jeśli V8 przejdzie guardy, typecheck i build, wykonać review diff i dopiero potem `PUSH_AFTER_REVIEW_ETAP26A_V8.ps1`.
