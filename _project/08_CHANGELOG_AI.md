## 2026-05-15 21:55 - Hotfix: marker `Fakt` i zasada ZIP/jedno polecenie

- Naprawiono niespĂłjnoĹ›Ä‡ guardu pamiÄ™ci projektu: `scripts/check-project-memory.cjs` wymaga markera `Fakt`, a `AGENTS.md` miaĹ‚ tylko wersjÄ™ `FAKT`.
- Dodano jawny marker zgodnoĹ›ci guardu: `Fakt / Decyzja / Hipoteza / Do potwierdzenia`.
- Dopisano zasadÄ™ pracy ChatGPT/operatora paczek: ZIP + jedno kompletne polecenie PowerShell, bez samodzielnego pushowania przez ChatGPT.
- Ten hotfix nie zmienia kodu aplikacji, routingu, UI sklepu ani Etapu 19.

### Testy wymagane

```powershell
npm run verify:admin-orders-v42
npm run typecheck
npm run build
npm run check:project-memory
```

# 08_CHANGELOG_AI - Changelog AI


## 2026-05-15 21:45 - Etap 19: Filtry i priorytetyzacja zamówień w adminie

- Dodano panel szybkich liczników na `/admin/zamowienia`: `Wymaga kontaktu`, `Czeka na płatność`, `Do wysyłki`.
- Dodano filtrowanie zamówień po statusie: `new`, `contacted`, `paid_manual`, `sent`, `cancelled`.
- Dodano filtrowanie po płatności: instrukcja ustawiona / brak instrukcji.
- Dodano filtrowanie po realizacji: PDF wysłany / ZIP wysłany / zamknięte.
- Dodano filtrowanie po szybkim oznaczeniu: wymaga kontaktu / czeka na płatność / do wysyłki.
- Dodano oznaczenia na karcie zamówienia: priorytet, instrukcja płatności, PDF, ZIP, status zamknięcia.
- Dodano helpery priorytetu w `lib/admin/orders-admin.ts`.
- Zaktualizowano guard `verify:admin-orders-v42`, żeby pilnował filtrów, priorytetów i braku automatyzacji płatności/wysyłki.
- Nie dodano CRM, Stripe, PayU, automatycznej wysyłki ani automatycznego księgowania.

### Pliki zmienione

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

### Testy / guardy

Do uruchomienia lokalnie:

```powershell
npm run verify:admin-orders-v42
npm run typecheck
npm run build
npm run check:project-memory
```

### Ograniczenie

Zmiana została wykonana przez GitHub API. W tym środowisku nie było dostępu do zwykłego `git clone`/`npm`, więc nie udaję lokalnego wyniku testów.

## 2026-05-15 21:15 - Etap 17: Płatność manualna / instrukcja przelewu

- Checkout informuje, że płatność odbywa się po kontakcie i bez automatycznej płatności online.
- Dodano migrację `supabase/migrations/0018_order_manual_payment_instruction.sql`.
- Dodano pole `payment_instruction` do `order_fulfillment_checklist`.
- Dodano zapis instrukcji przelewu w `updateOrderFulfillmentChecklistAction`.
- Dodano pole `Instrukcja przelewu` na `/admin/zamowienia/[id]`.
- Roboczy e-mail `E-mail: potwierdzenie zamówienia` zawiera dane do płatności.
- Dodano guard `verify:manual-payment-v48`.
- Nie dodano Stripe, PayU, automatycznego księgowania ani automatycznej wysyłki.

### Pliki zmienione

- `components/order/CheckoutForm.tsx`
- `app/zamowienie/page.tsx`
- `app/admin/zamowienia/[id]/page.tsx`
- `app/admin/zamowienia/actions.ts`
- `lib/admin/orders-admin.ts`
- `lib/admin/order-email-drafts.ts`
- `supabase/migrations/0018_order_manual_payment_instruction.sql`
- `app/admin-v8.css`
- `scripts/check-manual-payment-v48.cjs`
- `package.json`
- `_project/03_CURRENT_STAGE.md`
- `_project/05_MANUAL_TESTS.md`
- `_project/06_GUARDS_AND_TESTS.md`
- `_project/07_NEXT_STEPS.md`
- `_project/08_CHANGELOG_AI.md`
- `_project/09_CONTEXT_FOR_OBSIDIAN.md`
- `_project/10_PROJECT_TIMELINE.md`
- `_project/runs/2026-05-15_2115_manual-payment-instructions.md`

