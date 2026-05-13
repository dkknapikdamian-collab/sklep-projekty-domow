# Sklep z projektami domów

Repozytorium produkcyjne dla sklepu/katalogu projektów domów.

## Rekomendowana nazwa repo

`sklep-projekty-domow`

Docelowo: `dkknapikdamian-collab/sklep-projekty-domow`

## Cel

Zbudować prostą, nowoczesną, produkcyjną stronę/sklep do sprzedaży projektów domów.

Kierunek wizualny:
- ciemny grafit,
- szarości,
- złoto-beżowe akcenty,
- prosty premium layout,
- duże wizualizacje,
- czytelna karta projektu,
- prawy box zakupowy,
- brak chaosu kolorystycznego,
- wygląd zamrożony 1:1 względem zaakceptowanych referencji.

## Stos produkcyjny

- Next.js
- React
- TypeScript
- PostgreSQL / Supabase
- Storage: Supabase Storage / Cloudflare R2 / Google Cloud Storage / własny serwer
- Płatności: Przelewy24, Stripe opcjonalnie później
- E-mail: SMTP/API provider
- Panel admina: własny prosty panel

## Najważniejsza zasada

Najpierw pilnujemy wyglądu i modelu danych. Nie zaczynamy od przypadkowego kodowania ekranów, bo wtedy styl i logika szybko się rozjadą.
