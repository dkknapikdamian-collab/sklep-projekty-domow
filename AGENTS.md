# AGENTS.md - Sklep z projektami domów

## Typ projektu

Projekt kodowy / aplikacja sklepowa.

Źródłem prawdy dla pracy nad aplikacją jest repo projektu:

- `AGENTS.md`,
- cały folder `_project/`,
- aktualny kod aplikacji,
- aktualne testy i guardy,
- raporty AI w `_project/runs/`.

Obsidian jest dashboardem i operacyjnym indeksem projektu, ale dla kodu źródłem prawdy pozostaje repo aplikacji.

## Obowiązkowy start każdej pracy

Przed zmianą kodu albo dokumentacji przeczytaj:

1. `AGENTS.md`,
2. cały folder `_project/`,
3. `README.md`, jeśli istnieje,
4. `package.json`, jeśli istnieje,
5. `scripts/`, jeśli dotyczy zadania,
6. `tests/`, jeśli dotyczy zadania,
7. ostatnie raporty w `_project/runs/`,
8. istotne notatki w `_project/history/`,
9. aktualne pliki Obsidiana w `10_PROJEKTY/Sklep_projekty_domow/`, jeśli praca dotyczy decyzji, etapu, testów, guardów albo dziennika.

Nie zaczynaj pracy bez zrozumienia celu projektu, aktualnego etapu, decyzji, ograniczeń, testów i następnego kroku.

## Tryb scan-first

Najpierw skanuj źródła, potem opisuj projekt lub zmieniaj pliki.

Nie traktuj promptu, rozmowy ani własnej propozycji jako faktu produktowego. Prompt może określać sposób pracy, ścieżki i wymagany format, ale stan produktu, roadmapę, zakres i wdrożenia trzeba odtworzyć z repo, kodu, testów, raportów i Obsidiana.

Jeśli czegoś nie da się potwierdzić w źródłach, wpisz `DO POTWIERDZENIA`.

## Cel projektu

Budujemy sklep / stronę do sprzedaży projektów domów.

Kierunek nie jest „ładna statyczna strona HTML”. Kierunek to aplikacja sklepowa z katalogiem, kartą projektu, koszykiem, checkoutem, zamówieniami, panelem admina, bazą danych i storage plików.

## Zakazy bez wyraźnego zakresu

Nie wolno bez decyzji Damiana:

- zmieniać UI tylko dlatego, że „można lepiej”,
- zmieniać routingu,
- przepisywać architektury,
- usuwać działających funkcji,
- zmieniać modelu danych projektu,
- mieszać fikcyjnych projektów z realnymi ofertami,
- publikować przykładowych projektów jako realnych,
- dopisywać hipotez AI jako aktywnych decyzji,
- robić szerokiego refaktoru przy małej poprawce,
- tworzyć nowej gałęzi bez zgody.

## FAKT / DECYZJA / HIPOTEZA / DO POTWIERDZENIA

Marker zgodnoĹ›ci guardu: Fakt / Decyzja / Hipoteza / Do potwierdzenia.

W dokumentacji rozdzielaj zawsze:

- **FAKT** - wynika z kodu, plików, testów, raportu albo potwierdzenia użytkownika,
- **DECYZJA** - ustalone przez Damiana albo zapisane jako obowiązujące,
- **HIPOTEZA / PROPOZYCJA** - sensowny kierunek, ale jeszcze niezatwierdzony,
- **DO POTWIERDZENIA** - rzecz niepewna albo wymagająca testu.

Nie wolno wpisywać hipotez do listy aktywnych decyzji.

## Czysty dziennik projektu

Projekt ma mieć aktualny dziennik w repo i Obsidianie.

W repo utrzymuj:

