# Run report - Etap 40B-FIX Cloudflare keep_vars env persistence

## FAKTY Z KODU / PLIKÓW

- Repo ma Cloudflare/OpenNext foundation z Etapu 40A.
- Po konfiguracji Cloudflare dashboard Damian zgłosił, że wpisane runtime variables znikają albo nie są widoczne.
- Cloudflare/Wrangler może traktować `wrangler.jsonc` jako źródło prawdy i nadpisywać dashboard variables przy deployu.

## DECYZJE DAMIANA

- Finalny hosting: Cloudflare.
- Nie chcemy wpisywać Stripe/Supabase keys wielokrotnie.
- Najpierw stabilizujemy Cloudflare env/secrets, potem wracamy do Stripe test payments.

## HIPOTEZY / PROPOZYCJE AI

- Przyczyna problemu: brak `keep_vars=true` w `wrangler.jsonc`, więc deploy mógł nadpisywać dashboard runtime vars.

## DO POTWIERDZENIA

- Czy po deployu z `keep_vars=true` runtime variables zostają w Cloudflare dashboard.
- Czy publiczna strona nie pokazuje już „Brak konfiguracji Supabase”.

## TESTY AUTOMATYCZNE

- `npm run verify:cloudflare-env-persistence-v40b`

## GUARDY

- Guard sprawdza:
  - `wrangler.jsonc` ma root `keep_vars=true`,
  - `wrangler.jsonc` nie zawiera oczywistych wartości sekretów Stripe/Supabase,
  - `package.json` ma script `verify:cloudflare-env-persistence-v40b`.

## TESTY RĘCZNE

Status: TEST RĘCZNY DO WYKONANIA.

Po wdrożeniu:
- sprawdzić Cloudflare Runtime Variables and Secrets,
- sprawdzić Build Variables and secrets,
- redeploy,
- wejść na `https://sklep-projekty-domow.dudekhomeprojekty.workers.dev/`,
- wejść na `/admin/login`.

## POTWIERDZENIA DAMIANA

Brak po tej paczce.

## BRAKI I RYZYKA

- Jeżeli Cloudflare usunął wartości przed fixem, trzeba je dodać ponownie ostatni raz.
- Build variables i runtime variables to nadal dwie różne sekcje.
- Stripe runtime nie jest jeszcze potwierdzony.

## WPŁYW NA OBSIDIANA

Dodano notatkę 40B-FIX i blok do roadmapy.

## WPŁYW NA KIERUNEK ROZWOJU

Stabilizuje Cloudflare jako docelowy hosting przed testem płatności Stripe.

## NASTĘPNY KROK

Po zielonym deployu i powrocie Supabase: dodać Stripe test keys + live standby zgodnie z notatką 40B.

## GIT / ZIP STATUS

Paczka ZIP local-first. Push osobnym helperem po review.
