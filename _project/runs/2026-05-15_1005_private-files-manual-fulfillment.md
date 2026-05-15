# Run report - 2026-05-15 10:05 - Etap 8: pliki prywatne i dostawa ręczna

## Cel

Pokazać w panelu zamówień, jakie prywatne pliki są przypięte do projektu, czy zamówienie zawiera dodatek PDF na e-mail i co admin ma wysłać klientowi po potwierdzeniu płatności.

## Zakres

- `app/admin/zamowienia/page.tsx`
- `lib/admin/orders-admin.ts`
- `lib/admin/order-files.ts`
- `lib/admin/projects-admin.ts`
- `components/admin/AdminProjectMediaManager.tsx`
- `scripts/check-admin-orders-v42.cjs`
- `scripts/check-admin-project-media-v34.cjs`
- `app/admin-v8.css`
- pliki pamięci projektu

## Wykonane

- Dodano pobieranie prywatnych plików projektów dla pozycji zamówienia.
- Dodano widok prywatnych plików w szczegółach zamówienia.
- Dodano wykrywanie dodatku PDF na e-mail.
- Dodano instrukcję wysyłki i checklistę realizacji ręcznej.
- Utrzymano brak automatycznych linków czasowych, mailingu i płatności.

## Checki uruchamiane przez skrypt wdrożeniowy

```powershell
npm run verify:admin-project-media-v34
npm run verify:project-media-controls-v34
npm run verify:admin-orders-v42
npm run typecheck
npm run build
npm run check:project-memory
```

## Ryzyka

- Checklisty są statyczną instrukcją, nie zapisem stanu realizacji w bazie.
- Brak prywatnych plików przy projekcie oznacza, że admin musi je uzupełnić przed ręczną wysyłką.
- Automatyczna dostawa, maile i płatności pozostają poza zakresem.
