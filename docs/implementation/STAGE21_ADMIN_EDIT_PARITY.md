# STAGE21 Admin Edit Parity

## Cel

Wyrównanie zakresu `/admin/projekty/[id]/edytuj` do poziomu `/admin/projekty/nowy`.

## Zakres

- pelny formularz edycji w `AdminProjectEditForm`
- action `updateProjectAction` zapisujaca:
  - dane projektu
  - `roomsJson` -> `project_rooms` (delete + insert)
  - `variantsJson` -> `project_variants` (delete + insert)
  - `addonsJson` -> `project_addons` (delete + insert)
- rozszerzone `getAdminProjectById` pobierajace:
  - projekt
  - `project_rooms`
  - `project_variants`
  - `project_addons`
  - `project_media`
  - `project_files`
- media i pliki prywatne: podmiana/upload przez ten sam formularz

## Guard

Dodano `scripts/check-admin-edit-parity-v21.cjs` i `npm run verify:admin-edit-parity-v21`, podlaczone do `npm run verify`.

