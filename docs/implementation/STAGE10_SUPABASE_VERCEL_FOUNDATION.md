# Stage 10 — Supabase + Vercel foundation

## Cel

Podpiac projekt pod realny kierunek produkcyjny:

- Supabase Auth
- Supabase Postgres
- Supabase Storage
- Vercel env/deploy workflow

## Zrobione w patchu

- dodane zaleznosci `@supabase/supabase-js` i `@supabase/ssr`
- dodany middleware chroniacy `/admin`
- dodany `/admin/login`
- dodany `/admin/logout`
- dodany `/admin/setup`
- dodane klienty Supabase:
  - `lib/supabase/browser.ts`
  - `lib/supabase/server.ts`
  - `lib/supabase/service-role.ts`
- dodany helper admin session:
  - `lib/auth/admin.ts`
- dodana migracja:
  - `supabase/migrations/0010_admin_foundation.sql`
- dodane instrukcje Vercel i Supabase
- dodany guard `verify:supabase-foundation`

## Co trzeba zrobic recznie

1. Uzupelnic env lokalnie albo przez Vercel.
2. Uruchomic migracje SQL w Supabase.
3. Utworzyc usera admina w Supabase Auth.
4. Dodac profil admina do tabeli `profiles`.
5. Zalogowac sie przez `/admin/login`.

## Dlaczego Vercel teraz ma sens

Mozemy ustawic env w Vercel i pobrac je lokalnie przez:

```powershell
npx vercel env pull .env.local
```

Dzieki temu Vercel staje sie miejscem kontroli envow, a lokalne `.env.local` jest tylko kopia robocza.
