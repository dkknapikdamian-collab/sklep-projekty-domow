# 09_CONTEXT_FOR_OBSIDIAN - indeks projektu

## Projekt

`sklep-projekty-domow`

## Aktualny etap

Etap 15B: Utrwalona checklista realizacji zamówienia.

## Ostatnia ważna zmiana

2026-05-15 20:10 Europe/Warsaw: checklista realizacji na `/admin/zamowienia/[id]` została przeniesiona z samego UI do danych. Stan checkboxów i notatka admina zapisują się w `order_fulfillment_checklist`.

## Najważniejsze ustalenia

- checklista realizacji jest trwałą częścią obsługi zamówienia,
- zapis wymaga migracji `0017_order_fulfillment_checklist.sql`,
- notatka admina jest zapisywana jako `internal_note`,
- nie dodano automatycznej wysyłki, płatności ani signed URL,
- zmiany realizacji są logowane jako `order_fulfillment_checklist_update`.

## Pliki techniczne ważne dla Etapu 15B

- `../app/admin/zamowienia/[id]/page.tsx`
- `../app/admin/zamowienia/actions.ts`
- `../lib/admin/orders-admin.ts`
- `../supabase/migrations/0017_order_fulfillment_checklist.sql`
- `../scripts/check-admin-orders-v42.cjs`

## Uwaga

Obsidian jest tylko indeksem/dashboardem. Źródłem prawdy pozostaje repo.

<!-- SKLEP_PROJEKTY_DOMOW_MEMORY_V1_START -->
# Context for Obsidian - Sklep z projektami domów

## Cel tego pliku

Ten plik jest mostem między repo aplikacji a Obsidianem.

Repo mówi, co jest źródłem kodu i pracy technicznej. Obsidian pokazuje Damianowi czytelny mózg projektu.

## Sekcja Obsidiana

`10_PROJEKTY/Sklep_projekty_domow/`

## Mapowanie repo → Obsidian

- `_project/01_PROJECT_GOAL.md` → `01_KIERUNEK - Sklep projekty domow.md`
- `_project/04_DECISIONS.md` → `02_DECYZJE - Sklep projekty domow.md`
- `_project/03_CURRENT_STAGE.md` → `03_ETAPY - Sklep projekty domow.md`
- `_project/05_MANUAL_TESTS.md` → `04_TESTY - Sklep projekty domow.md`
- `_project/06_GUARDS_AND_TESTS.md` → `05_GUARDY - Sklep projekty domow.md`
- `_project/10_PROJECT_TIMELINE.md` i `_project/history/` → `06_HISTORIA - Sklep projekty domow.md`
- `_project/07_NEXT_STEPS.md` → `07_NASTEPNY_KROK - Sklep projekty domow.md`
- `_project/02_WORK_RULES.md` + `AGENTS.md` → `08_ZASADY - Sklep projekty domow.md`
- `_project/11_USER_CONFIRMED_TESTS.md` → `09_POTWIERDZONE_TESTY - Sklep projekty domow.md`
- `_project/runs/` → `_RAPORTY_AI/`

## Zasada synchronizacji

Po każdej istotnej zmianie w repo trzeba zaktualizować odpowiadające pliki Obsidiana.

Nie zostawiać rozjazdu: repo mówi jedno, Obsidian drugie.
<!-- SKLEP_PROJEKTY_DOMOW_MEMORY_V1_END -->

