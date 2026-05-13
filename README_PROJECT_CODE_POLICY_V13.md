# V13 — Project code policy and generator

This patch enforces the final project code rule:

- project codes are generated automatically
- format: DP-YYYY-NNNN
- example: DP-2026-0001
- manual memory-based codes like DP-MAL-014 are no longer the rule
- counters are stored in Supabase table `project_code_counters`
- final generated code is stored in `projects.code`
- conflicts and changed decisions are documented in project rules

Also adds duplicate slug guard with a clear admin-facing message.
