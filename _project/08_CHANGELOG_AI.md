# 08_CHANGELOG_AI — changelog pracy AI



## 2026-05-15 20:45 - Etap 16: Robocze e-maile do klienta

- Dodano `lib/admin/order-email-drafts.ts`.
- Dodano generator trzech roboczych e-maili:
  - `E-mail: potwierdzenie zamówienia`,
  - `E-mail: płatność potwierdzona`,
  - `E-mail: wysyłka plików`.
- Dodano sekcję `Robocze e-maile do klienta` na `/admin/zamowienia/[id]`.
- Każdy draft ma temat i treść w polach `readOnly`.
- Dodano style `STAGE47 MANUAL ORDER EMAIL DRAFTS`.
- Dodano guard `verify:manual-email-drafts-v47`.
- Nie dodano SMTP, Resend, Mailgun, automatycznego mailingu ani signed URL.

### Pliki zmienione

- `lib/admin/order-email-drafts.ts`
- `app/admin/zamowienia/[id]/page.tsx`
- `app/admin-v8.css`
- `scripts/check-manual-email-drafts-v47.cjs`
- `package.json`
- `_project/03_CURRENT_STAGE.md`
- `_project/05_MANUAL_TESTS.md`
- `_project/06_GUARDS_AND_TESTS.md`
- `_project/07_NEXT_STEPS.md`
- `_project/08_CHANGELOG_AI.md`
- `_project/09_CONTEXT_FOR_OBSIDIAN.md`
- `_project/10_PROJECT_TIMELINE.md`
- `_project/runs/2026-05-15_2045_manual-email-drafts.md`

### Testy / guardy

```powershell
npm run verify:manual-email-drafts-v47
npm run typecheck
npm run build
npm run check:project-memory
```

## 2026-05-15 20:10 - Etap 15B: Utrwalona checklista realizacji zamówienia

- Dodano migrację `supabase/migrations/0017_order_fulfillment_checklist.sql`.
- Dodano tabelę `order_fulfillment_checklist`.
- Dodano pola realizacji:
  - `payment_confirmed`,
  - `pdf_sent`,
  - `zip_sent`,
  - `order_closed`,
  - `internal_note`,
  - `updated_at`.
- Rozszerzono `lib/admin/orders-admin.ts` o pobieranie i zapis checklisty.
- Dodano server action `updateOrderFulfillmentChecklistAction`.
- Strona `/admin/zamowienia/[id]` zapisuje checkboxy realizacji i notatkę admina.
- Dodano audit log `order_fulfillment_checklist_update`.
- Zaktualizowano guard `verify:admin-orders-v42`.
- Nie zmieniano automatycznej wysyłki, płatności ani signed URL.

### Pliki zmienione

- `app/admin/zamowienia/[id]/page.tsx`
- `app/admin/zamowienia/actions.ts`
- `lib/admin/orders-admin.ts`
- `supabase/migrations/0017_order_fulfillment_checklist.sql`
- `app/admin-v8.css`
- `scripts/check-admin-orders-v42.cjs`
- `_project/03_CURRENT_STAGE.md`
- `_project/05_MANUAL_TESTS.md`
- `_project/06_GUARDS_AND_TESTS.md`
- `_project/07_NEXT_STEPS.md`
- `_project/08_CHANGELOG_AI.md`
- `_project/09_CONTEXT_FOR_OBSIDIAN.md`
- `_project/10_PROJECT_TIMELINE.md`
- `_project/runs/2026-05-15_2010_order-fulfillment-checklist-persistent.md`

### Testy / guardy

```powershell
npm run verify:admin-orders-v42
npm run typecheck
npm run build
npm run check:project-memory
```


## 2026-05-15 19:35 - Etap 15: Dopasowanie panelu awaryjnego usunięcia

- Zmieniono etykietę `Awaryjne` na `Awaryjne usunięcie`.
- Skrócono teksty w czerwonym panelu, żeby mieściły się w tabeli.
- Zmieniono nagłówek panelu na `Trwałe usunięcie`.
- Dodano CSS `STAGE45 ADMIN PROJECT EMERGENCY DELETE PANEL FIT`.
- Panel awaryjnego delete w tabeli ma mniejszą szerokość, padding, font i input.
- Wymuszono zawijanie tekstów w panelu, żeby nie dziedziczył jednowierszowego zachowania tabeli.
- Zaktualizowano `verify:admin-buttons-v19`.

### Pliki zmienione

