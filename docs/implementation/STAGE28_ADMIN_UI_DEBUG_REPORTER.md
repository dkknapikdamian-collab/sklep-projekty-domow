# STAGE28_ADMIN_UI_DEBUG_REPORTER

Cel: dodac w panelu admina narzedzie do szybkiego zglaszania problemow UI bez grzebania w konsoli.

Zasada dzialania:
- plywajacy przycisk `Debug` wlacza tryb przechwytywania klikniec,
- klikniecie elementu zatrzymuje jego domyslna akcje,
- system zapisuje selektor, trase strony, viewport, tekst elementu, klasy i polozenie,
- uzytkownik wpisuje opis problemu,
- Enter zapisuje wpis,
- `Pobierz raport i wyczysc` pobiera Markdown i czysci localStorage.

Dane sa trzymane lokalnie w przegladarce, nie w Supabase.
