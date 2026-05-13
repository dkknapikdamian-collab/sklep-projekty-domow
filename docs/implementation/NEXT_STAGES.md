# Następne etapy produkcyjne

## Etap 1 — Panel dodawania projektów

Cel:
Użytkownik/admin dodaje projekty bez edycji kodu.

Musi obsłużyć:
- kod,
- slug,
- nazwa,
- cena,
- opis,
- parametry,
- pomieszczenia,
- media,
- pliki prywatne,
- status projektu.

## Etap 2 — Storage mediów

Cel:
Media projektu nie są przypadkowymi plikami w repo, tylko zarządzanym storage.

## Etap 3 — Koszyk i checkout

Cel:
Po kliknięciu „Dodaj do koszyka” projekt, wariant i dodatki przechodzą do zamówienia.

## Etap 4 — Zamówienia

Cel:
Po checkout powstaje rekord:
- klient,
- projekt,
- kod,
- cena,
- dodatki,
- status płatności,
- status wysyłki.

## Etap 5 — Płatności

Cel:
Status `paid` tylko po webhooku płatności.

## Etap 6 — PDF/link po płatności

Cel:
Jeśli klient kupił `PDF_EMAIL_PACKAGE`, system wysyła PDF albo prywatny link.
