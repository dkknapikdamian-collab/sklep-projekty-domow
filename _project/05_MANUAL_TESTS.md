## Test ręczny po Etapie 20

Status: do wykonania po wdrożeniu paczki, przejściu guardów, typecheck i build.

### Co sprawdzić

1. Wejdź do `/admin`.
2. Sprawdź, czy na dashboardzie jest kafel `Audit`.
3. Sprawdź, czy w górnej nawigacji admina jest link `Audit`.
4. Wejdź do `/admin/audit`.
5. Oczekiwany wynik:
   - strona się ładuje,
   - widać filtr `Typ akcji`,
   - widać kolumny: data, admin, akcja, typ encji, ID encji, metadata.
6. Wykonaj operację admina, np. zmianę statusu zamówienia albo projektu.
7. Wróć do `/admin/audit`.
8. Oczekiwany wynik:
   - pojawia się ślad operacji,
   - metadata jest widoczna jako skrót,
   - filtr po typie akcji zawęża wyniki.
9. Sprawdź reset filtra.

Guard: `npm run verify:admin-audit-log-v44`.


# 05_MANUAL_TESTS - Testy ręczne Damiana


## Test reczny po Etapie 19

Status: do wykonania po przejściu guardów, typecheck i build.

### Co sprawdzić

1. Wejdź do `/admin/zamowienia`.
2. Sprawdź panel szybkich liczników:
   - `Wymaga kontaktu`,
   - `Czeka na płatność`,
   - `Do wysyłki`.
3. Kliknij każdy szybki filtr `Pokaż`.
4. Oczekiwany wynik:
   - lista zawęża się do właściwych zamówień,
   - reset wraca do pełnej listy,
   - pusty filtr pokazuje czytelny pusty stan, nie błąd.
5. Sprawdź filtr statusu:
   - `new`,
   - `contacted`,
   - `paid_manual`,
   - `sent`,
   - `cancelled`.
6. Sprawdź filtr płatności:
   - instrukcja ustawiona,
   - brak instrukcji.
7. Sprawdź filtr realizacji:
   - PDF wysłany,
   - ZIP wysłany,
   - zamknięte.
8. Sprawdź, czy karta zamówienia pokazuje czytelne oznaczenia:
   - priorytet,
   - instrukcja płatności ustawiona/brak,
   - PDF wysłany/niewysłany,
   - ZIP wysłany/niewysłany,
   - otwarte/zamknięte.
9. Kliknij `Obsłuż zamówienie` przy zamówieniu po filtrze.
10. Oczekiwany wynik: przejście do `/admin/zamowienia/[id]` działa jak wcześniej.

## Zasada

Test ręczny jest ważny tylko wtedy, gdy zapisujemy:

- datę,
- miejsce testu,
- kroki,
- oczekiwany wynik,
- wynik faktyczny,
- czy istnieje guard.

## Test 1 - Panel admina: lista projektów i przyciski

| Pole | Wartość |
|---|---|
| Gdzie | `/admin/projekty` |
| Kroki | Zaloguj się jako admin, wejdź w listę projektów, sprawdź przyciski `Edytuj`, zmiana statusu, `Usuń`, powrót po akcji. |
| Oczekiwany wynik | Każdy przycisk wykonuje realną akcję albo pokazuje jasny komunikat. Brak martwych przycisków. |
| Status | Do powtórzenia po każdym patchu admina. |
| Guard | Częściowo: powinien istnieć test/guard panelu admina, do potwierdzenia w repo. |

## Test 2 - Panel admina: nowy projekt

| Pole | Wartość |
|---|---|
| Gdzie | `/admin/projekty/nowy` |
| Kroki | Utwórz projekt testowy z kodem, tytułem, ceną, metrażem, statusem roboczym, zapisz. |
| Oczekiwany wynik | Projekt zapisuje się, wraca do listy albo pokazuje sukces, projekt widoczny w adminie. |
| Status | Do wykonania. |
| Guard | Brak pełnego potwierdzenia. |

