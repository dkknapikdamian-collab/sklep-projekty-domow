# RUN_STAGE27_PUBLICATION_READINESS_RUNTIME_TEST_2026-05-16

## Cel etapu

Domkniecie braku po Etapie 27: sanity check publikacji projektu ma miec test automatyczny scenariuszy oraz reczny checklist runtime.

## Scan-first confirmation

- Repo: `dkknapikdamian-collab/sklep-projekty-domow`
- Branch docelowy: `main`
- Aktywna mapa: `SKLEP_PROJEKTY_DOMOW__AKTYWNA_MAPA_I_PROCES_OBSIDIAN_FINAL_V1.md`
- Obsidian: `dkknapikdamian-collab/obsidian-vault`, sekcja `10_PROJEKTY/Sklep_projekty_domow/`

## Co przeczytano przed zmiana

- `AGENTS.md`
- `_project/01_PROJECT_GOAL.md`
- `_project/15_ACTIVE_SOURCE_MAP.md`
- `_project/16_PRODUCTION_ROADMAP_AND_ACCEPTANCE.md`
- `package.json`
- `lib/admin/project-publication-readiness.ts`
- `app/admin/projekty/actions.ts`
- `scripts/check-project-publication-readiness-v35.cjs`
- Obsidian: `10_PROJEKTY/Sklep_projekty_domow/00_START - Sklep projekty domow.md`

## FAKTY Z KODU / PLIKOW

- `project-publication-readiness.ts` sprawdza nazwe, slug, kod, cene, metraz, pokoje, opis, hero, thumbnail, rzut, prywatna dokumentacje, wariant/projekt podstawowy i pomieszczenia.
- `updateProjectStatusAction` uzywa `getProjectPublicationReadiness` przy `status === "active"`.
- Dotychczas `projectRooms` bylo sprawdzane tylko, gdy `rooms.length > 0`, wiec pusty zestaw pomieszczen mogl nie dac brakujacego klucza `projectRooms`.

## DECYZJE DAMIANA

- Sprawdzic Etap 27: projekt bez hero, miniatury, rzutu, prywatnego PDF, kompletny projekt i czytelnosc komunikatow.
- Dostarczyc ZIP i polecenie push, bez samodzielnego pushowania przez ChatGPT.

## HIPOTEZY / PROPOZYCJE AI

- Najmniejsza sensowna poprawka to test scenariuszowy helpera i usuniecie warunku `rooms.length > 0` dla `projectRooms`.

## DO POTWIERDZENIA

- Runtime na realnych danych Supabase nadal wymaga testu recznego Damiana.
- Guard nie klika UI admina i nie zastepuje testu faktycznej zmiany statusu w bazie.

## ZMIENIONE PLIKI

- `lib/admin/project-publication-readiness.ts`
- `scripts/check-project-publication-readiness-runtime-v27.cjs`
- `package.json`
- `docs/implementation/STAGE27_PUBLICATION_READINESS_RUNTIME_TEST.md`
- `_project/runs/RUN_STAGE27_PUBLICATION_READINESS_RUNTIME_TEST_2026-05-16.md`
- `_project/03_CURRENT_STAGE.md`
- `_project/05_MANUAL_TESTS.md`
- `_project/06_GUARDS_AND_TESTS.md`
- `_project/07_NEXT_STEPS.md`
- `_project/08_CHANGELOG_AI.md`
- `_project/10_PROJECT_TIMELINE.md`
- `_project/12_IMPLEMENTATION_LEDGER.md`
- `_project/14_TEST_HISTORY.md`
- `_project/16_PRODUCTION_ROADMAP_AND_ACCEPTANCE.md`
- Obsidian: `10_PROJEKTY/Sklep_projekty_domow/2026-05-16 - Etap 27 gotowosc publikacji runtime test.md`

## TESTY AUTOMATYCZNE

Do uruchomienia przez APPLY:

```powershell
npm run verify:project-publication-readiness-v35
npm run verify:project-publication-readiness-runtime-v27
npm run typecheck
npm run build
npm run check:project-memory
```

## GUARDY

Nowy guard:

```powershell
npm run verify:project-publication-readiness-runtime-v27
```

## TESTY RECZNE

Status: TEST RECZNY DO WYKONANIA.

Scenariusze:
- projekt bez hero nie przechodzi na active,
- projekt bez miniatury nie przechodzi,
- projekt bez rzutu nie przechodzi,
- projekt bez prywatnego PDF nie przechodzi,
- projekt bez pomieszczen nie przechodzi,
- kompletny projekt przechodzi,
- komunikaty brakow sa czytelne.

## POTWIERDZENIA DAMIANA

- BRAK POTWIERDZONEGO TESTU RECZNEGO dla runtime Supabase/UI admina.

## BRAKI I RYZYKA

- Mock/scenariusz helpera nie potwierdza zachowania formularza admina na realnych danych.
- W repo lokalnie moga istniec obce niecommitowane pliki; APPLY stage'uje tylko pliki Etapu 27.

## WPLYW NA OBSIDIANA

- Do ZIP-a dodano notatke Obsidiana dla Etapu 27.
- Dashboard i notatki guard/next/roadmap sa aktualizowane blokiem Etapu 27, jesli istnieja lokalnie.

## WPLYW NA KIERUNEK ROZWOJU

- Zmiana pasuje do V1: publikacja projektu ma blokowac niekompletne realne oferty.
- Nie dodaje platnosci, panelu klienta, faktur ani automatycznej wysylki.

## NASTEPNY KROK

- Po pushu wykonac reczny runtime test Supabase/UI dla publikacji projektu.

## GIT / ZIP STATUS

- Tryb: ZIP.
- ChatGPT nie pushuje.
- APPLY tworzy lokalne commity i podaje reczne polecenie push.
