# Supabase setup

## Kroki

1. Wejdz do Supabase projektu.
2. Otworz SQL Editor.
3. Uruchom migracje:

```txt
supabase/migrations/0010_admin_foundation.sql
```

4. W Auth utworz konto admina.
5. Sprawdz id usera:

```sql
select id, email from auth.users;
```

6. Dodaj profil admina:

```sql
insert into public.profiles (id, email, role)
values ('TU_UUID_USERA', 'twoj@email.pl', 'admin')
on conflict (id) do update set role = 'admin', email = excluded.email;
```

7. Uzupelnij envy.
8. Wejdz na:

```txt
/admin/login
```

## Buckety

Migracja tworzy:

```txt
project-media
project-private-files
```

`project-media` jest publiczny dla zdjec/rzutow/elewacji.  
`project-private-files` jest prywatny dla PDF/ZIP po zakupie.
