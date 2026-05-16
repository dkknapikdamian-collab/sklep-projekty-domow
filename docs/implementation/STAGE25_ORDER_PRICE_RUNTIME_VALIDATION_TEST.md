# STAGE25_ORDER_PRICE_RUNTIME_VALIDATION_TEST

Status: WDROŻONE W ZIP / TEST AUTOMATYCZNY DO URUCHOMIENIA LOKALNIE
Data: 2026-05-16

## Cel

Domknąć lukę po statycznym wdrożeniu Etapu 25: walidacja cen koszyka względem bazy ma mieć test runtime z mockiem Supabase.

## Zakres

Dodano guard:

```powershell
npm run verify:order-price-runtime-v25
```

Guard ładuje `lib/order/validate-cart-against-db.ts`, transpilu­je go przez lokalny pakiet `typescript` i uruchamia na mocku Supabase bez realnych sekretów i bez realnej bazy.

## Co testuje guard

- poprawny koszyk przechodzi i dane są normalizowane z DB,
- projekt może zostać odnaleziony po `slug`, gdy `projectCode` jest pusty,
- wariant podstawowy przechodzi bez płatnego rekordu wariantu,
- stary koszyk ze zmienioną ceną bazową jest odrzucany,
- nieaktywny projekt jest odrzucany,
- usunięty addon jest odrzucany,
- zmieniona cena addonu jest odrzucana,
- usunięty płatny wariant jest odrzucany,
- zmieniona cena wariantu jest odrzucana.

## Czego nie testuje

- realnych danych Supabase,
- realnego kliknięcia checkoutu w przeglądarce,
- faktycznego zapisu zamówienia w tabelach `orders`, `order_items`, `order_item_addons`.

## Test ręczny po wdrożeniu

Status: TEST RĘCZNY DO WYKONANIA.

Minimalny test ręczny na realnych danych Supabase:

1. Utwórz/wybierz aktywny projekt z wariantem i addonem.
2. Dodaj projekt do koszyka.
3. W Supabase zmień cenę bazową projektu i spróbuj złożyć zamówienie ze starego koszyka.
4. Przywróć cenę bazową, zmień cenę wariantu i spróbuj ponownie.
5. Przywróć wariant, zmień cenę addonu albo wyłącz/usun addon i spróbuj ponownie.
6. Ustaw projekt jako nieaktywny i spróbuj ponownie.
7. Oczekiwany wynik: checkout pokazuje komunikat `Cena projektu lub dodatków zmieniła się. Odśwież koszyk.` i nie zapisuje zamówienia ze starych danych klienta.

## Komendy minimalne

```powershell
npm run verify:order-price-source-v50
npm run verify:order-price-runtime-v25
npm run typecheck
npm run build
npm run check:project-memory
```
