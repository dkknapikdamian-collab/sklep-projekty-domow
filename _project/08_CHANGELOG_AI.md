# 08_CHANGELOG_AI - Changelog AI

## 2026-05-16 - Roadmapa produkcyjna i odhaczanie etapow

- Dodano `_project/16_PRODUCTION_ROADMAP_AND_ACCEPTANCE.md` jako aktywny techniczny plik startowy dla AI.
- Dodano w Obsidianie notatke `11_ROADMAPA PRODUKCYJNA I ODHACZANIE - Sklep projekty domow.md`.
- Zaktualizowano dashboard Obsidiana, zeby linkowal nowa roadmapa.
- Zaktualizowano `_project/15_ACTIVE_SOURCE_MAP.md`, zeby AI czytalo nowy plik przed kazdym etapem.
- Zaktualizowano `_project/07_NEXT_STEPS.md`, zeby kolejne etapy byly odhaczane wg statusow: kod, guardy, test reczny, Obsidian, `_project`, ryzyka i nastepny krok.
- Ustalono kolejke produkcyjna: Etap 22 runtime audit admina, Etap 23 spojnosc komunikacji platnosci recznej, Etap 24 pelny runtime flow V1, Etap 25 walidacja zamowienia i cen, Etap 26 pliki zakupowe, Etap 27 sanity check publikacji, Etap 28 demo cleanup, Etap 29 pre-release checklist V1.
- Ten etap nie zmienia kodu aplikacji, UI, routingu, checkoutu ani bazy. To zmiana pamieci projektu i Obsidiana.

## Status testow

- TEST AUTOMATYCZNY / GUARD: nie uruchomiono lokalnie, bo zmiana wykonana przez GitHub API.
- TEST RECZNY DO WYKONANIA: Damian powinien otworzyc Obsidian i sprawdzic nowa notatke roadmapy.
- BRAK POTWIERDZONEGO TESTU RECZNEGO: do czasu potwierdzenia Damiana.

## 2026-05-16 - Etap 21 real audit coverage V6

- Dodano realne markery i pokrycie audit logu dla brakujacych mutacji admina: project_create, project_sample_create, project_media_delete, project_media_type_update, project_private_file_delete.
- Guard statyczny verify:admin-audit-log-v44 ma sprawdzac nie tylko widok /admin/audit, ale tez realne markery implementacji w akcjach admina.
- TEST RECZNY DO WYKONANIA: runtime audit w /admin/audit po realnych operacjach admina.

## 2026-05-15 22:45 - Hotfix v5: audit guard i memory check

- Dopasowano opis kafla `Audit` na dashboardzie do wymaganego markera.
- Dodano/exportowano `actionLabel` w `lib/admin/audit-log.ts`.
- Ustabilizowano `scripts/check-project-memory.cjs`.

## 2026-05-15 22:20 - Etap 20: Widok audit logu `/admin/audit`

- Dodano strone `/admin/audit`.
- Dodano odczyt wpisow z tabeli `admin_audit_log`.
- Dodano filtrowanie audit logu po typie akcji.
- Dodano tabele: data, admin, akcja, typ encji, ID encji, skrot metadata.
- Dodano link `Audit` w `AdminHeader`.
- Dodano kafel `Audit` na dashboardzie admina.
- Rozszerzono guard `verify:admin-audit-log-v44`.

## 2026-05-15 21:45 - Etap 19: Filtry i priorytetyzacja zamowien w adminie

- Dodano panel szybkich licznikow na `/admin/zamowienia`.
- Dodano filtrowanie zamowien po statusie, platnosci, realizacji i szybkim oznaczeniu.
- Dodano oznaczenia na karcie zamowienia.
- Dodano helpery priorytetu w `lib/admin/orders-admin.ts`.
- Zaktualizowano guard `verify:admin-orders-v42`.

## 2026-05-15 21:15 - Etap 17: Platnosc manualna / instrukcja przelewu

- Checkout informuje, ze platnosc odbywa sie po kontakcie i bez automatycznej platnosci online.
- Dodano migracje `supabase/migrations/0018_order_manual_payment_instruction.sql`.
- Dodano pole `payment_instruction` do `order_fulfillment_checklist`.
- Dodano pole `Instrukcja przelewu` na `/admin/zamowienia/[id]`.
- Dodano guard `verify:manual-payment-v48`.

## 2026-05-15 - Pelny mozg projektu sklepu

- Uzupelniono pelna pamiec projektu w repo aplikacji i Obsidianie.
- Dodano/uzupelniono pliki `_project/`.
- Dodano guard pamieci projektu.

<!-- ETAP22_RUNTIME_AUDIT_ADMINA_START -->
## Etap 22 — runtime audit admina

Zmiany:
- Dodano/zaostrzono metadata audit logu dla operacji admina: source, projectCode/orderId, previous/new status lub odpowiedniki.
- Dodano audyt blokowanej próby trwałego usunięcia projektu jako `project_hard_delete_blocked`.
- Rozszerzono `scripts/check-admin-audit-log-v44.cjs` o krytyczne action i kontrakt metadata.
- Zaktualizowano pamięć projektu i pakiet Obsidiana.

Status testu ręcznego:
- TEST RĘCZNY DO WYKONANIA.
<!-- ETAP22_RUNTIME_AUDIT_ADMINA_END -->
