# Plan testów

## Test wizualny

- strona główna vs reference-home,
- karta projektu vs reference-project-page,
- katalog,
- koszyk,
- checkout,
- admin.

## Test wyszukiwarki

Zapytania:

```txt
DP-AUR-014
aurora
dom 100m2
dom 100 m²
dzialka 20x30
działka 20 x 30
garaz 2
parterowy
mały dom do 90m2
```

## Test zamówienia

1. Dodaj projekt do koszyka.
2. Dodaj PDF_EMAIL_PACKAGE.
3. Przejdź do checkout.
4. Złóż zamówienie.
5. Sprawdź order.
6. Sprawdź order_items.
7. Sprawdź total +250 zł.
8. Sprawdź admin.

## Test płatności

1. Utwórz płatność.
2. Symuluj pending.
3. Symuluj paid webhook.
4. Sprawdź payment_events.
5. Sprawdź order paid.
6. Sprawdź delivery.

## Test bezpieczeństwa plików

- publiczne media otwierają się,
- prywatny PDF nie otwiera się publicznie,
- link działa tylko z tokenem,
- wygasły link nie działa.
