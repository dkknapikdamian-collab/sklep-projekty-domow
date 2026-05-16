# RUN_STAGE52_PROJECT_PUBLICATION_READINESS_2026-05-16

## FAKTY Z KODU / PLIKÓW

- `lib/project-repository.ts` filtruje publiczne projekty po `status=active`.
- Istniał `getProjectPublicationReadiness`, ale sprawdzał tylko część wymagań.
- Etap 27 ma utwardzić bramkę publikacji, nie dodać nowy moduł sklepu.

## DECYZJE DAMIANA

- Nie pushować samodzielnie do Gita.
- Dostarczyć ZIP.
- Projekt active musi być sprzedażowo gotowy.

## CO ZMIENIA PACZKA

- Rozszerza wymagania publikacji.
- Dodaje box `Gotowość publikacji` w adminie.
- Rozszerza guard V35.
- Aktualizuje `_project` i Obsidiana.

## TESTY AUTOMATYCZNE

Do uruchomienia po apply:

```powershell
npm run verify:project-publication-readiness-v35
npm run check:project-memory
npm run typecheck
npm run build
```

## TEST RĘCZNY

Status: TEST RĘCZNY DO WYKONANIA.

Sprawdzić na Vercelu po deployu:

- box gotowości publikacji,
- blokadę active z brakami,
- publikację kompletnego projektu,
- brak draftów w katalogu publicznym.

## RYZYKA

- Jeżeli projekt nie ma dokumentacji prywatnej, nie przejdzie na active.
- Jeżeli Vercel build padnie, najpierw sprawdzić typy server component w edycji projektu.

## GIT / ZIP STATUS

Tryb: ZIP lokalny. Brak commit/push w tej paczce.
