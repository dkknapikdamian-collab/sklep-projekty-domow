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

