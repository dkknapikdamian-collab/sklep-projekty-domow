# STAGE33 - Homepage hero polish after full-bleed

Cel: po wdrozeniu full-bleed z V32 dopracowac strukture hero tak, aby latwiej utrzymac layout i uniknac regresji przy dalszych etapach.

## Zmiany

- `app/page.tsx`
  - dodano `data-home-hero-variant` na sekcji hero (`image-bg` / `no-image`),
  - CTA hero przeniesione z inline style do klasy `hero-cta-row`,
  - poprawiono uszkodzone znaki (mojibake) w statycznych tekstach homepage.
- `app/globals.css`
  - dodano klase `.hero-cta-row` (margin-top: 20px).
- `scripts/check-homepage-hero-polish-v33.cjs`
  - nowy guard sprawdzajacy markery strukturalne hero i obecność osobnego komponentu wyszukiwarki.
- `package.json`
  - nowy skrypt `verify:homepage-hero-polish-v33`,
  - podpiecie V33 do glownego `npm run verify`.

## Guardy

V33 nie pilnuje konkretnych copy tekstowych. Sprawdza kontrakt strukturalny:
- wariant hero zalezny od `hero.imageUrl`,
- osobna warstwa CTA,
- osobny komponent wyszukiwarki,
- powiazana klasa CSS.

## Testy

- `npm run verify:homepage-hero-polish-v33`
- `npm run verify`
