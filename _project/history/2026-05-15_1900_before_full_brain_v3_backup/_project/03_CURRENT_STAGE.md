# 03_CURRENT_STAGE - aktualny etap

Ostatnia aktualizacja: 2026-05-15 20:45 Europe/Warsaw

## Aktualny etap

Etap 16: Robocze e-maile do klienta bez automatycznej wysyłki

## Status etapu

Przygotowany w paczce wdrożeniowej. Do potwierdzenia lokalnie przez guard, typecheck, build i test ręczny na stronie szczegółu zamówienia.

## Cel etapu

Przyspieszyć obsługę zamówień bez ryzyka automatyzacji. System ma generować treści e-maili, które admin kopiuje i wysyła ręcznie.

## Co zostało zrobione

- Dodano `lib/admin/order-email-drafts.ts`.
- Dodano generator trzech roboczych e-maili:
  - `E-mail: potwierdzenie zamówienia`,
  - `E-mail: płatność potwierdzona`,
  - `E-mail: wysyłka plików`.
- Dodano sekcję `Robocze e-maile do klienta` na `/admin/zamowienia/[id]`.
- Każdy draft ma temat i treść w polach `readOnly`.
- Treści korzystają z danych zamówienia:
  - numer zamówienia,
  - klient,
  - pozycje,
  - warianty,
  - dodatki,
  - suma,
  - informacja o PDF na e-mail,
  - informacja o plikach prywatnych.
- Dodano guard `verify:manual-email-drafts-v47`.
- Dodano style `STAGE47 MANUAL ORDER EMAIL DRAFTS`.

## Czego nie zmieniano

- Nie dodano SMTP.
- Nie dodano Resend.
- Nie dodano Mailgun.
- Nie dodano automatycznego mailingu.
- Nie dodano signed URL.
- Nie zmieniano płatności.
- Nie zmieniano checkoutu klienta.

## Checki wymagane

```powershell
npm run verify:manual-email-drafts-v47
npm run typecheck
npm run build
npm run check:project-memory
```

## Kryterium zakończenia

Admin nie musi pisać maili od zera, ale system nadal niczego sam nie wysyła.
