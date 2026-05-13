# Vercel setup

## Decyzja

Vercel bedzie docelowym hostingiem/stagingiem dla Next.js.

## Kolejnosc

1. Zaloguj Vercel CLI.
2. Polacz lokalny projekt z projektem Vercel.
3. Dodaj env w Vercel.
4. Pobierz env do `.env.local`.
5. Uruchom lokalnie.
6. Dopiero potem deploy.

## Komendy

```powershell
cd "C:\Users\malim\Desktop\biznesy_ai\strony\strona z projektami"
npx vercel login
npx vercel link
```

Dodaj envy w Vercel Dashboard albo CLI:

```txt
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_APP_URL
```

Pobierz do lokalnego pliku:

```powershell
npx vercel env pull .env.local
```

## Wazne

Nie commituj `.env.local`.

`SUPABASE_SERVICE_ROLE_KEY` tylko server-side.
