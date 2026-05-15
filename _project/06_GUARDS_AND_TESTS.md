# 06_GUARDS_AND_TESTS - guardy i testy

## Checki wymagane dla Etapu 7

Do uruchomienia po wdrożeniu:

```powershell
npm run verify:content
npm run verify:cart-order-v38
npm run typecheck
npm run build
npm run check:project-memory
```

## Aktualizacja guarda checkoutu w Etapie 7

Zaostrzono istniejący guard:

```powershell
npm run verify:cart-order-v38
```

Guard sprawdza teraz dodatkowo komunikację checkoutu:

- obecność `Zamówienie projektu`,
- obecność `Po wysłaniu potwierdzimy dostępność, płatność i sposób realizacji`,
- opis tego, że klient kupuje wybrane projekty, warianty i dodatki z koszyka,
- opis ręcznego przekazania plików po potwierdzeniu dostępności, płatności i realizacji,
- opis `PDF na e-mail` jako dodatkowego pakietu PDF,
- obecność informacji, że po zamówieniu nastąpi kontakt,
- brak tekstów typu `zamówienie testowe`, `zamowienie testowe`, `zamówienia testowego`,
- brak technicznego komunikatu `rekord trafi do Supabase` w publicznym checkoutcie.

## Aktualizacja guarda pamieci projektu 2026-05-15

`npm run check:project-memory` sprawdza teraz rowniez:

- `_project/10_PROJECT_TIMELINE.md`,
- `_project/history/`,
- odniesienia do `_project/09_CONTEXT_FOR_OBSIDIAN.md`,
- odniesienia do `_project/10_PROJECT_TIMELINE.md`,
- odniesienia do `_project/history/` w `AGENTS.md`.

## Checki wymagane dla Etapu 6

Uruchomione 2026-05-15:

```powershell
npm run verify:order-schema-v38
npm run verify:cart-order-v38
npm run verify:admin-orders-v42
npm run typecheck
npm run build
```

Wynik:

- `verify:order-schema-v38` - OK
- `verify:cart-order-v38` - OK
- `verify:admin-orders-v42` - OK
- `typecheck` - OK
- `build` - OK, ze starymi ostrzezeniami autoprefixera

## Guard panelu zamowien admina

Dodany w Etapie 6:

```powershell
npm run verify:admin-orders-v42
```

Guard sprawdza:

- istnienie `/admin/zamowienia`,
- server action do zmiany statusu zamowienia,
- repozytorium `lib/admin/orders-admin.ts`,
- odczyt `orders`, `order_items` i `order_item_addons`,
- statusy `new`, `contacted`, `paid_manual`, `sent`, `cancelled`,
- markery listy, karty, szczegolow i pozycji zamowienia,
- link do panelu zamowien w `AdminHeader`,
- kafelek zamowien na dashboardzie admina,
- migracje statusow V42,
- wpis `verify:admin-orders-v42` w `package.json` i glownym `npm run verify`.

## Checki wymagane dla Etapu 5

Uruchomione 2026-05-15:

```powershell
npm run verify:cart-order-v38
npm run typecheck
npm run build
```

Wynik:

- `verify:cart-order-v38` - OK
- `typecheck` - OK
- `build` - OK, ze starymi ostrzezeniami autoprefixera

## Guard koszyka i lokalnych licznikow

Zaostrzony w Etapie 5:

```powershell
npm run verify:cart-order-v38
```

Guard sprawdza teraz dodatkowo:

- walidacje localStorage przez `safeCartPayload` i `normalizeCartItem`,
- wymagane pola pozycji koszyka: kod projektu, slug, nazwa, cena bazowa, wariant, cena wariantu, dostepne i wybrane dodatki,
- markery pozycji w koszyku: `data-cart-item-code`, `data-cart-item-slug`, `data-cart-item-variant`, `data-cart-item-total`,
- filtrowanie wybranych dodatkow do dodatkow dostepnych,
- obsluge dodatku PDF/email przez `send_pdf_email` i `data-project-pdf-email-addon`,
- klientowy licznik koszyka w headerze oparty o `readCart()` i `project-cart-updated`,
- lokalne ulubione oparte o `project-favorites-v1` i `project-favorites-updated`,
- aktywny przycisk ulubionych z `aria-pressed` i markerami `data-favorite-*`.
## Checki wymagane dla Etapu 4

