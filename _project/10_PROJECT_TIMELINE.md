# 10_PROJECT_TIMELINE - Os czasu projektu

## Przed aplikacja

Powstaly lub byly rozwazane materialy wizualne i makiety. Obowiazujacy status: moga sluzyc jako inspiracja/design lock, ale nie sa realnymi ofertami projektow.

## Decyzja: nie produkcyjny czysty HTML

Projekt ma isc w aplikacje sklepowa, nie w statyczny HTML.

## Budowa aplikacji

Powstala aplikacja Next.js / React z trasami publicznymi i adminowymi.

Znane obszary:

- strona glowna,
- katalog/projekty,
- koszyk,
- checkout/zamowienie,
- panel admina,
- logowanie/setup admina,
- projekty: lista, nowy, edycja, podglad,
- zamowienia,
- audit log.

## 2026-05-15 - Etap 17: platnosc manualna

Checkout komunikuje platnosc po kontakcie, admin zapisuje instrukcje przelewu, a roboczy e-mail zawiera dane do platnosci.

## 2026-05-15 - Etap 19: filtry i priorytetyzacja zamowien

Lista `/admin/zamowienia` dostala liczniki, filtry i oznaczenia priorytetow: kontakt, platnosc, wysylka.

## 2026-05-15 - Etap 20: widok audit logu

Dodano `/admin/audit`, filtr po typie akcji i tabele sladu operacji admina.

## 2026-05-16 - Etap 21: statyczne domkniecie pokrycia audit logu

Dodano realne markery i pokrycie audit logu dla brakujacych mutacji admina. Runtime audit nadal wymaga potwierdzenia recznego.

## 2026-05-16 - Roadmapa produkcyjna i odhaczanie etapow

Dodano aktywna roadmapa produkcyjna:

- `_project/16_PRODUCTION_ROADMAP_AND_ACCEPTANCE.md`,
- Obsidian: `11_ROADMAPA PRODUKCYJNA I ODHACZANIE - Sklep projekty domow.md`.

Od tego momentu kazdy etap ma odhaczac: kod, guardy, test reczny, potwierdzenie Damiana, Obsidian, `_project`, ryzyka i nastepny krok.

## Aktualna kolejnosc

1. Etap 22 - runtime audit admina.
2. Etap 23 - spojnosc komunikacji platnosci recznej.
3. Etap 24 - pelny runtime flow V1.
4. Etap 25 - walidacja zamowienia i cen wzgledem bazy.
5. Etap 26 - obsluga plikow zakupowych w adminie.
6. Etap 27 - sanity check publikacji projektu.
7. Etap 28 - blokada sample/demo jako realnych ofert.
8. Etap 29 - pre-release checklist V1.

## Rzeczy porzucone

- Czysty HTML jako produkcyjny sklep.
- Fikcyjne projekty jako realne oferty.
- Konto klienta jako obowiazkowy element V1.

## Rzeczy zamrozone / ostrozne

- Nie zmieniac UI bez zakresu.
- Nie refaktorowac szeroko przy malych etapach.
- Nie dopisywac propozycji AI jako decyzji.
- Nie ruszac routingu, jesli zadanie dotyczy tylko dokumentacji/pamieci.

<!-- ETAP22_RUNTIME_AUDIT_ADMINA_START -->
## 2026-05-16_1137 — Etap 22 runtime audit admina

- Rozszerzono kontrakt audit logu admina.
- Dodano statyczny guard dla metadata runtime.
- Przygotowano ręczną checklistę testu runtime /admin/audit.
- Etap pozostaje niezamknięty manualnie do potwierdzenia Damiana.
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

<!-- ETAP_B_PROJECT_MEMORY_STATUS_FIX_START -->
## 2026-05-16_1810 - Etap B: project memory status fix

Porządkowanie pamięci projektu po etapach 22-29. Etap 29 nie oznacza zamknięcia V1. Runtime audit i pełny flow sklepu pozostają do ręcznego potwierdzenia przez Damiana.
<!-- ETAP_B_PROJECT_MEMORY_STATUS_FIX_END -->

