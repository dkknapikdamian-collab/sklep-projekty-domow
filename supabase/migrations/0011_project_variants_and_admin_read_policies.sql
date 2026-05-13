-- 0011_project_variants_and_admin_read_policies.sql
-- Adds project variants and improves read policies for authenticated users.

create table if not exists public.project_variants (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  name text not null,
  price_gross numeric not null default 0,
  active boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

grant select on table public.project_variants to anon;
grant select, insert, update, delete on table public.project_variants to authenticated;
grant select, insert, update, delete on table public.project_variants to service_role;

alter table public.project_variants enable row level security;

drop policy if exists "anon can read active variants for active projects" on public.project_variants;
create policy "anon can read active variants for active projects"
  on public.project_variants
  for select
  to anon
  using (
    active = true
    and exists (
      select 1
      from public.projects
      where projects.id = project_variants.project_id
      and projects.status = 'active'
    )
  );

drop policy if exists "authenticated can read variants" on public.project_variants;
create policy "authenticated can read variants"
  on public.project_variants
  for select
  to authenticated
  using (
    public.is_admin()
    or (
      active = true
      and exists (
        select 1
        from public.projects
        where projects.id = project_variants.project_id
        and projects.status = 'active'
      )
    )
  );

drop policy if exists "admins can manage variants" on public.project_variants;
create policy "admins can manage variants"
  on public.project_variants
  for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

drop policy if exists "authenticated can read active addons for active projects" on public.project_addons;
create policy "authenticated can read active addons for active projects"
  on public.project_addons
  for select
  to authenticated
  using (
    public.is_admin()
    or (
      active = true
      and exists (
        select 1
        from public.projects
        where projects.id = project_addons.project_id
        and projects.status = 'active'
      )
    )
  );

drop policy if exists "authenticated can read media for active projects" on public.project_media;
create policy "authenticated can read media for active projects"
  on public.project_media
  for select
  to authenticated
  using (
    public.is_admin()
    or exists (
      select 1
      from public.projects
      where projects.id = project_media.project_id
      and projects.status = 'active'
    )
  );
