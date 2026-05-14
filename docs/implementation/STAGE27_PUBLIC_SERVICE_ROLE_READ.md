# STAGE27_PUBLIC_SERVICE_ROLE_READ

## Cel

Naprawić rozjazd: zapis banera i mediów działa przez service role, audyt widzi dane w Supabase, ale strona główna/admin po odświeżeniu wracają do stanu bez obrazów.

## Diagnoza

Server Action zapisuje baner przez `createSupabaseServiceRoleClient`, więc zapis przechodzi nawet przy braku publicznych polityk RLS.

Publiczne odczyty strony głównej i katalogu korzystały z `createSupabaseServerClient`, czyli z anon key i polityk RLS. Jeśli `site_content`, `project_media`, `project_rooms` lub inne tabele nie mają poprawnych SELECT policies dla anon/authenticated, frontend server-rendered widzi default/empty mimo że dane istnieją.

Objaw:
- audit service-role widzi `image_public_url`,
- admin form po zapisie pokazuje obraz,
- po odświeżeniu obraz znika,
- publiczna strona główna nie pokazuje banera.

## Zmiana

1. `lib/site-content.ts`
   - dodano server-only fallback do service-role read clienta dla `getHomepageHeroContent`.

2. `lib/project-repository.ts`
   - publiczne serwerowe odczyty aktywnych projektów idą przez service-role read clienta,
   - zachowany filtr `.eq("status", "active")`,
   - publiczny path nie czyta `project_files`, żeby nie wynosić prywatnych plików do publicznej warstwy.

3. `scripts/check-public-service-role-read-v27.cjs`
   - guard pilnuje, że publiczne serwerowe odczyty nie zależą od anon RLS i nie czytają `project_files`.

## Nie zmieniono

- Zapisu admina.
- Storage bucketów.
- Struktury tabel.
- Publicznych statusów projektów.
- Prywatnych plików zakupowych.

## Test

- `npm run verify:public-service-role-read-v27`
- `npm run verify`
- Vercel:
  - `/admin/strona-glowna` po odświeżeniu pokazuje aktualny baner.
  - `/` pokazuje baner hero.
  - `/projekty` i karta projektu pokazują publiczne media projektu.

## Uwaga techniczna

Docelowo można dodać poprawne SELECT policies w Supabase RLS dla publicznych tabel. V27 wybiera stabilną ścieżkę server-only: service role zostaje na backendzie i nie trafia do klienta.
