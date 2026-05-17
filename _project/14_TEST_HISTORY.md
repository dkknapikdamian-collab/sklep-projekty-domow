<!-- ETAP35A_STRIPE_PROVIDER_DECISION_2026_05_17_START -->
## 2026-05-17 - Etap 35A: decyzja Stripe

Status: TEST AUTOMATYCZNY / GUARD + DECYZJA DAMIANA.

### Potwierdzenie Damiana

Damian potwierdził wybór: Stripe.

### Guard

`npm run verify:stage35-stripe-provider-decision`

### Test ręczny

BRAK TESTU RUNTIME, bo Etap 35A nie wdraża płatności. To zapis decyzji i przygotowanie 35B.
<!-- ETAP35A_STRIPE_PROVIDER_DECISION_2026_05_17_END -->

<!-- ETAP35_PAYMENT_ARCHITECTURE_DESIGN_2026_05_17_START -->
## 2026-05-17 - Etap 35: payment architecture guard

Status: TEST AUTOMATYCZNY / GUARD.

### Guard

`npm run verify:stage35-payment-architecture`

### Co sprawdza

- istnieje dokument `docs/payments/ETAP35_PAYMENT_ARCHITECTURE.md`,
- dokument zawiera provider, statusy, Checkout Session, PaymentIntent, webhook, idempotencję, security i fulfillment plików,
- package.json ma skrypt guarda,
- główny `verify` zawiera guard Etapu 35.

### Test ręczny

BRAK POTWIERDZONEGO TESTU RĘCZNEGO, bo Etap 35 jest projektem architektury, nie wdrożeniem runtime płatności.
<!-- ETAP35_PAYMENT_ARCHITECTURE_DESIGN_2026_05_17_END -->

<!-- ETAP34C_MANUAL_CONFIRMATION_FULL_FLOW_2026_05_17_START -->
## 2026-05-17 - Etap 34C: test ręczny pełnego flow sklepu

Status: TEST RĘCZNY POTWIERDZONY PRZEZ DAMIANA.

### Zakres potwierdzony

- admin dodaje kompletny realny projekt,
- projekt active pojawia się w katalogu,
- karta projektu działa,
- koszyk działa,
- zamówienie techniczne powstaje,
- admin widzi zamówienie,
- walidacja cen działa,
- audit działa.

### Wynik

PASS runtime na realnym flow V1 bez płatności publicznej.

### Ograniczenie

Nie jest to test płatności online, webhooków, automatycznej wysyłki plików, panelu klienta ani faktur.
<!-- ETAP34C_MANUAL_CONFIRMATION_FULL_FLOW_2026_05_17_END -->

# 14_TEST_HISTORY - Sklep projekty domow

<!-- ETAP34_FULL_FLOW_NO_PUBLIC_PAYMENT_2026_05_17_START -->
## 2026-05-17 - Etap 34: testy pełnego flow bez płatności publicznej

### TEST AUTOMATYCZNY / GUARD

- `npm run verify:stage34-full-flow-no-public-payment`
- Status: DO URUCHOMIENIA LOKALNIE przez APPLY z paczki.
- Zakres: statyczny kontrakt katalog -> karta -> koszyk -> checkout techniczny -> zamówienie -> admin orders -> walidacja cen -> audit.

### TEST RĘCZNY DO WYKONANIA

- Realny projekt active w katalogu.
- Karta działa.
- Koszyk działa.
- Zamówienie techniczne powstaje.
- Admin widzi zamówienie.
- Walidacja cen blokuje nieaktualny koszyk.
- Audit pokazuje wpisy po operacjach admina.

### BRAK POTWIERDZONEGO TESTU RĘCZNEGO

Nie ma jeszcze potwierdzenia Damiana dla runtime Etapu 34.
<!-- ETAP34_FULL_FLOW_NO_PUBLIC_PAYMENT_2026_05_17_END -->


<!-- ETAP32_DEDUPE_CLEANUP_V5_2026_05_17_START -->
## 2026-05-17 - Etap 32 V5: cleanup duplikatów pamięci projektu

Status: CLEANUP DOKUMENTACYJNY / BEZ ZMIAN W LOGICE APLIKACJI.

### FAKT

Po nieudanych paczkach V1/V2 i skutecznym V3 blok Etapu 32 został zapisany wielokrotnie w części plików `_project` i Obsidiana. Guardy przechodziły, ale pamięć projektu była zaśmiecona potrójnym wpisem.