- `components/admin/AdminProjectDeleteForm.tsx`
- `app/admin-v8.css`
- `scripts/check-admin-buttons-v19.cjs`
- `_project/03_CURRENT_STAGE.md`
- `_project/05_MANUAL_TESTS.md`
- `_project/06_GUARDS_AND_TESTS.md`
- `_project/07_NEXT_STEPS.md`
- `_project/08_CHANGELOG_AI.md`
- `_project/09_CONTEXT_FOR_OBSIDIAN.md`
- `_project/10_PROJECT_TIMELINE.md`
- `_project/runs/2026-05-15_1935_admin-emergency-delete-panel-fit.md`

### Testy / guardy

```powershell
npm run verify:admin-buttons-v19
npm run verify:admin-project-list-compact-v41
npm run typecheck
npm run build
npm run check:project-memory
```


## 2026-05-15 19:05 - Etap 14: Strona szczegółów zamówienia

- Dodano dedykowaną stronę `/admin/zamowienia/[id]`.
- Uproszczono `/admin/zamowienia` do listy zamówień z linkiem `Obsłuż zamówienie`.
- Przeniesiono operacyjną obsługę zamówienia na stronę szczegółu:
  - dane klienta,
  - pozycje,
  - warianty,
  - dodatki,
  - pliki prywatne,
  - PDF na e-mail,
  - checklistę realizacji,
  - zmianę statusu.
- Dodano `getAdminOrderById` w `lib/admin/orders-admin.ts`.
- Dodano style `STAGE44 ADMIN ORDER DETAIL`.
- Zaktualizowano guard `verify:admin-orders-v42`.
- Nie dodano automatycznych maili, płatności, signed URL ani automatycznej wysyłki.

### Pliki zmienione

- `app/admin/zamowienia/page.tsx`
- `app/admin/zamowienia/[id]/page.tsx`
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
- `_project/runs/2026-05-15_1905_admin-order-detail-page.md`

### Testy / guardy

```powershell
npm run verify:admin-orders-v42
npm run typecheck
npm run build
npm run check:project-memory
```


## 2026-05-15 18:20 - Etap 12B: hotfix patchera audit logu

- Poprawiono błąd poprzedniej paczki: patcher nie znalazł markera w `updateProjectStatusAction`.
- Nowy patcher nie próbuje delikatnie podmieniać środka funkcji, tylko wymienia całe funkcje:
  - `updateProjectStatusAction`,
  - `archiveProjectAction`,
  - `deleteProjectAction`.
- `app/admin/zamowienia/actions.ts` jest nadpisywany wersją z `order_status_update`.
- Dodano/utrzymano migrację `0016_admin_audit_log.sql`, helper `writeAdminAuditLog` i guard `verify:admin-audit-log-v44`.
- Skrypt nadal zatrzymuje się po błędzie i nie robi commit/push, jeśli checki nie przejdą.

### Pliki zmienione

- `lib/admin/audit-log.ts`
- `supabase/migrations/0016_admin_audit_log.sql`
- `app/admin/projekty/actions.ts`
- `app/admin/zamowienia/actions.ts`
- `scripts/check-admin-audit-log-v44.cjs`
- `scripts/check-admin-project-list-compact-v41.cjs`
- `package.json`
- `_project/03_CURRENT_STAGE.md`
- `_project/05_MANUAL_TESTS.md`
- `_project/06_GUARDS_AND_TESTS.md`
- `_project/08_CHANGELOG_AI.md`
- `_project/runs/2026-05-15_1820_admin-audit-log-patcher-hotfix.md`


## 2026-05-15 17:40 - Etap 11 HOTFIX: naprawa po nieudanym checku

- Naprawiono błąd TypeScript w `app/admin/projekty/actions.ts`: zduplikowana deklaracja `projectStatusBeforeDelete`.
- Zaktualizowano `scripts/check-admin-project-list-compact-v41.cjs`, który nadal oczekiwał parametrów z Etapu 10B (`min-width: 1640px`, `width: 450px`), mimo że Etap 11 poszerzył tabelę i kolumnę akcji (`1770px`, `620px`).
- Guard listy projektów pilnuje teraz także markerów archived-first: `Archiwizuj` i `Awaryjne`.
- Skrypt wdrożeniowy hotfixa używa twardego wrappera na komendy, więc commit/push wykona się tylko po przejściu wszystkich checków.
- Nie zmieniano logiki publicznego katalogu, auth ani Supabase schema.

### Pliki zmienione

- `app/admin/projekty/actions.ts`
- `scripts/check-admin-project-list-compact-v41.cjs`
- `_project/03_CURRENT_STAGE.md`
- `_project/05_MANUAL_TESTS.md`
- `_project/06_GUARDS_AND_TESTS.md`
- `_project/08_CHANGELOG_AI.md`
- `_project/09_CONTEXT_FOR_OBSIDIAN.md`
- `_project/runs/2026-05-15_1740_etap11-hotfix.md`