## Test 3 - Panel admina: edycja projektu

| Pole | Wartość |
|---|---|
| Gdzie | `/admin/projekty/[id]/edytuj` |
| Kroki | Otwórz istniejący projekt, zmień tytuł/cenę/status, kliknij `Zapisz dane`, sprawdź po powrocie. |
| Oczekiwany wynik | Dane są zapisane, nie ma błędu JS, po odświeżeniu zmiany zostają. |
| Status | Krytyczny, bo wcześniej Damian zgłaszał problem z `Edytuj`, `Zapisz dane`, `Anuluj`. |
| Guard | Wymagany guard regresji. |

## Test 4 - Panel admina: anulowanie edycji

| Pole | Wartość |
|---|---|
| Gdzie | `/admin/projekty/[id]/edytuj` |
| Kroki | Zmień pole, kliknij `Anuluj`. |
| Oczekiwany wynik | Brak zapisu zmian, powrót do poprzedniego widoku/listy. |
| Status | Do wykonania. |
| Guard | Do sprawdzenia. |

## Test 5 - Panel admina: usunięcie projektu aktywnego

| Pole | Wartość |
|---|---|
| Gdzie | `/admin/projekty` lub edycja projektu |
| Kroki | Spróbuj usunąć projekt aktywny/opublikowany. |
| Oczekiwany wynik | System wymaga świadomego potwierdzenia i pokazuje ostrzeżenie. |
| Status | Do wykonania. |
| Guard | Wymagany marker typu `data-admin-delete-active-warning` albo równoważny. |

## Test 6 - Publiczny katalog nie pokazuje roboczych projektów

| Pole | Wartość |
|---|---|
| Gdzie | `/projekty` |
| Kroki | Dodaj projekt roboczy i aktywny. Wejdź w katalog publiczny. |
| Oczekiwany wynik | Publiczny katalog pokazuje tylko aktywny/opublikowany projekt. Roboczy nie jest widoczny. |
| Status | Do wykonania. |
| Guard | Wymagany guard źródła prawdy katalogu. |

## Test 7 - Koszyk i dodatek PDF e-mail +250 zł

| Pole | Wartość |
|---|---|
| Gdzie | karta projektu / koszyk / checkout |
| Kroki | Dodaj projekt do koszyka, zaznacz dodatek `Projekt w formacie PDF na e-mail`, sprawdź sumę. |
| Oczekiwany wynik | Cena zamówienia rośnie o 250 zł, dodatek jest widoczny w koszyku, checkout i zamówieniu. |
| Status | Do wykonania po wdrożeniu/kontrze tego dodatku. |
| Guard | Wymagany test regresji ceny dodatku. |

## Test 8 - Checkout V1

| Pole | Wartość |
|---|---|
| Gdzie | `/koszyk`, checkout / zamówienie |
| Kroki | Przejdź od projektu do koszyka, wpisz dane klienta, złóż zamówienie. |
| Oczekiwany wynik | Zamówienie powstaje, admin może je zobaczyć, klient dostaje jasny komunikat. |
| Status | Do wykonania. |
| Guard | Do sprawdzenia w repo. |

## Test 9 - Build produkcyjny

| Pole | Wartość |
|---|---|
| Gdzie | terminal |
| Kroki | Uruchom `npm run build`. |
| Oczekiwany wynik | Build kończy się sukcesem i pokazuje trasy aplikacji. |
| Status | Do uruchamiania po istotnych zmianach. |
| Guard | Build jest guardem ogólnym. |

## Test 10 - Guard pamięci projektu

| Pole | Wartość |
|---|---|
| Gdzie | terminal w repo |
| Kroki | Uruchom `node scripts/check-project-memory.cjs` i `npm run check:project-memory`. |
| Oczekiwany wynik | Guard potwierdza komplet plików `_project/` i Obsidiana. |
| Status | Dodany w tym etapie. |
| Guard | Tak. |

<!-- SKLEP_FULL_MEMORY_OBSIDIAN_REPO_V6_2026_05_15 START -->

