# Etap 34 - admin UX stability i testy do wykonania

Status: TEST RĘCZNY DO WYKONANIA / WSTĘPNIE DZIAŁA, DO POTWIERDZENIA.

## Dlaczego

Damian zgłosił, że po akcji w edycji projektu cała strona miga, wraca na górę i trzeba ponownie zjeżdżać w dół. Drugi problem: panel admina jest zbyt wąski na dużym ekranie.

## Testy ręczne do wykonania później

1. Scroll po akcji media:
   - wejść w `Admin -> Projekty -> Edytuj projekt testowy`,
   - zjechać do `Media publiczne`,
   - zmienić typ medium albo usunąć testowe medium,
   - potwierdzić, że po odświeżeniu admin wraca w okolice tej samej sekcji.

2. Scroll po akcji pliki prywatne:
   - zjechać do `Pliki prywatne`,
   - usunąć testowy plik prywatny,
   - potwierdzić, że strona nie wraca na górę.

3. Zamówienia:
   - wejść w `Admin -> Zamówienia`,
   - zmienić status zamówienia testowego,
   - potwierdzić wpis audit i brak uciążliwego skoku UX.

4. Checklisty:
   - na szczególe zamówienia zmienić checklistę realizacji,
   - potwierdzić wpis audit i brak uciążliwego skoku UX.

5. Szerokość panelu:
   - sprawdzić około 1366px, 1920px i szeroki monitor,
   - panel ma używać większej szerokości ekranu,
   - panel nie ma rozciągać treści w nieskończoność,
   - formularze mają pozostać czytelne.

6. Projekt testowy:
   - uruchomić SQL `supabase/manual/2026-05-17_etap34_seed_admin_test_project.sql`,
   - potwierdzić, że projekt `DP-TEST-034` jest w adminie,
   - potwierdzić, że ma status `draft`,
   - potwierdzić, że ma ładne zdjęcia testowe i nie jest realną ofertą publiczną.

## Guardy

- `npm run verify:admin-ux-stability-v34`

## Status ręczny

BRAK POTWIERDZONEGO TESTU RĘCZNEGO.