Uruchomione 2026-05-15:

```powershell
npm run verify:public-project-detail-sales-v37
npm run verify:cart-order-v38
npm run typecheck
npm run build
npm run check:project-memory
```

Wynik:

- `verify:public-project-detail-sales-v37` - OK
- `verify:cart-order-v38` - OK
- `typecheck` - OK
- `build` - OK
- `check:project-memory` - OK

## Guard karty projektu jako strony sprzedazowej

Zaostrzony w Etapie 4:

```powershell
npm run verify:public-project-detail-sales-v37
```

Guard sprawdza teraz dodatkowo:

- uklad glownej karty: galeria -> purchase box -> statystyki -> sekcje -> podobne projekty,
- alias `ProjectMediaGallery` do realnej galerii,
- obecnosc sekcji: opis, rzuty, elewacje, pomieszczenia, dane techniczne, co zawiera projekt, dodatki, podobne projekty,
- obecnosc wyboru wariantu,
- obecnosc wyboru dodatkow,
- obecnosc czytelnego CTA `DODAJ DO KOSZYKA`,
- przekazanie wariantu i dodatkow do koszyka,
- specjalne oznaczenie dodatku `send_pdf_email`,
- domyslny dodatek `Pakiet PDF na e-mail` z cena `250` w formularzu tworzenia projektu,
- minimalna liczba opcji w slownikach admina i mozliwosc dodania opcji recznie.

## Checki wymagane dla Etapu 3

Uruchomione 2026-05-15:

```powershell
npm run verify:public-project-data-v22
npm run verify:public-catalog-filters-v22b
npm run verify:public-project-detail-sales-v37
npm run typecheck
npm run build
npm run check:project-memory
```

Wynik:

- `verify:public-project-data-v22` - OK
- `verify:public-catalog-filters-v22b` - OK
- `verify:public-project-detail-sales-v37` - OK
- `typecheck` - OK
- `build` - OK
- `check:project-memory` - OK

## Guard publicznej widocznosci projektow

Zaostrzony w Etapie 3:

```powershell
npm run verify:public-project-data-v22
```

Guard sprawdza:

- `lib/project-repository.ts` pobiera publiczne projekty z jawnym `.eq("status", "active")`.
- `/projekty/[slug]` korzysta z `getPublicProjects()`.
- Podobne projekty korzystaja z `getPublicProjects()`.
- Publiczne strony i komponenty nie robia bezposredniego `.from("projects")` poza repozytorium.
- Publiczny katalog i karta projektu sa powiazane z danymi z admina.

## Checki wymagane dla Etapu 2

Uruchomione 2026-05-15:

```powershell
npm run verify:admin-buttons-v19
npm run check:project-memory
npm run typecheck
npm run build
```

Wynik:

- `verify:admin-buttons-v19` - OK
- `check:project-memory` - OK
- `typecheck` - OK
- `build` - OK

Runtime test admina byl zablokowany przez `Invalid API key` z Supabase Auth przy uzyciu lokalnego `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

## Checki wymagane dla Etapu 1

Etap 1 zaostrzyl:

```powershell
npm run verify:admin-buttons-v19
```

Guard pilnuje realnych linkow, formularzy i server actions dla adminowych akcji: edit, save, cancel, status, delete.

## Guard pamieci projektu

```powershell
npm run check:project-memory
```

Uruchamia:

```powershell
node scripts/check-project-memory.cjs
```

Sprawdza:

- Istnienie `AGENTS.md`.
- Istnienie wymaganych plikow `_project`.
- Istnienie `_project/runs/.gitkeep`.
- Podstawowe odwolywania w `AGENTS.md` do plikow pamieci projektu.

## Kiedy aktualizowac guardy

- Gdy zmienia sie struktura `_project`.
- Gdy zmienia sie lista obowiazkowych plikow pamieci projektu.
- Gdy funkcja produktu zostaje usunieta albo zastapiona i stary guard pilnuje juz nieaktualnego zachowania.
- Gdy runtime test wykaze blad w przeplywie admina albo publicznej sprzedazy, ktory mozna zabezpieczyc automatycznie.
