# Zasady pracy dla developera

## 1. Design lock

Nie zmieniać wyglądu bez decyzji. Każda funkcja musi pasować do ciemnego, grafitowego, premium stylu.

## 2. Jedno źródło prawdy

- kolory w tokenach,
- komponenty wspólne,
- dane w bazie/demo data,
- statusy jako stałe enumy,
- brak kopiowania logiki po ekranach.

## 3. Nie zaczynać od automatyzacji

Najpierw katalog, karta projektu, admin projektów, koszyk, checkout i zamówienia. Potem płatności, PDF/link i pełne automatyzacje.

## 4. Nie wpisywać danych w komponenty

Komponenty mają renderować dane. Źródła danych: demo data, potem baza.

## 5. Każdy projekt ma kod

Kod jest obowiązkowy i używany wszędzie.

## 6. Po zamówieniu musi być rekord

Nie wolno robić flow, w którym jedynym śladem jest e-mail.

## 7. Wysyłka PDF musi mieć fallback

Jeśli PDF jako załącznik nie przejdzie, system wysyła link albo oznacza ręczną obsługę.

## 8. Brak sekretów w repo

Nie commitować tokenów, kluczy API, haseł ani danych produkcyjnych.
