# 03_CURRENT_STAGE - aktualny etap

<!-- ETAP32_PROJECT_MEMORY_ORDERING_2026_05_17_START -->
## Etap 32 - uporządkowanie pamięci projektu i statusu V1

Status: WDROŻONE W PAMIĘCI PROJEKTU / V1 NADAL NIEZAMKNIĘTE.
Priorytet: 3.
Data: 2026-05-17 Europe/Warsaw.

### Główna teza

Kod ma elementy Etapów 22-29, ale V1 nie jest zamknięte.

Największe blokady: płatności, runtime testy, potwierdzenie Damiana, finalny flow klienta.

### FAKTY Z REPO / PAMIĘCI PROJEKTU

- W repo są elementy techniczne z Etapów 22-29: audit admina, poprawki admina, preview, walidacje, prywatne pliki, blokady demo/sample i pre-release checklist.
- Te elementy nie oznaczają gotowości V1 do publicznego uruchomienia.
- Etap 29 pozostaje checklistą blokad i warunków, nie certyfikatem gotowości produkcyjnej.
- Ten Etap 32 nie zmienia UI, checkoutu, płatności ani logiki aplikacji. Porządkuje źródła prawdy: `_project` i Obsidian.

### DECYZJE DAMIANA / KIERUNEK

- Nie traktować ręcznych płatności jako docelowego modelu sprzedaży.
- Aplikacja pozostaje niepubliczna do czasu domknięcia płatności, runtime testów i finalnego flow klienta.
- Produkcyjne płatności online wymagają osobnego etapu i decyzji o providerze, webhookach, statusach płatności i wydawaniu plików.

### BLOKERY V1

1. Płatności: brak wdrożonego docelowego flow płatności online; manual-payment może być tylko technicznym/tymczasowym flow przed publikacją.
2. Runtime testy: brak potwierdzenia pełnej ścieżki realny projekt -> koszyk -> checkout/zamówienie -> admin -> audit.
3. Potwierdzenie Damiana: brak ręcznego potwierdzenia, że V1 działa end-to-end na realnych danych.
4. Finalny flow klienta: do decyzji pozostają strona sukcesu, status płatności, webhook, wydawanie prywatnych plików, e-mail i ponowne pobranie.

### TESTY

- TEST AUTOMATYCZNY / GUARD: `npm run verify:project-memory-stage32`.
- TEST AUTOMATYCZNY / GUARD: `npm run check:project-memory`.
- TEST RĘCZNY DO WYKONANIA: Damian ma otworzyć Obsidian dashboard i potwierdzić, że status V1 oraz blokery są czytelne.
- BRAK POTWIERDZONEGO TESTU RĘCZNEGO: Etap 32 nie potwierdza działania runtime aplikacji.

### NASTĘPNY KROK

Najpierw doprecyzować finalny flow klienta i płatności, potem wykonać runtime test admin/audit oraz pełny flow V1 bez publikacji klientom.
<!-- ETAP32_PROJECT_MEMORY_ORDERING_2026_05_17_END -->

<!-- ETAP_B_PROJECT_MEMORY_STATUS_FIX_START -->
## Aktualny realny stan - Etap B: naprawa project memory

Status: NIEKOMPLETNE / DO DOMKNIĘCIA PRZED PUBLICZNYM URUCHOMIENIEM.
Data aktualizacji: 2026-05-16_1810 Europe/Warsaw.

### FAKTY Z REPO I PROJECT MEMORY

Kod ma wdrożone elementy etapów 22-29, ale nie wszystkie są zamknięte produkcyjnie.

Nie wolno traktować Etapu 29 jako pełnego zamknięcia V1, ponieważ:
- runtime V1 nie jest potwierdzony ręcznie,
- audit runtime nie jest potwierdzony ręcznie dla wszystkich operacji,
- obecny flow płatności ręcznej jest sprzeczny z decyzją Damiana,
- docelowe płatności automatyczne nie są wdrożone,
- aplikacja nie jest jeszcze publiczna dla klientów.

### DECYZJA DAMIANA

