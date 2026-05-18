# Etap 40E V3 - status pĹ‚atnoĹ›ci w adminie

## Zasada pĹ‚atnoĹ›ci
1. Automatyzujemy wszystko, co Stripe potwierdza webhookiem.
2. ZwykĹ‚y przelew poza Stripe jest fallbackiem.
3. RÄ™czny przelew potwierdza admin po wyciÄ…gu bankowym.
4. TytuĹ‚ przelewu rÄ™cznego: `ZAM-{SHORT_ID}`.
5. Email outbox jest blokujÄ…cy przed produkcjÄ….

## Admin
Lista i szczegĂłĹ‚y zamĂłwienia pokazujÄ… status pĹ‚atnoĹ›ci, reference, peĹ‚ne ID zamĂłwienia oraz identyfikatory Stripe.
