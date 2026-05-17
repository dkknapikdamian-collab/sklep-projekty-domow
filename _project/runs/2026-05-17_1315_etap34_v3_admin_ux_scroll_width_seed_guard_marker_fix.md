# Etap 34 V3 - admin UX stability, scroll restore, szerokość panelu i projekt testowy

## Scan-first confirmation

Przeczytane źródła:
- `AGENTS.md`
- `_project/01_PROJECT_GOAL.md`
- `_project/15_ACTIVE_SOURCE_MAP.md`
- `components/admin/AdminHeader.tsx`
- `components/admin/AdminProjectEditForm.tsx`
- `components/admin/AdminProjectMediaManager.tsx`
- `app/admin/projekty/[id]/edytuj/page.tsx`
- `app/admin-v8.css`
- `app/admin-header-v24.css`
- `_project/17_ETAP33_ADMIN_AUDIT_RUNTIME_CHECKLIST.md`
- Obsidian dashboard/status projektu w paczce aktualizowany lokalnie.

## FAKTY Z KODU

- Panel edycji projektu jest server-renderowany i server actions po mutacji mogą odświeżać widok.
- Akcje media i plików prywatnych są w `AdminProjectMediaManager`.
- Ekran edycji projektu używa `AdminProjectEditForm`.
- Podstawowy kontener `.admin-shell` miał historycznie `max-width: var(--container)` z okolic 1185px, co jest za wąskie dla dużych ekranów.
- Lista projektów miała osobną warstwę full-width, ale edycja projektu nadal wyglądała jak ciasny środek.

## DECYZJE DAMIANA

- Poprawić skok do góry po akcjach admina.
- Poprawić szerokość panelu admina: ma używać ekranu, ale nie rozciągać treści w nieskończoność.
- Testy Etapu 33, które wstępnie działają, mają być zapisane w Obsidianie jako do wykonania / do potwierdzenia później.
- Dodać projekt testowy z ładnymi zdjęciami, ponieważ poprzedni został skasowany.
- Robimy guardy.

## HIPOTEZY / PROPOZYCJE AI

- Scroll restore przez `sessionStorage` jest najtańszą i najmniej inwazyjną poprawą bez przebudowy server actions.
- Pełne usunięcie migania wymagałoby większej przebudowy w kierunku lokalnych client actions/optymistycznych stanów; to zostaje poza tym etapem.

## CO WDROŻONO

1. `AdminScrollStabilizer`
   - zapisuje scroll przed submit/click akcji admina,
   - przy kolejnym renderze `/admin` próbuje wrócić do tej samej pozycji,
   - ustawia `history.scrollRestoration = manual`.

2. Responsywna szerokość admina
   - nowy CSS `app/admin-ux-stability-v34.css`,
   - kontener admina używa większej szerokości viewportu,
   - ma limit czytelności około 1580-1640px,
   - ekran edycji projektu dostał klasę `admin-project-edit-shell`.

3. Projekt testowy
   - dodano SQL seed: `supabase/manual/2026-05-17_etap34_seed_admin_test_project.sql`,
   - projekt jest `draft`, nie `active`,
   - ma kod `DP-TEST-034`,
   - ma zdjęcia testowe z publicznych URL,
   - ma prywatne pliki testowe jako rekordy do klików runtime.

4. Guard
   - `scripts/check-admin-ux-stability-v34.cjs`,
   - script: `npm run verify:admin-ux-stability-v34`.

5. Project memory + Obsidian
   - testy do potwierdzenia zapisane jako zadanie późniejsze,
   - Etap 33 nie jest zamknięty,
   - Etap 34 ma status: wdrożone w kodzie, test ręczny do wykonania.

## TESTY AUTOMATYCZNE / GUARDY

- `node scripts/check-admin-ux-stability-v34.cjs`
- `node scripts/check-admin-audit-log-v44.cjs`

## TESTY RĘCZNE

Status: TEST RĘCZNY DO WYKONANIA.

Do potwierdzenia:
- scroll po zmianie media,
- scroll po usunięciu pliku prywatnego,
- scroll po zmianie statusu zamówienia,
- scroll po zmianie checklisty,
- szerokość panelu na 1366/1920/ultrawide,
- projekt testowy `DP-TEST-034` po uruchomieniu SQL.

## BRAKI I RYZYKA

- Scroll restore minimalizuje skok, ale nie usuwa całej natury server refresh.
- SQL seed mutuje dane testowe; nie uruchamiać na publicznej produkcji bez świadomej decyzji.
- Projekt testowy ma być draft i nie może być traktowany jako realna oferta.
- Etap 33 pozostaje niezamknięty do czasu 8 PASS / 0 FAIL.

## WPŁYW NA OBSIDIANA

Obsidian zostaje zaktualizowany:
- status Etapu 34,
- testy ręczne do wykonania później,
- SQL ledger dla projektu testowego,
- przypomnienie, że Etap 33 jest wstępnie częściowo potwierdzony, ale niezamknięty.

## NASTĘPNY KROK

1. Uruchomić paczkę.
2. Uruchomić SQL seed projektu testowego w Supabase SQL Editor.
3. Kliknąć brakujące operacje Etapu 33.
4. Ponowić SQL proof.

## V2 fix

- Guard nie wymaga już `READ_ONLY` dla SQL seed.
- Guard wymaga `TEST_DATA_SEED`, `DO_URUCHOMIENIA` i ostrzeżenia, że SQL nie jest do ślepego uruchamiania na publicznej produkcji.
- Apply uruchamia guardy przez `node scripts/...`, nie przez `npm run`, żeby PowerShell nie ukrywał błędu.

## V3 fix

- Guard akceptuje marker `NIE URUCHAMIAC` zgodny z zapisanym SQL.
- Etap nadal zapisuje SQL jako `TEST_DATA_SEED`, nie `READ_ONLY`.
- Commit/push ma przejść dopiero po guardzie V3.
