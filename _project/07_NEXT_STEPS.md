# 07_NEXT_STEPS - nastepne kroki

## Najblizszy rekomendowany krok po Etapie 7

Po zmianie komunikacji checkoutu trzeba wykonać krótki test runtime: dodać projekt do koszyka, wejść w `/zamowienie`, sprawdzić teksty i wysłać zamówienie. Cel: potwierdzić, że checkout wygląda jak realne zamówienie V1, ale nie obiecuje automatycznych płatności ani natychmiastowej wysyłki plików.

## Zasady dalszej pracy

- Publiczne dane projektow powinny dalej isc tylko przez `lib/project-repository.ts`.
- Nie dodawac bezposrednich publicznych query do `projects` poza repozytorium.
- Utrzymac guard `verify:public-project-detail-sales-v37` przy kazdej zmianie karty produktu.
- Utrzymac guard `verify:cart-order-v38` przy kazdej zmianie koszyka, wariantow, dodatkow, checkoutu albo headerowych licznikow.
- Nie mieszac opcjonalnego PDF na e-mail z podstawowa dostawa projektu.
- PDF na e-mail ma pozostac dodatkiem realizowanym po potwierdzeniu płatności i realizacji, nie obietnicą natychmiastowej automatycznej wysyłki.
- Jesli testujemy runtime admina, naprawic albo ominac niestabilny lokalny anon key przez stabilne srodowisko testowe.
- Zamowienia obslugiwac recznie statusami `new`, `contacted`, `paid_manual`, `sent`, `cancelled`, dopoki nie ma osobnej decyzji o platnosciach, mailach i automatycznej wysylce.

## Kolejne mozliwe etapy

1. Manualny runtime test `/koszyk` -> `/zamowienie` -> sukces zamówienia -> `/admin/zamowienia`.
2. Zastosowac migracje `0015_orders_v42_statuses.sql` w Supabase, jezeli nie zostala jeszcze zastosowana.
3. Stabilny runtime test admina na srodowisku z dzialajacym Supabase Auth.
4. Strona/lista ulubionych albo decyzja, ze lokalny licznik + serduszka wystarczaja na teraz.
5. Platnosci, maile i automatyzacja dostawy plikow dopiero jako osobny etap.
