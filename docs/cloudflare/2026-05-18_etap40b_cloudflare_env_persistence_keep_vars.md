# Etap 40B-FIX - Cloudflare env persistence keep_vars

Data: 2026-05-18  
Project ID: sklep-projekty-domow

## Cel

Naprawić ryzyko znikania/zerowania runtime variables w Cloudflare po deployu z Wrangler.

## Przyczyna

Cloudflare traktuje `wrangler.jsonc` jako źródło prawdy dla konfiguracji Workera. Jeżeli runtime variables są zmieniane w dashboardzie, kolejny deploy Wrangler może je nadpisać albo usunąć, jeśli nie ustawiono `keep_vars=true`.

## Zmiana

W `wrangler.jsonc` dodano:

```json
"keep_vars": true
```

## Zasada po fixie

- publiczne wartości bez sekretów można trzymać w dashboardzie Cloudflare,
- sekrety nadal nie trafiają do repo,
- kolejne deploye nie powinny usuwać dashboard runtime variables,
- build variables w Cloudflare nadal są osobną sekcją i trzeba je uzupełniać osobno dla `NEXT_PUBLIC_*`.

## Testy

- `npm run verify:cloudflare-env-persistence-v40b`

## Ręcznie po wdrożeniu

1. Sprawdzić Cloudflare Runtime `Variables and Secrets`.
2. Jeżeli wpisy znikły przed fixem, dodać je ponownie ostatni raz.
3. Sprawdzić Build `Variables and secrets`.
4. Uruchomić redeploy.
5. Sprawdzić publiczną stronę i admin.
