# Architektura techniczna

## Produkcja

- Next.js
- React
- TypeScript
- PostgreSQL / Supabase
- Storage na media i pliki
- E-mail provider
- Bramka płatności
- Panel admina

## Warstwy

1. Publiczny frontend
2. Admin
3. API / server actions
4. Baza danych
5. Storage publiczny
6. Storage prywatny
7. Płatności
8. E-mail
9. Logi operacyjne

## Zasady architektoniczne

- Dane projektów nie mogą być wpisane w komponenty.
- Każdy projekt ma stały kod.
- Publiczne media i prywatne pliki są rozdzielone.
- Zamówienie jest źródłem prawdy po zakupie.
- E-mail jest tylko powiadomieniem, nie źródłem prawdy.
- Status `paid` ustawia tylko potwierdzony webhook płatności.
- Dostęp do prywatnych plików jest przez token/link po płatności.
- Admin ma listę zamówień do obsługi.
