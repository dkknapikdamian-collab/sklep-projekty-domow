# Run report - Etap 5: Koszyk i ulubione

Data: 2026-05-15 09:03 Europe/Warsaw

## Cel

Naprawic przypadek, w ktorym koszyk wygladal na pusty albo header pokazywal `0` mimo dodania projektu, oraz sprawdzic czy ulubione faktycznie zapisuja stan.

## Zakres zmian

- `components/cart/CartClient.tsx`
- `components/Header.tsx`
- `components/HeaderCartLink.tsx`
- `components/HeaderFavoritesLink.tsx`
- `components/project/FavoriteButton.tsx`
- `components/project/ProjectCard.tsx`
- `components/project/ProjectGallery.tsx`
- `lib/cart/storage.ts`
- `lib/favorites/storage.ts`
- `scripts/check-cart-order-v38.cjs`
- `_project/03_CURRENT_STAGE.md`
- `_project/05_MANUAL_TESTS.md`
- `_project/06_GUARDS_AND_TESTS.md`
- `_project/07_NEXT_STEPS.md`
- `_project/08_CHANGELOG_AI.md`
- `_project/09_CONTEXT_FOR_OBSIDIAN.md`

## Co sprawdzono runtime

Adres lokalny: `http://localhost:3100`.

Projekt: `/projekty/31231312312`.

Wyniki:

- Header koszyka startowal z `0`.
- Po zaznaczeniu `Pakiet PDF na e-mail +250 zl` i kliknieciu `DODAJ DO KOSZYKA` strona przeszla do `/koszyk`.
- Koszyk mial 1 pozycje.
- Header koszyka pokazal `1`.
- Pozycja miala kod `DP-2026-0001`, slug `31231312312`, wariant `Projekt podstawowy`, sume `12584`.
- Odznaczenie dodatku zmienilo sume pozycji na `12334`.
- `Usun pozycje` pokazalo pusty koszyk i licznik `0`.
- Ulubione zapisaly stan i licznik finalnie pokazal `1`.
- Brak bledow konsoli w testowanym flow.

## Checki

```powershell
npm run verify:cart-order-v38
npm run typecheck
npm run build
```

Wynik:

- `verify:cart-order-v38` - OK
- `typecheck` - OK
- `build` - OK, ze starymi ostrzezeniami autoprefixera

## Ryzyka

- Ulubione nie maja jeszcze osobnej strony/listy.
- Runtime admina nadal zalezy od poprawnego anon key Supabase.
