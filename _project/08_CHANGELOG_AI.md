# 08_CHANGELOG_AI — changelog pracy AI

## 2026-05-14 22:35 - Etap 1: Audyt i stabilizacja akcji panelu admina

- Przeczytano `AGENTS.md` oraz pliki `_project/` jako źródło prawdy.
- Zmapowano główne widoczne akcje panelu admina.
- Potwierdzono, że lista projektów używa realnych linków/formularzy dla edycji, podglądu publicznego, zmiany statusu i usuwania.
- Dodano jawne markery `data-admin-action` dla akcji admina, żeby guard nie opierał się na domysłach.
- Usunięto fałszywy legacy marker z komentarza w `app/admin/projekty/[id]/edytuj/page.tsx`.
- Zaostrzono `scripts/check-admin-buttons-v19.cjs`, aby sprawdzał realny `components/admin/AdminProjectEditForm.tsx` zamiast komentarza na stronie edycji.
- Nie zmieniano ogólnego stylu wizualnego.
- Nie zmieniano routingu.
- Nie zmieniano funkcji niezwiązanych z panelem admina.

### Pliki zmienione

- `components/admin/AdminProjectsTable.tsx`
- `components/admin/AdminProjectDeleteForm.tsx`
- `components/admin/AdminProjectEditForm.tsx`
- `app/admin/projekty/[id]/edytuj/page.tsx`
- `scripts/check-admin-buttons-v19.cjs`
- `_project/03_CURRENT_STAGE.md`
- `_project/05_MANUAL_TESTS.md`
- `_project/06_GUARDS_AND_TESTS.md`
- `_project/07_NEXT_STEPS.md`
- `_project/08_CHANGELOG_AI.md`
- `_project/09_CONTEXT_FOR_OBSIDIAN.md`
- `_project/runs/2026-05-14_2235_admin-action-audit.md`

### Testy / guardy

Do uruchomienia lokalnie:

```powershell
npm run verify:admin-buttons-v19
npm run check:project-memory
npm run typecheck
npm run build
```

### Wynik

Kodowo etap został wdrożony przez GitHub API. Runtime test w przeglądarce i Supabase nadal musi zostać wykonany ręcznie.

### Ryzyka

- Statyczny guard nie sprawdza realnego kliknięcia w przeglądarce.
- Zmiana statusu i usuwanie wymagają działającego Supabase oraz sesji admina.
- Akcje mediów w edycji projektu wymagają oddzielnego ręcznego potwierdzenia.

## 2026-05-14 21:20 - Etap 0: Utworzenie pamięci projektu

- Utworzono `AGENTS.md`.
- Utworzono folder `_project/`.
- Dodano pliki pamięci projektu.
- Dodano guard `scripts/check-project-memory.cjs`.
- Dodano skrypt `check:project-memory` do `package.json`.
- Dodano raport run w `_project/runs/`.
- Nie zmieniano logiki aplikacji.
- Nie zmieniano UI.
- Nie zmieniano routingu.
- Nie zmieniano komponentów produktu.

## Zasada dalszych wpisów

Każdy większy etap ma dopisać nowy wpis z:

- datą,
- nazwą etapu,
- plikami zmienionymi,
- testami uruchomionymi,
- wynikiem testów,
- znanymi ryzykami,
- następnym krokiem.
