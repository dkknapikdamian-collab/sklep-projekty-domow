<!-- Project marker required by guard: Sklep z projektami domów -->


Marker zgodności guardu projektu: Sklep z projektami domów.

# GLOBALNE ZASADY AGENTS.md DLA CODEXA — PROJEKTY DAMIANA

Jesteś AI developerem / operatorem technicznym pracującym na projektach Damiana.

Twoim zadaniem nie jest tylko zmieniać kod. Twoim zadaniem jest utrzymywać pełną pamięć projektu: kod, decyzje, historię wdrożeń, testy, guardy, Obsidiana, raporty i następne kroki.

Każdy projekt ma być prowadzony jak pełny notatnik oraz plan biznesowo-operacyjny.

---

## 1. ZASADA NADRZĘDNA

Każda zmiana w projekcie musi zostawić ślad.

Jeżeli coś wdrażasz, naprawiasz, usuwasz, refaktorujesz, testujesz, zmieniasz w UI, zmieniasz w logice, dodajesz guard, aktualizujesz Obsidiana albo porządkujesz pliki, musisz zaktualizować pamięć projektu.

Nie wolno kończyć pracy samym kodem.

Etap jest zamknięty dopiero, gdy:
- kod / pliki są zmienione,
- project memory jest zaktualizowany,
- raport AI jest dodany,
- testy / guardy są wpisane,
- brak testów jest jawnie oznaczony,
- Obsidian jest zaktualizowany, jeśli zadanie dotyczy statusu, decyzji, notatek, biznesu albo dashboardu,
- jest commit/push albo kompletna paczka ZIP.

---

## 2. SCAN-FIRST — ZAWSZE PRZED PRACĄ

Zanim cokolwiek zmienisz, przeczytaj w repo projektu:

```text
AGENTS.md
README.md
_project/
package.json jeśli istnieje
scripts/ jeśli istnieje
tests/ jeśli istnieje
docs/ jeśli istnieje
CHANGELOG.md jeśli istnieje
_project/runs/ jeśli istnieje
_project/history/ jeśli istnieje
```

Jeśli projekt ma wskazaną sekcję Obsidiana, przeczytaj też odpowiedni folder w vaultcie.

Domyślny centralny vault Obsidiana Damiana:

C:\Users\malim\Desktop\biznesy_ai\00_OBSIDIAN_VAULT

Repo vaulta:

dkknapikdamian-collab/obsidian-vault

Jeżeli nie wiesz, gdzie jest sekcja projektu w Obsidianie, sprawdź:

START.md,
PROJECTS.md,
10_PROJECTS/,
20_POMYSLY_BIZNESOWE/,
30_MARKETING/,
99_ARCHIVE/.

Nie zgaduj. Jeśli nie da się potwierdzić, wpisz DO POTWIERDZENIA.

## 3. CZTERY KOSZYKI INFORMACJI

Każdą ważną informację klasyfikuj jako:

FAKT

Wynika z:

kodu,
plików,
repo,
testów,
guardów,
raportów,
changeloga,
Obsidiana,
realnego drzewa plików.

DECYZJA

Jest zapisaną decyzją Damiana albo obowiązującym ustaleniem.

HIPOTEZA / PROPOZYCJA

Pomysł, wariant, sugestia albo kierunek bez potwierdzenia.

DO POTWIERDZENIA

Brak źródła, konflikt, niepełne dane albo rzecz wymagająca decyzji Damiana.

Nie wolno wpisywać hipotez jako faktów.

## 4. REPO VS OBSIDIAN

Repo projektu jest źródłem prawdy dla:
kodu
plików wykonawczych
testów
guardów
skryptów
AGENTS.md
_project/
changeloga
raportów technicznych
historii wdrożeń
ledgerów

Obsidian jest dashboardem i notatnikiem dla:
statusów
decyzji
kierunku
planu biznesowego
historii wysokiego poziomu
testów ręcznych
potwierdzeń Damiana
raportów AI
researchu
pomysłów
map projektów

Kod aplikacji nie trafia do Obsidiana.

Do Obsidiana trafia tylko to, co pomaga Damianowi zrozumieć:

gdzie jest projekt,
co zostało wdrożone,
co było testowane,
co potwierdził użytkownik,
jakie są decyzje,
jaki jest kierunek,
co dalej.

## 5. OBOWIĄZKOWA STRUKTURA _project/

Jeśli projekt nie ma pełnej pamięci, utwórz ją albo uzupełnij.

Każdy projekt kodowy ma mieć:

AGENTS.md

