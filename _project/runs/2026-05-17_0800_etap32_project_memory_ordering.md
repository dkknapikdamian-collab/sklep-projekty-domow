# Etap 32 - uporządkowanie pamięci projektu

Data: 2026-05-17 Europe/Warsaw
Status: ZIP READY TO APPLY / V1 NADAL NIEZAMKNIĘTE

## Scan-first confirmation

- Repo aplikacji: `dkknapikdamian-collab/sklep-projekty-domow`, branch `main`.
- Repo Obsidiana: `dkknapikdamian-collab/obsidian-vault`, branch `main`.
- Metoda skanu: odczyt plików repo i Obsidiana przez GitHub connector oraz aktywną mapę projektu.
- Przeczytane repo:
  - `AGENTS.md`
  - `_project/01_PROJECT_GOAL.md`
  - `_project/03_CURRENT_STAGE.md`
  - `_project/07_NEXT_STEPS.md`
  - `_project/14_TEST_HISTORY.md`
  - `_project/16_PRODUCTION_ROADMAP_AND_ACCEPTANCE.md`
  - `package.json`
- Przeczytane Obsidian:
  - `10_PROJEKTY/Sklep_projekty_domow/00_START - Sklep projekty domow.md`
  - `10_PROJEKTY/Sklep_projekty_domow/11_ROADMAPA PRODUKCYJNA I ODHACZANIE - Sklep projekty domow.md`
- Active source of truth:
  - Repo: kod, guardy, `_project`, raporty techniczne.
  - Obsidian: dashboard, status wysokiego poziomu, decyzje, ryzyka, testy ręczne.
- Missing files/folders: nie potwierdzono lokalnego `git status`, bo etap dostarczony jako ZIP do uruchomienia lokalnie przez Damiana.
- Legacy / competing paths: stare wpisy Etapów 20-31 zostają jako historia, ale Etap 32 dodaje kanoniczny blok statusu na górze aktywnych plików.

## FAKTY Z KODU / PLIKÓW

- `_project/01_PROJECT_GOAL.md` nadal definiuje V1 jako realny sklep: katalog, karta projektu, koszyk, checkout, admin, kody projektów, media, prywatne pliki i guardy.
- `_project/03_CURRENT_STAGE.md`, `_project/07_NEXT_STEPS.md`, `_project/14_TEST_HISTORY.md` i `_project/16_PRODUCTION_ROADMAP_AND_ACCEPTANCE.md` zawierały już blokujące wpisy, ale wymagały kanonicznego wpisu Etapu 32.
- Obsidian dashboard nadal zawierał starszy priorytet Etapu 22 i długą historię, więc wymagał wyraźnego wpisu obecnego stanu.

## DECYZJE DAMIANA

- Etap 32 ma uporządkować pamięć projektu.
- Wpisać jednoznacznie: Kod ma elementy Etapów 22-29, ale V1 nie jest zamknięte.
- Największe blokady: płatności, runtime testy, potwierdzenie Damiana, finalny flow klienta.
- Nie pchać samodzielnie zmian przez AI. Dostarczyć ZIP + jedno polecenie PowerShell.

## HIPOTEZY / PROPOZYCJE AI

- Najrozsądniejszy następny etap po Etapie 32 to decyzja i mapa finalnego flow klienta/płatności, nie kolejna kosmetyka admina.

## DO POTWIERDZENIA

- Czy Damian akceptuje dashboard Obsidiana po aktualizacji Etapu 32.
- Czy finalny provider płatności to Stripe czy inny provider.
- Czy V1 ma mieć automatyczne wydanie plików od razu, czy tymczasowy ręczny fulfillment po płatności.

## ZMIENIONE PLIKI

### Repo aplikacji

- `_project/03_CURRENT_STAGE.md`
- `_project/07_NEXT_STEPS.md`
- `_project/14_TEST_HISTORY.md`
- `_project/16_PRODUCTION_ROADMAP_AND_ACCEPTANCE.md`
- `_project/06_GUARDS_AND_TESTS.md`
- `_project/08_CHANGELOG_AI.md`
- `_project/12_IMPLEMENTATION_LEDGER.md`
- `_project/runs/2026-05-17_0800_etap32_project_memory_ordering.md`
- `scripts/check-project-memory-stage32.cjs`
- `package.json`

