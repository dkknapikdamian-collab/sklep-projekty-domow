# 16_PRODUCTION_READINESS_CHECKLIST - Etap 29 pre-release V1

<!-- ETAP_B_PROJECT_MEMORY_STATUS_FIX_START -->
## BLOKADA: aktualny realny stan po Etapie B

Status: BLOKADA PRZED PUBLICZNYM URUCHOMIENIEM.
Data aktualizacji: 2026-05-16_1810 Europe/Warsaw.

Nie wolno traktować Etapu 29 jako pełnego zamknięcia V1.

Blokery:
- runtime V1 nie jest potwierdzony ręcznie,
- audit runtime nie jest potwierdzony ręcznie dla wszystkich operacji,
- obecny flow płatności ręcznej jest sprzeczny z decyzją Damiana,
- docelowe płatności automatyczne nie są wdrożone,
- aplikacja nie jest jeszcze publiczna dla klientów.

Następny realny etap:
1. Etap A: korekta kierunku płatności i roadmapy.
2. Potem: runtime audit admina i pełny flow sklepu bez publikacji klientom.
<!-- ETAP_B_PROJECT_MEMORY_STATUS_FIX_END -->


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

<!-- ETAP_A_PAYMENT_DIRECTION_FIX_START -->
## Płatności - blocker przed publicznym uruchomieniem

- [ ] Ręczne płatności usunięte jako docelowy model.
- [ ] Obecny manual-payment flow oznaczony jako legacy / temporary / internal only.
- [ ] Automatyczne płatności zaprojektowane.
- [ ] Payment provider wybrany.
- [ ] Webhooki zaplanowane.
- [ ] Statusy płatności zaplanowane.
- [ ] Guardy payment flow zaplanowane albo wdrożone.
- [ ] Manual-payment flow usunięty albo zastąpiony przed publicznym udostępnieniem.

Status: TEST RĘCZNY DO WYKONANIA.

Decyzja: Nie wdrażamy płatności ręcznych jako docelowego modelu.
<!-- ETAP_A_PAYMENT_DIRECTION_FIX_END -->

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
| Typecheck przechodzi | OK | Damian wkleił wynik `npm run build`: `Linting and checking validity of types` oraz build przeszedł | To potwierdza etap walidacji typów w buildzie; osobny `npm run typecheck` nadal warto odpalić przy pełnym verify. |
| Build przechodzi | OK | Damian wkleił wynik `npm run build`: `Compiled successfully`, `Generating static pages (9/9)`, `Finalizing page optimization` | Wystąpiły tylko warningi autoprefixer `start/end value has mixed support`; nie blokują buildu. |
| Guardy przechodzą | DO POTWIERDZENIA | npm run verify | Wynik wpisać po lokalnym uruchomieniu. |
| Ręczny test Damiana zapisany | BLOKADA | _project/11_USER_CONFIRMED_TESTS.md | Brak potwierdzenia blokuje pełne zamknięcie V1. |
| Obsidian zaktualizowany | OK | Utworzona notatka Etapu 29 w repo Obsidiana i dopisany wynik builda | Dotyczy planu checklisty i wyniku builda, nie runtime wyniku. |
| Brak sprzecznych tekstów o płatnościach | DO POTWIERDZENIA | Guard i ręczny przegląd tekstów publicznych | Nie obiecywać Stripe/PayU ani ręcznych płatności, jeśli nie są aktualnym zakresem. |
| Brak fikcyjnych obietnic automatycznej wysyłki | DO POTWIERDZENIA | Guard i ręczny przegląd tekstów publicznych | Automatyczna wysyłka jest V2/później bez decyzji. |
| Brak obietnicy natychmiastowego dostępu do plików | DO POTWIERDZENIA | Publiczne komunikaty i checkout | V1 może mieć ręczny workflow obsługi zamówienia. |
| Brak obietnicy faktury automatycznej | DO POTWIERDZENIA | Publiczne komunikaty i checkout | Faktury poza zakresem V1 bez decyzji. |

## Wynik builda od Damiana - 2026-05-16

Status: TEST AUTOMATYCZNY / GUARD - build PASS na lokalnym komputerze Damiana.

Wynik:
- `Compiled successfully in 3.3s`,
- `Linting and checking validity of types`,
- `Generating static pages (9/9)`,
- `Finalizing page optimization`,
- route manifest wygenerowany.

Ostrzeżenia:
- `app/admin-v8.css`: autoprefixer sugeruje `flex-start` zamiast `start`,
- `app/globals.css`: autoprefixer sugeruje `flex-end` zamiast `end`.

Ocena:
- Warningi nie blokują builda.
- Do osobnego małego cleanupu CSS można poprawić `start/end` na `flex-start/flex-end`.

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

<!-- ETAP29_V49_AUDIT_MARKER_FIX_V2_2026_05_16 -->
## 2026-05-16 - Etap 29 V49 audit marker fix V2

FAKT:
- 
pm run verify przeszedl przez V52, no-demo, V51, V50 i zatrzymal sie na V49.
- Blokada: pp/admin/audit/page.tsx missing marker: data-admin-audit-log.
- Naprawa: dodano data-admin-audit-log="true" do glownego <main> strony /admin/audit, obok istniejacego data-admin-audit-v50="true".

TESTY AUTOMATYCZNE DO WYKONANIA PRZEZ SKRYPT:
- 
pm run verify:v1-runtime-flow-markers-v49
- 
pm run verify
- 
pm run check:project-memory

TEST RECZNY:
- TEST RECZNY DO WYKONANIA: runtime V1 nadal wymaga klikniecia realnego flow.
<!-- ETAP29_V49_AUDIT_MARKER_FIX_V2_2026_05_16 -->

<!-- ETAP29_GUARD_BLOCKERS_FIX_V5_CHECKLIST_START -->
## Etap 29 - guard blockers fix V5 local inspect

Status: DO URUCHOMIENIA PRZEZ APPLY.

Zakres:
- Przed patchem raport lokalnych fragmentów plików.
- Masowa naprawa trzech blokad guardów: V49, V41, V25.
- Brak samodzielnego pushu AI.

Kryterium:
- focused guardy PASS,
- npm run verify PASS,
- check:project-memory PASS,
- runtime V1 nadal wymaga ręcznego testu Damiana.
<!-- ETAP29_GUARD_BLOCKERS_FIX_V5_CHECKLIST_END -->

<!-- ETAP29_GUARD_BLOCKERS_FIX_V7_CHECKLIST_START -->
## Etap 29 - guard blockers fix V7 no template break

Status: DO URUCHOMIENIA PRZEZ APPLY.

Zakres:
- Naprawa składni patchera po V6.
- Guard V25 akceptuje poprawne polskie teksty UI.
- Kontynuacja masowego usuwania blokad verify.

Kryterium:
- focused guardy PASS,
- npm run verify PASS,
- check:project-memory PASS,
- runtime V1 nadal wymaga ręcznego testu Damiana.
<!-- ETAP29_GUARD_BLOCKERS_FIX_V7_CHECKLIST_END -->
