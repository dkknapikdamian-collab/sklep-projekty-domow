# 18_SQL_LEDGER - Sklep projekty domow

<!-- SQL_LEDGER_RULE_2026_05_17_START -->
# 18_SQL_LEDGER - Sklep projekty domow

## SQL_LEDGER_RULE

Każdy SQL użyty przy projekcie musi być zapisany w repo i opisany w ledgerze.

Wymagane:
- plik SQL w `supabase/manual/` albo `supabase/migrations/`,
- wpis w tym pliku `_project/18_SQL_LEDGER.md`,
- wpis w Obsidianie `10_PROJEKTY/Sklep_projekty_domow/12_SQL_LEDGER - Sklep projekty domow.md`,
- typ SQL: MIGRATION / READ_ONLY_VERIFICATION / REPAIR / DIAGNOSTIC,
- status: DO_URUCHOMIENIA / URUCHOMIONE / NIE_URUCHAMIAC / ZASTAPIONE,
- wynik albo powód braku uruchomienia.

SQL bez ledgeru nie zamyka etapu.
<!-- SQL_LEDGER_RULE_2026_05_17_END -->

<!-- SQL_LEDGER_ETAP33_RUNTIME_AUDIT_2026_05_17_START -->
## 2026-05-17 - Etap 33 runtime admin audit verification

- SQL_LEDGER_ID: `2026-05-17_etap33_admin_audit_runtime_verification`
- Plik: `supabase/manual/2026-05-17_etap33_admin_audit_runtime_verification.sql`
- Typ: READ_ONLY_VERIFICATION
- Bezpieczeństwo: SELECT only.
- Status V8: URUCHOMIONE CZĘŚCIOWO.
- Wynik Damiana: 4 PASS / 4 FAIL.
- PASS: dodanie projektu, publikacja projektu, archiwizacja projektu, usunięcie projektu.
- FAIL: media projektu, pliki prywatne, zamówienia, checklisty zamówień.
- Status etapu: NIEZAMKNIĘTY.
<!-- SQL_LEDGER_ETAP33_RUNTIME_AUDIT_2026_05_17_END -->

<!-- SQL_LEDGER_ETAP34_TEST_PROJECT_SEED_2026_05_17_START -->
## 2026-05-17 - Etap 34 test project seed

- SQL_LEDGER_ID: `2026-05-17_etap34_seed_admin_test_project`
- Plik: `supabase/manual/2026-05-17_etap34_seed_admin_test_project.sql`
- Typ: TEST_DATA_SEED
- Bezpieczeństwo: mutuje wyłącznie dane testowe.
- Status: DO_URUCHOMIENIA PRZEZ DAMIANA.
- Cel: odtworzyć projekt testowy `DP-TEST-034` z ładnymi zdjęciami do testów admina.
- Public safety: projekt ma status `draft`, nie `active`.
- Ryzyko: nie uruchamiać na publicznej produkcji bez decyzji Damiana.
<!-- SQL_LEDGER_ETAP34_TEST_PROJECT_SEED_2026_05_17_END -->

<!-- SQL_LEDGER_ETAP34_TEST_PROJECT_SEED_JSONB_FIX_2026_05_17_START -->
## 2026-05-17 - Etap 34 V4 test project seed JSONB fix

- SQL_LEDGER_ID: `2026-05-17_etap34_seed_admin_test_project`
- Plik: `supabase/manual/2026-05-17_etap34_seed_admin_test_project.sql`
- Typ: TEST_DATA_SEED
- Status: DO_URUCHOMIENIA PRZEZ DAMIANA.
- Poprawka V4: `features` i `related_slugs` zapisane jako JSONB, nie `text[]`.
- Cel: odtworzyć projekt testowy `DP-TEST-034` z ładnymi zdjęciami do testów admina.
- Public safety: projekt ma status `draft`, nie `active`.
- Ryzyko: nie uruchamiać na publicznej produkcji bez decyzji Damiana.
<!-- SQL_LEDGER_ETAP34_TEST_PROJECT_SEED_JSONB_FIX_2026_05_17_END -->

