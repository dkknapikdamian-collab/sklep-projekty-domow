# STAGE34 - Media projektow: admin + publiczny render

Cel: media projektu sa widoczne i sterowalne w adminie oraz poprawnie renderowane publicznie.

## Zmiany admin

- `components/admin/AdminProjectMediaManager.tsx`
  - lista zapisanych mediow pokazuje:
    - miniature,
    - typ,
    - tytul,
    - sciezke storage,
    - publiczny URL,
    - kolejnosc,
    - flage hero,
    - flage thumbnail,
    - bucket.
  - dodane akcje server action:
    - `Ustaw jako hero`,
    - `Ustaw jako miniature`,
    - `Usun media`.
- `app/admin/projekty/actions.ts`
  - dodano `setProjectMediaTypeAction` (hero/thumbnail przez `media_type`),
  - zachowana separacja publicznych `project_media` od prywatnych `project_files`.
- `lib/admin/projects-admin.ts`
  - rozszerzono model media o `bucket` i `sortOrder`.

## Zmiany publiczne

- `components/project/ProjectCard.tsx`
  - fallback obrazu: `thumbnail -> hero -> gallery[0] -> elevation[0] -> floor_plan[0] -> placeholder`.
- `components/project/ProjectGallery.tsx`
  - kolejnosc galerii: `hero -> thumbnail -> gallery -> elevation -> floor_plan -> roof_plan -> section -> other`.
  - deduplikacja po URL przez `uniqueImages`.
- `lib/project-repository.ts`
  - obsluga `media_type = other`.
- `components/MediaSlot.tsx`
  - pozostaje bez `next/image`, renderuje realny `src` przez `<img>`.

## Guardy

- `scripts/check-admin-project-media-v34.cjs`
- `scripts/check-public-project-media-v34.cjs`

Dodatkowo pozostawiony nizszy guard `check-project-media-rendering-v30.cjs`.

## Testy

- `npm run verify:admin-project-media-v34`
- `npm run verify:public-project-media-v34`
- `npm run verify:project-media-rendering-v30`
- `npm run typecheck`
- `npm run verify`
