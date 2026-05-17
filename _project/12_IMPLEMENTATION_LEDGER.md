<!-- ETAP35A_STRIPE_PROVIDER_DECISION_2026_05_17_START -->
## 2026-05-17 - Etap 35A: zapis decyzji Stripe

### Co wdrożono

Zapisano decyzję Damiana, że Stripe jest wybranym providerem płatności dla pierwszego wdrożenia V1.1.

### Dlaczego

Etap 35 miał status projektu do decyzji. Po potwierdzeniu przez Damiana decyzja nie może zostać tylko w czacie.

### Pliki zmienione

- `docs/payments/ETAP35_PAYMENT_ARCHITECTURE.md`
- `scripts/check-stage35-stripe-provider-decision.cjs`
- `package.json`
- `_project/03_CURRENT_STAGE.md`
- `_project/04_DECISIONS.md`
- `_project/06_GUARDS_AND_TESTS.md`
- `_project/07_NEXT_STEPS.md`
- `_project/08_CHANGELOG_AI.md`
- `_project/10_PROJECT_TIMELINE.md`
- `_project/12_IMPLEMENTATION_LEDGER.md`
- `_project/14_TEST_HISTORY.md`
- `_project/15_ACTIVE_SOURCE_MAP.md`
- `_project/runs/2026-05-17_1435_etap35a_stripe_provider_decision.md`
- Obsidian: `10_PROJEKTY/Sklep_projekty_domow/`

### Testy / guardy

- `npm run verify:stage35-stripe-provider-decision`

### Ryzyka

Nie ma jeszcze implementacji Stripe. To decyzja architektoniczna, nie runtime płatności.
<!-- ETAP35A_STRIPE_PROVIDER_DECISION_2026_05_17_END -->

<!-- ETAP35_PAYMENT_ARCHITECTURE_DESIGN_2026_05_17_START -->
## 2026-05-17 - Etap 35: projekt automatycznych płatności

### Co wdrożono

Wdrożono dokumentację projektową Etapu 35 oraz guard statyczny pilnujący, że projekt płatności został zapisany w repo.

### Co nie zostało wdrożone

- Brak live payment.
- Brak Stripe secretów.
- Brak webhooka runtime.
- Brak automatycznej wysyłki plików.
- Brak faktur i panelu klienta.

### Pliki zmienione

- `docs/payments/ETAP35_PAYMENT_ARCHITECTURE.md`
- `scripts/check-stage35-payment-architecture.cjs`
- `package.json`
- `_project/03_CURRENT_STAGE.md`
- `_project/06_GUARDS_AND_TESTS.md`
- `_project/07_NEXT_STEPS.md`
- `_project/08_CHANGELOG_AI.md`
- `_project/10_PROJECT_TIMELINE.md`
- `_project/12_IMPLEMENTATION_LEDGER.md`
- `_project/14_TEST_HISTORY.md`
- `_project/15_ACTIVE_SOURCE_MAP.md`
- `_project/runs/2026-05-17_1415_etap35_payment_architecture_design.md`
- Obsidian: `10_PROJEKTY/Sklep_projekty_domow/`

### Testy / guardy

- `npm run verify:stage35-payment-architecture`

### Ryzyka

Etap jest projektowy. Nie sprawdza realnej płatności, bo nie ma jeszcze decyzji Damiana i nie wolno uruchamiać live payment bez osobnego etapu.
<!-- ETAP35_PAYMENT_ARCHITECTURE_DESIGN_2026_05_17_END -->

<!-- ETAP34C_MANUAL_CONFIRMATION_FULL_FLOW_2026_05_17_START -->
## 2026-05-17 - Etap 34C: zapis ręcznego potwierdzenia full flow

### Co wdrożono

Zapisano w pamięci projektu ręczne potwierdzenie Damiana dla pełnego flow Etapu 34.

### Dlaczego

Wynik testu ręcznego nie może zostać tylko w czacie. Musi trafić do `_project` i Obsidiana.

### Pliki zmienione

- `_project/03_CURRENT_STAGE.md`
- `_project/07_NEXT_STEPS.md`
- `_project/08_CHANGELOG_AI.md`
- `_project/10_PROJECT_TIMELINE.md`
- `_project/11_USER_CONFIRMED_TESTS.md`
- `_project/12_IMPLEMENTATION_LEDGER.md`
- `_project/14_TEST_HISTORY.md`
- `_project/runs/2026-05-17_1335_etap34c_manual_confirmation_full_flow.md`
- Obsidian: sekcja `10_PROJEKTY/Sklep_projekty_domow/`