<!-- ETAP22C_RUNTIME_ADMIN_AUDIT_TIMELINE_START -->
## 2026-05-16 - Etap 22C runtime admin audit SQL/manual proof

Status: przygotowano paczkę ZIP do lokalnego wdrożenia.

Cel: zamienić ogólne "sprawdź audit" na konkretną procedurę runtime: lista operacji, SQL proof, guard paczki i aktualizacja Obsidiana.

Manual status: TEST RĘCZNY DO WYKONANIA.
<!-- ETAP22C_RUNTIME_ADMIN_AUDIT_TIMELINE_END -->

<!-- ETAP23Z_ARCHIVE_DELETE_RUNTIME_ACCEPTANCE_2026_05_16 -->
## 2026-05-16 - Etap 23Z

Ustalono i wdrozono guard/checkliste akceptacyjna dla archiwizacji i hard delete po niestabilnych poprawkach Etapu 23. Status reczny nadal TEST RECZNY DO WYKONANIA.
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

<!-- ETAP33_ADMIN_AUDIT_RUNTIME_TIMELINE_2026_05_17_START -->
## 2026-05-17 - Etap 33 runtime test admina i audit

Przygotowano pakiet testowy, który zamienia Etap 33 z listy kliknięć w mierzalny proof Supabase. Warunek zamknięcia: wszystkie grupy audit logu mają `PASS` po realnych operacjach admina.
<!-- ETAP33_ADMIN_AUDIT_RUNTIME_TIMELINE_2026_05_17_END -->

<!-- ETAP33_ADMIN_AUDIT_RUNTIME_V2_TIMELINE_2026_05_17_START -->
## 2026-05-17 - Etap 33 V2

Po nieudanym apply V1 przygotowano V2: fix guarda checklisty, `.env.local` loader dla runtime proof i stały SQL ledger. Etap nadal wymaga realnego proofu Supabase po kliknięciach admina.
<!-- ETAP33_ADMIN_AUDIT_RUNTIME_V2_TIMELINE_2026_05_17_END -->

<!-- ETAP33_V4_APPLY_SQL_FIX_2026_05_17_START -->
## Etap 33 V4 - apply fix i SQL proof bez audit_window

Status: HOTFIX PACZKI I SQL PROOF / TEST RECZNY DO WYKONANIA.
Data: 2026-05-17 Europe/Warsaw.

### FAKTY

- V3 nie wykonało apply przez SyntaxError w `payload/apply.cjs`.
- Powód: markdown z backtickami był osadzony w JS template stringu.
- Przez to lokalny SQL nie został podmieniony i Supabase dalej pokazywał stary błąd `from audit_window`.
- V4 usuwa CTE `audit_window` całkowicie z SQL proof.
- V4 trzyma bloki markdown w osobnych plikach payload/blocks, nie w JS stringu.

### SQL LEDGER

- Plik SQL: `supabase/manual/2026-05-17_etap33_admin_audit_runtime_verification.sql`.
- Typ: READ_ONLY_VERIFICATION.
- Ledger repo: `_project/18_SQL_LEDGER.md`.
- Ledger Obsidian: `10_PROJEKTY/Sklep_projekty_domow/12_SQL_LEDGER - Sklep projekty domow.md`.

### TESTY

- TEST AUTOMATYCZNY / GUARD: `npm run verify:admin-audit-runtime-v53`.
- TEST AUTOMATYCZNY / GUARD: `npm run verify:admin-audit-log-v44`.
- TEST AUTOMATYCZNY / GUARD: `npm run check:project-memory`.
- TEST RĘCZNY DO WYKONANIA: SQL proof w Supabase SQL Editor.

### NASTĘPNY KROK

Skopiować poprawiony SQL po V4 i uruchomić w Supabase SQL Editor. Etap 33 nadal wymaga PASS dla realnych wpisów audit.
<!-- ETAP33_V4_APPLY_SQL_FIX_2026_05_17_END -->

<!-- ETAP33_V5_FALSE_POSITIVE_SQL_GUARD_FIX_2026_05_17_START -->
## Etap 33 V5 - false-positive guard fix dla SQL proof

Status: HOTFIX PACZKI I GUARDA / TEST RĘCZNY DO WYKONANIA.
Data: 2026-05-17 Europe/Warsaw.

