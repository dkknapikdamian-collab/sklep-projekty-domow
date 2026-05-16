# RUN_STAGE27_BOM_REPAIR_AFTER_V3_2026-05-16

## Cel

Naprawa po paczce Etap 27 V3: test scenariuszy publikacji przeszedl, ale `package.json` zostal zapisany z UTF-8 BOM, przez co `JSON.parse` w guardzie i `next build` przerwaly prace.

## FAKTY Z LOGU

- `verify:project-publication-runtime-v27` zaliczyl scenariusze:
  - kompletny projekt przechodzi,
  - brak hero blokuje,
  - brak miniatury blokuje,
  - brak rzutu blokuje,
  - brak prywatnego PDF blokuje,
  - brak wariantu albo potwierdzonego projektu podstawowego blokuje,
  - brak nazwanych pomieszczen blokuje,
  - komunikat brakow jest czytelny,
  - akcja admina uzywa readiness przed ustawieniem active.
- Potem guard i build padly na `package.json` z BOM: `Unexpected token '﻿'`.
- V3 mimo tego zrobil lokalne commity, ale NIE wykonano push.

## DECYZJE DAMIANA

- Nie pushowac samodzielnie.
- Kazdy etap musi miec repo, `_project` i Obsidiana.
- Nie uzywac `git add .`, bo w repo sa obce pliki z innych tematow.

## ZMIANA V4

- Usunac BOM z `package.json`.
- Dopisac raport naprawczy do `_project`.
- Dopisac notatke naprawcza do Obsidiana.
- Uruchomic guardy i build ponownie.
- Zrobic lokalne commity bez push.

## TESTY AUTOMATYCZNE V4

Do wykonania przez APPLY:

```powershell
npm run verify:project-publication-runtime-v27
npm run verify:project-publication-readiness-v35
npm run typecheck
npm run build
npm run check:project-memory
```

## TEST RECZNY

Status: TEST RECZNY DO WYKONANIA.

Runtime Supabase nadal wymaga klikniecia:
- projekt bez hero nie przechodzi na active,
- projekt bez miniatury nie przechodzi,
- projekt bez rzutu nie przechodzi,
- projekt bez prywatnego PDF nie przechodzi,
- kompletny projekt przechodzi,
- komunikaty brakow sa czytelne.

## RYZYKO

- To naprawia lokalny blocker builda po V3, ale nie zastapi testu na realnych rekordach Supabase.
- Jesli user wypchnal V3 przed V4, historia bedzie miala osobny commit naprawczy. Jesli nie, finalny stan po V4 jest bezpieczny do push.

## GIT / ZIP STATUS

- Tryb: ZIP.
- Push: NIE wykonywac przez APPLY.
