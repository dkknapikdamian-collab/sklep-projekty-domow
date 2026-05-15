# 00_PROJECT_STATUS - Sklep z projektami domów

## Status na 2026-05-15

Projekt jest w fazie budowy aplikacji sklepowej dla projektów domów. Nie jest to już luźna makieta ani czysty HTML. Kierunek operacyjny to Next.js / React, panel admina, katalog publiczny, karta projektu, koszyk, checkout oraz zamówienia.

Ten plik opisuje stan projektu jako pamięć operacyjną. Nie zastępuje testu kodu. Aktualny kod zawsze trzeba sprawdzić w repo.

## Co już istnieje według dotychczasowych prac i logów

FAKTY / mocne przesłanki z dotychczasowej pracy:

- repo aplikacji działa jako aplikacja Next.js / React,
- istnieją publiczne trasy sklepu, m.in. strona główna, katalog/projekty, koszyk i checkout/zamówienie,
- istnieje panel admina z logowaniem/setupem,
- istnieją trasy admina dla projektów: lista, nowy projekt, edycja projektu, podgląd,
- rozpoczęto/wykonano prace nad panelem admina: dodawanie projektu, edycja, zapis, anulowanie, status, usuwanie,
- rozpoczęto/wykonano prace nad checkoutem V1,
- dodano wymóg dodatku zakupowego `Projekt w formacie PDF na e-mail` za +250 zł,
- projekt ma system pamięci `_project/` i powinien mieć guard pamięci projektu.

## Co działa, ale wymaga regularnej kontroli

- Build aplikacji był uruchamiany w poprzednich etapach i pokazywał listę tras Next.js.
- Panel admina był ręcznie sprawdzany przez Damiana, ale wskazywał problemy z przyciskami. Dlatego każde kolejne wdrożenie admina musi mieć test ręczny i guard/regresję.
- Koszyk/checkout są kierunkiem V1, ale pełny przepływ zakupu musi być testowany od dodania projektu do zamówienia.

## Co jest częściowe albo wymaga potwierdzenia

- Pełna zgodność panelu admina: `Edytuj`, `Zapisz`, `Anuluj`, zmiana statusu z listy, usuwanie.
- Pełne spięcie dodatku PDF e-mail +250 zł przez koszyk, checkout, zamówienie, płatność i e-maile.
- Finalny model storage plików prywatnych po płatności.
- Finalna płatność produkcyjna.
- Automatyczna wysyłka linków do pobrania po płatności.
- Pełna obsługa folderów mediów po kodzie projektu.

## Co nie działa / znane ryzyka

- Ryzyko powrotu ubogiej dokumentacji pamięci projektu, jeśli AI wygeneruje tylko ogólne pliki.
- Ryzyko martwych przycisków w panelu admina po kolejnych zmianach.
- Ryzyko mieszania danych demo/fikcyjnych z realnymi projektami.
- Ryzyko rozjazdu między repo aplikacji a Obsidianem.
- Ryzyko dopisywania propozycji AI jako faktów produktowych.

## Ostatni etap

Etap bieżący: **uzupełnienie pełnego mózgu projektu**.

Cel etapu: repo aplikacji i Obsidian mają zawierać pełny, użyteczny opis projektu: kierunek, zakres, decyzje, testy, guardy, potwierdzenia, braki i następny krok.

## Ostatni potwierdzony test Damiana

Nie ma pełnego potwierdzenia „cały sklep działa produkcyjnie”.

Znane potwierdzenia częściowe:

- Damian potwierdził, że aplikacja po wcześniejszym wdrożeniu działa w sensie bazowym, ale wskazał, że przycisk `Edytuj` nie działał.
- Damian wskazał, że `Zapisz dane` i `Anuluj` także wymagały sprawdzenia/podpięcia.
- Damian wskazał problem UI z za dużą czcionką / potrzebą jednej czytelnej linijki w widoku tabeli/listy.

Wszystkie te potwierdzenia są częściowe i nie zastępują pełnego testu panelu admina, koszyka i checkoutu.

<!-- SKLEP_FULL_MEMORY_OBSIDIAN_REPO_V6_2026_05_15 START -->

## Update 2026-05-15 22:12:34 - full memory, Obsidian and naming audit

### FAKTY ZE SCAN-FIRST

