# 09_CONTEXT_FOR_OBSIDIAN - indeks projektu

## Projekt

`sklep-projekty-domow`

## Aktualny etap

Etap 16: Robocze e-maile do klienta bez automatycznej wysyłki.

## Ostatnia ważna zmiana

2026-05-15 20:45 Europe/Warsaw: na stronie `/admin/zamowienia/[id]` dodano trzy robocze e-maile do ręcznego skopiowania: potwierdzenie zamówienia, płatność potwierdzona i wysyłka plików.

## Najważniejsze ustalenia

- system generuje tylko treść,
- admin kopiuje i wysyła ręcznie,
- nie ma SMTP, Resend, Mailgun ani automatycznej wysyłki,
- drafty używają danych zamówienia,
- etap nie rusza płatności, checkoutu ani signed URL.

## Pliki techniczne ważne dla Etapu 16

- `../lib/admin/order-email-drafts.ts`
- `../app/admin/zamowienia/[id]/page.tsx`
- `../scripts/check-manual-email-drafts-v47.cjs`

## Uwaga

Obsidian jest tylko indeksem/dashboardem. Źródłem prawdy pozostaje repo.
