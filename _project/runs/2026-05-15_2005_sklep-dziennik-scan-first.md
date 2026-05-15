# Raport AI: Sklep projekty domow - dziennik scan-first

## Data

2026-05-15 20:05 Europe/Warsaw

## Cel pracy

Odtworzyć i skorygować dziennik projektu „Sklep / strona z projektami domów” w trybie scan-first, bez zmieniania funkcji aplikacji, UI, routingu ani logiki produktu.

## Źródła przeczytane

### Repo aplikacji

- `AGENTS.md`
- `package.json`
- `_project/00_PROJECT_STATUS.md`
- `_project/01_PROJECT_GOAL.md`
- `_project/02_WORK_RULES.md`
- `_project/03_CURRENT_STAGE.md`
- `_project/04_DECISIONS.md`
- `_project/05_MANUAL_TESTS.md`
- `_project/06_GUARDS_AND_TESTS.md`
- `_project/07_NEXT_STEPS.md`
- `_project/08_CHANGELOG_AI.md`
- `_project/09_CONTEXT_FOR_OBSIDIAN.md`
- `_project/10_PROJECT_TIMELINE.md`
- `_project/11_USER_CONFIRMED_TESTS.md`
- `scripts/check-project-memory.cjs`
- `scripts/check-admin-orders-v42.cjs`
- `app/admin/zamowienia/page.tsx`
- `lib/admin/orders-admin.ts`
- ostatnie commity znalezione przez GitHub API, w tym Etap 19.

### Obsidian

- `AGENTS.md`
- `00_START_TUTAJ.md`
- `00_INSTRUKCJA_OBSIDIAN_DLA_AI.md`
- `10_PROJEKTY/Sklep_projekty_domow/00_START - Sklep projekty domow.md`
- `10_PROJEKTY/Sklep_projekty_domow/01_KIERUNEK I ZAKRES - Sklep projekty domow.md`
- `10_PROJEKTY/Sklep_projekty_domow/02_STAN OBECNY - Sklep projekty domow.md`
- `10_PROJEKTY/Sklep_projekty_domow/03_DECYZJE - Sklep projekty domow.md`
- `10_PROJEKTY/Sklep_projekty_domow/04_ETAPY I WDROZENIA - Sklep projekty domow.md`
- `10_PROJEKTY/Sklep_projekty_domow/05_TESTY RECZNE - Sklep projekty domow.md`
- `10_PROJEKTY/Sklep_projekty_domow/06_GUARDY I TESTY AUTOMATYCZNE - Sklep projekty domow.md`
- `10_PROJEKTY/Sklep_projekty_domow/07_POTWIERDZENIA DAMIANA - Sklep projekty domow.md`
- `10_PROJEKTY/Sklep_projekty_domow/08_HISTORIA I ZMIANY KIERUNKU - Sklep projekty domow.md`
- `10_PROJEKTY/Sklep_projekty_domow/09_NASTEPNY KROK - Sklep projekty domow.md`
- `10_PROJEKTY/Sklep_projekty_domow/10_ZASADY PROJEKTU - Sklep projekty domow.md`

## Źródła niedostępne / brakujące

- Brak dostępu do lokalnego Windows repo i lokalnego Supabase Damiana.
- `git clone` w środowisku wykonawczym nie działał przez brak DNS do GitHuba.
- Praca została wykonana przez GitHub API.
- Nie uruchomiono lokalnie `npm`, `node`, `typecheck`, `build` ani runtime aplikacji.

## Pliki stare / puste / sprzeczne / zastąpione

### FAKT

W aktywnej sekcji Obsidiana nie znaleziono przez bezpośrednie fetchowanie generycznych plików:

- `INDEX.md` - brak,
- `STATUS.md` - brak,
- `CONTEXT.md` - brak.

Nie wykonywano masowego usuwania plików, bo przez GitHub API nie było pełnej listy katalogu, a aktywny zestaw wymaganych plików istnieje.

### FAKT - wykryty rozjazd treści

Część pamięci repo i Obsidiana była już po Etapie 19, ale część narracji nadal odnosiła się do wcześniejszego stanu „pełna pamięć projektu” albo Etapu 17 jako aktualnego punktu odniesienia. Skorygowano to w plikach dziennika.

## Co usunięto z aktywnej sekcji

Nic nie usunięto. Nie było bezpiecznej podstawy do usuwania przez GitHub API bez pełnej listy katalogu. Sprawdzono brak trzech zakazanych generycznych plików.

## Co scalono do nowych plików

Scalono aktualny stan Etapu 19 z istniejącą pamięcią projektu:

- Etap 17 zostaje historią: płatność manualna / instrukcja przelewu.
- Etap 19 jest aktywnym stanem: filtry i priorytety zamówień w adminie.
- Tryb scan-first został dopisany do kontraktu `AGENTS.md`.
- Guard pamięci został poprawiony, żeby pilnował `FAKT / DECYZJA / HIPOTEZA / DO POTWIERDZENIA` i aktualnego Etapu 19.

## Fakty ustalone