### Checki wymagane

```powershell
npm run verify:admin-buttons-v19
npm run verify:admin-project-list-compact-v41
npm run verify:public-project-data-v22
npm run typecheck
npm run build
npm run check:project-memory
```


## 2026-05-15 17:15 - Etap 11: Archived-first zamiast fizycznego delete

- Dodano `archiveProjectAction` jako bezpieczną server action do ustawiania statusu `archived`.
- Dodano widoczną akcję `Archiwizuj` w tabeli projektów admina.
- Przeniesiono fizyczne usuwanie do strefy awaryjnej `Awaryjne`.
- `Usuń trwale` wymaga nadal kodu projektu, ale dodatkowo jest zablokowane, jeśli projekt nie jest `archived` albo `draft`.
- `deleteProjectAction` sprawdza status po stronie serwera i blokuje delete dla `active` oraz innych statusów niż `archived`/`draft`.
- Dla projektu `active` UI pokazuje jasne ostrzeżenie, że najpierw trzeba archiwizować albo ustawić draft.
- Lista admina pokazuje komunikat po archiwizacji `archived=1`.
- Zaktualizowano guard `verify:admin-buttons-v19`.
- Zaktualizowano layout tabeli po dodaniu akcji `Archiwizuj`, żeby akcje dalej były w jednym wierszu.
- Publiczny katalog nie został zmieniony i nadal powinien pokazywać tylko `active`.

### Pliki zmienione

- `components/admin/AdminProjectDeleteForm.tsx`
- `components/admin/AdminProjectsTable.tsx`
- `app/admin/projekty/actions.ts`
- `app/admin/projekty/page.tsx`
- `app/admin-v8.css`
- `scripts/check-admin-buttons-v19.cjs`
- `_project/03_CURRENT_STAGE.md`
- `_project/04_DECISIONS.md`
- `_project/05_MANUAL_TESTS.md`
- `_project/06_GUARDS_AND_TESTS.md`
- `_project/07_NEXT_STEPS.md`
- `_project/08_CHANGELOG_AI.md`
- `_project/09_CONTEXT_FOR_OBSIDIAN.md`
- `_project/10_PROJECT_TIMELINE.md`
- `_project/runs/2026-05-15_1715_archived-first-delete.md`

### Testy / guardy

Do uruchomienia lokalnie przez paczkę:

```powershell
npm run verify:admin-buttons-v19
npm run verify:admin-project-list-compact-v41
npm run verify:public-project-data-v22
npm run typecheck
npm run build
npm run check:project-memory
```

### Ryzyka

- Fizyczne delete nadal istnieje, ale nie jest domyślną ścieżką.
- Runtime test wymaga działającego logowania admina i bezpiecznego projektu testowego.


## 2026-05-15 16:45 - Etap 10B: Guard idealnego układu i dopasowanie akcji

- Zachowano zaakceptowany pełnoszeroki układ `/admin/projekty`.
- Poprawiono ostatni problem wizualny: `Ustaw active` nie powinno już wypadać poza prawą krawędź tabeli.
- Kolumna `Akcje` została poszerzona do `450px`.
- Tabela ma teraz `min-width: 1640px`.
- Część kolumn informacyjnych została lekko skompresowana, żeby zachować desktopowy układ bez schodkowania.
- Przyciski akcji dostały mniejszy gap i minimalnie mniejszy font.
- Zaostrzono `scripts/check-admin-project-list-compact-v41.cjs`, żeby pilnował action-column fit lock i blokował powrót do poprzedniej za wąskiej kolumny.

### Pliki zmienione

- `app/admin-v8.css`
- `scripts/check-admin-project-list-compact-v41.cjs`
- `_project/03_CURRENT_STAGE.md`
- `_project/05_MANUAL_TESTS.md`
- `_project/06_GUARDS_AND_TESTS.md`
- `_project/07_NEXT_STEPS.md`
- `_project/08_CHANGELOG_AI.md`
- `_project/09_CONTEXT_FOR_OBSIDIAN.md`
- `_project/10_PROJECT_TIMELINE.md`
- `_project/runs/2026-05-15_1645_admin-projects-action-fit-guard.md`

### Testy / guardy

Do uruchomienia lokalnie przez paczkę:

```powershell
npm run verify:admin-project-list-compact-v41
npm run verify:admin-buttons-v19
npm run typecheck
npm run build
npm run check:project-memory
```

