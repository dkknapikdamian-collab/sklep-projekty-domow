# STAGE29F_ADMIN_DEBUG_ROUTE_GUARD_FINAL

Cel: domknac rozjazd po V29D/V29E.

Problem:
- `/admin/debug` zostal zmieniony z diagnostyki systemowej na instrukcje debuggera UI,
- guard `verify:admin-ui-debug-v28` nadal wymagal tekstow, ktore nie byly zgodne z route,
- poprzednie patche zatrzymywaly sie przed commitem, wiec Vercel dostawal pol-stan.

Naprawa:
- route `/admin/debug` ma marker `data-admin-debug-v29`, instrukcje debuggera i jawne info o localStorage,
- guard V28 sprawdza realny debugger UI i instrukcje route,
- guard V26 akceptuje kompatybilnosc V29,
- V27/V29 service-role read dla publicznych mediow zostaje domkniety w tym samym commicie.
