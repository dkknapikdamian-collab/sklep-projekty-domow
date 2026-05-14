# STAGE 28B — Admin UI Debug import repair

## Cel
Naprawa częściowo wdrożonego V28, gdzie `AdminHeader.tsx` renderował `<AdminUiDebugReporter />`, ale nie importował komponentu.

## Zmienione
- `components/admin/AdminHeader.tsx` dostaje import `AdminUiDebugReporter`.
- `scripts/check-admin-ui-debug-v28.cjs` pilnuje już nie tylko renderowania, ale też importu komponentu.

## Kryterium zakończenia
- `npm run verify:admin-ui-debug-v28`
- `npm run typecheck`
- `npm run verify`
