# Stage 29 — public media read + UI debug finalizer

## Cel
Domknąć dwa rozjazdy wykryte po V27/V28:

1. Baner i media projektów są zapisywane w Supabase przez service role, ale publiczny odczyt po odświeżeniu mógł wpadać w anon/RLS i wracać do placeholderów.
2. `/admin/debug` nadal wyglądał jak stary panel diagnostyczny, mimo że użytkownik oczekuje trybu klikania elementów UI i pobierania raportu.

## Zmiana
- `lib/site-content.ts` czyta `site_content` przez `createSupabaseServiceRoleClient()`.
- `lib/project-repository.ts` czyta publiczne dane aktywnych projektów przez `createSupabaseServiceRoleClient()` i nadal filtruje `status = active`.
- Publiczny katalog nie czyta `project_files`; prywatne pliki zakupowe zostają poza publicznym odczytem.
- `scripts/check-public-project-data-v22.cjs` dostał zgodność V27/V29.
- `/admin/debug` został przepisany na stronę instruktażową dla właściwego debug reportera UI.
- `scripts/check-admin-ui-debug-v28.cjs` sprawdza, czy `/admin/debug` nie jest już starym panelem diagnostycznym.

## Nie zmieniać
- Nie ujawniać service role po stronie klienta.
- Nie pokazywać `project_files` publicznie.
- Nie tworzyć równoległej bazy ani Firebase/Firestore.
- Nie usuwać panelu `AdminUiDebugReporter`, bo to właściwy debug: klik elementu + opis + raport Markdown.

## Test
- `npm run verify:public-service-role-read-v27`
- `npm run verify:admin-ui-debug-v28`
- `npm run verify:public-project-data-v22`
- `npm run verify`

## Kryterium zakończenia
Po deployu:
- baner strony głównej zostaje po odświeżeniu,
- `/` pokazuje baner z `site_content.image_public_url`,
- projekt demo pokazuje zdjęcia z `project_media`,
- `/admin/debug` pokazuje instrukcję trybu klikania elementów UI,
- pływający przycisk `Debug` pozwala kliknąć element, opisać problem, zapisać Enterem i pobrać raport.