### Ryzyka

- Guard blokuje znane przyczyny rozjazdu, ale finalną ocenę proporcji nadal trzeba potwierdzić wzrokowo w przeglądarce.


## 2026-05-15 16:15 - Etap 10: Pełnoszeroki layout listy projektów admina

- Naprawiono layout `/admin/projekty`, który po zabezpieczeniu delete i rozbudowie akcji zaczął wyglądać jak ściśnięta tabela w zbyt wąskim kontenerze.
- Dodano page-specific shell `admin-projects-shell`, żeby tylko lista projektów admina mogła używać prawie całej szerokości ekranu.
- Tabela dostała własny wrapper z poziomym overflow zamiast rozpychać albo zawijać całą stronę.
- Ustawiono `table-layout: fixed`, `min-width: 1600px`, stałe szerokości kolumn i jednowierszowe komórki z `ellipsis`.
- Nazwa projektu i slug są teraz w jednej linii.
- Gotowość, publiczny link i data nie łamią już wierszy.
- Akcje w tabeli są zwarte, bez pionowego schodkowania; zamknięte `Usuń projekt` nie wymusza już pełnej szerokości w komórce.
- Widok mobilny nadal korzysta z kart.
- Zaostrzono `verify:admin-project-list-compact-v41`, żeby blokował powrót do starego zawijania i `overflow: visible`.

### Pliki zmienione

- `app/admin/projekty/page.tsx`
- `components/admin/AdminProjectsTable.tsx`
- `app/admin-v8.css`
- `scripts/check-admin-project-list-compact-v41.cjs`
- `_project/03_CURRENT_STAGE.md`
- `_project/05_MANUAL_TESTS.md`
- `_project/06_GUARDS_AND_TESTS.md`
- `_project/07_NEXT_STEPS.md`
- `_project/08_CHANGELOG_AI.md`
- `_project/09_CONTEXT_FOR_OBSIDIAN.md`
- `_project/10_PROJECT_TIMELINE.md`
- `_project/runs/2026-05-15_1615_admin-projects-full-width-layout.md`

### Testy / guardy

Do uruchomienia lokalnie przez paczkę:

```powershell
npm run verify:admin-project-list-compact-v41
npm run verify:admin-buttons-v19
npm run typecheck
npm run build
npm run check:project-memory
```

### Ryzyka

- Guard jest statyczny i nie zastępuje oceny wizualnej w przeglądarce.
- Przy bardzo wąskim desktopowym oknie tabela będzie miała poziomy scroll, co jest celowe i lepsze niż łamanie wierszy.

## 2026-05-15 10:05 - Etap 8: Pliki prywatne i dostawa ręczna

- Dodano `lib/admin/order-files.ts` do pobierania prywatnych plików projektów dla pozycji zamówienia.
- Panel `/admin/zamowienia` pokazuje teraz prywatne pliki przypięte do projektu: dokumentację PDF, pełną paczkę ZIP i PDF na e-mail.
- Panel pokazuje, czy zamówienie zawiera dodatek PDF na e-mail.
- Dodano instrukcję, co admin ma wysłać klientowi po potwierdzeniu płatności.
- Dodano checklistę realizacji: płatność potwierdzona, PDF wysłany, ZIP wysłany, zamówienie zamknięte.
- Panel mediów projektu dostał opis, że pliki prywatne są źródłem ręcznej realizacji zamówień.
- Zaktualizowano guard `verify:admin-orders-v42` i `verify:admin-project-media-v34`.
- Nie dodawano linków czasowych, automatycznego mailingu, Stripe ani PayU.

### Pliki zmienione

- `app/admin/zamowienia/page.tsx`
- `lib/admin/orders-admin.ts`
- `lib/admin/order-files.ts`
- `lib/admin/projects-admin.ts`
- `components/admin/AdminProjectMediaManager.tsx`
- `scripts/check-admin-orders-v42.cjs`
- `scripts/check-admin-project-media-v34.cjs`
- `app/admin-v8.css`
- `_project/03_CURRENT_STAGE.md`
- `_project/04_DECISIONS.md`
- `_project/05_MANUAL_TESTS.md`
- `_project/06_GUARDS_AND_TESTS.md`
- `_project/07_NEXT_STEPS.md`
- `_project/08_CHANGELOG_AI.md`
- `_project/09_CONTEXT_FOR_OBSIDIAN.md`
- `_project/10_PROJECT_TIMELINE.md`
- `_project/runs/2026-05-15_1005_private-files-manual-fulfillment.md`

### Testy / guardy

Skrypt wdrożeniowy uruchamia lokalnie:

```powershell
npm run verify:admin-project-media-v34
npm run verify:project-media-controls-v34
npm run verify:admin-orders-v42
npm run typecheck
npm run build
npm run check:project-memory
```

### Ryzyka

- Checklisty nie zapisują stanu w bazie; są instrukcją operacyjną V1.
- Panel nie generuje linków ani nie wysyła maili. Admin nadal musi ręcznie obsłużyć wysyłkę.
- Jeżeli projekt nie ma przypiętych prywatnych plików, panel pokaże brak i trzeba uzupełnić projekt w edycji.

## 2026-05-15 09:42 - Etap 7: Checkout - komunikacja półprodukcyjna V1

- Zmieniono publiczny nagłówek checkoutu z komunikacji testowej na `Zamówienie projektu`.
- Dodano jasny komunikat: `Po wysłaniu potwierdzimy dostępność, płatność i sposób realizacji`.
- Dodano opis, że klient kupuje wybrane projekty, warianty i dodatki z koszyka.
- Dodano opis, kiedy klient dostanie pliki: po ręcznym potwierdzeniu dostępności, płatności i realizacji.
- Doprecyzowano `PDF na e-mail` jako dodatkowy pakiet PDF wysyłany na podany adres po potwierdzeniu realizacji.
- Zmieniono treść zgody z `zamówienia testowego` na kontakt w sprawie `zamówienia projektu`.
- Zmieniono komunikat sukcesu, aby mówił o przyjęciu zamówienia projektu i ręcznym potwierdzeniu dalszej realizacji.
- Zaostrzono `scripts/check-cart-order-v38.cjs`, żeby blokował powrót tekstów testowych w checkoutcie.
- Nie dodawano płatności online, maili, faktur, automatycznej wysyłki plików ani zmian w tabelach Supabase.

### Pliki zmienione

- `app/zamowienie/page.tsx`
- `components/order/CheckoutForm.tsx`
- `app/zamowienie/actions.ts`
- `scripts/check-cart-order-v38.cjs`
- `_project/03_CURRENT_STAGE.md`
- `_project/04_DECISIONS.md`
- `_project/05_MANUAL_TESTS.md`
- `_project/06_GUARDS_AND_TESTS.md`
- `_project/07_NEXT_STEPS.md`
- `_project/08_CHANGELOG_AI.md`
- `_project/09_CONTEXT_FOR_OBSIDIAN.md`
- `_project/10_PROJECT_TIMELINE.md`
- `_project/runs/2026-05-15_0942_checkout-v1-copy.md`

### Testy / guardy

Do uruchomienia lokalnie po wdrożeniu:

```powershell
npm run verify:content
npm run verify:cart-order-v38
npm run typecheck
npm run build
npm run check:project-memory
```

### Ryzyka

- Pełny runtime wymaga projektu w koszyku i działającego lokalnego środowiska.
- Checkout nadal jest ręcznym procesem V1; płatności, maile i automatyczna wysyłka plików pozostają poza zakresem.
- Guard jest statyczny i pilnuje treści, ale nie zastępuje ręcznego sprawdzenia czytelności UI.

## 2026-05-15 09:19 - Etap 6: Zamowienie V1 - panel zamowien admina

- Dodano podstawowy panel `/admin/zamowienia` dla realnych zamowien zapisanych w Supabase.
- Dodano `lib/admin/orders-admin.ts` do odczytu `orders`, `order_items` i `order_item_addons` przez service role.
- Lista zamowien pokazuje id/numer, klienta, e-mail, telefon, sume, status, date i liczbe pozycji.
- Dodano rozwijany szczegol zamowienia z pozycjami, wariantami, dodatkami, uwagami i danymi do faktury.
- Dodano server action do recznej zmiany statusu zamowienia.
- Statusy V1 to `new`, `contacted`, `paid_manual`, `sent`, `cancelled`.
- Dodano migracje `0015_orders_v42_statuses.sql`, ktora mapuje stare statusy na nowe i aktualizuje check constraint.
- Dodano link do zamowien w headerze admina i kafelek na dashboardzie.
- Dodano guard `scripts/check-admin-orders-v42.cjs` i wpis `verify:admin-orders-v42` w `package.json`.
- Zaktualizowano guard schematu zamowien V38 pod nowe statusy.
- Nie dodawano platnosci online, maili, faktur ani automatycznej wysylki plikow.

### Pliki zmienione

