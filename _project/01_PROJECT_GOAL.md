# 01_PROJECT_GOAL - Sklep z projektami domów

## Główna teza

Budujemy sklep / stronę do sprzedaży projektów domów. Najważniejszym celem jest sprzedaż realnych projektów, a nie prezentacja fikcyjnych wizualizacji.

## Cel biznesowy

Aplikacja ma umożliwiać prezentację i sprzedaż projektów domów w sposób zrozumiały dla klienta oraz wygodny dla Damiana jako administratora.

Największą wartość mają:

- mocna karta projektu,
- jasne parametry domu,
- czytelne media publiczne,
- prosty zakup bez tworzenia konta,
- panel admina pozwalający dodawać realne projekty bez grzebania w kodzie,
- brak chaosu między ofertą prawdziwą i przykładową.

## Dla kogo

Podstawowy odbiorca:

- osoba szukająca gotowego projektu domu,
- klient, który chce szybko ocenić styl, metraż, układ, koszt i dostępność dokumentacji,
- klient kupujący jako gość.

Administrator:

- Damian / właściciel sklepu,
- osoba dodająca projekty, media, parametry, statusy i pliki zakupowe.

## Zakres V1

V1 powinno obejmować:

1. Publiczną stronę główną.
2. Publiczny katalog projektów.
3. Kartę projektu jako główny ekran sprzedażowy.
4. Koszyk.
5. Checkout / zamówienie.
6. Model zakupu jako gość.
7. Panel admina:
   - logowanie admina,
   - lista projektów,
   - dodanie projektu,
   - edycja projektu,
   - zmiana statusu,
   - usunięcie projektu z zabezpieczeniem,
   - podgląd.
8. Stały kod projektu, np. `DP-AUR-014`.
9. Publiczne media projektu: miniatury, wizualizacje, poglądowe rzuty, elewacje.
10. Prywatne pliki zakupowe: pełna dokumentacja, PDF/ZIP/kosztorysy po płatności albo po obsłudze zamówienia.
11. Płatny dodatek `Projekt w formacie PDF na e-mail` za +250 zł.
12. Guardy/regresje dla pamięci projektu i krytycznych ścieżek.

## Zakres V2 / później

V2 / później:

- automatyczne linki do pobrania po płatności,
- faktury,
- panel klienta,
- pełna automatyzacja dostarczania dokumentacji,
- bardziej zaawansowany storage plików prywatnych,
- rozbudowane filtry i porównywarki,
- integracje marketingowe,
- automatyczne e-maile transakcyjne,
- lepsze analityki sprzedażowe.

## Poza zakresem na teraz

Poza zakresem bieżącego etapu:

- przebudowa UI,
- zmiana routingu,
- refaktor całej architektury,
- produkcyjne płatności, jeśli nie zostały osobno zlecone,
- panel klienta,
- faktury,
- automatyczna publikacja fikcyjnych projektów,
- generowanie nowych projektów architektonicznych AI jako realnych ofert.

## Założenia UX

- Oglądanie projektów bez logowania.
- Zakup jako gość.
- Logowanie głównie dla admina.
- Klient może dostać prywatny link do zamówienia/pobrania zamiast konta z hasłem.
- Karta projektu ma być czytelna w kilka minut.
- Styl: ciemny grafit, szarości, złote/beżowe akcenty, premium, ale bez przeładowania.
- Tabela/lista projektów w adminie ma być czytelna i nie rozjeżdżać się przez zbyt duże fonty.

## Założenia techniczne

- Produkcyjnie nie robić tego jako czysty HTML.
- HTML może służyć tylko jako makieta.
- Preferowany kierunek: React/Next.js + baza danych + storage plików + panel admina.
- Dane projektów mają pochodzić z jednego źródła prawdy.
- Każdy projekt ma mieć stały kod i powiązany folder mediów po kodzie projektu.
- Katalog ma pokazywać tylko projekty faktycznie dodane przez admina i oznaczone jako aktywne/opublikowane.

## Ograniczenia

- Nie wolno publikować przykładowych/fikcyjnych projektów jako realnych ofert.
- Nie wolno mieszać publicznych mediów poglądowych z prywatnymi plikami zakupowymi.
- Nie wolno wpisywać hipotez AI do aktywnych decyzji.
- Zmiany funkcjonalne muszą mieć test ręczny albo guard, jeśli da się go sensownie dodać.

## Rzeczy niepewne

- Finalny provider płatności.
- Finalny provider storage plików.
- Czy V1 ma mieć płatność online od razu, czy najpierw formularz zamówienia / ręczna obsługa.
- Czy dodatek PDF e-mail +250 zł jest już technicznie spięty we wszystkich warstwach.
- Czy wszystkie przyciski admina są już pokryte guardami.
