# Stage 16 — Server Action 400 repair

## Problem

Admin project creation could return:

```txt
Failed to load resource: 400
An unexpected response was received from the server
```

## Most likely causes

### 1. Server Action body limit

Next.js Server Actions default request body limit is 1 MB.

The admin project form can include images/PDF/ZIP files, so it can exceed the default limit.

## Implemented short-term fix

```txt
next.config.ts
experimental.serverActions.bodySizeLimit = "25mb"
```

## Second fix

Project code generation errors now return a normal admin-facing message instead of crashing the Server Action.

This helps when the Supabase SQL migration below was not run:

```txt
supabase/migrations/0012_project_code_generation.sql
```

## Production note

Long term, large files should not go through Server Actions.

Better production architecture:

```txt
admin creates project metadata
browser uploads files directly to Supabase Storage using signed upload URLs
server saves file metadata
```

This avoids large request bodies through Next/Vercel server functions.
