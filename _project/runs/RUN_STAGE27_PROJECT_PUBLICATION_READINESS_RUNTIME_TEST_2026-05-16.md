# RUN_STAGE27_PROJECT_PUBLICATION_READINESS_RUNTIME_TEST_2026-05-16

## Cel etapu

Domknac Etap 27 przez dodanie testu automatycznego/scenariuszowego dla sanity check publikacji projektu oraz naprawe luki `rooms: []`.

## Scan-first confirmation

- Repo: `dkknapikdamian-collab/sklep-projekty-domow`
- Branch docelowy: `main`
- Obsidian: `dkknapikdamian-collab/obsidian-vault`, sekcja `10_PROJEKTY/Sklep_projekty_domow/`
- Aktywne zrodla sprawdzone: `AGENTS.md`, `_project/01_PROJECT_GOAL.md`, `_project/15_ACTIVE_SOURCE_MAP.md`, `_project/16_PRODUCTION_ROADMAP_AND_ACCEPTANCE.md`, `package.json`, `lib/admin/project-publication-readiness.ts`, `app/admin/projekty/actions.ts`, `scripts/check-project-publication-readiness-v35.cjs`, Obsidian dashboard projektu.

## FAKTY Z KODU / PLIKOW

- `lib/admin/project-publication-readiness.ts` sprawdza pola publikacyjne projektu.
- `app/admin/projekty/actions.ts` uruchamia `getProjectPublicationReadiness` przy probie ustawienia `status === "active"`.
- Istniejacy guard `verify:project-publication-readiness-v35` pilnuje statycznych markerow.
- Luka: `projectRooms` bylo sprawdzane tylko przy `rooms.length > 0`, wiec pusta tablica pomieszczen mogla nie zablokowac publikacji.

## DECYZJE DAMIANA

- Etap 27 wyglada dobrze statycznie, ale wymaga pelnego testu recznego.
- Sprawdzic: brak hero, brak miniatury, brak rzutu, brak prywatnego PDF, kompletny projekt, czytelne komunikaty.

## HIPOTEZY / PROPOZYCJE AI

- Najmniejsza bezpieczna poprawka to wymusic bezwarunkowy check `projectRooms` i dodac runtime guard helpera bez przebudowy panelu admina.

## DO POTWIERDZENIA

- Runtime Supabase w panelu admina nadal wymaga recznego testu Damiana.

## TESTY AUTOMATYCZNE

Do uruchomienia przez APPLY:

```powershell
npm run verify:project-publication-runtime-v27
npm run verify:project-publication-readiness-v35
npm run typecheck
npm run build
npm run check:project-memory
```

## GUARDY

Nowy guard:

```powershell
npm run verify:project-publication-runtime-v27
```

## TESTY RECZNE

Status: TEST RECZNY DO WYKONANIA.

Scenariusze:
- projekt bez hero nie przechodzi na active,
- projekt bez miniatury nie przechodzi na active,
- projekt bez rzutu nie przechodzi na active,
- projekt bez prywatnego PDF nie przechodzi na active,
- projekt bez pomieszczen nie przechodzi na active,
- kompletny projekt przechodzi na active,
- komunikaty brakow sa czytelne.

## POTWIERDZENIA DAMIANA

- BRAK POTWIERDZONEGO TESTU RECZNEGO runtime Supabase dla Etapu 27.

## BRAKI I RYZYKA

- Guard nie potwierdza realnego storage ani realnego klikniecia w adminie.
- W repo sa obce brudne pliki niezwiazane z etapem; nie wolno uzywac `git add .`.

## WPŁYW NA OBSIDIANA

- Dodano notatke Etapu 27 V3.
- Zaktualizowano dashboard/guardy/next/roadmap, jesli pliki istnieja lokalnie.

## WPŁYW NA KIERUNEK ROZWOJU

- Zmiana pasuje do V1: publikacja realnych projektow tylko po spelnieniu warunkow gotowosci.
- Nie dodaje platnosci, faktur, panelu klienta ani automatycznej wysylki.

## NASTĘPNY KROK

Wykonac test reczny na realnym projekcie w Supabase i zapisac wynik w `_project/11_USER_CONFIRMED_TESTS.md` oraz Obsidianie.

## GIT / ZIP STATUS

- Tryb: ZIP + reczny push po stronie Damiana.
- ChatGPT nie pushuje.
