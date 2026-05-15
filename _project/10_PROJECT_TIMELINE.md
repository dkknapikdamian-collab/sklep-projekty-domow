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

| 2026-05-15 | Etap 8: pliki prywatne i dostawa ręczna | Panel zamówień pokazuje prywatne pliki projektu, PDF na e-mail, instrukcję wysyłki i checklistę ręcznej realizacji. | `app/admin/zamowienia/page.tsx`, `lib/admin/order-files.ts`, `scripts/check-admin-orders-v42.cjs` |
| 2026-05-15 | Etap 9: delete safety admina | Usuwanie projektu wymaga wpisania kodu i walidacji server-side. | `components/admin/AdminProjectDeleteForm.tsx`, `app/admin/projekty/actions.ts`, `scripts/check-admin-buttons-v19.cjs` |

| 2026-05-15 | Etap 10: pełnoszeroka lista projektów admina | `/admin/projekty` dostało pełnoszeroki shell, jednowierszową tabelę i kontrolowany poziomy overflow. | `app/admin/projekty/page.tsx`, `components/admin/AdminProjectsTable.tsx`, `app/admin-v8.css`, `scripts/check-admin-project-list-compact-v41.cjs` |

| 2026-05-15 | Etap 10B: guard idealnego układu admin projects | Zachowano zaakceptowany layout tabeli i poszerzono kolumnę akcji, żeby `Ustaw active` nie było ucinane. | `app/admin-v8.css`, `scripts/check-admin-project-list-compact-v41.cjs` |

| 2026-05-15 | Etap 11: archived-first delete safety | Standardową ścieżką dla projektu jest archiwizacja, a fizyczne delete zostało awaryjne i blokowane dla statusów innych niż `archived`/`draft`. | `components/admin/AdminProjectDeleteForm.tsx`, `components/admin/AdminProjectsTable.tsx`, `app/admin/projekty/actions.ts`, `scripts/check-admin-buttons-v19.cjs` |

| 2026-05-15 | Etap 12: admin audit log | Dodano minimalny audit log dla ryzykownych operacji admina: update projektu, status projektu, archiwizacja, hard delete i status zamówienia. | `lib/admin/audit-log.ts`, `supabase/migrations/0016_admin_audit_log.sql`, `scripts/check-admin-audit-log-v44.cjs` |

| 2026-05-15 | Etap 14: strona szczegółów zamówienia | Rozdzielono listę zamówień od obsługi konkretnego zamówienia na `/admin/zamowienia/[id]`. | `app/admin/zamowienia/page.tsx`, `app/admin/zamowienia/[id]/page.tsx`, `lib/admin/orders-admin.ts`, `scripts/check-admin-orders-v42.cjs` |

| 2026-05-15 | Etap 15: panel awaryjnego delete w tabeli projektów | Zmieniono `Awaryjne` na `Awaryjne usunięcie`, skrócono teksty i dopasowano CSS, żeby panel nie ucinał treści w tabeli. | `components/admin/AdminProjectDeleteForm.tsx`, `app/admin-v8.css`, `scripts/check-admin-buttons-v19.cjs` |
