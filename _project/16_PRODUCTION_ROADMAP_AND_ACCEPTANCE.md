# 16_PRODUCTION_ROADMAP_AND_ACCEPTANCE - Sklep projekty domow

<!-- ETAP32_PROJECT_MEMORY_ORDERING_2026_05_17_START -->
## Etap 32 - kanoniczny status produkcyjny V1

Status: V1 NIEZAMKNIĘTE / BLOKADA PUBLICZNEGO URUCHOMIENIA.
Data: 2026-05-17 Europe/Warsaw.

### Kanoniczny wpis statusu

Kod ma elementy Etapów 22-29, ale V1 nie jest zamknięte.

Największe blokady: płatności, runtime testy, potwierdzenie Damiana, finalny flow klienta.

### Tabela blokad

| Obszar | Status | Warunek zdjęcia blokady |
|---|---|---|
| Płatności | BLOKER / DO POTWIERDZENIA | Decyzja o providerze, wdrożone statusy płatności, webhook, sukces płatności i guardy. |
| Runtime testy | TEST RĘCZNY DO WYKONANIA | Pełna ścieżka V1 sprawdzona na realnych danych. |
| Potwierdzenie Damiana | BRAK POTWIERDZONEGO TESTU RĘCZNEGO | Jawny wpis: TEST RĘCZNY POTWIERDZONY PRZEZ DAMIANA. |
| Finalny flow klienta | DO POTWIERDZENIA | Ustalony i wdrożony checkout, success page, e-mail, prywatne pliki i ponowne pobranie. |
| Publiczny start | BLOKER | Brak powyższych blokad. |

### Najkrótszy test praktyczny przed release

Realny projekt active -> karta projektu -> koszyk -> checkout/zamówienie -> płatność/status płatności -> admin zamówień -> audit log -> wydanie prywatnych plików -> zapis wyniku w `_project` i Obsidianie.

### Status testów

- TEST RĘCZNY DO WYKONANIA.
- BRAK POTWIERDZONEGO TESTU RĘCZNEGO dla runtime V1 i finalnego flow klienta.
<!-- ETAP32_PROJECT_MEMORY_ORDERING_2026_05_17_END -->

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

<!-- ETAP27_BOM_REPAIR_V4_2026_05_16_START -->
## 2026-05-16 - Etap 27 V4: repair BOM po runtime guardzie publikacji

STATUS:
- NAPRAWA TECHNICZNA PO V3.
- TEST AUTOMATYCZNY DO URUCHOMIENIA LOKALNIE.
- TEST RECZNY DO WYKONANIA.

FAKTY:
- V3 dodal runtime guard sanity check publikacji, ale lokalny `package.json` zostal zapisany z UTF-8 BOM.
- BOM blokowal `JSON.parse` w guardzie i `next build`.
- V4 usuwa BOM z `package.json` i ponawia guardy/build.

TESTY AUTOMATYCZNE:
- `npm run verify:project-publication-runtime-v27`
- `npm run verify:project-publication-readiness-v35`
- `npm run typecheck`
- `npm run build`
- `npm run check:project-memory`

TEST RECZNY DO WYKONANIA:
- Na realnych danych Supabase sprawdzic publikacje projektu bez hero, miniatury, rzutu, prywatnego PDF, wariantu/projektu podstawowego i pomieszczen.
- Sprawdzic kompletny projekt oraz czy komunikaty brakow sa czytelne.

RYZYKO:
- V4 nie potwierdza runtime Supabase. Potwierdza tylko guard/test lokalny i build.
<!-- ETAP27_BOM_REPAIR_V4_2026_05_16_END -->

<!-- ETAP30_ROADMAP_PLATNOSCI_LEGACY_START -->
## Etap 30 - decyzja o platnosciach i status manual-payment

Status: WDROZONE JAKO KOREKTA ROADMAPY / PAMIECI PROJEKTU.
Priorytet: P1 / blokada kierunku.
Data: 2026-05-16.

### DECYZJE DAMIANA
- Nie wdrazamy platnosci recznych jako docelowego modelu.
- Aplikacja nie jest jeszcze publiczna.
- Docelowo platnosci maja byc automatyczne, np. Stripe albo inny provider po osobnej decyzji.
- Obecne teksty i guardy manual-payment sa legacy/do korekty przed publikacja.
- manual-payment sa legacy/do korekty przed publikacja.

