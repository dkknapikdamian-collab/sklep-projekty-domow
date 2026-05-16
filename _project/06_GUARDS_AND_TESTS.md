## Checki wymagane dla Etapu 20

```powershell
npm run verify:admin-audit-log-v44
npm run typecheck
npm run build
npm run check:project-memory
```

## Rozszerzony guard audit logu

`verify:admin-audit-log-v44` pilnuje teraz także widoku `/admin/audit`:

- istnienia strony `app/admin/audit/page.tsx`,
- helpera `getAdminAuditLogEntries`,
- filtrowania po typie akcji,
- skrótu metadata,
- markerów UI tabeli audit logu,
- linku `Audit` w `AdminHeader`,
- kafla `Audit` na dashboardzie admina,
- stylów `STAGE50 ADMIN AUDIT VIEW`,
- braku mutacji na stronie audit.


# 06_GUARDS_AND_TESTS - Guardy i testy automatyczne


## Checki wymagane dla Etapu 19

```powershell
npm run verify:admin-orders-v42
npm run typecheck
npm run build
npm run check:project-memory
```

## Rozszerzony guard zamówień admina

Zaktualizowano:

```powershell
npm run verify:admin-orders-v42
```

Guard pilnuje teraz także Etapu 19:

- list filtrów statusu zamówienia,
- filtrów płatności: instrukcja ustawiona / brak instrukcji,
- filtrów realizacji: PDF wysłany / ZIP wysłany / zamknięte,
- szybkich oznaczeń: wymaga kontaktu / czeka na płatność / do wysyłki,
- helperów `getAdminOrderPriorityFlags` i `getAdminOrderPriorityRank`,
- znaczników UI filtrów na `/admin/zamowienia`,
- panelu szybkich liczników,
- braku Stripe/PayU/automatycznej wysyłki.

## Guard pamięci projektu

| Komenda | Co sprawdza | Kiedy uruchamiać | Ostatni wynik | Czego nie pokrywa |
|---|---|---|---|---|
| `node scripts/check-project-memory.cjs` | Istnienie i minimalną treść plików `AGENTS.md`, `_project/`, raportów AI oraz plików Obsidiana dla sklepu, jeśli vault istnieje. | Po każdej zmianie pamięci projektu. | Do uruchomienia lokalnie po zmianie. | Nie sprawdza działania aplikacji, UI ani checkoutu. |
| `npm run check:project-memory` | Alias do `node scripts/check-project-memory.cjs`. | Po każdej zmianie pamięci projektu. | Do uruchomienia lokalnie po zmianie. | Jak wyżej. |

## Guardy ogólne aplikacji

| Komenda | Co sprawdza | Kiedy uruchamiać | Ostatni wynik | Czego nie pokrywa |
|---|---|---|---|---|
| `npm run typecheck` | Typy TypeScript, jeśli skrypt istnieje. | Po zmianach kodu. | Do uruchomienia lokalnie. | Nie sprawdza ręcznie UI. |
| `npm run build` | Build produkcyjny Next.js. | Po zmianach kodu i przed pushem. | Do uruchomienia lokalnie. | Nie potwierdza, że filtry dają oczekiwane wyniki na realnych danych. |

## Guardy wymagane / do sprawdzenia w repo

Te guardy są ważne, ale ich istnienie trzeba potwierdzić w aktualnym repo:

1. Admin buttons/action map:
   - sprawdza, czy `Edytuj`, `Zapisz`, `Anuluj`, status, delete mają realne handlery.
2. Delete active warning:
   - sprawdza ostrzeżenie przy usuwaniu aktywnego projektu,
   - oczekiwany marker: `data-admin-delete-active-warning` albo równoważny.
3. Catalog active-only:
   - katalog publiczny nie może pokazywać projektów roboczych.
4. PDF e-mail addon:
   - dodatek ma cenę +250 zł,
   - jest widoczny w koszyku/checkout/zamówieniu,
   - nie zastępuje bazowej dostawy cyfrowej.
