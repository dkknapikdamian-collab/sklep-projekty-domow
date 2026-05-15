# 03_CURRENT_STAGE - aktualny etap

Ostatnia aktualizacja: 2026-05-15 19:05 Europe/Warsaw

## Aktualny etap

Etap 14: Osobna strona szczegółów zamówienia `/admin/zamowienia/[id]`

## Status etapu

Przygotowany w paczce wdrożeniowej. Do potwierdzenia lokalnie przez guard, typecheck, build i test ręczny.

## Cel etapu

Lista zamówień ma pozostać listą, a obsługa konkretnego zamówienia ma odbywać się na dedykowanej stronie operacyjnej.

## Co zostało zrobione

- Dodano stronę `/admin/zamowienia/[id]`.
- Lista `/admin/zamowienia` została uproszczona do szybkiego przeglądu i linku `Obsłuż zamówienie`.
- Szczegóły zamówienia przeniesiono na dedykowaną stronę:
  - dane klienta,
  - status i zmiana statusu,
  - pozycje,
  - warianty,
  - dodatki,
  - pliki prywatne przypięte do projektów,
  - PDF na e-mail,
  - checklistę realizacji,
  - dane do faktury,
  - uwagi klienta.
- Dodano placeholder notatki admina bez zapisu, ponieważ osobna notatka admina wymaga nowego pola/migracji.
- Dodano `getAdminOrderById` w `lib/admin/orders-admin.ts`.
- Zaktualizowano guard `verify:admin-orders-v42`, żeby pilnował podziału lista/szczegół.

## Czego nie zmieniano

- Nie zmieniano automatycznych maili.
- Nie zmieniano płatności.
- Nie dodawano signed URL.
- Nie dodawano automatycznej wysyłki plików.
- Nie zmieniano checkoutu klienta.

## Checki wymagane

```powershell
npm run verify:admin-orders-v42
npm run typecheck
npm run build
npm run check:project-memory
```

## Kryterium zakończenia

Lista zamówień jest listą, a obsługa konkretnego zamówienia dzieje się na dedykowanej stronie.