### FAKTY / KONSEKWENCJE DLA REPO
- erify:manual-payment-v48 nie moze juz pilnowac platnosci recznych jako targetu produkcyjnego.
- Wzmianki o recznym modelu platnosci traktujemy jako legacy / etap przejsciowy / reczny fulfillment pomocniczy, nie finalny model sklepu.
- Przed publikacja trzeba usunac albo przepisac publiczne teksty sugerujace platnosci reczne jako docelowy model.
- Integracja platnosci online jest DO POTWIERDZENIA i wymaga osobnej decyzji: provider, flow, sukces platnosci, webhooki, wydawanie plikow, ponowne pobranie.

### TESTY / GUARDY
- Automatyczny guard: 
pm run verify:manual-payment-v48.
- Test reczny: BRAK DEDYKOWANEGO TESTU RECZNEGO - zmiana dotyczy roadmapy, dokumentacji i guardu kierunku, nie UI.

### NASTEPNA KOLEJNOSC
1. Zamknac Etap 30, zeby AI nie czytalo blednej roadmapy.
2. Wrocic do pre-release checklist i runtime/admin blockers.
3. Osobno zdecydowac provider platnosci automatycznych przed jakimkolwiek publicznym modelem oplat.
4. Nie rozwijac dalej platnosci recznych jako finalnej sciezki.
<!-- ETAP30_ROADMAP_PLATNOSCI_LEGACY_END -->

<!-- ETAP30_ROADMAP_PLATNOSCI_LEGACY_V6_REPAIR_START -->
## Etap 30 V6 repair - kanoniczna decyzja o platnosciach

Status: AKTYWNE ZRODLO PRAWDY DLA PLATNOSCI PRZED PUBLIKACJA.
Data: 2026-05-16.

### DECYZJE DAMIANA - KANONICZNE
- Nie wdrazamy platnosci recznych jako docelowego modelu.
- Aplikacja nie jest jeszcze publiczna.
- Docelowo platnosci maja byc automatyczne, np. Stripe albo inny provider po osobnej decyzji.
- manual-payment sa legacy/do korekty przed publikacja.

### KONSEKWENCJA
- Nie rozwijac dalej platnosci recznych jako finalnej sciezki.
- Manual-payment moze zostac tylko jako legacy / temporary / internal-only material do korekty przed publikacja.
- Provider platnosci automatycznych jest DO POTWIERDZENIA osobna decyzja.

### TEST / GUARD
- npm run verify:manual-payment-v48
- npm run verify:payment-direction-v48
<!-- ETAP30_ROADMAP_PLATNOSCI_LEGACY_V6_REPAIR_END -->

<!-- ETAP26A_V2_REPAIR_ROADMAP_2026_05_17_START -->
## Etap 26A V2 repair - Supabase project_files model

Status: V2 REPAIR W PACZCE / SQL URUCHOMIONE / TEST RĘCZNY DO WYKONANIA.

Warunek zamkniecia: APPLY V2 przechodzi guardy, SQL juz potwierdzony, Damian potwierdza runtime test publikacji i fulfillmentu.

Nastepny etap: Etap 26B admin UX plikow prywatnych.
<!-- ETAP26A_V2_REPAIR_ROADMAP_2026_05_17_END -->

<!-- ETAP26A_V5_GUARD_PATH_REPAIR_2026_05_17_START -->
## Etap 26A V5 - guard path repair

Status: NAPRAWA PACZKI / TESTY DO URUCHOMIENIA LOKALNIE.
Data: 2026-05-17.

FAKTY:
- V4 nie podmieniło guarda przez błąd ścieżki `payload/payload/files`.
- Guard 26A ma dotyczyć prywatnego modelu `project_files`, nie publicznych mediów projektu.
- SQL Etapu 26A jest już potwierdzony przez Damiana: `Success. No rows returned`.

ZMIANA:
- V5 podmienia `scripts/check-project-files-model-v26a.cjs`.
- Public URL markers są zakazane tylko w prywatnych źródłach Etapu 26A.

TESTY:
- `npm run verify:project-files-model-v26a`
- `npm run verify:private-files-fulfillment-v51`
- `npm run verify:project-publication-readiness-v35`
- `npm run typecheck`
- `npm run build`

