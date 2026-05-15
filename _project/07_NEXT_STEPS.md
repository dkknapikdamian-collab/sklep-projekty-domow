# 07_NEXT_STEPS - nastepne kroki

## Najblizszy rekomendowany krok po Etapie 4

Karta projektu jest domknieta jako glowna strona sprzedazowa. Nastepny maly etap powinien naprawic licznik koszyka w headerze, bo podczas testu karta -> koszyk strona koszyka miala pozycje, ale header nadal pokazywal `Koszyk 0`.

## Zasady dalszej pracy

- Publiczne dane projektow powinny dalej isc tylko przez `lib/project-repository.ts`.
- Nie dodawac bezposrednich publicznych query do `projects` poza repozytorium.
- Utrzymac guard `verify:public-project-detail-sales-v37` przy kazdej zmianie karty produktu.
- Nie mieszac opcjonalnego PDF na e-mail z podstawowa dostawa projektu.
- Jesli testujemy runtime admina, naprawic albo ominac niestabilny lokalny anon key przez stabilne srodowisko testowe.

## Kolejne mozliwe etapy

1. Licznik koszyka w headerze.
2. Stabilny runtime test admina na srodowisku z dzialajacym Supabase Auth.
3. Dalsze dopracowanie checkoutu i zamowien.
4. Platnosci i automatyzacja dostawy plikow.