### Zmiana

V5 usuwa duplikaty i zostawia jeden kanoniczny blok Etapu 32 w każdym pliku docelowym.

### Guardy

- `npm run verify:project-memory-stage32-dedupe`
- `npm run verify:project-memory-stage32`
- `npm run check:project-memory`

### Ryzyko

Brak zmian w kodzie runtime. Ryzyko dotyczy tylko dokumentacji i pamięci projektu.
<!-- ETAP32_DEDUPE_CLEANUP_V5_2026_05_17_END -->

<!-- ETAP32_PROJECT_MEMORY_ORDERING_2026_05_17_START -->
## 2026-05-17 - Etap 32: pamięć projektu i status V1

### Status zbiorczy

Kod ma elementy Etapów 22-29, ale V1 nie jest zamknięte.

Największe blokady: płatności, runtime testy, potwierdzenie Damiana, finalny flow klienta.

### Testy automatyczne / guardy

- `npm run verify:project-memory-stage32` - TEST AUTOMATYCZNY / GUARD.
- `npm run verify:project-memory-stage32-dedupe` - TEST AUTOMATYCZNY / GUARD dla braku duplikatów bloku Etapu 32.
- `npm run check:project-memory` - TEST AUTOMATYCZNY / GUARD.

### Testy ręczne

- Dashboard Obsidiana po Etapie 32: TEST RĘCZNY DO WYKONANIA.
- Runtime V1: BRAK POTWIERDZONEGO TESTU RĘCZNEGO.
- Płatności/finalny flow klienta: BRAK POTWIERDZONEGO TESTU RĘCZNEGO.

### Czego nie potwierdzono

- Ten etap nie potwierdza działania runtime aplikacji.
- Ten etap nie wdraża płatności.
- Ten etap nie zamyka V1.
<!-- ETAP32_PROJECT_MEMORY_ORDERING_2026_05_17_END -->

<!-- ETAP_B_PROJECT_MEMORY_STATUS_FIX_START -->
## 2026-05-16_1810 - Etap B: naprawa project memory / statusu etapów

### Status zbiorczy

Kod ma elementy etapów 22-29, ale V1 nie jest produkcyjnie zamknięte.

### Testy automatyczne / guardy

- `verify:project-stage-status-b` - guard dokumentacyjny tego etapu.
- `check:project-memory` - wymagany po aktualizacji pamięci projektu.
- Pełne `npm run verify` - opcjonalne w tym etapie dokumentacyjnym, ale zalecane przed kolejnym commitem produkcyjnym.

### Testy ręczne

- Runtime V1: TEST RĘCZNY DO WYKONANIA.
- Runtime audit admina: TEST RĘCZNY DO WYKONANIA.
- Publiczny start klientom: BLOKADA.

### Czego nie wolno uznać za potwierdzone

- Nie wolno uznać Etapu 29 za pełne zamknięcie V1.
- Nie wolno uznać guardów za ręczne potwierdzenie runtime.
- Nie wolno uznać manual-payment flow za docelowy model płatności.

### Decyzja Damiana

Nie wdrażamy płatności ręcznych jako docelowego modelu. Docelowo mają być automatyczne płatności online: Stripe/payment provider, webhooki i statusy płatności.
<!-- ETAP_B_PROJECT_MEMORY_STATUS_FIX_END -->

## Statusy testow

- TEST AUTOMATYCZNY / GUARD
- TEST RECZNY DO WYKONANIA
- TEST RECZNY POTWIERDZONY PRZEZ DAMIANA
- BRAK POTWIERDZONEGO TESTU

<!-- ETAP_A_PAYMENT_DIRECTION_FIX_START -->
## 2026-05-16 - Etap A: korekta kierunku płatności

### Zakres

Zmieniono kierunek testów i guardów dotyczących checkoutu/płatności.

### Decyzja Damiana

Nie wdrażamy płatności ręcznych jako docelowego modelu. Docelowo mają być automatyczne płatności online: Stripe/payment provider, webhooki i statusy płatności.

### Status obecnego flow

Obecny manual-payment flow jest legacy / temporary / internal only.

### Guard

`verify:manual-payment-v48` został wycofany z aktywnego `npm run verify`. Nowy aktywny guard: `verify:payment-direction-v48`.