TEST RĘCZNY:
- BRAK POTWIERDZONEGO TESTU RUNTIME.
<!-- ETAP26A_V5_GUARD_PATH_REPAIR_2026_05_17_END -->

<!-- ETAP38_SELECT_CONTRAST_FILTER_OPTIONS_2026_05_17_START -->
## Etap 38 - kontrast selectów i komplet wartości filtrów

Status: DO WDROŻENIA PO ETAPIE 26A / TEST RĘCZNY DO WYKONANIA.

Problem zgłoszony przez Damiana:
- rozwijane listy mają zły kontrast,
- część opcji jest niewidoczna albo trudna do odczytu,
- listy są niekompletne, np. liczba pokoi powinna mieć 1, 2, 3, 4, 5+.

Kryterium zamknięcia:
- publiczny katalog i admin mają czytelne dropdowny,
- wszystkie opcje są widoczne w ciemnym UI,
- opcje filtrów pochodzą z jednego źródła prawdy,
- guard i test ręczny są zapisane.
<!-- ETAP38_SELECT_CONTRAST_FILTER_OPTIONS_2026_05_17_END -->

<!-- ETAP26B_PRIVATE_FILES_UX_2026_05_17_START -->
## Etap 26B - prywatne pliki projektu admin UX

Status: DO REVIEW PO APPLY / TEST RĘCZNY DO WYKONANIA.

Zakres:
- prywatny upload `floorPlansPrivateFile`,
- `project_files.file_type = floor_plans`,
- aktywuj/dezaktywuj plik prywatny bez kasowania storage,
- audit log `project_private_file_status_update`,
- guard `verify:project-private-files-ux-v26b`.

Następny etap:
- Etap 26C - dobór aktywnych plików po `paid`, kontrolowany dostęp/signed URL i log wydania.
<!-- ETAP26B_PRIVATE_FILES_UX_2026_05_17_END -->

<!-- ETAP26B_V6_PRIVATE_FILES_UX_2026_05_17_START -->
## Etap 26B V6 - private files UX idempotent repair

Status: WDROZENIE LOKALNE / TESTY AUTOMATYCZNE W PACZCE / TEST RĘCZNY DO WYKONANIA.
Data: 2026-05-17.

Zakres:
- Dodano prywatny upload `floorPlansPrivateFile` jako `floor_plans`.
- Panel prywatnych plikow pokazuje aktywnosc, required, auto-send, bucket, path i wersje.
- Dodano aktywuj/dezaktywuj plik prywatny bez usuwania storage.
- Audit: `project_private_file_status_update`.
- `order-files.ts` zna `floor_plans` w fulfillment checklist.
- Dodano guard `npm run verify:project-private-files-ux-v26b`.

Testy automatyczne:
- `npm run verify:project-private-files-ux-v26b`
- `npm run verify:project-files-model-v26a`
- `npm run verify:private-files-fulfillment-v51`
- `npm run verify:project-publication-readiness-v35`
- `npm run typecheck`
- `npm run build`

Test reczny: TEST RĘCZNY DO WYKONANIA.
Nastepny krok po potwierdzeniu: Etap 26C - fulfillment po `paid` na aktywnych plikach.
<!-- ETAP26B_V6_PRIVATE_FILES_UX_2026_05_17_END -->

<!-- ETAP26B_V7_ORDER_FILES_FLOOR_PLANS_LABEL_REPAIR_2026_05_17_START -->
## Etap 26B V7 - order-files floor_plans label repair

Status: REPAIR / DO REVIEW / TEST RĘCZNY DO WYKONANIA.
Data: 2026-05-17.

Naprawiono brak `floor_plans` w checklistach plików zamówienia.

Zakres:
- `ADMIN_ORDER_PRIVATE_FILE_FULFILLMENT_KINDS` zawiera `floor_plans`,
- `ADMIN_ORDER_PRIVATE_FILE_LABELS` zawiera `Rzuty pomieszczeń PDF`,
- `fileMatchesKind()` rozpoznaje `floor_plans`,
- guard `verify:project-private-files-ux-v26b` sprawdza admin UX, akcję aktywacji/dezaktywacji, audit i order-files.

Test ręczny: BRAK POTWIERDZONEGO TESTU RĘCZNEGO.
<!-- ETAP26B_V7_ORDER_FILES_FLOOR_PLANS_LABEL_REPAIR_2026_05_17_END -->

