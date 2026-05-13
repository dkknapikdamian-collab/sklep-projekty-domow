# V15 — Admin select UX and feature picker

Fixes:
- weak select dropdown contrast
- custom select values disappearing after manual input
- no remove option for custom values
- project features being a plain textarea

Adds:
- custom values saved in browser localStorage per field
- custom values shown as selectable options
- custom values removable by X
- grouped feature picker
- custom project features
- hidden `features` value still submitted as newline-separated text, so backend remains compatible

Note:
Custom select dictionaries are browser-local in V15. Production-level shared dictionaries should later move to Supabase option tables.