### Status testu

TEST RĘCZNY DO WYKONANIA.

### Ryzyko

Dopóki automatyczne płatności nie są wdrożone, obecny flow zamówienia nie może być traktowany jako gotowy do publicznego uruchomienia.
<!-- ETAP_A_PAYMENT_DIRECTION_FIX_END -->

## 2026-05-16 - Etap 29 guard regression V47/V51

| Test | Status | Wynik / zrodlo |
|---|---|---|
| `npm run verify:production-readiness-v52` | TEST AUTOMATYCZNY / GUARD | PASS wedlug logu Damiana: `OK: Etap 29 production readiness checklist is present and guarded.` |
| `npm run verify` | BRAK POTWIERDZONEGO TESTU | FAIL na `verify:private-files-fulfillment-v51`: `scripts/check-manual-email-drafts-v47.cjs missing marker: paymentInstruction` |
| Naprawa guarda V47 | TEST AUTOMATYCZNY / GUARD | Dodano markery `buildManualPaymentInstruction` i `paymentInstruction` do `scripts/check-manual-email-drafts-v47.cjs`, zgodnie z wymaganiem V51 |
| Runtime V1 | TEST RECZNY DO WYKONANIA | Bez zmian, nadal wymaga klikniecia calego flow |

## 2026-05-16 - Etap 29 pre-release checklist V1 - wynik builda lokalnego

| Test | Status | Wynik / zrodlo |
|---|---|---|
| `npm run build` | TEST AUTOMATYCZNY / GUARD | PASS wedlug logu wklejonego przez Damiana: `Compiled successfully in 3.3s`, `Generating static pages (9/9)`, `Finalizing page optimization` |
| Walidacja typow w buildzie | TEST AUTOMATYCZNY / GUARD | PASS wedlug logu: `Linting and checking validity of types` |
| Warningi CSS autoprefixer | TEST AUTOMATYCZNY / GUARD | NIE BLOKUJA: `start` -> `flex-start` w `app/admin-v8.css`, `end` -> `flex-end` w `app/globals.css` |
| `npm run verify:production-readiness-v52` | TEST AUTOMATYCZNY / GUARD | PASS wedlug logu Damiana |
| `npm run verify` | BRAK POTWIERDZONEGO TESTU | Pierwszy run FAIL na regresji kontraktu V51/V47, poprawka wdrozona po logu |
| Runtime V1: realny projekt -> koszyk -> zamowienie -> admin -> audit | TEST RECZNY DO WYKONANIA | Nadal wymagany ręczny test Damiana |

## 2026-05-16 - Roadmapa produkcyjna i odhaczanie etapow

| Test | Status | Wynik / zrodlo |
|---|---|---|
| Utworzenie pliku `_project/16_PRODUCTION_ROADMAP_AND_ACCEPTANCE.md` | TEST AUTOMATYCZNY / GUARD | GitHub commit utworzyl plik |
| Utworzenie notatki Obsidiana roadmapy | TEST AUTOMATYCZNY / GUARD | GitHub commit w repo Obsidiana utworzyl notatke |
| Lokalny `npm run check:project-memory` | BRAK POTWIERDZONEGO TESTU | nie uruchomiono lokalnie w tej sesji |
| Reczny przeglad Obsidiana przez Damiana | TEST RECZNY DO WYKONANIA | Damian powinien otworzyc nowa notatke roadmapy |
| Potwierdzenie Damiana | BRAK POTWIERDZONEGO TESTU | brak jeszcze jawnego potwierdzenia |

## 2026-05-16 - Etap 21 real audit coverage V6

FAKT: dodano i zweryfikowano statycznie realne markery audit logu dla brakujacych mutacji admina.
TEST RECZNY DO WYKONANIA: runtime audit w /admin/audit po realnych operacjach admina.

## 2026-05-15 22:12:34 - test history for V6 memory package

| Test | Status | Result source |
|---|---|---|
| V6 memory guard | TEST AUTOMATYCZNY / GUARD | `node scripts/check-sklep-full-memory-v6.cjs` |
| Existing project memory guard | TEST AUTOMATYCZNY / GUARD | `npm run check:project-memory`, if present |
| Existing build | TEST AUTOMATYCZNY / GUARD | `npm run build`, optional because product code is not changed |
| Obsidian dashboard manual review | TEST RECZNY DO WYKONANIA | Damian should open dashboard |
| Store UI manual review | BRAK POTWIERDZONEGO TESTU | this package does not change UI |
| User-confirmed manual test | TEST RECZNY POTWIERDZONY PRZEZ DAMIANA | only after Damian explicitly confirms |