<!-- SQL_LEDGER_ETAP34_TEST_PROJECT_SEED_CONFIRMED_2026_05_17_START -->
## 2026-05-17 - Etap 34 test project seed confirmed

- SQL_LEDGER_ID: `2026-05-17_etap34_seed_admin_test_project`
- Plik: `supabase/manual/2026-05-17_etap34_seed_admin_test_project.sql`
- Typ: TEST_DATA_SEED
- Status: URUCHOMIONE / POTWIERDZONE PRZEZ DAMIANA.
- Wynik: `DP-TEST-034`, `Dom Aurora Test`, `draft`.
- Uwaga: późniejszy błąd `syntax error at or near "Etap"` był spowodowany wklejeniem tekstu nie-SQL do Supabase SQL Editor.
- Public safety: projekt ma status `draft`, nie `active`.
<!-- SQL_LEDGER_ETAP34_TEST_PROJECT_SEED_CONFIRMED_2026_05_17_END -->


<!-- SQL_LEDGER_ETAP36_POST_PAYMENT_FULFILLMENT_2026_05_17_START -->
## 2026-05-17 - Etap 36 post-payment fulfillment

- SQL_LEDGER_ID: 2026-05-17_etap36_post_payment_fulfillment
- Plik: supabase/manual/2026-05-17_etap36_post_payment_fulfillment.sql
- Typ: MIGRATION
- Status: DO_URUCHOMIENIA.
- Cel: tabele order_payments, payment_events, order_fulfillment_access, order_download_events dla bezpiecznego fulfillmentu po płatności.
- Bezpieczeństwo: RLS enabled, brak publicznych polityk; dostęp przez server-side service role.
- Ryzyko: wymaga sprawdzenia na aktualnym schemacie Supabase przed uznaniem runtime za potwierdzony.
<!-- SQL_LEDGER_ETAP36_POST_PAYMENT_FULFILLMENT_2026_05_17_END -->

<!-- SQL_LEDGER_ETAP36_CONFIRMED_2026_05_17_START -->
## 2026-05-17 - Etap 36 SQL uruchomiony w Supabase

- SQL_LEDGER_ID: 2026-05-17_etap36_post_payment_fulfillment
- Plik: supabase/manual/2026-05-17_etap36_post_payment_fulfillment.sql
- Typ: MIGRATION
- Status: URUCHOMIONE / POTWIERDZONE PRZEZ DAMIANA.
- Wynik Supabase: Success. No rows returned.
- Data potwierdzenia: 2026-05-17 12:34.
- Utworzone / potwierdzone tabele:
  - order_payments
  - payment_events
  - order_fulfillment_access
  - order_download_events
- Bezpieczeństwo: RLS enabled, brak publicznych polityk; dostęp server-side przez service role.
- Test runtime: BRAK POTWIERDZONEGO TESTU RUNTIME fulfillmentu po płatności.
- Następny krok: naprawić build przez błędny HTML komentarz w app/globals.css, potem spiąć Stripe webhook z fulfillmentem.
<!-- SQL_LEDGER_ETAP36_CONFIRMED_2026_05_17_END -->


<!-- SQL_LEDGER_ETAP26A_CONFIRMED_2026_05_17_START -->
## 2026-05-17 - Etap 26A project_files model SQL uruchomiony

- SQL_LEDGER_ID: `2026-05-17_etap26a_project_files_model`
- Plik repo: `supabase/manual/2026-05-17_etap26a_project_files_model.sql`
- Typ: MIGRATION
- Status: URUCHOMIONE / POTWIERDZONE PRZEZ DAMIANA.
- Wynik Supabase: Success. No rows returned.
- Cel: rozszerzenie `project_files` o pola `active`, `auto_send_after_payment`, `required_for_publication`, `sort_order`, `metadata`, `updated_at`.
- Test runtime: BRAK POTWIERDZONEGO TESTU RUNTIME.
<!-- SQL_LEDGER_ETAP26A_CONFIRMED_2026_05_17_END -->


