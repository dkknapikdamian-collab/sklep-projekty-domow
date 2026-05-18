<!-- ETAP34C_MANUAL_CONFIRMATION_FULL_FLOW_2026_05_17_START -->
## 2026-05-17 - Etap 34C: pełny flow sklepu bez płatności publicznej

Status: TEST RĘCZNY POTWIERDZONY PRZEZ DAMIANA.

Damian potwierdził ręcznie:

- admin dodaje kompletny realny projekt - działa,
- projekt active pojawia się w katalogu - działa,
- karta projektu działa - działa,
- koszyk działa - działa,
- zamówienie techniczne powstaje - działa,
- admin widzi zamówienie - działa,
- walidacja cen działa - działa,
- audit działa - działa.

Interpretacja: techniczny flow sklepu bez płatności publicznej jest runtime-potwierdzony. To nie oznacza publicznej gotowości sklepu ani wdrożonych płatności online.
<!-- ETAP34C_MANUAL_CONFIRMATION_FULL_FLOW_2026_05_17_END -->

# 11_USER_CONFIRMED_TESTS - Potwierdzenia Damiana

## Zasada

Ten plik zapisuje tylko rzeczy, które Damian ręcznie potwierdził albo ręcznie zgłosił jako problem.

Nie wpisywać tu „AI uważa, że działa”.

## 2026-05-13 - Aplikacja działa częściowo, ale admin miał martwe przyciski

- Co Damian sprawdził: po wdrożeniu aplikacja uruchamiała się / działała w bazowym sensie.
- Gdzie: projekt sklepu z projektami domów, panel admina.
- Wynik: częściowo pozytywny, ale Damian zgłosił, że `Edytuj` nie działa.
- Dalsze zgłoszenia: `Zapisz dane` i `Anuluj` też wymagały sprawdzenia/podpięcia.
- Czy jest guard: do sprawdzenia w aktualnym repo.
- Jeśli brak guardu: `brak guardu - tylko test ręczny`.

## 2026-05-14 - Problem czytelności tabeli/listy

- Co Damian sprawdził: widok tabeli/listy w sklepie/adminie na screenie.
- Gdzie: UI sklepu/projektów.
- Wynik: czcionka była za duża, układ rozjechany; preferencja: dosłownie jedna czytelna linijka.
- Czy jest guard: raczej brak pełnego guardu wizualnego.
- Jeśli brak guardu: `brak guardu - tylko test ręczny`.

## 2026-05-15 - Wymóg pełnego mózgu projektu

- Co Damian sprawdził: wcześniejsze pliki pamięci były zbyt ubogie i nie opisywały pełnego kierunku projektu.
- Gdzie: repo projektu i Obsidian.
- Wynik: wymagane uzupełnienie pełnej pamięci, nie generycznego template.
- Czy jest guard: dodany `scripts/check-project-memory.cjs`.

## Brak pełnych potwierdzeń

Nie ma jeszcze w tym pliku pełnego potwierdzenia Damiana dla:

- całego admina po ostatnich poprawkach,
- pełnego checkoutu,
- dodatku PDF e-mail +250 zł przez wszystkie warstwy,
- produkcyjnych płatności,
- prywatnych linków do pobrania,
- pełnej automatycznej dostawy dokumentacji.

<!-- SKLEP_FULL_MEMORY_OBSIDIAN_REPO_V6_2026_05_15 START -->

## 2026-05-15 22:12:34

No manual UI test confirmed in this run. Status remains: BRAK POTWIERDZONEGO TESTU for app UI.

<!-- SKLEP_FULL_MEMORY_OBSIDIAN_REPO_V6_2026_05_15 END -->

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

<!-- ETAP41A_RUNTIME_CONFIRMED_START -->
## Etap 41A / 26D - email outbox fake-provider runtime confirmed

Status: TEST RĘCZNY POTWIERDZONY PRZEZ DAMIANA.
Data: 2026-05-18.

### Potwierdzenie Damiana

Damian potwierdził, że nowe zamówienie po uzupełnieniu brakujących plików projektu działa poprawnie.

Potwierdzone:
- nowa płatność Stripe sandbox przechodzi,
- `email_outbox` działa po webhook-confirmed `paid`,
- `payment_confirmation` jest poprawnie zakolejkowane,
- `project_files_access` jest poprawnie zakolejkowane dla nowego zamówienia po uzupełnieniu wymaganych plików,
- komplet plików testowego projektu `DP-TEST-034` obejmuje:
  - `documentation`,
  - `floor_plans`,
  - `full_package`,
  - `pdf_email_package` dla wariantu z dodatkiem PDF na e-mail.

### Wniosek

Etap 41A jest runtime-potwierdzony jako fake-provider email outbox.

To nadal nie jest realna wysyłka e-mail. Provider `fake_noop` tylko kolejkuje/zapisuje maile transakcyjne.

### Następny etap

Etap 41B - fulfillment readiness / retry / admin visibility.

Cel:
- admin widzi blokady typu `missing_required_private_files`,
- admin widzi brakujące typy plików,
- admin widzi status `manual_review_required`,
- po uzupełnieniu plików można ponowić przygotowanie dostępu bez robienia nowego zamówienia,
- daty w adminie mają być wyświetlane w Europe/Warsaw, baza zostaje w UTC.
<!-- ETAP41A_RUNTIME_CONFIRMED_END -->