<!-- ETAP22_RUNTIME_AUDIT_ADMINA_START -->
## Etap 22 — test history

Automatyczne:
- Do uruchomienia przez APPLY: verify:admin-audit-log-v44, verify:admin-orders-v42, typecheck, build, check:project-memory.

Ręczne:
- Status: TEST RĘCZNY DO WYKONANIA.
- Potwierdzenie Damiana: brak na moment wdrożenia paczki.
<!-- ETAP22_RUNTIME_AUDIT_ADMINA_END -->

<!-- ETAP22_RUNTIME_AUDIT_ADMINA_CHECK_RESULTS_START -->
## Etap 22 - automatic check results from APPLY V3

Date: 2026-05-16_1137

Result:
- npm run verify:admin-audit-log-v44 - PASS
- npm run verify:admin-orders-v42 - PASS
- npm run typecheck - PASS
- npm run build - PASS
- npm run check:project-memory - PASS

Note:
- This is not manual runtime confirmation. Manual status remains: TEST RECZNY DO WYKONANIA.
- Full close criterion: Damian must see real entries in /admin/audit after admin operations.
<!-- ETAP22_RUNTIME_AUDIT_ADMINA_CHECK_RESULTS_END -->

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

<!-- ETAP27_STAGE52_PUBLICATION_READINESS_TEST_HISTORY -->
## 2026-05-16 - Etap 27 / STAGE52

Status testu ręcznego: TEST RĘCZNY DO WYKONANIA.

Do sprawdzenia na Vercelu:
- Gotowość publikacji widoczna na edycji projektu.
- Projekt z brakami nie przechodzi na active.
- Komplet sprzedażowy przechodzi na active.
- Katalog nadal pokazuje tylko active.
<!-- ETAP27_STAGE52_PUBLICATION_READINESS_TEST_HISTORY -->

<!-- ETAP28_STAGE53_DEMO_SAMPLE_CLEANUP_TEST_HISTORY -->
## 2026-05-16 - Etap 28 / STAGE53

TEST RECZNY DO WYKONANIA:
- sample tworzy sie jako draft,
- sample/demo nie widac w `/projekty`,
- realne active nadal widoczne.
<!-- ETAP28_STAGE53_DEMO_SAMPLE_CLEANUP_TEST_HISTORY -->

<!-- ETAP29_V49_AUDIT_MARKER_FIX_V2_2026_05_16 -->
## 2026-05-16 - Etap 29 V49 audit marker fix V2

FAKT:
- 
pm run verify przeszedl przez V52, no-demo, V51, V50 i zatrzymal sie na V49.
- Blokada: pp/admin/audit/page.tsx missing marker: data-admin-audit-log.
- Naprawa: dodano data-admin-audit-log="true" do glownego <main> strony /admin/audit, obok istniejacego data-admin-audit-v50="true".

TESTY AUTOMATYCZNE DO WYKONANIA PRZEZ SKRYPT:
- 
pm run verify:v1-runtime-flow-markers-v49
- 
pm run verify
- 
pm run check:project-memory

TEST RECZNY:
- TEST RECZNY DO WYKONANIA: runtime V1 nadal wymaga klikniecia realnego flow.
<!-- ETAP29_V49_AUDIT_MARKER_FIX_V2_2026_05_16 -->

<!-- ETAP29_GUARD_BLOCKERS_FIX_V5_START -->
## 2026-05-16 - Etap 29 guard blockers fix V5 local inspect

FAKT:
- V4 zatrzymał się na braku oczekiwanego wzorca w AdminProjectMediaManager.
- V5 najpierw zapisuje lokalne fragmenty plików do raportu, potem patchuje po strukturze lokalnego kodu, nie po jednym sztywnym stringu.

NAPRAWA:
- V49: UI marker zostaje w app/admin/audit/page.tsx, DB marker admin_audit_log sprawdzany w lib/admin/audit-log.ts.
- V41: title={publicHref} dodany do linków publicznych.
- V25: data-admin-media-open-link="Otworz plik" dodany do linku publicUrl bez zmiany widocznego tekstu Otwórz plik.

