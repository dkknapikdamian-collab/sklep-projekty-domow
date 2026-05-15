# 05_MANUAL_TESTS - testy reczne

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
