# Etap 42D V4 - guard fix + production roadmap directions

Status: DO WDROĹ»ENIA / TEST AUTOMATYCZNY DO URUCHOMIENIA
Data: 2026-05-19
Project ID: sklep_projekty_domow

## PowĂłd

Etap 42D zostaĹ‚ wypchniÄ™ty, ale guard zgĹ‚osiĹ‚: manual copy fallback is collapsed = FAIL. V2/V3 miaĹ‚y bĹ‚Ä™dy skĹ‚adni patcherĂłw. V4 robi poprawkÄ™ bez JS regex/template stringĂłw.

## Zakres

- zwiniÄ™cie fallbacku rÄ™cznego kopiowania maili przez details/summary,
- dopisanie kierunkĂłw produkcyjnych do docs/product,
- aktualizacja _project i Obsidiana.

## Testy

- npm run verify:email-outbox-admin-visibility-v42d
- npm run verify:email-production-prep-v42c
- npm run verify:resend-runtime-v42b
- npm run typecheck

## Test rÄ™czny

TEST RÄCZNY DO WYKONANIA po deployu: /admin/zamowienia/[id], fallback rÄ™cznych wiadomoĹ›ci ma byÄ‡ zwiniÄ™ty.