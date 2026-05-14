# STAGE34 - Media projektow: podglad, typy, usuwanie i render publiczny

Cel: domknac zarzadzanie mediami projektu bez mieszania publicznych `project_media` i prywatnych `project_files`.

## Zmiany

- `app/admin/projekty/actions.ts`
  - dodano `deleteProjectMediaItemAction` (usuwa pojedynczy rekord `project_media` + probuje usunac plik ze Storage),
  - dodano `deleteProjectPrivateFileItemAction` (usuwa pojedynczy rekord `project_files` + probuje usunac plik ze Storage),
  - po operacji revalidacja widokow admin/public i redirect z parametrem statusu.
- `components/admin/AdminProjectMediaManager.tsx`
  - dla kazdego publicznego media dodano przycisk `Usun media`,
  - dla kazdego prywatnego pliku dodano przycisk `Usun plik prywatny`,
  - zachowany podzial paneli na media publiczne i pliki prywatne.
- `components/admin/AdminProjectEditForm.tsx`
  - przekazywanie `projectId`, `projectSlug`, `projectCode` do managera mediow.
- `scripts/check-project-media-controls-v34.cjs`
  - guard sprawdzajacy obecność nowych akcji i przyciskow usuwania,
  - guard zabezpieczajacy brak odczytu `project_files` po stronie publicznego repozytorium.
- `package.json`
  - dodany skrypt `verify:project-media-controls-v34`,
  - podpiecie V34 do `npm run verify`.

## Testy

- `npm run verify:project-media-controls-v34`
- `npm run verify`
