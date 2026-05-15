# 08_CHANGELOG_AI — changelog pracy AI

## 2026-05-14 22:35 - Etap 1: Audyt i stabilizacja akcji panelu admina

- Przeczytano `AGENTS.md` oraz pliki `_project/` jako źródło prawdy.
- Zmapowano główne widoczne akcje panelu admina.
- Potwierdzono, że lista projektów używa realnych linków/formularzy dla edycji, podglądu publicznego, zmiany statusu i usuwania.
- Dodano jawne markery `data-admin-action` dla akcji admina, żeby guard nie opierał się na domysłach.
- Usunięto fałszywy legacy marker z komentarza w `app/admin/projekty/[id]/edytuj/page.tsx`.
- Zaostrzono `scripts/check-admin-buttons-v19.cjs`, aby sprawdzał realny `components/admin/AdminProjectEditForm.tsx` zamiast komentarza na stronie edycji.
- Nie zmieniano ogólnego stylu wizualnego.
- Nie zmieniano routingu.
- Nie zmieniano funkcji niezwiązanych z panelem admina.

### Pliki zmienione

- `components/admin/AdminProjectsTable.tsx`
- `components/admin/AdminProjectDeleteForm.tsx`
- `components/admin/AdminProjectEditForm.tsx`
- `app/admin/projekty/[id]/edytuj/page.tsx`
- `scripts/check-admin-buttons-v19.cjs`
- `_project/03_CURRENT_STAGE.md`
- `_project/05_MANUAL_TESTS.md`
- `_project/06_GUARDS_AND_TESTS.md`
- `_project/07_NEXT_STEPS.md`
- `_project/08_CHANGELOG_AI.md`
- `_project/09_CONTEXT_FOR_OBSIDIAN.md`
- `_project/runs/2026-05-14_2235_admin-action-audit.md`

### Testy / guardy

Do uruchomienia lokalnie:

```powershell
npm run verify:admin-buttons-v19
npm run check:project-memory
npm run typecheck
npm run build
```

### Wynik

Kodowo etap został wdrożony przez GitHub API. Runtime test w przeglądarce i Supabase nadal musi zostać wykonany ręcznie.

### Ryzyka

- Statyczny guard nie sprawdza realnego kliknięcia w przeglądarce.
- Zmiana statusu i usuwanie wymagają działającego Supabase oraz sesji admina.
- Akcje mediów w edycji projektu wymagają oddzielnego ręcznego potwierdzenia.

## 2026-05-14 21:20 - Etap 0: Utworzenie pamięci projektu

- Utworzono `AGENTS.md`.
- Utworzono folder `_project/`.
- Dodano pliki pamięci projektu.
- Dodano guard `scripts/check-project-memory.cjs`.
- Dodano skrypt `check:project-memory` do `package.json`.
- Dodano raport run w `_project/runs/`.
- Nie zmieniano logiki aplikacji.
- Nie zmieniano UI.
- Nie zmieniano routingu.
- Nie zmieniano komponentów produktu.

## Zasada dalszych wpisów

Każdy większy etap ma dopisać nowy wpis z:

- datą,
- nazwą etapu,
- plikami zmienionymi,
- testami uruchomionymi,
- wynikiem testów,
- znanymi ryzykami,
- następnym krokiem.

## 2026-05-15 08:02 - Etap 2: Runtime test panelu admina

- Sprawdzono wskazane pliki panelu admina bez zmian w kodzie.
- Uruchomiono lokalny runtime Next na porcie `3100`.
- Utworzono tymczasowe konto admina i tymczasowy projekt testowy w Supabase.
- Potwierdzono, ze service role dziala dla tworzenia i sprzatania danych testowych.
- Proba logowania w przegladarce na `/admin/login` zakonczyla sie bledem Supabase Auth: `Invalid API key`.
- Usunieto tymczasowy projekt, profil i uzytkownika testowego.
- Nie zmieniano UI, routingu, publicznego katalogu, koszyka ani checkoutu.
- Nie zmieniano `components/admin/*` ani `app/admin/projekty/actions.ts`, bo test nie wykazal bledu w kodzie przyciskow; wykazal bloker konfiguracji anon key.
- Uruchomione testy:
  - `npm run verify:admin-buttons-v19` - OK
  - `npm run check:project-memory` - OK
  - `npm run typecheck` - OK
  - `npm run build` - OK, z istniejacymi ostrzezeniami autoprefixera
