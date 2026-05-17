# 18_SQL_LEDGER - Sklep projekty domow

<!-- SQL_LEDGER_RULE_2026_05_17_START -->
## SQL_LEDGER_RULE

Status: AKTYWNE.
Data: 2026-05-17 Europe/Warsaw.

### Zasada

Każdy SQL użyty przy projekcie musi być zapisany w repo i w Obsidianie.

### Wymagania dla każdego SQL

1. Jeśli SQL zmienia schemat lub dane produkcyjne: plik w `supabase/migrations/` albo jawnie opisany manualny SQL w `supabase/manual/`.
2. Jeśli SQL jest tylko sprawdzeniem: plik w `supabase/manual/` z typem `READ_ONLY_VERIFICATION`.
3. Każdy SQL musi mieć wpis w tym pliku `_project/18_SQL_LEDGER.md`.
4. Każdy SQL musi mieć wpis w Obsidianie: `10_PROJEKTY/Sklep_projekty_domow/12_SQL_LEDGER - Sklep projekty domow.md`.
5. Raport run etapu musi wskazać, czy SQL został uruchomiony, gdzie, jaki miał wynik i czy był tylko SELECT czy mutacja.
6. SQL bez wpisu w ledgerze nie zamyka etapu.
7. Nie wolno wklejać jednorazowych SQL-i tylko z czatu bez zapisania ich w repo i Obsidianie.

### Status testu

To jest reguła procesu, nie test runtime. Guard Etapu 33 V2 sprawdza obecność tego ledgeru.
<!-- SQL_LEDGER_RULE_2026_05_17_END -->

<!-- SQL_LEDGER_ENTRY_ETAP33_2026_05_17_START -->
## 2026-05-17 - Etap 33 runtime admin audit verification

- SQL ID: `2026-05-17_etap33_admin_audit_runtime_verification`
- Plik: `supabase/manual/2026-05-17_etap33_admin_audit_runtime_verification.sql`
- Typ: `READ_ONLY_VERIFICATION`
- Mutacja danych/schematu: NIE.
- Cel: potwierdzić realne wpisy w `public.admin_audit_log` po kliknięciach admina.
- Kiedy uruchomić: po kliknięciu Etapu 33 w adminie.
- Gdzie uruchomić: Supabase SQL Editor albo przez `npm run audit:admin-runtime-v54` jako odpowiednik Node proof.
- Wynik wymagany: wszystkie grupy `PASS`.
- Status uruchomienia: TEST RĘCZNY DO WYKONANIA.
- Powiązany etap: Etap 33 runtime test admina i audit.
<!-- SQL_LEDGER_ENTRY_ETAP33_2026_05_17_END -->
