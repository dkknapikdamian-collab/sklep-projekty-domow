# 08_CHANGELOG_AI - Changelog AI

## 2026-05-16 - Roadmapa produkcyjna i odhaczanie etapow

- Dodano `_project/16_PRODUCTION_ROADMAP_AND_ACCEPTANCE.md` jako aktywny techniczny plik startowy dla AI.
- Dodano w Obsidianie notatke `11_ROADMAPA PRODUKCYJNA I ODHACZANIE - Sklep projekty domow.md`.
- Zaktualizowano dashboard Obsidiana, zeby linkowal nowa roadmapa.
- Zaktualizowano `_project/15_ACTIVE_SOURCE_MAP.md`, zeby AI czytalo nowy plik przed kazdym etapem.
- Zaktualizowano `_project/07_NEXT_STEPS.md`, zeby kolejne etapy byly odhaczane wg statusow: kod, guardy, test reczny, Obsidian, `_project`, ryzyka i nastepny krok.
- Ustalono kolejke produkcyjna: Etap 22 runtime audit admina, Etap 23 spojnosc komunikacji platnosci recznej, Etap 24 pelny runtime flow V1, Etap 25 walidacja zamowienia i cen, Etap 26 pliki zakupowe, Etap 27 sanity check publikacji, Etap 28 demo cleanup, Etap 29 pre-release checklist V1.
- Ten etap nie zmienia kodu aplikacji, UI, routingu, checkoutu ani bazy. To zmiana pamieci projektu i Obsidiana.

## Status testow

- TEST AUTOMATYCZNY / GUARD: nie uruchomiono lokalnie, bo zmiana wykonana przez GitHub API.
- TEST RECZNY DO WYKONANIA: Damian powinien otworzyc Obsidian i sprawdzic nowa notatke roadmapy.
- BRAK POTWIERDZONEGO TESTU RECZNEGO: do czasu potwierdzenia Damiana.

## 2026-05-16 - Etap 21 real audit coverage V6

- Dodano realne markery i pokrycie audit logu dla brakujacych mutacji admina: project_create, project_sample_create, project_media_delete, project_media_type_update, project_private_file_delete.
- Guard statyczny verify:admin-audit-log-v44 ma sprawdzac nie tylko widok /admin/audit, ale tez realne markery implementacji w akcjach admina.
- TEST RECZNY DO WYKONANIA: runtime audit w /admin/audit po realnych operacjach admina.

## 2026-05-15 22:45 - Hotfix v5: audit guard i memory check

- Dopasowano opis kafla `Audit` na dashboardzie do wymaganego markera.
- Dodano/exportowano `actionLabel` w `lib/admin/audit-log.ts`.
- Ustabilizowano `scripts/check-project-memory.cjs`.

## 2026-05-15 22:20 - Etap 20: Widok audit logu `/admin/audit`

- Dodano strone `/admin/audit`.
- Dodano odczyt wpisow z tabeli `admin_audit_log`.
- Dodano filtrowanie audit logu po typie akcji.
- Dodano tabele: data, admin, akcja, typ encji, ID encji, skrot metadata.
- Dodano link `Audit` w `AdminHeader`.
- Dodano kafel `Audit` na dashboardzie admina.
- Rozszerzono guard `verify:admin-audit-log-v44`.

## 2026-05-15 21:45 - Etap 19: Filtry i priorytetyzacja zamowien w adminie

- Dodano panel szybkich licznikow na `/admin/zamowienia`.
- Dodano filtrowanie zamowien po statusie, platnosci, realizacji i szybkim oznaczeniu.
- Dodano oznaczenia na karcie zamowienia.
- Dodano helpery priorytetu w `lib/admin/orders-admin.ts`.
- Zaktualizowano guard `verify:admin-orders-v42`.

## 2026-05-15 21:15 - Etap 17: Platnosc manualna / instrukcja przelewu

- Checkout informuje, ze platnosc odbywa sie po kontakcie i bez automatycznej platnosci online.
- Dodano migracje `supabase/migrations/0018_order_manual_payment_instruction.sql`.
- Dodano pole `payment_instruction` do `order_fulfillment_checklist`.
- Dodano pole `Instrukcja przelewu` na `/admin/zamowienia/[id]`.
- Dodano guard `verify:manual-payment-v48`.

## 2026-05-15 - Pelny mozg projektu sklepu

- Uzupelniono pelna pamiec projektu w repo aplikacji i Obsidianie.
- Dodano/uzupelniono pliki `_project/`.
- Dodano guard pamieci projektu.

