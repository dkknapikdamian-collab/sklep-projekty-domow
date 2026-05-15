# 07_NEXT_STEPS - nastepne kroki

## Najblizszy rekomendowany krok po Etapie 16

Wykonać test ręczny na realnym zamówieniu testowym: wejść w `/admin/zamowienia/[id]`, sprawdzić trzy drafty i skopiować jeden z nich do własnej skrzynki.

## Zasady dalszej pracy

- E-maile robocze są tylko tekstem do ręcznego użycia.
- Nie dodawać automatycznej wysyłki bez osobnego etapu i decyzji.
- Nie dodawać SMTP, Resend ani Mailgun na tym etapie.
- Drafty mają przyspieszać pracę admina, ale odpowiedzialność za wysyłkę zostaje ręczna.

## Kolejne możliwe etapy

1. Runtime test Etapu 16.
2. Status/znacznik `e-mail wysłany ręcznie` w checklistach, jeśli będzie potrzebny.
3. Widok audit logu `/admin/audit`.
4. Filtry zamówień po statusie i etapie realizacji.
