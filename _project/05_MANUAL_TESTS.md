# 05_MANUAL_TESTS - testy reczne

## Test reczny po Etapie 7

Status: do wykonania po wdrożeniu paczki i przejściu checków.

### Co sprawdzić

1. Uruchom lokalnie:

```powershell
START_LOCAL.bat
```

albo:

```powershell
npm run dev
```

2. Dodaj aktywny projekt do koszyka i przejdź do:

```text
/zamowienie
```

3. Sprawdź nagłówek checkoutu.

Oczekiwany wynik:

- widzisz `Zamówienie projektu`,
- widzisz komunikat `Po wysłaniu potwierdzimy dostępność, płatność i sposób realizacji`,
- nie ma komunikatu `zamówienie testowe` ani tekstu o technicznym rekordzie w Supabase.

4. Sprawdź opis przy formularzu.

Oczekiwany wynik:

- klient rozumie, że kupuje wybrane projekty, warianty i dodatki z koszyka,
- klient rozumie, że kontakt nastąpi po złożeniu zamówienia,
- checkout nie obiecuje automatycznej płatności online.

5. Jeśli w koszyku jest dodatek `PDF na e-mail`, sprawdź podsumowanie.

Oczekiwany wynik:

- PDF na e-mail jest opisany jako dodatkowy pakiet PDF wysyłany na podany adres po potwierdzeniu realizacji,
- tekst nie sugeruje natychmiastowej automatycznej wysyłki plików.

6. Wyślij formularz.

Oczekiwany wynik:

- komunikat sukcesu potwierdza przyjęcie zamówienia projektu,
- jest numer zamówienia,
- tekst informuje o ręcznym potwierdzeniu dostępności, płatności i realizacji.

## Test reczny po Etapie 6

Status: do wykonania w runtime z dzialajacym Supabase Auth i zastosowana migracja `0015_orders_v42_statuses.sql`.

### Co sprawdzic

1. Uruchom lokalnie:

```powershell
START_LOCAL.bat
```

albo:

```powershell
npm run dev
```

2. Dodaj aktywny projekt do koszyka i przejdz do `/zamowienie`.
3. Wypelnij formularz zamowienia i wyslij go.
4. Oczekiwany wynik: checkout pokazuje sukces i techniczny numer zamowienia.
5. Zaloguj sie do panelu admina.
6. Wejdz na:

```text
/admin/zamowienia
```

7. Oczekiwany wynik: widac nowe zamowienie z numerem/id, klientem, e-mailem, telefonem, suma, statusem `Nowe`, data i liczba pozycji.
8. Rozwin `Pozycje i dane obslugi`.
9. Oczekiwany wynik: widac pozycje zamowienia, projekt, slug, wariant, dodatki, uwagi i dane do faktury.
10. Zmien status na `Kontakt byl`, zapisz i sprawdz, czy po powrocie status jest zachowany.

## Wynik proby 2026-05-15 09:19

- Runtime przegladarkowy nie byl wykonywany w tym etapie.
- Kodowo i buildowo potwierdzono trase `/admin/zamowienia`.
- Pelny test admina nadal zalezy od dzialajacego lokalnego Supabase Auth / anon key oraz zastosowania migracji statusow.

## Test reczny po Etapie 5

Status: przeprowadzony lokalnie na publicznej karcie aktywnego projektu i koszyku.

### Co sprawdzic

1. Uruchom lokalnie:

```powershell
START_LOCAL.bat
```

albo:

```powershell
npm run dev
```

2. Wejdz na aktywny projekt, np.:

```text
/projekty/[slug-active]
```

3. Kliknij serduszko na glownej galerii albo kafelku projektu.
4. Oczekiwany wynik: licznik `Ulubione` w headerze zmienia stan i serduszko ma stan aktywny.
5. Zaznacz dodatek `Pakiet PDF na e-mail`, jesli projekt go ma.
6. Kliknij `DODAJ DO KOSZYKA`.
7. Oczekiwany wynik: przejscie do `/koszyk`, 1 pozycja w koszyku i licznik `Koszyk` w headerze rowny `1`.
8. Odznacz/zaznacz dodatek w koszyku.
9. Oczekiwany wynik: suma pozycji i podsumowanie zmieniaja sie zgodnie z cena dodatku.
10. Kliknij `Usun pozycje`.
11. Oczekiwany wynik: koszyk jest pusty, a licznik `Koszyk` w headerze wraca do `0`.

## Wynik proby 2026-05-15 09:03

