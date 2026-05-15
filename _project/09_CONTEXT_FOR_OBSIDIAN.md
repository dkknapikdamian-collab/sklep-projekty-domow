# 09_CONTEXT_FOR_OBSIDIAN - indeks projektu

## Projekt

`sklep-projekty-domow`

## Aktualny etap

Etap 14: Osobna strona szczegółów zamówienia `/admin/zamowienia/[id]`.

## Ostatnia ważna zmiana

2026-05-15 19:05 Europe/Warsaw: lista zamówień została rozdzielona od obsługi zamówienia. `/admin/zamowienia` jest listą, a operacyjna obsługa konkretnego zamówienia jest na `/admin/zamowienia/[id]`.

## Najważniejsze ustalenia

- lista zamówień nie powinna rosnąć w nieskończoność,
- status, pliki, PDF na e-mail i checklisty są na stronie szczegółu,
- brak trwałej notatki admina bez migracji,
- nie dodano automatycznych maili, płatności, signed URL ani automatycznej wysyłki.

## Pliki techniczne ważne dla Etapu 14

- `../app/admin/zamowienia/page.tsx`
- `../app/admin/zamowienia/[id]/page.tsx`
- `../lib/admin/orders-admin.ts`
- `../scripts/check-admin-orders-v42.cjs`
- `../app/admin-v8.css`

## Uwaga

Obsidian jest tylko indeksem/dashboardem. Źródłem prawdy pozostaje repo.