- `app/admin/zamowienia/page.tsx`
- `app/admin/zamowienia/actions.ts`
- `lib/admin/orders-admin.ts`
- `components/admin/AdminHeader.tsx`
- `app/admin/page.tsx`
- `app/admin-v8.css`
- `supabase/migrations/0014_orders_v1.sql`
- `supabase/migrations/0015_orders_v42_statuses.sql`
- `scripts/check-order-schema-v38.cjs`
- `scripts/check-admin-orders-v42.cjs`
- `package.json`
- `_project/03_CURRENT_STAGE.md`
- `_project/05_MANUAL_TESTS.md`
- `_project/06_GUARDS_AND_TESTS.md`
- `_project/07_NEXT_STEPS.md`
- `_project/08_CHANGELOG_AI.md`
- `_project/09_CONTEXT_FOR_OBSIDIAN.md`
- `_project/runs/2026-05-15_0919_admin-orders-v1.md`

### Testy / guardy

- `npm run verify:order-schema-v38` - OK
- `npm run verify:cart-order-v38` - OK
- `npm run verify:admin-orders-v42` - OK
- `npm run typecheck` - OK
- `npm run build` - OK, ze starymi ostrzezeniami autoprefixera

### Ryzyka

- Pelny runtime test wymaga dzialajacego logowania admina i poprawnego anon key.
- Jezeli baza ma juz zastosowana migracje `0014_orders_v1.sql`, trzeba zastosowac `0015_orders_v42_statuses.sql`, zeby nowe statusy przechodzily constraint.
- Panel jest manualny; platnosci, maile, faktury i automatyczna wysylka plikow pozostaja poza zakresem.

## 2026-05-15 09:28 - Aktualizacja globalnego workflow pamieci projektu

- Zaktualizowano `AGENTS.md` do globalnego standardu Damiana.
- Dodano `_project/10_PROJECT_TIMELINE.md`.
- Dodano `_project/history/` oraz notatke historyczna o zmianie standardu pamieci.
- Zaktualizowano `scripts/check-project-memory.cjs`, zeby pilnowal timeline i historii.
- Zaktualizowano `_project/02_WORK_RULES.md`, `_project/04_DECISIONS.md`, `_project/06_GUARDS_AND_TESTS.md` i `_project/09_CONTEXT_FOR_OBSIDIAN.md`.
- Nie zmieniano logiki sklepu, UI sklepu, checkoutu, panelu zamowien ani danych produkcyjnych.

### Testy / guardy

- `npm run check:project-memory` - OK

### Ryzyka

- Nowy standard wymaga konsekwentnego uzupelniania timeline i historii przy przyszlych zmianach kierunku projektu.

## 2026-05-14 22:35 - Etap 1: Audyt i stabilizacja akcji panelu admina

- Przeczytano `AGENTS.md` oraz pliki `_project/` jako źródło prawdy.
- Zmapowano główne widoczne akcje panelu admina.
- Potwierdzono, że lista projektów używa realnych linków/formularzy dla edycji, podglądu publicznego, zmiany statusu i usuwania.
- Dodano jawne markery `data-admin-action` dla akcji admina, żeby guard nie opierał się na domysłach.
- Usunięto fałszywy legacy marker z komentarza w `app/admin/projekty/[id]/edytuj/page.tsx`.
- Zaostrzono `scripts/check-admin-buttons-v19.cjs`, aby sprawdzał realny `components/admin/AdminProjectEditForm.tsx` zamiast komentarza na stronie edycji.
- Nie zmieniano ogólnego stylu wizualnego.
- Nie zmieniano routingu.
- Nie zmieniano funkcji niezwiązanych z panelem admina.

### Pliki zmienione

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

### Testy / guardy

Do uruchomienia lokalnie:

```powershell
npm run verify:admin-buttons-v19
npm run check:project-memory
npm run typecheck
npm run build
```

### Wynik

Kodowo etap został wdrożony przez GitHub API. Runtime test w przeglądarce i Supabase nadal musi zostać wykonany ręcznie.

### Ryzyka

- Statyczny guard nie sprawdza realnego kliknięcia w przeglądarce.
- Zmiana statusu i usuwanie wymagają działającego Supabase oraz sesji admina.
- Akcje mediów w edycji projektu wymagają oddzielnego ręcznego potwierdzenia.

## 2026-05-14 21:20 - Etap 0: Utworzenie pamięci projektu

- Utworzono `AGENTS.md`.
- Utworzono folder `_project/`.
- Dodano pliki pamięci projektu.
- Dodano guard `scripts/check-project-memory.cjs`.
- Dodano skrypt `check:project-memory` do `package.json`.
- Dodano raport run w `_project/runs/`.
- Nie zmieniano logiki aplikacji.
- Nie zmieniano UI.
- Nie zmieniano routingu.
- Nie zmieniano komponentów produktu.

