# V11 — Real admin project creation

This patch turns the admin project form into a real Supabase-backed project creation flow.

It adds:

- Supabase project repository for public pages
- Admin project list from Supabase
- Real create-project server action
- Project rooms insert
- Project variants insert
- Project addons insert
- Project media upload to Supabase Storage
- Private file upload metadata
- Public catalog reading active projects from Supabase
- Local fallback only when Supabase is not configured

No secrets are included.
