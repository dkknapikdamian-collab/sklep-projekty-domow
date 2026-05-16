# 03_CURRENT_STAGE - aktualny etap

Ostatnia aktualizacja: 2026-05-15 22:20 Europe/Warsaw

## Aktualny etap

Etap 20: Widok audit logu `/admin/audit`

## Status etapu

Przygotowany w paczce ZIP do wdrożenia lokalnego. ChatGPT/operator paczek nie pushuje sam. Jedno polecenie PowerShell ma wykonać wdrożenie, checki, commit i push z lokalnego repo.

## Cel etapu

Audit log ma być widoczny z panelu admina. Po operacji admina można wejść w `/admin/audit` i zobaczyć ślad: data, admin, akcja, typ encji, ID encji i skrót metadata.

## Co zostanie zrobione

- Dodanie strony `/admin/audit`.
- Dodanie czytania wpisów z tabeli `admin_audit_log`.
- Dodanie filtrowania po typie akcji.
- Dodanie widoku tabeli audit logu:
  - data,
  - admin,
  - akcja,
  - typ encji,
  - ID encji,
  - skrót metadata.
- Dodanie linku `Audit` w `AdminHeader`.
- Dodanie kafla `Audit` na dashboardzie admina.
- Rozszerzenie guardu `verify:admin-audit-log-v44`.
- Aktualizacja pamięci projektu i raportu run.

## Czego nie zmieniać

- Nie zmieniać mechanizmu auth.
- Nie zmieniać logiki operacji admina.
- Nie zmieniać publicznych stron.
- Nie dodawać nowych mutacji na stronie audit.
- Nie zmieniać sposobu zapisu audit logu poza dodaniem odczytu.

## Checki wymagane

```powershell
npm run verify:admin-audit-log-v44
npm run typecheck
npm run build
npm run check:project-memory
```

## Kryterium zakończenia

Po operacji admina można wejść w `/admin/audit` i zobaczyć ślad operacji.

<!-- SKLEP_FULL_MEMORY_OBSIDIAN_REPO_V6_2026_05_15 START -->

## Update 2026-05-15 22:12:34

Current stage: full project memory + Obsidian dashboard + implementation/test history + naming audit.

This stage does not change storefront logic, admin UI, checkout or routing.

<!-- SKLEP_FULL_MEMORY_OBSIDIAN_REPO_V6_2026_05_15 END -->


<!-- ETAP21_ADMIN_AUDIT_REAL_COVERAGE_2026_05_16 -->

## 2026-05-16 - Etap 21: realne domkniecie audit logu admina

FAKT:
- Dodano realne markery i pokrycie audit logu dla brakujacych mutacji admina:
  - project_create,
  - project_sample_create,
  - project_media_delete,
  - project_media_type_update,
  - project_private_file_delete.
- Guard statyczny verify:admin-audit-log-v44 ma sprawdzac nie tylko widok /admin/audit, ale tez realne markery implementacji w akcjach admina.

TEST RÄCZNY DO WYKONANIA:
- Runtime audit w /admin/audit po realnych operacjach admina: utworzenie projektu, sample project, media delete/type update, private file delete.

BRAK POTWIERDZONEGO TESTU:
- Do momentu klikniecia flow lokalnie przez Damiana runtime wpisy w admin_audit_log pozostaja niepotwierdzone.

## 2026-05-16 - Etap 21 real audit coverage V6

### FAKT
- Domknięto realne pokrycie admin audit log dla tworzenia projektu, projektu przykładowego, usuwania mediów, zmiany typu mediów i usuwania prywatnego pliku projektu.
- Guard verify:admin-audit-log-v44 sprawdza teraz markery w poprawnych plikach: project_create w app/admin/projekty/nowy/actions.ts, a operacje mediów/sample/private file w app/admin/projekty/actions.ts.

### TESTY AUTOMATYCZNE
- npm run verify:admin-audit-log-v44
- npm run verify:admin-orders-v42
- npm run verify:manual-email-drafts-v47
- npm run verify:manual-payment-v48
- npm run typecheck
- npm run build
- npm run check:project-memory

### TEST RĘCZNY DO WYKONANIA
- Runtime audit w /admin/audit po realnych operacjach admina: create project, status update, media delete/type update, private file delete, order status/checklist.

<!-- ETAP22_RUNTIME_AUDIT_ADMINA_START -->
## Etap 22 — Runtime audit admina i zamknięcie Etapu 21

FAKT:
- Etap 22 zaostrza Etap 21: audit admina ma być potwierdzany nie tylko statycznie, ale przez realne operacje w panelu admina i wpisy w /admin/audit.
- Rozszerzono kontrakt metadata audit logu: source, projectCode/orderId, fromStatus/toStatus albo poprzednie/nowe wartości dla operacji bez klasycznego statusu.

DECYZJA DAMIANA:
- To jest następny etap, przekonanie 10/10.
- Manualny runtime test zostaje wymagany przed pełnym zamknięciem etapu.

TEST RĘCZNY:
- Status: TEST RĘCZNY DO WYKONANIA.
- Kryterium: po realnych operacjach admina wpisy są widoczne w /admin/audit z poprawnym action, entity_type, entity_id i metadata.

BRAKI I RYZYKA:
- Automatyczny guard pilnuje kontraktu kodu, ale nie zastępuje kliknięcia runtime w panelu admina i sprawdzenia realnej tabeli admin_audit_log.
<!-- ETAP22_RUNTIME_AUDIT_ADMINA_END -->
