# SKLEP PROJEKTY DOMOW — AKTYWNA MAPA I PROCES OBSIDIANA — FINAL V1

Ten plik jest JEDYNYM aktywnym source file dla przestrzeni ChatGPT:
Sklep / projekty domow.

Nie trzymaj aktywnie starych ZIP-ow, logow, raportow i polecen. Repo i Obsidian sa sejfem. Ten plik jest mapa dla czatu.

## 1. Projekt

Nazwa:
Sklep / strona z projektami domow / sklep-projekty-domow

Cel:
aplikacja sklepowa do prezentacji i sprzedazy realnych projektow domow.

To nie jest luzna makieta HTML.
To nie jest katalog fikcyjnych wizualizacji.
To ma byc realny sklep: katalog, karta projektu, koszyk, zamowienie/checkout, panel admina, baza danych, storage plikow i reczny workflow V1.

## 2. Repo aplikacji

GitHub:
`dkknapikdamian-collab/sklep-projekty-domow`

Branch:
`main`

Lokalnie:
`C:\Users\malim\Desktop\biznesy_ai\strony\strona z projektami`

## 3. Obsidian

Vault:
`C:\Users\malim\Desktop\biznesy_ai\00_OBSIDIAN_VAULT`

Repo vaulta:
`dkknapikdamian-collab/obsidian-vault`

Branch vaulta:
`main`

Kanoniczna sekcja:
`10_PROJEKTY/Sklep_projekty_domow/`

Dashboard:
`10_PROJEKTY/Sklep_projekty_domow/00_START - Sklep projekty domow.md`

## 4. Zrodla prawdy

Repo aplikacji jest zrodlem prawdy dla:
- kodu,
- UI,
- routingu,
- logiki,
- testow automatycznych,
- guardow,
- skryptow,
- `_project/`,
- raportow run,
- technicznej historii wdrozen.

Obsidian jest zrodlem prawdy dla:
- dashboardu,
- kierunku projektu,
- decyzji,
- statusu wysokiego poziomu,
- testow recznych,
- potwierdzen Damiana,
- ryzyk,
- next steps,
- historii wysokiego poziomu.

Chat jest miejscem pracy operacyjnej.
Chat nie jest koncowym zrodlem prawdy.

## 5. Kierunek aplikacji

Przed kazdym etapem czytaj:
`_project/01_PROJECT_GOAL.md`

Podstawowy kierunek:
- sprzedaz realnych projektow domow,
- publiczna strona glowna,
- publiczny katalog,
- karta projektu jako ekran sprzedazowy,
- koszyk,
- checkout / zamowienie,
- zakup jako gosc,
- panel admina,
- stale kody projektow,
- publiczne media,
- prywatne pliki zakupowe,
- guardy/regresje dla krytycznych sciezek.

Poza zakresem bez osobnej decyzji:
- duzy refaktor,
- zmiana routingu,
- produkcyjne platnosci online, jesli nie zlecone,
- panel klienta,
- faktury,
- automatyczna wysylka,
- fikcyjne projekty jako realne oferty,
- generowanie projektow AI jako realnych ofert.

Jesli zmiana nie pasuje do V1, wpisz `DO POTWIERDZENIA` i nie wdrazaj bez decyzji Damiana.

## 6. Obowiazkowe czytanie przed etapem

Repo:
- `AGENTS.md`
- `_project/01_PROJECT_GOAL.md`
- `_project/03_CURRENT_STAGE.md`
- `_project/05_MANUAL_TESTS.md`
- `_project/06_GUARDS_AND_TESTS.md`
- `_project/07_NEXT_STEPS.md`
- `_project/08_CHANGELOG_AI.md`
- `_project/10_PROJECT_TIMELINE.md`
- `_project/11_USER_CONFIRMED_TESTS.md`
- `_project/12_IMPLEMENTATION_LEDGER.md`
- `_project/14_TEST_HISTORY.md`
- `_project/15_ACTIVE_SOURCE_MAP.md`
- najnowsze `_project/runs/`
- `package.json`
- `scripts/`
- `docs/`
- wlasciwe pliki kodu dotykane zmiana.

Obsidian:
- `START.md`
- `00_START_TUTAJ.md`
- `PROJECTS.md`
- `00_INSTRUKCJA_OBSIDIAN_DLA_AI.md`
- `10_PROJEKTY/Sklep_projekty_domow/00_START - Sklep projekty domow.md`
- powiazane notatki w `10_PROJEKTY/Sklep_projekty_domow/`.

## 7. Dowod skanu

