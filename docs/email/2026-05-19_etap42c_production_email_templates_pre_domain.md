# Etap 42C - produkcyjne maile przed podpięciem domeny

Status: WDROŻONE W KODZIE / REALNY TEST PO PODPIĘCIU DOMENY
Data: 2026-05-19
Project ID: sklep_projekty_domow

## Decyzja

Domeny i realnej wysyłki Resend jeszcze nie odpalamy. Przygotowujemy wszystko, co można zrobić bez domeny:

- produkcyjne copy maili,
- guardy dla maili,
- SQL pod podgląd outboxa,
- checklistę DNS/Resend/Cloudflare,
- brak załączników dla plików projektu,
- wysyłkę tylko po webhook-confirmed statusie płatności paid.

## Produkcyjny model wysyłki

- payment_confirmation: potwierdza płatność i numer zamówienia.
- project_files_access: wysyła link do bezpiecznego panelu pobrania.
- Pliki projektu, rzuty i ZIP-y nie idą jako załączniki.
- Link do pobrania jest generowany dopiero po statusie paid.
- Kliknięcie success page nie wysyła maili i nie wydaje plików.

## Tymczasowy stan

Dopóki nie ma domeny:

- nie ustawiamy EMAIL_PROVIDER=resend w produkcji,
- nie wpisujemy RESEND_API_KEY,
- nie robimy realnej wysyłki,
- aplikacja może nadal kolejkować outbox bez realnego providera.

## Po zakupie domeny

Rekomendowany układ:

- domena Resend: mail.dudekhomeprojekty.pl,
- EMAIL_FROM: Dudek Home Projekty <zamowienia@mail.dudekhomeprojekty.pl>,
- EMAIL_REPLY_TO: kontakt@dudekhomeprojekty.pl,
- API key: Sending access ograniczony do domeny.

## Test po domenie

1. Resend domain status = verified.
2. Cloudflare secrets ustawione.
3. Redeploy.
4. Jedno zamówienie Stripe sandbox albo kontrolna płatność.
5. SQL: email_outbox ma payment_confirmation i project_files_access jako sent / resend.