### Testy / guardy

```powershell
npm run verify:manual-payment-v48
npm run verify:cart-order-v38
npm run verify:admin-orders-v42
npm run typecheck
npm run build
npm run check:project-memory
```

## 2026-05-15 - Pełny mózg projektu sklepu

### Co zmieniono

Uzupełniono pełną pamięć projektu `Sklep z projektami domów` w repo aplikacji i przygotowano synchronizację z Obsidianem.

### Gdzie

Repo aplikacji:

- `AGENTS.md`,
- `_project/00_PROJECT_STATUS.md`,
- `_project/01_PROJECT_GOAL.md`,
- `_project/02_WORK_RULES.md`,
- `_project/03_CURRENT_STAGE.md`,
- `_project/04_DECISIONS.md`,
- `_project/05_MANUAL_TESTS.md`,
- `_project/06_GUARDS_AND_TESTS.md`,
- `_project/07_NEXT_STEPS.md`,
- `_project/08_CHANGELOG_AI.md`,
- `_project/09_CONTEXT_FOR_OBSIDIAN.md`,
- `_project/10_PROJECT_TIMELINE.md`,
- `_project/11_USER_CONFIRMED_TESTS.md`,
- `_project/runs/2026-05-15_1900_sklep-pelny-mozg-projektu.md`,
- `scripts/check-project-memory.cjs`,
- `package.json` przez skrypt wdrożeniowy: dodanie `check:project-memory`, jeśli brak.

Obsidian:

- `10_PROJEKTY/Sklep_projekty_domow/00_START - Sklep projekty domow.md`,
- `10_PROJEKTY/Sklep_projekty_domow/01_KIERUNEK I ZAKRES - Sklep projekty domow.md`,
- `10_PROJEKTY/Sklep_projekty_domow/02_STAN OBECNY - Sklep projekty domow.md`,
- `10_PROJEKTY/Sklep_projekty_domow/03_DECYZJE - Sklep projekty domow.md`,
- `10_PROJEKTY/Sklep_projekty_domow/04_ETAPY I WDROZENIA - Sklep projekty domow.md`,
- `10_PROJEKTY/Sklep_projekty_domow/05_TESTY RECZNE - Sklep projekty domow.md`,
- `10_PROJEKTY/Sklep_projekty_domow/06_GUARDY I TESTY AUTOMATYCZNE - Sklep projekty domow.md`,
- `10_PROJEKTY/Sklep_projekty_domow/07_POTWIERDZENIA DAMIANA - Sklep projekty domow.md`,
- `10_PROJEKTY/Sklep_projekty_domow/08_HISTORIA I ZMIANY KIERUNKU - Sklep projekty domow.md`,
- `10_PROJEKTY/Sklep_projekty_domow/09_NASTEPNY KROK - Sklep projekty domow.md`,
- `10_PROJEKTY/Sklep_projekty_domow/10_ZASADY PROJEKTU - Sklep projekty domow.md`,
- raport AI w `_RAPORTY_AI/`.

### Testy

Do uruchomienia przez skrypt wdrożeniowy:

```bash
node scripts/check-project-memory.cjs
npm run check:project-memory
npm run typecheck
npm run build
```

### Ryzyka

- Ten etap nie naprawia funkcji aplikacji.
- Aktualny stan checkoutu/admina trzeba potwierdzić na repo po wdrożeniu.
- Jeśli istnieją wcześniejsze dokumenty z ważnymi niuansami, są backupowane przez skrypt w `_project/history/`.

### Raport

`_project/runs/2026-05-15_1900_sklep-pelny-mozg-projektu.md`

