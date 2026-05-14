# STAGE25_ADMIN_MEDIA_VISIBILITY

## Cel

Usunac zgadywanie przy mediach w adminie. Po zapisie banera lub zdjec projektu panel ma pokazywac, co faktycznie jest zapisane w Supabase Storage i tabelach `site_content` / `project_media`.

## Problem

Audyt Supabase pokazal, ze media istnieja:

- `site-media`: OK
- `project-media`: OK
- `site_content.homepage_hero.image_public_url`: istnieje
- `project_media` dla `DP-2026-0002`: 9 rekordow

Panel admina nie pokazywal tego wystarczajaco jasno. Input pliku HTML po zapisie nie pokazuje starej nazwy pliku, wiec wygladalo to tak, jakby obraz nie byl zapisany.

## Zmiana

- `AdminHomepageContentForm` pokazuje aktualny baner, sciezke Storage i link do pliku.
- `updateHomepageHeroAction` zwraca `imageUrl`, `imagePath` i komunikat rozrozniajacy zapis z nowym banerem od zapisu samej tresci.
- `lib/site-content.ts` przenosi do UI metadane obrazu: bucket, path, updatedAt.
- `AdminProjectMediaManager` pokazuje aktualne media projektu jako karty z miniaturami, typem, sciezka i linkiem.
- Dodano `app/admin-media-v25.css`.
- Dodano guard `scripts/check-admin-media-visibility-v25.cjs` i wpis do `npm run verify`.

## Nie zmieniono

- Nie zmieniono modelu danych.
- Nie zmieniono nazw bucketow.
- Nie zmieniono uploadu plikow.
- Nie zmieniono publicznej logiki widocznosci projektow.

## Kryterium zakonczenia

- `npm run verify:admin-media-visibility-v25` przechodzi.
- `npm run verify` przechodzi.
- W adminie `/admin/strona-glowna` widac aktualny baner po zapisie i po odswiezeniu strony.
- W edycji projektu widac aktualne media z `project_media` jako karty/miniatury/linki.