### Testy / guardy

- TEST RĘCZNY POTWIERDZONY PRZEZ DAMIANA: full flow Etapu 34.
- Guard statyczny pozostaje: `npm run verify:stage34-full-flow-no-public-payment`.

### Ryzyka

- Nadal brak płatności publicznych i automatycznej realizacji plików. To świadomy zakres, nie regresja.

### Następny krok

Decyzja o Etapie 35: płatności online, webhooki, statusy płatności i wydawanie plików.
<!-- ETAP34C_MANUAL_CONFIRMATION_FULL_FLOW_2026_05_17_END -->

# 12_IMPLEMENTATION_LEDGER - Sklep projekty domow

<!-- ETAP34_FULL_FLOW_NO_PUBLIC_PAYMENT_2026_05_17_START -->
## 2026-05-17 - Etap 34: pełny flow sklepu bez płatności publicznej

### Co wdrożono

- Dodano guard pełnego flow sklepu bez płatności publicznej.
- Zaktualizowano pamięć projektu i Obsidiana.
- Spięto w jednym kontrakcie: katalog, karta projektu, koszyk, checkout techniczny, zapis zamówienia, admin orders, walidacja cen i audit.

### Dlaczego

Etap 32 wskazał brak potwierdzonego runtime testu pełnej ścieżki V1. Etap 34 ma zamknąć statyczny kontrakt i dać Damianowi krótką checklistę testu ręcznego.

### Zmienione pliki

- `package.json`
- `scripts/check-stage34-full-flow-no-public-payment.cjs`
- `_project/03_CURRENT_STAGE.md`
- `_project/05_MANUAL_TESTS.md`
- `_project/06_GUARDS_AND_TESTS.md`
- `_project/07_NEXT_STEPS.md`
- `_project/08_CHANGELOG_AI.md`
- `_project/09_CONTEXT_FOR_OBSIDIAN.md`
- `_project/10_PROJECT_TIMELINE.md`
- `_project/12_IMPLEMENTATION_LEDGER.md`
- `_project/14_TEST_HISTORY.md`
- `_project/15_ACTIVE_SOURCE_MAP.md`
- `_project/runs/2026-05-17_etap34_full_flow_no_public_payment.md`

### Czego nie zmieniano

- Nie dodano płatności online.
- Nie dodano automatycznej wysyłki plików.
- Nie zmieniono routingu publicznego.
- Nie zmieniono modeli SQL.

### Testy / guardy

- `npm run verify:stage34-full-flow-no-public-payment` - DO URUCHOMIENIA LOKALNIE.
- Istniejące guardy pokrewne uruchamia APPLY: V49 runtime markers, V50 price source, V25 price runtime, V44 audit, V42 orders, V38 cart/order, typecheck.

### Test ręczny

BRAK POTWIERDZONEGO TESTU RĘCZNEGO do czasu wykonania przez Damiana.

### Ryzyka

- Guard statyczny nie potwierdza realnego zapisu w Supabase.
- Realny flow wymaga kompletnego aktywnego projektu w bazie.
- Zmiana ceny w bazie po dodaniu do koszyka musi być sprawdzona jako negatywny test runtime.

### Następny krok

Wykonać test ręczny Etapu 34 i wpisać wynik do `_project/11_USER_CONFIRMED_TESTS.md` oraz Obsidiana.
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
## 2026-05-17 - Etap 32: uporządkowanie pamięci projektu

### Co wdrożono

Uporządkowano pamięć projektu i wpisano kanoniczny status V1: Kod ma elementy Etapów 22-29, ale V1 nie jest zamknięte.

### Dlaczego

W repo i Obsidianie były już wpisy blokujące V1, ale dashboard i kolejność etapów nadal mogły sugerować, że starsze etapy są głównym aktywnym kierunkiem albo że checklisty są bliżej zamknięcia niż w rzeczywistości.

### Zmienione pliki

- `_project/03_CURRENT_STAGE.md`
- `_project/07_NEXT_STEPS.md`
- `_project/14_TEST_HISTORY.md`
- `_project/16_PRODUCTION_ROADMAP_AND_ACCEPTANCE.md`
- `_project/06_GUARDS_AND_TESTS.md`
- `_project/08_CHANGELOG_AI.md`
- `_project/12_IMPLEMENTATION_LEDGER.md`
- `_project/runs/2026-05-17_0800_etap32_project_memory_ordering.md`
- `scripts/check-project-memory-stage32.cjs`
- `package.json`
- Obsidian dashboard i roadmapa projektu

