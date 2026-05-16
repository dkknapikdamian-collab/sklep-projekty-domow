# Etap 23 V7 - admin archive/delete runtime repair

<!-- ETAP23_ADMIN_DELETE_ARCHIVE_FIX_V7 -->

## FAKTY Z KODU / PLIKOW
- Zgloszono regresje: archiwizacja miga ekranem, a usuwanie projektu jest zablokowane.
- Finalny repair nadpisuje komponent delete/archive, dodaje returnTo na edycji, luzuje blokade statusowa hard delete i aktualizuje guardy.

## TESTY AUTOMATYCZNE
- npm run verify:admin-buttons-v19
- npm run verify:admin-audit-log-v44
- npm run typecheck
- npm run build
- npm run check:project-memory

## TEST RECZNY
- TEST RECZNY DO WYKONANIA.

## OBSIDIAN
- Zaktualizowac notatki Sklep_projekty_domow.

