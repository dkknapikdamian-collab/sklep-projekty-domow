# 2026-05-17 16:55 - Etap 26A V3 guard repair + Etap 37 categories note

## Scan-first confirmation

FAKTY:
- V2 package applied partially and then failed on `verify:project-files-model-v26a`.
- Failure reason: guard saw `getPublicUrl` in `app/admin/projekty/actions.ts`, but that marker belongs to public media upload, not private `project_files` fulfillment.
- Typecheck issue from V1/V2 was related to `_backup_local`; V2 added `_backup_local` to `tsconfig.exclude`.
- Homepage categories are currently hardcoded in `app/page.tsx` and should become dynamic in a later stage.

## What V3 changes

- Replaces only `scripts/check-project-files-model-v26a.cjs`.
- Keeps Supabase Storage direction.
- Keeps public URL ban for private model/readiness/fulfillment sources.
- Allows public media upload code to keep `getPublicUrl` in `actions.ts`.
- Adds an Obsidian note for the next stage: dynamic project categories and admin category taxonomy.

## Tests expected from apply

- `npm run verify:project-files-model-v26a`
- `npm run verify:private-files-fulfillment-v51`
- `npm run verify:project-publication-readiness-v35`
- `npm run typecheck`
- `npm run build`

## Manual test status

- TEST RĘCZNY DO WYKONANIA.
- BRAK POTWIERDZONEGO TESTU RĘCZNEGO for Etap 26A runtime.

## Next step

If V3 guards pass, review exact diff and run the provided push helper manually.
