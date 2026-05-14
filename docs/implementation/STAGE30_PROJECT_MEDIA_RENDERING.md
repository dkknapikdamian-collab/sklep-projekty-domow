# STAGE30_PROJECT_MEDIA_RENDERING

## Cel
Naprawić publiczne wyświetlanie zdjęć projektów po zapisie w Supabase Storage.

## Problem
Media były zapisane w `project_media`, ale karta projektu mogła pokazywać puste sloty albo uszkodzone obrazki. Przyczyny:

1. `MediaSlot` używał `next/image`, które wymaga konfiguracji zewnętrznych domen dla Supabase Storage.
2. Galeria szczegółów projektu używała tylko `project.media.gallery`, więc jeśli admin dodał `hero`, `thumbnail`, rzuty albo elewacje, miniatury dalej wyglądały jak puste.

## Zmiana
- `MediaSlot` używa zwykłego `<img>` dla publicznych URL-i z Supabase Storage.
- `ProjectGallery` buduje listę obrazów z: hero, thumbnail, gallery, plans, elevations.
- Duplikaty URL-i są usuwane.
- Dodany guard `verify:project-media-rendering-v30`.

## Nie zmieniać
- Nie zmieniać struktury tabel Supabase.
- Nie zmieniać modelu zapisu mediów w adminie.
- Nie wracać do statycznych plików projektów jako źródła prawdy.

## Test
- `npm run verify:project-media-rendering-v30`
- `npm run verify`
- Publiczna karta projektu z dodanymi mediami pokazuje zdjęcia po odświeżeniu.
