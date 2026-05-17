# Etap 34 V5 - admin width hard lock + potwierdzenia Damiana

## Cel

1. Zapisać w repo i Obsidianie testy ręczne potwierdzone przez Damiana.
2. Naprawić nadal zbyt wąski panel edycji admina.
3. Wyjaśnić błąd SQL Editor `syntax error at or near "Etap"`.

## FAKTY Z TESTU DAMIANA

- SQL seed projektu testowego przeszedł i zwrócił:
  - `DP-TEST-034`
  - `Dom Aurora Test`
  - `status: draft`
- Damian potwierdził: `dalej wąski tunel`, czyli szerokość panelu admina nadal jest FAIL.
- Damian napisał: `reszta jest ok`.
- W SQL Editor pojawił się błąd `syntax error at or near "Etap"`, ponieważ do SQL Editor trafił tekst zaczynający się od `Etap 34:`, a nie SQL. To nie jest błąd bazy ani seed SQL.

## FAKTY Z KODU / PLIKÓW

- Etap 34 V3 wdrożył `AdminScrollStabilizer`, responsywną szerokość i SQL seed.
- Etap 34 V4 poprawił seed `features` / `related_slugs` na JSONB.
- CSS V3/V4 nadal nie przełamał realnie wąskiego layoutu edycji admina.
- Prawdopodobna przyczyna: starsze reguły `.admin-shell` / `.admin-form-layout` nadal wygrywają lub ograniczają czytelny obszar.
- V5 dodaje hard lock na końcu `app/globals.css`, z wysoką specyficznością i `!important`.

## DECYZJE DAMIANA

- Potwierdzić to, co przetestowane, w Obsidianie.
- Szerokość panelu naprawiać dalej.
- Testy, które wstępnie działają, zostają zapisane jako potwierdzone częściowo / do dalszego potwierdzenia.
- Robimy guardy.

## HIPOTEZY / PROPOZYCJE AI

- `min(1720px, calc(100vw - gutters))` powinno usunąć efekt wąskiego tunelu na dużych ekranach bez rozciągania w nieskończoność.
- Jeśli po V5 dalej będzie ciasno, problem siedzi w elemencie wewnętrznym lub runtime CSS cache, a nie w samym `.admin-shell`.

## WDROŻONE

- Hard lock CSS na końcu `app/globals.css`.
- Guard:
  - `scripts/check-admin-width-v35.cjs`
  - `npm run verify:admin-width-v35`
- Aktualizacja:
  - `_project`
  - SQL ledger
  - test history
  - Obsidian dashboard/status/next/sql ledger

## TESTY AUTOMATYCZNE / GUARDY

- `node scripts/check-admin-width-v35.cjs`
- `node scripts/check-admin-ux-stability-v34.cjs`
- `node scripts/check-admin-audit-log-v44.cjs`

## TESTY RĘCZNE

### TEST RĘCZNY POTWIERDZONY PRZEZ DAMIANA - CZĘŚCIOWO

- SQL seed projektu testowego:
  - `DP-TEST-034`
  - `Dom Aurora Test`
  - `draft`
- Reszta testów Etapu 34 poza szerokością: wstępnie OK według Damiana.

### TEST RĘCZNY FAIL / DO PONOWNEGO TESTU

- Szerokość panelu admina: nadal `wąski tunel`.

### TEST RĘCZNY DO WYKONANIA PO V5

- Otworzyć `/admin/projekty`.
- Wejść w `DP-TEST-034 -> Edytuj`.
- Sprawdzić szerokość na dużym ekranie.
- Potwierdzić, czy formularz używa większej części ekranu bez rozciągania w nieskończoność.
- Sprawdzić scroll po akcji w dole formularza.

## BRAKI I RYZYKA

- V5 nie zamyka Etapu 34 ręcznie, bo szerokość wymaga ponownego potwierdzenia.
- Etap 33 nadal wymaga 8 PASS / 0 FAIL dla audit runtime.
- Jeżeli SQL Editor dostaje tekst z czatu zamiast SQL, będzie zgłaszał błąd składni. To nie jest regresja aplikacji.

## WPŁYW NA OBSIDIANA

- Obsidian zapisuje:
  - SQL seed potwierdzony,
  - szerokość panelu FAIL,
  - V5 jako poprawka szerokości do ponownego testu,
  - Etap 33 nadal niezamknięty.

## NASTĘPNY KROK

1. Uruchomić V5.
2. Odświeżyć aplikację / restart dev server, jeśli CSS jest cache’owany.
3. Sprawdzić szerokość edycji projektu.
4. Jeśli szerokość OK, zapisać ręczne potwierdzenie.
5. Wrócić do brakujących klików Etapu 33.
