# Etap 40A - Cloudflare/OpenNext deploy foundation

Status: DO BUILD/DEPLOY TESTU.

## Cel
Docelowy hosting sklepu to Cloudflare. Nie wpisujemy sekretów Stripe/Supabase dwa razy w Vercel i Cloudflare.

## Dodane
- wrangler.jsonc
- open-next.config.ts
- cf:build / cf:preview / cf:deploy / cf:typegen
- verify:cloudflare-deploy-v40a
- scripts/run-stage40a-cloudflare-preview.ps1

## 40B - Cloudflare env/secrets
Plaintext Variables:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- NEXT_PUBLIC_APP_URL
- NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

Secrets:
- SUPABASE_SERVICE_ROLE_KEY
- STRIPE_SECRET_KEY
- STRIPE_WEBHOOK_SECRET

## Kolejność
1. npm run cf:build
2. npx wrangler login
3. npm run cf:deploy
4. Dodać Cloudflare env/secrets
5. Stripe webhook na https://<worker-url>/api/payments/stripe/webhook
6. Runtime checkout
7. Guard 39B DB smoke
