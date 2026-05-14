# STAGE22G — repair by overwriting coherent files

## Cel

Naprawić lokalny stan po kilku przerwanych patchach V22B/V22D/V22E/V22F.

## Co było zepsute

Poprzedni repair próbował podmienić fragment `home-search` regexem. Lokalny `app/page.tsx` był już częściowo zmieniony, więc regex nie pasował i patch padł. Repo zostało w stanie hybrydowym.

## Decyzja

Nie łatać fragmentów. Nadpisać spójne pliki:

- `app/page.tsx`
- `app/admin/projekty/page.tsx`
- `app/projekty/page.tsx`
- `components/project/HomeProjectSearch.tsx`
- `lib/public-catalog-filters.ts`
- `app/public-catalog-filters-v22b.css`

## Efekt

- Home page używa `HomeProjectSearch`.
- Publiczny katalog ma query-param filters.
- `message.tone` w adminie ma typ `success | neutral | error`.
- Mojibake w `.section-head h2::before` jest zastąpiony `\2014`.
- Guardy V22B i V22D działają.
- Audyt Supabase pokazuje, czy aktywne projekty są kompletne.
