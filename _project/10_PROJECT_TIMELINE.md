# 10_PROJECT_TIMELINE - timeline projektu

## Cel pliku

Ten plik pokazuje chronologie waznych etapow, decyzji i zmian kierunku projektu. Szczegoly operacyjne pozostaja w:

- `_project/03_CURRENT_STAGE.md`
- `_project/08_CHANGELOG_AI.md`
- `_project/runs/`
- `_project/history/`

## Timeline

| Data | Etap / decyzja | Znaczenie | Powiazane pliki |
|---|---|---|---|
| 2026-05-14 | Etap 0: utworzenie pamieci projektu | Repo dostalo `AGENTS.md`, `_project/` i guard pamieci. | `AGENTS.md`, `_project/*`, `scripts/check-project-memory.cjs` |
| 2026-05-14 | Etap 1: audyt akcji admina | Panel admina dostal stabilniejsze markery i guardy akcji. | `scripts/check-admin-buttons-v19.cjs`, `components/admin/*` |
| 2026-05-15 | Etap 2: runtime test admina | Potwierdzono bloker lokalnego Supabase Auth / anon key. | `_project/runs/2026-05-15_0802_admin-runtime-test.md` |
| 2026-05-15 | Etap 3: spojnosc admin -> public | Publiczny katalog i karta projektu zostaly powiazane z realnymi danymi admina i statusem `active`. | `lib/project-repository.ts`, `scripts/check-public-project-data-v22.cjs` |
| 2026-05-15 | Etap 4: karta projektu jako strona sprzedazowa | Doprecyzowano CTA, warianty, dodatki i PDF na e-mail. | `components/project/*`, `scripts/check-public-project-detail-sales-v37.cjs` |
| 2026-05-15 | Etap 5: koszyk i lokalne liczniki | Koszyk dostal walidacje localStorage, a header liczniki koszyka i ulubionych. | `lib/cart/storage.ts`, `scripts/check-cart-order-v38.cjs` |
| 2026-05-15 | Etap 6: zamowienia V1 | Dodano realny panel zamowien admina i reczne statusy. | `app/admin/zamowienia/*`, `lib/admin/orders-admin.ts`, `scripts/check-admin-orders-v42.cjs` |
| 2026-05-15 | Aktualizacja standardu pamieci projektu | `AGENTS.md` zostal dostosowany do globalnego workflow Damiana; dodano timeline i history. | `AGENTS.md`, `_project/10_PROJECT_TIMELINE.md`, `_project/history/` |
| 2026-05-15 | Etap 7: checkout polprodukcyjny V1 | Checkout przestal brzmiec testowo i jasno komunikuje reczne potwierdzenie dostepnosci, platnosci i realizacji. | `app/zamowienie/page.tsx`, `components/order/CheckoutForm.tsx`, `scripts/check-cart-order-v38.cjs` |
