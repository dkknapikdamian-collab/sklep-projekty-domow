# 15_ACTIVE_SOURCE_MAP - Sklep projekty domow

## Mapa zrodel

Fakty: kod, repo, testy, guardy, _project i aktualne pliki Obsidiana.

<!-- SKLEP_FULL_MEMORY_OBSIDIAN_REPO_V6_2026_05_15 START -->

## Source map update - 2026-05-15 22:12:34

### App repo facts

- FAKT: local repo scan path: C:\Users\malim\Desktop\biznesy_ai\strony\strona z projektami.
- FAKT: package.json name: sklep-projekty-domow.
- FAKT: package.json version: 0.5.0.
- FAKT: npm scripts detected: dev, build, start, typecheck, check:project-memory, verify:content, verify, verify:legacy, verify:supabase-foundation, verify:real-admin-projects, verify:no-static-supabase, verify:project-code-policy, verify:admin-select-options, verify:admin-selects-features, verify:featurepicker-v15b, verify:server-action-400-v16, verify:use-server-exports-v17, verify:form-state-v17b, verify:admin-project-management-v18, verify:admin-buttons-v19, verify:admin-list-search-filter-v20, verify:admin-css-imports-v20e, verify:admin-edit-parity-v21, verify:public-project-data-v22, verify:public-catalog-filters-v22b, verify:admin-homepage-content-v23, check:public-catalog-filters-v22b, verify:ui-mojibake-status-v22d, audit:admin-public-status-v22d, verify:admin-header-v24, verify:admin-media-visibility-v25, verify:admin-debug-v26, verify:public-service-role-read-v27, verify:admin-ui-debug-v28, verify:project-media-rendering-v30, verify:admin-save-redirect-v31, verify:homepage-hero-full-bleed-v32, verify:homepage-hero-full-bleed-v33, verify:homepage-hero-polish-v33, verify:project-media-controls-v34, verify:admin-project-media-v34, verify:public-project-media-v34, verify:project-publication-readiness-v35, verify:admin-projects-control-center-v36, verify:public-project-detail-sales-v37, verify:cart-order-v38, verify:order-schema-v38, verify:admin-orders-v42, verify:admin-project-list-compact-v41, verify:admin-audit-log-v44, verify:manual-email-drafts-v47, verify:manual-payment-v48.
- FAKT: AGENTS.md exists.
- FAKT: README.md exists.
- FAKT: _project exists.
- FAKT: _project\runs exists.
- FAKT: _project\history exists.
- FAKT: scripts exists.
- DO POTWIERDZENIA: tests not found.
- FAKT: docs exists.
- FAKT: app exists.
- DO POTWIERDZENIA: src\app not found.
- DO POTWIERDZENIA: src not found.
- FAKT: components exists.
- DO POTWIERDZENIA: src\components not found.
- FAKT: detected route/app files: app\layout.tsx; app\page.tsx; app\admin\page.tsx; app\admin\audit\page.tsx; app\admin\debug\page.tsx; app\admin\login\page.tsx; app\admin\logout\route.ts; app\admin\projekty\page.tsx; app\admin\projekty\nowy\page.tsx; app\admin\projekty\podglad\page.tsx; app\admin\projekty\[id]\edytuj\page.tsx; app\admin\setup\page.tsx; app\admin\strona-glowna\page.tsx; app\admin\zamowienia\page.tsx; app\admin\zamowienia\[id]\page.tsx; app\koszyk\page.tsx; app\projekty\page.tsx; app\projekty\[slug]\page.tsx; app\zamowienie\page.tsx.
- FAKT: detected guard/test files: scripts\check-admin-audit-log-v44.cjs; scripts\check-admin-buttons-v19.cjs; scripts\check-admin-css-imports-v20e.cjs; scripts\check-admin-debug-v26.cjs; scripts\check-admin-edit-parity-v21.cjs; scripts\check-admin-header-v24.cjs; scripts\check-admin-homepage-content-v23.cjs; scripts\check-admin-list-search-filter-v20.cjs; scripts\check-admin-media-visibility-v25.cjs; scripts\check-admin-orders-v42.cjs; scripts\check-admin-project-list-compact-v41.cjs; scripts\check-admin-project-management-v18.cjs; scripts\check-admin-project-media-v34.cjs; scripts\check-admin-projects-control-center-v36.cjs; scripts\check-admin-save-redirect-v31.cjs; scripts\check-admin-select-options.cjs; scripts\check-admin-selects-features.cjs; scripts\check-admin-ui-debug-v28.cjs; scripts\check-cart-order-v38.cjs; scripts\check-content-source.cjs; scripts\check-featurepicker-v15b.cjs; scripts\check-form-state-v17b.cjs; scripts\check-homepage-hero-full-bleed-v32.cjs; scripts\check-homepage-hero-full-bleed-v33.cjs; scripts\check-homepage-hero-polish-v33.cjs; scripts\check-manual-email-drafts-v47.cjs; scripts\check-manual-payment-v48.cjs; scripts\check-no-demo-content.cjs; scripts\check-no-legacy-demo-components.cjs; scripts\check-no-supabase-static-params.cjs; scripts\check-order-schema-v38.cjs; scripts\check-project-code-policy.cjs; scripts\check-project-media-controls-v34.cjs; scripts\check-project-media-rendering-v30.cjs; scripts\check-project-memory.cjs; scripts\check-project-publication-readiness-v35.cjs; scripts\check-public-catalog-filters-v22b.cjs; scripts\check-public-project-data-v22.cjs; scripts\check-public-project-detail-sales-v37.cjs; scripts\check-public-project-media-v34.cjs; scripts\check-public-service-role-read-v27.cjs; scripts\check-real-admin-projects.cjs; scripts\check-server-action-400-v16.cjs; scripts\check-supabase-foundation.cjs; scripts\check-ui-mojibake-status-v22d.cjs; scripts\check-use-server-action-exports-v17.cjs.

### Source priority

1. Code and tests in repo.
2. AGENTS.md and _project/.
3. Obsidian dashboard for operational status.
4. Chat only as temporary input until written to repo/vault.

<!-- SKLEP_FULL_MEMORY_OBSIDIAN_REPO_V6_2026_05_15 END -->


<!-- ETAP21_ADMIN_AUDIT_REAL_COVERAGE_2026_05_16 -->

## 2026-05-16 - Etap 21: realne domkniecie audit logu admina

FAKT:
- Dodano realne markery i pokrycie audit logu dla brakujacych mutacji admina:
  - project_create,
  - project_sample_create,
  - project_media_delete,
  - project_media_type_update,
  - project_private_file_delete.
- Guard statyczny verify:admin-audit-log-v44 ma sprawdzac nie tylko widok /admin/audit, ale tez realne markery implementacji w akcjach admina.

TEST RÄCZNY DO WYKONANIA:
- Runtime audit w /admin/audit po realnych operacjach admina: utworzenie projektu, sample project, media delete/type update, private file delete.

BRAK POTWIERDZONEGO TESTU:
- Do momentu klikniecia flow lokalnie przez Damiana runtime wpisy w admin_audit_log pozostaja niepotwierdzone.

## 2026-05-16 - Etap 21 real audit coverage V6

FAKT: dodano i zweryfikowano statycznie realne markery audit logu dla brakujących mutacji admina.
TEST RĘCZNY DO WYKONANIA: runtime audit w /admin/audit po realnych operacjach admina.
