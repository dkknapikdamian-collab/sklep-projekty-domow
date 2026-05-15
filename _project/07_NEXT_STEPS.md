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

