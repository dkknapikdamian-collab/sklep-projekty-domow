# 07_NEXT_STEPS - nastepne kroki

## Najblizszy rekomendowany krok po Etapie 17

Zastosować migrację `0018_order_manual_payment_instruction.sql`, wpisać instrukcję przelewu na zamówieniu testowym i sprawdzić, czy pojawia się w roboczym e-mailu potwierdzenia zamówienia.

## Zasady dalszej pracy

- Płatność manualna jest świadomym V1, nie niedoróbką.
- Nie dodawać Stripe/PayU bez osobnego etapu.
- Nie udawać automatycznego księgowania.
- Status `paid_manual` oznacza ręczne potwierdzenie płatności przez admina.
- Dane do płatności mają być widoczne w e-mailu roboczym, ale wysyłka nadal jest ręczna.

## Kolejne możliwe etapy

1. Runtime test Etapu 17.
2. Filtry zamówień po statusie i etapie realizacji.
3. Widok audit logu `/admin/audit`.
4. Oznaczenie na liście zamówień, że instrukcja przelewu została ustawiona.
