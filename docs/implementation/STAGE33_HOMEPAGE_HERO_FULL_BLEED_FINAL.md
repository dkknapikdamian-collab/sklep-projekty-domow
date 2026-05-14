# STAGE33 - Homepage Hero Full-Bleed Final

Cel: hero strony glownej ma byc pelnoszerokim banerem tla z osobnym HTML dla tekstu, CTA, benefitow i wyszukiwarki.

## Co dopiete

- `app/page.tsx`
  - hero korzysta z `hero.imageUrl` jako `backgroundImage` sekcji `.home-hero`,
  - brak renderowania `hero-image-placeholder`,
  - tekst i CTA dalej pochodza z `hero.title`, `hero.subtitle`, `hero.ctaLabel`, `hero.ctaHref`,
  - `HomeProjectSearch` pozostaje osobnym komponentem.
- `app/globals.css`
  - dopiete finalne wysokości hero na desktopie:
    - `.home-hero--image-bg` i `.hero-overlay`: `min-height: 560px`,
    - `.home-hero--no-image .hero-overlay`: `min-height: 540px`,
  - utrzymane `background-size: cover` i `background-position: center right`,
  - wyszukiwarka pozostaje na dole hero (overlay).
- `scripts/check-homepage-hero-full-bleed-v33.cjs`
  - guard kontraktu V33 full-bleed.
- `package.json`
  - dodano `verify:homepage-hero-full-bleed-v33`,
  - glowny `verify` przepiety z V32 na V33.

## Testy

- `npm run verify:homepage-hero-full-bleed-v33`
- `npm run typecheck`
- `npm run verify`

Wynik: wszystkie komendy przechodza.
