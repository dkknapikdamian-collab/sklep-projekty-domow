# 03_CURRENT_STAGE - aktualny etap

Ostatnia aktualizacja: 2026-05-15 09:42 Europe/Warsaw

## Aktualny etap

Etap 7: Checkout - komunikacja półprodukcyjna V1

## Status etapu

Zakończony kodowo w paczce wdrożeniowej. Do potwierdzenia lokalnie po uruchomieniu checków i manualnym przejściu checkoutu.

Checkout nadal zapisuje zamówienia do Supabase przez `createOrder`, bez płatności online, faktur, maili i automatycznej wysyłki plików. Zmieniono wyłącznie komunikację publicznego checkoutu, aby nie wyglądał jak demo/test, ale też nie obiecywał automatyzacji, której jeszcze nie ma.

## Cel etapu

Usunąć wrażenie, że sklep jest zabawką. Klient ma widzieć uczciwy proces V1: składa zamówienie projektu, a dostępność, płatność i sposób realizacji są potwierdzane ręcznie po wysłaniu formularza.

## Zakres

- `app/zamowienie/page.tsx`
- `components/order/CheckoutForm.tsx`
- `app/zamowienie/actions.ts`
- `scripts/check-cart-order-v38.cjs`
- `_project/03_CURRENT_STAGE.md`
- `_project/04_DECISIONS.md`
- `_project/05_MANUAL_TESTS.md`
- `_project/06_GUARDS_AND_TESTS.md`
- `_project/07_NEXT_STEPS.md`
- `_project/08_CHANGELOG_AI.md`
- `_project/09_CONTEXT_FOR_OBSIDIAN.md`
- `_project/10_PROJECT_TIMELINE.md`
- `_project/runs/2026-05-15_0942_checkout-v1-copy.md`

## Co zostało zrobione

- Zmieniono nagłówek checkoutu z komunikacji testowej na `Zamówienie projektu`.
- Dodano jasny komunikat: `Po wysłaniu potwierdzimy dostępność, płatność i sposób realizacji`.
- Dopisano, co klient kupuje: wybrane projekty, warianty i dodatki z koszyka.
- Dopisano, kiedy klient dostanie pliki: po ręcznym potwierdzeniu dostępności, płatności i realizacji.
- Dopisano, czym jest PDF na e-mail: dodatkowy pakiet PDF wysyłany na podany adres po potwierdzeniu realizacji.
- Zmieniono zgody z tekstu o zamówieniu testowym na kontakt w sprawie zamówienia projektu.
- Zmieniono komunikat sukcesu na półprodukcyjny V1, bez obietnicy automatycznej płatności lub natychmiastowej wysyłki plików.
- Zaostrzono `verify:cart-order-v38`, żeby pilnował wymaganych tekstów checkoutu i blokował powrót tekstów typu `zamówienie testowe`.

## Czego nie zmieniano

- Nie dodawano płatności online.
- Nie dodawano automatycznej wysyłki plików.
- Nie dodawano maili.
- Nie dodawano faktur.
- Nie zmieniano tabel Supabase.
- Nie zmieniano routingu.
- Nie zmieniano ogólnego stylu wizualnego.

## Checki wymagane po wdrożeniu

```powershell
npm run verify:content
npm run verify:cart-order-v38
npm run typecheck
npm run build
```

Dodatkowo po aktualizacji pamięci projektu:

```powershell
npm run check:project-memory
```

## Znane problemy / ryzyka

- Pełny runtime test nadal wymaga działającego lokalnego środowiska i realnego projektu w koszyku.
- Checkout jest ręczny i uczciwy, ale nadal nie ma automatycznych płatności, maili ani wysyłki plików.
- PDF na e-mail musi pozostać dodatkiem do ręcznej realizacji, a nie obietnicą natychmiastowej dostawy.

## Następny krok

Uruchomić checki, wejść w `/zamowienie` z pozycją w koszyku i ręcznie sprawdzić, czy checkout brzmi sprzedażowo, ale nie obiecuje automatyzacji.
