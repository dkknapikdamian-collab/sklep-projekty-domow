# STAGE53 / Etap 28 - produkcyjny cleanup demo/sample i fikcyjnych ofert

Data: 2026-05-16

## Teza

Sample project moze byc narzedziem technicznym admina, ale nie moze wygladac jak realna oferta w publicznym sklepie.

## Co wdraza etap

- `createSampleProjectAction` tworzy demo jako `draft`, nie `active`.
- Slug demo to `demo-projekt-przykladowy-v28`.
- Sample jest opisany jako `NARZEDZIE TESTOWE`, nie jako oferta.
- Publiczny katalog filtruje demo/sample niezaleznie od statusu.
- Guard `verify:no-demo-content` blokuje fikcyjne oferty w publicznym flow.

## Kryterium zamkniecia

Zaden projekt testowy nie moze przypadkiem stac sie realna oferta.

## Test reczny Vercel

1. Utworz sample w adminie, jesli przycisk jest dostepny.
2. Sprawdz, ze sample ma status draft.
3. Wejdz w `/projekty`.
4. Sample/demo nie moze byc widoczny.
5. Realny projekt active nadal ma byc widoczny.