<!-- ETAP26B_V10_PRIVATE_FILES_UX_FINAL_REPAIR_START -->
## Etap 26B V10 - prywatne pliki projektu admin UX

Status: WDROZONE LOKALNIE PRZEZ ZIP / TESTY AUTOMATYCZNE DO URUCHOMIENIA / TEST RECZNY DO WYKONANIA.

Zakres:
- prywatny upload `floorPlansPrivateFile` jako `floor_plans`,
- aktywuj/dezaktywuj prywatny plik bez kasowania storage,
- audit `project_private_file_status_update`,
- `floor_plans` w checklistach zamowien,
- guard `verify:project-private-files-ux-v26b`.

Test reczny: BRAK POTWIERDZONEGO TESTU RECZNEGO.
<!-- ETAP26B_V10_PRIVATE_FILES_UX_FINAL_REPAIR_END -->


<!-- ETAP26B_V11_CLEAN_REAPPLY_2026_05_17_START -->
## Etap 26B V11 - private files UX clean reapply

Status: WDROŻONE LOKALNIE W PACZCE / TESTY AUTOMATYCZNE DO URUCHOMIENIA / TEST RĘCZNY DO WYKONANIA.

Zakres:
- czyste odtworzenie plików po częściowych próbach V3-V10,
- prywatny upload `floor_plans`,
- aktywacja/dezaktywacja prywatnych plików,
- audit `project_private_file_status_update`,
- `floor_plans` w checklistach plików zamówienia,
- guard `verify:project-private-files-ux-v26b`.

Test ręczny: BRAK POTWIERDZONEGO TESTU RĘCZNEGO.
<!-- ETAP26B_V11_CLEAN_REAPPLY_2026_05_17_END -->

<!-- ETAP26B_V13_PRIVATE_FILES_UX_CLEAN_APPLY_START -->
## Etap 26B V13 - prywatne pliki projektu admin UX

Status: WDROŻONE W PACZCE / TESTY AUTOMATYCZNE DO URUCHOMIENIA LOKALNIE / TEST RĘCZNY DO WYKONANIA.

Zakres:
- prywatny upload `floorPlansPrivateFile`,
- `file_type = floor_plans`,
- widok `Rzuty pomieszczeń PDF` w panelu edycji projektu,
- przyciski `Aktywuj plik` i `Dezaktywuj plik`,
- audit `project_private_file_status_update`,
- `floor_plans` w checklistach plików zamówienia,
- guard `verify:project-private-files-ux-v26b`.

Testy automatyczne:
- `npm run verify:project-private-files-ux-v26b`
- `npm run verify:project-files-model-v26a`
- `npm run verify:private-files-fulfillment-v51`
- `npm run verify:project-publication-readiness-v35`
- `npm run typecheck`
- `npm run build`

Test ręczny:
- TEST RĘCZNY DO WYKONANIA: dodać PDF rzutów, zapisać projekt, aktywować/dezaktywować plik, sprawdzić `/admin/audit`.
<!-- ETAP26B_V13_PRIVATE_FILES_UX_CLEAN_APPLY_END -->

<!-- ETAP26B_V14_STAGE_MARKER_REPAIR_2026_05_17_START -->
## Etap 26B V14 - stage marker repair po V13

Status: NAPRAWA TECHNICZNA / TESTY DO URUCHOMIENIA LOKALNIE.
Data: 2026-05-17.

FAKTY:
- V13 zastosowal payload i guard 26B przeszedl.
- Guard 26A zatrzymal etap, bo w actions.ts brakowalo markera metadata: stage: "ETAP26A_PROJECT_FILES_MODEL".
- V14 naprawia tylko marker zgodnosci z Etapem 26A i zostawia logike 26B.

TESTY WYMAGANE:
- npm run verify:project-private-files-ux-v26b
- npm run verify:project-files-model-v26a
- npm run verify:private-files-fulfillment-v51
- npm run verify:project-publication-readiness-v35
- npm run typecheck
- npm run build

TEST RECZNY:
- BRAK POTWIERDZONEGO TESTU RECZNEGO.
<!-- ETAP26B_V14_STAGE_MARKER_REPAIR_2026_05_17_END -->

<!-- ETAP26C_POST_PAYMENT_PROJECT_FILES_2026_05_17_START -->
## Etap 26C - post-payment project files fulfillment