### FAKTY

- V4 zapisało poprawiony SQL, ale przerwało apply przez zbyt szeroki test tekstowy.
- Test wykrył starą nazwę okna CTE w komentarzu, nie w realnym `from`/`join`/`with`.
- V5 usuwa tę frazę z komentarza SQL i sprawdza tylko realne referencje SQL.
- SQL pozostaje READ_ONLY_VERIFICATION i czyta `public.admin_audit_log`.

### SQL LEDGER

- Plik SQL: `supabase/manual/2026-05-17_etap33_admin_audit_runtime_verification.sql`.
- Typ: READ_ONLY_VERIFICATION.
- Ledger repo: `_project/18_SQL_LEDGER.md`.
- Ledger Obsidian: `10_PROJEKTY/Sklep_projekty_domow/12_SQL_LEDGER - Sklep projekty domow.md`.

### TESTY

- TEST AUTOMATYCZNY / GUARD: `npm run verify:admin-audit-runtime-v53`.
- TEST AUTOMATYCZNY / GUARD: `npm run verify:admin-audit-log-v44`.
- TEST AUTOMATYCZNY / GUARD: `npm run check:project-memory`.
- TEST RĘCZNY DO WYKONANIA: SQL proof w Supabase SQL Editor.

### NASTĘPNY KROK

Skopiować SQL po V5 i uruchomić w Supabase SQL Editor. Etap 33 wymaga PASS dla realnych wpisów audit.
<!-- ETAP33_V5_FALSE_POSITIVE_SQL_GUARD_FIX_2026_05_17_END -->

<!-- ETAP33_V6_PARTIAL_RUNTIME_STATUS_2026_05_17_START -->
## Etap 33 V6 - częściowy runtime audit admina

Status: CZĘŚCIOWO POTWIERDZONE PRZEZ DAMIANA / ETAP NIEZAMKNIĘTY.
Data: 2026-05-17 Europe/Warsaw.

### FAKTY Z TESTU DAMIANA

PASS w Supabase `public.admin_audit_log`:
- dodanie projektu - `project_create`
- publikacja projektu - `project_status_update`
- archiwizacja projektu - `project_archive`
- usunięcie projektu - `project_hard_delete`

FAIL w Supabase:
- media projektu - `project_media_delete` / `project_media_type_update`
- pliki prywatne - `project_private_file_delete`
- zamówienia - `order_status_update`
- checklisty zamówień - `order_fulfillment_checklist_update`

### STATUS TESTÓW

- TEST RĘCZNY POTWIERDZONY PRZEZ DAMIANA - CZĘŚCIOWO: 4 grupy PASS.
- TEST RĘCZNY DO WYKONANIA: 4 grupy FAIL.
- BRAK POTWIERDZONEGO TESTU PEŁNEGO: Etap 33 nie jest zamknięty.

### SQL LEDGER

- Plik SQL: `supabase/manual/2026-05-17_etap33_admin_audit_runtime_verification.sql`.
- Typ: READ_ONLY_VERIFICATION.
- Status: URUCHOMIONE CZĘŚCIOWO / 4 PASS / 4 FAIL.
- Ledger repo: `_project/18_SQL_LEDGER.md`.
- Ledger Obsidian: `10_PROJEKTY/Sklep_projekty_domow/12_SQL_LEDGER - Sklep projekty domow.md`.

### NASTĘPNY KROK

Kliknąć brakujące operacje:
1. media projektu,
2. pliki prywatne,
3. zmiana statusu zamówienia,
4. checklisty zamówień.

Potem ponowić SQL proof. Dopiero 8 PASS zamyka Etap 33.
<!-- ETAP33_V6_PARTIAL_RUNTIME_STATUS_2026_05_17_END -->

<!-- ETAP33_V7_PARTIAL_RUNTIME_AUDIT_2026_05_17_START -->
## Etap 33 V7 - częściowy runtime audit admina

Status: CZĘŚCIOWO POTWIERDZONE PRZEZ DAMIANA / ETAP NIEZAMKNIĘTY.
Data: 2026-05-17 Europe/Warsaw.

### PASS