5. Checkout V1 flow:
   - projekt -> koszyk -> checkout -> zamówienie.

## Braki w testach

- Brak pewnego, zapisanego tutaj wyniku pełnego testu checkoutu.
- Brak pewnego, zapisanego tutaj wyniku pełnego testu admina po ostatnich poprawkach.
- Brak potwierdzenia, że dodatek PDF +250 zł jest spięty przez wszystkie warstwy.
- Brak potwierdzenia runtime, że filtry zamówień dają oczekiwane wyniki na realnych danych Supabase.
- Brak potwierdzenia, że Obsidian i repo są po każdym etapie zsynchronizowane.

## Zasada dla kolejnych AI developerów

Jeśli dotykasz funkcji, dodaj albo zaktualizuj guard. Jeśli guard jest nierealny, wpisz w raporcie: `brak guardu - tylko test ręczny` i podaj dokładny test ręczny.

<!-- SKLEP_FULL_MEMORY_OBSIDIAN_REPO_V6_2026_05_15 START -->

## Guards added/checked - 2026-05-15 22:12:34

- TEST AUTOMATYCZNY / GUARD: 
ode scripts/check-sklep-full-memory-v6.cjs <AppRepo> <ObsidianVault>.
- Existing 
pm run check:project-memory is executed when present.
- Existing 
pm run build is attempted as optional validation when present.

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

FAKT: dodano i zweryfikowano statycznie realne markery audit logu dla brakujących mutacji admina.
TEST RĘCZNY DO WYKONANIA: runtime audit w /admin/audit po realnych operacjach admina.

<!-- ETAP22_RUNTIME_AUDIT_ADMINA_START -->
## Etap 22 — guardy audit admina

Guard rozszerzony:
- `npm run verify:admin-audit-log-v44` pilnuje krytycznych akcji audit logu oraz kontraktu metadata runtime.

Wymagane checki etapu:
- `npm run verify:admin-audit-log-v44`
- `npm run verify:admin-orders-v42`
- `npm run typecheck`
- `npm run build`
- `npm run check:project-memory`

Uwaga:
- Guard statyczny nie zastępuje testu ręcznego w /admin/audit.
<!-- ETAP22_RUNTIME_AUDIT_ADMINA_END -->

<!-- ETAP22_RUNTIME_AUDIT_ADMINA_CHECK_RESULTS_START -->
## Etap 22 - automatic check results from APPLY V3

Date: 2026-05-16_1137

Result:
- npm run verify:admin-audit-log-v44 - PASS
- npm run verify:admin-orders-v42 - PASS
- npm run typecheck - PASS
- npm run build - PASS
- npm run check:project-memory - PASS

Note:
- This is not manual runtime confirmation. Manual status remains: TEST RECZNY DO WYKONANIA.
- Full close criterion: Damian must see real entries in /admin/audit after admin operations.
<!-- ETAP22_RUNTIME_AUDIT_ADMINA_CHECK_RESULTS_END -->

<!-- ETAP23_ADMIN_DELETE_ARCHIVE_FIX_START -->
## Etap 23 - poprawka archiwizacji i trwalego usuwania projektu

FAKT:
- Zgloszono runtime regresje: nie dalo sie usunac projektu active, a archiwizacja nie dawala jasnego efektu.
- Hard delete active jest teraz dozwolony po wpisaniu kodu projektu i dodatkowym confirm.
- Ekran edycji projektu ma bezposredni przycisk archiwizacji w strefie usuwania.

TEST RECZNY:
- Status: TEST RECZNY DO WYKONANIA.
- Sprawdzic: archiwizacja z listy, archiwizacja z edycji, hard delete projektu active po kodzie, wpis w /admin/audit.

RYZYKO:
- Operacja hard delete active jest destrukcyjna. Bezpieczniki: kod projektu, confirm, audit log.
<!-- ETAP23_ADMIN_DELETE_ARCHIVE_FIX_END -->

<!-- ETAP23_ADMIN_DELETE_ARCHIVE_FIX_V4_START -->
## Etap 23 V4 - repair archiwizacji i trwalego usuwania

