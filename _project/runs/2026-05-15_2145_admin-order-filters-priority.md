# Raport AI - Etap 19: Filtry i priorytetyzacja zamówień w adminie

Data: 2026-05-15 21:45 Europe/Warsaw
Repo: `dkknapikdamian-collab/sklep-projekty-domow`
Branch: `main`

## Cel

Panel `/admin/zamowienia` ma przestać być tylko listą. Admin ma widzieć, co wymaga reakcji jako pierwsze.

## Zakres wykonany

### 1. Priorytety zamówień

Dodano helpery w `lib/admin/orders-admin.ts`:

- `getAdminOrderPriorityFlags`,
- `getAdminOrderPriorityRank`,
- filtry i etykiety dla płatności, realizacji i szybkich oznaczeń.

Priorytety operacyjne:

- `requiresContact` - nowe zamówienie wymagające kontaktu,
- `waitingPayment` - zamówienie po kontakcie albo z instrukcją płatności, ale bez potwierdzenia płatności,
- `readyToSend` - płatność potwierdzona, ale PDF/ZIP nie są kompletnie wysłane.

### 2. UI listy zamówień

Na `/admin/zamowienia` dodano:

- panel szybkich liczników:
  - `Wymaga kontaktu`,
  - `Czeka na płatność`,
  - `Do wysyłki`,
- filtry:
  - status zamówienia: `new`, `contacted`, `paid_manual`, `sent`, `cancelled`,
  - płatność: instrukcja ustawiona / brak instrukcji,
  - realizacja: PDF wysłany / ZIP wysłany / zamknięte,
  - szybkie oznaczenie: wymaga kontaktu / czeka na płatność / do wysyłki,
- pusty stan dla filtrów bez wyników,
- oznaczenia na kartach zamówień.

### 3. Style

Dodano sekcję CSS:

`STAGE49 ADMIN ORDER FILTERS AND PRIORITY`

w `app/admin-v8.css`.

### 4. Guard

Zaktualizowano `scripts/check-admin-orders-v42.cjs`.

Guard pilnuje teraz:

- markerów filtrów,
- markerów panelu priorytetów,
- helperów priorytetów,
- list filtrów,
- braku automatycznych płatności i automatycznej wysyłki.

## Pliki zmienione

- `app/admin/zamowienia/page.tsx`
- `lib/admin/orders-admin.ts`
- `app/admin-v8.css`
- `scripts/check-admin-orders-v42.cjs`
- `_project/03_CURRENT_STAGE.md`
- `_project/05_MANUAL_TESTS.md`
- `_project/06_GUARDS_AND_TESTS.md`
- `_project/07_NEXT_STEPS.md`
- `_project/08_CHANGELOG_AI.md`
- `_project/09_CONTEXT_FOR_OBSIDIAN.md`
- `_project/10_PROJECT_TIMELINE.md`
- `_project/runs/2026-05-15_2145_admin-order-filters-priority.md`

## Czego nie zmieniono

- Nie dodano Stripe.
- Nie dodano PayU.
- Nie dodano automatycznej wysyłki PDF/ZIP.
- Nie dodano automatycznego księgowania.
- Nie przebudowano szczegółu zamówienia w CRM.
- Nie zmieniano routingu zamówień.

## Testy wymagane lokalnie

```powershell
npm run verify:admin-orders-v42
npm run typecheck
npm run build
npm run check:project-memory
```

## Test ręczny wymagany

1. Wejść do `/admin/zamowienia`.
2. Sprawdzić liczniki: wymaga kontaktu / czeka na płatność / do wysyłki.
3. Sprawdzić wszystkie filtry.
4. Sprawdzić pusty stan filtra bez wyników.
5. Sprawdzić przejście do szczegółu zamówienia z filtrowanej listy.

## Wynik w tym środowisku

Zmiany wykonano przez GitHub API i wypchnięto na `main`.

Nie uruchomiono lokalnie `npm run verify:admin-orders-v42`, `npm run typecheck`, `npm run build`, ponieważ środowisko tej odpowiedzi nie miało dostępu do zwykłego `git clone`/npm repo. Nie udaję przejścia testów.

## Ryzyka

- Typecheck/build trzeba potwierdzić lokalnie.
- Filtry są logiczne na podstawie istniejących statusów i checklisty, ale realne dane Supabase mogą ujawnić przypadki brzegowe.
- Priorytet `Do wysyłki` zakłada, że płatność potwierdzona plus brak PDF albo ZIP oznacza pracę do wykonania. Jeśli w praktyce nie każde zamówienie wymaga obu formatów, trzeba doprecyzować regułę w kolejnym etapie.
