# 2026-05-14 22:35 — admin-action-audit

## Cel

Wykonać audyt panelu admina w zakresie widocznych przycisków i akcji oraz naprawić brakujące handlery tylko w obszarze panelu admina.

## Przeczytane źródła prawdy

- `AGENTS.md`
- `_project/00_PROJECT_STATUS.md`
- `_project/01_PROJECT_GOAL.md`
- `_project/02_WORK_RULES.md`
- `_project/03_CURRENT_STAGE.md`
- `_project/04_DECISIONS.md`
- `_project/05_MANUAL_TESTS.md`
- `_project/06_GUARDS_AND_TESTS.md`
- `_project/07_NEXT_STEPS.md`
- `_project/08_CHANGELOG_AI.md`
- `_project/09_CONTEXT_FOR_OBSIDIAN.md`

## Mapa akcji admina

### `/admin`

- `Projekty` — link do `/admin/projekty`, działa jako `Link`.
- `Dodaj projekt` — link do `/admin/projekty/nowy`, działa jako `Link`.
- `Podglad karty` — link do `/admin/projekty/podglad`, działa jako `Link`.
- `Strona glowna` — link do `/admin/strona-glowna`, działa jako `Link`.
- `Debug admina` — link do `/admin/debug`, działa jako `Link`.
- `Ustawienia sklepu` — celowo element `div.muted`, bez akcji na teraz.

### `/admin/projekty`

- `Dodaj projekt` — link do `/admin/projekty/nowy`.
- Wyszukiwarka — działa lokalnie w `AdminProjectsListClient`.
- Select filtrów — działa lokalnie w `AdminProjectsListClient`.
- `Wyczyść` — resetuje search i filtr.
- `Edytuj` — link do `/admin/projekty/[id]/edytuj`.
- `Podglad publiczny` — link do `/projekty/[slug]` w nowej karcie.
- `Ustaw draft` — formularz do `updateProjectStatusAction`.
- `Ustaw active` — formularz do `updateProjectStatusAction`, z blokadą gdy projekt nie spełnia warunków publikacji.
- `Usuń` — formularz do `deleteProjectAction` z `window.confirm`.

### `/admin/projekty/[id]/edytuj`

- `Lista projektow` — link do `/admin/projekty`.
- `Podglad publiczny` — link do `/projekty/[slug]`, widoczny dla `active`.
- `Zapisz projekt` — submit głównego formularza przez `useActionState(updateProjectAction)`.
- `Anuluj` — link do `/admin/projekty?cancelled=1`.
- `Status` — select w formularzu, zapis po submit.
- `Usuń` — osobny formularz `AdminProjectDeleteForm` w strefie usuwania.
- `Ustaw jako hero`, `Ustaw jako miniature`, `Usun media`, `Usun plik prywatny` — akcje przez `formAction` w `AdminProjectMediaManager`.

## Co znaleziono

1. Kluczowe akcje miały server actions albo linki, ale brakowało jednoznacznych markerów pozwalających pilnować ich guardem.
2. `app/admin/projekty/[id]/edytuj/page.tsx` zawierał komentarz `Legacy guard markers`, który mógł przepuszczać guard bez sprawdzania realnego formularza edycji.
3. Guard `check-admin-buttons-v19.cjs` sprawdzał część markerów w stronie edycji, mimo że realny zapis/anulowanie są w `components/admin/AdminProjectEditForm.tsx`.

## Co zmieniono

- Dodano `data-admin-action` i `data-admin-project-row-actions` do realnych akcji listy projektów.
- Dodano `data-admin-action` do formularza usuwania i przycisku submit usuwania.
- Dodano `data-admin-action` do formularza edycji, selecta statusu, submitu zapisu i linku anulowania.
- Usunięto komentarz `Legacy guard markers` ze strony edycji projektu.
- Zaostrzono `scripts/check-admin-buttons-v19.cjs`, aby sprawdzał realne komponenty i odrzucał fałszywe legacy markery.

## Pliki dotknięte

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

## Czego nie ruszano

- Nie zmieniano CSS.
- Nie zmieniano routingu.
- Nie zmieniano publicznych stron sklepu.
- Nie zmieniano koszyka, checkoutu ani modelu zamówień.
- Nie dodawano fikcyjnych danych.

## Guardy / testy

Zaktualizowany guard:

```powershell
npm run verify:admin-buttons-v19
```

Dodatkowy guard pamięci projektu:

```powershell
npm run check:project-memory
```

Rekomendowane lokalnie:

```powershell
npm run typecheck
npm run build
```

## Status testów

Zmiany zostały wykonane przez GitHub API. Nie uruchomiono lokalnego `npm`, więc wynik runtime/build musi zostać potwierdzony lokalnie.

## Co Damian ma sprawdzić ręcznie

1. `/admin/projekty` → `Edytuj`.
2. Edycja projektu → zmiana pola → `Zapisz projekt`.
3. Edycja projektu → `Anuluj`.
4. Lista projektów → `Ustaw draft`.
5. Lista projektów → `Ustaw active` dla projektu kompletnego i niekompletnego.
6. Lista lub edycja → `Usuń` na projekcie testowym po confirm.
7. Komunikaty po redirectach: `updated`, `deleted`, `cancelled`, `status=error`.
8. Akcje mediów w edycji, jeśli projekt ma media.

## Ryzyka

- Statyczny guard nie zastępuje testu w przeglądarce.
- Zapis/status/delete wymagają realnej sesji admina i działającego Supabase.
- Usuwanie jest destrukcyjne, testować wyłącznie na projekcie roboczym/testowym.
- Akcje mediów przez `formAction` nadal wymagają oddzielnego ręcznego sprawdzenia.
