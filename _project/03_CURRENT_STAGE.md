# 03_CURRENT_STAGE - aktualny etap

Ostatnia aktualizacja: 2026-05-15 20:10 Europe/Warsaw

## Aktualny etap

Etap 15B: Utrwalona checklista realizacji zamówienia

## Status etapu

Przygotowany w paczce wdrożeniowej. To jest logiczna kontynuacja Etapu 14. Nazwa 15B wynika z tego, że numer 15 był już użyty na panel awaryjnego usunięcia w tabeli projektów.

## Cel etapu

Checklistę realizacji trzeba zapisywać jako dane, nie tylko pokazywać jako UI. Admin ma móc odhaczyć realizację i po odświeżeniu widzieć ten sam stan.

## Co zostało zrobione

- Dodano migrację `0017_order_fulfillment_checklist.sql`.
- Dodano tabelę `order_fulfillment_checklist`:
  - `order_id`,
  - `payment_confirmed`,
  - `pdf_sent`,
  - `zip_sent`,
  - `order_closed`,
  - `internal_note`,
  - `updated_at`.
- Rozszerzono `lib/admin/orders-admin.ts` o:
  - `AdminOrderFulfillmentChecklist`,
  - pobieranie checklisty dla zamówień,
  - domyślną pustą checklistę,
  - `updateAdminOrderFulfillmentChecklist`.
- Dodano server action `updateOrderFulfillmentChecklistAction`.
- Strona `/admin/zamowienia/[id]` pokazuje checkboksy i notatkę admina jako formularz zapisu.
- Po zapisie strona wraca na szczegół zamówienia z komunikatem sukcesu.
- Dodano audit log `order_fulfillment_checklist_update`.
- Zaktualizowano guard `verify:admin-orders-v42`.

## Czego nie zmieniano

- Nie dodawano automatycznej wysyłki.
- Nie zmieniano płatności.
- Nie dodawano signed URL.
- Nie zmieniano storage linków.
- Nie zmieniano checkoutu klienta.

## Checki wymagane

```powershell
npm run verify:admin-orders-v42
npm run typecheck
npm run build
npm run check:project-memory
```

## Ważne przed testem runtime

Trzeba zastosować migrację w Supabase:

```text
supabase/migrations/0017_order_fulfillment_checklist.sql
```

## Kryterium zakończenia

Admin może odhaczyć realizację i stan zostaje po odświeżeniu strony.
