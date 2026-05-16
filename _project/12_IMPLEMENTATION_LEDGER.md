# 12_IMPLEMENTATION_LEDGER - Sklep projekty domow

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
