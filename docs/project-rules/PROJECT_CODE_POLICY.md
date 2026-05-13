# Zasada kodów projektów

## Status

Obowiązuje od V13.

## Decyzja

Kod projektu jest generowany automatycznie przez system.

Format:

```txt
DP-YYYY-NNNN
```

Przykład:

```txt
DP-2026-0001
DP-2026-0002
DP-2027-0001
```

## Znaczenie elementów

```txt
DP     — prefix projektu w sklepie
YYYY   — rok utworzenia projektu
NNNN   — kolejny numer w danym roku, cztery cyfry
```

## Dlaczego nie używamy skrótów nazw

Wcześniejszy kierunek zakładał ręczne kody typu:

```txt
DP-MAL-014
DP-AUR-002
```

Ta zasada zostaje odrzucona.

Powód:

- admin nie ma pamiętać skrótów serii,
- nie każdy produkt musi być domem jednorodzinnym,
- w przyszłości mogą dojść hale, garaże, budynki gospodarcze lub inne projekty,
- typ produktu powinien być osobnym polem, a nie częścią kodu,
- kod ma być stabilnym identyfikatorem technicznym i sprzedażowym.

## Gdzie zapamiętujemy kod

Licznik kolejnego numeru:

```txt
public.project_code_counters
```

Finalny kod projektu:

```txt
public.projects.code
```

## Zasady niezmienności

Po sprzedaży projektu kod nie powinien być zmieniany.

Kod może pojawić się w:

- zamówieniu,
- mailu do klienta,
- płatności,
- fakturze,
- PDF,
- folderze mediów,
- pliku prywatnym,
- logach admina.

## Duplikaty

System nie pozwala dodać dwóch projektów z tym samym kodem.

System nie pozwala dodać dwóch projektów z tym samym slugiem.

Jeżeli slug istnieje, admin dostaje czytelny komunikat i link do listy/projektu, zamiast technicznego błędu bazy.
