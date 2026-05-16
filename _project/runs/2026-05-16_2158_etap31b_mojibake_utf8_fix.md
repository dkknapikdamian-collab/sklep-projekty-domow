# Run report - Etap 31B mojibake UTF-8 fix

## Scan-first confirmation

- Repo: sklep-projekty-domow.
- Branch: main.
- Źródła przeczytane przed przygotowaniem: aktywna mapa projektu, AGENTS.md, _project/01_PROJECT_GOAL.md, package.json, app/zamowienie/page.tsx, components/order/CheckoutForm.tsx, scripts/check-manual-payment-v48.cjs, wynik grep Damiana.
- Aktywne źródło prawdy: repo dla kodu/guardów/_project, Obsidian dla dashboardu/statusu/zasad pracy.

## FAKTY Z KODU / PLIKÓW

- Etap 31 poprawił kierunek checkoutu, ale wprowadził mojibake w polskich znakach.
- Paczka 31B V1 nie uruchomiła się przez błąd PowerShell: `"$Label: $Path"`.
- V2 używa ASCII-only APPLY i Base64 UTF-8 payload.

## DECYZJE DAMIANA

- Poprawić błąd.
- Wyjaśnić przyczynę częstych błędów tego typu.
- Wtrożyć zasadę do Obsidiana jako regułę dla każdego developera.
- Nie pushować samodzielnie przez AI, tylko dać ZIP i polecenie.

## HIPOTEZY / PROPOZYCJE AI

- Główna przyczyna: mieszanie wygenerowanego PowerShella, polskich znaków i interpolacji zmiennych w jednym pliku wykonywalnym.
- Realna prewencja: skrypt loader ASCII-only, dane jako Base64 UTF-8, zakaz `$var:` w interpolacji.

## TESTY AUTOMATYCZNE

APPLY V2 uruchamia:
- `node scripts/check-checkout-mojibake-v31b.cjs`
- `npm run verify:payment-direction-v48`
- `npm run typecheck`
- `npm run build`
- `npm run check:project-memory`

## GUARDY

- Dodano `verify:checkout-mojibake-v31b`.
- Wzmocniono `scripts/check-manual-payment-v48.cjs`, żeby wykrywał mojibake w checkoutcie.

## TESTY RĘCZNE

- TEST RĘCZNY DO WYKONANIA: sprawdzić `/zamowienie` w przeglądarce.

## WPŁYW NA OBSIDIANA

- Dopisywana jest globalna zasada `POWERSHELL_PACKAGE_ENCODING_PREVENTION_V1` do `00_INSTRUKCJA_OBSIDIAN_DLA_AI.md`.
- Dopisywany jest wpis Etapu 31B do dashboardu projektu Sklep.

## GIT / ZIP STATUS

- Dostarczenie: ZIP + lokalne polecenie PowerShell.
- Push wykonuje Damian lokalnie po przejściu testów.
