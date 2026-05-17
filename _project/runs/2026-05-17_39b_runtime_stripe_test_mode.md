# 2026-05-17 - Etap 39B Stripe runtime test-mode

Status: PRZYGOTOWANE DO TESTU RUNTIME, TEST RĘCZNY DO WYKONANIA.

## Scan-first confirmation

- Repo: `C:\Users\malim\Desktop\biznesy_ai\strony\strona z projektami`
- Branch: `main` wymagany przez apply.
- Oczekiwany kontekst czatu: po 39A, app commit `7c096df`, Obsidian handoff commit `6b8b7e7`.
- Pliki wymagane przez apply:
  - `AGENTS.md`
  - `_project/01_PROJECT_GOAL.md`
  - `_project/15_ACTIVE_SOURCE_MAP.md`
  - `_project/16_PRODUCTION_ROADMAP_AND_ACCEPTANCE.md`
  - `_project/runs/2026-05-17_2315_etap39a_stripe_real_payments.md`
  - `package.json`
- Obsidian wymagany przez apply:
  - `10_PROJEKTY/Sklep_projekty_domow/2026-05-17 - Handoff po Etap 39A Stripe i kolejne kierunki.md`
  - `10_PROJEKTY/Sklep_projekty_domow/11_ROADMAPA PRODUKCYJNA I ODHACZANIE - Sklep projekty domow.md`

## FAKTY Z KODU / PLIKÓW

W tej paczce nie zmieniono logiki checkoutu ani webhooka, bo realny runtime 39A nie został jeszcze wykonany w tym oknie.

Dodano narzędzia diagnostyczne:
- `scripts/check-stage39b-stripe-no-fulfillment-without-paid.cjs`
- `scripts/run-stage39b-stripe-runtime-local.ps1`
- `supabase/manual/2026-05-17_stage39b_stripe_runtime_diagnostics.sql`
- `docs/stripe/2026-05-17_etap39b_stripe_runtime_test_mode.md`

## DECYZJE DAMIANA

- Tryb pracy: ZIP + local apply + osobny push helper po review.
- Nie używać `git add .`.
- Nie ruszać `_backup_local`.
- Nie ruszać `.obsidian/graph.json`.
- Najpierw 39B runtime Stripe.
- Dopiero po 39B: 26D email outbox no-reply fake-provider.

## HIPOTEZY / PROPOZYCJE AI

Hipoteza: najbezpieczniejszy 39B to etap kontrolny, a nie ślepy patch webhooka. Bez realnego wyniku Stripe CLI i SQL nie wolno zgadywać napraw.

## DO POTWIERDZENIA

- Dokładny endpoint webhooka z 39A: domyślnie `/api/stripe/webhook`, ale źródłem prawdy jest kod 39A.
- Dokładne nazwy env Stripe/Supabase: źródłem prawdy jest kod 39A i `.env.example`, jeśli istnieje.
- Rzeczywisty wynik SQL po checkout test-mode.

## TESTY AUTOMATYCZNE

Apply uruchamia:

```powershell
node scripts/check-stage39b-stripe-no-fulfillment-without-paid.cjs
```

Bez sekretów wynik oczekiwany:
- SKIP DB smoke,
- PASS static mode.

Pełny runtime DB smoke:

```powershell
$env:STAGE39B_REQUIRE_DB="1"
node scripts/check-stage39b-stripe-no-fulfillment-without-paid.cjs
```

## GUARDY

Guard sprawdza, czy w sampled runtime data nie ma:
- `order_fulfillment_access` bez pasującej płatności paid/succeeded/completed,
- `order_download_events` bez pasującej płatności paid/succeeded/completed.

## TESTY RĘCZNE

Status: TEST RĘCZNY DO WYKONANIA.

Do wykonania:
1. Stripe CLI listen.
2. Testowy checkout.
3. SQL diagnostyczny.
4. Guard DB.
5. Dopisanie wyniku do Obsidiana i `_project`.

## POTWIERDZENIA DAMIANA

Brak potwierdzenia dla 39B w chwili przygotowania paczki.

## BRAKI I RYZYKA

- Bez realnego webhooka testowego nie wiadomo, czy 39A zapisuje wszystkie tabele poprawnie.
- Guard REST może wymagać service role key, bo RLS może blokować odczyt tabel.
- Jeśli tabela ma inne nazwy kolumn niż `order_id` i status płatności, SQL/guard pokażą FAIL/SCHEMA i trzeba dostosować diagnostykę do realnego schematu.

## WPŁYW NA OBSIDIANA

Paczka dodaje nową notatkę:
- `10_PROJEKTY/Sklep_projekty_domow/2026-05-17 - Etap 39B Stripe runtime test mode.md`

Paczka dopisuje bloki do:
- `2026-05-17 - Handoff po Etap 39A Stripe i kolejne kierunki.md`
- `11_ROADMAPA PRODUKCYJNA I ODHACZANIE - Sklep projekty domow.md`

## WPŁYW NA KIERUNEK ROZWOJU

39B jest bramką przed 26D. Nie robić email outbox, dopóki płatność + webhook + fulfillment nie mają runtime PASS.

## NASTĘPNY KROK

Wykonać test runtime według `docs/stripe/2026-05-17_etap39b_stripe_runtime_test_mode.md`.

## GIT / ZIP STATUS

- ZIP: `sklep_etap39b_stripe_runtime_test_mode_v1_2026-05-17.zip`
- Apply: bez commita i pusha; backup zmienianych istniejących plików tworzony poza repo w `Downloads/sklep_stage39b_backup_2026-05-17`, nie w `_backup_local`.
- Push: osobny helper `PUSH_SKLEP_ETAP39B_AFTER_REVIEW.ps1`.
