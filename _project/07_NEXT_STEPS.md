# 07_NEXT_STEPS - nastepne kroki

## Najblizszy rekomendowany krok po Etapie 15B

Zastosować migrację `0017_order_fulfillment_checklist.sql` w Supabase i wykonać runtime test na jednym zamówieniu: zaznaczyć checklistę, dodać notatkę, zapisać i odświeżyć stronę.

## Zasady dalszej pracy

- Checklisty realizacji są teraz danymi, nie tylko UI.
- Nie dodawać automatycznej wysyłki, signed URL ani płatności bez osobnego etapu.
- Każda zmiana procesu realizacji powinna przejść przez stronę `/admin/zamowienia/[id]`.
- Notatka admina jest częścią tabeli `order_fulfillment_checklist`.

## Kolejne możliwe etapy

1. Runtime test Etapu 15B.
2. Widok audit logu `/admin/audit`.
3. Filtry zamówień po statusie i etapie realizacji.
4. Rozsądne oznaczenie zamówień częściowo/pełnie zrealizowanych na liście.

<!-- SKLEP_PROJEKTY_DOMOW_MEMORY_V1_START -->
# Następne kroki - Sklep z projektami domów

## Najbliższy krok po wdrożeniu pamięci

1. Damian sprawdza, czy pamięć projektu i Obsidian są czytelne.
2. Uruchomić lub potwierdzić `npm run check:project-memory`.
3. Dopiero potem wrócić do wdrażania funkcji sklepu.

## Najważniejsza kolejka produktowa V1

### 1. Admin jako źródło projektów

Cel: panel admina ma pozwalać realnie zarządzać projektami.

Krytyczne akcje:

- dodanie projektu,
- edycja,
- zapis,
- anulowanie,
- zmiana statusu,
- usunięcie,
- kontrola publikacji.

### 2. Koszyk + checkout + dodatek PDF

Cel: zakup ma liczyć pełną cenę i dodatki bez chaosu.

Wymagane:

- projekt w koszyku,
- addon `Projekt w formacie PDF na e-mail` za +250 zł,
- suma zamówienia,
- dane kupującego,
- zapis zamówienia,
- widoczność dodatku w adminie/zamówieniu.

### 3. Model zamówień i dostawa plików

Cel: po zakupie użytkownik ma otrzymać logiczny dostęp do produktu.

V1 może być prostsze:

- formularz zamówienia albo płatność,
- status zamówienia,
- przygotowanie linku / informacji wysyłki.

V2:

- automatyczne linki,
- faktury,
- panel klienta.

### 4. Publiczny katalog i karta projektu

Cel: karta projektu ma sprzedawać, a nie tylko pokazywać obrazek.

Priorytet:

- cena,
- parametry,
- kod projektu,
- zakres dostawy,
- dodatki,
- CTA,
- wiarygodne media.

## Zasada selekcji następnych etapów

Najpierw funkcje, które blokują sprzedaż i obsługę zamówienia. Dopiero potem ozdobniki.
<!-- SKLEP_PROJEKTY_DOMOW_MEMORY_V1_END -->