Kazdy etap ma miec raport run z:
- metoda skanu,
- foldery znalezione,
- foldery brakujace,
- pliki repo przeczytane,
- pliki `_project/` przeczytane,
- notatki Obsidiana przeczytane,
- mapa zrodel prawdy,
- konflikty miedzy repo, Obsidianem i czatem.

Bez dowodu skanu etap jest niewazny.

## 8. Obsidian jako obowiazkowa paczka etapu

Kazdy wdrozony etap musi zawierac aktualizacje Obsidiana.

Tryb ZIP:
- ZIP musi miec pliki aktualizacji Obsidiana.

Tryb PUSH:
- musi byc commit/push do repo Obsidiana albo jawny `SKIP` z powodem.

Jesli Obsidian nie jest zaktualizowany i nie ma plikow Obsidiana w ZIP-ie, etap jest niewazny.

Do Obsidiana trafia:
- co wdrozono,
- po co,
- decyzje,
- kierunek,
- testy reczne,
- potwierdzenia Damiana,
- ryzyka,
- next steps,
- historia wysokiego poziomu.

Kod aplikacji nie trafia do Obsidiana.

## 9. Testy i guardy

Kazda nowa funkcja, zmiana admina, zmiana zamowien, zmiana katalogu, zmiana koszyka, zmiana checkoutu, zmiana mediow, zmiana prywatnych plikow albo naprawa regresji musi miec:

- test automatyczny albo guard,
- albo jawny wpis `BRAK DEDYKOWANEGO TESTU / GUARDU` z powodem i ryzykiem,
- wpis w `_project/06_GUARDS_AND_TESTS.md`,
- wpis w `_project/14_TEST_HISTORY.md`,
- wpis w raporcie run,
- wpis w Obsidianie, jesli dotyczy uzytkownika/admina/kierunku/testu recznego.

Nie wolno pisac „przetestowane”, jesli byl tylko build albo typecheck.

## 10. Test reczny Damiana

Kazda zmiana widoczna dla uzytkownika/admina ma miec status:

- `TEST RĘCZNY POTWIERDZONY PRZEZ DAMIANA`
- `TEST RĘCZNY DO WYKONANIA`
- `BRAK POTWIERDZONEGO TESTU RĘCZNEGO`

Nie wolno zgadywac potwierdzenia Damiana.

## 11. Raport run

Kazdy raport run ma zawierac:

- FAKTY Z KODU / PLIKOW
- DECYZJE DAMIANA
- HIPOTEZY / PROPOZYCJE AI
- DO POTWIERDZENIA
- TESTY AUTOMATYCZNE
- GUARDY
- TESTY RĘCZNE
- POTWIERDZENIA DAMIANA
- BRAKI I RYZYKA
- WPŁYW NA OBSIDIANA
- WPŁYW NA KIERUNEK ROZWOJU
- NASTĘPNY KROK
- GIT / ZIP STATUS

## 12. Push / ZIP

Tryb PUSH:
- commit/push repo aplikacji na `main`,
- commit/push repo Obsidiana na `main`,
- albo jawny `SKIP` z powodem,
- `git status` po pracy dla obu repo.

Tryb ZIP:
- ZIP ma miec zmiany repo,
- zmiany `_project/`,
- pliki Obsidiana,
- raport run,
- wyniki testow/guardow,
- instrukcje wdrozenia.

## 13. Czego nie kasowac teraz

Nie kasuj:
- `AGENTS.md`,
- `_project/`,
- `10_PROJEKTY/Sklep_projekty_domow/`,
- starych `10_PROJECTS/`,
- starych `INDEX.md`,
- raportow historii,
- starych stage notes.

Najpierw sprawdz, czy zawieraja decyzje/testy/potwierdzenia.
Potem scal albo archiwizuj.

## 14. Co trzymac w ChatGPT source files

Aktywnie trzymac tylko ten plik:
`SKLEP_PROJEKTY_DOMOW__AKTYWNA_MAPA_I_PROCES_OBSIDIAN_FINAL_V1.md`

Nie trzymac aktywnie:
- ZIP-ow,
- logow PowerShell,
- paczek wdrozeniowych,
- wielu wersji polecen,
- pojedynczych raportow run,
- luznych plikow `_project/`.

## 15. Aktualny kierunek najblizszej pracy

Najblizszy znany kierunek:
domknac audit log / runtime test admina.

W szczegolnosci:
- sprawdzic `/admin/audit` po realnych operacjach admina,
- potwierdzic wpisy audit logu,
- uzupelnic braki w guardach/testach,
- zapisac wynik w `_project/` i Obsidianie.

Nie wymyslac nowego kierunku przed uporzadkowaniem tego stanu.
