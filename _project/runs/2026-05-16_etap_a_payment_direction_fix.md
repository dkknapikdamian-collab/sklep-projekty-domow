# Run report - Etap A payment direction fix

Data: 2026-05-16
Status: WDROŻONE W PACZCE / DO URUCHOMIENIA LOKALNIE

## FAKTY Z KODU / PLIKÓW

- Repo zawierało aktywny skrypt `verify:manual-payment-v48` w `package.json`.
- Stary guard `scripts/check-manual-payment-v48.cjs` wymuszał teksty ręcznego modelu płatności w checkoutcie.
- Publiczne pliki `components/order/CheckoutForm.tsx` i `app/zamowienie/page.tsx` zawierały komunikację ręcznego flow płatności.
- `_project/16_PRODUCTION_ROADMAP_AND_ACCEPTANCE.md`, `_project/07_NEXT_STEPS.md` i Obsidian zawierały Etap 23 o spójności płatności ręcznej.

## DECYZJE DAMIANA

- Nie wdrażamy płatności ręcznych jako docelowego modelu.
- Obecny manual-payment flow jest legacy / temporary / internal only.
- Przed publicznym udostępnieniem sklepu manual-payment flow ma zostać usunięty albo zastąpiony automatycznymi płatnościami.

## HIPOTEZY / PROPOZYCJE AI

- Najbezpieczniejszy kierunek techniczny to nie usuwać starego pliku guarda bez śladu, tylko wycofać go z aktywnego `npm run verify` i zastąpić guardem kierunku płatności.

## DO POTWIERDZENIA

- Wybór docelowego providera płatności: Stripe/payment provider.
- Dokładny model statusów płatności i zamówienia.
- Runtime test checkoutu po wdrożeniu automatycznych płatności.

## TESTY AUTOMATYCZNE

Do uruchomienia przez APPLY:
- `npm run verify:payment-direction-v48`
- `npm run check:project-memory`
- `npm run typecheck`
- `npm run build`

Opcjonalnie po tym:
- `npm run verify`

## GUARDY

- Nowy aktywny guard: `scripts/check-payment-direction-v48.cjs`.
- Stary `scripts/check-manual-payment-v48.cjs` został zdegradowany do legacy wrappera i nie jest już aktywnym skryptem w `package.json`.

## TESTY RĘCZNE

Status: TEST RĘCZNY DO WYKONANIA.

Sprawdzić:
- `/zamowienie` nie promuje ręcznej płatności jako modelu docelowego,
- checkout opisuje obecny flow jako tymczasowy / legacy / internal only,
- dokumentacja i Obsidian pokazują blocker automatycznych płatności przed publicznym uruchomieniem.

## POTWIERDZENIA DAMIANA

Brak potwierdzonego testu ręcznego po tej paczce.

## BRAKI I RYZYKA

- Automatyczne płatności nie są jeszcze wdrożone.
- Manual-payment flow nadal może istnieć w adminie jako legacy operacyjny, ale nie może być traktowany jako docelowy publiczny model.
- Publiczne uruchomienie sklepu jest zablokowane do czasu wdrożenia albo zaprojektowania docelowego payment flow.

## WPŁYW NA OBSIDIANA

- Aktualizowana notatka: `10_PROJEKTY/Sklep_projekty_domow/11_ROADMAPA PRODUKCYJNA I ODHACZANIE - Sklep projekty domow.md`.
- Wpisuje decyzję Damiana, blocker i status testu ręcznego.

## WPŁYW NA KIERUNEK ROZWOJU

- Etap 23 o płatności ręcznej jako kierunku zostaje usunięty z aktywnej kolejności.
- Nowy kierunek: Etap B przygotowania automatycznych płatności.

## NASTĘPNY KROK

Etap B: zaprojektować automatyczne płatności: provider, webhooki, statusy płatności i guardy regresji.

## GIT / ZIP STATUS

- Paczka ZIP przygotowuje zmiany lokalnie.
- Push wykonuje Damian podanym poleceniem.
