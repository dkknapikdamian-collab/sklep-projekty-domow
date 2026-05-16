# 16_PRODUCTION_ROADMAP_AND_ACCEPTANCE - Sklep projekty domow

Status: AKTYWNY.

Ten plik ma byc czytany na poczatku kazdego etapu razem z AGENTS.md, _project/01_PROJECT_GOAL.md i _project/15_ACTIVE_SOURCE_MAP.md.

Etap jest zamkniety dopiero, gdy ma: aktualizacje repo, aktualizacje _project, aktualizacje Obsidiana, guard albo jawny brak guardu, status testu recznego, raport run i delivery push albo ZIP.

Najblizsza kolejnosc po korekcie Etapu A:

1. Etap 22 - runtime audit admina.
2. Etap A - korekta kierunku platnosci i usuniecie platnosci recznych jako docelowego modelu.
3. Etap B - przygotowanie automatycznych platnosci: Stripe/payment provider, webhooki i statusy platnosci.
4. Etap 24 - pelny runtime flow V1.
5. Etap 25 - walidacja zamowienia i cen wzgledem bazy.
6. Etap 26 - obsluga plikow zakupowych w adminie.
7. Etap 27 - sanity check publikacji projektu.
8. Etap 28 - blokada sample/demo jako realnych ofert.
9. Etap 29 - pre-release checklist V1.

Dozwolone statusy: DO WDROZENIA, WDROZONE W KODZIE - BEZ TESTU RUNTIME, TEST AUTOMATYCZNY / GUARD, TEST RECZNY DO WYKONANIA, TEST RECZNY POTWIERDZONY PRZEZ DAMIANA, BRAK POTWIERDZONEGO TESTU RECZNEGO, BLOKER, DO POTWIERDZENIA.

Po kazdym etapie aktualizuj ten plik, _project, raport run oraz Obsidiana.

<!-- ETAP_A_PAYMENT_DIRECTION_FIX_START -->
## Etap A - korekta kierunku płatności

### Decyzja Damiana

Nie wdrażamy płatności ręcznych jako docelowego modelu.

### Status obecnego flow

Obecny manual-payment/order flow jest tylko legacy / temporary / internal only. Może istnieć technicznie, bo aplikacja nie jest jeszcze publicznie udostępniona, ale nie jest modelem produkcyjnym sprzedaży.

### Warunek przed publicznym uruchomieniem

Przed publicznym udostępnieniem sklepu manual-payment flow musi zostać usunięty albo zastąpiony automatycznymi płatnościami.

### Docelowy kierunek

- automatyczne płatności online,
- Stripe/payment provider albo inny wybrany provider,
- webhooki,
- statusy płatności,
- rozdzielenie statusu zamówienia od statusu płatności,
- guardy regresji dla checkoutu, webhooków i statusów płatności.

### Status testu ręcznego

TEST RĘCZNY DO WYKONANIA.
<!-- ETAP_A_PAYMENT_DIRECTION_FIX_END -->

## Etap B - przygotowanie automatycznych płatności

Zakres przyszłego etapu:
- wybrać payment provider,
- przygotować model statusów płatności,
- zaplanować webhooki,
- rozdzielić status zamówienia od statusu płatności,
- przygotować guardy pod payment flow.

Nie wdrażać produkcyjnych płatności bez osobnej decyzji Damiana.

Status: TEST RĘCZNY DO WYKONANIA.