### Czego nie zmieniano

- Kod aplikacji.
- UI.
- Checkout.
- Płatności.
- Storage prywatnych plików.
- Logika admina.

### Ryzyka

- Guard dokumentacyjny nie zastępuje testu runtime.
- V1 nadal nie ma potwierdzonego finalnego flow klienta.

### Testy / guardy

- `npm run verify:project-memory-stage32`
- `npm run check:project-memory`

### Status testu ręcznego

- TEST RĘCZNY DO WYKONANIA: przegląd dashboardu Obsidiana.
- BRAK POTWIERDZONEGO TESTU RĘCZNEGO: runtime V1 i finalny flow klienta.

### Następny krok

Doprecyzować finalny flow klienta i płatności, potem zamknąć runtime audit oraz pełny test V1 bez publikacji klientom.
<!-- ETAP32_PROJECT_MEMORY_ORDERING_2026_05_17_END -->

<!-- ETAP32_PROJECT_MEMORY_ORDERING_2026_05_17_START -->
## 2026-05-17 - Etap 32: uporządkowanie pamięci projektu

### Co wdrożono

Uporządkowano pamięć projektu i wpisano kanoniczny status V1: Kod ma elementy Etapów 22-29, ale V1 nie jest zamknięte.

### Dlaczego

W repo i Obsidianie były już wpisy blokujące V1, ale dashboard i kolejność etapów nadal mogły sugerować, że starsze etapy są głównym aktywnym kierunkiem albo że checklisty są bliżej zamknięcia niż w rzeczywistości.

### Zmienione pliki

- `_project/03_CURRENT_STAGE.md`
- `_project/07_NEXT_STEPS.md`
- `_project/14_TEST_HISTORY.md`
- `_project/16_PRODUCTION_ROADMAP_AND_ACCEPTANCE.md`
- `_project/06_GUARDS_AND_TESTS.md`
- `_project/08_CHANGELOG_AI.md`
- `_project/12_IMPLEMENTATION_LEDGER.md`
- `_project/runs/2026-05-17_0800_etap32_project_memory_ordering.md`
- `scripts/check-project-memory-stage32.cjs`
- `package.json`
- Obsidian dashboard i roadmapa projektu

### Czego nie zmieniano

- Kod aplikacji.
- UI.
- Checkout.
- Płatności.
- Storage prywatnych plików.
- Logika admina.

### Ryzyka

- Guard dokumentacyjny nie zastępuje testu runtime.
- V1 nadal nie ma potwierdzonego finalnego flow klienta.

### Testy / guardy

- `npm run verify:project-memory-stage32`
- `npm run check:project-memory`

### Status testu ręcznego

- TEST RĘCZNY DO WYKONANIA: przegląd dashboardu Obsidiana.
- BRAK POTWIERDZONEGO TESTU RĘCZNEGO: runtime V1 i finalny flow klienta.

### Następny krok

Doprecyzować finalny flow klienta i płatności, potem zamknąć runtime audit oraz pełny test V1 bez publikacji klientom.
<!-- ETAP32_PROJECT_MEMORY_ORDERING_2026_05_17_END -->

<!-- ETAP32_PROJECT_MEMORY_ORDERING_2026_05_17_START -->
## 2026-05-17 - Etap 32: uporządkowanie pamięci projektu

### Co wdrożono

Uporządkowano pamięć projektu i wpisano kanoniczny status V1: Kod ma elementy Etapów 22-29, ale V1 nie jest zamknięte.

### Dlaczego

W repo i Obsidianie były już wpisy blokujące V1, ale dashboard i kolejność etapów nadal mogły sugerować, że starsze etapy są głównym aktywnym kierunkiem albo że checklisty są bliżej zamknięcia niż w rzeczywistości.

### Zmienione pliki

- `_project/03_CURRENT_STAGE.md`
- `_project/07_NEXT_STEPS.md`
- `_project/14_TEST_HISTORY.md`
- `_project/16_PRODUCTION_ROADMAP_AND_ACCEPTANCE.md`
- `_project/06_GUARDS_AND_TESTS.md`
- `_project/08_CHANGELOG_AI.md`
- `_project/12_IMPLEMENTATION_LEDGER.md`
- `_project/runs/2026-05-17_0800_etap32_project_memory_ordering.md`
- `scripts/check-project-memory-stage32.cjs`
- `package.json`
- Obsidian dashboard i roadmapa projektu