- Znane ryzyko: kryterium zakonczenia etapu nie jest spelnione, dopoki Damian nie potwierdzi recznie edycji, zapisu, anulowania, statusu i usuwania po naprawie anon key.
- Nastepny krok: poprawic lokalne `NEXT_PUBLIC_SUPABASE_ANON_KEY` tak, aby pasowal do projektu Supabase z `SUPABASE_SERVICE_ROLE_KEY`, potem powtorzyc runtime test.

## 2026-05-15 08:19 - Etap 3: Spojnosc admin -> publiczny katalog -> karta projektu

- Sprawdzono `lib/project-repository.ts`, publiczny katalog, karte projektu, komponenty publiczne i adminowe mapowanie danych.
- Zaostrzono `scripts/check-public-project-data-v22.cjs`.
- Guard wymaga teraz jawnego publicznego filtra `.eq("status", "active")` przy pobieraniu projektow.
- Guard pilnuje, ze `/projekty/[slug]` i podobne projekty korzystaja z `getPublicProjects()`, a nie z osobnego pobierania po slugu/statusie.
- Guard blokuje bezposrednie publiczne query `.from("projects")` poza `lib/project-repository.ts`.
- Guard sprawdza powiazania publicznej karty z danymi admina: nazwa, cena, slug, kod, warianty, dodatki, media, pomieszczenia i parametry techniczne.
- Nie zmieniano designu karty, stylu katalogu, filtrowania, koszyka ani checkoutu.
- Uruchomione testy:
  - `npm run verify:public-project-data-v22` - OK
  - `npm run verify:public-catalog-filters-v22b` - OK
  - `npm run verify:public-project-detail-sales-v37` - OK
  - `npm run typecheck` - OK
  - `npm run build` - OK
  - `npm run check:project-memory` - OK
- Znane ryzyko: pelny runtime admin -> public nadal zalezy od dzialajacego logowania admina, ktore lokalnie blokowal anon key w Etapie 2.

## 2026-05-15 08:35 - Etap 4: Karta projektu jako glowna strona sprzedazowa

- Doprecyzowano publiczny dodatek PDF na e-mail w `ProjectPurchaseBox`.
- Dodano komunikat, ze PDF na e-mail jest opcjonalny i nie zastepuje podstawowej dostawy projektu.
- CTA `DODAJ DO KOSZYKA` dostalo stabilny marker `data-project-cart-cta="true"` i opis `aria-label` z aktualna kwota.
- Zmieniono mikrokomunikat dostawy, zeby nie mylil podstawowej dostawy z dodatkiem PDF.
- Dodano anchor i marker sekcji podobnych projektow.
- Dodano `components/project/ProjectMediaGallery.tsx` jako alias do istniejacego `ProjectGallery`.
- Zaostrzono `scripts/check-public-project-detail-sales-v37.cjs`, aby pilnowal kluczowych sekcji sprzedazowych, PDF +250 zl, CTA, danych koszyka oraz minimalnej liczby opcji selectow admina.
- Dodano `START_LOCAL.bat` do prostego uruchamiania projektu lokalnie.
- Test przegladarkowy: wariant + PDF na e-mail +250 zl -> `DODAJ DO KOSZYKA` -> `/koszyk` z poprawna pozycja.
- Uruchomione testy:
  - `npm run verify:public-project-detail-sales-v37` - OK
  - `npm run verify:cart-order-v38` - OK
  - `npm run typecheck` - OK
  - `npm run build` - OK, ze starymi ostrzezeniami autoprefixera
  - `npm run check:project-memory` - OK
- Znane ryzyko: header koszyka pokazal `Koszyk 0`, mimo ze koszyk zawieral dodana pozycje. To nie blokuje Etapu 4, ale warto naprawic jako osobny etap.
