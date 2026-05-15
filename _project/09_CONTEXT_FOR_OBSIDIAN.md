# 09_CONTEXT_FOR_OBSIDIAN - indeks projektu

## Projekt

`sklep-projekty-domow`

## Aktualny etap

Etap 15B: Utrwalona checklista realizacji zamówienia.

## Ostatnia ważna zmiana

2026-05-15 20:10 Europe/Warsaw: checklista realizacji na `/admin/zamowienia/[id]` została przeniesiona z samego UI do danych. Stan checkboxów i notatka admina zapisują się w `order_fulfillment_checklist`.

## Najważniejsze ustalenia

- checklista realizacji jest trwałą częścią obsługi zamówienia,
- zapis wymaga migracji `0017_order_fulfillment_checklist.sql`,
- notatka admina jest zapisywana jako `internal_note`,
- nie dodano automatycznej wysyłki, płatności ani signed URL,
- zmiany realizacji są logowane jako `order_fulfillment_checklist_update`.

## Pliki techniczne ważne dla Etapu 15B

- `../app/admin/zamowienia/[id]/page.tsx`
- `../app/admin/zamowienia/actions.ts`
- `../lib/admin/orders-admin.ts`
- `../supabase/migrations/0017_order_fulfillment_checklist.sql`
- `../scripts/check-admin-orders-v42.cjs`

## Uwaga

Obsidian jest tylko indeksem/dashboardem. Źródłem prawdy pozostaje repo.
