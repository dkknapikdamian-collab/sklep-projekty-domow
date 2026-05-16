# Production readiness V1 - Etap 29

Data: 2026-05-16

## Cel

Etap 29 jest finalna bramka pre-release V1. Nie dodaje nowych funkcji sprzedażowych. Sprawdza, czy po etapach 22-28 można powiedzieć, że V1 nadaje się do testowej sprzedaży realnego projektu domu.

## Najważniejsze rozróżnienie

Checkout / zamówienie działa zgodnie z aktualnym V1 nie oznacza:

- automatycznych płatności online,
- Stripe/PayU,
- płatności ręcznej jako nowego kierunku,
- faktur,
- automatycznej wysyłki dokumentacji,
- panelu klienta.

Te rzeczy są poza zakresem Etapu 29, jeśli nie zostały wcześniej osobno wdrożone i potwierdzone.

## Pliki etapu

- `_project/16_PRODUCTION_READINESS_CHECKLIST.md`
- `scripts/check-production-readiness-v52.cjs`
- `README.md`
- `docs/production-readiness-v1.md`
- `_project/runs/2026-05-16_1500_etap29_pre_release_checklist_v1.md`

## Guard

```powershell
npm run verify:production-readiness-v52
```

Guard sprawdza istnienie checklisty, statusy, wymagane punkty, wpisy dokumentacyjne i brak fikcyjnych publicznych obietnic automatyzacji.

## Runtime test Damiana

Status: TEST RĘCZNY DO WYKONANIA.

Ścieżka:

```txt
realny projekt active -> karta projektu -> koszyk -> checkout/zamówienie -> admin zamówień -> audit log -> checklist -> Obsidian
```

## Warunek zamknięcia

Etap można zamknąć dopiero, gdy:

- guard V52 przejdzie lokalnie,
- pełne `npm run verify` przejdzie lokalnie,
- build przejdzie lokalnie,
- Damian potwierdzi test ręczny albo status pozostanie jawnie oznaczony jako brak potwierdzenia,
- Obsidian jest zaktualizowany.