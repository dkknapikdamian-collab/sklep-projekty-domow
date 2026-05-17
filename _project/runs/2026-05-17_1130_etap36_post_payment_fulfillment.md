# Run report - Etap 36 post-payment fulfillment

Data: 2026-05-17 Europe/Warsaw.
Status: WDROŻONE W PACZCE ZIP / BEZ SAMODZIELNEGO PUSHU AI.

## Scan-first confirmation

- Repo: `dkknapikdamian-collab/sklep-projekty-domow`.
- Branch docelowy: `main`.
- Git status: do sprawdzenia lokalnie przez APPLY, bo operator ZIP nie ma pełnego lokalnego repo w kontenerze.
- Metoda skanu: GitHub connector + aktywne source files workspace + repo docs + wybrane pliki kodu.
- Przeczytane source files:
  - `SKLEP_PROJEKTY_DOMOW__AKTYWNA_MAPA_I_PROCES_OBSIDIAN_FINAL_V1.md`,
  - `SKLEP_PROJEKTY_DOMOW__POLECENIE_DO_PRZESTRZENI_ROBOCZEJ_FINAL_V1.md`,
  - `AI_DEVELOPER_KODOWANIE_STANDARD_DAMIANA.md`.
- Przeczytane repo:
  - `AGENTS.md`,
  - `package.json`,
  - `_project/01_PROJECT_GOAL.md`,
  - `_project/03_CURRENT_STAGE.md`,
  - `_project/18_SQL_LEDGER.md`,
  - `docs/payments/ETAP35_PAYMENT_ARCHITECTURE.md`,
  - `scripts/check-private-files-fulfillment-v51.cjs`,
  - `scripts/check-stage35-payment-architecture.cjs`,
  - `lib/admin/order-files.ts`,
  - `lib/admin/orders-admin.ts`,
  - `app/admin/zamowienia/[id]/page.tsx`,
  - `app/admin/zamowienia/actions.ts`,
  - `lib/supabase/service-role.ts`,
  - `tsconfig.json`.
- Przeczytane Obsidian:
  - `PROJECTS.md`,
  - `00_SYSTEM/PROJECT_ID_MAP - aktywne projekty i ID Obsidiana.md`.
- Braki skanu:
  - brak klasycznego `git clone` w kontenerze przez brak DNS do GitHub,
  - pełne lokalne testy `npm run typecheck/build` mają wykonać się u Damiana po APPLY,
  - nie skanowano całego drzewa repo, tylko aktywne pliki i kontrakty potrzebne do Etapu 36.
- Źródło prawdy:
  - repo aplikacji dla kodu, SQL, guardów, `_project`,
  - Obsidian dla dashboardu/statusu/ryzyk/testów ręcznych.
- Konflikty:
  - Etap 25/51 blokował publiczne/signed linki w ręcznym admin fulfillment. Etap 36 nie zmienia tego kontraktu. Signed URLs są dopuszczone tylko w nowym, serwerowym post-payment endpointzie po `paid`.

## FAKTY Z KODU / PLIKÓW

- Istniejący admin fulfillment w `lib/admin/order-files.ts` i `/admin/zamowienia/[id]` jest ręczny i celowo nie generuje linków publicznych/signed.
- Etap 35 dokumentuje Stripe jako provider V1.1 oraz wymóg, że webhook/płatność serwerowa jest źródłem prawdy.
- `_project/01_PROJECT_GOAL.md` ma prywatne pliki zakupowe jako zakres V1/V2 oraz automatyczne linki po płatności jako późniejszy etap.
- Damian zlecił Etap 36: dostęp po płatności, signed URLs albo panel/link, e-mail po płatności, brak publicznego wycieku, logi pobrań.

## DECYZJE DAMIANA

- Wdrażać Etap 36.
- Dostarczyć ZIP oraz polecenie push.
- Nie robić samodzielnego pushu AI bez lokalnego APPLY po stronie Damiana.

## HIPOTEZY / PROPOZYCJE AI

- Najbezpieczniejszy wariant to tokenowany panel pobrań + endpoint generujący signed URL dopiero przy kliknięciu.
- Realny mail automatyczny wymaga osobnej decyzji o providerze, nadawcy i sekretach. W Etapie 36 przygotowano payload/draft i status `ready_to_send`, bez wysyłki live.

