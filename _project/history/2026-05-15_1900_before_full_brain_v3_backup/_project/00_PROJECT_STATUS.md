# 00_PROJECT_STATUS — status projektu

Ostatnia aktualizacja: 2026-05-14 21:20 Europe/Warsaw
Aktualizował: GPT-5.5 Thinking

## Nazwa projektu

`sklep-projekty-domow`

## Typ projektu

Aplikacja webowa / sklep-katalog projektów domów.

## Status projektu

Projekt w aktywnym rozwoju. Repo zawiera produkcyjny format strony sklepu z projektami domów, bez fikcyjnych aktywnych projektów.

## Aktualny etap

Etap 0: Utworzenie pamięci projektu / AI Working Contract.

## Charakter aplikacji

- Next.js / React / TypeScript.
- Sklep/katalog projektów domów.
- Dane projektów mają pochodzić z realnych danych, a nie z fikcyjnych ofert.
- Repo ma istniejące guardy `verify:*` oraz główny skrypt `npm run verify`.

## Główne aktywne obszary

- Strona główna.
- Katalog projektów.
- Dynamiczna karta projektu `/projekty/[slug]`.
- Koszyk.
- Checkout.
- Panel admina i zarządzanie projektami.
- Media projektów.
- Supabase / źródło danych.
- Guardy jakości i zgodności.

## Najważniejsze ryzyka

- Dodanie fikcyjnych aktywnych ofert jako produkcyjnych danych.
- Rozjazd między panelem admina, publicznym katalogiem i realnym źródłem danych.
- Martwe guardy po zmianach UI lub funkcji.
- Zbyt duże refaktory przy małych naprawach.
- Brak aktualizacji pamięci projektu po etapach.

## Nieustalone na podstawie repo

- Docelowy model płatności i pełna automatyzacja dostarczenia plików po zakupie wymagają dalszego doprecyzowania w kolejnych etapach.

<!-- SKLEP_PROJEKTY_DOMOW_MEMORY_V1_START -->
# Status projektu - Sklep z projektami domów

## Status operacyjny

Projekt aktywny.

To jest aplikacja/sklep do sprzedaży projektów domów. Repo aplikacji pozostaje źródłem kodu, a `_project/` jest pamięcią operacyjną projektu dla AI developerów, Codexa i ChatGPT.

## Aktualny typ projektu

Projekt kodowy / aplikacja sklepowa.

## Źródła prawdy

- Kod: repo aplikacji.
- Pamięć projektu: `AGENTS.md` + `_project/`.
- Mózg / dashboard dla Damiana: Obsidian `10_PROJEKTY/Sklep_projekty_domow/`.

## Aktualny etap pamięci

Wdrożenie pełnej pamięci projektu i synchronizacji z Obsidianem.

Ten etap nie zmienia UI, routingu ani logiki produktu.

## Status testów

- Guard pamięci projektu: `node scripts/check-project-memory.cjs` / `npm run check:project-memory`.
- Testy produktu nie są automatycznie uznawane za wykonane przez ten etap.
- Testy ręczne Damiana mają być zapisywane w `_project/11_USER_CONFIRMED_TESTS.md`.

## Krytyczna zasada

Nie zostawiać decyzji, potwierdzeń, nowych pomysłów i zmian kierunku tylko w czacie. Mają trafić do repo i Obsidiana.
<!-- SKLEP_PROJEKTY_DOMOW_MEMORY_V1_END -->

