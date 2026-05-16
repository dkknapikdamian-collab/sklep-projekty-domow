# 07_NEXT_STEPS - nastepne kroki

<!-- ETAP_B_PROJECT_MEMORY_STATUS_FIX_START -->
## Najbliższy realny kierunek - po korekcie pamięci projektu

Status: NIEKOMPLETNE / DO WYKONANIA.
Data aktualizacji: 2026-05-16_1810 Europe/Warsaw.

### Kolejność operacyjna

1. Etap B: naprawa project memory / aktualnego statusu etapów.
   - `03_CURRENT_STAGE.md` ma zaczynać się od realnego stanu, a nie od starego Etapu 20.
   - `07_NEXT_STEPS.md` ma pokazywać realny następny krok.
   - `14_TEST_HISTORY.md` ma odróżniać guardy od testów ręcznych.
   - Roadmapa i Obsidian mają mieć ten sam status.

2. Etap A: korekta kierunku płatności i roadmapy.
   - płatności ręczne nie są docelowym modelem,
   - obecny manual-payment flow jest legacy / temporary / internal only,
   - docelowo: automatyczne płatności online, provider, webhooki, statusy płatności.

3. Runtime audit admina.
   - sprawdzić `/admin/audit` po realnych operacjach admina,
   - potwierdzić wpisy audit logu,
   - zapisać wynik w `_project/` i Obsidianie.

4. Pełny flow sklepu bez publikacji klientom.
   - realny projekt active,
   - karta projektu,
   - koszyk,
   - checkout / zamówienie,
   - admin zamówień,
   - audit log.

### Czego nie robić teraz

- Nie traktować Etapu 29 jako zamknięcia V1.
- Nie publikować aplikacji klientom.
- Nie komunikować płatności ręcznych jako docelowego modelu.
- Nie wdrażać Stripe/PayU bez osobnej decyzji Damiana i osobnego etapu.
<!-- ETAP_B_PROJECT_MEMORY_STATUS_FIX_END -->


<!-- ETAP_A_PAYMENT_DIRECTION_FIX_START -->
## Najbliższy kierunek - płatności

Decyzja: Nie wdrażamy płatności ręcznych jako docelowego modelu.

1. Usunąć z dokumentacji założenie, że ręczne płatności są docelowym modelem.
2. Oznaczyć obecny manual-payment flow jako legacy / temporary / internal only.
3. Przepisać guard aktywny z `verify:manual-payment-v48` na `verify:payment-direction-v48`.
4. Przygotować etap pod automatyczne płatności: Stripe/payment provider, webhooki, statusy płatności.
5. Przed publicznym udostępnieniem aplikacji usunąć albo zastąpić manual-payment flow.

Status testu: TEST RĘCZNY DO WYKONANIA.
<!-- ETAP_A_PAYMENT_DIRECTION_FIX_END -->

## Starszy wpis - poprzedni rekomendowany krok

Etap 22: runtime audit admina i zamkniecie audit logu.

Wykonac realne operacje admina, wejsc w `/admin/audit` i potwierdzic, ze wpis pojawia sie z poprawna akcja, typem encji, ID encji i metadata.

## Aktywna roadmapa produkcyjna

Czytac i aktualizowac:

- `_project/16_PRODUCTION_ROADMAP_AND_ACCEPTANCE.md`,
- `10_PROJEKTY/Sklep_projekty_domow/11_ROADMAPA PRODUKCYJNA I ODHACZANIE - Sklep projekty domow.md`.

## Starszy wpis - poprzednia kolejność etapów

1. Etap 22 - runtime audit admina.
2. Etap A - korekta kierunku platnosci: platnosci reczne nie sa docelowym modelem.
3. Etap 24 - pelny runtime flow V1.
4. Etap 25 - walidacja zamowienia i cen wzgledem bazy.
5. Etap 26 - obsluga plikow zakupowych w adminie.
6. Etap 27 - sanity check publikacji projektu.
7. Etap 28 - blokada sample/demo jako realnych ofert.
8. Etap 29 - pre-release checklist V1.

## Zasady dalszej pracy

- Lista zamowien ma pomagac w priorytetyzacji, ale nie ma udawac pelnego CRM.
- Audit log jest widokiem tylko do odczytu.
- Nie zmieniac mechanizmu auth bez osobnego etapu.
- Nie dodawac automatycznych platnosci ani automatycznej wysylki bez osobnej decyzji.
- Kazda operacja ryzykowna w adminie powinna miec slad w audit logu.
- Kazdy etap musi miec status: kod, guardy, test reczny, Obsidian, `_project`, ryzyka i nastepny krok.
- Nie oznaczac etapu jako zamknietego bez potwierdzenia guardow i statusu testu recznego.

## Co odhaczac po kazdym etapie

- Co wdrozono w kodzie.
- Jakie guardy przeszly.
- Jakie testy sa do wykonania recznie.
- Co Damian potwierdzil recznie.
- Co nie zostalo potwierdzone.
- Co zaktualizowano w Obsidianie.
- Co zaktualizowano w `_project/`.
- Jaki jest jeden nastepny krok.

## Blokady obecne

- Brak potwierdzonego runtime `/admin/audit` po wszystkich waznych operacjach admina.
- Brak pelnego testu recznego calej sciezki V1.
- Brak potwierdzenia, ze komunikacja publiczna nie miesza platnosci recznej z platnosciami online.

<!-- ETAP22_29_PRODUCTION_ROADMAP_ACCEPTANCE_2026_05_16 -->

Dodano aktywna roadmapa produkcyjna i ledger odhaczania. Nastepny krok to Etap 22.

<!-- ETAP22_RUNTIME_AUDIT_ADMINA_START -->
## Następny krok po Etapie 22

Najkrótszy sensowny krok:
- Damian wykonuje runtime test z listy w `_project/05_MANUAL_TESTS.md`.
- Po potwierdzeniu wpisać status: TEST RĘCZNY POTWIERDZONY PRZEZ DAMIANA.
- Dopiero potem uznać Etap 21/22 za zamknięty operacyjnie.

Nie zaczynać nowych dużych funkcji admina przed potwierdzeniem, że audit realnie zapisuje ślady operacji.
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

<!-- ETAP22C_RUNTIME_ADMIN_AUDIT_NEXT_STEP_START -->
## Następny krok - Etap 22C runtime audit admina

Nie zaczynać kolejnego dużego etapu przed domknięciem runtime audit admina.

Kolejność:
1. Zastosować paczkę ZIP.
2. Uruchomić focused guardy.
3. W panelu admina wykonać 10 operacji z checklisty.
4. Po każdej operacji sprawdzić `/admin/audit`.
5. W Supabase SQL Editor uruchomić SQL runtime verification.
6. Zamknąć dopiero, gdy summary pokaże `failed_actions = 0`.
7. Wpisać potwierdzenie Damiana do `_project/11_USER_CONFIRMED_TESTS.md` i Obsidiana.
<!-- ETAP22C_RUNTIME_ADMIN_AUDIT_NEXT_STEP_END -->

<!-- ETAP23Z_ARCHIVE_DELETE_RUNTIME_ACCEPTANCE_2026_05_16 -->
## Nastepny krok - Etap 23Z

Najkrotszy sensowny krok:
- uruchomic aplikacje lokalnie,
- wykonac test na projekcie testowym,
- sprawdzic /admin/audit,
- wpisac wynik w _project/11_USER_CONFIRMED_TESTS.md, _project/14_TEST_HISTORY.md i Obsidianie.

Nie zaczynac kolejnej naprawy Etapu 23 bez wskazania konkretnego punktu FAIL.
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
