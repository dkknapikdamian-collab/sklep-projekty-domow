# Etap 42A - Resend provider decision

Status: DECYZJA ZAPISANA / TEST AUTOMATYCZNY GUARD / BRAK ZMIAN RUNTIME
Data: 2026-05-18
Project ID: sklep_projekty_domow

## Scan-first

Źródła do przeczytania przed etapem:
- AGENTS.md
- _project/01_PROJECT_GOAL.md
- _project/15_ACTIVE_SOURCE_MAP.md
- _project/16_PRODUCTION_ROADMAP_AND_ACCEPTANCE.md
- docs/payments/
- Obsidian: 10_PROJEKTY/Sklep_projekty_domow/

## Decyzje Damiana

- Resend jako provider e-mail V1.1.
- Pliki projektowe nie idą jako załączniki.
- E-mail zawiera link do bezpiecznego panelu pobrania.
- Ręczny copy fallback zostaje jako awaryjna opcja.

## Testy automatyczne

- npm run verify:resend-provider-decision-v42a

## Test ręczny

BRAK TESTU RUNTIME - etap zapisuje decyzję, nie wysyła e-maili.

## Następny krok

Etap 42B - realna integracja Resend z email_outbox.
