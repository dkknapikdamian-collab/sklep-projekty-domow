# STAGE50 / Etap 25 - utwardzenie modelu zamowienia i danych koszyka

Data: 2026-05-16

## Teza

Zamowienie nie moze zaufac cenom przeslanym z przegladarki w `CartPayload`.

Koszyk klienta moze byc:

- stary,
- zmanipulowany,
- zbudowany na nieaktywnym projekcie,
- zbudowany na starym addon lub wariancie,
- rozjechany wzgledem bazy.

## Co wdrozono

- Dodano `lib/order/validate-cart-against-db.ts`.
- `createOrder` przed zapisem zamowienia wywoluje `validateCartAgainstDb`.
- Total zamowienia jest liczony z walidowanego koszyka, a nie z surowego payloadu klienta.
- Pozycje zamowienia i dodatki sa zapisywane z wartosci potwierdzonych w Supabase.
- Dodano guard `scripts/check-order-price-source-v50.cjs`.
- Dodano skrypt `npm run verify:order-price-source-v50`.
- Wpieto guard na poczatek `npm run verify`.

## Walidacja przed zapisem zamowienia

Dla kazdej pozycji koszyka system pobiera aktualne dane z Supabase:

- projekt po `projectCode`, a awaryjnie po `projectSlug`,
- aktywne warianty projektu,
- aktywne dodatki projektu.

System sprawdza:

- czy projekt istnieje,
- czy projekt ma status `active`,
- czy cena bazowa zgadza sie z baza,
- czy wybrany wariant istnieje i jest aktywny,
- czy cena wariantu zgadza sie z baza,
- czy wybrany addon istnieje i jest aktywny,
- czy cena addonu zgadza sie z baza.

## Komunikat bledu

Gdy dane koszyka nie zgadzaja sie z baza, zamowienie nie jest zapisywane i wraca komunikat:

`Cena projektu lub dodatków zmieniła się. Odśwież koszyk.`

## Granica etapu

Ten etap nie dodaje platnosci online, faktur, panelu klienta ani automatycznej wysylki.

Nie zmienia UI koszyka poza komunikatem bledu przepuszczanym przez checkout action.

## Guard

Komenda:

```powershell
npm run verify:order-price-source-v50
```

Guard pilnuje, ze:

- istnieje walidator Supabase dla koszyka,
- `createOrder` uzywa `validateCartAgainstDb`,
- total liczony jest z `validatedCart`,
- `order_items` sa zapisywane z `validatedCart`,
- nie ma powrotu do `orderTotal(input.cart)` ani petli po `input.cart.items`,
- `package.json` ma guard wpiety do `npm run verify`.

## Test reczny na Vercelu

Minimalny test reczny:

1. Zlozyc normalne zamowienie z aktywnego projektu.
2. Sprawdzic, ze zamowienie nadal powstaje.
3. Zmienic cene projektu/addonu/wariantu w adminie po dodaniu do koszyka.
4. Wrocic do starego koszyka i probowac wyslac zamowienie.
5. Oczekiwany wynik: blad `Cena projektu lub dodatków zmieniła się. Odśwież koszyk.` i brak nowego zamowienia.
6. Zdezaktywowac addon albo wariant po dodaniu do koszyka.
7. Wyslac stary koszyk.
8. Oczekiwany wynik: ten sam blad i brak nowego zamowienia.
9. Zarchiwizowac/ukryc projekt po dodaniu do koszyka.
10. Wyslac stary koszyk.
11. Oczekiwany wynik: ten sam blad i brak nowego zamowienia.

## Status

- Kod: wdrozony.
- Guard: dodany i wpiety.
- Test lokalny npm: do wykonania, bo praca wykonana przez GitHub connector.
- Test reczny Vercel: do wykonania.
