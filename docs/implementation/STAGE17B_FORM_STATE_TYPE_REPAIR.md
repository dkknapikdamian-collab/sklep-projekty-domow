# Stage 17B — admin form state type repair

## Problem

After moving `initialState` out of a `"use server"` file, TypeScript inferred the state as:

```ts
{ ok: boolean; message: string }
```

But the form also uses:

```ts
existingProjectHref
existingProjectLabel
```

## Fix

The form now has a local type:

```ts
type CreateProjectState = {
  ok: boolean;
  message: string;
  existingProjectHref?: string;
  existingProjectLabel?: string;
};
```

and:

```ts
const initialState: CreateProjectState = {
  ok: false,
  message: ""
};
```

## Why local type instead of runtime import

The server action file is marked `"use server"` and must not export runtime objects. Keeping the state type local avoids runtime exports and keeps the form type-safe.
