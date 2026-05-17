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

