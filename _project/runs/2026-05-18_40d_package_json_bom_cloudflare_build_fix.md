# Run report - Etap 40D package.json BOM / Cloudflare build fix

## Scan-first confirmation

- Repo: `C:\Users\malim\Desktop\biznesy_ai\strony\strona z projektami`
- Branch expected: `main`
- Trigger: checkout on Cloudflare still returned Stripe `automatic_payment_methods` error after 40C source fix.
- Audyt before stage: `git grep` showed no active source occurrence of `automatic_payment_methods`, but `npm run cf:build` failed while parsing `package.json` due leading BOM / FEFF.

## FAKTY Z KODU / PLIKÓW

- `package.json` may contain leading UTF-8 BOM introduced by Windows/PowerShell writes.
- Next/OpenNext build can fail while determining webpack output name from `package.json` if BOM is present.
- If latest Cloudflare build fails, public Worker can remain on older deployment and keep old Stripe behavior.

## DECYZJE DAMIANA

- Finalny hosting: Cloudflare.
- Stripe test keys are active first; live keys only standby until production go-live.
- Nie przechodzić do email outbox/live payments before test checkout + webhook + paid fulfillment are confirmed.

## HIPOTEZY / PROPOZYCJE AI

- Main hypothesis: public Cloudflare URL is still serving stale deployment because newest OpenNext build failed on `package.json` BOM.

## DO POTWIERDZENIA

- Cloudflare deployment after this fix should point to the commit containing 40D and should successfully build with `npm run cf:build`.
- Stripe checkout should no longer send `automatic_payment_methods`.

## TESTY AUTOMATYCZNE

Planned:
- `npm run verify:package-json-no-bom-v40d`
- `npm run verify:stripe-checkout-params-v40c`
- `npm run verify:stripe-checkout-params-v40c-v2`
- `npm run typecheck`
- `npm run cf:build`

## GUARDY

- New guard: `scripts/check-package-json-no-bom-v40d.cjs`
- Purpose: fail if `package.json` starts with UTF-8 BOM or is invalid JSON.

## TESTY RĘCZNE

- TEST RĘCZNY DO WYKONANIA: Cloudflare checkout sandbox after successful deployment.
- Expected: Stripe Checkout opens and no longer returns `parameter_unknown: automatic_payment_methods`.

## POTWIERDZENIA DAMIANA

- BRAK POTWIERDZONEGO TESTU RĘCZNEGO after this stage until checkout is retried.

## BRAKI I RYZYKA

- Old untracked run reports and vault notes are intentionally untouched.
- Secrets are not read, displayed, committed, or recorded.

## WPŁYW NA OBSIDIANA

- Add note: `2026-05-18 - Etap 40D package json BOM Cloudflare build fix.md`
- Update production roadmap with blocker and resolution.

## WPŁYW NA KIERUNEK ROZWOJU

- Keeps Cloudflare as final hosting target.
- Unblocks latest Stripe checkout source fix deployment.

## NASTĘPNY KROK

- Deploy Cloudflare latest commit.
- Retry sandbox checkout.
- Run DB guard after successful payment/webhook.

## GIT / ZIP STATUS

- ZIP stage.
- No broad `git add .`.
- Do not stage `_backup_local`, `.obsidian/graph.json`, CloseFlow, Paperclip, or unrelated notes.
