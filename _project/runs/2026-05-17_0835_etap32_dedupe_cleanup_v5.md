# Etap 32 V5 - dedupe cleanup pamięci projektu

## Scan-first confirmation

- Repo: `dkknapikdamian-collab/sklep-projekty-domow`, branch `main`.
- Obsidian: `dkknapikdamian-collab/obsidian-vault`, branch `main`.
- Powód: po paczkach V1/V2/V3 blok Etapu 32 został zdublowany w project memory i Obsidianie.
- Zakres: dokumentacja, guardy, `_project`, dashboard Obsidiana.
- Brak zmian w logice aplikacji, UI, checkout, płatnościach, adminie runtime.

## FAKTY Z KODU / PLIKÓW

- Etap 32 V3 został wypchnięty, ale zostawił potrójne bloki statusowe.
- V5 usuwa duplikaty i zostawia jeden kanoniczny blok Etapu 32 w docelowych plikach.
- Dodany guard `verify:project-memory-stage32-dedupe` pilnuje braku ponownych duplikatów.

## DECYZJE DAMIANA

- Kod ma elementy Etapów 22-29, ale V1 nie jest zamknięte.
- Największe blokady: płatności, runtime testy, potwierdzenie Damiana, finalny flow klienta.

## TESTY AUTOMATYCZNE

- `npm run verify:project-memory-stage32-dedupe`
- `npm run verify:project-memory-stage32`
- `npm run check:project-memory`

## TESTY RĘCZNE

- TEST RĘCZNY DO WYKONANIA: przegląd dashboardu Obsidiana po cleanupie.
- BRAK POTWIERDZONEGO TESTU RĘCZNEGO: runtime V1, płatności i finalny flow klienta.

## WPŁYW NA OBSIDIANA

- Usunięcie duplikatów w dashboardzie i roadmapie Sklepu.
- Aktualizacja notatki Etapu 32 o cleanup V5.

## GIT / ZIP STATUS

- Tryb: ZIP + lokalny commit/push po stronie Damiana.
- Etap zamykany dopiero po przejściu guardów i pushu app repo oraz Obsidiana.
