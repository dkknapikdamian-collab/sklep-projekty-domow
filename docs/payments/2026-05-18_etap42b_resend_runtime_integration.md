# Etap 42B - Resend runtime integration

Status: WDROŻONE W KODZIE / TEST RĘCZNY DO WYKONANIA
Data: 2026-05-18
Project ID: sklep_projekty_domow

## Cel

Uruchomić realną wysyłkę e-maili transakcyjnych przez Resend po `webhook-confirmed paid`, bez wysyłania plików jako załączników.

## Zakres

- Provider: Resend.
- Nowy adapter `sendTransactionalEmailViaConfiguredProvider()`.
- `email_outbox` wybiera provider `resend` tylko wtedy, gdy są skonfigurowane `EMAIL_PROVIDER=resend`, `RESEND_API_KEY` i `EMAIL_FROM`.
- Bez konfiguracji provider zostaje `fake_noop`, więc wdrożenie kodu nie wysyła przypadkowo e-maili.
- Wysyłka `payment_confirmation` i `project_files_access` następuje przez kolejkę `email_outbox`.
- Nie wysyłamy plików jako załączników.
- E-mail `project_files_access` zawiera bezpieczny link do panelu pobrania.
- Każda wysyłka Resend używa `Idempotency-Key`.
- Każda wysyłka dostępu do plików wymaga potwierdzonego statusu `paid` w `order_payments`.
- Wynik Resend zapisuje `providerMessageId` / `resendEmailId` w `metadata` rekordu `email_outbox`.
- Błędy zapisują `status=failed`, `last_error`, `retry_after` i zwiększają `attempt_count`.

## Zmienne środowiskowe Cloudflare

- `EMAIL_PROVIDER=resend`
- `RESEND_API_KEY`
- `EMAIL_FROM`, np. `Dudek Home Projekty <zamowienia@dudekhomeprojekty.pl>`
- `EMAIL_REPLY_TO`, np. `kontakt@dudekhomeprojekty.pl`

## Testy automatyczne

- `npm run verify:resend-runtime-v42b`
- `npm run verify:email-outbox-v41a`
- `npm run verify:fulfillment-readiness-v41b`
- `npm run typecheck`

## Test ręczny po deployu

1. Ustawić i zweryfikować domenę w Resend.
2. Dodać sekrety w Cloudflare.
3. Zrobić płatność Stripe sandbox dla zamówienia z kompletem plików.
4. Sprawdzić, czy `email_outbox` ma `payment_confirmation` i `project_files_access` ze statusem `sent`.
5. Sprawdzić, czy klient dostał e-mail z linkiem do panelu pobrania.
6. Sprawdzić, czy link prowadzi do panelu, a pliki nadal idą przez signed URL / token.

## Ryzyko

- Bez konfiguracji DNS/Resend kod zostawi provider `fake_noop` i nie wyśle maili.
- Jeśli Resend odrzuci wysyłkę, rekord przejdzie w `failed`, a admin może ponowić przygotowanie dostępu.
- Realna produkcja wymaga DKIM/SPF/DMARC przed testem na klientach.
