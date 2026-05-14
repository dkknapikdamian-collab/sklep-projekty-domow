# STAGE32 - Homepage hero full-bleed background

Cel: baner strony głównej ma działać jak wzór: obraz jest tłem całego hero na pełną szerokość, a tytuł, opis, CTA, ikony oraz wyszukiwarka pozostają osobnymi elementami HTML nałożonymi na obraz.

Zakres:
- `app/page.tsx`: hero image is used as `backgroundImage` on `.home-hero`, no side image card.
- `app/globals.css`: V32 full-bleed hero overrides.
- `scripts/check-homepage-hero-full-bleed-v32.cjs`: guard layoutu.

Nie zmieniaj:
- źródła danych hero w Supabase,
- panelu admina,
- logiki katalogu/projektów,
- tekstów hero.
