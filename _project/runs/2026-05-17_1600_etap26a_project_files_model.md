# 2026-05-17 16:00 - Etap 26A project_files model

## Scan-first confirmation

- Repo: `dkknapikdamian-collab/sklep-projekty-domow`
- Branch: `main`
- Git status: do sprawdzenia lokalnie przez APPLY.
- Read files/folders:
  - `AGENTS.md`
  - `_project/01_PROJECT_GOAL.md`
  - `_project/03_CURRENT_STAGE.md`
  - `_project/07_NEXT_STEPS.md`
  - `_project/16_PRODUCTION_ROADMAP_AND_ACCEPTANCE.md`
  - `_project/18_SQL_LEDGER.md`
  - `package.json`
  - `app/admin/projekty/actions.ts`
  - `components/admin/AdminProjectMediaManager.tsx`
  - `lib/admin/order-files.ts`
  - `lib/admin/projects-admin.ts`
  - `lib/admin/project-publication-readiness.ts`
  - `scripts/check-private-files-fulfillment-v51.cjs`
  - `supabase/manual/2026-05-17_etap36_post_payment_fulfillment.sql`
- Obsidian notes read / mapped:
  - `PROJECTS.md`
  - `00_SYSTEM/PROJECT_ID_MAP - aktywne projekty i ID Obsidiana.md`
  - `00_SYSTEM/AI_INTAKE_PROTOCOL - skanowanie i katalogowanie wsadow Obsidiana.md`
  - `00_SYSTEM/OBSIDIAN_CANONICAL_REGISTRY.md`
  - `00_SYSTEM/OBSIDIAN_ALIAS_MAP.md`
  - `10_PROJEKTY/Sklep_projekty_domow/00_START - Sklep projekty domow.md`
  - `10_PROJEKTY/Sklep_projekty_domow/03_DECYZJE - Sklep projekty domow.md`
  - `10_PROJEKTY/Sklep_projekty_domow/11_ROADMAPA PRODUKCYJNA I ODHACZANIE - Sklep projekty domow.md`
  - `10_PROJEKTY/Sklep_projekty_domow/12_SQL_LEDGER - Sklep projekty domow.md`
- Active source of truth: repo dla kodu i `_project`; Obsidian dla decyzji/statusu.
- Legacy / competing paths: Google Drive odrzucony decyzja Damiana; manual file fulfillment V51 zostaje kompatybilny.

## FAKTY Z KODU / PLIKOW

- `project_files` jest juz uzywane przez admina i zamowienia.
- Dotychczasowy model mial `bucket`, `path`, `file_type`, `title`, `version`.
- Etap 36 ma juz tokenowany panel i signed URL po platnosci.
- Brakowalo jawnych flag `active`, `auto_send_after_payment`, `required_for_publication`.

## DECYZJE DAMIANA

- Supabase Storage jest produkcyjnym kierunkiem storage.
- Google Drive nie jest kierunkiem Etapu 26.
- AI nie pcha samodzielnie zmian do repo. Delivery: ZIP + polecenie push dla Damiana.

## HIPOTEZY / PROPOZYCJE AI

- `floor_plans` powinno wejsc jako osobny prywatny typ w Etapie 26B, ale 26A nie dodaje jeszcze UX inputu, zeby nie zablokowac publikacji.

## DO POTWIERDZENIA

- Czy SQL 26A zostal uruchomiony w Supabase.
- Czy runtime aktywacji projektu blokuje brak `required_for_publication` na realnych danych.
- Czy nieaktywny plik znika z fulfillmentu zamowienia.

## ZMIENIONE PLIKI

- `lib/admin/project-files-model.ts`
- `lib/admin/project-publication-readiness.ts`
- `lib/admin/order-files.ts`
- `lib/admin/projects-admin.ts`
- `components/admin/AdminProjectMediaManager.tsx`
- `app/admin/projekty/actions.ts`
- `scripts/check-project-files-model-v26a.cjs`
- `supabase/manual/2026-05-17_etap26a_project_files_model.sql`
- `docs/implementation/ETAP26A_PROJECT_FILES_MODEL.md`
- `package.json`
- `_project/*`
- Obsidian files in package.

## TESTY AUTOMATYCZNE

Planowane przez APPLY:

```powershell
npm run verify:project-files-model-v26a
npm run verify:private-files-fulfillment-v51
npm run verify:project-publication-readiness-v35
npm run typecheck
```

## GUARDY

Nowy guard:

```powershell
npm run verify:project-files-model-v26a
```

## TESTY RECZNE

- TEST RĘCZNY DO WYKONANIA: brak wymaganej dokumentacji blokuje `active`.
- TEST RĘCZNY DO WYKONANIA: projekt z kompletem przechodzi readiness.
- TEST RĘCZNY DO WYKONANIA: fulfillment nie pokazuje `active=false`.

## POTWIERDZENIA DAMIANA

- BRAK POTWIERDZONEGO TESTU RĘCZNEGO dla Etapu 26A w chwili przygotowania paczki.

## BRAKI I RYZYKA

- SQL musi byc uruchomiony w Supabase przed runtime testem.
- Build nie jest pierwszym kryterium tej paczki; APPLY uruchamia focused guardy i typecheck.
- Etap 26A nie dodaje realnej automatycznej wysylki e-mail.

## WPŁYW NA OBSIDIANA

- Paczka zawiera nowa notatke Etapu 26A i aktualizacje decyzji, roadmapy oraz SQL ledger.

## WPŁYW NA KIERUNEK ROZWOJU

- Wzmacnia Supabase jako produkcyjny storage.
- Zamyka powrot do Google Drive w Etapie 26.

## NASTĘPNY KROK

1. Uruchomic APPLY.
2. Uruchomic SQL w Supabase.
3. Wykonac reczny runtime test publikacji i fulfillmentu.
4. Dopiero potem Etap 26B: admin UX plikow prywatnych.

## GIT / ZIP STATUS

- Delivery: ZIP.
- Commit/push: NIE WYKONANO przez AI.
- Push: do wykonania lokalnie przez Damiana po review.

## SQL confirmation - 2026-05-17

Status: SQL URUCHOMIONE / POTWIERDZONE PRZEZ DAMIANA.

Wynik Supabase:
- Success. No rows returned.

Uwaga:
- Potwierdzony jest tylko SQL.
- Etap 26A V1 nadal wymaga V2 repair, bo apply kodu byl czesciowy, guard erify:project-files-model-v26a nie przeszedl, a typecheck zahaczyl o _backup_local.

Nastepny krok:
- Przygotowac Etap 26A V2 repair ZIP.
