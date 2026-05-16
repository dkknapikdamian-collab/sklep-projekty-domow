# Raport AI - Hotfix marker `Fakt` i zasada ZIP/jedno polecenie

Data: 2026-05-15 21:55 Europe/Warsaw  
Repo: `dkknapikdamian-collab/sklep-projekty-domow`  
Branch: `main`

## Powód

`npm run check:project-memory` zwrócił błąd:

```text
Project memory check failed:
- File AGENTS.md is missing marker: Fakt
```

## Diagnoza

Guard `scripts/check-project-memory.cjs` sprawdza marker `Fakt` z wielką pierwszą literą. `AGENTS.md` zawierał sekcję `FAKT / DECYZJA / HIPOTEZA / DO POTWIERDZENIA`, ale nie zawierał dokładnego tekstu `Fakt`.

## Zmiana

- Dodano dokładny marker zgodności guardu w `AGENTS.md`.
- Dopisano zasadę: ChatGPT/operator paczek ma przekazywać ZIP + jedno kompletne polecenie PowerShell i nie pushować sam.
- Dopisano tę zasadę także do `_project/02_WORK_RULES.md`.
- Zaktualizowano `_project/08_CHANGELOG_AI.md`.

## Testy wymagane

```powershell
npm run verify:admin-orders-v42
npm run typecheck
npm run build
npm run check:project-memory
```

## Zakres

To jest hotfix pamięci projektu i workflow. Nie zmienia funkcji sklepu.
