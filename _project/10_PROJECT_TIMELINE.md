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

