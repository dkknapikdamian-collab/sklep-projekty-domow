# 10_PROJECT_TIMELINE - Oś czasu projektu

## Przed aplikacją

### Kierunek wizualny / makiety

Powstały lub były rozważane materiały wizualne i makiety. Obowiązujący status: mogą służyć jako inspiracja/design lock, ale nie są realnymi ofertami projektów.

### Decyzja: nie produkcyjny czysty HTML

Projekt ma iść w aplikację sklepową, nie w statyczny HTML.

## Budowa aplikacji

### Etapy bazowe

Powstała aplikacja Next.js / React z trasami publicznymi i adminowymi.

Znane obszary:

- strona główna,
- katalog/projekty,
- koszyk,
- checkout/zamówienie,
- panel admina,
- logowanie/setup admina,
- projekty: lista, nowy, edycja, podgląd.

### Panel admina

Damian zgłaszał, że część przycisków w panelu admina nie działała albo wymagała podpięcia:

- `Edytuj`,
- `Zapisz dane`,
- `Anuluj`,
- zmiana statusu,
- usunięcie.

To stało się osobnym torem audytu i naprawy. Po każdej zmianie admina test przycisków jest obowiązkowy.

### Checkout V1

Rozpoczęto/wykonano etap checkoutu V1. Aktualny stan wymaga potwierdzenia pełnym testem od projektu do zamówienia.

### Dodatek PDF e-mail +250 zł

2026-05-13: dodano wymóg dodatku zakupowego `Projekt w formacie PDF na e-mail` za +250 zł.

Ważna interpretacja: dodatek nie może kolidować z bazową dostawą cyfrową. Ma być dodatkową wygodną formą wysyłki/archiwizacji PDF na e-mail.

### UI admina / czytelność tabeli

Damian wskazał problem z rozjechaną tabelą/listą i za dużą czcionką. Preferencja: jedna czytelna linijka, bez chaosu.

## 2026-05-15 - Pełna pamięć projektu

Uzupełnienie repo i Obsidiana o pełny mózg projektu:

- status,
- cel,
- zasady pracy,
- aktualny etap,
- decyzje,
- testy ręczne,
- guardy,
- następne kroki,
- changelog,
- kontekst dla Obsidiana,
- timeline,
- potwierdzenia Damiana,
- raporty AI.

## Rzeczy porzucone

- Czysty HTML jako produkcyjny sklep.
- Fikcyjne projekty jako realne oferty.
- Konto klienta jako obowiązkowy element V1.

## Rzeczy zamrożone / ostrożne

- Nie zmieniać UI bez zakresu.
- Nie refaktorować szeroko przy małych etapach.
- Nie dopisywać propozycji AI jako decyzji.
- Nie ruszać routingu, jeśli zadanie dotyczy tylko dokumentacji/pamięci.

| Data | Etap | Zmiana | Ważne pliki |
|---|---|---|---|
| 2026-05-15 | Etap 17: płatność manualna / instrukcja przelewu | Checkout komunikuje płatność po kontakcie, admin zapisuje instrukcję przelewu, a roboczy e-mail zawiera dane do płatności. | `components/order/CheckoutForm.tsx`, `app/admin/zamowienia/[id]/page.tsx`, `lib/admin/order-email-drafts.ts`, `supabase/migrations/0018_order_manual_payment_instruction.sql` |
| 2026-05-15 | Etap 19: filtry i priorytetyzacja zamówień | Lista `/admin/zamowienia` dostała liczniki, filtry i oznaczenia priorytetów: kontakt, płatność, wysyłka. | `app/admin/zamowienia/page.tsx`, `lib/admin/orders-admin.ts`, `app/admin-v8.css`, `scripts/check-admin-orders-v42.cjs` |

| 2026-05-15 | Etap 20: widok audit logu | Dodano `/admin/audit`, filtr po typie akcji i tabelę śladu operacji admina. | `lib/admin/audit-log.ts`, `app/admin/audit/page.tsx`, `components/admin/AdminHeader.tsx`, `scripts/check-admin-audit-log-v44.cjs` |