### Obsidian

- `10_PROJEKTY/Sklep_projekty_domow/00_START - Sklep projekty domow.md`
- `10_PROJEKTY/Sklep_projekty_domow/11_ROADMAPA PRODUKCYJNA I ODHACZANIE - Sklep projekty domow.md`
- `10_PROJEKTY/Sklep_projekty_domow/2026-05-17 - Etap 32 uporzadkowanie pamieci projektu.md`

## DLACZEGO ZMIENIONO WŁAŚNIE TE PLIKI

- `03_CURRENT_STAGE.md`: aktywny status projektu.
- `07_NEXT_STEPS.md`: kolejność dalszych działań.
- `14_TEST_HISTORY.md`: rozróżnienie guardów od testów ręcznych.
- `16_PRODUCTION_ROADMAP_AND_ACCEPTANCE.md`: roadmapa produkcyjna i blokady V1.
- `06_GUARDS_AND_TESTS.md`: rejestr nowego guarda.
- `08_CHANGELOG_AI.md`, `12_IMPLEMENTATION_LEDGER.md`, `runs`: ślad etapu.
- Obsidian dashboard/roadmapa: dashboard wysokiego poziomu musi mieć ten sam status co `_project`.

## TESTY AUTOMATYCZNE

- `npm run verify:project-memory-stage32`
- `npm run check:project-memory`

## GUARDY

- Dodano `scripts/check-project-memory-stage32.cjs`.
- Dodano script `verify:project-memory-stage32` do `package.json`.
- Dodano `verify:project-memory-stage32` do `npm run verify`.

## TESTY RĘCZNE

- TEST RĘCZNY DO WYKONANIA: Damian ma otworzyć Obsidian dashboard i potwierdzić, że status V1 oraz blokady są czytelne.

## POTWIERDZENIA DAMIANA

- BRAK POTWIERDZONEGO TESTU RĘCZNEGO dla runtime V1.
- BRAK POTWIERDZONEGO TESTU RĘCZNEGO dla finalnego flow klienta.

## BRAKI I RYZYKA

- Etap 32 nie zamyka V1.
- Etap 32 nie wdraża płatności.
- Etap 32 nie potwierdza runtime.
- Ryzyko główne: dalsza praca bez decyzji o finalnym flow klienta będzie pompować dokumentację, ale nie zamknie sprzedaży.

## WPŁYW NA OBSIDIANA

- Dashboard dostaje kanoniczny wpis Etapu 32.
- Roadmapa Obsidiana dostaje kanoniczną tabelę blokad.
- Dodana zostaje osobna notatka etapu.

## WPŁYW NA KIERUNEK ROZWOJU

- Kierunek nie zmienia zakresu V1.
- Etap 32 zatrzymuje fałszywe poczucie gotowości po Etapach 22-29.
- Następny sensowny krok: finalny flow klienta i płatności.

## NASTĘPNY KROK

Doprecyzować finalny flow klienta i płatności: provider, webhook, status płatności, success page, prywatne pliki, e-mail, ponowne pobranie. Potem runtime audit i pełny flow V1.

## GIT / ZIP STATUS

- Delivery: ZIP do lokalnego apply/test/commit/push.
- AI nie wykonał samodzielnego pushu.
- APPLY ma zrobić backup, zmiany, guardy, commit i push po stronie Damiana.

## Run report

- Goal: uporządkować pamięć projektu i status V1.
- Files changed: `_project`, guard, package.json, Obsidian dashboard/roadmap/note.
- Reason: V1 nie może udawać zamknięcia po Etapach 22-29.
- Tests run by APPLY: `verify:project-memory-stage32`, `check:project-memory`.
- Manual checks: dashboard Obsidiana do potwierdzenia.
- Project memory updated: TAK.
- Obsidian updated: TAK, przez pliki w ZIP i apply do vaulta.
- Temporary files removed: apply nie zostawia tempów w repo poza backupiem lokalnym `_backup_local`.
- Backup location: `%USERPROFILE%Desktopiznesy_ai_BACKUPSsklep-projekty-domow6-05-17_etap32_project_memory_ordering`.
- Remaining risks: brak płatności, runtime testów, potwierdzenia Damiana i finalnego flow klienta.
- Next step: Etap finalnego flow klienta/płatności.
