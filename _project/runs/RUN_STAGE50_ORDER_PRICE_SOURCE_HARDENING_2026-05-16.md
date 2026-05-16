# RUN_STAGE50_ORDER_PRICE_SOURCE_HARDENING_2026-05-16

## FAKTY Z KODU / PLIKOW

- Przed etapem `lib/order/create-order.ts` liczyl `totalGross` przez `orderTotal(input.cart)` i zapisywal `order_items` z `input.cart.items`.
- To oznaczalo, ze klientowy `CartPayload` byl zrodlem ceny dla zamowienia.
- Migracje potwierdzaja, ze `projects`, `project_addons` i `project_variants` maja pola cenowe oraz aktywnosc/status.

## DECYZJE DAMIANA

- Etap 25: utwardzenie modelu zamowienia i danych koszyka.
- Nie mozna zlozyc zamowienia z nieaktywnym projektem, starym addonem ani zmanipulowana cena.

## CO ZMIENIONO

- Dodano `lib/order/validate-cart-against-db.ts`.
- Zmieniono `lib/order/create-order.ts`, aby uzywal `validateCartAgainstDb` przed zapisem.
- Dodano `scripts/check-order-price-source-v50.cjs`.
- Dodano `verify:order-price-source-v50` do `package.json` i wpieto na poczatek `npm run verify`.
- Dodano `docs/implementation/STAGE50_ORDER_PRICE_SOURCE_HARDENING.md`.

## GUARDY

Dodano:

```powershell
npm run verify:order-price-source-v50
```

Guard pilnuje, ze:

- istnieje walidator koszyka wzgledem Supabase,
- sprawdzany jest projekt active,
- sprawdzane sa aktywne warianty i addony,
- ceny projektu, wariantu i addonu sa porownywane z baza,
- `createOrder` liczy total z `validatedCart`,
- `createOrder` nie wraca do `orderTotal(input.cart)` ani petli po `input.cart.items`.

## TESTY AUTOMATYCZNE

Nie uruchomiono lokalnie w tym srodowisku.

Do wykonania:

```powershell
npm run verify:order-price-source-v50
npm run verify
npm run typecheck
npm run build
npm run check:project-memory
```

## TESTY RECZNE

Status: TEST RECZNY DO WYKONANIA.

Na Vercelu sprawdzic:

1. Normalne zamowienie nadal powstaje.
2. Po zmianie ceny projektu po dodaniu do koszyka stary checkout pokazuje blad i nie zapisuje zamowienia.
3. Po zmianie ceny addonu po dodaniu do koszyka stary checkout pokazuje blad i nie zapisuje zamowienia.
4. Po dezaktywacji wariantu/addonu stary checkout pokazuje blad i nie zapisuje zamowienia.
5. Po ukryciu/archiwizacji projektu stary checkout pokazuje blad i nie zapisuje zamowienia.

Oczekiwany blad:

`Cena projektu lub dodatków zmieniła się. Odśwież koszyk.`

## POTWIERDZENIA DAMIANA

Etap 24/STAGE49:
- Damian potwierdzil czesciowo: 1 OK, 2 OK, 3 OK, 5 OK, 6 OK, reszta ogolnie OK.
- Punkt 4 katalog active-only: `chyba ok` - nie zapisano jako pelne potwierdzenie.

Etap 25/STAGE50:
- Brak potwierdzenia runtime.

## BRAKI I RYZYKA

- Nie bylo lokalnego `npm run build` w srodowisku ChatGPT.
- Typy Supabase sa luzne przez `SupabaseClient`; realny build trzeba potwierdzic na CI/Vercel.
- Test manipulacji koszyka trzeba wykonac na Vercelu przez stary koszyk po zmianie ceny/statusu w adminie.

## WPLYW NA OBSIDIANA

Wymagana aktualizacja Obsidiana:
- Etap 24: czesciowe potwierdzenie Damiana, bez pelnego zamkniecia.
- Etap 25: wdrozony kod i guard, test reczny do wykonania.

## NASTEPNY KROK

Sprawdzic deploy Vercel i wykonac test stary koszyk vs zmieniona cena/status.

## GIT / ZIP STATUS

Tryb: push przez GitHub connector.
Repo aplikacji: commitowane przez GitHub API.
Obsidian: do aktualizacji osobnym commitem.