## Zasada dalszych wpisów

Każdy większy etap ma dopisać nowy wpis z:

- datą,
- nazwą etapu,
- plikami zmienionymi,
- testami uruchomionymi,
- wynikiem testów,
- znanymi ryzykami,
- następnym krokiem.

## 2026-05-15 08:02 - Etap 2: Runtime test panelu admina

- Sprawdzono wskazane pliki panelu admina bez zmian w kodzie.
- Uruchomiono lokalny runtime Next na porcie `3100`.
- Utworzono tymczasowe konto admina i tymczasowy projekt testowy w Supabase.
- Potwierdzono, ze service role dziala dla tworzenia i sprzatania danych testowych.
- Proba logowania w przegladarce na `/admin/login` zakonczyla sie bledem Supabase Auth: `Invalid API key`.
- Usunieto tymczasowy projekt, profil i uzytkownika testowego.
- Nie zmieniano UI, routingu, publicznego katalogu, koszyka ani checkoutu.
- Nie zmieniano `components/admin/*` ani `app/admin/projekty/actions.ts`, bo test nie wykazal bledu w kodzie przyciskow; wykazal bloker konfiguracji anon key.
- Uruchomione testy:
  - `npm run verify:admin-buttons-v19` - OK
  - `npm run check:project-memory` - OK
  - `npm run typecheck` - OK
  - `npm run build` - OK, z istniejacymi ostrzezeniami autoprefixera
- Znane ryzyko: kryterium zakonczenia etapu nie jest spelnione, dopoki Damian nie potwierdzi recznie edycji, zapisu, anulowania, statusu i usuwania po naprawie anon key.
- Nastepny krok: poprawic lokalne `NEXT_PUBLIC_SUPABASE_ANON_KEY` tak, aby pasowal do projektu Supabase z `SUPABASE_SERVICE_ROLE_KEY`, potem powtorzyc runtime test.

## 2026-05-15 08:19 - Etap 3: Spojnosc admin -> publiczny katalog -> karta projektu

- Sprawdzono `lib/project-repository.ts`, publiczny katalog, karte projektu, komponenty publiczne i adminowe mapowanie danych.
- Zaostrzono `scripts/check-public-project-data-v22.cjs`.
- Guard wymaga teraz jawnego publicznego filtra `.eq("status", "active")` przy pobieraniu projektow.
- Guard pilnuje, ze `/projekty/[slug]` i podobne projekty korzystaja z `getPublicProjects()`, a nie z osobnego pobierania po slugu/statusie.
- Guard blokuje bezposrednie publiczne query `.from("projects")` poza `lib/project-repository.ts`.
- Guard sprawdza powiazania publicznej karty z danymi admina: nazwa, cena, slug, kod, warianty, dodatki, media, pomieszczenia i parametry techniczne.
- Nie zmieniano designu karty, stylu katalogu, filtrowania, koszyka ani checkoutu.
- Uruchomione testy:
  - `npm run verify:public-project-data-v22` - OK
  - `npm run verify:public-catalog-filters-v22b` - OK
  - `npm run verify:public-project-detail-sales-v37` - OK
  - `npm run typecheck` - OK
  - `npm run build` - OK
  - `npm run check:project-memory` - OK
- Znane ryzyko: pelny runtime admin -> public nadal zalezy od dzialajacego logowania admina, ktore lokalnie blokowal anon key w Etapie 2.

## 2026-05-15 08:35 - Etap 4: Karta projektu jako glowna strona sprzedazowa

- Doprecyzowano publiczny dodatek PDF na e-mail w `ProjectPurchaseBox`.
- Dodano komunikat, ze PDF na e-mail jest opcjonalny i nie zastepuje podstawowej dostawy projektu.
- CTA `DODAJ DO KOSZYKA` dostalo stabilny marker `data-project-cart-cta="true"` i opis `aria-label` z aktualna kwota.
- Zmieniono mikrokomunikat dostawy, zeby nie mylil podstawowej dostawy z dodatkiem PDF.
- Dodano anchor i marker sekcji podobnych projektow.
- Dodano `components/project/ProjectMediaGallery.tsx` jako alias do istniejacego `ProjectGallery`.
- Zaostrzono `scripts/check-public-project-detail-sales-v37.cjs`, aby pilnowal kluczowych sekcji sprzedazowych, PDF +250 zl, CTA, danych koszyka oraz minimalnej liczby opcji selectow admina.
- Dodano `START_LOCAL.bat` do prostego uruchamiania projektu lokalnie.
- Test przegladarkowy: wariant + PDF na e-mail +250 zl -> `DODAJ DO KOSZYKA` -> `/koszyk` z poprawna pozycja.
- Uruchomione testy:
  - `npm run verify:public-project-detail-sales-v37` - OK
  - `npm run verify:cart-order-v38` - OK
  - `npm run typecheck` - OK
  - `npm run build` - OK, ze starymi ostrzezeniami autoprefixera
  - `npm run check:project-memory` - OK
