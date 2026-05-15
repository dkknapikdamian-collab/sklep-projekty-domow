# 07_NEXT_STEPS - nastepne kroki

## Najblizszy rekomendowany krok po Etapie 14

Wykonać runtime test jednego zamówienia na `/admin/zamowienia/[id]`: wejść z listy, sprawdzić dane, zmienić status i potwierdzić, że obsługa ręczna jest możliwa bez zaglądania do Supabase.

## Zasady dalszej pracy

- Lista zamówień ma pozostać szybkim przeglądem.
- Szczegóły i obsługa konkretnego zamówienia mają być na `/admin/zamowienia/[id]`.
- Nie dokładać automatycznej wysyłki, signed URL ani płatności bez osobnego etapu.
- Notatka admina wymaga osobnej decyzji i migracji, jeśli ma być zapisywana trwale.

## Kolejne możliwe etapy

1. Runtime test Etapu 14.
2. Trwała notatka admina dla zamówienia z migracją.
3. Widok audit logu `/admin/audit`.
4. Uporządkowanie filtrów zamówień i wyszukiwarka po kliencie/statusie.
