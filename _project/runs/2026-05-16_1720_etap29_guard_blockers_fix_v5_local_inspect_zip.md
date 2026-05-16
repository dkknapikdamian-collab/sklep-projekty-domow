# Run report - Etap 29 guard blockers fix V5 local inspect ZIP

Data: 2026-05-16
Tryb: ZIP/APPLY
Push: tylko lokalnie przez Damiana, jeśli użyto -Push.

## Cel

Nie zgadywać po jednym markerze. Najpierw sprawdzić lokalny stan plików, potem patchować odpornie.

## Zakres

- V49: audit marker split.
- V41: title publicHref.
- V25: media open link marker.

## Testy

APPLY uruchamia:
- npm run verify:v1-runtime-flow-markers-v49
- npm run verify:admin-project-list-compact-v41
- npm run verify:admin-media-visibility-v25
- npm run verify
- npm run check:project-memory

## Test ręczny

TEST RĘCZNY DO WYKONANIA.
