# 03_CURRENT_STAGE - aktualny etap

Ostatnia aktualizacja: 2026-05-15 09:19 Europe/Warsaw

## Aktualny etap

Etap 6: Zamowienie V1 - realny zapis i podstawowy panel zamowien w adminie

## Status etapu

Zakonczony kodowo i guardowo lokalnie.

Checkout nadal zapisuje zamowienia do Supabase przez `createOrder`, bez platnosci online, faktur, maili i automatycznej wysylki plikow. Admin ma teraz podstawowy panel `/admin/zamowienia` do recznej obslugi zamowien.

## Cel etapu

Po wyslaniu zamowienia Damian ma widziec rekord w panelu admina, wraz z klientem, kontaktem, suma, statusem, data oraz pozycjami zamowienia, i moze recznie zmienic status obslugi.

## Zakres

- `app/admin/zamowienia/page.tsx`
- `app/admin/zamowienia/actions.ts`
- `lib/admin/orders-admin.ts`
- `components/admin/AdminHeader.tsx`
- `app/admin/page.tsx`
- `app/admin-v8.css`
- `supabase/migrations/0014_orders_v1.sql`
- `supabase/migrations/0015_orders_v42_statuses.sql`
- `scripts/check-order-schema-v38.cjs`
- `scripts/check-admin-orders-v42.cjs`
- `package.json`

## Co zostalo zrobione

- Dodano panel `/admin/zamowienia` zabezpieczony istniejacym middleware admina.
- Panel pobiera zamowienia z `orders`, `order_items` i `order_item_addons` przez server-side service role.
- Lista pokazuje numer/id, klienta, e-mail, telefon, sume, status, date i liczbe pozycji.
- Dodano rozwijany szczegol zamowienia z pozycjami, wariantami, dodatkami, uwagami i danymi do faktury.
- Dodano reczna zmiane statusu zamowienia przez server action.
- Docelowe statusy V1 to: `new`, `contacted`, `paid_manual`, `sent`, `cancelled`.
- Dodano migracje `0015_orders_v42_statuses.sql`, ktora mapuje stare statusy `pending_contact`, `paid`, `completed` na nowe.
- Dodano link do zamowien w headerze admina i kafelek na dashboardzie admina.
- Dodano guard `npm run verify:admin-orders-v42`.

## Czego nie zmieniano

- Nie dodawano platnosci online.
- Nie dodawano automatycznej wysylki plikow.
- Nie dodawano faktur.
- Nie dodawano maili.
- Nie zmieniano publicznego checkoutu poza tym, ze nadal tworzy zamowienie ze statusem `new`.
- Nie dodawano fikcyjnych zamowien ani danych produkcyjnych.

## Wyniki checkow

- `npm run verify:order-schema-v38` - OK
- `npm run verify:cart-order-v38` - OK
- `npm run verify:admin-orders-v42` - OK
- `npm run typecheck` - OK
- `npm run build` - OK, ze starymi ostrzezeniami autoprefixera

## Znane problemy / ryzyka

- Runtime test w przegladarce admina nadal zalezy od dzialajacego lokalnego Supabase Auth / anon key, ktory byl ryzykiem w poprzednich etapach.
- Migracja `0015_orders_v42_statuses.sql` musi zostac zastosowana w bazie, jezeli `0014_orders_v1.sql` bylo juz wdrozone ze starym check constraintem.
- Panel pozwala na reczna obsluge i statusy, ale nie wysyla maili, faktur ani plikow automatycznie.

## Nastepny krok

Przeprowadzic manualny runtime test: wyslac zamowienie z `/zamowienie`, wejsc w `/admin/zamowienia`, rozwinac szczegoly i zmienic status np. z `new` na `contacted`.