Status: ZIP/APPLY / TESTY AUTOMATYCZNE W PACZCE / TEST RĘCZNY DO WYKONANIA.
Data: 2026-05-17.

Zakres:
- fulfillment po `paid` używa aktywnych plików z `project_files`,
- `floor_plans` jest uwzględniany w panelu pobrań,
- `pdf_email_package` jest wymagany tylko przy dodatku PDF na e-mail,
- linki są signed URL z krótkim TTL, nie publiczne URL,
- logi trafiają do `order_download_events`,
- realny e-mail zostaje na Etap 26D.

Testy automatyczne:
- `npm run verify:post-payment-project-files-v26c`
- `npm run verify:stage36-post-payment-fulfillment`
- `npm run verify:project-private-files-ux-v26b`
- `npm run verify:project-files-model-v26a`
- `npm run verify:private-files-fulfillment-v51`
- `npm run typecheck`
- `npm run build`

Test ręczny: TEST RĘCZNY DO WYKONANIA.
Następny krok: Etap 26D - realna wysyłka e-mail po decyzji o providerze.
<!-- ETAP26C_POST_PAYMENT_PROJECT_FILES_2026_05_17_END -->


<!-- ETAP26D_NOREPLY_EMAIL_PAYMENTS_DECISION_2026_05_17_START -->
## Etap 26D / 39A - no-reply email i realne platnosci online

Status: ZAPISANE DO WDROZENIA / PRIORYTET P0-P1 / TEST RECZNY DO WYKONANIA.

Kolejnosc:
1. Etap 39A - realne platnosci online: provider, checkout, webhook, status `paid`, idempotencja.
2. Etap 26D - email outbox no-reply: payment confirmation + project files access, fake provider, potem real provider po env/DNS.

Zasady:
- email tylko z adresu kontrolowanego przez Damiana / marke sklepu,
- no-reply bez obslugi odpowiedzi,
- PDF na e-mail tylko przy wykupionym dodatku,
- bez dodatku PDF klient dostaje tylko bazowe aktywne pliki projektu, w szczegolnosci rzuty pomieszczen,
- nie wysylac publicznych linkow do storage.
<!-- ETAP26D_NOREPLY_EMAIL_PAYMENTS_DECISION_2026_05_17_END -->

<!-- ETAP39A_STRIPE_REAL_PAYMENTS_2026_05_17_START -->
## Etap 39A - Stripe real payments foundation

Status: WDROZONE LOKALNIE W ZIP / TESTY AUTOMATYCZNE W PACZCE / TEST RECZNY DO WYKONANIA.
Data: 2026-05-17.

Zakres:
- Stripe Checkout Session po zapisaniu zamowienia.
- Webhook `/api/payments/stripe/webhook` jako jedyne zrodlo prawdy dla `paid`.
- `order_payments` i `payment_events`.
- Success page nie wydaje plikow.
- Fulfillment access z Etapu 26C dopiero po `paid`.
- Realne maile no-reply zostaja na Etap 26D.

Testy:
- `npm run verify:stripe-real-payments-v39a`
- `npm run verify:post-payment-project-files-v26c`
- `npm run verify:stage36-post-payment-fulfillment`
- `npm run verify:project-private-files-ux-v26b`
- `npm run verify:project-files-model-v26a`
- `npm run typecheck`
- `npm run build`

Test reczny: TEST RECZNY DO WYKONANIA.
<!-- ETAP39A_STRIPE_REAL_PAYMENTS_2026_05_17_END -->

<!-- ETAP39B_ROADMAP_ACCEPTANCE_START -->
## Etap 39B - Stripe runtime test-mode

Status: TEST RÄCZNY DO WYKONANIA.

Cel produkcyjny:
- potwierdziÄ‡, ĹĽe 39A dziaĹ‚a na realnym test-mode webhooku,
- potwierdziÄ‡, ĹĽe fulfillment 26C nie odpala bez paid,
- zebraÄ‡ dowody SQL przed wejĹ›ciem w fake email outbox 26D.

Akceptacja:
- SQL PASS dla pĹ‚atnoĹ›ci, eventĂłw, fulfillment access i download events,
- guard DB PASS: brak fulfillmentu/downloadu bez paid,
- brak sekretĂłw w repo,
- wynik dopisany w _project i Obsidianie.
<!-- ETAP39B_ROADMAP_ACCEPTANCE_END -->

