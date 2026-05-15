# Run report - 2026-05-15 08:35 - project card sales page

## Etap

Etap 4: Karta projektu jako glowna strona sprzedazowa.

## Cel

Dopiac karte projektu tak, zeby uzytkownik bez zgadywania mogl:

- obejrzec galerie,
- zobaczyc cene,
- wybrac wariant,
- wybrac dodatki,
- zrozumiec dodatek PDF na e-mail +250 zl,
- przejsc do koszyka,
- sprawdzic dane techniczne, rzuty, pomieszczenia, zawartosc projektu i podobne projekty.

## Zakres sprawdzony

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

## Zmiany

- `ProjectPurchaseBox` dostal czytelne oznaczenie dodatku PDF na e-mail.
- Dodatek `send_pdf_email` pokazuje dopisek, ze jest opcjonalny i nie zastepuje podstawowej dostawy projektu.
- CTA do koszyka dostalo marker `data-project-cart-cta="true"` oraz opis `aria-label` z aktualna kwota.
- Mikrokomunikat dostawy zostal zmieniony z ogolnego PDF/link na "Pliki zgodnie z wybrana wersja".
- `RelatedProjects` dostal `id="related-projects"` i marker `data-related-projects-section`.
- `ProjectTabs` ma link do podobnych projektow.
- Dodano `ProjectMediaGallery.tsx` jako alias do `ProjectGallery`.
- Zaostrzono guard `verify:public-project-detail-sales-v37`.
- Dodano `START_LOCAL.bat`.

## Czego nie zmieniano

- Nie dodawano fikcyjnych projektow.
- Nie zmieniano routingu.
- Nie zmieniano checkoutu.
- Nie przebudowywano admina.

## Checki

```powershell
npm run verify:public-project-detail-sales-v37
npm run verify:cart-order-v38
npm run typecheck
npm run build
npm run check:project-memory
```

Wyniki:

- `npm run verify:public-project-detail-sales-v37` - OK
- `npm run verify:cart-order-v38` - OK
- `npm run typecheck` - OK
- `npm run build` - OK
- `npm run check:project-memory` - OK

Build pokazal stare ostrzezenia autoprefixera, niezwiązane z Etapem 4.

## Test przegladarkowy

Adres testowany:

```text
http://127.0.0.1:3100/projekty/31231312312
```

Wykonano:

- otwarto publiczna karte projektu,
- sprawdzono widoczne kontrolki wariantow i dodatkow,
- wybrano wariant `Odbicie lustrzane + zmiany`,
- zaznaczono `Pakiet PDF na e-mail +250 zl`,
- kliknieto `DODAJ DO KOSZYKA`,
- potwierdzono przejscie do `/koszyk`,
- potwierdzono, ze koszyk zawiera wybrany wariant i zaznaczony dodatek PDF.

## Opcje selectow

Guard sprawdza minimalna liczbe opcji w slownikach admina:

- typ projektu,
- garaz,
- dach,
- technologia,
- styl,
- kondygnacja pomieszczenia.

Dodatkowo adminowe selecty maja opcje dodania wartosci recznie, wiec brakujace niszowe opcje mozna dopisac bez zmiany kodu.

## Pozostale ryzyka

- Header pokazywal `Koszyk 0`, mimo ze strona koszyka zawierala dodana pozycje. To warto naprawic osobno.
- Lokalny admin auth nadal moze byc blokowany przez zmienny anon key z Etapu 2.

## Instrukcja lokalnego uruchomienia

Najprosciej:

```powershell
.\START_LOCAL.bat
```

Alternatywnie:

```powershell
npm run dev
```

Po starcie wejdz na:

```text
http://localhost:3000
```

Jesli port `3000` jest zajety, Next.js wypisze w terminalu alternatywny adres.