### Czego nie zmieniano

- Kod aplikacji.
- UI.
- Checkout.
- Płatności.
- Storage prywatnych plików.
- Logika admina.

### Ryzyka

- Guard dokumentacyjny nie zastępuje testu runtime.
- V1 nadal nie ma potwierdzonego finalnego flow klienta.

### Testy / guardy

- `npm run verify:project-memory-stage32`
- `npm run check:project-memory`

### Status testu ręcznego

- TEST RĘCZNY DO WYKONANIA: przegląd dashboardu Obsidiana.
- BRAK POTWIERDZONEGO TESTU RĘCZNEGO: runtime V1 i finalny flow klienta.

### Następny krok

Doprecyzować finalny flow klienta i płatności, potem zamknąć runtime audit oraz pełny test V1 bez publikacji klientom.
<!-- ETAP32_PROJECT_MEMORY_ORDERING_2026_05_17_END -->

## Ledger

Kazdy etap zapisuje: data, zakres, pliki, decyzje, testy, ryzyka, wynik i nastepny krok.

## 2026-05-16 - Roadmapa produkcyjna i odhaczanie etapow

| Pole | Wartosc |
|---|---|
| Typ | project memory / Obsidian / roadmapa produkcyjna |
| Dlaczego | Damian wymaga odhaczania tego, co wdrozone, przetestowane guardami i potwierdzone recznie |
| Zmieniono | `_project/16_PRODUCTION_ROADMAP_AND_ACCEPTANCE.md`, `_project/15_ACTIVE_SOURCE_MAP.md`, `_project/07_NEXT_STEPS.md`, `_project/08_CHANGELOG_AI.md`, `_project/09_CONTEXT_FOR_OBSIDIAN.md`, `_project/10_PROJECT_TIMELINE.md`, Obsidian dashboard i nowa notatka roadmapy |
| Nie zmieniono | kod aplikacji, UI, checkout, routing, baza, guardy runtime |
| Guardy | nie uruchomiono lokalnie; zmiana przez GitHub API |
| Test reczny | TEST RECZNY DO WYKONANIA - sprawdzic Obsidian i nowy plik roadmapy |
| Ryzyko | brak lokalnego uruchomienia `check:project-memory` w tej sesji |
| Nastepny krok | Etap 22 - runtime audit admina |

## 2026-05-16 - Etap 21 real audit coverage V6

FAKT: dodano i zweryfikowano statycznie realne markery audit logu dla brakujacych mutacji admina.
TEST RECZNY DO WYKONANIA: runtime audit w /admin/audit po realnych operacjach admina.

## 2026-05-15 22:12:34 - full memory + Obsidian + repo V6

| Field | Value |
|---|---|
| Type | project memory / Obsidian / guard package |
| Why | prevent context loss across ChatGPT, Codex, AI developers and Obsidian |
| Changed | AGENTS.md, _project files, guard script, Obsidian dashboard |
| Not changed | app UI, routes, checkout, admin handlers, database schema |
| Tests | memory guard required, existing project-memory guard if present, build optional if present |
| Manual status | BRAK POTWIERDZONEGO TESTU for UI |
| Next | verify dashboard, then continue store implementation stages |

<!-- ETAP22_RUNTIME_AUDIT_ADMINA_START -->
## Etap 22 — implementation ledger

Dotknięte obszary:
- `app/admin/projekty/actions.ts`
- `app/admin/projekty/nowy/actions.ts`
- `app/admin/zamowienia/actions.ts`
- `lib/admin/audit-log.ts`
- `scripts/check-admin-audit-log-v44.cjs`
- `_project/*`
- Obsidian: `10_PROJEKTY/Sklep_projekty_domow/*`

Powód:
- Zamknąć lukę między statycznym istnieniem audit logu a realnym runtime śladem operacji admina.

Ryzyko:
- Test runtime zależy od lokalnego admina, Supabase i realnych danych testowych.
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

<!-- ETAP_A_PAYMENT_DIRECTION_FIX_START -->
## 2026-05-16 - Etap A payment direction fix

FAKT:
- Repo miało aktywny `verify:manual-payment-v48`, który utrwalał ręczny model płatności.
- Decyzja Damiana zmienia kierunek: ręczne płatności nie są docelowym modelem.

WDROŻENIE:
- aktywny guard zmieniony na `verify:payment-direction-v48`,
- publiczny checkout opisuje obecny flow jako legacy / temporary / internal only,
- roadmapa i checklist zawierają blocker automatycznych płatności.

