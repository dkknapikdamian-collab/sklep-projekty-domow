# AGENTS.md ÔÇö AI Working Contract

## Najwa┼╝niejsza zasada

Repozytorium jest ┼║r├│d┼éem prawdy dla tego projektu. Czat nie jest ┼║r├│d┼éem prawdy. Je┼Ťli decyzja, etap, test albo ryzyko ma mie─ç znaczenie dla dalszej pracy, musi trafi─ç do repo.

Projekt: `sklep-projekty-domow`.
Typ: aplikacja webowa / sklep-katalog projekt├│w dom├│w oparty o Next.js, React, TypeScript i Supabase.

## Pliki obowi─ůzkowe przed prac─ů

Ka┼╝dy agent AI, Codex, ChatGPT albo inny model przed zmianami ma przeczyta─ç:

- `AGENTS.md`
- `_project/00_PROJECT_STATUS.md`
- `_project/01_PROJECT_GOAL.md`
- `_project/02_WORK_RULES.md`
- `_project/03_CURRENT_STAGE.md`
- `_project/04_DECISIONS.md`
- `_project/05_MANUAL_TESTS.md`
- `_project/06_GUARDS_AND_TESTS.md`
- `_project/07_NEXT_STEPS.md`

Dodatkowo po pracy ma aktualizowa─ç:

- `_project/03_CURRENT_STAGE.md`
- `_project/05_MANUAL_TESTS.md`
- `_project/06_GUARDS_AND_TESTS.md`
- `_project/08_CHANGELOG_AI.md`
- `_project/runs/`

## Zakres pracy agenta

Agent ma:

- najpierw sprawdzi─ç aktualny stan repo,
- pracowa─ç tylko w zakresie aktualnego zadania,
- nie robi─ç du┼╝ych refaktor├│w bez potrzeby,
- nie usuwa─ç dzia┼éaj─ůcych funkcji bez wyra┼║nej decyzji,
- nie zmienia─ç UI, routingu, komponent├│w ani styli bez zakresu zadania,
- nie dodawa─ç fikcyjnych projekt├│w, zdj─Ö─ç ani ofert jako aktywnych danych produkcyjnych,
- dopisywa─ç testy albo guardy do istotnych zmian,
- aktualizowa─ç pami─Ö─ç projektu po zako┼äczeniu wi─Ökszej pracy.

## Zasada guard├│w

Je┼Ťli agent dodaje funkcj─Ö, przycisk, przep┼éyw, panel, status, wa┼╝ny tekst, ┼║r├│d┼éo danych albo krytyczn─ů logik─Ö, ma doda─ç guard/test.

Je┼Ťli agent usuwa funkcj─Ö, przycisk, tekst albo stary mechanizm, ma te┼╝ usun─ů─ç albo zaktualizowa─ç guard/test, kt├│ry tego pilnowa┼é.

Nie wolno zostawia─ç martwych guard├│w, kt├│re sprawdzaj─ů co┼Ť, czego ju┼╝ nie ma.

## Zasada oszcz─Ödzania token├│w

Agent ma:

- czyta─ç najpierw pliki pami─Öci projektu,
- u┼╝ywa─ç wyszukiwania po repo zamiast zgadywa─ç,
- nie przepisywa─ç du┼╝ych plik├│w bez potrzeby,
- robi─ç ma┼ée, kontrolowane zmiany,
- podawa─ç konkretne pliki i konkretne wyniki test├│w,
- nie produkowa─ç d┼éugich opis├│w bez warto┼Ťci.

## Po ka┼╝dej wi─Ökszej zmianie

Po wi─Ökszej zmianie agent musi:

1. Zaktualizowa─ç `_project/03_CURRENT_STAGE.md`.
2. Zaktualizowa─ç `_project/05_MANUAL_TESTS.md`.
3. Zaktualizowa─ç `_project/06_GUARDS_AND_TESTS.md`.
4. Dopisa─ç wpis w `_project/08_CHANGELOG_AI.md`.
5. Doda─ç raport w `_project/runs/YYYY-MM-DD_HHMM_stage-name.md`.
6. Uruchomi─ç adekwatne checki, szczeg├│lnie `npm run check:project-memory`, je┼Ťli dotyczy pami─Öci projektu.

## Czego nie wolno robi─ç bez decyzji

- Nie zmieniaj logiki sklepu poza zakresem zadania.
- Nie zmieniaj UI bez decyzji.
- Nie ruszaj routingu bez decyzji.
- Nie usuwaj istniej─ůcych test├│w ani guard├│w bez uzasadnienia.
- Nie dodawaj aktywnych fikcyjnych ofert.
- Nie ukrywaj b┼é─Öd├│w test├│w.
- Nie oznaczaj etapu jako zako┼äczonego, je┼Ťli testy wymagane dla etapu nie przesz┼éy.

## Obsidian

`_project/09_CONTEXT_FOR_OBSIDIAN.md` jest indeksem/dashboardem dla Obsidiana. Nie jest nadrz─Ödnym ┼║r├│d┼éem prawdy. ┼╣r├│d┼éem prawdy pozostaje repo.
