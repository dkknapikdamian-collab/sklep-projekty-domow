# 16_PRODUCTION_READINESS_CHECKLIST - Etap 29 pre-release V1

Data: 2026-05-16
Status dokumentu: AKTYWNY CHECKLIST / DO WYKONANIA PO ETAPACH 22-28

## Teza

Dopiero po etapach 22-28 robimy finalna checklistę pre-release V1.

Ten etap nie wdraża płatności, automatycznej wysyłki, faktur ani panelu klienta. Ten etap sprawdza, czy aktualny stan V1 nadaje się do testowej sprzedaży realnego projektu domu bez udawania funkcji, których jeszcze nie ma.

## Kryterium końcowe

Można powiedzieć: V1 jest gotowe do testowej sprzedaży realnego projektu, bez udawania automatyzacji, której jeszcze nie ma.

Tylko jeżeli checklist nie ma statusu BLOKADA i test ręczny Damiana jest zapisany albo jawnie oznaczony jako brak potwierdzenia.

## Dozwolone statusy

- OK
- BLOKADA
- DO POTWIERDZENIA
- NIE DOTYCZY V1

## Checklist pre-release V1

| Obszar | Status | Dowód / co sprawdzić | Uwagi |
|---|---|---|---|
| Env Supabase ustawiony | DO POTWIERDZENIA | Sprawdzić env lokalny/Vercel/Supabase po etapach 22-28 | Nie wpisywać OK bez realnego sprawdzenia. |
| Service role tylko server-side | DO POTWIERDZENIA | Guardy i przegląd kodu Supabase | Publiczny kod nie może używać service role. |
| Public media bucket działa | DO POTWIERDZENIA | Publiczne media projektu ładują się na karcie i katalogu | Dotyczy realnych projektów, nie demo. |
| Private files bucket działa | DO POTWIERDZENIA | Admin widzi prywatne pliki zakupowe i workflow V1 | Brak obietnicy automatycznego wydania plików. |
| Migracje zastosowane | DO POTWIERDZENIA | Supabase schema / migracje zastosowane w środowisku | Nie udawać bez sprawdzenia. |
| Brak demo w publicu | DO POTWIERDZENIA | npm run verify:no-demo-content plus ręczny katalog | Public ma pokazywać tylko realne active. |
| Publiczny katalog pokazuje tylko opublikowane realne projekty | DO POTWIERDZENIA | /projekty + guard publikacji | Bez fikcyjnych ofert. |
| Karta projektu działa | DO POTWIERDZENIA | /projekty/[slug] dla realnego projektu | Ekran sprzedażowy V1. |
| Koszyk działa | DO POTWIERDZENIA | Projekt -> koszyk -> suma | Nie jest to jeszcze dowód płatności. |
| Checkout / zamówienie działa zgodnie z V1 | DO POTWIERDZENIA | Koszyk -> formularz -> zamówienie w adminie | Bez udawania Stripe/PayU. |
| Admin projektów działa | DO POTWIERDZENIA | Lista, dodanie, edycja, status, archiwizacja, usunięcie z zabezpieczeniem | Wymaga ręcznego testu. |
| Admin zamówień działa | DO POTWIERDZENIA | /admin/zamowienia i szczegół zamówienia | Workflow operacyjny V1. |
| Admin audit działa | DO POTWIERDZENIA | /admin/audit po realnych operacjach | Guard statyczny nie wystarczy. |
| Audit zapisuje realne operacje admina | DO POTWIERDZENIA | Realne wpisy admin_audit_log | Krytyczne po etapach 22-28. |
| Typecheck przechodzi | DO POTWIERDZENIA | npm run typecheck | Wynik wpisać po lokalnym uruchomieniu. |
| Build przechodzi | DO POTWIERDZENIA | npm run build | Wynik wpisać po lokalnym uruchomieniu. |
| Guardy przechodzą | DO POTWIERDZENIA | npm run verify | Wynik wpisać po lokalnym uruchomieniu. |
| Ręczny test Damiana zapisany | BLOKADA | _project/11_USER_CONFIRMED_TESTS.md | Brak potwierdzenia blokuje pełne zamknięcie V1. |
| Obsidian zaktualizowany | OK | Utworzona notatka Etapu 29 w repo Obsidiana | Dotyczy planu checklisty, nie runtime wyniku. |
| Brak sprzecznych tekstów o płatnościach | DO POTWIERDZENIA | Guard i ręczny przegląd tekstów publicznych | Nie obiecywać Stripe/PayU ani ręcznych płatności, jeśli nie są aktualnym zakresem. |
| Brak fikcyjnych obietnic automatycznej wysyłki | DO POTWIERDZENIA | Guard i ręczny przegląd tekstów publicznych | Automatyczna wysyłka jest V2/później bez decyzji. |
| Brak obietnicy natychmiastowego dostępu do plików | DO POTWIERDZENIA | Publiczne komunikaty i checkout | V1 może mieć ręczny workflow obsługi zamówienia. |
| Brak obietnicy faktury automatycznej | DO POTWIERDZENIA | Publiczne komunikaty i checkout | Faktury poza zakresem V1 bez decyzji. |

## Najkrótszy test praktyczny

Realny projekt active -> karta projektu -> koszyk -> checkout/zamówienie -> admin zamówień -> audit log -> checklist -> Obsidian.

Jeżeli którykolwiek etap pęka, V1 nie jest gotowe.

## Czego ten etap nie robi

- Nie wdraża Stripe, PayU ani innych płatności online.
- Nie wdraża płatności ręcznej jako nowej funkcji.
- Nie wdraża automatycznej wysyłki plików.
- Nie wdraża faktur.
- Nie wdraża panelu klienta.
- Nie publikuje fikcyjnych projektów jako realnych ofert.

## Wymagany guard

`scripts/check-production-readiness-v52.cjs`

Komenda:

```powershell
npm run verify:production-readiness-v52
```

Guard jest bramką dokumentacyjno-regresyjną. Nie zastępuje ręcznego testu Damiana ani runtime testu Supabase.