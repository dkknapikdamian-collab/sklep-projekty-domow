# Run report - 2026-05-15 20:10 - order-fulfillment-checklist-persistent

## Etap

Etap 15B: Utrwalona checklista realizacji zamówienia.

## Cel

Admin może odhaczyć realizację zamówienia i stan zostaje po odświeżeniu strony.

## Zmiany

- Dodano migrację `0017_order_fulfillment_checklist.sql`.
- Dodano zapis `payment_confirmed`, `pdf_sent`, `zip_sent`, `order_closed`, `internal_note`, `updated_at`.
- Dodano akcję `updateOrderFulfillmentChecklistAction`.
- Strona `/admin/zamowienia/[id]` ma formularz trwałej checklisty.
- Guard `verify:admin-orders-v42` pilnuje trwałej checklisty.

## Checki do uruchomienia

```powershell
npm run verify:admin-orders-v42
npm run typecheck
npm run build
npm run check:project-memory
```

## Ryzyka

- Runtime wymaga zastosowania migracji w Supabase.
- Jeśli `admin_audit_log` nie istnieje w bazie, zapis checklisty może paść na audit logu z Etapu 12.
