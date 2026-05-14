# Stage 28C — Admin UI Debug missing assets repair

## Cel
Naprawia deployment Vercel po V28/V28B, gdzie `AdminHeader.tsx` importował `AdminUiDebugReporter`, ale komponent nie został dodany do commita, bo wcześniejszy etap zatrzymał się na typechecku przed commit/push.

## Zakres
- dodaje `components/admin/AdminUiDebugReporter.tsx`,
- dodaje `app/admin-ui-debug-v28.css`,
- upewnia się, że `AdminHeader.tsx` importuje i renderuje reporter,
- upewnia się, że `app/globals.css` importuje CSS debugera,
- utrzymuje guard `verify:admin-ui-debug-v28`.

## Kryterium zakończenia
- `npm run verify:admin-ui-debug-v28` przechodzi,
- `npm run typecheck` przechodzi,
- `npm run verify` przechodzi,
- Vercel build nie ma błędu `Module not found: Can't resolve '@/components/admin/AdminUiDebugReporter'`.