Nie wdrażamy płatności ręcznych jako docelowego modelu. Docelowy kierunek to automatyczne płatności online: Stripe/payment provider, webhooki i statusy płatności.

### NASTĘPNY REALNY ETAP

1. Domknąć Etap A: korekta kierunku płatności i roadmapy.
2. Potem: runtime audit admina i pełny flow sklepu bez publikacji klientom.
3. Dopiero po ręcznych potwierdzeniach Damiana można wracać do pre-release checklist V1.

### STATUS TESTÓW RĘCZNYCH

TEST RĘCZNY DO WYKONANIA dla runtime V1, audit runtime i flow admina.

### BLOKERY PRODUKCYJNE

- Brak potwierdzonego runtime testu pełnej ścieżki V1.
- Brak potwierdzonego runtime audit logu dla wszystkich ważnych operacji admina.
- Brak automatycznych płatności.
- Brak zgody na publiczne udostępnienie klientom.
<!-- ETAP_B_PROJECT_MEMORY_STATUS_FIX_END -->

<!-- ETAP_A_PAYMENT_DIRECTION_FIX_START -->
## Aktualny etap - Etap A

Etap A - korekta kierunku płatności i usunięcie ręcznych płatności jako docelowego modelu.

### Decyzja

Nie wdrażamy płatności ręcznych jako docelowego modelu.

### Obecny stan

Manual-payment flow może istnieć wyłącznie jako legacy / temporary / internal only, ponieważ aplikacja nie jest jeszcze publicznie udostępniona.

### Warunek przed publicznym uruchomieniem

Manual-payment flow musi zostać usunięty albo zastąpiony automatycznymi płatnościami.

### Docelowo

Stripe/payment provider, webhooki i statusy płatności.

### Test ręczny

TEST RĘCZNY DO WYKONANIA.
<!-- ETAP_A_PAYMENT_DIRECTION_FIX_END -->

Ostatnia aktualizacja: 2026-05-15 22:20 Europe/Warsaw

## Historyczny wpis - stary blok Etapu 20 (nieaktywny)

Etap 20: Widok audit logu `/admin/audit`

## Status etapu

Przygotowany w paczce ZIP do wdrożenia lokalnego. ChatGPT/operator paczek nie pushuje sam. Jedno polecenie PowerShell ma wykonać wdrożenie, checki, commit i push z lokalnego repo.

## Cel etapu

Audit log ma być widoczny z panelu admina. Po operacji admina można wejść w `/admin/audit` i zobaczyć ślad: data, admin, akcja, typ encji, ID encji i skrót metadata.

## Co zostanie zrobione

- Dodanie strony `/admin/audit`.
- Dodanie czytania wpisów z tabeli `admin_audit_log`.
- Dodanie filtrowania po typie akcji.
- Dodanie widoku tabeli audit logu:
  - data,
  - admin,
  - akcja,
  - typ encji,
  - ID encji,
  - skrót metadata.
- Dodanie linku `Audit` w `AdminHeader`.
- Dodanie kafla `Audit` na dashboardzie admina.
- Rozszerzenie guardu `verify:admin-audit-log-v44`.
- Aktualizacja pamięci projektu i raportu run.

## Czego nie zmieniać

- Nie zmieniać mechanizmu auth.
- Nie zmieniać logiki operacji admina.
- Nie zmieniać publicznych stron.
- Nie dodawać nowych mutacji na stronie audit.
- Nie zmieniać sposobu zapisu audit logu poza dodaniem odczytu.

## Checki wymagane

```powershell
npm run verify:admin-audit-log-v44
npm run typecheck
npm run build
npm run check:project-memory
```

## Kryterium zakończenia

Po operacji admina można wejść w `/admin/audit` i zobaczyć ślad operacji.

<!-- SKLEP_FULL_MEMORY_OBSIDIAN_REPO_V6_2026_05_15 START -->

## Update 2026-05-15 22:12:34

Current stage: full project memory + Obsidian dashboard + implementation/test history + naming audit.

This stage does not change storefront logic, admin UI, checkout or routing.

<!-- SKLEP_FULL_MEMORY_OBSIDIAN_REPO_V6_2026_05_15 END -->

