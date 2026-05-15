# 07_NEXT_STEPS - nastepne kroki

## Najblizszy rekomendowany krok po Etapie 15B

Zastosować migrację `0017_order_fulfillment_checklist.sql` w Supabase i wykonać runtime test na jednym zamówieniu: zaznaczyć checklistę, dodać notatkę, zapisać i odświeżyć stronę.

## Zasady dalszej pracy

- Checklisty realizacji są teraz danymi, nie tylko UI.
- Nie dodawać automatycznej wysyłki, signed URL ani płatności bez osobnego etapu.
- Każda zmiana procesu realizacji powinna przejść przez stronę `/admin/zamowienia/[id]`.
- Notatka admina jest częścią tabeli `order_fulfillment_checklist`.

## Kolejne możliwe etapy

1. Runtime test Etapu 15B.
2. Widok audit logu `/admin/audit`.
3. Filtry zamówień po statusie i etapie realizacji.
4. Rozsądne oznaczenie zamówień częściowo/pełnie zrealizowanych na liście.
