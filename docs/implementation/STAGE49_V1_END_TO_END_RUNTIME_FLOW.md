# STAGE49 / Etap 24 wedlug czatu - pelny test produkcyjnej sciezki V1 end-to-end

Data: 2026-05-16

## Teza

Po audicie i copy trzeba przejsc caly przeplyw sklepu V1 bez dokladania nowych funkcji.

## Cel

Potwierdzic sciezke:

admin dodaje projekt -> projekt pojawia sie w katalogu -> karta sprzedaje -> koszyk liczy -> checkout tworzy zamowienie -> admin obsluguje -> audit zapisuje slady.

## Co wdrozono w tym patchu

- Dodano guard `scripts/check-v1-runtime-flow-markers-v49.cjs`.
- Dodano skrypt `npm run verify:v1-runtime-flow-markers-v49`.
- Wpieto guard na poczatek `npm run verify`.
- Poprawiono copy w `components/project/ProjectPurchaseBox.tsx`: karta projektu nie reklamuje juz platnosci online w V1.

## Co sprawdza guard V49

Guard statycznie pilnuje markerow dla:

- publicznego katalogu active-only,
- karty projektu,
- kodu projektu,
- ceny,
- mediow i komponentow szczegolu,
- wariantow,
- dodatku PDF e-mail,
- payloadu koszyka,
- liczenia koszyka,
- usuwania pozycji,
- zmiany dodatkow,
- walidacji checkoutu,
- czyszczenia koszyka po sukcesie,
- zapisu zamowienia,
- admina zamowien,
- pozycji zamowienia,
- dodatkow,
- plikow prywatnych po projekcie,
- instrukcji platnosci jako informacji operacyjnej,
- statusow realizacji: platnosc, PDF, ZIP, zamkniecie,
- audit logu admina.

## Granica guardu

Ten guard nie potwierdza runtime Supabase, realnego klikniecia UI ani realnego wpisu w `/admin/audit`.

Status testu recznego po tym patchu:

`TEST RECZNY DO WYKONANIA`

Etap nie jest produkcyjnie zamkniety bez potwierdzenia Damiana.

## Manualny test Damiana

1. Utworzyc projekt draft.
2. Uzupelnic wymagane dane: nazwe, slug, cene, metraz, pokoje, hero, thumbnail, minimum jeden rzut, wariant, dodatek PDF +250 zl, prywatny plik dokumentacji.
3. Sprawdzic blokade publikacji niekompletnego projektu.
4. Opublikowac kompletny projekt.
5. Sprawdzic katalog publiczny: tylko active.
6. Sprawdzic karte projektu: kod, cena, media, wariant, dodatek PDF.
7. Dodac do koszyka.
8. Sprawdzic liczenie bazy, wariantu i dodatkow.
9. Zmienic dodatki i usunac pozycje.
10. Przejsc checkout, sprawdzic walidacje danych i zgod.
11. Zlozyc zamowienie i potwierdzic wyczyszczenie koszyka.
12. Wejsc w admin zamowien.
13. Sprawdzic pozycje, dodatki, kwote i prywatne pliki.
14. Dodac instrukcje platnosci jako dane operacyjne.
15. Oznaczyc: platnosc, PDF, ZIP, zamkniecie.
16. Sprawdzic `/admin/audit` po operacjach admina.

## Ryzyka

- Bez runtime testu nie wiadomo, czy Supabase ma wszystkie rekordy i relacje potrzebne do testu.
- Guard statyczny moze potwierdzic markery, ale nie potwierdza realnego zapisu zamowienia.
- Istnieje konflikt numeracji: w repo sa juz wpisy Etap 24/25 dla innych napraw. Ten etap jest oznaczony jako STAGE49 / Etap 24 wedlug czatu, zeby nie nadpisywac historii.