## Manual tests after this package - 2026-05-15 22:12:34

| Area | Status | What Damian should verify |
|---|---|---|
| App repo memory | TEST RECZNY DO WYKONANIA | Check _project/ files and run report after script completes. |
| Obsidian dashboard | TEST RECZNY DO WYKONANIA | Open 10_PROJEKTY/Sklep_projekty_domow/00_START - Sklep projekty domow.md. |
| Generic Obsidian names | TEST RECZNY DO WYKONANIA | Confirm no active root INDEX.md, STATUS.md, LEDGER.md, NOTES.md, TESTS.md, TODO.md, NEXT.md. |
| Store UI | BRAK POTWIERDZONEGO TESTU | This package does not modify UI. |

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

FAKT: dodano i zweryfikowano statycznie realne markery audit logu dla brakujących mutacji admina.
TEST RĘCZNY DO WYKONANIA: runtime audit w /admin/audit po realnych operacjach admina.

<!-- ETAP22_RUNTIME_AUDIT_ADMINA_START -->
## Etap 22 — test ręczny runtime admin audit

Status: TEST RĘCZNY DO WYKONANIA.

Wykonać lokalnie w panelu admina:
1. Utworzenie projektu draft.
2. Edycja projektu.
3. Zmiana statusu projektu.
4. Archiwizacja projektu.
5. Próba trwałego usunięcia projektu, w tym blokada dla niedozwolonego statusu albo błędnego kodu.
6. Usunięcie medium.
7. Zmiana typu medium hero/thumbnail.
8. Usunięcie prywatnego pliku.
9. Zmiana statusu zamówienia.
10. Zapis checklisty realizacji zamówienia.

Po każdej operacji wejść w /admin/audit i sprawdzić:
- wpis istnieje,
- action jest zgodne z operacją,
- entity_type ma sens,
- entity_id wskazuje właściwy rekord,
- metadata zawiera minimum source oraz projectCode albo orderId,
- przy zmianach statusu metadata ma fromStatus/toStatus albo poprzednie/nowe wartości.
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

<!-- ETAP22C_RUNTIME_ADMIN_AUDIT_MANUAL_CHECK_START -->
## Etap 22C - runtime audit admina

Status: TEST RĘCZNY DO WYKONANIA.

### Sprawdzić ręcznie

1. Utworzenie projektu.
2. Edycja projektu.
3. Zmiana statusu projektu.
4. Archiwizacja projektu.
5. Trwałe usunięcie projektu.
6. Usunięcie medium.
7. Zmiana typu medium.
8. Usunięcie prywatnego pliku.
9. Zmiana statusu zamówienia.
10. Zapis checklisty realizacji.

### Po każdej operacji /admin/audit musi pokazać

- poprawne `action`,
- poprawne `entity_type`,
- poprawne `entity_id`,
- sensowne `metadata`,
- wpis z realnej tabeli Supabase `public.admin_audit_log`.

### SQL proof

Uruchomić w Supabase SQL Editor:

`supabase/manual/2026-05-16_etap22_runtime_admin_audit_verification.sql`

Zamknięcie dopiero przy: `failed_actions = 0`.
<!-- ETAP22C_RUNTIME_ADMIN_AUDIT_MANUAL_CHECK_END -->

<!-- ETAP22C_RUNTIME_SQL_RESULT_5_PASS_5_FAIL -->
## 2026-05-16 18:43:07 - Etap 22C runtime audit admina - wynik SQL 5/10

FAKT:
- Supabase SQL runtime verification został uruchomiony ponownie.
- Wynik: 5 PASS / 5 FAIL.
- PASS:
  - project_archive
  - project_create
  - project_hard_delete
  - project_status_update
  - project_update
- FAIL:
  - order_fulfillment_checklist_update
  - order_status_update
  - project_media_delete
  - project_media_type_update
  - project_private_file_delete
- Wszystkie FAIL są typu: FAIL_MISSING_RUNTIME_ROW.