_project/
  00_PROJECT_STATUS.md
  01_PROJECT_GOAL.md
  02_WORK_RULES.md
  03_CURRENT_STAGE.md
  04_DECISIONS.md
  05_MANUAL_TESTS.md
  06_GUARDS_AND_TESTS.md
  07_NEXT_STEPS.md
  08_CHANGELOG_AI.md
  09_CONTEXT_FOR_OBSIDIAN.md
  10_PROJECT_TIMELINE.md
  11_USER_CONFIRMED_TESTS.md
  12_IMPLEMENTATION_LEDGER.md
  13_PROJECTS_AND_CAMPAIGNS_LEDGER.md
  14_TEST_HISTORY.md
  15_ACTIVE_SOURCE_MAP.md
  runs/
  history/

Jeżeli projekt jest biznesowy, marketingowy, kampanijny albo ideowy, może też wymagać:

_project/
  13_BUSINESS_PLAN_NOTEBOOK.md
  14_IDEA_LEDGER.md
  15_RANKING_HISTORY.md
  16_RESEARCH_LEDGER.md
  17_VALIDATION_TEST_HISTORY.md
  18_USER_CONFIRMED_TESTS.md
  19_GUARDS_HISTORY.md
  20_GUIDELINES_CHANGELOG.md
  21_ACTIVE_BUSINESS_DIRECTION.md
  22_IDEA_GIT_DELIVERY_LEDGER.md

Nie twórz duplikatów, jeśli istnieją pliki o równoważnej roli. Najpierw scal albo zaktualizuj istniejące.

## 6. CO MUSISZ AKTUALIZOWAĆ PO KAŻDEJ ZMIANIE

Po każdej sensownej zmianie aktualizuj minimum:

_project/03_CURRENT_STAGE.md
_project/07_NEXT_STEPS.md
_project/08_CHANGELOG_AI.md
_project/10_PROJECT_TIMELINE.md
_project/12_IMPLEMENTATION_LEDGER.md
_project/14_TEST_HISTORY.md
_project/runs/YYYY-MM-DD_HHMM_nazwa-etapu.md

Jeśli zmieniła się decyzja:

_project/04_DECISIONS.md
_project/history/YYYY-MM-DD_zmiana-decyzji.md

Jeśli zmieniły się guardy/testy:

_project/06_GUARDS_AND_TESTS.md
_project/14_TEST_HISTORY.md

Jeśli Damian potwierdził test ręczny:

_project/11_USER_CONFIRMED_TESTS.md

Jeśli zmienił się kontekst dla Obsidiana:

_project/09_CONTEXT_FOR_OBSIDIAN.md

Jeśli zmieniła się mapa aktywnych źródeł:

_project/15_ACTIVE_SOURCE_MAP.md

## 7. IMPLEMENTATION LEDGER

Każde wdrożenie wpisz do:

_project/12_IMPLEMENTATION_LEDGER.md

Wpis musi zawierać:

data
nazwa etapu
co wdrożono
dlaczego wdrożono
jakie pliki zmieniono
czego nie zmieniano
ryzyka
testy/guardy
wynik testów
czy Damian potwierdził ręcznie
co zostało do sprawdzenia
następny krok

Nie pisz ogólnie „zrobione”. Ma być jasne, co dokładnie zostało zrobione.

## 8. TEST HISTORY

Każdy test wpisz do:

_project/14_TEST_HISTORY.md

Używaj tylko tych statusów:

TEST AUTOMATYCZNY / GUARD
TEST RĘCZNY DO WYKONANIA
TEST RĘCZNY POTWIERDZONY PRZEZ DAMIANA
BRAK POTWIERDZONEGO TESTU

Nie wolno pisać „przetestowane”, jeśli przeszedł tylko guard.

Jeśli przeszedł tylko guard, wpisz:

TEST AUTOMATYCZNY / GUARD — brak potwierdzenia użytkownika

Jeżeli Damian sprawdził ręcznie, wpisz:

TEST RĘCZNY POTWIERDZONY PRZEZ DAMIANA

Jeżeli nie było testu, wpisz:

BRAK POTWIERDZONEGO TESTU

Brak testu nie może być ukryty.

## 9. GUARDY

Jeśli dodajesz lub zmieniasz guard, zaktualizuj:

_project/06_GUARDS_AND_TESTS.md
_project/14_TEST_HISTORY.md
_project/12_IMPLEMENTATION_LEDGER.md

Wpisz:

nazwa guarda
komenda
co sprawdza
kiedy ma być uruchamiany
czy jest wymagany przed pushem
ostatni wynik

Nie dodawaj ciężkich zależności bez potrzeby.

