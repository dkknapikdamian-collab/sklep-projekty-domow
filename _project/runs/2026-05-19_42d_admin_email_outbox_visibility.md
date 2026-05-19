# Etap 42D - admin email outbox visibility

## Etap 42D - admin email outbox visibility

Status: WDROŻONE W KODZIE / TEST RĘCZNY DO WYKONANIA.
Data: 2026-05-19.

### Zakres

- szczegóły zamówienia pokazują kompaktowy status maili,
- admin widzi payment_confirmation i project_files_access,
- admin widzi provider, provider_message_id, last_error, retry_after i attempt_count,
- fallback ręcznego kopiowania jest schowany jako awaryjna opcja,
- realna wysyłka nadal czeka na domenę i env Resend.

### Guardy

- npm run verify:email-outbox-admin-visibility-v42d
- npm run verify:email-production-prep-v42c
- npm run verify:resend-runtime-v42b
- npm run typecheck

### Test ręczny

TEST RĘCZNY DO WYKONANIA: po deployu wejść w /admin/zamowienia/[id] i potwierdzić czy status maili jest czytelny w 5 sekund.

### Następny krok

43A - legal/checkout consent foundation albo 43B - karta projektu: zakres dokumentacji/licencji. Realna wysyłka Resend dopiero po domenie.
