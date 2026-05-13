# V15B — FeaturePicker repair

Fixes TypeScript syntax error in `components/admin/FeaturePicker.tsx`.

Cause:
The previous patch wrote `selected.join("\n")` incorrectly into the file as a literal line break inside a string.

Fix:
Use `selected.join("\\n")` in source code so TypeScript receives a valid newline separator string.

The apply script now checks `$LASTEXITCODE` after `npm run verify` and stops if verification fails.
