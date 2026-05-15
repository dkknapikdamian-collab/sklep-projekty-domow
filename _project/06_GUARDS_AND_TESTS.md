# 06_GUARDS_AND_TESTS - Guardy i testy automatyczne


## Checki wymagane dla Etapu 17

```powershell
npm run verify:manual-payment-v48
npm run verify:cart-order-v38
npm run verify:admin-orders-v42
npm run typecheck
npm run build
npm run check:project-memory
```

## Nowy guard płatności manualnej

Dodano:

```powershell
npm run verify:manual-payment-v48
```

Guard pilnuje:

- komunikatu płatności po kontakcie w checkoutcie,
- braku automatycznej płatności online,
- migracji `0018_order_manual_payment_instruction.sql`,
- pola `payment_instruction`,
- formularza instrukcji przelewu w `/admin/zamowienia/[id]`,
- wykorzystania instrukcji przelewu w roboczym e-mailu,
- braku Stripe/PayU/automatycznego księgowania.

## Guard pamięci projektu

| Komenda | Co sprawdza | Kiedy uruchamiać | Ostatni wynik | Czego nie pokrywa |
|---|---|---|---|---|
| `node scripts/check-project-memory.cjs` | Istnienie i minimalną treść plików `AGENTS.md`, `_project/`, raportów AI oraz plików Obsidiana dla sklepu, jeśli vault istnieje. | Po każdej zmianie pamięci projektu. | Do uruchomienia po wdrożeniu paczki. | Nie sprawdza działania aplikacji, UI ani checkoutu. |
| `npm run check:project-memory` | Alias do `node scripts/check-project-memory.cjs`. | Po każdej zmianie pamięci projektu. | Do uruchomienia po wdrożeniu paczki. | Jak wyżej. |

## Guardy ogólne aplikacji

| Komenda | Co sprawdza | Kiedy uruchamiać | Ostatni wynik | Czego nie pokrywa |
|---|---|---|---|---|
| `npm run typecheck` | Typy TypeScript, jeśli skrypt istnieje. | Po zmianach kodu. | Do uruchomienia lokalnie. | Nie sprawdza ręcznie UI. |
| `npm run build` | Build produkcyjny Next.js. | Po zmianach kodu i przed pushem. | W poprzednich pracach build był uruchamiany; aktualny wynik trzeba potwierdzić. | Nie potwierdza, że wszystkie przyciski admina działają logicznie. |

## Guardy wymagane / do sprawdzenia w repo

Te guardy są ważne, ale ich istnienie trzeba potwierdzić w aktualnym repo:

1. Admin buttons/action map:
   - sprawdza, czy `Edytuj`, `Zapisz`, `Anuluj`, status, delete mają realne handlery.
2. Delete active warning:
   - sprawdza ostrzeżenie przy usuwaniu aktywnego projektu,
   - oczekiwany marker: `data-admin-delete-active-warning` albo równoważny.
3. Catalog active-only:
   - katalog publiczny nie może pokazywać projektów roboczych.
4. PDF e-mail addon:
   - dodatek ma cenę +250 zł,
   - jest widoczny w koszyku/checkout/zamówieniu,
   - nie zastępuje bazowej dostawy cyfrowej.
5. Checkout V1 flow:
   - projekt -> koszyk -> checkout -> zamówienie.

## Braki w testach

- Brak pewnego, zapisanego tutaj wyniku pełnego testu checkoutu.
- Brak pewnego, zapisanego tutaj wyniku pełnego testu admina po ostatnich poprawkach.
- Brak potwierdzenia, że dodatek PDF +250 zł jest spięty przez wszystkie warstwy.
- Brak potwierdzenia, że Obsidian i repo są po każdym etapie zsynchronizowane.

## Zasada dla kolejnych AI developerów

Jeśli dotykasz funkcji, dodaj albo zaktualizuj guard. Jeśli guard jest nierealny, wpisz w raporcie: `brak guardu - tylko test ręczny` i podaj dokładny test ręczny.