- Repo aplikacji `dkknapikdamian-collab/sklep-projekty-domow` istnieje i branch domyślny to `main`.
- Repo Obsidiana `dkknapikdamian-collab/obsidian-vault` istnieje i branch domyślny to `main`.
- Użytkownik / dostęp GitHub ma uprawnienia push/admin do obu repo.
- `package.json` zawiera `check:project-memory`, `typecheck`, `build` i wiele guardów `verify:*`.
- `package.json` podczas skanu nie zawierał skryptu `lint`.
- `app/admin/zamowienia/page.tsx` zawiera panel priorytetów, filtry oraz karty zamówień z oznaczeniami operacyjnymi.
- `lib/admin/orders-admin.ts` zawiera helpery `getAdminOrderPriorityFlags` i `getAdminOrderPriorityRank`.
- `scripts/check-admin-orders-v42.cjs` pilnuje obszaru zamówień admina i zakazu automatycznej płatności/wysyłki.
- `scripts/check-project-memory.cjs` istniał, ale wymagał korekty markerów pod scan-first.

## Decyzje znalezione w źródłach

- Projekt jest aplikacją sklepową, nie statycznym HTML.
- Preferowany kierunek to React/Next.js + baza danych + storage + panel admina.
- Publiczny katalog nie ma pokazywać fikcyjnych projektów jako realnych ofert.
- Zakup jako gość jest ważniejszy niż konto klienta w V1.
- Logowanie jest głównie dla admina.
- Każdy projekt ma mieć stały kod.
- Dane projektów mają być dodawane przez panel admina.
- Dodatek `Projekt w formacie PDF na e-mail` kosztuje +250 zł i nie może kolidować z bazową dostawą cyfrową.
- V1 pracuje teraz na płatności manualnej; nie dodawać Stripe/PayU bez osobnego etapu.

## Hipotezy / propozycje, nie decyzje

- Dalsze automatyzacje wysyłki plików dopiero po stabilnym ręcznym workflow.
- Panel klienta dopiero po V1.
- SEO i rozbudowane filtry publicznego katalogu dopiero po stabilnej ścieżce sprzedaży.

## Do potwierdzenia u Damiana

- Czy lokalnie przechodzi `node scripts/check-project-memory.cjs`.
- Czy lokalnie przechodzi `npm run check:project-memory`.
- Czy lokalnie przechodzi `npm run verify:admin-orders-v42`.
- Czy lokalnie przechodzi `npm run verify:manual-payment-v48`.
- Czy lokalnie przechodzi `npm run typecheck`.
- Czy lokalnie przechodzi `npm run build`.
- Czy `npm run lint` ma zostać dodany, skoro polecenie go wymaga, a `package.json` go nie zawierał.
- Czy filtry i priorytety `/admin/zamowienia` działają na realnych danych Supabase.

## Co już zostało wdrożone według źródeł

- Pamięć projektu w repo i Obsidianie.
- Guard pamięci projektu.
- Płatność manualna / instrukcja przelewu.
- Panel zamówień w adminie.
- Priorytety i filtry zamówień w adminie.

## Co zostało zmienione według źródeł

W tej pracy zmieniono tylko dokumentację/pamięć/guard pamięci:

- `AGENTS.md`
- `scripts/check-project-memory.cjs`
- Obsidian: `00_START - Sklep projekty domow.md`
- Obsidian: `02_STAN OBECNY - Sklep projekty domow.md`
- dodano ten raport w repo.

## Co zostało porzucone według źródeł

- Czysty HTML jako produkcyjny sklep.
- Fikcyjne projekty jako realne oferty.
- Konto klienta jako obowiązkowy element V1.

## Testy / guardy znalezione

- `node scripts/check-project-memory.cjs`
- `npm run check:project-memory`
- `npm run verify:admin-orders-v42`
- `npm run verify:manual-payment-v48`
- `npm run verify:cart-order-v38`
- `npm run typecheck`
- `npm run build`

## Potwierdzenia Damiana znalezione

- Aplikacja wcześniej działała częściowo, ale admin miał problem z `Edytuj`.
- `Zapisz dane` i `Anuluj` wymagały sprawdzenia/podpięcia.
- UI listy/tabeli miało za dużą czcionkę i miało być jedną czytelną linijką.
- Damian wymaga pełnego mózgu projektu i plików Obsidiana w paczkach/zmianach.

## Pliki utworzone w repo

- `_project/runs/2026-05-15_2005_sklep-dziennik-scan-first.md`

## Pliki zaktualizowane w repo

- `AGENTS.md`
- `scripts/check-project-memory.cjs`

## Pliki utworzone w Obsidianie

- `10_PROJEKTY/Sklep_projekty_domow/_RAPORTY_AI/2026-05-15_2005_sklep-dziennik-scan-first.md`

## Pliki zaktualizowane w Obsidianie

- `10_PROJEKTY/Sklep_projekty_domow/00_START - Sklep projekty domow.md`
- `10_PROJEKTY/Sklep_projekty_domow/02_STAN OBECNY - Sklep projekty domow.md`

## Wyniki testów

Nieuruchomione lokalnie.

Powód: praca przez GitHub API, brak lokalnego `git clone`, brak `node_modules`, brak lokalnego terminala Windows i brak env Supabase.

Wymagane komendy po `git pull`:

```powershell
node scripts/check-project-memory.cjs
npm run check:project-memory
npm run verify:admin-orders-v42
npm run verify:manual-payment-v48
npm run typecheck
npm run build
npm run lint
```

Uwaga: `npm run lint` może zwrócić brak skryptu, bo podczas skanu `package.json` nie zawierał `lint`.

## Commit / push

Zmiany zapisane bezpośrednio na GitHub przez API na branchu `main`. Każdy zapis przez API tworzył commit w odpowiednim repo.

## Następny krok

Na maszynie Damiana wykonać `git pull` w obu repo, uruchomić checki i potwierdzić runtime `/admin/zamowienia` na realnych danych Supabase.