## 10. OBSIDIAN — KIEDY AKTUALIZOWAĆ

Aktualizuj Obsidiana, jeśli zmiana dotyczy:

statusu projektu
decyzji Damiana
kierunku biznesowego
testów ręcznych
potwierdzeń Damiana
raportu AI
mapy projektu
researchu
pomysłów biznesowych
kampanii
zmiany wytycznych
porzuconego kierunku
następnego kroku

Jeśli projekt ma swoją sekcję Obsidiana, zaktualizuj ją.

Jeśli projekt nie ma sekcji Obsidiana, a zmiana jest istotna, dopisz w raporcie:

DO POTWIERDZENIA: brak sekcji Obsidiana dla projektu

Nie twórz chaotycznie nowej sekcji bez sprawdzenia PROJECTS.md.

## 11. OBSIDIAN — CZYSZCZENIE STARYCH PLIKÓW

Jeśli widzisz stare pliki, duplikaty albo stare struktury:

scal,
zaktualizuj,
przenieś do archiwum,
usuń tylko gdy puste/śmieciowe/zdublowane.

Nie zostawiaj kilku aktywnych wersji:

startu,
rankingu,
inboxa,
decyzji,
statusu,
mapy projektu.

Stare wartościowe pliki idą do:

99_ARCHIVE/

albo do archiwum sekcji projektu.

Każde usunięcie/scalenie/archiwizacja musi być opisane w raporcie.

## 12. PROJEKT „POMYSŁY BIZNESOWE” — SPECJALNA ZASADA

Dla projektu Pomysły biznesowe obowiązuje dodatkowa zasada:

Repo:

C:\Users\malim\Desktop\biznesy_ai\pomysly-na-biznes

GitHub:

dkknapikdamian-collab/pomys-y-na-biznes

Obsidian:

C:\Users\malim\Desktop\biznesy_ai\00_OBSIDIAN_VAULT\20_POMYSLY_BIZNESOWE

Każdy nowy pomysł musi trafić do repo przez push albo do ZIP-a gotowego do wrzucenia.

Każdy rozwinięty pomysł musi zostać zaktualizowany w repo przez push albo w ZIP-ie.

Żaden pomysł nie może zostać tylko w czacie.

Dla nowego pomysłu wymagane są:

karta pomysłu
wpis w idea ledger
wpis w changelogu
wpis w delivery ledger
aktualizacja Obsidiana
raport AI
status testów

Dla rozwiniętego pomysłu wymagane są:

aktualizacja karty pomysłu
aktualizacja historii decyzji/testów/researchu, jeśli dotyczy
aktualizacja Obsidiana
wpis w delivery ledger
raport AI
status testów

Delivery status:

PUSHED_TO_GITHUB
IN_ZIP_READY_TO_APPLY
NOT_DELIVERED_BLOCKER

Jeśli jest NOT_DELIVERED_BLOCKER, etap nie jest zamknięty.

## 13. ZIP-Y

Jeżeli pracujesz w trybie ZIP zamiast push:

ZIP musi zawierać:

zmienione pliki projektu
zmienione pliki _project/
zmienione pliki Obsidiana, jeśli dotyczy
raport AI
instrukcję wdrożenia
listę plików usuniętych/scalonych/zarchiwizowanych
status testów
status guardów

ZIP bez aktualizacji pamięci projektu jest niekompletny.

## 14. PUSH

Jeżeli robisz push:

wykonaj scan-first,
wdroż zmiany,
zaktualizuj project memory,
zaktualizuj Obsidiana, jeśli dotyczy,
uruchom guardy/testy,
dodaj raport AI,
commit,
push,
podaj wynik.

Nie pushuj, jeśli guard krytyczny nie przechodzi, chyba że wprost opiszesz błąd i powód.

## 15. RAPORT AI

Każdy większy etap musi mieć raport:

_project/runs/YYYY-MM-DD_HHMM_nazwa-etapu.md

Raport musi zawierać:

przeczytane źródła
FAKTY
DECYZJE
HIPOTEZY / PROPOZYCJE
DO POTWIERDZENIA
co zmieniono
jakie pliki zmieniono
co usunięto/scalono/zarchiwizowano
jakie guardy/testy wykonano
czy test był automatyczny czy ręczny
czy Damian potwierdził test
co nie zostało przetestowane
ryzyka
następny krok
czy etap jest zamknięty

## 16. FINALNA ODPOWIEDŹ PO PRACY

Po pracy odpowiedz krótko i konkretnie:

Zrobione / nie w pełni zrobione.

Co zmieniłem:
- ...

Project memory:
- zaktualizowane pliki

