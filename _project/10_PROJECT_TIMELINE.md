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
