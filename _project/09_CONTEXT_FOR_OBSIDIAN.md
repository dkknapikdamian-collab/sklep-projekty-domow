# 09_CONTEXT_FOR_OBSIDIAN - indeks projektu

## Projekt

`sklep-projekty-domow`

## Aktualny etap

Etap 19: Filtry i priorytetyzacja zamówień w adminie.

## Ostatnia ważna zmiana

2026-05-15 21:45 Europe/Warsaw: `/admin/zamowienia` dostało panel szybkich liczników, filtry i priorytety operacyjne. Admin ma szybciej zobaczyć, które zamówienia wymagają kontaktu, czekają na płatność albo są do wysyłki.

## Najważniejsze ustalenia

- V1 działa na płatności manualnej,
- nie ma Stripe/PayU,
- status `paid_manual` oznacza ręcznie potwierdzoną płatność,
- dane do płatności są częścią roboczego e-maila,
- system nadal niczego sam nie wysyła,
- lista zamówień ma priorytetyzować pracę admina, ale nie ma być ciężkim CRM.

## Pliki techniczne ważne dla Etapu 19

- `../app/admin/zamowienia/page.tsx`
- `../lib/admin/orders-admin.ts`
- `../app/admin-v8.css`
- `../scripts/check-admin-orders-v42.cjs`

## Checki wymagane po Etapie 19

```powershell
npm run verify:admin-orders-v42
npm run typecheck
npm run build
npm run check:project-memory
```

## Uwaga

Obsidian jest tylko indeksem/dashboardem. Źródłem prawdy pozostaje repo.
