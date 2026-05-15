# 09_CONTEXT_FOR_OBSIDIAN - Sklep z projektami domów

## Cel

Sklep / aplikacja do sprzedaży projektów domów. Publiczny klient ma przeglądać projekty i kupować bez konta. Admin ma dodawać realne projekty, media, parametry, statusy i obsługiwać zamówienia.

## Kierunek

- Next.js / React + baza danych + storage + panel admina.
- Nie czysty HTML jako produkcja.
- Katalog tylko z realnymi, aktywnymi/opublikowanymi projektami.
- Karta projektu jest najważniejszym ekranem sprzedażowym.
- Zakup jako gość.
- Logowanie głównie dla admina.
- Prywatny link do zamówienia/pobrania zamiast konta klienta w V1.
- Dodatek `Projekt w formacie PDF na e-mail` za +250 zł jako dodatkowa forma dostarczenia/archiwizacji.

## Stan

Trwa budowa V1. Istnieją trasy sklepu i panelu admina. Prace dotyczyły admina, koszyka, checkoutu i dodatku PDF. Aktualnie najważniejsze jest uporządkowanie pamięci projektu i potem stabilizacja ścieżki zakupowej V1.

## Decyzje

- Produkcyjny sklep nie jest czystym HTML.
- Fikcyjne projekty nie mogą być realnymi ofertami.
- Dane projektów mają pochodzić z panelu admina / jednego źródła prawdy.
- Każdy projekt ma mieć stały kod.
- V1 bez obowiązkowego konta klienta.
- Obsidian i repo mają być aktualizowane po ważnych zmianach.

## Testy

Najważniejsze testy ręczne:

- admin: lista, nowy, edycja, zapis, anuluj, status, delete,
- katalog pokazuje tylko aktywne projekty,
- koszyk liczy projekt i dodatek PDF +250 zł,
- checkout tworzy zamówienie,
- admin widzi zamówienie,
- `npm run build` przechodzi.

Guard pamięci:

```bash
node scripts/check-project-memory.cjs
npm run check:project-memory
```

## Następny krok

Po wdrożeniu pełnej pamięci: stabilizacja ścieżki `aktywny projekt -> katalog -> karta -> koszyk -> checkout -> zamówienie -> admin`.
