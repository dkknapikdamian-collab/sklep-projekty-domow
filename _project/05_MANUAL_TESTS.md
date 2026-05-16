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

TEST RÄCZNY DO WYKONANIA:
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
