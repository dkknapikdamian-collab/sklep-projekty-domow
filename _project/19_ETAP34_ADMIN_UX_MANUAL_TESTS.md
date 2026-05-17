# Etap 34 - admin UX stability i testy do wykonania

Status: TEST RĘCZNY DO WYKONANIA / WSTĘPNIE DZIAŁA, DO POTWIERDZENIA.

## Dlaczego

Damian zgłosił, że po akcji w edycji projektu cała strona miga, wraca na górę i trzeba ponownie zjeżdżać w dół. Drugi problem: panel admina jest zbyt wąski na dużym ekranie.

## Testy ręczne do wykonania później

1. Scroll po akcji media:
   - wejść w `Admin -> Projekty -> Edytuj projekt testowy`,
   - zjechać do `Media publiczne`,
   - zmienić typ medium albo usunąć testowe medium,
   - potwierdzić, że po odświeżeniu admin wraca w okolice tej samej sekcji.

2. Scroll po akcji pliki prywatne:
   - zjechać do `Pliki prywatne`,
   - usunąć testowy plik prywatny,
   - potwierdzić, że strona nie wraca na górę.

3. Zamówienia:
   - wejść w `Admin -> Zamówienia`,
   - zmienić status zamówienia testowego,
   - potwierdzić wpis audit i brak uciążliwego skoku UX.

4. Checklisty:
   - na szczególe zamówienia zmienić checklistę realizacji,
   - potwierdzić wpis audit i brak uciążliwego skoku UX.

5. Szerokość panelu:
   - sprawdzić około 1366px, 1920px i szeroki monitor,
   - panel ma używać większej szerokości ekranu,
   - panel nie ma rozciągać treści w nieskończoność,
   - formularze mają pozostać czytelne.

6. Projekt testowy:
   - uruchomić SQL `supabase/manual/2026-05-17_etap34_seed_admin_test_project.sql`,
   - potwierdzić, że projekt `DP-TEST-034` jest w adminie,
   - potwierdzić, że ma status `draft`,
   - potwierdzić, że ma ładne zdjęcia testowe i nie jest realną ofertą publiczną.

## Guardy

- `npm run verify:admin-ux-stability-v34`

## Status ręczny

BRAK POTWIERDZONEGO TESTU RĘCZNEGO.

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

