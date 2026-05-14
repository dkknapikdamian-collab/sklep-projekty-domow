# Stage 29E — Admin debug route guard repair

## Cel
Naprawić konflikt po zmianie `/admin/debug` ze starego panelu diagnostycznego V26 na instrukcję nowego trybu zgłaszania błędów UI.

## Zakres
- `app/admin/debug/page.tsx` pokazuje instrukcję trybu Debug UI.
- `scripts/check-admin-ui-debug-v28.cjs` akceptuje V29 route i wymaga właściwych instrukcji.
- `scripts/check-admin-debug-v26.cjs` zostaje kompatybilny z nowym znaczeniem route `/admin/debug`.

## Bezpieczeństwo
Nie dotyka `.env.local`, `.vercel` ani sekretów.

## Testy
- `npm run verify:admin-debug-v26`
- `npm run verify:admin-ui-debug-v28`
- `npm run verify`
