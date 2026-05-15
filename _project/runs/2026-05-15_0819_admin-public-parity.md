# Run report - 2026-05-15 08:19 - admin public parity

## Etap

Etap 3: Spojnosc admin -> publiczny katalog -> karta projektu.

## Cel

Upewnic sie, ze publiczny katalog i karta projektu sa sterowane statusem oraz danymi z admina:

- tylko `active` jest publiczne,
- `draft`, `hidden`, `archived` nie wyciekaja do katalogu,
- `draft`, `hidden`, `archived` nie wyciekaja do karty po slugu,
- `draft`, `hidden`, `archived` nie wyciekaja do podobnych projektow,
- karta projektu czyta dane odpowiadajace adminowi.

## Zakres sprawdzony

- `lib/project-repository.ts`
- `app/projekty/page.tsx`
- `app/projekty/[slug]/page.tsx`
- `components/project/ProjectCard.tsx`
- `components/project/ProjectDetailPage.tsx`
- `components/project/ProjectGallery.tsx`
- `components/project/ProjectPurchaseBox.tsx`
- `components/project/ProjectStats.tsx`
- `components/project/ProjectTabs.tsx`
- `components/project/RelatedProjects.tsx`
- `lib/admin/projects-admin.ts`
- `scripts/check-public-project-data-v22.cjs`
- `scripts/check-public-catalog-filters-v22b.cjs`
- `scripts/check-public-project-detail-sales-v37.cjs`

## Zmiany

- Zaostrzono `scripts/check-public-project-data-v22.cjs`.
- Dodano wymog jawnego `.eq("status", "active")` przy publicznym pobieraniu projektow.
- Dodano kontrole, ze `getPublicProjectBySlug()` korzysta z `getPublicProjects()`.
- Dodano kontrole, ze `getRelatedPublicProjects()` korzysta z `getPublicProjects()`.
- Dodano blokade bezposredniego publicznego `.from("projects")` poza repozytorium.
- Dodano kontrole publicznych bindingow danych:
  - nazwa,
  - cena,
  - slug,
  - kod,
  - warianty,
  - dodatki,
  - media,
  - pomieszczenia,
  - parametry techniczne.

## Czego nie zmieniano

- Nie zmieniano designu karty.
- Nie zmieniano stylu katalogu.
- Nie zmieniano filtrowania.
- Nie zmieniano koszyka.
- Nie zmieniano checkoutu.
- Nie zmieniano runtime konfiguracji Supabase Auth.

## Checki

```powershell
npm run verify:public-project-data-v22
npm run verify:public-catalog-filters-v22b
npm run verify:public-project-detail-sales-v37
npm run typecheck
npm run build
npm run check:project-memory
```

Wyniki:

- `npm run verify:public-project-data-v22` - OK
- `npm run verify:public-catalog-filters-v22b` - OK
- `npm run verify:public-project-detail-sales-v37` - OK
- `npm run typecheck` - OK
- `npm run build` - OK
- `npm run check:project-memory` - OK

## Manual check dla Damiana

Po stronie publicznej:

- `/projekty` pokazuje tylko projekty `active`.
- `/projekty/[slug-active]` pokazuje karte projektu.
- `/projekty/[slug-draft-hidden-archived]` nie pokazuje karty projektu.
- Podobne projekty na karcie nie zawieraja `draft`, `hidden`, `archived`.
- Dane na karcie odpowiadaja danym admina: nazwa, cena, warianty, dodatki, media, pomieszczenia, parametry techniczne.

## Pozostale ryzyka

- Pelne potwierdzenie "zmieniam w adminie i widze publicznie" nadal zalezy od dzialajacego runtime logowania admina.
- Lokalny anon key blokowal Etap 2, wiec runtime admina trzeba testowac na stabilnym env albo po poprawie klucza.

## Nastepny krok

Nie dodawac publicznych zrodel projektow poza `lib/project-repository.ts`. Jesli pojawi sie nowa publiczna strona z projektami, musi przejsc przez aktywny publiczny filtr i guard.
