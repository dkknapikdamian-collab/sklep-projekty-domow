# 07_NEXT_STEPS - nastepne kroki

## Najblizszy rekomendowany krok po Etapie 6

Zamowienia maja realny zapis i podstawowy panel admina. Najblizszy praktyczny krok to manualny runtime test pelnego przeplywu `/zamowienie` -> Supabase -> `/admin/zamowienia`, po zastosowaniu migracji `0015_orders_v42_statuses.sql`.

## Zasady dalszej pracy

- Publiczne dane projektow powinny dalej isc tylko przez `lib/project-repository.ts`.
- Nie dodawac bezposrednich publicznych query do `projects` poza repozytorium.
- Utrzymac guard `verify:public-project-detail-sales-v37` przy kazdej zmianie karty produktu.
- Utrzymac guard `verify:cart-order-v38` przy kazdej zmianie koszyka, wariantow, dodatkow albo headerowych licznikow.
- Nie mieszac opcjonalnego PDF na e-mail z podstawowa dostawa projektu.
- Jesli testujemy runtime admina, naprawic albo ominac niestabilny lokalny anon key przez stabilne srodowisko testowe.
- Zamowienia obslugiwac recznie statusami `new`, `contacted`, `paid_manual`, `sent`, `cancelled`, dopoki nie ma osobnej decyzji o platnosciach, mailach i automatycznej wysylce.

## Kolejne mozliwe etapy

1. Zastosowac migracje `0015_orders_v42_statuses.sql` w Supabase i wykonac manualny test zamowienia.
2. Stabilny runtime test admina na srodowisku z dzialajacym Supabase Auth.
3. Strona/lista ulubionych albo decyzja, ze lokalny licznik + serduszka wystarczaja na teraz.
4. Platnosci, maile i automatyzacja dostawy plikow dopiero jako osobny etap.
