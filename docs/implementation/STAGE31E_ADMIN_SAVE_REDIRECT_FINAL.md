# STAGE31E_ADMIN_SAVE_REDIRECT_FINAL

Cel: po udanym zapisie edycji projektu admin ma wracać do listy projektów.

Zmiany:
- `updateProjectAction` po sukcesie robi redirect do `/admin/projekty?updated=KOD&saved=1`.
- Błędy walidacji i błędy zapisu dalej wracają jako stan formularza.
- `NEXT_REDIRECT` jest rethrow w `catch`, żeby Next.js nie potraktował redirectu jako zwykłego błędu.
- Dodany guard `verify:admin-save-redirect-v31`.

Test:
1. Edytuj projekt w `/admin/projekty/[id]/edytuj`.
2. Kliknij `Zapisz projekt`.
3. Po sukcesie powinno wrócić do `/admin/projekty?updated=...&saved=1`.
4. W przypadku błędu formularz zostaje na stronie edycji z komunikatem.
