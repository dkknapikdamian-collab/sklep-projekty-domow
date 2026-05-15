# 09_CONTEXT_FOR_OBSIDIAN - indeks projektu

## Projekt

`sklep-projekty-domow`

## Aktualny etap

Etap 20: Widok audit logu `/admin/audit`.

## Ostatnia ważna zmiana

2026-05-15 22:20 Europe/Warsaw: przygotowano widok audit logu `/admin/audit`, który pokazuje wpisy z `admin_audit_log`, pozwala filtrować po typie akcji i daje adminowi podgląd śladu operacji.

## Najważniejsze ustalenia

- V1 działa na płatności manualnej,
- nie ma Stripe/PayU,
- system nadal niczego sam nie wysyła,
- lista zamówień priorytetyzuje pracę admina,
- audit log jest widokiem tylko do odczytu,
- mechanizm auth i logika operacji admina nie są zmieniane w Etapie 20.

## Pliki techniczne ważne dla Etapu 20

- `../lib/admin/audit-log.ts`
- `../app/admin/audit/page.tsx`
- `../components/admin/AdminHeader.tsx`
- `../app/admin/page.tsx`
- `../scripts/check-admin-audit-log-v44.cjs`

## Checki wymagane po Etapie 20

```powershell
npm run verify:admin-audit-log-v44
npm run typecheck
npm run build
npm run check:project-memory
```

## Uwaga

Obsidian jest tylko indeksem/dashboardem. Źródłem prawdy pozostaje repo.
