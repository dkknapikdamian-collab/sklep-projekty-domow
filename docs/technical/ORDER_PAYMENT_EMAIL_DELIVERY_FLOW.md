# Zamówienia, płatności, e-maile i dostawa PDF/linków

## Zasada główna

Po zamówieniu musi powstać rekord w bazie. Mail nie jest źródłem prawdy.

## Flow zamówienia

1. Klient dodaje projekt do koszyka.
2. Wybiera warianty i dodatki.
3. Wypełnia checkout.
4. System tworzy customer, order i order_items.
5. System nadaje numer zamówienia.
6. System wysyła potwierdzenie zamówienia.
7. System tworzy płatność albo oznacza ręczną płatność.
8. Po webhooku płatności status zmienia się na `paid`.
9. System uruchamia dostawę PDF/linku, jeśli dotyczy.
10. Admin widzi statusy w panelu.

## Statusy zamówienia

```txt
new
waiting_for_payment
paid
payment_failed
in_preparation
ready_to_send
sent_by_email
download_link_sent
manual_contact_required
completed
cancelled
refunded
```

## Ważna zasada płatności

Nie wolno oznaczać zamówienia jako `paid` tylko dlatego, że klient wrócił ze strony płatności. `paid` ustawia tylko zaufane potwierdzenie, najlepiej webhook.

## Widok admina

Najważniejsze widoki:

- wszystkie zamówienia,
- nowe,
- oczekujące na płatność,
- opłacone,
- opłacone i niewysłane,
- PDF do wysłania,
- wymagają ręcznej obsługi,
- wysłane,
- anulowane/zwroty.

## E-maile

Do klienta:
- potwierdzenie zamówienia,
- informacja o płatności,
- potwierdzenie płatności,
- projekt w przygotowaniu,
- e-mail z PDF/linkiem,
- błąd płatności,
- obsługa ręczna.

Do admina:
- nowe zamówienie,
- płatność potwierdzona,
- zamówienie wymaga wysyłki,
- wysyłka PDF nie powiodła się,
- nowe zapytanie.