FAKT:
- Naprawiono workflow admina po zgloszeniu Damiana: archiwizacja nie dawala czytelnego efektu, a hard delete byl blokowany dla active.
- Hard delete active jest dozwolony po wpisaniu kodu projektu i confirmie.
- Ekran edycji ma teraz archiwizacje w strefie usuwania.
- Guardy pilnuja nowego kontraktu: returnTo dla archiwizacji, kod projektu dla hard delete, audit log.

TEST RECZNY:
- Status: TEST RECZNY DO WYKONANIA.
- Sprawdzic: archiwizacja z edycji, archiwizacja z listy, hard delete active po kodzie, wpisy /admin/audit.

RYZYKO:
- Hard delete active jest destrukcyjny. Bezpieczniki: wpisanie kodu, confirm, audit log.
<!-- ETAP23_ADMIN_DELETE_ARCHIVE_FIX_V4_END -->

<!-- ETAP23_ADMIN_DELETE_ARCHIVE_FIX_V5 -->
## Etap 23 V5 — repair archiwizacji i trwałego usuwania projektu

FAKT:
- Naprawiono przeplyw admina: archiwizacja dostaje returnTo i moze wracac na ekran edycji.
- Trwale usuniecie nie jest juz blokowane samym statusem active; wymaga kodu projektu i potwierdzenia.
- Active project nadal pokazuje ostrzezenie i confirm, ale nie zamienia sie w martwy guzik.

TESTY:
- Automatyczne checki do uruchomienia przez APPLY V5: verify:admin-buttons-v19, verify:admin-audit-log-v44, typecheck, build, check:project-memory.

TEST RECZNY:
- TEST RECZNY DO WYKONANIA: archiwizacja z edycji, hard delete po wpisaniu kodu, wpisy w /admin/audit.
<!-- ETAP23_ADMIN_DELETE_ARCHIVE_FIX_V5 -->

<!-- ETAP23_ADMIN_DELETE_ARCHIVE_FIX_V7 -->
## Etap 23 V7 - admin archive/delete runtime repair

FAKT:
- Naprawiono workflow archiwizacji i trwałego usuwania projektu w adminie po regresji zgłoszonej przez Damiana.
- Usuniecie trwałe nie jest juz blokowane samym statusem active; nadal wymaga wpisania kodu projektu i confirmu.
- Archiwizacja jest dostepna bezposrednio na ekranie edycji i moze wracac przez returnTo.

TEST RECZNY:
- TEST RECZNY DO WYKONANIA: Damian ma kliknac Archiwizuj oraz Usun trwale po wpisaniu kodu projektu i sprawdzic /admin/audit.
<!-- ETAP23_ADMIN_DELETE_ARCHIVE_FIX_V7 -->


<!-- ETAP23_ARCHIVE_RUNTIME_FIX_V8 -->
## Etap 23 V8 - archiwizacja runtime projektu

FAKT:
- Po V7 Damian potwierdzil, ze archiwizacja nadal nie dziala runtime.
- Wzmocniono server action archiwizacji: update zwraca zaktualizowany rekord przez select(id,status,updated_at) i sprawdza, czy status faktycznie jest archived.
- Ekran edycji pokazuje teraz blad akcji admina przez data-admin-edit-archive-error, zamiast tylko migac ekranem.

GUARDY:
- Dodano npm run verify:admin-archive-delete-runtime-v23.
- Guard pilnuje returnTo, archiveUpdateResult, weryfikacji statusu archived, komunikatu bledu i rewalidacji edycji.

TEST RECZNY:
- TEST RECZNY DO WYKONANIA: kliknac Archiwizuj na edycji, sprawdzic status i /admin/audit.
<!-- ETAP23_ARCHIVE_RUNTIME_FIX_V8 -->

<!-- ETAP23_ARCHIVE_RUNTIME_FIX_V9 -->
## Etap 23 V9 - naprawa guarda po V8 archive runtime

