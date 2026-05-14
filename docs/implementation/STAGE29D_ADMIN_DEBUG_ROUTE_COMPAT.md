# STAGE29D_ADMIN_DEBUG_ROUTE_COMPAT

Cel:
- Zamienic `/admin/debug` ze starego panelu diagnostycznego V26 na instrukcje nowego trybu zglaszania UI V29.
- Zostawic nazwe skryptu `verify:admin-debug-v26` dla kompatybilnosci lancucha `npm run verify`, ale zmienic kontrakt guardu na V29.
- Domknac przerwane wdrozenia V27/V28/V29 jednym commitem.

Zakres:
- `app/admin/debug/page.tsx`
- `scripts/check-admin-debug-v26.cjs`
- wszystkie zalegle zmiany ze statusu lokalnego po V29C

Wymagania:
- `/admin/debug` ma opisywac workflow: Debug -> klik elementu -> opis -> Enter -> pobierz raport i wyczysc.
- Stary marker `data-admin-debug-v26` oraz `getAdminDebugDiagnostics` nie moga byc wymagane ani renderowane na tej stronie.
- Prawdziwy debug UI pozostaje komponentem `AdminUiDebugReporter` montowanym globalnie w `AdminHeader`.
- Raport zapisuje sie lokalnie w `localStorage`, bez Supabase.