- Znane ryzyko: header koszyka pokazal `Koszyk 0`, mimo ze koszyk zawieral dodana pozycje. To nie blokuje Etapu 4, ale warto naprawic jako osobny etap.

## 2026-05-15 09:03 - Etap 5: Koszyk - walidacja ceny, wariantow i dodatkow

- Dodano walidacje localStorage koszyka w `lib/cart/storage.ts`.
- Koszyk wymaga kodu projektu, sluga, nazwy, ceny bazowej, wariantu, ceny wariantu, dodatkow i daty dodania.
- Wybrane dodatki sa filtrowane do dodatkow dostepnych dla danej pozycji.
- Dodano klientowy licznik koszyka w headerze, oparty o `readCart()` i `project-cart-updated`.
- Dodano lokalne ulubione: `lib/favorites/storage.ts`, `FavoriteButton`, licznik `HeaderFavoritesLink`.
- Serduszka w karcie projektu i kafelkach katalogu zapisują stan ulubionych bez zmiany layoutu.
- Zaostrzono `scripts/check-cart-order-v38.cjs`, zeby pilnowal walidacji koszyka, markerow pozycji, PDF/email i licznikow headera.
- Test runtime: dodanie projektu z PDF -> `/koszyk`, licznik `1`, zmiana dodatku przelicza sume, usuniecie pokazuje pusty koszyk i licznik `0`.
- Test runtime ulubionych: serduszko zapisuje stan, licznik finalnie pokazuje `1`, brak bledow konsoli.
- Uruchomione testy:
  - `npm run verify:cart-order-v38` - OK
  - `npm run typecheck` - OK
  - `npm run build` - OK, ze starymi ostrzezeniami autoprefixera
- Znane ryzyko: ulubione nie maja osobnej strony/listy; na razie jest lokalny zapis, aktywne serduszko i licznik.


## 2026-05-15 10:35 - Etap 9: Minimum bezpieczeństwa admina i operacji destrukcyjnych

- Zmieniono formularz usuwania projektu tak, aby wymagał wpisania kodu projektu.
- Przycisk `Usuń trwale` jest zablokowany bez poprawnego kodu.
- `deleteProjectAction` pobiera projekt po stronie serwera i waliduje kod przed usunięciem.
- Projekt `active` pokazuje dodatkowe ostrzeżenie w strefie usuwania.
- Zaostrzono `verify:admin-buttons-v19`, żeby pilnował kodu potwierdzającego i confirmu.
- Naprawiono zaległe błędy typecheck po Etapie 8: `AdminProjectFileItem.bucket` oraz nullable `supabase` w `lib/admin/order-files.ts`.
- Nie zmieniano routingu, całego auth, publicznych stron ani modelu płatności/dostawy.

### Testy / guardy

Do uruchomienia lokalnie przez paczkę:

```powershell
npm run verify:admin-project-media-v34
npm run verify:project-media-controls-v34
npm run verify:admin-buttons-v19
npm run typecheck
npm run build
npm run check:project-memory
```

### Ryzyka

- Fizyczne delete nadal istnieje. Dla większego bezpieczeństwa kolejnym etapem powinien być archived-first.

<!-- SKLEP_PROJEKTY_DOMOW_MEMORY_V1_START -->
# Changelog AI - Sklep z projektami domów

## 2026-05-15 - Project memory + Obsidian brain setup

- Dodano / uzupełniono `AGENTS.md` jako kontrakt pracy AI.
- Dodano / uzupełniono pełny folder `_project/`.
- Dodano plik `_project/11_USER_CONFIRMED_TESTS.md` na potwierdzone testy Damiana.
- Dodano guard `scripts/check-project-memory.cjs`.
- Dodano script `check:project-memory` do `package.json`, jeśli `package.json` istnieje.
- Dodano Obsidian brain dla projektu w `10_PROJEKTY/Sklep_projekty_domow/`.
- Nie zmieniano UI.
- Nie zmieniano routingu.
- Nie zmieniano logiki produktu.
- Nie wykonywano refaktoru.
<!-- SKLEP_PROJEKTY_DOMOW_MEMORY_V1_END -->

