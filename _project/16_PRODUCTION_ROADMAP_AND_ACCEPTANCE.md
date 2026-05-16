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

<!-- ETAP25_ORDER_PRICE_RUNTIME_TEST_V1_START -->
## 2026-05-16 - Etap 25: runtime guard walidacji cen koszyka względem bazy

STATUS:
- WDROŻONE W KODZIE - TEST AUTOMATYCZNY / GUARD DO URUCHOMIENIA LOKALNIE.
- TEST RĘCZNY DO WYKONANIA.
- BRAK POTWIERDZONEGO TESTU RĘCZNEGO na realnych danych Supabase.

FAKTY:
- Statyczny kierunek Etapu 25 jest zachowany: `createOrder` ma używać `validateCartAgainstDb` i zapisywać dane z walidowanego koszyka.
- Dodano guard runtime z mockiem Supabase: `npm run verify:order-price-runtime-v25`.
- Guard sprawdza stary koszyk, zmianę ceny bazowej, nieaktywny projekt, usunięty addon, zmianę ceny addonu, usunięty płatny wariant i zmianę ceny wariantu.
- Paczka V2 naprawia błąd parsera PowerShell z paczki V1 przez ASCII-only APPLY + Base64 UTF-8 dla bloków markdown.

TESTY AUTOMATYCZNE:
- `npm run verify:order-price-source-v50`
- `npm run verify:order-price-runtime-v25`
- `npm run typecheck`
- `npm run build`
- `npm run check:project-memory`

TEST RĘCZNY DO WYKONANIA:
- Na realnych danych Supabase sprawdzić: stary koszyk, zmieniona cena, nieaktywny projekt, usunięty addon, zmieniony wariant.
- Oczekiwany komunikat: `Cena projektu lub dodatków zmieniła się. Odśwież koszyk.`
- Zamówienie nie może zapisać cen z klienta po rozjeździe względem bazy.

RYZYKO:
- Mock Supabase nie potwierdza realnych rekordów w bazie. Etap pozostaje bez ręcznego potwierdzenia runtime do czasu testu Damiana.

NASTĘPNY KROK:
- Po pushu wykonać ręczny runtime test Supabase i dopisać wynik do `_project/11_USER_CONFIRMED_TESTS.md` oraz Obsidiana.
<!-- ETAP25_ORDER_PRICE_RUNTIME_TEST_V1_END -->


<!-- ETAP27_PUBLICATION_READINESS_RUNTIME_TEST_V2_START -->
## 2026-05-16 - Etap 27: sanity check publikacji projektu

STATUS:
- WDROZONE W KODZIE - TEST AUTOMATYCZNY / GUARD DO URUCHOMIENIA LOKALNIE.
- TEST RECZNY DO WYKONANIA.
- BRAK POTWIERDZONEGO TESTU RECZNEGO na realnych danych Supabase/UI admina.

FAKTY:
- `updateProjectStatusAction` uzywa `getProjectPublicationReadiness` przy probie ustawienia statusu `active`.
- Dodano guard scenariuszowy `npm run verify:project-publication-readiness-runtime-v27`.
- Guard sprawdza brak hero, miniatury, rzutu, prywatnego PDF/dokumentacji, wariantu/projektu podstawowego, pomieszczen oraz kompletny projekt.
- Naprawiono luke: pusty zestaw `rooms: []` blokuje publikacje przez `projectRooms`.
- Paczka V2 naprawia kruchy patch V1: zamiast szukac dokladnego bloku tekstu, usuwa warunek `if (rooms.length > 0)` przez bezpieczna operacje na liniach.

TESTY AUTOMATYCZNE:
- `npm run verify:project-publication-readiness-v35`
- `npm run verify:project-publication-readiness-runtime-v27`
- `npm run typecheck`
- `npm run build`
- `npm run check:project-memory`

TEST RECZNY DO WYKONANIA:
- Projekt bez hero nie przechodzi na active.
- Projekt bez miniatury nie przechodzi.
- Projekt bez rzutu nie przechodzi.
- Projekt bez prywatnego PDF/dokumentacji nie przechodzi.
- Projekt bez pomieszczen nie przechodzi.
- Kompletny projekt przechodzi.
- Komunikaty brakow sa czytelne.

RYZYKO:
- Guard scenariuszowy nie zastepuje testu na realnych rekordach Supabase i klikniecia w panelu admina.

NASTEPNY KROK:
- Po pushu wykonac reczny runtime test Etapu 27 na realnym projekcie.
<!-- ETAP27_PUBLICATION_READINESS_RUNTIME_TEST_V2_END -->


<!-- ETAP27_PUBLICATION_READINESS_RUNTIME_TEST_V3_START -->
## 2026-05-16 - Etap 27: sanity check publikacji projektu V3

STATUS:
- WDROZONE W KODZIE - TEST AUTOMATYCZNY / GUARD DO URUCHOMIENIA LOKALNIE.
- TEST RECZNY DO WYKONANIA.
- BRAK POTWIERDZONEGO TESTU RECZNEGO na realnych danych Supabase.

FAKTY:
- `app/admin/projekty/actions.ts` sprawdza readiness przy probie ustawienia `status === "active"`.
- Naprawiono luke: `projectRooms` nie moze byc warunkowe od `rooms.length > 0`, bo projekt bez pomieszczen ma blokowac publikacje.
- Dodano guard: `npm run verify:project-publication-runtime-v27`.
- Guard sprawdza brak hero, brak miniatury, brak rzutu, brak prywatnej dokumentacji, brak wariantu/projektu podstawowego, brak pomieszczen, kompletny projekt i czytelnosc komunikatow.

TESTY AUTOMATYCZNE:
- `npm run verify:project-publication-runtime-v27`
- `npm run verify:project-publication-readiness-v35`
- `npm run typecheck`
- `npm run build`
- `npm run check:project-memory`

TEST RECZNY DO WYKONANIA:
- Na realnych danych Supabase sprawdzic: projekt bez hero, bez miniatury, bez rzutu, bez prywatnego PDF, bez pomieszczen oraz kompletny projekt.
- Komunikaty brakow maja byc czytelne w adminie.

RYZYKO:
- Guard nie zastępuje testu klikniecia w adminie na realnym projekcie i realnych plikach Supabase/storage.

NASTEPNY KROK:
- Po pushu wykonac test reczny Etapu 27 i dopisac wynik do `_project/11_USER_CONFIRMED_TESTS.md` oraz Obsidiana.
<!-- ETAP27_PUBLICATION_READINESS_RUNTIME_TEST_V3_END -->