- `_project/00_PROJECT_STATUS.md`,
- `_project/01_PROJECT_GOAL.md`,
- `_project/02_WORK_RULES.md`,
- `_project/03_CURRENT_STAGE.md`,
- `_project/04_DECISIONS.md`,
- `_project/05_MANUAL_TESTS.md`,
- `_project/06_GUARDS_AND_TESTS.md`,
- `_project/07_NEXT_STEPS.md`,
- `_project/08_CHANGELOG_AI.md`,
- `_project/09_CONTEXT_FOR_OBSIDIAN.md`,
- `_project/10_PROJECT_TIMELINE.md`,
- `_project/11_USER_CONFIRMED_TESTS.md`,
- raporty w `_project/runs/`.

W Obsidianie aktywna sekcja projektu to:

`10_PROJEKTY/Sklep_projekty_domow/`

Aktywne pliki Obsidiana mają mieć w nazwie `Sklep projekty domow`. Nie zostawiaj tam generycznych `INDEX.md`, `STATUS.md`, `CONTEXT.md` ani kilku wersji tej samej informacji.

## ZIP i Obsidian

Jeśli generujesz ZIP/paczkę zmian dla Damiana, paczka musi zawierać również aktualizację plików Obsidiana, jeżeli zmiana dotyczy:

- kierunku projektu,
- decyzji,
- etapu,
- testów,
- guardów,
- potwierdzeń Damiana,
- następnego kroku,
- ważnego problemu lub ryzyka.

Nie oddawaj samego kodu, jeśli zmiana wpływa na pamięć projektu.

## Aktualizacja pamięci po pracy

Po każdym znaczącym etapie aktualizuj:

- `_project/03_CURRENT_STAGE.md`,
- `_project/07_NEXT_STEPS.md`,
- `_project/08_CHANGELOG_AI.md`,
- nowy raport w `_project/runs/`.

Jeśli zmienia się kierunek, zakres albo decyzja, aktualizuj też:

- `_project/04_DECISIONS.md`,
- `_project/10_PROJECT_TIMELINE.md`,
- odpowiednie pliki w Obsidianie.

Jeśli Damian potwierdził coś ręcznie, aktualizuj:

- `_project/11_USER_CONFIRMED_TESTS.md`,
- `10_PROJEKTY/Sklep_projekty_domow/07_POTWIERDZENIA DAMIANA - Sklep projekty domow.md`.

## Guard pamięci

Po zmianach w pamięci projektu uruchom:

```bash
node scripts/check-project-memory.cjs
npm run check:project-memory
```

Przy zmianach w kodzie uruchom też dostępne checki projektu, minimum:

```bash
npm run typecheck
npm run build
```

Jeśli komenda nie istnieje albo nie może zostać uruchomiona, zapisz to w raporcie. Nie udawaj wyniku.

## GitHub

Pracuj na branchu `main`, chyba że Damian jawnie zdecyduje inaczej.

Każda realna zmiana ma zostać zapisana w GitHubie. Jeśli działasz przez GitHub API, podaj pliki i wynik zapisu. Jeśli push albo zapis się nie uda, pokaż błąd i nie udawaj sukcesu.

## Tryb ZIP dla ChatGPT / operatora paczek

ChatGPT / operator paczek nie pushuje sam, jeĹ›li Damian wymaga trybu ZIP.

DomyĹ›lny format przekazania zmian w rozmowie:

- ZIP do pobrania,
- jedno kompletne polecenie PowerShell,
- polecenie ma wykonaÄ‡ wdroĹĽenie, checki, commit i push,
- bez dzielenia na kilka osobnych komend, chyba ĹĽe Damian wyraĹşnie poprosi inaczej.

AI developer pracujÄ…cy bezpoĹ›rednio w repo moĹĽe pushowaÄ‡ tylko wtedy, gdy Damian zleci mu to jawnie. W trybie ZIP pliki Obsidiana i `_project/` muszÄ… wejĹ›Ä‡ do paczki razem z kodem, jeĹ›li zmiana dotyczy pamiÄ™ci projektu.