TEST RĘCZNY:
- TEST RĘCZNY DO WYKONANIA.
<!-- ETAP_A_PAYMENT_DIRECTION_FIX_END -->

<!-- ETAP_B_PROJECT_MEMORY_STATUS_FIX_START -->
## 2026-05-16_1810 - Etap B: naprawa project memory / aktualnego statusu etapów

### Co wdrożono

- Ujednolicono aktywny stan w `_project/03_CURRENT_STAGE.md`.
- Ustawiono realny następny krok w `_project/07_NEXT_STEPS.md`.
- Dopisano skonsolidowany status testów w `_project/14_TEST_HISTORY.md`.
- Przepisano roadmapę produkcyjną w `_project/16_PRODUCTION_ROADMAP_AND_ACCEPTANCE.md`, żeby usunąć konflikt Etapu B i nie zamykać fałszywie V1.
- Dopisano blocker readiness w `_project/16_PRODUCTION_READINESS_CHECKLIST.md`.
- Dodano guard dokumentacyjny `scripts/check-project-stage-status-b.cjs` i script `verify:project-stage-status-b`.
- Przygotowano aktualizację Obsidiana: dashboard i roadmapa.

### Czego nie zmieniono

- Nie zmieniono runtime aplikacji.
- Nie wdrożono płatności automatycznych.
- Nie publikowano aplikacji klientom.

### Testy / guardy

- `npm run verify:project-stage-status-b`
- `npm run check:project-memory`
- Pełne `npm run verify` opcjonalnie flagą `-RunFullVerify`.

### Test ręczny

TEST RĘCZNY DO WYKONANIA: runtime V1 i audit runtime.

### Ryzyka

Bez tej korekty agent może uznać stary Etap 20 albo Etap 29 za aktywny/pełne zamknięcie V1.
<!-- ETAP_B_PROJECT_MEMORY_STATUS_FIX_END -->

<!-- ETAP22C_RUNTIME_ADMIN_AUDIT_LEDGER_START -->
## 2026-05-16 - Etap 22C runtime audit admina

### Co wdrożono

- SQL proof dla `public.admin_audit_log`.
- Guard `verify:admin-audit-runtime-v53`.
- Checklistę ręczną dla 10 operacji admina.
- Aktualizację statusu runtime w `_project`.
- Aktualizację Obsidiana w trybie ZIP.
- Zasadę bez bezpośredniego pushu przez ChatGPT connector.

### Czego nie wdrożono

- Nie zmieniano logiki admina.
- Nie zmieniano tabel poza idempotentnym SQL schema check/create dla `admin_audit_log`.
- Nie wykonano testu runtime za Damiana.
- Nie wykonano commit/push przez ChatGPT.

### Testy

- Automatyczne: `verify:admin-audit-runtime-v53`, `verify:admin-audit-log-v44`, `check:project-memory`.
- Ręczne: TEST RĘCZNY DO WYKONANIA.

### Następny krok

Damian wykonuje runtime test w adminie i SQL proof w Supabase.
<!-- ETAP22C_RUNTIME_ADMIN_AUDIT_LEDGER_END -->

<!-- ETAP23Z_ARCHIVE_DELETE_RUNTIME_ACCEPTANCE_2026_05_16 -->
## 2026-05-16 - Etap 23Z: archiwizacja i hard delete runtime acceptance

FAKTY:
- Etap 23 mial wiele poprawek: V4, V5, V7, V8 i V9.
- Kod archiwizacji ma guard statyczny V23 oraz rozszerzenie V23Z.
- Hard delete jest dopuszczony tylko po wpisaniu kodu projektu i ma audit dla blokady oraz sukcesu.
- Ten wpis nie zamyka testu recznego.

GUARDY:
- npm run verify:admin-archive-delete-runtime-v23z
- npm run verify:admin-archive-delete-runtime-v23
- npm run verify:admin-action-feedback-v24
- npm run verify:admin-audit-log-v44
- npm run check:project-memory
- npm run typecheck
- npm run build

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
- npm run verify:admin-archive-delete-runtime-v23z
- npm run verify:admin-archive-delete-runtime-v23
- npm run verify:admin-action-feedback-v24
- npm run verify:admin-audit-log-v44
- npm run check:project-memory
- npm run typecheck
- npm run build

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
- Automatyczny guard: npm run verify:manual-payment-v48.
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

