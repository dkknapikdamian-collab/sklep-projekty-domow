# 03_CURRENT_STAGE - aktualny etap

Ostatnia aktualizacja: 2026-05-15 18:20 Europe/Warsaw

## Aktualny etap

Etap 12B: Hotfix patchera audit logu

## Status etapu

Przygotowany po błędzie `function updateProjectStatusAction missing replacement marker`. Nowa paczka nie opiera się na kruchym markerze tekstowym, tylko wymienia całe małe funkcje server actions.

## Cel etapu

Wdrożyć audit log z Etapu 12 bez wrażliwości na drobne różnice formatowania w `actions.ts`.

## Co zostało zrobione

- Patcher wymienia całe funkcje:
  - `updateProjectStatusAction`,
  - `archiveProjectAction`,
  - `deleteProjectAction`.
- `app/admin/zamowienia/actions.ts` jest nadpisywany bezpieczną wersją z audit logiem.
- Dodano/utrzymano:
  - `lib/admin/audit-log.ts`,
  - `supabase/migrations/0016_admin_audit_log.sql`,
  - `scripts/check-admin-audit-log-v44.cjs`,
  - `verify:admin-audit-log-v44`.
- Zachowano hotfix dla guarda layoutu Etapu 11.
- Skrypt nadal przerywa pracę po błędzie i nie commituję nieprzechodzących checków.

## Czego nie zmieniano

- Nie zmieniano publicznego wyglądu sklepu.
- Nie zmieniano płatności.
- Nie zmieniano checkoutu klienta.
- Nie zmieniano auth.

## Checki wymagane

```powershell
npm run verify:admin-audit-log-v44
npm run verify:admin-buttons-v19
npm run verify:admin-project-list-compact-v41
npm run verify:public-project-data-v22
npm run typecheck
npm run build
npm run check:project-memory
```

## Kryterium zakończenia

Każda ryzykowna operacja admina zostawia ślad w `admin_audit_log`.
