# Run report - Etap 31B V4 mojibake UTF-8 rescue

## Scan-first confirmation

- Repo: sklep-projekty-domow
- Branch: main
- Trigger: V3 stopped before push after partial local commit and dirty `_project`.
- Read evidence: user PowerShell log from V3.
- Active source of truth: repo for code/tests/_project, Obsidian for dashboard/status.

## FAKTY Z KODU / PLIKÓW

- Etap 31 direction is correct: checkout is a technical non-public order test without payment.
- Etap 31 introduced mojibake in user-facing Polish copy and project memory.
- V1/V2/V3 packages had PowerShell/package-process defects.
- V4 is a rescue package for the partial local state.

## DECYZJE DAMIANA

- Do not push by AI.
- Provide ZIP + one PowerShell command.
- Add the prevention rule to Obsidian and repo so every developer follows it.

## TESTY AUTOMATYCZNE

APPLY runs:
- node scripts/check-checkout-mojibake-v31b.cjs
- npm run verify:checkout-mojibake-v31b
- npm run verify:payment-direction-v48
- npm run typecheck
- npm run build
- npm run check:project-memory

## TESTY RĘCZNE

- TEST RĘCZNY DO WYKONANIA: open `/zamowienie` and confirm no mojibake in UI.

## WPŁYW NA OBSIDIANA

- Updates global AI instruction and Sklep project notes with the package-generation prevention rule.

## GIT / ZIP STATUS

- Delivery: ZIP + local PowerShell apply/commit/push.
- AI did not push this V4 package.