TESTY:
- Focused guardy V49/V41/V25.
- Pełne npm run verify.
- npm run check:project-memory.

TEST RĘCZNY:
- TEST RĘCZNY DO WYKONANIA.
<!-- ETAP29_GUARD_BLOCKERS_FIX_V5_END -->

<!-- ETAP29_GUARD_BLOCKERS_FIX_V7_START -->
## 2026-05-16 - Etap 29 guard blockers fix V7 no template break

FAKT:
- V6 nie wystartował przez błąd składni w JS patcherze spowodowany markdown backtickami w template stringu.
- V7 usuwa ten typ błędu: nie używa template stringów do długich bloków markdown.
- V25 guard wymagał ASCII tekstu mimo poprawnego polskiego UI.

NAPRAWA:
- Guard V25 dostał assertIncludesAny.
- UI zostaje po polsku.
- V49/V41/V25 są sprawdzane focused guardami przed pełnym verify.

TESTY:
- Focused guardy V49/V41/V25.
- Pełne npm run verify.
- npm run check:project-memory.

TEST RĘCZNY:
- TEST RĘCZNY DO WYKONANIA.
<!-- ETAP29_GUARD_BLOCKERS_FIX_V7_END -->

<!-- ETAP22C_RUNTIME_ADMIN_AUDIT_TEST_HISTORY_START -->
## 2026-05-16 - Etap 22C runtime audit admina

| Test | Status | Wynik / źródło |
|---|---|---|
| `npm run verify:admin-audit-runtime-v53` | TEST AUTOMATYCZNY / GUARD | Do uruchomienia po zastosowaniu paczki. |
| `npm run verify:admin-audit-log-v44` | TEST AUTOMATYCZNY / GUARD | Do uruchomienia po zastosowaniu paczki. |
| SQL `admin_audit_runtime_last_24h` | TEST RĘCZNY DO WYKONANIA | SQL ma pokazać `failed_actions = 0` po realnych operacjach. |
| Runtime `/admin/audit` po 10 operacjach admina | TEST RĘCZNY DO WYKONANIA | To nie jest ręcznym potwierdzeniem runtime, dopóki Damian nie wykona i nie potwierdzi. |

Uwaga: automatyczne guardy po Etapie 22 nie są ręcznym potwierdzeniem runtime. Etap pozostaje niezamknięty do potwierdzenia Damiana.
<!-- ETAP22C_RUNTIME_ADMIN_AUDIT_TEST_HISTORY_END -->

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

<!-- ETAP33_ADMIN_AUDIT_RUNTIME_TEST_HISTORY_2026_05_17_START -->
## 2026-05-17 - Etap 33 runtime test admina i audit

### TEST AUTOMATYCZNY / GUARD

Do uruchomienia przez apply:

```powershell
npm run verify:admin-audit-log-v44
npm run verify:admin-audit-runtime-v53
npm run check:project-memory
npm run typecheck
npm run build
```

### TEST RĘCZNY DO WYKONANIA

Kliknąć dodanie projektu, publikację, archiwizację, usunięcie projektu testowego, media, pliki prywatne, zamówienia, checklisty i `/admin/audit`.

### BRAK POTWIERDZONEGO TESTU RĘCZNEGO

Etap 33 nie jest zamknięty do czasu potwierdzenia runtime w Supabase.

### Proof wymagany po kliknięciach

```powershell
npm run audit:admin-runtime-v54
```

albo SQL proof z `supabase/manual/2026-05-17_etap33_admin_audit_runtime_verification.sql`.
<!-- ETAP33_ADMIN_AUDIT_RUNTIME_TEST_HISTORY_2026_05_17_END -->

<!-- ETAP33_ADMIN_AUDIT_RUNTIME_V2_TEST_HISTORY_2026_05_17_START -->
## 2026-05-17 - Etap 33 V2 SQL ledger i env fix

### TEST AUTOMATYCZNY / GUARD

Do uruchomienia przez apply:

```powershell
npm run verify:admin-audit-log-v44
npm run verify:admin-audit-runtime-v53
npm run check:project-memory
npm run typecheck
npm run build
```

### TEST RĘCZNY DO WYKONANIA

Kliknąć dodanie projektu, publikację, archiwizację, usunięcie projektu testowego, media, pliki prywatne, zamówienia, checklisty i `/admin/audit`.

