# Produkcyjne minimum sklepu z projektami domów

Status: ROBOCZA ROADMAPA PRODUKCYJNA / DO WDROŻENIA ETAPAMI
Data: 2026-05-19
Project ID: sklep_projekty_domow

## Teza

Sklep z projektami domów nie może być tylko katalogiem i koszykiem. Musi budować zaufanie, wyjaśniać co klient kupuje, bezpiecznie wydać pliki po płatności i dać adminowi kontrolę nad realizacją.

## P0 - musi być przed publicznym startem

1. Regulamin, polityka prywatności, cookies i zgody checkout.
2. Jasny opis licencji i zakresu dokumentacji: co klient kupuje, co zawiera paczka, czego nie zawiera adaptacja.
3. Karta projektu z parametrami: powierzchnia, pokoje, łazienki, kondygnacje, dach, garaż, technologia, minimalna działka, rzuty, elewacje, wizualizacje.
4. Cena brutto/netto, promocje i najniższa cena z 30 dni, jeśli używamy obniżek.
5. Bezpieczny checkout: walidacja cen z bazy, Stripe paid jako źródło prawdy, e-mail i panel pobrania po paid.
6. Admin orders: status płatności, status wysyłki maili, status plików, retry, błędy.
7. Search/filter/sort w katalogu według parametrów domu.
8. Strony kontaktu i pomocy: FAQ, co zawiera projekt, adaptacja, płatność, pobranie plików.
9. Blokada publikacji projektu bez wymaganych mediów, parametrów, ceny i plików prywatnych.
10. Backup i logi: audit admina, outbox, płatności, pobrania.

## P1 - bardzo wskazane po P0

- porównywarka projektów,
- ulubione/zapisane projekty,
- podobne projekty na karcie projektu,
- breadcrumbs i SEO landing pages dla kategorii,
- schema.org Product/Breadcrumb/FAQ,
- lepsza analityka koszyka i checkoutu,
- prosty import/eksport projektów,
- panel statusu gotowości publicznej.

## P2 - później

- konto klienta,
- faktury automatyczne,
- newsletter/lead magnet,
- porównanie kosztów budowy i wariantów,
- integracje marketingowe.

## Najbliższa kolejność

1. 42D - admin outbox visibility.
2. 43A - legal/checkout consent foundation.
3. 43B - karta projektu: co zawiera projekt + licencja + pliki po zakupie.
4. 43C - katalog: filtry/sort/search production polish.
5. 43D - SEO/meta/schema basics.
6. 43E - domain + Resend live activation after domain purchase.
