# 2026-05-17 17:25 - Etap 26A V5 guard path repair

## Status

NAPRAWA PACZKI / GUARD FALSE-POSITIVE + PATH BUG.

## FAKTY

- Etap 26A SQL został uruchomiony w Supabase i potwierdzony przez Damiana: `Success. No rows returned`.
- Paczka V4 nie doszła do testów, bo `apply_v4.cjs` szukał pliku w błędnej ścieżce `payload/payload/files/...`.
- Guard 26A ma pilnować prywatnego modelu `project_files`, a nie blokować `publicUrl/getPublicUrl` w publicznych mediach projektu.

## ZMIANA

- V5 podmienia tylko `scripts/check-project-files-model-v26a.cjs`.
- V5 naprawia ścieżkę paczki i zawęża zakaz `publicUrl/getPublicUrl` do prywatnego modelu plików.
- V5 nie kasuje `_backup_local` i nie rusza obcych untracked plików.

## TESTY

Do uruchomienia przez APPLY:
- `npm run verify:project-files-model-v26a`
- `npm run verify:private-files-fulfillment-v51`
- `npm run verify:project-publication-readiness-v35`
- `npm run typecheck`
- `npm run build`

## TEST RĘCZNY

BRAK POTWIERDZONEGO TESTU RUNTIME.

## NEXT

Po przejściu testów wykonać review diff i dopiero potem użyć `PUSH_AFTER_REVIEW_ETAP26A_V5.ps1`.