- Runtime: `http://localhost:3100`.
- Testowany projekt: `/projekty/31231312312`.
- Ulubione: serduszko zapisalo stan, licznik finalnie pokazal `1`, brak bledow konsoli.
- Koszyk: po `DODAJ DO KOSZYKA` strona przeszla do `/koszyk`, licznik pokazal `1`.
- Pozycja koszyka miala kod `DP-2026-0001`, slug `31231312312`, wariant `Projekt podstawowy` i sume `12584` z PDF.
- Odznaczenie dodatku zmienilo sume pozycji z `12584` na `12334`.
- `Usun pozycje` pokazalo pusty koszyk i licznik `0`.
## Test reczny po Etapie 4

Status: przeprowadzony na publicznej karcie aktywnego projektu.

### Co sprawdzic

1. Uruchom lokalnie:

```powershell
START_LOCAL.bat
```

albo:

```powershell
npm run dev
```

2. Wejdz na publiczna karte aktywnego projektu:

```text
/projekty/[slug-active]
```

3. Sprawdz, czy karta ma logiczny uklad:

- galeria,
- cena,
- warianty,
- dodatki,
- CTA `DODAJ DO KOSZYKA`,
- dane techniczne,
- rzuty,
- pomieszczenia,
- co zawiera projekt,
- podobne projekty.

4. Wybierz wariant projektu.
5. Zaznacz `Pakiet PDF na e-mail`.
6. Sprawdz, czy przy dodatku widac, ze jest to opcjonalny pakiet PDF na e-mail i nie zastepuje podstawowej dostawy.
7. Sprawdz, czy cena sumuje wariant i dodatki.
8. Kliknij `DODAJ DO KOSZYKA`.
9. Oczekiwany wynik: przejscie do `/koszyk` z wybranym wariantem i dodatkami.

## Wynik proby 2026-05-15 08:35

- Wybrano wariant `Odbicie lustrzane + zmiany`.
- Zaznaczono `Pakiet PDF na e-mail +250 zl`.
- Kliknieto `DODAJ DO KOSZYKA`.
- Strona przeszla do `/koszyk`.
- Koszyk pokazal projekt, wariant i zaznaczony dodatek PDF.
- Zauwazono: header pokazywal `Koszyk 0`, mimo ze koszyk zawieral pozycje. To zostaje jako osobne ryzyko/mozliwy kolejny etap.

## Test reczny po Etapie 3

Status: kodowo i guardowo OK; manualny runtime admin -> public nadal zalezy od dzialajacego logowania admina.

### Co sprawdzic

1. Upewnij sie, ze masz co najmniej jeden projekt `active` i po jednym projekcie testowym w statusach `draft`, `hidden`, `archived`.
2. Wejdz na `/projekty`.
3. Sprawdz, ze `active` jest widoczny, a `draft`, `hidden`, `archived` nie sa widoczne.
4. Wejdz na `/projekty/[slug-active]` i porownaj dane z adminem: nazwa, cena, warianty, dodatki, media, pomieszczenia, parametry techniczne.
5. Wejdz na slug projektu `draft`, `hidden` albo `archived` i sprawdz, ze karta nie jest publicznie dostepna.
6. Na karcie projektu `active` sprawdz, ze podobne projekty nie zawieraja `draft`, `hidden`, `archived`.

## Test reczny po Etapie 2

Status: zablokowany przez runtime Supabase Auth.

Po naprawie anon key sprawdz w adminie: Edytuj, Zapisz projekt, Anuluj, zmiana statusu, usuwanie i komunikaty po redirectach.

## Test reczny po Etapie 1: panel admina / akcje

Cel: sprawdzic, czy widoczne akcje panelu admina dzialaja realnie, a nie tylko wygladaja jak przyciski.

Sprawdz:

- `/admin` pokazuje kafelki i linki do glownych obszarow.
- `/admin/projekty` pozwala wejsc w edycje projektu.
- `Edytuj` otwiera `/admin/projekty/[id]/edytuj`.
- `Podglad publiczny` otwiera `/projekty/[slug]`.
- `Ustaw draft` i `Ustaw active` wysylaja realne akcje.
- `Usuń` pokazuje confirm i usuwa dopiero po potwierdzeniu.
- `Anuluj` wraca na `/admin/projekty?cancelled=1`.
- Media w edycji trzeba sprawdzac ostroznie na projekcie testowym.

## Test reczny po Etapie 0

Sprawdz:

1. Czy istnieje `AGENTS.md`.
2. Czy istnieje folder `_project/`.
3. Czy istnieja wszystkie wymagane pliki `_project`.
4. Czy istnieje `_project/runs/.gitkeep`.
5. Czy istnieje `scripts/check-project-memory.cjs`.
6. Czy `package.json` ma skrypt `check:project-memory`.
7. Czy check pamieci projektu przechodzi:

```powershell
npm run check:project-memory
```

## Wynik poprawny Etapu 0

- Komenda konczy sie bez bledu.
- Terminal pokazuje:

```text
OK: project memory structure is complete.
```
