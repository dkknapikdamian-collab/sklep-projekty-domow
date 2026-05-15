# Run report - 2026-05-15 20:45 - manual-email-drafts

## Etap

Etap 16: Robocze e-maile do klienta bez automatycznej wysyłki.

## Cel

Admin nie musi pisać maili od zera, ale system nadal niczego sam nie wysyła.

## Zmiany

- Dodano helper `buildManualOrderEmailDrafts`.
- Dodano trzy drafty e-maili.
- Dodano sekcję roboczych e-maili na `/admin/zamowienia/[id]`.
- Dodano guard `verify:manual-email-drafts-v47`.

## Checki do uruchomienia

```powershell
npm run verify:manual-email-drafts-v47
npm run typecheck
npm run build
npm run check:project-memory
```

## Ryzyka

- Drafty trzeba sprawdzić językowo na realnym zamówieniu.
- Nie ma przycisku kopiowania do schowka, bo na start wystarczą pola readOnly/textarea.
