# Raport AI: Sklep projekty domow - pełny mózg projektu

## Data

2026-05-15 19:00 Europe/Warsaw

## Cel pracy

Uzupełnić pełną pamięć projektu „Sklep z projektami domów” w repo aplikacji i w Obsidianie. To nie jest etap funkcjonalny. Nie zmienia UI, routingu ani logiki produktu.

## Źródła przeczytane

- Paczka `obsidian_sklep_projekty_domow_pelny_mozg_v2.zip`.
- Plik `01_WKLEJ_DO_AI_DEVELOPERA__SKLEP_PELNY_MOZG_PROJEKTU.md`.
- Szablony i zasady z paczki v2.
- Dotychczasowy kontekst rozmów/projektu dostępny w tej sesji.

## Źródła niedostępne / brakujące

W środowisku generowania paczki nie było bezpośredniego dostępu do lokalnego repo:

`C:\Users\malim\Desktop\biznesy_ai\strony\strona z projektami`

Nie było też bezpośredniego dostępu do lokalnego vaulta:

`C:\Users\malim\Desktop\biznesy_ai\00_OBSIDIAN_VAULT`

Dlatego paczka zawiera skrypt wdrożeniowy, który aktualizuje te lokalizacje po stronie Damiana, uruchamia testy i wykonuje commit/push.

## Fakty ustalone

- Projekt dotyczy sklepu/strony do sprzedaży projektów domów.
- Kierunek to aplikacja sklepowa, nie produkcyjny czysty HTML.
- Preferowany kierunek techniczny to React/Next.js + baza danych + storage + panel admina.
- V1 obejmuje katalog, kartę projektu, koszyk, checkout/zamówienie i panel admina.
- Karta projektu jest najważniejszym ekranem sprzedażowym.
- Katalog nie może pokazywać fikcyjnych projektów jako realnych ofert.
- Dodatek `Projekt w formacie PDF na e-mail` kosztuje +250 zł.
- Wymagany jest pełny system pamięci w repo i Obsidianie.

## Aktywne decyzje

- Sklep ma być aplikacją, nie samym HTML.
- Oglądanie projektów bez logowania.
- Zakup jako gość.
- Logowanie głównie dla admina.
- Każdy projekt ma mieć stały kod.
- Dane projektów mają być zarządzane przez panel admina / jedno źródło prawdy.
- Publiczne media są poglądowe, prywatne pliki zakupowe po płatności/realizacji.
- Wygenerowane wizualizacje są referencją, nie treścią produkcyjną.
- ZIP zmian ma zawierać także pliki Obsidiana, gdy zmiana dotyczy pamięci projektu.

## Hipotezy / propozycje, nie decyzje

- Po pamięci projektu najrozsądniej wdrożyć stabilizację pełnej ścieżki V1: aktywny projekt -> katalog -> karta -> koszyk -> checkout -> zamówienie -> admin.
- Można rozważyć V1 z formularzem/zamówieniem i ręczną obsługą płatności, jeśli płatności online spowalniają start.

## Co już zostało wdrożone

Na podstawie dotychczasowych logów i rozmów: istnieją trasy publiczne i adminowe, panel admina, koszyk/checkout w fazie V1 oraz prace nad przyciskami admina. Ten raport nie potwierdza ich działania bez lokalnego testu.

## Co zostało zmienione

Paczka tworzy/aktualizuje pełną pamięć projektu w repo i Obsidianie oraz dodaje guard pamięci projektu.

## Co zostało porzucone

- Czysty HTML jako produkcyjny sklep.
- Fikcyjne projekty jako realne oferty.
- Konto klienta jako wymóg V1.

## Testy / guardy znalezione

W paczce dodano guard:

```bash
node scripts/check-project-memory.cjs
npm run check:project-memory
```

Dodatkowo skrypt wdrożeniowy uruchamia dostępne:

```bash
npm run typecheck
npm run build
```

## Potwierdzenia Damiana znalezione

- Damian zgłaszał, że aplikacja działa częściowo, ale `Edytuj` nie działało.
- Damian wskazywał problemy z `Zapisz dane` i `Anuluj`.
- Damian wskazał problem czytelności UI: zbyt duża czcionka / potrzeba jednej czytelnej linijki.
- Damian wymaga pełnego mózgu projektu, nie ubogich ogólników.

## Pliki utworzone w repo

- `AGENTS.md`
- `_project/00_PROJECT_STATUS.md`
- `_project/01_PROJECT_GOAL.md`
- `_project/02_WORK_RULES.md`
- `_project/03_CURRENT_STAGE.md`
- `_project/04_DECISIONS.md`
- `_project/05_MANUAL_TESTS.md`
- `_project/06_GUARDS_AND_TESTS.md`
- `_project/07_NEXT_STEPS.md`
- `_project/08_CHANGELOG_AI.md`
- `_project/09_CONTEXT_FOR_OBSIDIAN.md`
- `_project/10_PROJECT_TIMELINE.md`
- `_project/11_USER_CONFIRMED_TESTS.md`
- `_project/runs/2026-05-15_1900_sklep-pelny-mozg-projektu.md`
- `_project/runs/.gitkeep`
- `_project/history/.gitkeep`
- `scripts/check-project-memory.cjs`

## Pliki zaktualizowane w repo

- `package.json` przez skrypt: dodanie `check:project-memory`, jeśli brak.

## Pliki utworzone w Obsidianie

- `00_START - Sklep projekty domow.md`
- `01_KIERUNEK I ZAKRES - Sklep projekty domow.md`
- `02_STAN OBECNY - Sklep projekty domow.md`
- `03_DECYZJE - Sklep projekty domow.md`
- `04_ETAPY I WDROZENIA - Sklep projekty domow.md`
- `05_TESTY RECZNE - Sklep projekty domow.md`
- `06_GUARDY I TESTY AUTOMATYCZNE - Sklep projekty domow.md`
- `07_POTWIERDZENIA DAMIANA - Sklep projekty domow.md`
- `08_HISTORIA I ZMIANY KIERUNKU - Sklep projekty domow.md`
- `09_NASTEPNY KROK - Sklep projekty domow.md`
- `10_ZASADY PROJEKTU - Sklep projekty domow.md`
- `_RAPORTY_AI/2026-05-15_1900_sklep-pelny-mozg-projektu.md`

## Co było ubogie i zostało uzupełnione

- Pamięć projektu nie może być tylko listą pustych plików.
- Uzupełniono zakres V1/V2, decyzje, hipotezy, testy, guardy, potwierdzenia, timeline i następny krok.
- Pliki Obsidiana mają nazwę projektu w nazwie pliku, żeby nie mieszały się z innymi projektami.

## Czego nie da się potwierdzić

Bez lokalnego uruchomienia repo nie da się potwierdzić:

- aktualnego wyniku `npm run build`,
- aktualnego wyniku `npm run typecheck`,
- działania wszystkich przycisków admina,
- pełnego checkoutu,
- pełnej obsługi dodatku PDF +250 zł,
- stanu push do GitHub.

## Wyniki testów

Do uzupełnienia automatycznie po uruchomieniu paczki na maszynie Damiana.

## Commit / push

Do wykonania przez skrypt wdrożeniowy na lokalnych repozytoriach Damiana.

## Następny krok

Po zakończeniu tego etapu: stabilizacja ścieżki V1 `aktywny projekt -> katalog -> karta -> koszyk -> checkout -> zamówienie -> admin`.
