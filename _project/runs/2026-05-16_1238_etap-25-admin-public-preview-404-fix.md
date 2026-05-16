# 2026-05-16_1238 - Etap 25 admin public preview 404 fix

FAKT:
- Podglad publiczny z admina wskazywal na /projekty/[slug], a publiczna trasa filtruje status active, wiec draft/hidden/archived mogly dawac 404.
- Dodano /admin/projekty/[id]/podglad oraz getAdminPreviewProjectById bez filtra status=active.
- Akcja admina Podglad publiczny wskazuje na trase admin preview.

CHECKI:
- npm run verify:admin-public-preview-v25
- npm run verify:admin-action-feedback-v24
- npm run verify:admin-archive-delete-runtime-v23
- npm run verify:admin-buttons-v19
- npm run verify:public-project-data-v22
- npm run typecheck
- npm run build
- npm run check:project-memory

TEST RECZNY:
- TEST RECZNY DO WYKONANIA: kliknac Podglad publiczny dla projektu active i nie-active; sprawdzic brak 404.
