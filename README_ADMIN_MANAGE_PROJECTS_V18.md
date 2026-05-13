# V18 — Admin project management

Fixes:
- the "Edycja później" button on the admin project list did nothing
- no project status change from the project list
- no delete project action from the project list

Adds:
- `/admin/projekty/[id]/edytuj`
- status update directly from `/admin/projekty`
- delete action directly from `/admin/projekty`
- basic project edit form
- guards for admin management actions and valid server-action exports

Notes:
- delete removes project DB rows and tries to remove related Supabase Storage files.
- for business safety, the UI still shows a confirm dialog before delete.
- media/rooms full editing can be a next stage.
