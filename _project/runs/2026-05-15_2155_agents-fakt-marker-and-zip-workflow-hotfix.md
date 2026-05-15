# Raport AI - Hotfix marker `Fakt` i zasada ZIP/jedno polecenie

Data: 2026-05-15 21:55 Europe/Warsaw  
Repo: `dkknapikdamian-collab/sklep-projekty-domow`  
Branch: `main`

## PowĂłd

`npm run check:project-memory` zwrĂłciĹ‚ bĹ‚Ä…d:

```text
Project memory check failed:
- File AGENTS.md is missing marker: Fakt
```

## Diagnoza

Guard `scripts/check-project-memory.cjs` sprawdza marker `Fakt` z wielkÄ… pierwszÄ… literÄ…. `AGENTS.md` zawieraĹ‚ sekcjÄ™ `FAKT / DECYZJA / HIPOTEZA / DO POTWIERDZENIA`, ale nie zawieraĹ‚ dokĹ‚adnego tekstu `Fakt`.

## Zmiana

- Dodano dokĹ‚adny marker zgodnoĹ›ci guardu w `AGENTS.md`.
- Dopisano zasadÄ™: ChatGPT/operator paczek ma przekazywaÄ‡ ZIP + jedno kompletne polecenie PowerShell i nie pushowaÄ‡ sam.
- Dopisano tÄ™ zasadÄ™ takĹĽe do `_project/02_WORK_RULES.md`.
- Zaktualizowano `_project/08_CHANGELOG_AI.md`.

## Testy wymagane

```powershell
npm run verify:admin-orders-v42
npm run typecheck
npm run build
npm run check:project-memory
```

## Zakres

To jest hotfix pamiÄ™ci projektu i workflow. Nie zmienia funkcji sklepu.
