# 09_CONTEXT_FOR_OBSIDIAN — indeks projektu

## Projekt

`sklep-projekty-domow`

## Typ

Aplikacja webowa / sklep-katalog projektów domów.

## Krótki opis

Repo dla sklepu z projektami domów. Publiczna część obejmuje stronę główną, katalog, kartę projektu, koszyk i checkout. Dane projektów mają pochodzić z realnego źródła danych oraz panelu admina, bez aktywnych fikcyjnych ofert.

## Aktualny etap

Etap 1: Audyt i stabilizacja akcji panelu admina.

## Ostatnia ważna zmiana

2026-05-14 22:35 Europe/Warsaw: wykonano audyt akcji panelu admina i zaostrzono guard `verify:admin-buttons-v19`.

Najważniejsze ustalenie: guard nie może przechodzić na podstawie komentarza w stronie edycji. Ma sprawdzać realny komponent `components/admin/AdminProjectEditForm.tsx` oraz realne akcje w tabeli projektów.

## Najważniejsze pliki

- `../AGENTS.md`
- `00_PROJECT_STATUS.md`
- `01_PROJECT_GOAL.md`
- `02_WORK_RULES.md`
- `03_CURRENT_STAGE.md`
- `04_DECISIONS.md`
- `05_MANUAL_TESTS.md`
- `06_GUARDS_AND_TESTS.md`
- `07_NEXT_STEPS.md`
- `08_CHANGELOG_AI.md`
- `runs/`

## Pliki techniczne ważne dla panelu admina

- `../app/admin/page.tsx`
- `../app/admin/projekty/page.tsx`
- `../app/admin/projekty/[id]/edytuj/page.tsx`
- `../app/admin/projekty/actions.ts`
- `../components/admin/AdminProjectsListClient.tsx`
- `../components/admin/AdminProjectsTable.tsx`
- `../components/admin/AdminProjectEditForm.tsx`
- `../components/admin/AdminProjectDeleteForm.tsx`
- `../components/admin/AdminSubmitButton.tsx`
- `../scripts/check-admin-buttons-v19.cjs`

## Następny praktyczny krok

Ręczny test w przeglądarce:

- wejście w edycję projektu,
- zapis projektu,
- anulowanie edycji,
- zmiana statusu na draft/active,
- usunięcie testowego projektu po confirm,
- sprawdzenie komunikatów po powrocie na listę.

## Uwaga

Obsidian jest tylko indeksem/dashboardem. Źródłem prawdy pozostaje repo.
