# 09_CONTEXT_FOR_OBSIDIAN - indeks projektu

## Projekt

`sklep-projekty-domow`

## Aktualny etap

Etap 12B: Hotfix patchera audit logu.

## Ostatnia ważna zmiana

2026-05-15 18:20 Europe/Warsaw: poprawiono paczkę Etapu 12 po błędzie markera w `updateProjectStatusAction`. Nowy patcher wymienia całe funkcje server actions, zamiast polegać na kruchym fragmencie tekstu.

## Najważniejsze ustalenia

- cel Etapu 12 pozostaje bez zmian: ryzykowne operacje admina mają zostawiać audit log,
- runtime wymaga migracji `0016_admin_audit_log.sql`,
- publiczny sklep, płatności i checkout klienta nie są ruszane,
- patcher ma przerywać pracę po błędach checków.

## Pliki techniczne ważne

- `../lib/admin/audit-log.ts`
- `../supabase/migrations/0016_admin_audit_log.sql`
- `../app/admin/projekty/actions.ts`
- `../app/admin/zamowienia/actions.ts`
- `../scripts/check-admin-audit-log-v44.cjs`

## Uwaga

Obsidian jest tylko indeksem/dashboardem. Źródłem prawdy pozostaje repo.
