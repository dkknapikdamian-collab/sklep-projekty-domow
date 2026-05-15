# 06_GUARDS_AND_TESTS - guardy i testy


## Hotfix guarda/pacthera po Etapie 12B

Poprzedni patcher Etapu 12 był zbyt kruchy i zatrzymał się na markerze w `updateProjectStatusAction`.

Etap 12B zmienia strategię:

- pełna wymiana funkcji `updateProjectStatusAction`,
- pełna wymiana funkcji `archiveProjectAction`,
- pełna wymiana funkcji `deleteProjectAction`,
- pełna wymiana `app/admin/zamowienia/actions.ts`,
- guard `verify:admin-audit-log-v44` pilnuje migracji, helpera i logowania operacji,
- guard V41 nadal pilnuje layoutu Etapu 11.


## Hotfix guardów po Etapie 11

Naprawiono niespójność między CSS Etapu 11 a guardem `verify:admin-project-list-compact-v41`.

Guard oczekuje teraz:

- `min-width: 1770px`,
- `width: 620px` dla kolumny `Akcje`,
- marker `ETAP11 ARCHIVED FIRST ACTION FIT`,
- obecność archived-first markerów `Archiwizuj` i `Awaryjne`,
- brak powrotu do `min-width: 1640px` i `width: 450px`.

Dodatkowo hotfixowy skrypt PowerShell przerywa pracę po błędzie komendy natywnej, żeby nie commitować repo po nieudanych checkach.


## Checki wymagane dla Etapu 11

```powershell
npm run verify:admin-buttons-v19
npm run verify:admin-project-list-compact-v41
npm run verify:public-project-data-v22
npm run typecheck
npm run build
npm run check:project-memory
```

## Aktualizacja guarda archived-first

Zaostrzono:

```powershell
npm run verify:admin-buttons-v19
```

Guard pilnuje teraz:

- `archiveProjectAction` istnieje w server actions,
- tabela projektów ma normalną akcję `AdminProjectArchiveForm`,
- UI ma marker `data-admin-action="project-archive"`,
- fizyczne usuwanie jest pod markerem `data-admin-action="project-hard-delete"`,
- strefa awaryjna ma marker `data-admin-emergency-delete-panel`,
- delete wymaga `canAttemptPhysicalDelete`,
- delete jest dozwolone tylko dla `archived` albo `draft`,
- projekt `active` ma ostrzeżenie przed awaryjnym delete,
- edycja projektu nadal pozwala ustawić status `archived`,
- lista admina obsługuje komunikat `archived=1`.

Dodatkowo `verify:admin-project-list-compact-v41` pilnuje, że nowa akcja `Archiwizuj` nie rozjeżdża tabeli.


## Aktualizacja guarda po Etapie 10B

`npm run verify:admin-project-list-compact-v41` pilnuje teraz także zaakceptowanego układu wizualnego:

- obecność markera `ETAP10B ADMIN PROJECTS ACTION COLUMN FIT LOCK`,
- tabela ma `min-width: 1640px`,
- kolumna `Akcje` ma `width: 450px`,
- akcje mają `gap: 4px`,
- przyciski akcji mają `font-size: 10.25px`,
- guard blokuje powrót do `width: 286px`, `min-width: 1600px`, `gap: 5px` i `font-size: 10.5px` w bloku Stage41,
- guard nadal blokuje powrót do `table-layout: auto`, `overflow: visible` i `white-space: normal`.


## Checki wymagane dla Etapu 10

```powershell
npm run verify:admin-project-list-compact-v41
npm run verify:admin-buttons-v19
npm run typecheck
npm run build
npm run check:project-memory
```

## Aktualizacja guarda layoutu listy projektów admina

Zaostrzono:

```powershell
npm run verify:admin-project-list-compact-v41
```

Guard pilnuje teraz dodatkowo:

- `/admin/projekty` używa page-specific klasy `admin-projects-shell`,
- tabela ma wrapper z poziomym overflow `data-admin-projects-table-scroll`,
- karta tabeli ma klasę `admin-projects-table-card`,
- tabela ma `min-width: 1600px` i `table-layout: fixed`,
- komórki są jednowierszowe z `white-space: nowrap` i `text-overflow: ellipsis`,
- akcje tabeli mają `flex-wrap: nowrap`,
- delete safety w tabeli nie wymusza `width: 100%`,
- stary problematyczny układ `table-layout: auto`, `overflow: visible` i `white-space: normal` nie wraca w bloku Stage41.

## Checki wymagane dla Etapu 8

Skrypt wdrożeniowy uruchamia:

```powershell
npm run verify:admin-project-media-v34
npm run verify:project-media-controls-v34
npm run verify:admin-orders-v42
npm run typecheck
npm run build
npm run check:project-memory
```

## Aktualizacja guardów w Etapie 8

Zaostrzono:

- `npm run verify:admin-orders-v42`, żeby pilnował panelu ręcznej realizacji zamówienia, prywatnych plików, dodatku PDF na e-mail i checklisty,
- `npm run verify:admin-project-media-v34`, żeby pilnował, że prywatne pliki w edycji projektu są oznaczone jako źródło ręcznej realizacji.

Guard `verify:admin-orders-v42` dodatkowo blokuje w tym zakresie markery automatyzacji, których nie wolno jeszcze dodawać: signed URL, automatyczny mailing, Stripe i PayU.

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


## Checki wymagane dla Etapu 9

```powershell
npm run verify:admin-project-media-v34
npm run verify:project-media-controls-v34
npm run verify:admin-buttons-v19
npm run typecheck
npm run build
npm run check:project-memory
```

## Aktualizacja guarda admin delete safety

`npm run verify:admin-buttons-v19` pilnuje teraz dodatkowo:

- `AdminProjectDeleteForm` nie jest zwykłym linkiem,
- delete używa `deleteProjectAction`,
- formularz wymaga `deleteConfirmCode`,
- UI ma `expectedProjectCode` i `isCodeConfirmed`,
- przycisk jest zablokowany bez poprawnego kodu,
- zachowane jest `window.confirm`,
- active project ma marker `data-admin-delete-active-warning`.
