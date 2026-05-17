# Etap 36 - fulfillment po płatności

Status: WDROŻONE W PACZCE / BEZ LIVE PAYMENT / TEST RĘCZNY DO WYKONANIA.
Data: 2026-05-17 Europe/Warsaw.

## Werdykt

Fulfillment po płatności ma być wdrożony jako bezpieczny mechanizm wydawania prywatnych plików, nie jako publiczny link po stronie sukcesu.

Poziom przekonania: 9/10.

Argument za: największe ryzyko w tym etapie to wyciek prywatnych dokumentów, więc źródłem prawdy musi być płatność potwierdzona serwerowo, a pliki muszą iść przez tokenowany panel pobrań i signed URLs.

Argument przeciw: to jest większe niż zwykły panel admina, bo wymaga tabel SQL, helperów serwerowych, endpointu pobrania i późniejszego spięcia z webhookiem Stripe.

Co zmieni zdanie: decyzja, że V1 ma pozostać w 100% ręczna bez panelu klienta/linku albo wybór zewnętrznego systemu dostarczania plików.

Najkrótszy test: test-mode payment row `paid` + wygenerowanie tokenu helperem + wejście w `/zamowienie/dostep/[token]` + kliknięcie pliku + wpis w `order_download_events`.

## Co wdrożono

1. Server-only helper fulfillmentu:
   - `lib/fulfillment/post-payment-fulfillment.ts`.
2. Tokenowany panel pobrań:
   - `/zamowienie/dostep/[token]`.
3. Endpoint wydania pojedynczego pliku:
   - `/zamowienie/dostep/[token]/plik/[fileId]`.
4. Signed URLs:
   - generowane tylko w endpointzie serwerowym po sprawdzeniu tokenu, dostępu i płatności.
5. E-mail po płatności:
   - marker guardu: e-mail po płatności.
   - wdrożony jako bezpieczny builder treści i payload `ready_to_send`, bez realnego wysyłania przez zewnętrzny provider.
6. Logi pobrań/linków:
   - marker guardu: logi pobrań.
   - `order_download_events`.
7. SQL:
   - `order_payments`, `payment_events`, `order_fulfillment_access`, `order_download_events`.
8. Guard:
   - `npm run verify:stage36-post-payment-fulfillment`.

## Zasady bezpieczeństwa

Marker guardu: brak publicznego wycieku plików.

- Success page nie jest źródłem prawdy.
- marker guardu: success page nie jest źródłem prawdy.
- Dostęp do plików wymaga statusu płatności `order_payments.status = paid`.
- Token panelu jest hashowany w bazie przez SHA-256.
- Panel dostępu ma własny termin ważności.
- Linki do plików są krótkoterminowe: signed URLs.
- Publiczna strona panelu nie generuje linków storage bezpośrednio.
- Brak `getPublicUrl` i brak publicznych bucketów w flow Etapu 36.
- Brak realnego wysyłania e-maili bez decyzji o providerze i sekretach.

## E-mail po płatności

Etap 36 nie odpala realnego maila, bo w repo nie ma zatwierdzonego provider send-email, sekretów ani decyzji o nadawcy.

Wdrożony jest bezpieczny etap pośredni:

- `buildPostPaymentFulfillmentEmailDraft()` buduje temat i treść,
- `ensurePostPaymentFulfillmentAccessForOrder()` zapisuje status `email_status = ready_to_send`,
- przyszły webhook Stripe może po `paid` wygenerować token, access URL i przekazać payload do zatwierdzonego providera.

To jest celowo mniej widowiskowe, ale mniej ryzykowne. Automatyczny mail bez providera byłby dekoracją albo ryzykiem.

## SQL

Plik:
`supabase/manual/2026-05-17_etap36_post_payment_fulfillment.sql`

Status:
`DO_URUCHOMIENIA`.

Typ:
`MIGRATION`.

## Guard

```powershell
npm run verify:stage36-post-payment-fulfillment
```

Guard sprawdza:

- helper fulfillmentu,
- panel tokenowany,
- endpoint wydawania pliku,
- SQL i tabele,
- dokumentację,
- raport run,
- brak publicznych URL,
- brak realnego wysyłania e-maili bez decyzji.

## Co nadal wymaga kolejnego etapu

1. Spiunięcie `ensurePostPaymentFulfillmentAccessForOrder()` z webhookiem Stripe po `checkout.session.completed` / `checkout.session.async_payment_succeeded`.
2. Test runtime na Supabase po uruchomieniu SQL.
3. Decyzja o realnym providerze e-maili albo pozostanie przy manual send.
4. Decyzja o TTL panelu: obecnie 7 dni.
5. Ewentualny admin action do ponownego wygenerowania tokenu.

## Test ręczny Damiana

Status: TEST RĘCZNY DO WYKONANIA.

Minimalny test po SQL i testowym payment row:

1. Uruchom SQL z `supabase/manual/2026-05-17_etap36_post_payment_fulfillment.sql`.
2. Utwórz testowy rekord `order_payments` ze statusem `paid` dla zamówienia z prywatnymi plikami.
3. Wywołaj helper przez przyszły webhook/test diagnostyczny albo dodać w kolejnym etapie admin action do generowania tokenu.
4. Wejdź w `/zamowienie/dostep/[token]`.
5. Kliknij plik.
6. Sprawdź wpis `signed_file_url_issued` w `order_download_events`.

## Ryzyko

Etap 36 jest fundamentem. Bez webhooka Stripe albo admin action do wygenerowania tokenu nie jest jeszcze pełnym automatycznym flow klienta. To jest świadome: nie udajemy live payment i live e-maila bez brakujących elementów.
