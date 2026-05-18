# Etap 41B - fulfillment readiness retry

Status: WDROŻONE LOKALNIE / DO REVIEW
Data: 2026-05-18
Project ID: sklep_projekty_domow

## Scan-first

Wymagane źródła przed etapem:
- `AGENTS.md`,
- `_project/01_PROJECT_GOAL.md`,
- `_project/15_ACTIVE_SOURCE_MAP.md`,
- `_project/16_PRODUCTION_ROADMAP_AND_ACCEPTANCE.md`,
- Obsidian roadmapa produkcyjna.

## Zakres

- Admin order detail pokazuje readiness automatycznego dostępu.
- Widoczne są brakujące typy plików.
- Widoczne są runtime statusy paid/access/outbox.
- Dodano retry po uzupełnieniu plików.
- Daty admina formatowane w Europe/Warsaw.

## Testy automatyczne

- `npm run verify:fulfillment-readiness-v41b`
- `npm run verify:email-outbox-v41a`
- `npm run typecheck`

## Test ręczny

TEST RĘCZNY DO WYKONANIA.

## Następny krok

Po potwierdzeniu retry i `project_files_access=queued`, następny etap: realny provider e-mail albo dalsze admin visibility, zależnie od testów.
