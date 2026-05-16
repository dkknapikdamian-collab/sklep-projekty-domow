# 07_NEXT_STEPS - nastepne kroki

## Najbliższy rekomendowany krok po Etapie 20

Wykonać runtime test `/admin/audit`: zrobić operację admina, wejść w audit log i potwierdzić, że wpis pojawia się z poprawną akcją, typem encji, ID encji i metadata.

## Zasady dalszej pracy

- Lista zamówień ma pomagać w priorytetyzacji, ale nie ma udawać pełnego CRM.
- Audit log jest widokiem tylko do odczytu.
- Nie zmieniać mechanizmu auth bez osobnego etapu.
- Nie dodawać automatycznych płatności ani automatycznej wysyłki bez osobnej decyzji.
- Każda operacja ryzykowna w adminie powinna mieć ślad w audit logu.

## Kolejne możliwe etapy

1. Runtime test Etapu 20 na realnych operacjach admina.
2. Jeśli audit pokaże braki: dopięcie brakujących `writeAdminAuditLog` w konkretnych akcjach admina.
3. Uporządkowanie szczegółu zamówienia pod ręczną obsługę e-maili, jeśli test Damiana pokaże tarcie.
4. Dopiero później: automatyzacje dostarczania plików, jeśli ręczny workflow będzie stabilny.

<!-- SKLEP_FULL_MEMORY_OBSIDIAN_REPO_V6_2026_05_15 START -->

## Next step after memory package - 2026-05-15 22:12:34

1. Confirm V6 script completed and pushed app + Obsidian changes.
2. Open Obsidian dashboard and check readable names.
3. Then return to actual store development using package format: goal, files, change, do not change, checks, done criteria.

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
