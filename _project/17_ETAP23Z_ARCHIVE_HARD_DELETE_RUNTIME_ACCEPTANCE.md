# Etap 23Z - archiwizacja i hard delete runtime acceptance

<!-- ETAP23Z_ARCHIVE_DELETE_RUNTIME_ACCEPTANCE_2026_05_16 -->

## Status

- Kod Etapu 23 jest wdrozony statycznie.
- Etap 23 pozostaje NIEZAMKNIETY runtime do czasu recznego testu Damiana.
- Status reczny: TEST RECZNY DO WYKONANIA.

## Cel

Domknac niestabilny temat archiwizacji i trwalego usuwania projektu po seriach V4, V5, V7, V8 i V9 bez udawania, ze guard statyczny jest testem runtime.

## Zakres testu recznego

Test wykonac wylacznie na projekcie testowym przeznaczonym do usuniecia.

1. Utworzyc albo wskazac projekt testowy.
2. Archiwizacja z listy projektow - PASS/FAIL.
3. Archiwizacja z ekranu edycji - PASS/FAIL.
4. Odświeżenie po archiwizacji pokazuje status archived - PASS/FAIL.
5. Brak martwego guzika dla stanu zarchiwizowanego - PASS/FAIL.
6. Hard delete z blednym kodem jest zablokowany - PASS/FAIL.
7. Hard delete z poprawnym kodem usuwa tylko projekt testowy - PASS/FAIL.
8. /admin/audit pokazuje probe/blokade/sukces operacji - PASS/FAIL.
9. Projekt nie wraca po odswiezeniu listy - PASS/FAIL.
10. Publiczny katalog nie pokazuje usunietego testowego projektu - PASS/FAIL.

## Kryterium zamkniecia

Etap 23 mozna zamknac dopiero po wpisie:

TEST RECZNY POTWIERDZONY PRZEZ DAMIANA

oraz po zapisaniu wyniku w:

- _project/11_USER_CONFIRMED_TESTS.md,
- _project/14_TEST_HISTORY.md,
- _project/12_IMPLEMENTATION_LEDGER.md,
- Obsidianie projektu.

## Guard

Dodany guard:

`powershell
npm run verify:admin-archive-delete-runtime-v23z
`

Guard sprawdza kontrakt kodu i dokumentacji:

- archiwizacja ma returnTo i bezpieczny redirect,
- update archiwizacji zwraca rekord i sprawdza status archived,
- archiwizacja zapisuje audit log,
- hard delete wymaga kodu projektu,
- bledny kod zapisuje project_hard_delete_blocked,
- poprawny kod zapisuje project_hard_delete,
- project memory zawiera status Etapu 23Z.

## Ryzyko

Hard delete jest destrukcyjny. Nie testowac na realnym projekcie sprzedazowym.

<!-- ETAP23Z_ARCHIVE_DELETE_RUNTIME_ACCEPTANCE_2026_05_16 -->
