# Etap 42A - decyzja Resend i model e-maili transakcyjnych

Status: DECYZJA ZAPISANA / DO WDROŻENIA W ETAPIE 42B
Data: 2026-05-18
Project ID: sklep_projekty_domow

## Decyzje Damiana

- Provider e-mail V1.1: Resend.
- Automatyczne e-maile po webhook-confirmed statusie płatności paid.
- Ręczne kopiowanie treści zostaje jako fallback, nie jako główny flow.
- Pliki projektu, rzuty i paczki ZIP nie są wysyłane jako załączniki.
- E-mail ma zawierać potwierdzenie oraz bezpieczny link do panelu pobrania.
- Panel pobrania / token / signed URL pozostaje źródłem dostępu do plików.
- Nie wysyłać dostępu do plików bez statusu paid.

## Wybrane zmienne środowiskowe Cloudflare

- EMAIL_PROVIDER=resend
- RESEND_API_KEY
- EMAIL_FROM
- EMAIL_REPLY_TO

Sekrety nie mogą trafić do repo.

## DNS / domena

Do wdrożenia przed realną wysyłką:
- weryfikacja domeny w Resend,
- DKIM, SPF, DMARC,
- docelowy adres nadawcy, np. zamowienia@dudekhomeprojekty.pl albo projekty@dudekhomeprojekty.pl.

## E-maile V1.1

- payment_confirmation - potwierdzenie płatności.
- project_files_access - link do panelu pobrania.

## Guard

- npm run verify:resend-provider-decision-v42a

## Następny etap

Etap 42B - Resend runtime integration:
- adapter sendTransactionalEmail(),
- wysyłka email_outbox przez Resend,
- provider_message_id w bazie/adminie,
- retry wysyłki z admina,
- fallback ręczny jako schowana opcja awaryjna,
- blokada wysyłki dostępu bez paid.

## Warunek wysyłki produkcyjnej

Automatyczne e-maile transakcyjne są wysyłane wyłącznie po webhook-confirmed statusu płatności paid.

Success page, kliknięcie klienta albo ręczne odświeżenie strony nie są źródłem prawdy dla wysyłki dostępu do plików.
