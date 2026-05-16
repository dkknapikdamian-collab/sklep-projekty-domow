# 16_PRODUCTION_ROADMAP_AND_ACCEPTANCE - Sklep projekty domow

Status: AKTYWNY / PO KOREKCIE ETAPU B.
Ostatnia aktualizacja: 2026-05-16_1810 Europe/Warsaw.

Ten plik ma być czytany na początku każdego etapu razem z `AGENTS.md`, `_project/01_PROJECT_GOAL.md`, `_project/03_CURRENT_STAGE.md`, `_project/07_NEXT_STEPS.md`, `_project/14_TEST_HISTORY.md` i `_project/15_ACTIVE_SOURCE_MAP.md`.

Etap jest zamknięty dopiero, gdy ma: aktualizację repo, aktualizację `_project`, aktualizację Obsidiana, guard albo jawny brak guardu, status testu ręcznego, raport run i delivery push albo ZIP.

<!-- ETAP_B_PROJECT_MEMORY_STATUS_FIX_START -->
## Aktualny realny stan

Kod ma wdrożone elementy etapów 22-29, ale nie wszystkie są zamknięte produkcyjnie.

Nie wolno traktować Etapu 29 jako pełnego zamknięcia V1, ponieważ:
- runtime V1 nie jest potwierdzony ręcznie,
- audit runtime nie jest potwierdzony ręcznie dla wszystkich operacji,
- obecny flow płatności ręcznej jest sprzeczny z decyzją Damiana,
- docelowe płatności automatyczne nie są wdrożone,
- aplikacja nie jest jeszcze publiczna dla klientów.

## Następny realny etap

1. Etap A: korekta kierunku płatności i roadmapy.
2. Potem: runtime audit admina i pełny flow sklepu bez publikacji klientom.

## Kolejność operacyjna po korekcie

| Kolejność | Etap | Status | Warunek przejścia dalej |
|---:|---|---|---|
| 0 | Etap B - naprawa project memory / aktualnego statusu etapów | W TYM ZIP / TEST AUTOMATYCZNY GUARD | `verify:project-stage-status-b` i `check:project-memory` |
| 1 | Etap A - korekta kierunku płatności i roadmapy | DO DOMKNIĘCIA DOKUMENTACYJNIE / TEST RĘCZNY DO WYKONANIA | brak sprzecznych komunikatów o płatnościach |
| 2 | Runtime audit admina | TEST RĘCZNY DO WYKONANIA | realne wpisy w `/admin/audit` po operacjach admina |
| 3 | Pełny runtime flow sklepu bez publikacji klientom | TEST RĘCZNY DO WYKONANIA | realny projekt -> koszyk -> checkout -> admin -> audit |
| 4 | Pre-release checklist V1 | BLOKADA DO CZASU TESTÓW RUNTIME | Etap 29 nie zamyka V1 bez ręcznego testu Damiana |
| 5 | Automatyczne płatności online | DO POTWIERDZENIA / OSOBNY ETAP | decyzja o providerze, webhookach i statusach płatności |
| 6 | Publiczne uruchomienie klientom | BLOKADA | brak blockerów readiness |

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

## Automatyczne płatności online - osobny przyszły etap

Zakres przyszłego etapu:
- wybrać payment provider,
- przygotować model statusów płatności,
- zaplanować webhooki,
- rozdzielić status zamówienia od statusu płatności,
- przygotować guardy pod payment flow.

Nie wdrażać produkcyjnych płatności bez osobnej decyzji Damiana.

Status: DO POTWIERDZENIA / OSOBNY ETAP.

## Kryteria zamknięcia V1

V1 można uznać za gotowe dopiero, gdy:
- build i guardy przechodzą,
- runtime audit admina jest potwierdzony ręcznie,
- pełny flow sklepu jest potwierdzony ręcznie,
- płatności ręczne nie są komunikowane jako docelowy model,
- automatyczne płatności są wdrożone albo publiczny start jest wstrzymany,
- Obsidian i `_project/` mają ten sam status.

## Dozwolone statusy

- DO WDROŻENIA
- WDROŻONE W KODZIE - BEZ TESTU RUNTIME
- TEST AUTOMATYCZNY / GUARD
- TEST RĘCZNY DO WYKONANIA
- TEST RĘCZNY POTWIERDZONY PRZEZ DAMIANA
- BRAK POTWIERDZONEGO TESTU RĘCZNEGO
- BLOKER
- DO POTWIERDZENIA

## Następny krok

Domknąć Etap A, potem wykonać runtime audit admina i pełny flow sklepu bez publikacji klientom.
<!-- ETAP_B_PROJECT_MEMORY_STATUS_FIX_END -->