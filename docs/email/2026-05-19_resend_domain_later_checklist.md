# Resend - checklista po zakupie domeny

## Przed uruchomieniem

- [ ] Domena kupiona i obsługiwana w Cloudflare DNS.
- [ ] W Resend dodana subdomena mail.dudekhomeprojekty.pl.
- [ ] SPF i DKIM z Resend dodane w DNS.
- [ ] DMARC dodany dla domeny/subdomeny.
- [ ] Resend pokazuje status verified.
- [ ] Open tracking off.
- [ ] Click tracking off.
- [ ] API key ma Sending access i jest ograniczony do domeny.
- [ ] RESEND_API_KEY zapisany tylko jako Cloudflare Secret.
- [ ] EMAIL_PROVIDER=resend ustawiony dopiero po weryfikacji domeny.
- [ ] EMAIL_FROM i EMAIL_REPLY_TO ustawione w Cloudflare.
- [ ] Redeploy wykonany po env/secrets.

## Pierwszy test

SQL po płatności:

```sql
select
  email_type,
  status,
  provider,
  recipient_email,
  subject,
  sent_at at time zone 'Europe/Warsaw' as sent_at_pl,
  failed_at at time zone 'Europe/Warsaw' as failed_at_pl,
  last_error,
  metadata
from public.email_outbox
order by created_at desc
limit 20;
```

Dobry wynik:

- payment_confirmation / sent / resend
- project_files_access / sent / resend
