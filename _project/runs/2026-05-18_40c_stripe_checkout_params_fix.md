# Run report - Etap 40C Stripe Checkout params fix

## Scan-first confirmation

- Repo: `C:\Users\malim\Desktop\biznesy_ai\strony\strona z projektami`
- Branch: main
- Git status: sprawdzany przez apply script przed zmianą
- Read files/folders:
  - `AGENTS.md`
  - `_project/01_PROJECT_GOAL.md`
  - `_project/15_ACTIVE_SOURCE_MAP.md`
  - `_project/16_PRODUCTION_ROADMAP_AND_ACCEPTANCE.md`
  - `_project/runs/2026-05-18_40b_fix_cloudflare_keep_vars_env_persistence.md`
  - `package.json`
  - `wrangler.jsonc`
  - źródła `app/`, `lib/`, `src/`, `server/` zawierające `automatic_payment_methods`
- Missing files/folders: do uzupełnienia przez apply script, jeśli brak
- Active source of truth: repo aplikacji dla kodu i guardów; Obsidian dla decyzji i statusu
- Legacy / competing paths: Vercel env nie jest docelowym miejscem konfiguracji, Cloudflare jest docelowy dla runtime
- Planned changed files: kod tworzenia Stripe Checkout Session, `package.json`, guard, `_project`, dokumentacja, Obsidian
- Risks: możliwy kolejny błąd runtime Stripe po usunięciu błędnego parametru
- Tests planned: `npm run verify:stripe-checkout-params-v40c`, ręczny checkout testowy, DB guard 39B po checkout
- Obsidian notes read: roadmap Sklepu i notatka 40B-FIX

## FAKTY Z KODU / PLIKÓW

Błąd runtime Stripe wskazuje, że request do `checkout.sessions.create` zawiera nieobsługiwany parametr `automatic_payment_methods`.

## DECYZJE DAMIANA

- Finalne testy mają iść na Cloudflare.
- Stripe test keys są aktywne, live keys mogą istnieć tylko jako standby.
- Nie wydawać plików bez statusu paid.

## HIPOTEZY / PROPOZYCJE AI

Błąd jest po stronie parametrów tworzenia Checkout Session, nie po stronie webhooka ani Supabase.

## DO POTWIERDZENIA

- Czy po usunięciu parametru Stripe Checkout Session zostanie utworzony poprawnie.
- Czy webhook Cloudflare zapisze payment event.
- Czy fulfillment po paid zadziała runtime.

## TESTY AUTOMATYCZNE

- `npm run verify:stripe-checkout-params-v40c`

## GUARDY

- `scripts/check-stripe-checkout-params-v40c.cjs`

## TESTY RĘCZNE

- TEST RĘCZNY DO WYKONANIA: checkout na Cloudflare + Stripe sandbox karta testowa.

## POTWIERDZENIA DAMIANA

- Damian potwierdził błąd na stronie `/zamowienie` po próbie płatności.

## BRAKI I RYZYKA

- Nie potwierdzono jeszcze pełnego paid flow.
- Nie przechodzić do email outbox przed zielonym runtime 39B/40C.

## WPŁYW NA OBSIDIANA

Dodano notatkę 40C i blok w roadmapie.

## WPŁYW NA KIERUNEK ROZWOJU

Zgodne z V1: płatności online muszą działać przed automatycznym fulfillmentem i email outbox.

## NASTĘPNY KROK

Po pushu i deployu Cloudflare wykonać testowy checkout i DB guard 39B.

## GIT / ZIP STATUS

Tryb ZIP + push helper po review. Nie używać `git add .`.
