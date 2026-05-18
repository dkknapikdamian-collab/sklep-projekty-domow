# Run report - Etap 40A Cloudflare/OpenNext deploy foundation

Data: 2026-05-18
Project ID: sklep-projekty-domow
Status: FOUNDATION PACKAGE / DO BUILD I DEPLOY TESTU

## Scan-first confirmation
- Branch z diagnostyki Damiana: main.
- Przed 40A status miał tylko untracked `_backup_local/` oraz stare runy `_project/runs`.
- `package.json` używa npm i ma Next 15/React 19/Supabase.
- Istnieje `package-lock.json`.
- Istnieje `next.config.ts`.
- Istnieje `app/api/payments/stripe/webhook/route.ts`.
- Przed 40A nie było `wrangler.jsonc` ani `open-next.config.ts`.

## Decyzje Damiana
- Finalny hosting: Cloudflare.
- Nie wpisywać sekretów dwa razy w Vercel i Cloudflare.
- Najpierw Cloudflare deploy foundation, potem env/secrets, potem Stripe runtime.

## Zakres
- Konfiguracja OpenNext/Cloudflare.
- Guard 40A.
- Dokumentacja Cloudflare env/secrets.
- Obsidian update.

## Testy
- `npm run verify:cloudflare-deploy-v40a`
- `scripts/run-stage40a-cloudflare-preview.ps1`
- `npm run cf:build` DO WYKONANIA
- `npm run cf:deploy` DO WYKONANIA

## Ryzyka
- OpenNext na Windows może wymagać WSL/GitHub Actions.
- Stripe webhook raw body na Cloudflare wymaga testu runtime.
- Worker size limit znany dopiero po buildzie.

## Następny krok
Apply ZIP, uruchomić guard, uruchomić cf:build, potem login/deploy.
