# Etap 42D - admin email outbox visibility

Status: WDROŻONE W KODZIE / TEST RĘCZNY DO WYKONANIA
Data: 2026-05-19
Project ID: sklep_projekty_domow

## Cel

Admin zamówienia ma widzieć stan maili w 5 sekund: wysłano, kolejka, błąd, pominięto, provider, ID wiadomości i powód błędu.

## Zakres

- kompaktowy dashboard maili w szczegółach zamówienia,
- status potwierdzenia płatności i status maila z dostępem do plików,
- provider_message_id / resendEmailId z metadata,
- last_error, failed_at, retry_after, attempt_count,
- fallback ręcznego kopiowania schowany w details,
- brak realnej wysyłki bez domeny i env Resend.

## Testy

- npm run verify:email-outbox-admin-visibility-v42d
- npm run verify:email-production-prep-v42c
- npm run verify:resend-runtime-v42b
- npm run typecheck

## Test ręczny

Po deployu wejść w /admin/zamowienia/[id] i sprawdzić: dashboard maili, ostatnie wiadomości, provider ID, błąd, schowany fallback kopiowania.