<!-- ETAP21_ADMIN_AUDIT_REAL_COVERAGE_2026_05_16 -->

## 2026-05-16 - Etap 21: realne domkniecie audit logu admina

FAKT:
- Dodano realne markery i pokrycie audit logu dla brakujacych mutacji admina:
  - project_create,
  - project_sample_create,
  - project_media_delete,
  - project_media_type_update,
  - project_private_file_delete.
- Guard statyczny verify:admin-audit-log-v44 ma sprawdzac nie tylko widok /admin/audit, ale tez realne markery implementacji w akcjach admina.

TEST RĘCZNY DO WYKONANIA:
- Runtime audit w /admin/audit po realnych operacjach admina: utworzenie projektu, sample project, media delete/type update, private file delete.

BRAK POTWIERDZONEGO TESTU:
- Do momentu klikniecia flow lokalnie przez Damiana runtime wpisy w admin_audit_log pozostaja niepotwierdzone.

## 2026-05-16 - Etap 21 real audit coverage V6

### FAKT
- Domknięto realne pokrycie admin audit log dla tworzenia projektu, projektu przykładowego, usuwania mediów, zmiany typu mediów i usuwania prywatnego pliku projektu.
- Guard verify:admin-audit-log-v44 sprawdza teraz markery w poprawnych plikach: project_create w app/admin/projekty/nowy/actions.ts, a operacje mediów/sample/private file w app/admin/projekty/actions.ts.

### TESTY AUTOMATYCZNE
- npm run verify:admin-audit-log-v44
- npm run verify:admin-orders-v42
- npm run verify:manual-email-drafts-v47
- npm run verify:manual-payment-v48
- npm run typecheck
- npm run build
- npm run check:project-memory

### TEST RĘCZNY DO WYKONANIA
- Runtime audit w /admin/audit po realnych operacjach admina: create project, status update, media delete/type update, private file delete, order status/checklist.

<!-- ETAP22_RUNTIME_AUDIT_ADMINA_START -->
## Etap 22 — Runtime audit admina i zamknięcie Etapu 21

FAKT:
- Etap 22 zaostrza Etap 21: audit admina ma być potwierdzany nie tylko statycznie, ale przez realne operacje w panelu admina i wpisy w /admin/audit.
- Rozszerzono kontrakt metadata audit logu: source, projectCode/orderId, fromStatus/toStatus albo poprzednie/nowe wartości dla operacji bez klasycznego statusu.

DECYZJA DAMIANA:
- To jest następny etap, przekonanie 10/10.
- Manualny runtime test zostaje wymagany przed pełnym zamknięciem etapu.

TEST RĘCZNY:
- Status: TEST RĘCZNY DO WYKONANIA.
- Kryterium: po realnych operacjach admina wpisy są widoczne w /admin/audit z poprawnym action, entity_type, entity_id i metadata.

BRAKI I RYZYKA:
- Automatyczny guard pilnuje kontraktu kodu, ale nie zastępuje kliknięcia runtime w panelu admina i sprawdzenia realnej tabeli admin_audit_log.
<!-- ETAP22_RUNTIME_AUDIT_ADMINA_END -->

<!-- ETAP23_ADMIN_DELETE_ARCHIVE_FIX_START -->
## Etap 23 - poprawka archiwizacji i trwalego usuwania projektu

FAKT:
- Zgloszono runtime regresje: nie dalo sie usunac projektu active, a archiwizacja nie dawala jasnego efektu.
- Hard delete active jest teraz dozwolony po wpisaniu kodu projektu i dodatkowym confirm.
- Ekran edycji projektu ma bezposredni przycisk archiwizacji w strefie usuwania.

TEST RECZNY:
- Status: TEST RECZNY DO WYKONANIA.
- Sprawdzic: archiwizacja z listy, archiwizacja z edycji, hard delete projektu active po kodzie, wpis w /admin/audit.

RYZYKO:
- Operacja hard delete active jest destrukcyjna. Bezpieczniki: kod projektu, confirm, audit log.
<!-- ETAP23_ADMIN_DELETE_ARCHIVE_FIX_END -->

