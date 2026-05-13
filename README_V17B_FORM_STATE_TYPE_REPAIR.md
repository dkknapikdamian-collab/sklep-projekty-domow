# V17B — Admin form state type repair

Fixes TypeScript error after V17:

`existingProjectHref` and `existingProjectLabel` do not exist on type `{ ok: boolean; message: string }`.

Cause:
`initialState` was moved from the server action file into the client form, but it was not typed with optional duplicate-project fields.

Fix:
- keep `actions.ts` as a valid `"use server"` file with only async runtime export
- define local `CreateProjectState` type in `AdminProjectCreateForm.tsx`
- type `initialState` as `CreateProjectState`
- run full verify before commit/push