FAKT:
- V8 poprawnie wzmocnil archiwizacje runtime i nowy guard przeszedl.
- Stary guard V19 nadal oczekiwal starego jednowierszowego redirectu archive, wiec blokowal commit mimo poprawnego flow.
- V9 dopasowuje V19 do nowego kontraktu: redirectArchiveError, archiveUpdateResult, select(id,status,updated_at), archiveUpdateVerified i archived=1&archive_status.

GUARDY:
- verify:admin-archive-delete-runtime-v23
- verify:admin-buttons-v19
- verify:admin-audit-log-v44
- typecheck
- build
- check:project-memory

TEST RECZNY:
- TEST RECZNY DO WYKONANIA: kliknac Archiwizuj na ekranie edycji, sprawdzic status i /admin/audit.
<!-- ETAP23_ARCHIVE_RUNTIME_FIX_V9 -->

<!-- ETAP24_ADMIN_ACTION_FEEDBACK_ARCHIVE_FIX -->
## Etap 24 - admin action feedback i archiwizacja bez martwych przyciskow

FAKT:
- Po V9 Damian pokazal, ze przycisk Zarchiwizowany wyglada jak martwy guzik i akcje admina nie maja czytelnego hover/active/pending.
- Zarchiwizowany projekt nie renderuje juz przycisku submit; renderuje status role=status z data-admin-action="project-archive-state".
- Aktywne akcje admina dostaly wspolna warstwe hover, active, focus-visible, pending i disabled.

GUARDY:
- Dodano npm run verify:admin-action-feedback-v24.
- Guard pilnuje braku starej warstwy disabled archived button oraz obecnosci hover/active/pending CSS.

TEST RECZNY:
- TEST RECZNY DO WYKONANIA: sprawdzic hover, klik/active, pending oraz archiwizacje projektu niearchived.
<!-- ETAP24_ADMIN_ACTION_FEEDBACK_ARCHIVE_FIX -->

<!-- ETAP25_ADMIN_PUBLIC_PREVIEW_404_FIX -->
## Etap 25 - admin public preview bez 404

FAKT:
- Zgloszono, ze Podglad publiczny z admina prowadzi do 404 dla projektow, ktore nie sa active/publiczne.
- Dodano chroniona trase admin preview /admin/projekty/[id]/podglad, ktora czyta projekt po ID bez filtra status=active.
- Link akcji Podglad publiczny w adminie wskazuje na trase admin preview, a publiczny link /projekty/[slug] zostaje tylko dla projektow active.

GUARDY:
- Dodano npm run verify:admin-public-preview-v25.
- Guard pilnuje trasy admin preview, getAdminPreviewProjectById, braku 404 dla draft/hidden/archived oraz braku linkowania akcji preview do publicznego sluga.

TEST RECZNY:
- TEST RECZNY DO WYKONANIA: kliknac Podglad publiczny dla projektu draft/hidden/archived i potwierdzic, ze nie ma 404.
<!-- ETAP25_ADMIN_PUBLIC_PREVIEW_404_FIX -->

<!-- ETAP27_STAGE52_PUBLICATION_READINESS_GUARD -->
## Etap 27 / STAGE52 - guard gotowości publikacji

Komenda:

`npm run verify:project-publication-readiness-v35`

Guard sprawdza twardą bramkę active: nazwa, slug, kod, cena, metraż, pokoje, opis, hero, thumbnail, rzut, prywatna dokumentacja PDF, wariant/projekt podstawowy oraz UI box Gotowość publikacji.
<!-- ETAP27_STAGE52_PUBLICATION_READINESS_GUARD -->

<!-- ETAP28_STAGE53_DEMO_SAMPLE_CLEANUP_GUARD -->
## Etap 28 / STAGE53 - demo/sample cleanup

Komendy:
- `npm run verify:no-demo-content`
- `npm run verify:real-admin-projects`
- `npm run verify:legacy`

Guard pilnuje, ze sample nie tworzy active i nie pojawia sie w publicznym flow.
<!-- ETAP28_STAGE53_DEMO_SAMPLE_CLEANUP_GUARD -->