<!-- ETAP23_ADMIN_DELETE_ARCHIVE_FIX_V4_START -->
## Etap 23 V4 - repair archiwizacji i trwalego usuwania

FAKT:
- Naprawiono workflow admina po zgloszeniu Damiana: archiwizacja nie dawala czytelnego efektu, a hard delete byl blokowany dla active.
- Hard delete active jest dozwolony po wpisaniu kodu projektu i confirmie.
- Ekran edycji ma teraz archiwizacje w strefie usuwania.
- Guardy pilnuja nowego kontraktu: returnTo dla archiwizacji, kod projektu dla hard delete, audit log.

TEST RECZNY:
- Status: TEST RECZNY DO WYKONANIA.
- Sprawdzic: archiwizacja z edycji, archiwizacja z listy, hard delete active po kodzie, wpisy /admin/audit.

RYZYKO:
- Hard delete active jest destrukcyjny. Bezpieczniki: wpisanie kodu, confirm, audit log.
<!-- ETAP23_ADMIN_DELETE_ARCHIVE_FIX_V4_END -->

<!-- ETAP23_ADMIN_DELETE_ARCHIVE_FIX_V5 -->
## Etap 23 V5 — repair archiwizacji i trwałego usuwania projektu

FAKT:
- Naprawiono przeplyw admina: archiwizacja dostaje returnTo i moze wracac na ekran edycji.
- Trwale usuniecie nie jest juz blokowane samym statusem active; wymaga kodu projektu i potwierdzenia.
- Active project nadal pokazuje ostrzezenie i confirm, ale nie zamienia sie w martwy guzik.

TESTY:
- Automatyczne checki do uruchomienia przez APPLY V5: verify:admin-buttons-v19, verify:admin-audit-log-v44, typecheck, build, check:project-memory.

TEST RECZNY:
- TEST RECZNY DO WYKONANIA: archiwizacja z edycji, hard delete po wpisaniu kodu, wpisy w /admin/audit.
<!-- ETAP23_ADMIN_DELETE_ARCHIVE_FIX_V5 -->

<!-- ETAP23_ADMIN_DELETE_ARCHIVE_FIX_V7 -->
## Etap 23 V7 - admin archive/delete runtime repair

FAKT:
- Naprawiono workflow archiwizacji i trwałego usuwania projektu w adminie po regresji zgłoszonej przez Damiana.
- Usuniecie trwałe nie jest juz blokowane samym statusem active; nadal wymaga wpisania kodu projektu i confirmu.
- Archiwizacja jest dostepna bezposrednio na ekranie edycji i moze wracac przez returnTo.

TEST RECZNY:
- TEST RECZNY DO WYKONANIA: Damian ma kliknac Archiwizuj oraz Usun trwale po wpisaniu kodu projektu i sprawdzic /admin/audit.
<!-- ETAP23_ADMIN_DELETE_ARCHIVE_FIX_V7 -->

<!-- ETAP23_ARCHIVE_RUNTIME_FIX_V8 -->
## Etap 23 V8 - archiwizacja runtime projektu

FAKT:
- Po V7 Damian potwierdzil, ze archiwizacja nadal nie dziala runtime.
- Wzmocniono server action archiwizacji: update zwraca zaktualizowany rekord przez select(id,status,updated_at) i sprawdza, czy status faktycznie jest archived.
- Ekran edycji pokazuje teraz blad akcji admina przez data-admin-edit-archive-error, zamiast tylko migac ekranem.

GUARDY:
- Dodano npm run verify:admin-archive-delete-runtime-v23.
- Guard pilnuje returnTo, archiveUpdateResult, weryfikacji statusu archived, komunikatu bledu i rewalidacji edycji.

TEST RECZNY:
- TEST RECZNY DO WYKONANIA: kliknac Archiwizuj na edycji, sprawdzic status i /admin/audit.
<!-- ETAP23_ARCHIVE_RUNTIME_FIX_V8 -->

<!-- ETAP23_ARCHIVE_RUNTIME_FIX_V9 -->
## Etap 23 V9 - naprawa guarda po V8 archive runtime