<!-- ETAP33_ADMIN_AUDIT_RUNTIME_LEDGER_2026_05_17_START -->
## 2026-05-17 - Etap 33 runtime test admina i audit

### Co wdrożono

Pakiet runtime testu admin/audit:
- guard `verify:admin-audit-runtime-v53`,
- realny proof `audit:admin-runtime-v54`,
- SQL proof Supabase,
- checklista kliknięć,
- raport run,
- aktualizacje `_project` i Obsidiana.

### Dlaczego

Etap 33 wymaga dowodu, że wpisy audit realnie są w Supabase, nie tylko że kod zawiera `writeAdminAuditLog`.

### Testy/guardy

- `npm run verify:admin-audit-log-v44`
- `npm run verify:admin-audit-runtime-v53`
- `npm run check:project-memory`
- `npm run typecheck`
- `npm run build`

### Test ręczny

TEST RĘCZNY DO WYKONANIA.

### Ryzyka

- Brak danych testowych dla mediów/prywatnych plików da `FAIL` mimo poprawnego kodu.
- Hard delete musi być testowany tylko na projekcie testowym.

### Następny krok

Kliknąć checklistę i uruchomić `npm run audit:admin-runtime-v54` albo SQL proof.
<!-- ETAP33_ADMIN_AUDIT_RUNTIME_LEDGER_2026_05_17_END -->

<!-- ETAP33_ADMIN_AUDIT_RUNTIME_V2_LEDGER_2026_05_17_START -->
## 2026-05-17 - Etap 33 V2 SQL ledger i env fix

### Co wdrożono

- Naprawiono guard `verify:admin-audit-runtime-v53`.
- Naprawiono `audit:admin-runtime-v54`, żeby wczytywał `.env.local`.
- Dodano `_project/18_SQL_LEDGER.md`.
- Dodano Obsidian SQL ledger.
- Dodano regułę SQL do `AGENTS.md`.

### Dlaczego

V1 zatrzymał się przez kruchy marker checklisty, a runtime proof nie widział zmiennych Supabase.

### Testy/guardy

- `npm run verify:admin-audit-log-v44`
- `npm run verify:admin-audit-runtime-v53`
- `npm run check:project-memory`
- `npm run typecheck`
- `npm run build`

### Test ręczny

TEST RĘCZNY DO WYKONANIA.

### Ryzyka

- Node proof wymaga service role key. Bez niego trzeba użyć Supabase SQL Editor.
- Hard delete tylko na projekcie testowym.

### Następny krok

Kliknąć checklistę i uruchomić Node proof albo SQL proof.
<!-- ETAP33_ADMIN_AUDIT_RUNTIME_V2_LEDGER_2026_05_17_END -->

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

<!-- ETAP36_IMPLEMENTATION_LEDGER_2026_05_17_START -->
## 2026-05-17 - Etap 36 fulfillment po płatności

- Status: WDROŻONE W PACZCE / TEST RĘCZNY DO WYKONANIA.
- Cel: bezpieczny dostęp do prywatnych plików po płatności.
- Pliki zmienione/dodane:
  - lib/fulfillment/post-payment-fulfillment.ts
  - app/zamowienie/dostep/[token]/page.tsx
  - app/zamowienie/dostep/[token]/plik/[fileId]/route.ts
  - supabase/manual/2026-05-17_etap36_post_payment_fulfillment.sql
  - docs/payments/ETAP36_POST_PAYMENT_FULFILLMENT.md
  - scripts/check-stage36-post-payment-fulfillment.cjs
- Czego nie zmieniano: istniejący ręczny admin fulfillment V51 nadal nie generuje signed/public linków.
- Ryzyka: brak webhooka Stripe i brak realnego e-mail providera.
- Testy: guard/typecheck/build do uruchomienia w APPLY.
- Potwierdzenie Damiana: brak dla runtime Etapu 36.
- Następny krok: webhook -> fulfillment helper albo admin action tokenu.
<!-- ETAP36_IMPLEMENTATION_LEDGER_2026_05_17_END -->

<!-- ETAP36B_BUILD_HOTFIX_2026_05_17_START -->
## 2026-05-17 - Etap 36B build hotfix po SQL

