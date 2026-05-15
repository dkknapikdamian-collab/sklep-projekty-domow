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