FAKT:
- V8 poprawnie wzmocnil archiwizacje runtime i nowy guard przeszedl.
- Stary guard V19 nadal oczekiwal starego jednowierszowego redirectu archive, wiec blokowal commit mimo poprawnego flow.
- V9 dopasowuje V19 do nowego kontraktu: redirectArchiveError, archiveUpdateResult, select(id,status,updated_at), archiveUpdateVerified i archived=1&archive_status.

GUARDY:
- verify:admin-archive-delete-runtime-v23
- verify:admin-buttons-v19
- verify:admin-audit-log-v44
- typecheck
- build
- check:project-memory

TEST RECZNY:
- TEST RECZNY DO WYKONANIA: kliknac Archiwizuj na ekranie edycji, sprawdzic status i /admin/audit.
<!-- ETAP23_ARCHIVE_RUNTIME_FIX_V9 -->

<!-- ETAP24_ADMIN_ACTION_FEEDBACK_ARCHIVE_FIX -->
## Etap 24 - admin action feedback i archiwizacja bez martwych przyciskow

FAKT:
- Po V9 Damian pokazal, ze przycisk Zarchiwizowany wyglada jak martwy guzik i akcje admina nie maja czytelnego hover/active/pending.
- Zarchiwizowany projekt nie renderuje juz przycisku submit; renderuje status role=status z data-admin-action="project-archive-state".
- Aktywne akcje admina dostaly wspolna warstwe hover, active, focus-visible, pending i disabled.

GUARDY:
- Dodano npm run verify:admin-action-feedback-v24.
- Guard pilnuje braku starej warstwy disabled archived button oraz obecnosci hover/active/pending CSS.

TEST RECZNY:
- TEST RECZNY DO WYKONANIA: sprawdzic hover, klik/active, pending oraz archiwizacje projektu niearchived.
<!-- ETAP24_ADMIN_ACTION_FEEDBACK_ARCHIVE_FIX -->

<!-- ETAP25_ADMIN_PUBLIC_PREVIEW_404_FIX -->
## Etap 25 - admin public preview bez 404

FAKT:
- Zgloszono, ze Podglad publiczny z admina prowadzi do 404 dla projektow, ktore nie sa active/publiczne.
- Dodano chroniona trase admin preview /admin/projekty/[id]/podglad, ktora czyta projekt po ID bez filtra status=active.
- Link akcji Podglad publiczny w adminie wskazuje na trase admin preview, a publiczny link /projekty/[slug] zostaje tylko dla projektow active.

GUARDY:
- Dodano npm run verify:admin-public-preview-v25.
- Guard pilnuje trasy admin preview, getAdminPreviewProjectById, braku 404 dla draft/hidden/archived oraz braku linkowania akcji preview do publicznego sluga.

TEST RECZNY:
- TEST RECZNY DO WYKONANIA: kliknac Podglad publiczny dla projektu draft/hidden/archived i potwierdzic, ze nie ma 404.
<!-- ETAP25_ADMIN_PUBLIC_PREVIEW_404_FIX -->

<!-- ETAP22C_RUNTIME_ADMIN_AUDIT_SQL_PACKAGE_START -->
## Etap 22C - runtime audit admina / SQL proof package

Status: CZĘŚCIOWO WDROŻONE. NIEZAMKNIĘTE RUNTIME.
Data: 2026-05-16.

### FAKTY

- Kod i guardy auditowe istnieją.
- `verify:admin-audit-log-v44` pilnuje statycznego kontraktu audit logu.
- Automatyczne checki po Etapie 22 nie są ręcznym potwierdzeniem runtime.
- Dodano SQL proof: `supabase/manual/2026-05-16_etap22_runtime_admin_audit_verification.sql`.
- Dodano guard dokumentacyjny/runtime package: `verify:admin-audit-runtime-v53`.

### DECYZJA DAMIANA

- Nie robić bezpośredniego commit/push przez ChatGPT connector.
- Dostarczać ZIP + jedno polecenie PowerShell.
- Obsidian aktualizować w paczce.

