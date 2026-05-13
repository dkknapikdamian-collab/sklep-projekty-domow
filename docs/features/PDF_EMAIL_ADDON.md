# Dodatek: Pakiet PDF na e-mail +250 zł

## Decyzja

Dodajemy płatny dodatek:

```txt
Pakiet PDF na e-mail — +250 zł
```

## Tekst na karcie projektu

```txt
[ ] Pakiet PDF na e-mail +250 zł

Otrzymasz dodatkową wersję projektu w formacie PDF wysłaną bezpośrednio na Twój e-mail po zaksięgowaniu płatności. Przy dużych plikach wyślemy bezpieczny link do pobrania.
```

## Wymogi techniczne

Dodatek:

- ma kod `PDF_EMAIL_PACKAGE`,
- kosztuje 250 zł,
- jest w `project_addons`,
- zapisuje się w `order_items.addons`,
- jest widoczny w adminie,
- dolicza się do płatności,
- po płatności uruchamia dostawę PDF/linku.

## Flow

1. Klient zaznacza dodatek.
2. Koszyk dodaje +250 zł.
3. Checkout zapisuje dodatek.
4. Płatność obejmuje dodatek.
5. Po webhooku system szuka aktywnego PDF.
6. System próbuje wysłać PDF, a jeśli plik jest duży, wysyła prywatny link.
7. Wysyłka zapisuje się w `email_logs` i `project_deliveries`.
8. Przy błędzie status `manual_required` i powiadomienie admina.
