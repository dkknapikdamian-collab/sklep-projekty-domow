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
