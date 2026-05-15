# 07_NEXT_STEPS - Następne kroki

## Jeden najważniejszy następny krok

**Po zakończeniu pełnej pamięci projektu: ustabilizować pełny przepływ V1 od aktywnego projektu do zamówienia.**

Najkrótsza ścieżka:

`admin dodaje aktywny projekt -> katalog go pokazuje -> karta projektu działa -> koszyk liczy cenę -> dodatek PDF +250 zł działa -> checkout tworzy zamówienie -> admin widzi zamówienie`

To jest rdzeń sprzedaży. Bez tego kolejne ozdobniki będą watą cukrową na rusztowaniu.

## Kolejne sensowne etapy

### Etap 10 - Stabilizacja ścieżki zakupowej V1

Zakres:

- aktywny projekt z admina widoczny w katalogu,
- karta projektu pobiera dane z jednego źródła,
- koszyk działa na realnym projekcie,
- dodatek PDF e-mail +250 zł dolicza się poprawnie,
- checkout tworzy zamówienie,
- zamówienie jest widoczne w adminie.

Nie dodawać nowych funkcji poza tą ścieżką.

### Etap 11 - Panel admina: zamówienia i obsługa statusów

Zakres:

- lista zamówień,
- szczegóły zamówienia,
- status płatności/realizacji,
- widoczność dodatku PDF,
- dane klienta,
- jasny workflow ręcznej obsługi.

### Etap 12 - Pliki projektu i storage

Zakres:

- publiczne media po kodzie projektu,
- prywatne pliki zakupowe,
- jasny podział public/private,
- przygotowanie do linków pobrania.

### Etap 13 - E-maile transakcyjne / ręczna lub półautomatyczna dostawa

Zakres:

- potwierdzenie zamówienia,
- instrukcja płatności albo potwierdzenie płatności,
- obsługa dodatku PDF e-mail,
- szablony wiadomości.

### Etap 14 - Płatność produkcyjna

Zakres:

- wybór operatora,
- test płatności,
- webhook/status,
- blokada dostępu do prywatnych plików przed płatnością.

### Etap 15 - Dopiero potem rozbudowa UX/SEO

Zakres:

- filtry,
- SEO kart projektów,
- porównywarka,
- większa warstwa contentowa.

## Decyzje potrzebne od Damiana

1. Czy V1 ma mieć od razu płatność online, czy najpierw zamówienie/formularz z ręczną obsługą?
2. Jaki provider płatności?
3. Jaki storage dla prywatnych plików?
4. Czy PDF e-mail +250 zł ma być zawsze opcją, czy tylko przy wybranych projektach?
5. Czy admin ma mieć miękkie usuwanie projektów, czy trwałe usuwanie z potwierdzeniem?

## Blokady

- Brak pełnego testu ręcznego całej ścieżki V1.
- Niepewny aktualny stan checkoutu i zamówień bez uruchomienia testów na repo.
- Niepewny finalny model płatności i storage.

## Czego nie robić teraz

- Nie budować panelu klienta przed domknięciem V1.
- Nie rozbudowywać SEO przed stabilnym katalogiem i kartą projektu.
- Nie dodawać fikcyjnych projektów, żeby „ładniej wyglądało”.
- Nie przerabiać UI szeroko, jeśli problemem jest brak działania ścieżki sprzedaży.
