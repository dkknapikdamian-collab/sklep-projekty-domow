# Run report - Etap 31B V7 mojibake UTF-8 fix

## Cel
- Domknąć przerwany Etap 31B po błędach generatora paczek V1-V6.
- Naprawić polskie znaki w aktywnym checkoutcie i guardach.
- Utrwalić zasadę paczek Windows PowerShell 5.1.

## FAKTY Z KODU / PLIKÓW
- Etap 31 wprowadził poprawny kierunek produktu, ale poprzednie paczki uszkodziły UTF-8.
- V7 używa prostego układu: APPLY.ps1 + payload/apply-v7.cjs + payload/files/*.

## TESTY AUTOMATYCZNE / GUARDY
- npm run verify:payment-direction-v48
- npm run verify:checkout-mojibake-v31b
- npm run typecheck
- npm run build
- npm run check:project-memory

## TEST RĘCZNY
- TEST RĘCZNY DO WYKONANIA: /zamowienie w przeglądarce.

## WPŁYW NA OBSIDIANA
- Dodano zasadę paczek PowerShell/UTF-8 do instrukcji Obsidiana i notatek projektu Sklep.

## GIT / ZIP STATUS
- Dostarczenie: ZIP V7 + lokalne polecenie PowerShell. Push wykonuje Damian lokalnie.
