# 15_ACTIVE_SOURCE_MAP - Sklep projekty domow

## Mapa zrodel

Fakty: kod, repo, testy, guardy, _project i aktualne pliki Obsidiana.

## Obowiazkowe czytanie przed kazdym etapem

AI developer / Codex / operator musi przeczytac:

1. `AGENTS.md`
2. `_project/01_PROJECT_GOAL.md`
3. `_project/03_CURRENT_STAGE.md`
4. `_project/07_NEXT_STEPS.md`
5. `_project/15_ACTIVE_SOURCE_MAP.md`
6. `_project/16_PRODUCTION_ROADMAP_AND_ACCEPTANCE.md`
7. najnowsze `_project/runs/`
8. Obsidian: `10_PROJEKTY/Sklep_projekty_domow/00_START - Sklep projekty domow.md`
9. Obsidian: `10_PROJEKTY/Sklep_projekty_domow/11_ROADMAPA PRODUKCYJNA I ODHACZANIE - Sklep projekty domow.md`

## Aktywna roadmapa produkcyjna

Od 2026-05-16 aktywnym plikiem odhaczania produkcyjnego jest:

`_project/16_PRODUCTION_ROADMAP_AND_ACCEPTANCE.md`

Odpowiednik w Obsidianie:

`10_PROJEKTY/Sklep_projekty_domow/11_ROADMAPA PRODUKCYJNA I ODHACZANIE - Sklep projekty domow.md`

Kazdy etap musi aktualizowac oba miejsca albo jasno wskazac blocker.

## Source priority

1. Kod i testy/guardy w repo.
2. `AGENTS.md` i `_project/`.
3. Obsidian dashboard dla statusu operacyjnego.
4. Chat tylko jako tymczasowe wejscie, dopoki nie trafi do repo/vault.

## Najblizsza kolejnosc

<!-- ETAP_A_PAYMENT_DIRECTION_FIX_START -->
## Korekta aktywnej mapy - płatności

Decyzja Damiana: Nie wdrażamy płatności ręcznych jako docelowego modelu.

Aktywny kierunek płatności:
- obecny manual-payment flow = legacy / temporary / internal only,
- przed publicznym uruchomieniem trzeba go usunąć albo zastąpić,
- docelowo: automatyczne płatności, Stripe/payment provider, webhooki i statusy płatności.

Status testu: TEST RĘCZNY DO WYKONANIA.
<!-- ETAP_A_PAYMENT_DIRECTION_FIX_END -->

1. Etap 22 - runtime audit admina.
2. Etap A - korekta kierunku platnosci: platnosci reczne nie sa docelowym modelem.
3. Etap 24 - pelny runtime flow V1.
4. Etap 25 - walidacja zamowienia i cen wzgledem bazy.
5. Etap 26 - obsluga plikow zakupowych w adminie.
6. Etap 27 - sanity check publikacji projektu.
7. Etap 28 - blokada sample/demo jako realnych ofert.
8. Etap 29 - pre-release checklist V1.

## Zasada statusow

Nie wolno oznaczac etapu jako zamknietego bez statusu guardow, statusu testu recznego Damiana, aktualizacji `_project/` i aktualizacji Obsidiana.

Dozwolone statusy sa zdefiniowane w `_project/16_PRODUCTION_ROADMAP_AND_ACCEPTANCE.md`.

<!-- ETAP22_29_PRODUCTION_ROADMAP_ACCEPTANCE_2026_05_16 -->

Dodano aktywna roadmapa produkcyjna i ledger odhaczania. Ten plik ma byc czytany przed kazdym kolejnym etapem.

<!-- ETAP23Z_ARCHIVE_DELETE_RUNTIME_ACCEPTANCE_2026_05_16 -->
## Etap 23Z - aktywne zrodla

Aktywne pliki dla archiwizacji i hard delete:
- pp/admin/projekty/actions.ts
- components/admin/AdminProjectDeleteForm.tsx
- pp/admin/projekty/[id]/edytuj/page.tsx
- scripts/check-admin-archive-delete-runtime-v23.cjs
- scripts/check-admin-archive-delete-runtime-v23z.cjs
- _project/17_ETAP23Z_ARCHIVE_HARD_DELETE_RUNTIME_ACCEPTANCE.md

Obsidian:
- 10_PROJEKTY/Sklep_projekty_domow/2026-05-16 - Etap 23Z archiwizacja i hard delete runtime.md
<!-- ETAP23Z_ARCHIVE_DELETE_RUNTIME_ACCEPTANCE_2026_05_16 -->

<!-- ETAP33_ADMIN_AUDIT_RUNTIME_SOURCE_MAP_2026_05_17_START -->
## Etap 33 - aktywne źródła dla runtime admin/audit

Aktywne źródła prawdy:

- Kod/statyczny kontrakt audit: `scripts/check-admin-audit-log-v44.cjs`.
- Guard pakietu Etap 33: `scripts/check-admin-audit-runtime-v53.cjs`.
- Runtime proof Supabase: `scripts/check-admin-audit-runtime-v54.cjs`.
- SQL proof: `supabase/manual/2026-05-17_etap33_admin_audit_runtime_verification.sql`.
- Manualna checklista: `_project/17_ETAP33_ADMIN_AUDIT_RUNTIME_CHECKLIST.md`.
- Raport run: `_project/runs/2026-05-17_0900_etap33_runtime_test_admin_audit.md`.

Obsidian jest dashboardem statusu, nie źródłem kodu.
<!-- ETAP33_ADMIN_AUDIT_RUNTIME_SOURCE_MAP_2026_05_17_END -->

<!-- ETAP33_ADMIN_AUDIT_RUNTIME_V2_SOURCE_MAP_2026_05_17_START -->
## Etap 33 V2 - aktywne źródła

- Statyczny audit guard: `scripts/check-admin-audit-log-v44.cjs`.
- Guard Etapu 33 V2: `scripts/check-admin-audit-runtime-v53.cjs`.
- Node runtime proof: `scripts/check-admin-audit-runtime-v54.cjs`.
- SQL proof: `supabase/manual/2026-05-17_etap33_admin_audit_runtime_verification.sql`.
- Checklista: `_project/17_ETAP33_ADMIN_AUDIT_RUNTIME_CHECKLIST.md`.
- SQL ledger repo: `_project/18_SQL_LEDGER.md`.
- SQL ledger Obsidian: `10_PROJEKTY/Sklep_projekty_domow/12_SQL_LEDGER - Sklep projekty domow.md`.
- Raport run V2: `_project/runs/2026-05-17_0930_etap33_v2_sql_ledger_env_fix.md`.
<!-- ETAP33_ADMIN_AUDIT_RUNTIME_V2_SOURCE_MAP_2026_05_17_END -->

