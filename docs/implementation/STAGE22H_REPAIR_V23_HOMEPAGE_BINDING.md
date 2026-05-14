# STAGE22H — repair V23 homepage binding after V22G

## Cel

Naprawić konflikt po V22G: strona główna została nadpisana spójną wersją V22, ale usunęła wiązanie V23 z `site_content`.

## Decyzja

Home page ma jednocześnie:

- pobierać aktywne projekty z Supabase,
- pobierać hero z `getHomepageHeroContent`,
- przekazywać projekty do `HomeProjectSearch`,
- zachować publiczne filtry katalogu,
- przechodzić guard `verify:admin-homepage-content-v23`.

## Kryterium zakończenia

- `npm run verify:admin-homepage-content-v23` przechodzi.
- `npm run verify:public-catalog-filters-v22b` przechodzi.
- `npm run typecheck` przechodzi.
- `npm run verify` przechodzi.
