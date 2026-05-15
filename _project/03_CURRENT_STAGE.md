# 03_CURRENT_STAGE - aktualny etap

Ostatnia aktualizacja: 2026-05-15 21:45 Europe/Warsaw

## Aktualny etap

Etap 19: Filtry i priorytetyzacja zamówień w adminie

## Status etapu

Wdrożone bez zmiany modelu płatności, bez automatycznej wysyłki i bez rozbudowy panelu zamówień do ciężkiego CRM.

## Cel etapu

Panel `/admin/zamowienia` ma przestać być tylko listą. Admin ma od razu widzieć, czym zająć się najpierw: kontakt z klientem, płatność manualna albo wysyłka plików.

## Co zostało zrobione

- Dodano panel szybkich liczników na `/admin/zamowienia`:
  - `Wymaga kontaktu`,
  - `Czeka na płatność`,
  - `Do wysyłki`.
- Dodano filtrowanie listy zamówień po:
  - statusie zamówienia: `new`, `contacted`, `paid_manual`, `sent`, `cancelled`,
  - płatności: instrukcja ustawiona / brak instrukcji,
  - realizacji: PDF wysłany / ZIP wysłany / zamknięte,
  - szybkim oznaczeniu: wymaga kontaktu / czeka na płatność / do wysyłki.
- Dodano widoczne oznaczenia na kartach zamówień:
  - priorytet operacyjny,
  - stan instrukcji płatności,
  - stan PDF,
  - stan ZIP,
  - stan zamknięcia zamówienia.
- Dodano helpery priorytetu w `lib/admin/orders-admin.ts`:
  - `getAdminOrderPriorityFlags`,
  - `getAdminOrderPriorityRank`,
  - listy i etykiety filtrów.
- Rozszerzono guard `scripts/check-admin-orders-v42.cjs`, żeby pilnował nowych filtrów i priorytetów.
- Dodano style `STAGE49 ADMIN ORDER FILTERS AND PRIORITY` w `app/admin-v8.css`.

## Czego nie zmieniano

- Nie dodano Stripe.
- Nie dodano PayU.
- Nie dodano automatycznej wysyłki PDF/ZIP.
- Nie dodano automatycznego księgowania.
- Nie przebudowano szczegółu zamówienia w CRM.
- Nie zmieniano routingu zamówień.

## Checki wymagane

```powershell
npm run verify:admin-orders-v42
npm run typecheck
npm run build
npm run check:project-memory
```

## Ważne przed testem runtime

Ten etap nie wymaga nowej migracji. Korzysta z danych już istniejących w zamówieniu i `order_fulfillment_checklist`, w tym `payment_instruction`, `pdf_sent`, `zip_sent`, `order_closed` oraz statusu zamówienia.

## Kryterium zakończenia

Po wejściu w `/admin/zamowienia` admin widzi, czym zająć się najpierw, i może zawęzić listę zamówień bez przechodzenia po kolei przez każdy szczegół.
