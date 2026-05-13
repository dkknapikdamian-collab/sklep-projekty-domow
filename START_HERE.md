# START HERE — instrukcja dla developera

Najpierw przeczytaj:

1. `docs/00_PROJECT_BRIEF.md`
2. `docs/design/DESIGN_LOCK.md`
3. `docs/implementation/WORKING_RULES.md`
4. `docs/implementation/ROADMAP.md`
5. `docs/technical/DATA_MODEL.md`
6. `docs/technical/ORDER_PAYMENT_EMAIL_DELIVERY_FLOW.md`
7. `docs/technical/SEARCH_NORMALIZATION.md`

## Najważniejsze decyzje

- Wygląd z referencji jest wzorem i ma być zamrożony.
- HTML może być tylko prototypem kontrolnym, nie produkcją.
- Produkcja idzie w Next.js / React / TypeScript.
- Projekty nie mogą być wpisane na sztywno w komponentach.
- Każdy projekt ma stały kod, np. `DP-AUR-014`.
- Admin musi dodawać projekt, parametry, pomieszczenia, zdjęcia, rzuty, pliki PDF/ZIP, warianty i dodatki.
- Po zamówieniu musi powstać pełny rekord w bazie.
- Admin musi mieć listę „opłacone i niewysłane”.
- Po płatności system ma wysłać PDF/link albo oznaczyć zamówienie do ręcznej obsługi.
- Wyszukiwarka ma normalizować polskie znaki, metraże, wymiary działki i skróty.

## Pierwszy realny krok

Zbudować fundament aplikacji:
- Next.js / React / TypeScript,
- globalne design tokens,
- layout publiczny,
- karta projektu na danych demo,
- katalog na danych demo,
- koszyk na danych demo,
- dokumentacja design lock w repo.
