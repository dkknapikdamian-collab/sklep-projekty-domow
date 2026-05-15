# 00_PROJECT_STATUS - Sklep z projektami domów

## Status na 2026-05-15

Projekt jest w fazie budowy aplikacji sklepowej dla projektów domów. Nie jest to już luźna makieta ani czysty HTML. Kierunek operacyjny to Next.js / React, panel admina, katalog publiczny, karta projektu, koszyk, checkout oraz zamówienia.

Ten plik opisuje stan projektu jako pamięć operacyjną. Nie zastępuje testu kodu. Aktualny kod zawsze trzeba sprawdzić w repo.

## Co już istnieje według dotychczasowych prac i logów

FAKTY / mocne przesłanki z dotychczasowej pracy:

- repo aplikacji działa jako aplikacja Next.js / React,
- istnieją publiczne trasy sklepu, m.in. strona główna, katalog/projekty, koszyk i checkout/zamówienie,
- istnieje panel admina z logowaniem/setupem,
- istnieją trasy admina dla projektów: lista, nowy projekt, edycja projektu, podgląd,
- rozpoczęto/wykonano prace nad panelem admina: dodawanie projektu, edycja, zapis, anulowanie, status, usuwanie,
- rozpoczęto/wykonano prace nad checkoutem V1,
- dodano wymóg dodatku zakupowego `Projekt w formacie PDF na e-mail` za +250 zł,
- projekt ma system pamięci `_project/` i powinien mieć guard pamięci projektu.

## Co działa, ale wymaga regularnej kontroli

- Build aplikacji był uruchamiany w poprzednich etapach i pokazywał listę tras Next.js.
- Panel admina był ręcznie sprawdzany przez Damiana, ale wskazywał problemy z przyciskami. Dlatego każde kolejne wdrożenie admina musi mieć test ręczny i guard/regresję.
- Koszyk/checkout są kierunkiem V1, ale pełny przepływ zakupu musi być testowany od dodania projektu do zamówienia.

## Co jest częściowe albo wymaga potwierdzenia

- Pełna zgodność panelu admina: `Edytuj`, `Zapisz`, `Anuluj`, zmiana statusu z listy, usuwanie.
- Pełne spięcie dodatku PDF e-mail +250 zł przez koszyk, checkout, zamówienie, płatność i e-maile.
- Finalny model storage plików prywatnych po płatności.
- Finalna płatność produkcyjna.
- Automatyczna wysyłka linków do pobrania po płatności.
- Pełna obsługa folderów mediów po kodzie projektu.

## Co nie działa / znane ryzyka

- Ryzyko powrotu ubogiej dokumentacji pamięci projektu, jeśli AI wygeneruje tylko ogólne pliki.
- Ryzyko martwych przycisków w panelu admina po kolejnych zmianach.
- Ryzyko mieszania danych demo/fikcyjnych z realnymi projektami.
- Ryzyko rozjazdu między repo aplikacji a Obsidianem.
- Ryzyko dopisywania propozycji AI jako faktów produktowych.

## Ostatni etap

Etap bieżący: **uzupełnienie pełnego mózgu projektu**.

Cel etapu: repo aplikacji i Obsidian mają zawierać pełny, użyteczny opis projektu: kierunek, zakres, decyzje, testy, guardy, potwierdzenia, braki i następny krok.

## Ostatni potwierdzony test Damiana

Nie ma pełnego potwierdzenia „cały sklep działa produkcyjnie”.

Znane potwierdzenia częściowe:

- Damian potwierdził, że aplikacja po wcześniejszym wdrożeniu działa w sensie bazowym, ale wskazał, że przycisk `Edytuj` nie działał.
- Damian wskazał, że `Zapisz dane` i `Anuluj` także wymagały sprawdzenia/podpięcia.
- Damian wskazał problem UI z za dużą czcionką / potrzebą jednej czytelnej linijki w widoku tabeli/listy.

Wszystkie te potwierdzenia są częściowe i nie zastępują pełnego testu panelu admina, koszyka i checkoutu.
