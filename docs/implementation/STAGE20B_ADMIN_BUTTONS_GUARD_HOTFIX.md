# STAGE20B — Admin buttons guard hotfix

## Cel

Naprawić fałszywie czerwony guard `verify:admin-buttons-v19`, który sprawdzał redirect po zapisie edycji projektu zbyt kruchym porównaniem tekstowym.

## Zakres

- `scripts/check-admin-buttons-v19.cjs`
- brak zmian runtime w aplikacji
- brak zmian w Supabase
- brak zmian ENV

## Decyzja

Funkcja `updateProjectBasicsAction` ma dalej przekierowywać po zapisie na:

```ts
redirect(`/admin/projekty/${projectId}/edytuj?saved=1`);
```

Guard ma sprawdzać ten kontrakt regexem, a nie jednym dokładnym stringiem, żeby drobne różnice formatowania nie dawały fałszywego błędu.

## Kryterium zakończenia

- `npm run verify:admin-buttons-v19` przechodzi
- `npm run verify` przechodzi
- zmiana idzie na `main`
