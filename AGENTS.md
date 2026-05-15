# AGENTS.md - Sklep z projektami domów

## Typ projektu

Projekt kodowy / aplikacja sklepowa.

Źródłem prawdy dla pracy nad aplikacją jest repo projektu:

- `AGENTS.md`,
- cały folder `_project/`,
- aktualny kod aplikacji,
- aktualne testy i guardy.

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
8. istotne notatki w `_project/history/`.

Nie zaczynaj pracy bez zrozumienia celu projektu, aktualnego etapu, decyzji, ograniczeń, testów i następnego kroku.

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
- robić szerokiego refaktoru przy małej poprawce.

## Fakty, decyzje, hipotezy

W dokumentacji rozdzielaj zawsze:

- **FAKT** - wynika z kodu, plików, testów albo potwierdzenia użytkownika,
- **DECYZJA** - ustalone przez Damiana albo zapisane jako obowiązujące,
- **HIPOTEZA / PROPOZYCJA** - sensowny kierunek, ale jeszcze niezatwierdzony,
- **DO SPRAWDZENIA** - rzecz niepewna albo wymagająca testu.

Nie wolno wpisywać hipotez do listy aktywnych decyzji.

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