## DO POTWIERDZENIA

- Czy TTL panelu 7 dni zostaje.
- Czy TTL signed URL 30 minut zostaje.
- Czy e-mail ma być w kolejnym etapie automatyczny i przez jakiego providera.
- Czy po webhooku Stripe token ma generować się automatycznie zawsze, czy tylko gdy projekt ma flagę gotowości auto-fulfillment.

## Co zmieniono

Dodano:
- `lib/fulfillment/post-payment-fulfillment.ts`,
- `app/zamowienie/dostep/[token]/page.tsx`,
- `app/zamowienie/dostep/[token]/plik/[fileId]/route.ts`,
- `supabase/manual/2026-05-17_etap36_post_payment_fulfillment.sql`,
- `docs/payments/ETAP36_POST_PAYMENT_FULFILLMENT.md`,
- `scripts/check-stage36-post-payment-fulfillment.cjs`.

Zaktualizowano przez APPLY:
- `package.json`,
- `_project/03_CURRENT_STAGE.md`,
- `_project/06_GUARDS_AND_TESTS.md`,
- `_project/07_NEXT_STEPS.md`,
- `_project/08_CHANGELOG_AI.md`,
- `_project/10_PROJECT_TIMELINE.md`,
- `_project/12_IMPLEMENTATION_LEDGER.md`,
- `_project/14_TEST_HISTORY.md`,
- `_project/18_SQL_LEDGER.md`.

## TESTY AUTOMATYCZNE

Do uruchomienia przez APPLY:

```powershell
npm run verify:stage36-post-payment-fulfillment
npm run verify:private-files-fulfillment-v51
npm run verify:stage35-payment-architecture
npm run typecheck
npm run build
```

## GUARDY

Nowy guard:

```powershell
npm run verify:stage36-post-payment-fulfillment
```

Sprawdza:
- helper fulfillmentu,
- panel dostępu,
- endpoint wydania pliku,
- SQL/tabele,
- dokumentację,
- raport run,
- brak publicznych URL,
- brak realnej wysyłki e-maila bez providera.

## TESTY RĘCZNE

Status: TEST RĘCZNY DO WYKONANIA.

Po SQL i testowym rekordzie płatności:
1. wygenerować dostęp przez `ensurePostPaymentFulfillmentAccessForOrder()`,
2. wejść w `/zamowienie/dostep/[token]`,
3. kliknąć plik,
4. potwierdzić redirect do signed URL,
5. sprawdzić `order_download_events`.

## POTWIERDZENIA DAMIANA

- Brak potwierdzonego testu ręcznego dla Etapu 36.

## BRAKI I RYZYKA

- Bez uruchomienia SQL tabele fulfillmentu nie istnieją.
- Bez webhooka Stripe helper nie jest jeszcze automatycznie wywoływany po `paid`.
- E-mail nie jest wysyłany realnie; jest payload/draft `ready_to_send`.
- Log `signed_file_url_issued` potwierdza wydanie signed URL, nie gwarantuje, że klient faktycznie pobrał bajty z Supabase CDN.

## WPŁYW NA OBSIDIANA

- Paczka zawiera nową notatkę Obsidiana dla Etapu 36.
- APPLY dopisuje blok statusu do dashboardu sklepu.
- APPLY dopisuje wpis do SQL ledger Obsidiana.

## WPŁYW NA KIERUNEK ROZWOJU

Etap pasuje do kierunku V1.1: prywatne pliki po płatności, bez konta klienta, przez prywatny link/panel. Nie uruchamia live payment ani live e-maila bez osobnych decyzji.

## NASTĘPNY KROK

Etap 37 powinien spiąć webhook Stripe z `ensurePostPaymentFulfillmentAccessForOrder()` albo dodać admin action do ręcznego wygenerowania tokenu testowego po płatności.

## GIT / ZIP STATUS

- Delivery: ZIP.
- Push: do wykonania lokalnie przez polecenie z paczki.
- Etap nie jest zamknięty runtime do czasu uruchomienia SQL, przejścia testów i testu ręcznego Damiana.
