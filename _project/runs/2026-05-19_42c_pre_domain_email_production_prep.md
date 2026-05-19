# Etap 42C - pre-domain email production prep

<!-- ETAP42C_PRE_DOMAIN_EMAIL_PREP_START -->
## Etap 42C - pre-domain email production prep

Status: WDROŻONE W KODZIE / REALNY TEST PO PODPIĘCIU DOMENY.
Data: 2026-05-19.

### Decyzje

- Nie odpalamy realnej wysyłki Resend bez kupionej i zweryfikowanej domeny.
- Przygotowujemy produkcyjne treści maili, SQL pod podgląd outboxa i checklistę wdrożenia.
- Pliki projektu, rzuty i ZIP-y nie idą jako załączniki.
- E-mail wysyła potwierdzenie i link do bezpiecznego panelu pobrania.
- Realny test wysyłki: dopiero po Resend domain verified + Cloudflare Secrets + redeploy.

### Testy

- npm run verify:email-production-prep-v42c
- npm run verify:resend-runtime-v42b
- npm run verify:email-outbox-v41a
- npm run typecheck

### Następny krok

Kupić domenę, dodać mail.dudekhomeprojekty.pl do Resend, ustawić SPF/DKIM/DMARC, potem Cloudflare Secrets i test płatności.
<!-- ETAP42C_PRE_DOMAIN_EMAIL_PREP_END -->
