# 07_NEXT_STEPS - nastepne kroki

## Najblizszy rekomendowany krok po Etapie 19

Wykonać runtime test `/admin/zamowienia` na realnych danych Supabase: sprawdzić liczniki, filtry i przejście z filtrowanej listy do szczegółu zamówienia.

## Zasady dalszej pracy

- Płatność manualna jest świadomym V1, nie niedoróbką.
- Nie dodawać Stripe/PayU bez osobnego etapu.
- Nie udawać automatycznego księgowania.
- Status `paid_manual` oznacza ręczne potwierdzenie płatności przez admina.
- Dane do płatności mają być widoczne w e-mailu roboczym, ale wysyłka nadal jest ręczna.
- Lista zamówień ma pomagać w priorytetyzacji, ale nie ma udawać pełnego CRM.

## Kolejne możliwe etapy

1. Runtime test Etapu 19 na realnych zamówieniach.
2. Widok audit logu `/admin/audit`.
3. Oznaczenie na liście zamówień, że instrukcja przelewu została ustawiona - zrobione w Etapie 19, ale wymaga potwierdzenia runtime.
4. Uporządkowanie szczegółu zamówienia pod ręczną obsługę e-maili, jeżeli test Damiana pokaże tarcie.
5. Dopiero później: automatyzacje dostarczania plików, jeśli ręczny workflow będzie stabilny.
