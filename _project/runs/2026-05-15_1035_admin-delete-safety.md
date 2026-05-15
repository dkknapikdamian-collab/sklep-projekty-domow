# Run report — 2026-05-15 1035 — Etap 9: admin delete safety

## Cel

Zabezpieczyć trwałe usuwanie projektu przed przypadkowym kliknięciem.

## Zakres

- `components/admin/AdminProjectDeleteForm.tsx`
- `components/admin/AdminProjectsTable.tsx`
- `app/admin/projekty/[id]/edytuj/page.tsx`
- `app/admin/projekty/actions.ts`
- `lib/admin/projects-admin.ts`
- `lib/admin/order-files.ts`
- `scripts/check-admin-buttons-v19.cjs`
- `app/admin-v8.css`

## Zmiany

- Formularz usuwania wymaga wpisania kodu projektu.
- Przycisk usuwania jest zablokowany bez poprawnego kodu.
- Server action ponownie pobiera projekt i waliduje kod po stronie serwera.
- Projekt `active` pokazuje dodatkowe ostrzeżenie w strefie usuwania.
- Naprawiono typ `AdminProjectFileItem.bucket` po Etapie 8.
- Naprawiono zawężenie nullable `supabase` w `lib/admin/order-files.ts`.

## Czego nie zmieniono

- Nie zmieniano routingu.
- Nie zmieniano publicznych stron.
- Nie zmieniano całego auth.
- Nie zmieniano delete na archived-first.

## Checki

Do uruchomienia w paczce:

- `npm run verify:admin-project-media-v34`
- `npm run verify:project-media-controls-v34`
- `npm run verify:admin-buttons-v19`
- `npm run typecheck`
- `npm run build`
- `npm run check:project-memory`

## Ryzyka

- Nadal istnieje fizyczne delete. Opcja archived-first powinna być osobnym etapem, jeśli chcemy praktycznie wyeliminować trwałe usuwanie z codziennego panelu.
