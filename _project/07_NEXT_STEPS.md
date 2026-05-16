# 07_NEXT_STEPS - nastepne kroki

## Najblizszy rekomendowany krok

Etap 22: runtime audit admina i zamkniecie audit logu.

Wykonac realne operacje admina, wejsc w `/admin/audit` i potwierdzic, ze wpis pojawia sie z poprawna akcja, typem encji, ID encji i metadata.

## Aktywna roadmapa produkcyjna

Czytac i aktualizowac:

- `_project/16_PRODUCTION_ROADMAP_AND_ACCEPTANCE.md`,
- `10_PROJEKTY/Sklep_projekty_domow/11_ROADMAPA PRODUKCYJNA I ODHACZANIE - Sklep projekty domow.md`.

## Kolejnosc etapow

1. Etap 22 - runtime audit admina.
2. Etap 23 - spojnosc komunikacji platnosci recznej.
3. Etap 24 - pelny runtime flow V1.
4. Etap 25 - walidacja zamowienia i cen wzgledem bazy.
5. Etap 26 - obsluga plikow zakupowych w adminie.
6. Etap 27 - sanity check publikacji projektu.
7. Etap 28 - blokada sample/demo jako realnych ofert.
8. Etap 29 - pre-release checklist V1.

## Zasady dalszej pracy

- Lista zamowien ma pomagac w priorytetyzacji, ale nie ma udawac pelnego CRM.
- Audit log jest widokiem tylko do odczytu.
- Nie zmieniac mechanizmu auth bez osobnego etapu.
- Nie dodawac automatycznych platnosci ani automatycznej wysylki bez osobnej decyzji.
- Kazda operacja ryzykowna w adminie powinna miec slad w audit logu.
- Kazdy etap musi miec status: kod, guardy, test reczny, Obsidian, `_project`, ryzyka i nastepny krok.
- Nie oznaczac etapu jako zamknietego bez potwierdzenia guardow i statusu testu recznego.

## Co odhaczac po kazdym etapie

- Co wdrozono w kodzie.
- Jakie guardy przeszly.
- Jakie testy sa do wykonania recznie.
- Co Damian potwierdzil recznie.
- Co nie zostalo potwierdzone.
- Co zaktualizowano w Obsidianie.
- Co zaktualizowano w `_project/`.
- Jaki jest jeden nastepny krok.

## Blokady obecne

- Brak potwierdzonego runtime `/admin/audit` po wszystkich waznych operacjach admina.
- Brak pelnego testu recznego calej sciezki V1.
- Brak potwierdzenia, ze komunikacja publiczna nie miesza platnosci recznej z platnosciami online.

<!-- ETAP22_29_PRODUCTION_ROADMAP_ACCEPTANCE_2026_05_16 -->

Dodano aktywna roadmapa produkcyjna i ledger odhaczania. Nastepny krok to Etap 22.

<!-- ETAP22_RUNTIME_AUDIT_ADMINA_START -->
## Następny krok po Etapie 22

Najkrótszy sensowny krok:
- Damian wykonuje runtime test z listy w `_project/05_MANUAL_TESTS.md`.
- Po potwierdzeniu wpisać status: TEST RĘCZNY POTWIERDZONY PRZEZ DAMIANA.
- Dopiero potem uznać Etap 21/22 za zamknięty operacyjnie.

Nie zaczynać nowych dużych funkcji admina przed potwierdzeniem, że audit realnie zapisuje ślady operacji.
<!-- ETAP22_RUNTIME_AUDIT_ADMINA_END -->
