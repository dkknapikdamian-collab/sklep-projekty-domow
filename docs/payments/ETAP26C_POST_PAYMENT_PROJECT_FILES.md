# Etap 26C - post-payment project files fulfillment

## Status

Wdrożenie techniczne w paczce ZIP. Test ręczny runtime nadal do wykonania.

## Cel

Utwardzić istniejący fulfillment po płatności pod model `project_files` z Etapów 26A/26B.

## Kontrakt

- Storage produkcyjny: Supabase Storage, bucket `project-private-files`.
- Dostęp do plików dopiero po statusie płatności `paid`.
- Backend wybiera aktywne pliki z `project_files` przez `order-files.ts`.
- `floor_plans` jest uwzględniany w checklistach i panelu pobrań.
- `pdf_email_package` jest wymagany tylko wtedy, gdy klient kupił dodatek PDF na e-mail.
- Link do pliku jest signed URL z krótkim TTL, nie publiczny URL.
- Zdarzenia są logowane w `order_download_events`.
- Realny e-mail nie jest jeszcze wysyłany. Generowany jest draft/kontrakt wysyłki, provider e-mail zostaje na Etap 26D.

## Testy automatyczne

- `npm run verify:post-payment-project-files-v26c`
- `npm run verify:stage36-post-payment-fulfillment`
- `npm run verify:project-private-files-ux-v26b`
- `npm run verify:project-files-model-v26a`
- `npm run verify:private-files-fulfillment-v51`
- `npm run typecheck`
- `npm run build`

## Test ręczny do wykonania

1. Utworzyć albo wybrać projekt z `documentation`, `floor_plans`, opcjonalnie `pdf_email_package` i `full_package`.
2. Zamówić projekt.
3. W testowym flow oznaczyć płatność jako `paid`.
4. Wygenerować dostęp po płatności.
5. Sprawdzić panel `/zamowienie/dostep/[token]`.
6. Kliknąć pobranie pliku i potwierdzić, że powstał `signed_file_url_issued` w `order_download_events`.
7. Sprawdzić, że bez `paid` dostęp jest blokowany.
8. Sprawdzić, że nieaktywny plik nie pojawia się do pobrania.

## Następny etap

Etap 26D - realna wysyłka e-mail po płatności, dopiero po decyzji o providerze, idempotencji i retry.
