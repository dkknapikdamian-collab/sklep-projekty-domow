# Stage 17 — use server export repair

## Problem

Production route:

```txt
/admin/projekty/nowy
```

failed with:

```txt
A "use server" file can only export async functions, found object.
```

## Cause

`app/admin/projekty/nowy/actions.ts` is a `"use server"` file and exported a plain object:

```ts
initialState
```

Next.js server action files may not export runtime values like objects.

## Fix

- `initialState` moved to `components/admin/AdminProjectCreateForm.tsx`
- server action file exports only `createProjectAction`
- guard added:

```txt
scripts/check-use-server-action-exports-v17.cjs
```

## Related previous issue

The earlier 413 error was a separate issue:

```txt
Body exceeded 1 MB limit
```

That is handled by V16 through:

```txt
experimental.serverActions.bodySizeLimit = "25mb"
```

## Next production direction

This 25 MB limit is a temporary bridge. For real production uploads, file upload should move to direct Supabase Storage upload via signed URLs.
