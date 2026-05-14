# Stage 29C — public media read + UI debug repair

## Cel
Domknąć przerwane etapy V27/V29:
- publiczne odczyty banera i aktywnych projektów po stronie serwera przez service role,
- brak publicznego odczytu prywatnych rekordów plików zakupowych,
- `/admin/debug` jako instrukcja trybu zgłaszania UI, a nie stary panel diagnostyczny,
- pływający reporter UI dostępny w adminie.

## Decyzja
Publiczna strona nadal pokazuje wyłącznie projekty `active`, ale odczyt odbywa się po stronie serwera z użyciem service role, żeby uniknąć rozjazdu RLS/anon przy mediach i banerze. Secret nie trafia do klienta.

## Testy
- `npm run verify:public-service-role-read-v27`
- `npm run verify:admin-ui-debug-v28`
- `npm run verify:public-project-data-v22`
- `npm run typecheck`
- `npm run verify`

## Kryterium zakończenia
Po deployu Vercel:
- baner strony głównej pozostaje po odświeżeniu,
- strona główna pokazuje baner,
- projekt demo pokazuje media,
- `/admin/debug` opisuje tryb zgłaszania UI,
- pływający Debug pozwala kliknąć element, opisać problem i pobrać raport.
