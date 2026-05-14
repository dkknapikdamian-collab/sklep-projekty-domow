# STAGE26_ADMIN_DEBUG_PANEL

Cel: dodac do panelu admina sklepu prosty ekran diagnostyczny, analogiczny do adminowej diagnostyki z CloseFlow.

## Zakres

- Nowa strona: `/admin/debug`.
- Nowy serwerowy collector: `lib/admin/debug-diagnostics.ts`.
- Nowy CSS: `app/admin-debug-v26.css`.
- Link w `AdminHeader`.
- Karta w dashboardzie admina.
- Guard: `npm run verify:admin-debug-v26`.

## Co sprawdza panel

- Obecnosc env:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY`
- Buckety Storage:
  - `site-media`
  - `project-media`
  - `project-private-files`
- Tabele:
  - `profiles`
  - `projects`
  - `project_media`
  - `project_files`
  - `project_rooms`
  - `project_variants`
  - `project_addons`
  - `site_content`
- Hero strony glownej:
  - rekord `homepage_hero`
  - status active
  - `image_public_url`
- Publiczne projekty:
  - liczba wszystkich projektow
  - liczba active
  - aktywne projekty bez mediow / powierzchni / pokoi / pomieszczen

## Zasada bezpieczenstwa

Panel pokazuje tylko czy klucze istnieja. Nie pokazuje wartosci sekretow.

## Kryterium zakonczenia

- `/admin/debug` dziala po zalogowaniu admina.
- `npm run verify:admin-debug-v26` przechodzi.
- `npm run verify` przechodzi.