<!-- ETAP22_RUNTIME_AUDIT_ADMINA_START -->
## Etap 22 — runtime audit admina

Zmiany:
- Dodano/zaostrzono metadata audit logu dla operacji admina: source, projectCode/orderId, previous/new status lub odpowiedniki.
- Dodano audyt blokowanej próby trwałego usunięcia projektu jako `project_hard_delete_blocked`.
- Rozszerzono `scripts/check-admin-audit-log-v44.cjs` o krytyczne action i kontrakt metadata.
- Zaktualizowano pamięć projektu i pakiet Obsidiana.

Status testu ręcznego:
- TEST RĘCZNY DO WYKONANIA.
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

<!-- ETAP27_STAGE52_PUBLICATION_READINESS -->
## 2026-05-16 - Etap 27 / STAGE52: produkcyjne sanity checki publikacji projektu

FAKT:
- Rozszerzono gotowość publikacji projektu przed statusem active.
- Dodano box Gotowość publikacji na edycji projektu.
- Rozszerzono guard verify:project-publication-readiness-v35.

TEST RĘCZNY:
- TEST RĘCZNY DO WYKONANIA: sprawdzić blokadę active dla projektu z brakami oraz publikację kompletnego projektu.
<!-- ETAP27_STAGE52_PUBLICATION_READINESS -->

<!-- ETAP28_STAGE53_DEMO_SAMPLE_CLEANUP_CHANGELOG -->
## 2026-05-16 - Etap 28 / STAGE53

- Sample project zmieniony na draft.
- Publiczny katalog filtruje demo/sample.
- Dodano guard `verify:no-demo-content`.
<!-- ETAP28_STAGE53_DEMO_SAMPLE_CLEANUP_CHANGELOG -->

<!-- ETAP_A_PAYMENT_DIRECTION_FIX_START -->
## 2026-05-16 - Etap A payment direction fix

- Usunięto ręczne płatności jako docelowy kierunek z aktywnej roadmapy.
- Zmieniono aktywny guard z `verify:manual-payment-v48` na `verify:payment-direction-v48`.
- Oznaczono obecny manual-payment flow jako legacy / temporary / internal only.
- Dodano blocker automatycznych płatności przed publicznym uruchomieniem.
- Uzupełniono Obsidian i raport run.

Status testu ręcznego: TEST RĘCZNY DO WYKONANIA.
<!-- ETAP_A_PAYMENT_DIRECTION_FIX_END -->

<!-- ETAP_B_PROJECT_MEMORY_STATUS_FIX_START -->
## 2026-05-16_1810 - Etap B: naprawa project memory / statusu etapów

FAKT: Ujednolicono aktywny status projektu: kod ma elementy etapów 22-29, ale V1 nie jest produkcyjnie zamknięte bez runtime testów Damiana.
DECYZJA: płatności ręczne nie są docelowym modelem; docelowo automatyczne płatności online.
TESTY: dodano guard `verify:project-stage-status-b`; do uruchomienia z `check:project-memory`.
OBSIDIAN: dashboard i roadmapa wymagają tej samej korekty statusu.
<!-- ETAP_B_PROJECT_MEMORY_STATUS_FIX_END -->

<!-- ETAP22C_RUNTIME_ADMIN_AUDIT_CHANGELOG_START -->
## 2026-05-16 - Etap 22C runtime admin audit SQL package

- Dodano SQL do ręcznej weryfikacji runtime audit logu w Supabase.
- Dodano guard `verify:admin-audit-runtime-v53`.
- Doprecyzowano status Etapu 22: automatyczne guardy nie są ręcznym potwierdzeniem runtime.
- Dodano zasadę Damiana: ChatGPT/operator nie robi bezpośredniego commit/push przez connector; dostarcza ZIP + polecenie.
- Dodano aktualizacje Obsidiana w paczce.
<!-- ETAP22C_RUNTIME_ADMIN_AUDIT_CHANGELOG_END -->

<!-- ETAP23Z_ARCHIVE_DELETE_RUNTIME_ACCEPTANCE_2026_05_16 -->
## 2026-05-16 - Etap 23Z archive/delete runtime acceptance

- Dodano guard erify:admin-archive-delete-runtime-v23z.
- Dodano checklist runtime _project/17_ETAP23Z_ARCHIVE_HARD_DELETE_RUNTIME_ACCEPTANCE.md.
- Zaktualizowano project memory i Obsidiana.
- Nie oznaczono testu recznego jako PASS.
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
