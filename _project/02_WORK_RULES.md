# 02_WORK_RULES - Zasady pracy AI w projekcie sklepu

## Tryb pracy

Pracuj jak developer utrzymujący istniejący produkt, nie jak kreator nowej aplikacji od zera.

Najpierw czytaj pamięć projektu, potem kod, potem dopiero zmieniaj.

## Zasada minimalnego zakresu

Każde zadanie realizuj w zadanym zakresie.

Jeśli Damian zleca audyt panelu admina, nie przebudowuj koszyka. Jeśli zleca dokumentację pamięci, nie zmieniaj UI. Jeśli zleca jedną poprawkę, nie rób refaktoru całej aplikacji.

## Zasada fakt / decyzja / hipoteza

W każdym raporcie rozdziel:

- fakty,
- decyzje,
- hipotezy/propozycje,
- rzeczy do sprawdzenia.

Hipoteza ma być oznaczona jawnie:

`HIPOTEZA / PROPOZYCJA - nie wdrażać bez decyzji Damiana`

## Zasada ZIP + Obsidian

Jeśli generujesz paczkę ZIP, a zmiana dotyczy kierunku, etapu, testów, decyzji, guardów albo potwierdzeń Damiana, paczka musi zawierać:

- zmiany dla repo aplikacji,
- zmiany dla Obsidiana,
- raport AI,
- testy/guardy albo informację, że ich brak,
- jedno polecenie PowerShell do wdrożenia.

## Zasada testów

Po zmianach pamięci projektu uruchom:

```bash
node scripts/check-project-memory.cjs
npm run check:project-memory
```

Po zmianach kodu uruchom też:

```bash
npm run typecheck
npm run build
```

Jeśli komenda nie istnieje, zapisz to w raporcie. Nie udawaj przejścia.

## Zasada potwierdzeń Damiana

Jeśli Damian pisze, że coś działa, wygląda dobrze, jest sprawdzone albo że coś dalej nie działa, zapisz to w:

- `_project/11_USER_CONFIRMED_TESTS.md`,
- Obsidian: `07_POTWIERDZENIA DAMIANA - Sklep projekty domow.md`.

Wpis musi zawierać:

- datę,
- co sprawdzono,
- gdzie,
- wynik,
- czy istnieje guard,
- jeśli nie: `brak guardu - tylko test ręczny`.

## Zasada braku fikcyjnych ofert

Wygenerowane wcześniej wizualizacje i przykłady mogą być inspiracją/design lockiem, ale nie mogą być publikowane jako realne projekty domu.

Katalog produkcyjny ma pokazywać wyłącznie projekty realnie dodane przez admina i oznaczone jako aktywne/opublikowane.

## Zasada admina

Panel admina jest krytyczny, bo ma zastąpić ręczne grzebanie w kodzie.

Po każdej zmianie admina sprawdź minimum:

- logowanie,
- lista projektów,
- nowy projekt,
- edycja,
- zapis,
- anulowanie,
- status,
- usunięcie,
- ostrzeżenie przy aktywnym projekcie,
- powrót do listy.

## Zasada dodatku PDF e-mail

Dodatek `Projekt w formacie PDF na e-mail` za +250 zł nie może sugerować, że bez niego klient nie dostaje podstawowej dokumentacji, jeśli bazowy produkt zakłada dostawę cyfrową.

Interpretacja obowiązująca: dodatek jest dodatkową, wygodną formą dostarczenia/archiwizacji PDF na e-mail albo dodatkową kopią, a nie zastępstwem bazowej dostawy.

## Tryb ZIP i jedno polecenie PowerShell

ChatGPT / operator paczek nie pushuje sam, jeĹ›li Damian pracuje w trybie ZIP.

W takim trybie wynik pracy ma zawieraÄ‡:

- ZIP do pobrania,
- jedno kompletne polecenie PowerShell,
- wdroĹĽenie paczki,
- wymagane checki,
- commit,
- push do `origin main`.

Nie rozbijaj tego na kilka komend, chyba ĹĽe Damian wyraĹşnie poprosi o osobne kroki.

