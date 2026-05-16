## 2026-05-15 22:45 - Hotfix v5: audit guard i memory check

- Dopasowano opis kafla `Audit` na dashboardzie do wymaganego markera `Ĺ›lad operacji`.
- Dodano/exportowano `actionLabel` w `lib/admin/audit-log.ts`.
- Ustabilizowano `scripts/check-project-memory.cjs`, ĹĽeby nie wymuszaĹ‚ markerĂłw konkretnego poprzedniego etapu.
- Dodano raport `_project/runs/2026-05-15_2245_audit-guard-memory-hotfix-v5.md`.
- Zakres: hotfix guardĂłw i pamiÄ™ci projektu, bez zmiany mechanizmu auth ani logiki operacji admina.


## 2026-05-15 22:45 - Hotfix v4: Etap 20 audit guard + project memory

- Dodano `actionLabel` do `lib/admin/audit-log.ts`, zeby `verify:admin-audit-log-v44` przechodzil zgodnie z guardem.
- Poprawiono `scripts/check-project-memory.cjs`, zeby akceptowal aktualny Etap 20 zamiast sztywno wymagac markerow Etapu 19.
- Skrypt paczki v4 commit/push wykonuje dopiero po zielonych checkach.
- Ten hotfix nie zmienia publicznych stron ani logiki operacji admina.

## 2026-05-15 22:20 - Etap 20: Widok audit logu `/admin/audit`

- Dodano stronę `/admin/audit`.
- Dodano odczyt wpisów z tabeli `admin_audit_log`.
- Dodano filtrowanie audit logu po typie akcji.
- Dodano tabelę: data, admin, akcja, typ encji, ID encji, skrót metadata.
- Dodano link `Audit` w `AdminHeader`.
- Dodano kafel `Audit` na dashboardzie admina.
- Rozszerzono guard `verify:admin-audit-log-v44`, żeby pilnował widoku audit logu.
- Nie zmieniono mechanizmu auth, logiki operacji admina ani publicznych stron.

### Pliki zmienione

- `lib/admin/audit-log.ts`
- `app/admin/audit/page.tsx`
- `components/admin/AdminHeader.tsx`
- `app/admin/page.tsx`
- `app/admin-v8.css`
- `scripts/check-admin-audit-log-v44.cjs`
- `_project/03_CURRENT_STAGE.md`
- `_project/05_MANUAL_TESTS.md`
- `_project/06_GUARDS_AND_TESTS.md`
- `_project/07_NEXT_STEPS.md`
- `_project/08_CHANGELOG_AI.md`
- `_project/09_CONTEXT_FOR_OBSIDIAN.md`
- `_project/10_PROJECT_TIMELINE.md`
- `_project/runs/2026-05-15_2220_admin-audit-view.md`

### Testy wymagane

```powershell
npm run verify:admin-audit-log-v44
npm run typecheck
npm run build
npm run check:project-memory
```


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

## 2026-05-15 20:49 - Aktualizacja globalnych zasad AGENTS.md

- Podmieniono plik `AGENTS.md` na nowy blok globalnych zasad dla Codexa/Damiana.
- Zakres zmiany: wyłącznie dokumentacja zasad pracy i pamięci projektu.
- Nie zmieniono kodu aplikacji, guardów ani logiki biznesowej.

<!-- SKLEP_FULL_MEMORY_OBSIDIAN_REPO_V6_2026_05_15 START -->

## 2026-05-15 22:12:34 - full memory + Obsidian + naming audit V6

- Appended project rules to AGENTS.md without replacing existing content.
- Updated _project/ memory files.
- Added implementation ledger and test history entries.
- Added memory guard scripts/check-sklep-full-memory-v6.cjs.
- Updated Obsidian dashboard and naming audit.

<!-- SKLEP_FULL_MEMORY_OBSIDIAN_REPO_V6_2026_05_15 END -->


<!-- ETAP21_ADMIN_AUDIT_REAL_COVERAGE_2026_05_16 -->

## 2026-05-16 - Etap 21: realne domkniecie audit logu admina

FAKT:
- Dodano realne markery i pokrycie audit logu dla brakujacych mutacji admina:
  - project_create,
  - project_sample_create,
  - project_media_delete,
  - project_media_type_update,
  - project_private_file_delete.
- Guard statyczny verify:admin-audit-log-v44 ma sprawdzac nie tylko widok /admin/audit, ale tez realne markery implementacji w akcjach admina.

TEST RÄCZNY DO WYKONANIA:
- Runtime audit w /admin/audit po realnych operacjach admina: utworzenie projektu, sample project, media delete/type update, private file delete.

BRAK POTWIERDZONEGO TESTU:
- Do momentu klikniecia flow lokalnie przez Damiana runtime wpisy w admin_audit_log pozostaja niepotwierdzone.

## 2026-05-16 - Etap 21 real audit coverage V6

FAKT: dodano i zweryfikowano statycznie realne markery audit logu dla brakujących mutacji admina.
TEST RĘCZNY DO WYKONANIA: runtime audit w /admin/audit po realnych operacjach admina.
