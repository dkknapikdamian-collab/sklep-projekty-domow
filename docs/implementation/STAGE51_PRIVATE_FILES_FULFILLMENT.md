# STAGE51 / Etap 26 - produkcyjna obsługa prywatnych plików w adminie zamówienia

Data: 2026-05-16

## Teza

V1 nie potrzebuje automatycznej wysyłki plików, ale admin musi widzieć dokładnie, co ma wysłać klientowi po potwierdzeniu płatności.

## Co wdrożono

- Dodano metadane realizacji plików w `lib/admin/order-files.ts`.
- Dodano panel `Pliki do realizacji` na szczególe zamówienia.
- Dla każdej pozycji zamówienia admin widzi:
  - kod projektu,
  - nazwę projektu,
  - status dokumentacji PDF,
  - status paczki ZIP,
  - status pakietu PDF e-mail,
  - bucket i ścieżkę w Supabase Storage,
  - instrukcję ręcznego pobrania,
  - ostrzeżenie, jeśli wymagany plik jest brakujący.
- Panel nie generuje publicznych linków i nie wysyła plików automatycznie.
- Dodano guard `scripts/check-private-files-fulfillment-v51.cjs`.
- Dodano skrypt `npm run verify:private-files-fulfillment-v51`.
- Wpięto guard na początek `npm run verify`.

## Statusy plików

- `brak pliku`
- `plik dostępny`
- `do wysłania ręcznie`
- `wysłane ręcznie`

## Bezpieczeństwo

Etap celowo nie dodaje:

- `createSignedUrl`,
- publicznych linków do prywatnych plików,
- automatycznego e-maila,
- automatycznej wysyłki dokumentacji.

Admin widzi tylko bucket/path i instrukcję ręcznego pobrania z Supabase Storage.

## Guard

```powershell
npm run verify:private-files-fulfillment-v51
```

Guard sprawdza:

- helpery fulfillment dla prywatnych plików,
- panel `Pliki do realizacji`,
- statusy plików,
- ostrzeżenie dla brakujących plików,
- powiązanie z checklistą płatność/PDF/ZIP,
- brak signed/public URL i brak automatycznej wysyłki.

## Test ręczny na Vercelu

1. Wejdź w admina zamówień.
2. Otwórz szczegół zamówienia z projektem, który ma prywatne pliki.
3. Sprawdź sekcję `Pliki do realizacji`.
4. Sprawdź, czy dla projektu widać dokumentację PDF, ZIP i PDF e-mail.
5. Sprawdź bucket/path.
6. Sprawdź, że nie ma linku publicznego do klienta.
7. Odhacz płatność potwierdzoną, PDF wysłany, ZIP wysłany.
8. Sprawdź, czy statusy plików są czytelne.
9. Otwórz zamówienie z projektem bez prywatnych plików i sprawdź ostrzeżenie.

## Kryterium zamknięcia

Admin widzi dokładnie, co ma wysłać klientowi po płatności i nie musi zgadywać po Supabase.

## Status

- Kod: wdrożony.
- Guard: dodany i wpięty.
- Test lokalny npm: do wykonania.
- Test ręczny Vercel: do wykonania.