### STATUS TESTU RĘCZNEGO

TEST RĘCZNY DO WYKONANIA.

### KRYTERIUM ZAMKNIĘCIA

Etap 22C można zamknąć dopiero, gdy po realnych operacjach admina:
- `/admin/audit` pokazuje poprawne wpisy,
- SQL `admin_audit_runtime_last_24h` pokazuje `failed_actions = 0`,
- Damian potwierdzi test ręczny.
<!-- ETAP22C_RUNTIME_ADMIN_AUDIT_SQL_PACKAGE_END -->

<!-- ETAP23Z_ARCHIVE_DELETE_RUNTIME_ACCEPTANCE_2026_05_16 -->
## 2026-05-16 - Etap 23Z: archiwizacja i hard delete runtime acceptance

FAKTY:
- Etap 23 mial wiele poprawek: V4, V5, V7, V8 i V9.
- Kod archiwizacji ma guard statyczny V23 oraz rozszerzenie V23Z.
- Hard delete jest dopuszczony tylko po wpisaniu kodu projektu i ma audit dla blokady oraz sukcesu.
- Ten wpis nie zamyka testu recznego.

GUARDY:
- 
pm run verify:admin-archive-delete-runtime-v23z
- 
pm run verify:admin-archive-delete-runtime-v23
- 
pm run verify:admin-action-feedback-v24
- 
pm run verify:admin-audit-log-v44
- 
pm run check:project-memory
- 
pm run typecheck
- 
pm run build

TEST RECZNY:
- Status: TEST RECZNY DO WYKONANIA.
- Wykonac tylko na projekcie testowym przeznaczonym do usuniecia.

KRYTERIUM ZAMKNIECIA:
- Etap 23 mozna oznaczyc jako zamkniety dopiero po TEST RECZNY POTWIERDZONY PRZEZ DAMIANA.

RYZYKO:
- Hard delete jest destrukcyjny. Blad testu na realnym projekcie moze usunac dane i pliki.

NASTEPNY KROK:
- Wykonac checklist z _project/17_ETAP23Z_ARCHIVE_HARD_DELETE_RUNTIME_ACCEPTANCE.md.
<!-- ETAP23Z_ARCHIVE_DELETE_RUNTIME_ACCEPTANCE_2026_05_16 -->

<!-- ETAP23Z_V3_BOM_GUARD_FIX_2026_05_16 -->
## 2026-05-16 - Etap 23Z V3: BOM-safe guard fix

FAKT:
- V2 przerwalo sie na erify:admin-archive-delete-runtime-v23z, bo package.json mial BOM, a guard robil bezposredni JSON.parse(read("package.json")).
- V3 podmienia guard na wersje z stripBom i normalizuje zapis package.json do UTF-8 bez BOM.
- Zakres funkcjonalny Etapu 23Z bez zmian.

TESTY AUTOMATYCZNE:
- 
pm run verify:admin-archive-delete-runtime-v23z
- 
pm run verify:admin-archive-delete-runtime-v23
- 
pm run verify:admin-action-feedback-v24
- 
pm run verify:admin-audit-log-v44
- 
pm run check:project-memory
- 
pm run typecheck
- 
pm run build

TEST RECZNY:
- Nadal TEST RECZNY DO WYKONANIA. V3 nie potwierdza runtime.
<!-- ETAP23Z_V3_BOM_GUARD_FIX_2026_05_16 -->

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

<!-- ETAP29_PRERELEASE_CHECKLIST_BLOCKER_2026_05_16_START -->
## 2026-05-16 - Etap 29: pre-release checklist istnieje, ale V1 nie jest gotowe

### FAKT Z CHECKLISTY / STATUSU PROJEKTU

Checklist Etapu 29 istnieje i jest aktywnym dokumentem pre-release V1, ale nie jest dowodem gotowości produkcyjnej.

Aktualny wniosek:
- **CHECKLIST ISTNIEJE**.
- **V1 NIE JEST GOTOWE**.
- **Etap 29 jest listą blokad i warunków**, nie potwierdzeniem zamknięcia V1.
- Nie wolno traktować Etapu 29 jako zielonego światła do publicznego uruchomienia.

