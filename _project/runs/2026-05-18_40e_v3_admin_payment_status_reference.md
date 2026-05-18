# Etap 40E V3 - admin status pĹ‚atnoĹ›ci, reference i przelewy rÄ™czne

Status: WDROĹ»ONE LOKALNIE DO REVIEW
Data: 2026-05-18
Project ID: sklep-projekty-domow

## Fakty
- Stripe checkout + webhook + fulfillment po paid zostaĹ‚y wczeĹ›niej potwierdzone runtime guardem.
- Etap 40E V1/V2 nie wszedĹ‚ poprawnie przez bĹ‚Ä™dy patchera, wiÄ™c V3 resetuje tylko znane tracked pliki 40E i aplikuje poprawkÄ™ z repo root.

## Decyzja
- Stripe webhook jest ĹşrĂłdĹ‚em prawdy dla BLIK, kart i metod Stripe Checkout.
- ZwykĹ‚y przelew poza Stripe zostaje fallbackiem i wymaga rÄ™cznego potwierdzenia admina.
- TytuĹ‚ przelewu rÄ™cznego: `ZAM-{SHORT_ID}` bez e-maila w tytule.
- Email outbox jest koniecznoĹ›ciÄ… przed produkcjÄ….

## Testy automatyczne
- npm run verify:admin-payment-status-v40e
- npm run verify:stripe-checkout-params-v40c
- npm run verify:stripe-checkout-params-v40c-v2
- npm run verify:package-json-no-bom-v40d
- npm run typecheck
- npm run cf:build

## Test rÄ™czny
TEST RÄCZNY DO WYKONANIA:
- /admin/zamowienia pokazuje pĹ‚atnoĹ›Ä‡ potwierdzonÄ… albo niepotwierdzonÄ….
- SzczegĂłĹ‚y zamĂłwienia pokazujÄ… `ZAM-{SHORT_ID}`, UUID, kwotÄ™, provider, status, Stripe session i Stripe payment intent.
