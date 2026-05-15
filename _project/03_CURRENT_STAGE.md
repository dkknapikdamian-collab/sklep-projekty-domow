# 03_CURRENT_STAGE - aktualny etap

Ostatnia aktualizacja: 2026-05-15 08:35 Europe/Warsaw

## Aktualny etap

Etap 4: Karta projektu jako glowna strona sprzedazowa

## Status etapu

Zakonczony.

Karta projektu ma dopiety sprzedazowy flow: galeria, cena, warianty, dodatki, CTA do koszyka, dane techniczne, rzuty, pomieszczenia, co zawiera projekt i podobne projekty.

## Cel etapu

Dopiac karte projektu tak, zeby nie tylko wyswietlala dane, ale prowadzila uzytkownika do wyboru wariantu, dodatkow i koszyka.

## Zakres

- `components/project/ProjectDetailPage.tsx`
- `components/project/ProjectGallery.tsx`
- `components/project/ProjectMediaGallery.tsx`
- `components/project/ProjectPurchaseBox.tsx`
- `components/project/ProjectTabs.tsx`
- `components/project/RelatedProjects.tsx`
- `components/project/ProjectCard.tsx`
- `lib/project-repository.ts`
- `types/project.ts`
- `scripts/check-public-project-detail-sales-v37.cjs`
- `START_LOCAL.bat`

## Co zostalo zrobione

- Doprecyzowano publiczny wybor dodatku PDF na e-mail.
- Dodatek `send_pdf_email` jest oznaczany jako opcjonalny pakiet PDF na e-mail.
- Dodano tekst, ze PDF na e-mail nie zastepuje podstawowej dostawy projektu.
- CTA `DODAJ DO KOSZYKA` ma stabilny marker `data-project-cart-cta="true"` i opis `aria-label` z aktualna kwota.
- Mikrokomunikat dostawy nie miesza juz podstawowej dostawy z dodatkiem PDF.
- Dodano anchor/marker sekcji podobnych projektow.
- Dodano `ProjectMediaGallery.tsx` jako bezpieczny alias do istniejacego `ProjectGallery`.
- Zaostrzono `scripts/check-public-project-detail-sales-v37.cjs`.
- Dodano `START_LOCAL.bat` do prostego uruchamiania lokalnego.
- Sprawdzono przeplyw w przegladarce: wariant + PDF na e-mail +250 zl -> CTA -> `/koszyk`.

## Czego nie zmieniano

- Nie dodawano fikcyjnych danych projektow.
- Nie zmieniano routingu.
- Nie zmieniano admina poza sprawdzeniem opcji i domyslnego dodatku PDF w guardzie.
- Nie zmieniano checkoutu.

## Wyniki checkow

- `npm run verify:public-project-detail-sales-v37` - OK
- `npm run verify:cart-order-v38` - OK
- `npm run typecheck` - OK
- `npm run build` - OK, ze starymi ostrzezeniami autoprefixera
- `npm run check:project-memory` - OK

## Wynik testu przegladarkowego

Na publicznej karcie aktywnego projektu:

- wybrano wariant `Odbicie lustrzane + zmiany`,
- zaznaczono `Pakiet PDF na e-mail` z cena `+250 zl`,
- kliknieto `DODAJ DO KOSZYKA`,
- strona przeszla do `/koszyk`,
- koszyk zawieral wybrany wariant i zaznaczony dodatek PDF.

## Znane problemy / ryzyka

- Lokalny admin runtime z Etapu 2 nadal moze byc blokowany przez niestabilny anon key.
- Header koszyka w testowanym runtime pokazywal `Koszyk 0`, mimo ze strona koszyka zawierala dodana pozycje. Nie ruszano tego w Etapie 4, bo kryterium dotyczylo przejscia z karty do koszyka i wyboru wariantu/dodatkow.

## Nastepny krok

Jesli kolejnym etapem bedzie koszyk/header, warto dopiac licznik koszyka w headerze jako osobny, maly etap. Karta projektu jako strona sprzedazowa ma teraz guard i przeszla flow wyboru do koszyka.