### Najważniejsze blokady

- Env Supabase: DO POTWIERDZENIA.
- Public storage: DO POTWIERDZENIA.
- Private storage: DO POTWIERDZENIA.
- Migracje: DO POTWIERDZENIA.
- Publiczny katalog: TEST RĘCZNY DO WYKONANIA / DO POTWIERDZENIA.
- Karta projektu: TEST RĘCZNY DO WYKONANIA / DO POTWIERDZENIA.
- Koszyk i checkout: DO POTWIERDZENIA.
- Admin zamówień: DO POTWIERDZENIA.
- Admin audit: DO POTWIERDZENIA.
- Pełny runtime test Damiana: BLOKADA.
- Płatności: nadal rozjazd względem decyzji, bo ręczne płatności nie są docelowym modelem, a automatyczne płatności online nie są wdrożone.

### Status etapu

- Kod: BEZ ZMIAN W TYM ZAPISIE.
- Guardy: istnieją częściowe guardy/checklisty, ale nie zastępują runtime testu.
- Test automatyczny: DO POTWIERDZENIA przez `npm run verify`.
- Test ręczny: TEST RĘCZNY DO WYKONANIA.
- Potwierdzenie Damiana: BRAK POTWIERDZONEGO TESTU RĘCZNEGO dla pełnego V1.
- Obsidian: ZAKTUALIZOWANY TYM WPISEM.
- V1 publicznie: BLOKADA.

### Najkrótszy test zamykający V1

Realny projekt active -> publiczny katalog -> karta projektu -> koszyk -> checkout/zamówienie -> admin zamówień -> audit log -> sprawdzenie storage/private files -> wpis wyniku do `_project` i Obsidiana.

Jeżeli którykolwiek punkt pęka albo jest niepotwierdzony, V1 nie jest gotowe.

### Następny kierunek

1. Domknąć Etap 28D w kodzie i guardach, bo SQL/RLS już zapisane, ale aplikacja nadal musi filtrować `is_demo = false`.
2. Potem wykonać runtime testy blokad Etapu 29.
3. Etap 29 zamykać dopiero po potwierdzeniu Damiana i po usunięciu/rozwiązaniu blokad.
<!-- ETAP29_PRERELEASE_CHECKLIST_BLOCKER_2026_05_16_END -->

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

\n
\n

<!-- ETAP31_CHECKOUT_NONPUBLIC_PAYMENT_LATER_START -->
## 2026-05-16 - Etap 31: checkout jako aplikacja niepubliczna, płatności później

STATUS: WDROŻONE LOKALNIE / DO TESTU RĘCZNEGO.

FAKTY:
- Checkout /zamowienie jest komunikowany jako techniczny test zamówienia.
- Zamówienie jest bez płatności.
- To etap przed integracją płatności online, webhooków i statusów płatności.
- Checkout ma pozostać niewidoczny publicznie do czasu gotowości sklepu.
- Nie komunikujemy klientowi ręcznego przelewu jako docelowego flow.

TEST RĘCZNY:
- TEST RĘCZNY DO WYKONANIA.
- Sprawdzić /zamowienie: brak języka o ręcznym przelewie, ekran opisuje techniczny test, zamówienie bez płatności i etap przed integracją płatności.

RYZYKA:
- Bez ręcznego sprawdzenia UI nie potwierdzamy finalnego brzmienia copy w przeglądarce.
- Checkout nadal istnieje technicznie, więc przed publicznym release trzeba kontrolować ekspozycję routingu/linków.
<!-- ETAP31_CHECKOUT_NONPUBLIC_PAYMENT_LATER_END -->

<!-- ETAP31B_MOJIBAKE_UTF8_FIX_START -->
## 2026-05-16 - Etap 31B: naprawa mojibake UTF-8 po checkout cleanup

STATUS: NAPRAWA TECHNICZNA ETAPU 31 / TEST RĘCZNY DO WYKONANIA.

