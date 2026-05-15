# 05_MANUAL_TESTS - Testy ręczne Damiana


## Test reczny po Etapie 17

Status: do wykonania po wdrożeniu paczki, przejściu checków i zastosowaniu migracji `0018_order_manual_payment_instruction.sql`.

### Co sprawdzić

1. Wejdź do `/zamowienie`.
2. Sprawdź, czy checkout jasno komunikuje:
   - płatność po kontakcie,
   - brak automatycznej płatności online,
   - dane do przelewu zostaną wysłane po weryfikacji.

3. Wejdź do `/admin/zamowienia/[id]`.
4. W sekcji realizacji wpisz instrukcję przelewu.
5. Kliknij `Zapisz realizację`.
6. Odśwież stronę.
7. Oczekiwany wynik:
   - instrukcja przelewu zostaje po odświeżeniu,
   - roboczy e-mail `E-mail: potwierdzenie zamówienia` zawiera dane do płatności,
   - status `Opłacone ręcznie` nadal jest dostępny.
8. Nie testujemy Stripe, PayU ani automatycznego księgowania.

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
