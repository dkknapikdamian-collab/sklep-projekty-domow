# DESIGN LOCK — zamrożony kierunek wizualny

## Status

Wygląd zaakceptowany przez użytkownika jest wzorem 1:1.

Referencje są w folderze: `docs/design/references/`

## Kierunek wizualny

- ciemny grafit,
- szarości,
- czarne/grafitowe tła,
- złoto-beżowe akcenty,
- proste karty,
- duże wizualizacje,
- czytelne parametry,
- premium, ale bez przesady,
- zrozumiałe w kilka minut.

## Zakaz bez zgody

Nie wolno zmieniać bez osobnej decyzji:

- ciemnej kolorystyki,
- złoto-beżowych CTA,
- proporcji kart,
- dużych wizualizacji,
- prawego boxa zakupowego,
- stylu kafli parametrów,
- głównej typografii,
- zaokrągleń,
- stylu przycisków,
- ogólnego premium charakteru.

## Kontrola wyglądu

Przy każdym większym wdrożeniu trzeba sprawdzić:

- czy strona nadal wygląda jak referencja,
- czy kolory się nie rozjechały,
- czy nie powstały nowe przypadkowe style,
- czy przyciski są spójne,
- czy karty projektów są spójne,
- czy formularze pasują do reszty.

Największe ryzyko: każdy ekran z własnym CSS i własną wersją przycisków, kart oraz inputów. Dlatego muszą istnieć design tokens i komponenty wspólne.