FAKTY:
- Po Etapie 31 build przechodził, ale w checkoutcie i notatkach pojawiły się uszkodzone polskie znaki.
- Etap 31B naprawia widoczny checkout, guard kierunku płatności i dodaje guard anty-mojibake dla aktywnego checkoutu.
- Dodano zasadę paczek PowerShell: APPLY ASCII-only, payload UTF-8 jako pliki, brak ||, && i $Zmienna: w stringach.

GUARDY:
- npm run verify:payment-direction-v48
- npm run verify:checkout-mojibake-v31b

TEST RĘCZNY:
- TEST RĘCZNY DO WYKONANIA: otworzyć /zamowienie i potwierdzić poprawne polskie znaki oraz brak narracji o ręcznym przelewie.

RYZYKA:
- Historyczne raporty mogą jeszcze zawierać stare wpisy, ale nie blokują aktywnego checkoutu.
<!-- ETAP31B_MOJIBAKE_UTF8_FIX_END -->

<!-- ETAP33_ADMIN_AUDIT_RUNTIME_2026_05_17_START -->
## Etap 33 - runtime test admina i audit

Status: PRZYGOTOWANE DO WDROŻENIA / TEST RĘCZNY DO WYKONANIA.
Priorytet: 4.
Data: 2026-05-17 Europe/Warsaw.

### Główna teza

Audit admina nie może być uznany za domknięty po samym guardzie statycznym. Kryterium Etapu 33 to realne wpisy w Supabase `public.admin_audit_log` po realnych operacjach admina.

### Zakres kliknięć

- dodanie projektu,
- publikacja,
- archiwizacja,
- usunięcie projektu testowego,
- media,
- pliki prywatne,
- zamówienia,
- checklisty,
- `/admin/audit`.

### Guardy i proof

- `npm run verify:admin-audit-runtime-v53` - guard pakietu Etap 33.
- `npm run audit:admin-runtime-v54` - realny proof Supabase po kliknięciach.
- SQL proof: `supabase/manual/2026-05-17_etap33_admin_audit_runtime_verification.sql`.

### Status testu

TEST RĘCZNY DO WYKONANIA.
BRAK POTWIERDZONEGO TESTU RĘCZNEGO.

### Warunek zamknięcia

Etap 33 można zamknąć dopiero po wyniku `PASS` dla wszystkich grup runtime i po potwierdzeniu Damiana.
<!-- ETAP33_ADMIN_AUDIT_RUNTIME_2026_05_17_END -->

<!-- ETAP33_ADMIN_AUDIT_RUNTIME_V2_2026_05_17_START -->
## Etap 33 V2 - runtime test admina, audit i SQL ledger

Status: PACZKA NAPRAWCZA DO WDROŻENIA / TEST RĘCZNY DO WYKONANIA.
Priorytet: 4.
Data: 2026-05-17 Europe/Warsaw.

### Główna teza

Etap 33 nie jest jeszcze zamknięty. V2 naprawia paczkę testową i dodaje stały SQL ledger, ale runtime trzeba nadal potwierdzić wpisami w Supabase.

### Co naprawia V2

- Guard checklisty jest case-insensitive i nie wywala się na `Dodanie projektu` vs `dodanie projektu`.
- `audit:admin-runtime-v54` wczytuje `.env.local`, więc powinien widzieć `NEXT_PUBLIC_SUPABASE_URL` i service key, jeśli są zapisane lokalnie.
- Dodano `_project/18_SQL_LEDGER.md` i Obsidian `12_SQL_LEDGER - Sklep projekty domow.md`.

### SQL

SQL Etapu 33 nie jest migracją. To read-only proof:

`supabase/manual/2026-05-17_etap33_admin_audit_runtime_verification.sql`

### Status testu

TEST RĘCZNY DO WYKONANIA.
BRAK POTWIERDZONEGO TESTU RĘCZNEGO.

### Warunek zamknięcia

Wynik Node proof albo SQL proof musi pokazać `PASS` dla wszystkich grup: dodanie, publikacja, archiwizacja, usunięcie, media, pliki prywatne, zamówienia i checklisty.
<!-- ETAP33_ADMIN_AUDIT_RUNTIME_V2_2026_05_17_END -->
