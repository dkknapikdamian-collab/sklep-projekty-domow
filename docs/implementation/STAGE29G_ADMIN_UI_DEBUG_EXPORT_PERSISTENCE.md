# STAGE29G_ADMIN_UI_DEBUG_EXPORT_PERSISTENCE

## Cel
Naprawić realny błąd trybu Debug UI w adminie:
- raportów nie dało się wygodnie pobrać w trakcie pracy w debug mode,
- raporty mogły znikać po odświeżeniu przez zapis pustego stanu przed hydratacją,
- użytkownik nie miał stałego przycisku pobrania raportu obok debuggera.

## Zmiana
- `AdminUiDebugReporter` używa `sessionStorage`, więc raporty przetrwają odświeżenie w tej samej sesji/kartcie.
- Stary klucz `localStorage` V28 jest migrowany do `sessionStorage`, żeby nie zgubić raportów z poprzedniej wersji.
- Storage jest czyszczony dopiero po pobraniu raportu.
- Przycisk `Pobierz raport (N) i wyczyść` jest widoczny w docku debuggera oraz w modalu debugowania.
- Dodano guard chroniący przed ponownym błędem zapisu pustego stanu przed hydratacją.

## Pliki
- `components/admin/AdminUiDebugReporter.tsx`
- `scripts/check-admin-ui-debug-v28.cjs`
- `docs/implementation/STAGE29G_ADMIN_UI_DEBUG_EXPORT_PERSISTENCE.md`

## Testy
- `npm run verify:admin-ui-debug-v28`
- `npm run typecheck`
- `npm run verify`

## Kryterium zakończenia
Po wejściu do admina:
1. Klikasz Debug.
2. Klikasz element.
3. Wpisujesz opis i Enter zapisuje.
4. Licznik zgłoszeń zostaje widoczny.
5. Przycisk pobrania jest dostępny bez wyłączania debuggera.
6. Po odświeżeniu raporty nadal są dostępne.
7. Po pobraniu raportu zgłoszenia są czyszczone.
