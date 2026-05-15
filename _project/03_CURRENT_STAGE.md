# 03_CURRENT_STAGE — aktualny etap

Ostatnia aktualizacja: 2026-05-14 22:35 Europe/Warsaw

## Aktualny etap

Etap 1: Audyt i stabilizacja akcji panelu admina

## Status etapu

Zakończony kodowo po statycznym audycie repo i aktualizacji guarda `verify:admin-buttons-v19`.

## Cel etapu

Zmapować widoczne akcje panelu admina i upewnić się, że kluczowe przepływy `edit / save / cancel / status / delete` nie są tylko przyciskami dekoracyjnymi, ale mają realne linki, formularze albo server actions.

## Zakres

- Lista projektów admina.
- Edycja projektu admina.
- Formularze zmiany statusu.
- Formularze usuwania projektu.
- Guard odpowiedzialny za akcje admina.
- Pamięć projektu i raport run.

## Pliki dotknięte w tym etapie

- `components/admin/AdminProjectsTable.tsx`
- `components/admin/AdminProjectDeleteForm.tsx`
- `components/admin/AdminProjectEditForm.tsx`
- `app/admin/projekty/[id]/edytuj/page.tsx`
- `scripts/check-admin-buttons-v19.cjs`
- `_project/03_CURRENT_STAGE.md`
- `_project/05_MANUAL_TESTS.md`
- `_project/06_GUARDS_AND_TESTS.md`
- `_project/07_NEXT_STEPS.md`
- `_project/08_CHANGELOG_AI.md`
- `_project/09_CONTEXT_FOR_OBSIDIAN.md`
- `_project/runs/2026-05-14_2235_admin-action-audit.md`

## Co zostało zrobione

- Zmapowano główne akcje panelu admina.
- Dodano jawne markery `data-admin-action` do realnych akcji listy projektów, edycji, zmiany statusu i usuwania.
- Usunięto fałszywy legacy marker z komentarza w stronie edycji projektu.
- Zaostrzono guard `check-admin-buttons-v19.cjs`, żeby sprawdzał realny formularz edycji, a nie komentarz.
- Nie zmieniano stylu wizualnego.
- Nie zmieniano routingu.
- Nie zmieniano modelu danych.

## Czego nie ruszano

- Nie przebudowywano panelu admina.
- Nie zmieniano CSS.
- Nie zmieniano publicznego katalogu ani karty projektu.
- Nie zmieniano koszyka ani checkoutu.
- Nie dodawano fikcyjnych projektów.

## Znane problemy / ryzyka

- Audyt był statyczny po repo. Ręczny test w przeglądarce nadal jest wymagany.
- Nie wykonano runtime testu Supabase, więc status/delete/save trzeba potwierdzić na realnym projekcie testowym albo roboczym szkicu.
- Część akcji mediów w edycji działa przez `formAction` w tym samym formularzu edycji; wymaga ręcznego sprawdzenia, czy nie koliduje z zapisem całego formularza.

## Następny krok

Ręcznie sprawdzić panel admina w przeglądarce: wejście w edycję z listy, zapis danych, anulowanie, zmiana statusu na draft/active, usuwanie projektu oraz komunikaty po powrocie na listę.
