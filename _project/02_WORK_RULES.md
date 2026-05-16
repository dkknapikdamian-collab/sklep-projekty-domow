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

ChatGPT / operator paczek nie pushuje sam, jeśli Damian pracuje w trybie ZIP.

W takim trybie wynik pracy ma zawierać:

- ZIP do pobrania,
- jedno kompletne polecenie PowerShell,
- wdrożenie paczki,
- wymagane checki,
- commit,
- push do `origin main`.

Nie rozbijaj tego na kilka komend, chyba że Damian wyraźnie poprosi o osobne kroki.


<!-- ZIP_PUSH_ONLY_RULE_2026_05_16 -->
## Zasada pracy: ZIP + polecenie push, bez samodzielnego pushu AI

DECYZJA DAMIANA:
- AI nie ma samodzielnie pchac zmian do repo.
- Domyslny tryb pracy: paczka ZIP + jedno polecenie PowerShell, ktore aplikuje zmiany, uruchamia testy/guardy, robi commit i push dopiero po stronie Damiana.
- Wyjatek: AI moze pushowac tylko wtedy, gdy Damian jawnie zdecyduje inaczej.
<!-- ZIP_PUSH_ONLY_RULE_2026_05_16 -->

<!-- ZIP_PUSH_ONLY_RULE_2026_05_16_START -->
## Zasada pracy ZIP + polecenie push

DECYZJA DAMIANA / GLOBALNA DLA TEGO PROJEKTU:
- AI nie pcha zmian samodzielnie do repo.
- Domyślny tryb dostarczenia zmian: ZIP + jedno polecenie PowerShell do apply/test/commit/push.
- Push wykonuje Damian lokalnie przez polecenie z paczki albo AI tylko po wyraźnej decyzji Damiana w danej wiadomości.
- Każda paczka musi zawierać aktualizację repo, _project i Obsidiana.
<!-- ZIP_PUSH_ONLY_RULE_2026_05_16_END -->

<!-- POWERSHELL_PACKAGE_ENCODING_PREVENTION_V1_START -->
## Zasada prewencji: paczki PowerShell i UTF-8

Status: OBOWIĄZKOWE DLA KAŻDEGO AI-DEVELOPERA / OPERATORA PACZEK.
Data: 2026-05-16.

Przyczyna błędów z Etapu 31B:
- PowerShell parsuje zapis `"$Label: $Path"` jako niepoprawną referencję zmiennej, bo dwukropek po nazwie zmiennej ma znaczenie specjalne.
- Surowe polskie znaki w generowanych `.ps1` i blokach markdown mogą przejść przez złe kodowanie i stworzyć mojibake typu `Ă`, `Ĺ`, `Ä`.

Zasada wykonawcza:
1. APPLY `.ps1` ma być ASCII-only, jeśli jest generowany przez AI.
2. Treści z polskimi znakami mają być zapisywane jako Base64 UTF-8 i dekodowane do plików przez `.NET UTF8Encoding(false)` albo `WriteAllBytes`.
3. Nie wolno pisać w PowerShellu interpolacji zmiennej bezpośrednio przed dwukropkiem: `"$Label: ..."`.
4. Zamiast tego używać `("Brak {0}: {1}" -f $Label, $Path)` albo `${Label}`.
5. Paczka ma być składana tak, żeby treść użytkowa była payloadem danych, a skrypt był cienkim, prostym loaderem.
6. Przed oddaniem paczki operator ma sprawdzić tekst skryptu pod kątem wzorca `$zmienna:` oraz surowych polskich znaków w `.ps1`.
7. Ta zasada nie zastępuje testów, ale usuwa główną przyczynę powstawania błędu na etapie generowania paczki.

W~iosek:
- Guard jest tylko siatką bezpieczeństwa.
- Realna prewencja to standard generowania paczek: ASCII-only APPLY + Base64 UTF-8 payload + brak ryzykownej interpolacji PowerShell.
<!-- POWERSHELL_PACKAGE_ENCODING_PREVENTION_V1_END -->