- Status: WDROZONE LOKALNIE / DO POTWIERDZENIA BUILDEM.
- Data: 2026-05-17 12:38.
- Powod: build Next.js po Etapie 36 blokowal sie na HTML komentarzu w CSS.
- Plik naprawiony: app/globals.css.
- Zmiana: komentarz HTML ETAP34_V5_ADMIN_WIDTH_HARD_LOCK_2026_05_17_END zamieniony na poprawny komentarz CSS.
- Dodatkowo: poprawiono przypadkowy znak sterujacy w ledgerach przy sciezce app/globals.css.
- Test automatyczny: npm run verify:stage36-post-payment-fulfillment, npm run typecheck, npm run build.
- Test reczny: BRAK POTWIERDZONEGO TESTU RECZNEGO.
- Ryzyko: brak zmiany UI; hotfix dotyczy skladni CSS i dokumentacji.
- Nastepny krok: po przejsciu builda wrocic do Etapu 37, czyli Stripe webhook -> fulfillment.
<!-- ETAP36B_BUILD_HOTFIX_2026_05_17_END -->

<!-- ETAP36B_BUILD_RETEST_FALSE_PASS_CORRECTION_2026_05_17_START -->
## 2026-05-17 - Korekta błędnego wpisu build retest

- Status poprzedniego wpisu: BŁĘDNY / UNIEWAŻNIONY.
- Powód: npm run typecheck nie przeszedł, więc wcześniejszy wpis BUILD POTWIERDZONY / PASS był nieprawdziwy.
- Rzeczywisty błąd: route handler app/zamowienie/dostep/[token]/plik/[fileId]/route.ts miał opcjonalne params?:, niezgodne z typami Next route context.
- Decyzja: nie traktować wcześniejszego wpisu jako potwierdzenia builda.
- Korekta: route params naprawione w Etapie 36D, a późniejszy build został potwierdzony po pełnych testach.
<!-- ETAP36B_BUILD_RETEST_FALSE_PASS_CORRECTION_2026_05_17_END -->

<!-- ETAP36D_CSS_START_MARKER_BUILD_FIX_2026_05_17_START -->
## 2026-05-17 - Etap 36D CSS start marker build fix

- Status: WDROŻONE I POTWIERDZONE TESTAMI AUTOMATYCZNYMI.
- Przyczyna: po naprawie końcowego markera CSS został początkowy HTML marker ETAP34_V5_ADMIN_WIDTH_HARD_LOCK_2026_05_17_START w app/globals.css.
- Objaw: next build padał na Unexpected ! w wygenerowanym CSS.
- Naprawa: marker HTML zamieniony na komentarz CSS.
- Dodatkowo: naprawiono typ route handlera app/zamowienie/dostep/[token]/plik/[fileId]/route.ts, gdzie params nie mogą być opcjonalne.
- Guard: scripts/check-stage36-post-payment-fulfillment.cjs pilnuje, że route nie wróci do params?:.
<!-- ETAP36D_CSS_START_MARKER_BUILD_FIX_2026_05_17_END -->

<!-- ETAP36D_CSS_START_MARKER_BUILD_PASS_2026_05_17_START -->
## 2026-05-17 - Etap 36D CSS start marker build PASS

- Status: BUILD POTWIERDZONY.
- Testy automatyczne:
  - npm run verify:stage36-post-payment-fulfillment PASS
  - npm run typecheck PASS
  - npm run build PASS
- Test ręczny: BRAK POTWIERDZONEGO TESTU RĘCZNEGO fulfillmentu po płatności.
- Następny krok: Etap 37 Stripe webhook -> fulfillment.
<!-- ETAP36D_CSS_START_MARKER_BUILD_PASS_2026_05_17_END -->

<!-- ETAP36E_MEMORY_CLEANUP_AND_OBSIDIAN_SYNC_2026_05_17_START -->
## 2026-05-17 - Etap 36E cleanup pamięci i synchronizacja Obsidiana

- Status: WDROŻONE I POTWIERDZONE.
- Data: 2026-05-17 15:02.
- Cel: naprawić brudne wpisy po PowerShell escape w project memory i dopisać finalny stan Etapu 36 do Obsidiana.
- Fakty:
  - SQL Etapu 36 został uruchomiony w Supabase.
  - Route params dla app/zamowienie/dostep/[token]/plik/[fileId]/route.ts zostały poprawione.
  - HTML markery w app/globals.css zostały zamienione na poprawne komentarze CSS.
  - npm run verify:stage36-post-payment-fulfillment przeszedł.
  - npm run typecheck przeszedł.
  - npm run build przeszedł.
