# Stage 16B — package.json repair

## Problem

The previous V16 apply script appended a literal `\n` after the closing JSON brace in `package.json`.

That caused:

```txt
npm error code EJSONPARSE
Unexpected non-whitespace character after JSON
```

## Fix

The V16B apply script:

- removes BOM if present
- removes trailing literal `\n`
- truncates any accidental characters after final JSON brace if needed
- writes valid UTF-8 without BOM
- applies the V16 Server Action body size fix
- runs full verify
- commits only after verify passes

## V16 Server Action fix kept

```txt
next.config.ts
experimental.serverActions.bodySizeLimit = "25mb"
```

## Production note

This is a short-term bridge. Large project files should later be uploaded directly to Supabase Storage via signed upload URLs.