### BRAK POTWIERDZONEGO TESTU RĘCZNEGO

V2 naprawia paczkę, ale nie potwierdza runtime. Runtime potwierdza dopiero `PASS` w Node/SQL proof.
<!-- ETAP33_ADMIN_AUDIT_RUNTIME_V2_TEST_HISTORY_2026_05_17_END -->

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

<!-- ETAP34_V4_SEED_JSONB_FIX_2026_05_17_START -->
## Etap 34 V4 - poprawka SQL seed JSONB

Status: HOTFIX SQL SEED / TEST RĘCZNY DO WYKONANIA.
Data: 2026-05-17 Europe/Warsaw.

### FAKTY

- SQL seed V3 nie przeszedł w Supabase.
- Błąd: `projects.features` jest `jsonb`, a seed podawał `text[]`.
- V4 zmienia `features` i `related_slugs` na JSONB.
- Projekt testowy nadal ma status `draft`, nie `active`.

### TESTY RĘCZNE

- TEST RĘCZNY DO WYKONANIA:
  - uruchomić SQL seed V4 w Supabase SQL Editor,
  - potwierdzić `DP-TEST-034` w adminie,
  - potwierdzić status `draft`,
  - potwierdzić media i pliki prywatne testowe.

### ETAP 33

Etap 33 nadal nie jest zamknięty. Brakujące testy audit runtime pozostają do wykonania później:
- media,
- pliki prywatne,
- zamówienia,
- checklisty.
<!-- ETAP34_V4_SEED_JSONB_FIX_2026_05_17_END -->

<!-- ETAP34_V5_ADMIN_WIDTH_CONFIRMATIONS_2026_05_17_START -->
## Etap 34 V5 - potwierdzenia testów i hard lock szerokości admina

Status: HOTFIX SZEROKOŚCI / TEST RĘCZNY DO WYKONANIA.
Data: 2026-05-17 Europe/Warsaw.

### TEST RĘCZNY POTWIERDZONY PRZEZ DAMIANA - CZĘŚCIOWO

- SQL seed projektu testowego potwierdzony:
  - `DP-TEST-034`
  - `Dom Aurora Test`
  - `status: draft`
- Damian napisał: `reszta jest ok`.

### FAIL / DO PONOWNEGO TESTU

- Szerokość panelu admina nadal jest za wąska: `dalej wąski tunel`.
- V5 dodaje mocniejszy CSS hard lock dla edycji projektu.

### WYJAŚNIENIE SQL EDITOR

Błąd `syntax error at or near "Etap"` oznacza, że do Supabase SQL Editor trafił tekst zaczynający się od `Etap 34:`, a nie SQL. To nie jest błąd seed SQL ani schematu.

### TESTY DO WYKONANIA PO V5

- Otworzyć `DP-TEST-034 -> Edytuj`.
- Sprawdzić szerokość panelu na dużym ekranie.
- Sprawdzić scroll po akcji w dole formularza.
- Jeśli szerokość OK, dopisać ręczne potwierdzenie.
<!-- ETAP34_V5_ADMIN_WIDTH_CONFIRMATIONS_2026_05_17_END -->

<!-- ETAP34_V6_ADMIN_WIDTH_CONFIRMED_2026_05_17_START -->
## Etap 34 V6 - szerokość panelu admina potwierdzona

Status: TEST RĘCZNY POTWIERDZONY PRZEZ DAMIANA.
Data: 2026-05-17 Europe/Warsaw.

### Potwierdzenie Damiana

Damian potwierdził po V5: `poprawione działa :)`.

### Zakres potwierdzenia

- Szerokość panelu admina po hard lock V5: POTWIERDZONE.
- Projekt testowy `DP-TEST-034`: istnieje jako `draft`, potwierdzony wcześniej.
- Scroll i reszta Etapu 34: wstępnie OK według Damiana.

### Status

Etap 34 można traktować jako potwierdzony w zakresie zgłoszonej poprawki szerokości panelu.

### Nadal otwarte

Etap 33 runtime audit:
- media,
- pliki prywatne,
- zamówienia,
- checklisty,
- wymagane 8 PASS / 0 FAIL.
<!-- ETAP34_V6_ADMIN_WIDTH_CONFIRMED_2026_05_17_END -->