- dodanie projektu - `project_create`
- publikacja projektu - `project_status_update`
- archiwizacja projektu - `project_archive`
- usunięcie projektu - `project_hard_delete`

### FAIL / DO WYKONANIA

- media projektu - `project_media_delete` / `project_media_type_update`
- pliki prywatne - `project_private_file_delete`
- zamówienia - `order_status_update`
- checklisty zamówień - `order_fulfillment_checklist_update`

### TESTY

- TEST RĘCZNY POTWIERDZONY PRZEZ DAMIANA - CZĘŚCIOWO: 4 PASS.
- TEST RĘCZNY DO WYKONANIA: 4 FAIL.
- BRAK POTWIERDZONEGO TESTU PEŁNEGO: Etap 33 nie jest zamknięty.

### NASTĘPNY KROK

Kliknąć brakujące operacje i ponowić SQL proof. Etap 33 zamyka dopiero 8 PASS / 0 FAIL.
<!-- ETAP33_V7_PARTIAL_RUNTIME_AUDIT_2026_05_17_END -->

<!-- ETAP33_V8_PARTIAL_RUNTIME_AUDIT_2026_05_17_START -->
## Etap 33 V8 - częściowy runtime audit admina

Status: CZĘŚCIOWO POTWIERDZONE PRZEZ DAMIANA / ETAP NIEZAMKNIĘTY.
Data: 2026-05-17 Europe/Warsaw.

### PASS

- dodanie projektu - `project_create`
- publikacja projektu - `project_status_update`
- archiwizacja projektu - `project_archive`
- usunięcie projektu - `project_hard_delete`

### FAIL / DO WYKONANIA

- media projektu - `project_media_delete` / `project_media_type_update`
- pliki prywatne - `project_private_file_delete`
- zamówienia - `order_status_update`
- checklisty zamówień - `order_fulfillment_checklist_update`

### TESTY

- TEST RĘCZNY POTWIERDZONY PRZEZ DAMIANA - CZĘŚCIOWO: 4 PASS.
- TEST RĘCZNY DO WYKONANIA: 4 FAIL.
- BRAK POTWIERDZONEGO TESTU PEŁNEGO: Etap 33 nie jest zamknięty.

### NASTĘPNY KROK

Kliknąć brakujące operacje i ponowić SQL proof. Etap 33 zamyka dopiero 8 PASS / 0 FAIL.
<!-- ETAP33_V8_PARTIAL_RUNTIME_AUDIT_2026_05_17_END -->

<!-- ETAP34_ADMIN_UX_SCROLL_WIDTH_SEED_2026_05_17_START -->
## Etap 34 V3 - admin UX: scroll, szerokość i projekt testowy

Status: WDROŻONE W KODZIE / TEST RĘCZNY DO WYKONANIA / V3 GUARD MARKER FIX.
Data: 2026-05-17 Europe/Warsaw.

### FAKTY

- Dodano `AdminScrollStabilizer`, który zapisuje pozycję scrolla przed akcjami admina i przywraca ją po odświeżeniu widoku.
- Dodano responsywną szerokość panelu admina: więcej przestrzeni na dużym ekranie, ale z limitem czytelności.
- Ekran edycji projektu dostał klasę `admin-project-edit-shell`.
- Dodano SQL seed projektu testowego `DP-TEST-034` z ładnymi zdjęciami i statusem `draft`.
- Dodano guard `verify:admin-ux-stability-v34`; V3 poprawia marker `NIE URUCHAMIAC` dla SQL seed.

### TESTY RĘCZNE

- TEST RĘCZNY DO WYKONANIA:
  - scroll po akcji media,
  - scroll po usunięciu pliku prywatnego,
  - scroll po zmianie statusu zamówienia,
  - scroll po zmianie checklisty,
  - szerokość panelu na różnych ekranach,
  - SQL seed projektu testowego.

### ETAP 33

Etap 33 nadal nie jest zamknięty. Brakujące testy audit runtime zostają zapisane jako do wykonania później:
- media,
- pliki prywatne,
- zamówienia,
- checklisty.
<!-- ETAP34_ADMIN_UX_SCROLL_WIDTH_SEED_2026_05_17_END -->



