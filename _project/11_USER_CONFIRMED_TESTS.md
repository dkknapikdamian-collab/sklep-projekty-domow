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

