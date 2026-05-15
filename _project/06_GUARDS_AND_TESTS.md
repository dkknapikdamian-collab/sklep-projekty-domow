# 06_GUARDS_AND_TESTS - guardy i testy

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