- FAKT: local repo scan path: C:\Users\malim\Desktop\biznesy_ai\strony\strona z projektami.
- FAKT: package.json name: sklep-projekty-domow.
- FAKT: package.json version: 0.5.0.
- FAKT: npm scripts detected: dev, build, start, typecheck, check:project-memory, verify:content, verify, verify:legacy, verify:supabase-foundation, verify:real-admin-projects, verify:no-static-supabase, verify:project-code-policy, verify:admin-select-options, verify:admin-selects-features, verify:featurepicker-v15b, verify:server-action-400-v16, verify:use-server-exports-v17, verify:form-state-v17b, verify:admin-project-management-v18, verify:admin-buttons-v19, verify:admin-list-search-filter-v20, verify:admin-css-imports-v20e, verify:admin-edit-parity-v21, verify:public-project-data-v22, verify:public-catalog-filters-v22b, verify:admin-homepage-content-v23, check:public-catalog-filters-v22b, verify:ui-mojibake-status-v22d, audit:admin-public-status-v22d, verify:admin-header-v24, verify:admin-media-visibility-v25, verify:admin-debug-v26, verify:public-service-role-read-v27, verify:admin-ui-debug-v28, verify:project-media-rendering-v30, verify:admin-save-redirect-v31, verify:homepage-hero-full-bleed-v32, verify:homepage-hero-full-bleed-v33, verify:homepage-hero-polish-v33, verify:project-media-controls-v34, verify:admin-project-media-v34, verify:public-project-media-v34, verify:project-publication-readiness-v35, verify:admin-projects-control-center-v36, verify:public-project-detail-sales-v37, verify:cart-order-v38, verify:order-schema-v38, verify:admin-orders-v42, verify:admin-project-list-compact-v41, verify:admin-audit-log-v44, verify:manual-email-drafts-v47, verify:manual-payment-v48.
- FAKT: AGENTS.md exists.
- FAKT: README.md exists.
- FAKT: _project exists.
- FAKT: _project\runs exists.
- FAKT: _project\history exists.
- FAKT: scripts exists.
- DO POTWIERDZENIA: tests not found.
- FAKT: docs exists.
- FAKT: app exists.
- DO POTWIERDZENIA: src\app not found.
- DO POTWIERDZENIA: src not found.
- FAKT: components exists.
- DO POTWIERDZENIA: src\components not found.
- FAKT: detected route/app files: app\layout.tsx; app\page.tsx; app\admin\page.tsx; app\admin\audit\page.tsx; app\admin\debug\page.tsx; app\admin\login\page.tsx; app\admin\logout\route.ts; app\admin\projekty\page.tsx; app\admin\projekty\nowy\page.tsx; app\admin\projekty\podglad\page.tsx; app\admin\projekty\[id]\edytuj\page.tsx; app\admin\setup\page.tsx; app\admin\strona-glowna\page.tsx; app\admin\zamowienia\page.tsx; app\admin\zamowienia\[id]\page.tsx; app\koszyk\page.tsx; app\projekty\page.tsx; app\projekty\[slug]\page.tsx; app\zamowienie\page.tsx.
- FAKT: detected guard/test files: scripts\check-admin-audit-log-v44.cjs; scripts\check-admin-buttons-v19.cjs; scripts\check-admin-css-imports-v20e.cjs; scripts\check-admin-debug-v26.cjs; scripts\check-admin-edit-parity-v21.cjs; scripts\check-admin-header-v24.cjs; scripts\check-admin-homepage-content-v23.cjs; scripts\check-admin-list-search-filter-v20.cjs; scripts\check-admin-media-visibility-v25.cjs; scripts\check-admin-orders-v42.cjs; scripts\check-admin-project-list-compact-v41.cjs; scripts\check-admin-project-management-v18.cjs; scripts\check-admin-project-media-v34.cjs; scripts\check-admin-projects-control-center-v36.cjs; scripts\check-admin-save-redirect-v31.cjs; scripts\check-admin-select-options.cjs; scripts\check-admin-selects-features.cjs; scripts\check-admin-ui-debug-v28.cjs; scripts\check-cart-order-v38.cjs; scripts\check-content-source.cjs; scripts\check-featurepicker-v15b.cjs; scripts\check-form-state-v17b.cjs; scripts\check-homepage-hero-full-bleed-v32.cjs; scripts\check-homepage-hero-full-bleed-v33.cjs; scripts\check-homepage-hero-polish-v33.cjs; scripts\check-manual-email-drafts-v47.cjs; scripts\check-manual-payment-v48.cjs; scripts\check-no-demo-content.cjs; scripts\check-no-legacy-demo-components.cjs; scripts\check-no-supabase-static-params.cjs; scripts\check-order-schema-v38.cjs; scripts\check-project-code-policy.cjs; scripts\check-project-media-controls-v34.cjs; scripts\check-project-media-rendering-v30.cjs; scripts\check-project-memory.cjs; scripts\check-project-publication-readiness-v35.cjs; scripts\check-public-catalog-filters-v22b.cjs; scripts\check-public-project-data-v22.cjs; scripts\check-public-project-detail-sales-v37.cjs; scripts\check-public-project-media-v34.cjs; scripts\check-public-service-role-read-v27.cjs; scripts\check-real-admin-projects.cjs; scripts\check-server-action-400-v16.cjs; scripts\check-supabase-foundation.cjs; scripts\check-ui-mojibake-status-v22d.cjs; scripts\check-use-server-action-exports-v17.cjs.

### DECYZJE

- DECYZJA: project is a store application for selling house projects.
- DECYZJA: app repo is source of truth for code, tests, guards, _project/ and technical run reports.
- DECYZJA: Obsidian is a dashboard for status, decisions, manual tests, confirmations, risks and next steps.
- DECYZJA: active Obsidian files must use descriptive project-context names.

### HIPOTEZY / PROPOZYCJE

- HIPOTEZA: next implementation stage should be chosen from real _project/07_NEXT_STEPS.md and current code state.

### DO POTWIERDZENIA

- DO POTWIERDZENIA: manual UI state must be confirmed by Damian, because this package does not change app logic.

<!-- SKLEP_FULL_MEMORY_OBSIDIAN_REPO_V6_2026_05_15 END -->

