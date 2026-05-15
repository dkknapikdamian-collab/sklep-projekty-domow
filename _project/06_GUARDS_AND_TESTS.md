# 06_GUARDS_AND_TESTS — guardy i testy

## Istniejące skrypty z `package.json`

Repo ma wiele guardów `verify:*` oraz główny skrypt:

```powershell
npm run verify
```

`npm run verify` uruchamia serię guardów, typecheck, check źródła danych i build.

## Guard pamięci projektu

```powershell
npm run check:project-memory
```

Uruchamia:

```powershell
node scripts/check-project-memory.cjs
```

Sprawdza:

- istnienie `AGENTS.md`,
- istnienie wymaganych plików `_project`,
- istnienie `_project/runs/.gitkeep`,
- podstawowe odwołania w `AGENTS.md` do plików pamięci projektu.

## Guard akcji panelu admina po Etapie 1

```powershell
npm run verify:admin-buttons-v19
```

Uruchamia:

```powershell
node scripts/check-admin-buttons-v19.cjs
```

Po Etapie 1 guard został zaostrzony. Ma pilnować, że:

- `app/admin/projekty/actions.ts` eksportuje realne server actions dla statusu, usuwania i edycji.
- `AdminProjectsTable` ma realne linki i formularze dla:
  - `Edytuj`,
  - `Podglad publiczny`,
  - `Ustaw draft`,
  - `Ustaw active`,
  - `Usuń`.
- `AdminProjectDeleteForm` ma realne `deleteProjectAction`, submit button, pending state i confirm.
- `AdminProjectEditForm` ma realny `useActionState(updateProjectAction)`, submit zapisu, link anulowania i select statusu.
- Strona edycji nie może przechodzić guarda przez komentarz typu legacy marker.
- Widoczne `<button>` w skanowanych plikach mają jawny `type`.
- W tabeli projektów nie ma akcji typu `href="#"` albo pustego `onClick={() => {}}`.

## Krytyczna zmiana w guardzie

Poprzednio część kontroli edycji przechodziła dzięki komentarzowi w `app/admin/projekty/[id]/edytuj/page.tsx`. To było ryzykowne, bo guard mógł udawać pokrycie akcji, które realnie są w osobnym komponencie.

Po Etapie 1 guard ma sprawdzać realny komponent:

```text
components/admin/AdminProjectEditForm.tsx
```

a nie komentarz w stronie.

## Rekomendowane komendy po zmianach admina

Minimum dla zmian w akcjach admina:

```powershell
npm run verify:admin-buttons-v19
npm run check:project-memory
```

Pełniej lokalnie:

```powershell
npm run typecheck
npm run build
```

Pełny zestaw, gdy czas pozwala:

```powershell
npm run verify
```

## Kiedy aktualizować guardy

- Gdy zmienia się struktura `_project`.
- Gdy zmienia się lista obowiązkowych plików pamięci projektu.
- Gdy `AGENTS.md` dostaje nowe obowiązkowe sekcje.
- Gdy zmienia się akcja, przycisk, formularz, redirect albo handler w panelu admina.
- Gdy funkcja produktu zostaje usunięta albo zastąpiona i stary guard pilnuje już nieaktualnego zachowania.

## Czego guardy nadal nie zastępują

- Ręcznego testu w przeglądarce.
- Realnego testu Supabase dla zapisu, zmiany statusu i usuwania.
- Kontroli uprawnień admina w środowisku produkcyjnym.