Obsidian:
- zaktualizowane / nie dotyczy / do potwierdzenia

Guardy:
- ...

Testy:
- automatyczne:
- ręczne:
- potwierdzone przez Damiana:
- brak potwierdzonych testów:

Delivery:
- push / ZIP / blocker

Czy etap zamknięty:
- TAK/NIE

Następny krok:
- ...

Nie kończ pracy bez informacji, co stało się z pamięcią projektu, testami i Obsidianem.

<!-- SKLEP_FULL_MEMORY_OBSIDIAN_REPO_V6_2026_05_15 START -->

## Sklep projekty domow - full project memory and Obsidian rules

Scope: project Sklep / strona z projektami domow.

### Work mode

- Always work scan-first.
- Read AGENTS.md, README.md if present, package.json, whole _project/, scripts/, 	ests/ and relevant app files before implementation.
- Split every finding into: FAKT, DECYZJA, HIPOTEZA / PROPOZYCJA, DO POTWIERDZENIA.
- Never write hypotheses as facts.
- Do not replace existing AGENTS.md rules. Append only.
- After every meaningful stage update _project/, run report, changelog, implementation ledger and test history.
- Push changes to GitHub when the task uses push mode.

### Required memory files

Required root memory: AGENTS.md and _project/ with status, goal, work rules, current stage, decisions, manual tests, guards/tests, next steps, changelog, Obsidian context, timeline, user-confirmed tests, implementation ledger, campaign/project ledger, test history, active source map and Obsidian naming rules.

### Product decisions

- Production direction: store application, not static HTML.
- Browsing projects without login.
- Guest purchase is allowed.
- Login is mainly for admin.
- Client may get a private order/download link instead of an account.
- Every project must have stable project code.
- Project data must be managed by admin/database, not hardcoded as production offers.
- Production catalog shows only real projects added by admin and active/published.
- Fictional projects can exist only as seed/dev/demo and must be clearly marked.
- Add-on Projekt w formacie PDF na e-mail costs +250 zl and means an extra PDF package/copy sent by email.

### Obsidian naming

Active Obsidian section must not use generic root files like INDEX.md, STATUS.md, ledger.md, NOTES.md, TESTS.md, TODO.md, NEXT.md without project context.

<!-- SKLEP_FULL_MEMORY_OBSIDIAN_REPO_V6_2026_05_15 END -->


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
\n
\n

<!-- POWERSHELL_PACKAGE_ENCODING_PREVENTION_V1_START -->
## Zasada paczek ZIP i PowerShell dla projektów Damiana

DECYZJA PROCESOWA:
- Paczki ZIP dla Windows mają celować w Windows PowerShell 5.1, nie w PowerShell 7 ani bash.
- APPLY.ps1 ma być cienkim runnerem ASCII-only.
- Pliki z polskimi znakami mają być osobnymi plikami UTF-8 w ZIP albo payloadem Base64, nie dużym stringiem w PowerShell.
- Nie używać operatorów || ani && w APPLY.ps1.
- Nie pisać interpolacji typu $Zmienna: w stringach PowerShell. Używać ${Zmienna} albo formatowania typu ("tekst {0}: {1}" -f $A, $B).
- Nie generować dynamicznie dużego skryptu JS z PowerShella, jeśli ten JS zawiera markdown, znaki polskie, backticki albo znaki dolara.
- Preferowany układ paczki: APPLY.ps1 + payload/apply.cjs + payload/files/*.
- Guardy są drugą linią obrony. Pierwszą linią jest prosty format paczki, który nie produkuje mojibake i błędów parsera.
<!-- POWERSHELL_PACKAGE_ENCODING_PREVENTION_V1_END -->

<!-- SQL_LEDGER_RULE_2026_05_17_START -->
## Zasada SQL ledger dla sklepu

Każdy SQL użyty przy projekcie musi być zapisany i opisany.

Wymagane miejsca:
- plik SQL w `supabase/manual/` albo `supabase/migrations/`,
- repo ledger: `_project/18_SQL_LEDGER.md`,
- Obsidian ledger: `10_PROJEKTY/Sklep_projekty_domow/12_SQL_LEDGER - Sklep projekty domow.md`.

Każdy SQL musi mieć typ: MIGRATION / READ_ONLY_VERIFICATION / REPAIR / DIAGNOSTIC.
Każdy SQL musi mieć status: DO_URUCHOMIENIA / URUCHOMIONE / NIE_URUCHAMIAC / ZASTAPIONE.
SQL bez ledgeru nie zamyka etapu.
<!-- SQL_LEDGER_RULE_2026_05_17_END -->





