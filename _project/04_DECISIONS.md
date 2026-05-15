# 04_DECISIONS - Aktywne decyzje projektu

## Jak czytać ten plik

Tu są wyłącznie aktywne decyzje. Pomysły i kierunki niezatwierdzone trafiają do sekcji „Hipotezy / propozycje”.

## Aktywne decyzje

### 1. Projekt jest aplikacją sklepową, nie statycznym HTML

- Źródło: ustalenia Damiana i obecny kierunek prac.
- Uzasadnienie: sklep wymaga katalogu, koszyka, checkoutu, panelu admina, danych projektów i docelowo storage plików.
- Status: aktywna decyzja.
- Co zmieniłoby decyzję: wyraźna decyzja Damiana o zrobieniu tylko landing page / makiety.

### 2. Preferowany stack to React/Next.js + baza danych + storage + panel admina

- Źródło: ustalenia projektu i aktualna struktura aplikacji.
- Uzasadnienie: potrzebny jest produkt sklepowy, nie ręczne strony HTML.
- Status: aktywna decyzja.
- Co zmieniłoby decyzję: decyzja o migracji technologii z uzasadnieniem kosztu/ryzyka.

### 3. Publiczny katalog pokazuje tylko realne, aktywne/opublikowane projekty

- Źródło: decyzja projektowa Damiana.
- Uzasadnienie: nie wolno sprzedawać fikcyjnych projektów jako realnych ofert.
- Status: aktywna decyzja.
- Co zmieniłoby decyzję: nic bez jasnej zmiany modelu biznesowego i oznaczenia treści jako demo/concept.

### 4. Wygenerowane wizualizacje są referencją, nie treścią produkcyjną

- Źródło: ustalenia projektu.
- Uzasadnienie: wizualny kierunek może inspirować styl, ale nie może udawać gotowej dokumentacji.
- Status: aktywna decyzja.
- Co zmieniłoby decyzję: legalne i techniczne przygotowanie realnego projektu z pełnymi prawami i dokumentacją.

### 5. Zakup jako gość jest ważniejszy niż konto klienta w V1

- Źródło: ustalenia kierunku V1.
- Uzasadnienie: mniejszy tarcie zakupowe, prostszy MVP.
- Status: aktywna decyzja.
- Co zmieniłoby decyzję: konieczność panelu klienta od razu, np. przez wymagania prawne, licencyjne albo obsługę pobrań.

### 6. Logowanie jest głównie dla admina

- Źródło: ustalenia zakresu.
- Uzasadnienie: admin musi zarządzać projektami; klient nie musi mieć konta w V1.
- Status: aktywna decyzja.
- Co zmieniłoby decyzję: decyzja o panelu klienta w V1.

### 7. Każdy projekt ma mieć stały kod

- Źródło: ustalenia projektu, przykład `DP-AUR-014`.
- Uzasadnienie: kod porządkuje katalog, foldery mediów, zamówienia i komunikację z klientem.
- Status: aktywna decyzja.
- Co zmieniłoby decyzję: brak sensownego powodu do zmiany; raczej tylko zmiana formatu kodu.

### 8. Dane projektów mają być dodawane przez panel admina

- Źródło: kierunek aplikacji.
- Uzasadnienie: Damian nie ma ręcznie edytować kodu przy każdym nowym projekcie.
- Status: aktywna decyzja.
- Co zmieniłoby decyzję: tymczasowy import CSV/JSON jako etap przejściowy, ale docelowy admin zostaje.

### 9. Dodatek `Projekt w formacie PDF na e-mail` kosztuje +250 zł

- Źródło: decyzja Damiana z 2026-05-13.
- Uzasadnienie: dodatkowa wygodna forma dostarczenia/archiwizacji PDF na e-mail.
- Status: aktywna decyzja.
- Co zmieniłoby decyzję: zmiana ceny albo modelu dostawy przez Damiana.

### 10. Dodatek PDF e-mail nie może kolidować z bazową dostawą cyfrową

- Źródło: interpretacja zatwierdzona jako rekomendowany kierunek.
- Uzasadnienie: klient nie może odnieść wrażenia, że płaci 250 zł za coś, co jest podstawą zakupu, jeśli bazowa oferta obejmuje dokumentację cyfrową.
- Status: aktywna decyzja operacyjna.
- Co zmieniłoby decyzję: inny model produktu opisany jawnie w regulaminie/ofercie.

### 11. Każda istotna zmiana projektu ma aktualizować repo i Obsidiana

- Źródło: globalne zasady pracy Damiana.
- Uzasadnienie: czat nie jest źródłem prawdy; projekt ma mieć pamięć w plikach.
- Status: aktywna decyzja.
- Co zmieniłoby decyzję: brak.

## Hipotezy / propozycje, nie decyzje

### HIPOTEZA / PROPOZYCJA - Etap po pamięci: stabilizacja pełnej ścieżki zakupu

Najrozsądniej po tym etapie przejść przez ścieżkę:

`aktywny projekt -> katalog -> karta projektu -> koszyk -> checkout -> zamówienie -> admin widzi zamówienie`

To jest propozycja kolejności prac, nie decyzja o wdrożeniu w tym commitcie.

### HIPOTEZA / PROPOZYCJA - najpierw zamówienie/formularz, płatność online później

Jeśli płatności produkcyjne spowolnią projekt, można rozważyć V1 z zamówieniem i ręczną obsługą płatności, a płatności online wdrożyć później.

Nie wdrażać bez decyzji Damiana.

## Decyzje porzucone / nieaktywne

- Czysty HTML jako produkcyjny sklep: porzucone.
- Fikcyjne projekty jako realne oferty: zakazane.
- Panel klienta jako konieczny element V1: odłożone do V2/później.