INTERPRETACJA:
- Audit log działa dla podstawowych operacji projektu.
- Brakuje runtime wpisów dla operacji zamówień, mediów i prywatnych plików.
- Najpierw trzeba przeklikać brakujące ścieżki.
- Jeśli po kliknięciu dalej będzie FAIL_MISSING_RUNTIME_ROW, wymagany Etap 22D - naprawa zapisu audit logu dla brakujących operacji.

STATUS:
- CZĘŚCIOWO POTWIERDZONE RUNTIME.
- TEST RĘCZNY DO WYKONANIA.
- Etap 22 nadal NIEZAMKNIĘTY.

NASTĘPNY KROK:
- Kliknąć: order status, order checklist, media type update, media delete, private file delete.
- Ponowić SQL.
- Zamknąć etap tylko przy 10 PASS / 0 FAIL.
<!-- ETAP22C_RUNTIME_SQL_RESULT_5_PASS_5_FAIL -->

<!-- ETAP23Z_ARCHIVE_DELETE_RUNTIME_ACCEPTANCE_2026_05_16 -->
## Etap 23Z - manual runtime test archiwizacji i hard delete

Status: TEST RECZNY DO WYKONANIA.

Checklist:
1. Projekt testowy utworzony do zniszczenia.
2. Archiwizacja z listy PASS/FAIL.
3. Archiwizacja z edycji PASS/FAIL.
4. Odświeżenie po archiwizacji PASS/FAIL.
5. Brak martwego guzika PASS/FAIL.
6. Bledny kod blokuje hard delete PASS/FAIL.
7. Poprawny kod usuwa projekt testowy PASS/FAIL.
8. Audit zapisuje blokade i sukces PASS/FAIL.
9. Projekt nie wraca po odswiezeniu PASS/FAIL.
10. Publiczny katalog nie pokazuje usunietego projektu testowego PASS/FAIL.

Wynik wolno zmienic na TEST RECZNY POTWIERDZONY PRZEZ DAMIANA tylko po realnym potwierdzeniu Damiana.
<!-- ETAP23Z_ARCHIVE_DELETE_RUNTIME_ACCEPTANCE_2026_05_16 -->


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

<!-- ETAP33_ADMIN_AUDIT_RUNTIME_MANUAL_TEST_2026_05_17_START -->
## Etap 33 - test ręczny runtime admin/audit

Status: TEST RĘCZNY DO WYKONANIA.

Kliknąć w adminie: dodanie projektu, publikacja, archiwizacja, usunięcie projektu testowego, media, pliki prywatne, zamówienia, checklisty oraz `/admin/audit`.

Kryterium: wpisy muszą realnie istnieć w Supabase `public.admin_audit_log`.

Dowód po kliknięciach:

```powershell
npm run audit:admin-runtime-v54
```

albo SQL:

```text
supabase/manual/2026-05-17_etap33_admin_audit_runtime_verification.sql
```

Wynik wymagany: wszystkie grupy `PASS`.
<!-- ETAP33_ADMIN_AUDIT_RUNTIME_MANUAL_TEST_2026_05_17_END -->

<!-- ETAP33_ADMIN_AUDIT_RUNTIME_V2_MANUAL_2026_05_17_START -->
## Etap 33 V2 - test ręczny admin/audit

Status: TEST RĘCZNY DO WYKONANIA.

Kliknąć w adminie:
- dodanie projektu,
- publikacja,
- archiwizacja,
- usunięcie projektu testowego,
- media,
- pliki prywatne,
- zamówienia,
- checklisty,
- `/admin/audit`.

Proof:

```powershell
npm run audit:admin-runtime-v54
```

albo Supabase SQL Editor z plikiem:

`supabase/manual/2026-05-17_etap33_admin_audit_runtime_verification.sql`

Wynik wymagany: wszystkie grupy `PASS`.
<!-- ETAP33_ADMIN_AUDIT_RUNTIME_V2_MANUAL_2026_05_17_END -->
