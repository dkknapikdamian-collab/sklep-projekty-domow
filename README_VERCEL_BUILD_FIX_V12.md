# V12 — Vercel build fix

Fixes Vercel build error:

`cookies` was called outside a request scope

Cause:
`app/projekty/[slug]/page.tsx` used `generateStaticParams()` and called `getPublicProjects()`.
That function uses Supabase server client/cookies, which cannot run during static params generation at build time.

Fix:
- remove Supabase call from `generateStaticParams`
- make project detail route fully dynamic
- add guard to prevent Supabase/cookies calls in `generateStaticParams`
- ignore TypeScript build cache file
