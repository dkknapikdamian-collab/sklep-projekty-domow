# STAGE23 Admin Homepage Content

## Cel

Dodac edycje tresci strony glownej w adminie bez edycji kodu.

## Zakres

- nowa strona `/admin/strona-glowna`
- formularz admina do zarzadzania hero:
  - tytul
  - podtytul
  - CTA label
  - CTA href
  - obraz hero
  - alt
  - status aktywny/ukryty
- dane trzymane w tabeli `site_content` (rekord `key = homepage_hero`)
- upload mediow do bucketa `site-media`
- publiczna `/` czyta hero z Supabase przez `lib/site-content.ts`
- fallback tresci gdy brak konfiguracji

## SQL

Migracja: `supabase/migrations/0013_site_content_homepage_hero.sql`

Tworzy:
- tabele `site_content`
- polityki RLS
- bucket `site-media`
- polityki storage dla odczytu publicznego i zapisu admina

## Guard

Dodano: `scripts/check-admin-homepage-content-v23.cjs`

Sprawdza m.in.:
- czy `/` jest podpiete pod `getHomepageHeroContent`
- czy istnieje `/admin/strona-glowna`
- czy action zapisuje `homepage_hero` i uploaduje do `site-media`
- czy migracja `0013` zawiera wymagane elementy
