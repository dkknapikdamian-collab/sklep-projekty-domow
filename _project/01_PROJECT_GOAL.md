# 01_PROJECT_GOAL — cel projektu

## Główny cel

Zbudować sklep/katalog projektów domów, w którym publiczny użytkownik może przeglądać realne projekty, wejść w kartę projektu, dodać produkt do koszyka i przejść przez ścieżkę zamówienia.

## Dla kogo jest projekt

- Dla osób szukających gotowego projektu domu.
- Dla właściciela/admina, który dodaje i zarządza realnymi projektami oraz mediami.

## Jaki problem rozwiązuje

Projekt ma uporządkować sprzedaż projektów domów w formie czytelnego, nowoczesnego sklepu/katalogu, bez ręcznego publikowania fikcyjnych danych w kodzie.

## Warunki sukcesu

- Publiczny katalog pokazuje tylko realne aktywne projekty.
- Karta projektu ma dane z jednego źródła prawdy.
- Projekt ma stały kod, np. `DP-AUR-014`, używany konsekwentnie w danych, mediach, koszyku, zamówieniu i panelu admina.
- Panel admina pozwala zarządzać projektami bez wpisywania danych na sztywno w kodzie.
- Koszyk i checkout są gotowe do dalszego rozwoju zamówień.
- Guardy pilnują krytycznych założeń.

## Poza zakresem na teraz

- Publikowanie fikcyjnych aktywnych projektów.
- Udawanie gotowej automatyzacji zamówień, jeśli nie została wdrożona.
- Duży refaktor architektury bez osobnej decyzji.
- Zmiana stylu wizualnego bez osobnego etapu.

## Wymaga doprecyzowania

- Finalny model płatności.
- Finalny model dostarczenia plików po zakupie.
- Pełna ścieżka e-maili i realizacji zamówienia.
- Docelowa struktura wariantów i dodatków.

<!-- SKLEP_PROJEKTY_DOMOW_MEMORY_V1_START -->
# Cel projektu - Sklep z projektami domów

## Główna teza

Budujemy sklep / stronę do sprzedaży projektów domów i projektów architektonicznych.

## Kierunek produktu

- Produkcyjnie nie robić tego jako czysty HTML.
- Docelowo aplikacja sklepowa: React/Next.js + baza danych + storage plików + panel admina.
- HTML może służyć tylko jako makieta lub szybki prototyp wizualny.
- Oglądanie projektów bez logowania.
- Zakup jako gość.
- Logowanie głównie dla admina.
- Klient może dostać prywatny link do zamówienia/pobrania zamiast konta z hasłem.
- Każdy projekt ma mieć stały kod projektu, np. `DP-AUR-014`.
- Dane projektów, parametry, rzuty, elewacje i media mają być zarządzane przez panel admina.
- Publiczne media: wizualizacje, miniatury, poglądowe rzuty, elewacje.
- Prywatne pliki zakupowe: pełna dokumentacja, PDF/ZIP/kosztorysy po płatności.

## Zakres V1

V1 ma dowieźć realny sklepowy rdzeń:

1. katalog projektów,
2. karta projektu,
3. koszyk,
4. checkout,
5. zamówienie/płatność albo formularz zamówienia,
6. panel admina do zarządzania projektami.

## Zakres V2

V2 może zawierać:

- automatyczne linki do pobrania po płatności,
- faktury,
- panel klienta,
- bardziej rozbudowaną automatyzację dostawy plików.

## Najważniejszy ekran sprzedażowy

Karta projektu.

To tam ma być największa jasność oferty, parametrów, ceny, dodatków, dostawy i zaufania. Bez tego sklep będzie katalogiem, nie maszyną sprzedażową.

## Styl wizualny

- ciemny grafit,
- szarości,
- złote/beżowe akcenty,
- czytelność,
- brak przeładowania,
- profesjonalny charakter pod projekty architektoniczne.

## Zasada uczciwości ofert

- Nie publikować fikcyjnych projektów jako realnych ofert.
- Katalog pokazuje tylko projekty faktycznie dodane i opublikowane przez admina.

## Ważny dodatek produktu

Płatny dodatek:

`Projekt w formacie PDF na e-mail` za `+250 zł`.

Interpretacja produktu:

- bazowy zakup daje standardowy dostęp lub standardową realizację zamówienia,
- dodatek oznacza dodatkowy pakiet PDF wysłany bezpośrednio na e-mail,
- powinien być obsłużony w koszyku, checkout, płatności, zamówieniu, e-mailach, panelu admina i automatycznej wysyłce po płatności,
- nie może kolidować z bazową dostawą cyfrową.
<!-- SKLEP_PROJEKTY_DOMOW_MEMORY_V1_END -->