- Test ręczny: BRAK POTWIERDZONEGO TESTU RĘCZNEGO fulfillmentu po płatności.
- Obsidian: dopisany selektywnie tylko do notatki Etapu 36, bez stagingu Paperclip i bez .obsidian/graph.json.
- Następny krok: Etap 37 Stripe webhook -> ensurePostPaymentFulfillmentAccessForOrder().
<!-- ETAP36E_MEMORY_CLEANUP_AND_OBSIDIAN_SYNC_2026_05_17_END -->

<!-- ETAP26A_V2_REPAIR_LEDGER_2026_05_17_START -->
## 2026-05-17 - Etap 26A V2 repair

- Co wdrozono: repair czesciowego Etapu 26A V1, model `project_files`, guard, SQL confirmed ledger, tsconfig exclude dla backupow.
- Testy: APPLY V2 uruchamia focused guardy i typecheck.
- Test reczny: TEST RĘCZNY DO WYKONANIA.
- Delivery: ZIP, bez pushu AI.
<!-- ETAP26A_V2_REPAIR_LEDGER_2026_05_17_END -->

<!-- ETAP26A_V3_GUARD_REPAIR_AND_ETAP37_NOTE_2026_05_17_START -->
## Etap 26A V3 - repair guarda po falszywym alarmie public media

Status: REPAIR / DO URUCHOMIENIA LOKALNIE.
Data: 2026-05-17.

V2 naprawil wiekszosc Etapu 26A, ale guard `verify:project-files-model-v26a` byl zbyt szeroki: skanowal `app/admin/projekty/actions.ts` pod `getPublicUrl`, chociaz `getPublicUrl` nalezy do uploadu publicznych mediow, nie prywatnych plikow `project_files`.

V3 zaweza zakaz public URL do prywatnego modelu project files, readiness, fulfillment i dokumentacji. Publiczne media moga nadal uzywac `getPublicUrl`.

Testy: `verify:project-files-model-v26a`, `verify:private-files-fulfillment-v51`, `verify:project-publication-readiness-v35`, `typecheck`, `build`.


## Etap 37 - dynamiczne kategorie projektow

Status: DO WDROZENIA PO DOMKNIECIU 26A.
Data: 2026-05-17.

Damian zglosil, ze homepage pokazuje statyczne `Kategorie projektow`, widoczny jest blad `\2014`, a kategorie powinny byc dynamiczne: wybierane w adminie, mozliwe do dodania jako wlasne, klikalne i widoczne tylko wtedy, gdy maja aktywne projekty.

Nastepny etap do zapisania/wdrozenia:
- model kategorii w bazie,
- select kategorii przy dodawaniu/edycji projektu,
- mozliwosc dodania kategorii wlasnej,
- homepage pokazuje tylko kategorie z realnymi aktywnymi projektami,
- kafelki prowadza do katalogu z filtrem,
- usuniecie `\2014` przed naglowkiem.

Status testu: TEST RECZNY DO WYKONANIA.
<!-- ETAP26A_V3_GUARD_REPAIR_AND_ETAP37_NOTE_2026_05_17_END -->

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

<!-- ETAP26A_V8_ACTIONS_FILEDEFAULTS_LEDGER_2026_05_17_START -->
## Etap 26A V8 - actions fileDefaults mass check

Data: 2026-05-17.

Co naprawiono:
- `fileDefaults` w `app/admin/projekty/actions.ts` definiowane przed insert do `project_files`.
- Import modelu plików projektu sprawdzony i poprawiany.
- Naprawa `getProjectPublicationErrorMessage()` po rozbitym stringu.
- Dodany preflight typowych błędów paczek.

Ryzyko:
- Etap nadal wymaga przejścia typecheck/build lokalnie i review diff przed push.

Status testu ręcznego:
- BRAK POTWIERDZONEGO TESTU RĘCZNEGO.
<!-- ETAP26A_V8_ACTIONS_FILEDEFAULTS_LEDGER_2026_05_17_END -->

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
## 2026-05-17 - Etap 26D / 39A no-reply email i platnosci online

Typ: DECYZJA / PLAN WDROZENIA.
Kod: BEZ ZMIAN W TEJ PACZCE.
Status: DO WDROZENIA.

Decyzja: po platnosci dwa maile no-reply: potwierdzenie platnosci i dostep do plikow. Realne platnosci online maja priorytet. PDF na e-mail tylko przy dodatku, bez dodatku tylko bazowe aktywne pliki projektu.

Nastepny kodowy etap: 39A real payments albo 26D email outbox fake-provider, zależnie od decyzji Damiana.
<!-- ETAP26D_NOREPLY_EMAIL_PAYMENTS_DECISION_2026_05_17_END -->


