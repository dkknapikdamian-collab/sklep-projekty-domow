# 06_GUARDS_AND_TESTS — guardy i testy

## Istniejące skrypty z `package.json`

Repo ma wiele guardów `verify:*` oraz główny skrypt:

```powershell
npm run verify
```

`npm run verify` uruchamia serię guardów, typecheck, check źródła danych i build.

Wykryte obszary guardów obejmują między innymi:

- brak legacy demo components,
- fundament Supabase,
- realne projekty admina,
- brak statycznych parametrów Supabase tam, gdzie nie powinny występować,
- politykę kodu projektu,
- opcje selectów w adminie,
- feature picker,
- server actions,
- stan formularza,
- zarządzanie projektami admina,
- przyciski admina,
- search/filter listy admina,
- CSS importy admina,
- zgodność edycji admina,
- publiczne dane projektu,
- filtry katalogu,
- treści strony głównej,
- status mojibake UI,
- nagłówek admina,
- widoczność mediów admina,
- debug admina,
- publiczny odczyt service role,
- renderowanie mediów projektu,
- redirect po zapisie admina,
- hero strony głównej,
- kontrolki mediów projektu.

## Nowy guard dodany w Etapie 0

```powershell
npm run check:project-memory
```

Uruchamia:

```powershell
node scripts/check-project-memory.cjs
```

## Co sprawdza `check-project-memory`

- Istnienie `AGENTS.md`.
- Istnienie wymaganych plików `_project`.
- Istnienie `_project/runs/.gitkeep`.
- Podstawowe odwołania w `AGENTS.md` do plików pamięci projektu.

## Czego nie sprawdza

- Nie sprawdza pełnej jakości treści dokumentów.
- Nie sprawdza runtime aplikacji.
- Nie sprawdza UI.
- Nie sprawdza Supabase.
- Nie zastępuje `npm run verify`.

## Kiedy aktualizować guardy

- Gdy zmienia się struktura `_project`.
- Gdy zmienia się lista obowiązkowych plików pamięci projektu.
- Gdy `AGENTS.md` dostaje nowe obowiązkowe sekcje.
- Gdy funkcja produktu zostaje usunięta albo zastąpiona i stary guard pilnuje już nieaktualnego zachowania.
